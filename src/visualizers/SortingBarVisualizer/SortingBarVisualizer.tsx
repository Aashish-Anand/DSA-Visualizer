import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { SortingBarState } from "@/types";

interface SortingBarVisualizerProps {
  state: SortingBarState;
}

export function SortingBarVisualizer({ state }: SortingBarVisualizerProps) {
  const {
    array,
    comparingIndices,
    swappedIndices,
    sortedIndices,
    highlightedIndex,
    highlightLabel,
    partitionRegion,
    pivotIndex,
    sortedRegion,
    floatingBar,
  } = state;

  const maxValue = useMemo(() => Math.max(...array, 1), [array]);

  const getBarColor = (index: number): string => {
    if (highlightedIndex === index || pivotIndex === index) {
      return "var(--color-viz-active)";
    }
    if (swappedIndices && (index === swappedIndices[0] || index === swappedIndices[1])) {
      return "var(--color-viz-swapping)";
    }
    if (comparingIndices && (index === comparingIndices[0] || index === comparingIndices[1])) {
      return "var(--color-viz-comparing)";
    }
    if (sortedIndices?.includes(index)) {
      return "var(--color-viz-sorted)";
    }
    return "var(--color-viz-default)";
  };

  const getBarGlow = (index: number): string => {
    if (highlightedIndex === index || pivotIndex === index) {
      return "0 0 16px hsla(199, 89%, 48%, 0.4)";
    }
    if (swappedIndices && (index === swappedIndices[0] || index === swappedIndices[1])) {
      return "0 0 20px hsla(0, 84%, 60%, 0.4)";
    }
    if (comparingIndices && (index === comparingIndices[0] || index === comparingIndices[1])) {
      return "0 0 20px hsla(45, 93%, 47%, 0.4)";
    }
    if (sortedIndices?.includes(index)) {
      return "0 0 12px hsla(142, 71%, 45%, 0.3)";
    }
    return "none";
  };

  const getActionLabel = (index: number): string | null => {
    if (swappedIndices && (index === swappedIndices[0] || index === swappedIndices[1])) {
      return "SWAP";
    }
    if (comparingIndices && (index === comparingIndices[0] || index === comparingIndices[1])) {
      return "CMP";
    }
    if (sortedIndices?.includes(index)) {
      return "✓";
    }
    return null;
  };

  const getRoleLabel = (index: number): string | null => {
    if (highlightedIndex === index && highlightLabel) {
      return highlightLabel;
    }
    if (pivotIndex === index) {
      return "PIVOT";
    }
    return null;
  };


  const barWidth = Math.max(24, Math.min(56, 600 / array.length));
  const gap = Math.max(3, Math.min(8, 200 / array.length));

  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[300px] p-4">
      {/* Legend */}
      <div className="flex items-center gap-4 mb-6 text-xs font-medium flex-wrap justify-center">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: "var(--color-viz-comparing)" }} />
          <span className="text-muted-foreground">Comparing</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: "var(--color-viz-swapping)" }} />
          <span className="text-muted-foreground">Swapping</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: "var(--color-viz-sorted)" }} />
          <span className="text-muted-foreground">Sorted</span>
        </div>
        {highlightLabel && (
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: "var(--color-viz-active)" }} />
            <span className="text-muted-foreground">{highlightLabel}</span>
          </div>
        )}
        {pivotIndex !== null && (
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: "hsl(190, 90%, 50%)" }} />
            <span className="text-muted-foreground">Pivot</span>
          </div>
        )}
      </div>

      {/* Key Box (Insertion Sort) */}
      <div className="h-16 w-full flex items-center justify-center mb-4">
        <AnimatePresence>
          {floatingBar && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center gap-3 bg-card border border-border shadow-md px-5 py-2.5 rounded-xl"
            >
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                Current Key
              </span>
              <div 
                className="w-8 h-8 rounded-md flex items-center justify-center font-bold text-sm"
                style={{ 
                  backgroundColor: "var(--color-viz-comparing)",
                  boxShadow: "0 0 12px hsla(45, 93%, 47%, 0.3)",
                  color: "#fff"
                }}
              >
                {floatingBar.value}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bars container */}
      <div className="flex items-end justify-center relative mb-12" style={{ gap: `${gap}px`, height: "280px", width: "100%" }}>
        <AnimatePresence mode="popLayout">
          {array.map((value, index) => {
            const heightPercent = (value / maxValue) * 100;
            const color = getBarColor(index);
            const glow = getBarGlow(index);
            const actionLabel = getActionLabel(index);
            const roleLabel = getRoleLabel(index);
            
            const isInPartition = partitionRegion && index >= partitionRegion[0] && index <= partitionRegion[1];
            const isOutsidePartition = partitionRegion && !isInPartition;
            const isInSortedRegion = sortedRegion && index >= sortedRegion[0] && index <= sortedRegion[1];

            return (
              <motion.div
                key={`bar-${index}`}
                layout
                className="flex flex-col items-center relative"
                style={{ width: `${barWidth}px` }}
                initial={false}
              >
                {/* Value label */}
                <motion.div
                  className="text-xs font-semibold mb-1 tabular-nums"
                  style={{ color, opacity: isOutsidePartition ? 0.4 : 1 }}
                  animate={{ scale: actionLabel === "SWAP" ? [1, 1.2, 1] : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {value}
                </motion.div>

                {/* Bar Background for Partition/Sorted Region */}
                {(isInPartition || isInSortedRegion) && (
                   <motion.div
                     className="absolute bottom-0 w-[120%] -z-10 rounded-sm"
                     style={{
                       backgroundColor: isInPartition ? "hsla(262, 83%, 58%, 0.1)" : "hsla(142, 71%, 45%, 0.1)",
                       height: "calc(100% + 40px)",
                       bottom: "-25px"
                     }}
                     layoutId={isInPartition ? "partition-bg" : "sorted-bg"}
                   />
                )}

                {/* Bar */}
                <motion.div
                  className="rounded-t-md relative w-full"
                  style={{
                    backgroundColor: color,
                    boxShadow: glow,
                    width: `${barWidth}px`,
                    opacity: isOutsidePartition ? 0.3 : 1
                  }}
                  animate={{
                    height: `${Math.max(heightPercent * 2.4, 12)}px`,
                    backgroundColor: color,
                    boxShadow: glow,
                    opacity: isOutsidePartition ? 0.3 : 1
                  }}
                  transition={{
                    height: { type: "spring", stiffness: 300, damping: 25 },
                    backgroundColor: { duration: 0.3 },
                    boxShadow: { duration: 0.3 },
                  }}
                />

                {/* Index label */}
                <div className="text-[10px] text-muted-foreground mt-1.5 tabular-nums">
                  {index}
                </div>

                {/* Status labels */}
                <div className="absolute -bottom-10 flex flex-col items-center gap-1">
                  <AnimatePresence>
                    {roleLabel && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        className="text-[9px] font-bold whitespace-nowrap"
                        style={{ color: "var(--color-viz-active)" }} // Roles are blue
                      >
                        {roleLabel}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <AnimatePresence>
                    {actionLabel && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        className="text-[9px] font-bold whitespace-nowrap"
                        style={{ color: actionLabel === "SWAP" ? "var(--color-viz-swapping)" : (actionLabel === "✓" ? "var(--color-viz-sorted)" : "var(--color-viz-comparing)") }}
                      >
                        {actionLabel}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Progress indicator */}
      <div className="mt-8 flex items-center gap-3 text-xs text-muted-foreground">
        <span>
          Sorted: {sortedIndices?.length || 0} / {array.length}
        </span>
        <div className="w-32 h-1.5 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: "var(--color-viz-sorted)" }}
            animate={{ width: `${((sortedIndices?.length || 0) / array.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </div>
  );
}
