import { motion } from "framer-motion";
import type { CountingSortState } from "@/types";

interface CountingSortVisualizerProps {
  state: CountingSortState;
}

export function CountingSortVisualizer({ state }: CountingSortVisualizerProps) {
  const { inputArray, countArray, outputArray, currentIndex, highlightedCountIndex, phase, sortedIndices } = state;

  return (
    <div className="flex flex-col items-center w-full h-full p-4 overflow-y-auto min-h-[500px]">
      {/* Header Info */}
      <div className="flex items-center gap-6 mb-6 mt-2">
        <div className="flex items-center gap-2 bg-card border border-border px-4 py-2 rounded-lg shadow-sm">
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Phase:</span>
          <span className="text-sm font-medium text-primary">
            {phase === "counting" ? "Counting Frequencies" : 
             phase === "accumulating" ? "Accumulating Counts" : 
             phase === "placing" ? "Placing Elements" : "Complete"}
          </span>
        </div>
      </div>

      <div className="w-full max-w-4xl flex flex-col gap-10">
        
        {/* Input Array */}
        <div className="flex flex-col gap-2">
          <div className="text-xs uppercase tracking-wider font-semibold text-muted-foreground ml-2">1. Input Array</div>
          <div className="w-full overflow-x-auto pb-2 custom-scrollbar">
            <div className="flex flex-nowrap gap-2 min-w-max px-2">
            {inputArray.map((val, idx) => {
              const isHighlighted = (phase === "counting" || phase === "placing") && currentIndex === idx;
              
              return (
                <div key={`input-${idx}`} className="flex flex-col items-center gap-1">
                  <motion.div
                    layout
                    className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-md font-mono font-medium text-sm md:text-base border-2 transition-colors ${
                      isHighlighted 
                        ? "border-primary bg-primary/10 text-primary scale-110 shadow-lg z-10" 
                        : phase === "placing" && idx > (currentIndex ?? -1)
                          ? "border-border bg-card opacity-50"
                          : "border-border bg-card"
                    }`}
                  >
                    {val}
                  </motion.div>
                  <div className="text-[10px] text-muted-foreground">{idx}</div>
                </div>
              );
            })}
            </div>
          </div>
        </div>

        {/* Count Array */}
        <div className="flex flex-col gap-2 bg-muted/20 p-4 rounded-xl border border-border/50">
          <div className="text-xs uppercase tracking-wider font-semibold text-muted-foreground ml-2 flex justify-between">
            <span>2. Count Array (Index = Value)</span>
            {phase === "accumulating" && <span className="text-amber-500 animate-pulse">Adding previous counts...</span>}
          </div>
          <div className="w-full overflow-x-auto pb-2 custom-scrollbar">
            <div className="flex flex-nowrap gap-2 min-w-max px-2">
            {countArray.map((count, idx) => {
              const isHighlighted = highlightedCountIndex === idx;
              
              return (
                <div key={`count-${idx}`} className="flex flex-col items-center gap-1">
                  <div className="text-[10px] font-bold text-foreground/70">{idx}</div>
                  <motion.div
                    layout
                    className={`w-10 h-10 md:w-12 md:h-12 flex flex-col items-center justify-end rounded-md overflow-hidden relative border transition-colors ${
                      isHighlighted 
                        ? "border-amber-500 shadow-[0_0_15px_hsla(45,93%,47%,0.3)] z-10" 
                        : "border-border bg-card/50"
                    }`}
                  >
                    {/* Bar Fill */}
                    <motion.div 
                      className="absolute bottom-0 w-full opacity-30"
                      style={{ 
                        backgroundColor: isHighlighted ? "var(--color-viz-comparing)" : "var(--color-viz-active)",
                      }}
                      animate={{ height: `${Math.min(100, (count / (inputArray.length || 1)) * 100)}%` }}
                    />
                    <span className={`relative z-10 mb-2 font-mono text-sm font-semibold ${isHighlighted ? "text-amber-500" : ""}`}>
                      {count}
                    </span>
                  </motion.div>
                </div>
              );
            })}
            </div>
          </div>
        </div>

        {/* Output Array */}
        <div className="flex flex-col gap-2">
          <div className="text-xs uppercase tracking-wider font-semibold text-muted-foreground ml-2">3. Output Array</div>
          <div className="w-full overflow-x-auto pb-2 custom-scrollbar">
            <div className="flex flex-nowrap gap-2 min-w-max px-2">
            {outputArray.map((val, idx) => {
              const isNewlyPlaced = phase === "placing" && val !== null && !sortedIndices.includes(idx) && idx === currentIndex; // Note: generator needs to manage this correctly
              const isSorted = sortedIndices.includes(idx);
              
              return (
                <div key={`output-${idx}`} className="flex flex-col items-center gap-1">
                  <motion.div
                    layout
                    className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-md font-mono font-medium text-sm md:text-base border-2 transition-all ${
                      val === null 
                        ? "border-dashed border-border/50 bg-transparent" 
                        : isSorted
                          ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-500 shadow-[0_0_10px_hsla(142,71%,45%,0.2)]"
                          : isNewlyPlaced
                            ? "border-amber-500 bg-amber-500/10 text-amber-500 scale-110 shadow-lg"
                            : "border-primary bg-primary/10 text-primary shadow-sm"
                    }`}
                  >
                    {val !== null ? val : ""}
                  </motion.div>
                  <div className="text-[10px] text-muted-foreground">{idx}</div>
                </div>
              );
            })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
