import { motion, AnimatePresence } from "framer-motion";
import type { KadaneState } from "@/types";

interface KadaneVisualizerProps {
  state: KadaneState;
}

export function KadaneVisualizer({ state }: KadaneVisualizerProps) {
  const {
    array,
    currentIndex,
    currentSum,
    maxSum,
    currentStartIndex,
    maxStartIndex,
    maxEndIndex,
    phase,
  } = state;

  return (
    <div className="flex flex-col items-center w-full h-full p-4 overflow-y-auto min-h-[400px]">
      {/* Info Cards Row */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-10 w-full max-w-4xl shrink-0">
        <motion.div
          layout
          className={`flex flex-col items-center p-4 rounded-xl border min-w-[140px] transition-colors ${
            phase === "new-max-found" || phase === "complete"
              ? "border-emerald-500 bg-emerald-500/10 shadow-[0_0_20px_hsla(142,71%,45%,0.2)]"
              : "border-border bg-card"
          }`}
        >
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
            Max Sum
          </span>
          <span className={`text-2xl font-bold mt-1 ${phase === "new-max-found" || phase === "complete" ? "text-emerald-500" : "text-primary"}`}>
            {maxSum === -Infinity ? "-∞" : maxSum}
          </span>
        </motion.div>

        {phase !== "complete" && (
          <motion.div
            layout
            className={`flex flex-col items-center p-4 rounded-xl border min-w-[140px] transition-colors ${
              phase === "resetting-sum"
                ? "border-red-500 bg-red-500/10 shadow-[0_0_20px_hsla(0,84%,60%,0.2)]"
                : phase === "adding"
                ? "border-amber-500 bg-amber-500/10"
                : "border-border bg-card/50"
            }`}
          >
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
              Current Sum
            </span>
            <span className={`text-2xl font-bold mt-1 ${
              phase === "resetting-sum" ? "text-red-500" : phase === "adding" ? "text-amber-500" : "text-foreground"
            }`}>
              {currentSum}
            </span>
          </motion.div>
        )}
      </div>

      {/* Main Array Visualization */}
      <div className="w-full overflow-x-auto pb-8 custom-scrollbar">
        <div className="flex items-center justify-center min-w-max mx-auto px-4 gap-2 relative mt-4">
          <AnimatePresence mode="popLayout">
            {array.map((val, idx) => {
              const isCurrent = idx === currentIndex && phase !== "complete";
              
              // Max Subarray Logic
              const inMaxSubarray =
                maxStartIndex !== null &&
                maxEndIndex !== null &&
                idx >= maxStartIndex &&
                idx <= maxEndIndex;

              // Current Subarray Logic
              const inCurrentSubarray =
                currentIndex !== null &&
                idx >= currentStartIndex &&
                idx <= currentIndex &&
                phase !== "complete";

              return (
                <div key={`cell-wrap-${idx}`} className="flex flex-col items-center relative group">
                  
                  {/* Indicators Above */}
                  <div className="h-6 flex flex-col justify-end items-center mb-1 w-full">
                     {isCurrent && (
                        <motion.div 
                          initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                          className="text-[10px] font-bold text-amber-500"
                        >
                          i
                        </motion.div>
                     )}
                  </div>

                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-xl font-mono text-base md:text-xl border-2 transition-all duration-300 relative ${
                      isCurrent
                        ? "border-amber-500 bg-amber-500/20 text-amber-500 shadow-lg scale-110 z-20"
                        : inMaxSubarray && phase === "complete"
                        ? "border-emerald-500 bg-emerald-500/20 text-emerald-500 shadow-[0_0_15px_hsla(142,71%,45%,0.3)] z-10"
                        : inCurrentSubarray
                        ? "border-amber-500/50 bg-amber-500/10 text-foreground z-10"
                        : "border-border bg-card text-foreground opacity-50"
                    }`}
                  >
                    {val}

                    {/* Badge for Max Subarray Boundaries */}
                    {inMaxSubarray && idx === maxStartIndex && idx === maxEndIndex && (
                       <div className="absolute -bottom-6 text-[9px] text-emerald-500 font-bold whitespace-nowrap">
                         Max Array
                       </div>
                    )}
                    {inMaxSubarray && idx === maxStartIndex && idx !== maxEndIndex && (
                       <div className="absolute -bottom-6 text-[9px] text-emerald-500 font-bold whitespace-nowrap">
                         Max Start
                       </div>
                    )}
                    {inMaxSubarray && idx === maxEndIndex && idx !== maxStartIndex && (
                       <div className="absolute -bottom-6 text-[9px] text-emerald-500 font-bold whitespace-nowrap">
                         Max End
                       </div>
                    )}
                  </motion.div>
                  
                  <div className="text-[10px] text-muted-foreground mt-8 tabular-nums">
                    {idx}
                  </div>
                </div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Completion Banner */}
      <AnimatePresence>
        {phase === "complete" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 flex items-center gap-3 px-6 py-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 shadow-[0_0_20px_hsla(142,71%,45%,0.15)]"
          >
            <span className="text-2xl">🎉</span>
            <div className="flex flex-col">
              <span className="font-bold">Maximum Subarray Found!</span>
              <span className="text-xs opacity-80">
                Sum: {maxSum} (from index {maxStartIndex} to {maxEndIndex})
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
