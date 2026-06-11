import { motion, AnimatePresence } from "framer-motion";
import type { MergeSortState, MergeSortSubarray } from "@/types";

interface MergeSortVisualizerProps {
  state: MergeSortState;
}

export function MergeSortVisualizer({ state }: MergeSortVisualizerProps) {
  const { array, subarrays, activeSubarray, mergingIndices, sortedIndices, depth, phase } = state;

  const maxValue = Math.max(...array, 1);

  // Helper to render a block of bars representing a subarray
  const renderSubarrayBars = (subarray: MergeSortSubarray, index: number, isMainArray = false) => {
    const isActive = activeSubarray === index && !isMainArray;
    const isSorted = subarray.isSorted;
    
    // Scale bar size based on depth to fit more levels
    const maxBarHeight = isMainArray ? 120 : Math.max(40, 100 - (depth * 15));
    const barWidth = Math.max(12, Math.min(32, 400 / array.length));
    
    return (
      <motion.div
        key={`subarray-${index}-${subarray.startIndex}-${subarray.endIndex}`}
        className={`flex items-end justify-center rounded-md p-2 relative ${
          isActive && phase === "merging" ? "bg-primary/5 border border-primary/20" : "border border-transparent"
        }`}
        layout
        initial={{ opacity: 0, y: -20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.4 }}
      >
        {/* Helper text showing indices */}
        {!isMainArray && (
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] text-muted-foreground whitespace-nowrap opacity-50">
            [{subarray.startIndex}..{subarray.endIndex}]
          </div>
        )}

        <div className="flex items-end gap-1">
          {subarray.values.map((val, idx) => {
            const absoluteIndex = subarray.startIndex + idx;
            const heightPercent = (val / maxValue) * 100;
            
            // Determine color
            let color = "var(--color-viz-default)";
            let glow = "none";
            
            if (isMainArray && sortedIndices.includes(absoluteIndex)) {
              color = "var(--color-viz-sorted)";
              glow = "0 0 12px hsla(142, 71%, 45%, 0.3)";
            } else if (isActive && phase === "merging" && mergingIndices.includes(absoluteIndex)) {
              color = "var(--color-viz-comparing)";
              glow = "0 0 20px hsla(45, 93%, 47%, 0.4)";
            } else if (isSorted && !isMainArray) {
              color = "hsla(262, 83%, 58%, 0.8)"; // primary color but slightly muted
            }

            return (
              <motion.div
                key={`bar-${absoluteIndex}-${val}`}
                layout
                className="flex flex-col items-center"
              >
                <motion.div
                  className="text-[9px] font-semibold mb-1 tabular-nums"
                  style={{ color }}
                >
                  {val}
                </motion.div>
                <motion.div
                  className="rounded-t-sm w-full"
                  style={{
                    backgroundColor: color,
                    boxShadow: glow,
                    width: `${barWidth}px`,
                  }}
                  animate={{
                    height: `${Math.max(heightPercent * (maxBarHeight / 100), 8)}px`,
                    backgroundColor: color,
                    boxShadow: glow,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="flex flex-col items-center w-full h-full p-4 overflow-y-auto min-h-[400px]">
      {/* Legend */}
      <div className="flex items-center gap-4 mb-4 text-xs font-medium flex-wrap justify-center shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: "var(--color-viz-comparing)" }} />
          <span className="text-muted-foreground">Comparing to Merge</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: "hsla(262, 83%, 58%, 0.8)" }} />
          <span className="text-muted-foreground">Subarray Sorted</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: "var(--color-viz-sorted)" }} />
          <span className="text-muted-foreground">Fully Sorted</span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-12 w-full mt-4 pb-8">
        {/* Top level: The main array */}
        <div className="w-full flex justify-center">
          {renderSubarrayBars({
            startIndex: 0,
            endIndex: array.length - 1,
            values: array,
            isSorted: sortedIndices.length === array.length
          }, -1, true)}
        </div>

        {/* Separator line with active phase */}
        <div className="w-full max-w-2xl flex items-center gap-4">
          <div className="h-px bg-border flex-1" />
          <div className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground px-2 py-1 rounded-full bg-muted/50">
            {phase === "complete" ? "Finished" : phase === "splitting" ? "Splitting Array" : "Merging Subarrays"}
          </div>
          <div className="h-px bg-border flex-1" />
        </div>

        {/* Current Active Subarrays Level */}
        <div className="w-full flex flex-wrap justify-center gap-x-8 gap-y-12 items-end min-h-[150px]">
          <AnimatePresence mode="popLayout">
            {subarrays.map((subarray, index) => renderSubarrayBars(subarray, index, false))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
