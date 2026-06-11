import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import type { ArraySearchState } from "@/types";

interface ArraySearchVisualizerProps {
  state: ArraySearchState;
}

export function ArraySearchVisualizer({ state }: ArraySearchVisualizerProps) {
  const { array, target, currentIndex, lowIndex, highIndex, midIndex, foundIndex, status } = state;

  return (
    <div className="flex flex-col items-center w-full h-full p-4 overflow-y-auto min-h-[400px]">
      {/* Target Info */}
      <div className="flex flex-col items-center gap-2 mb-10">
        <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Target</span>
        <div className={`w-16 h-16 flex items-center justify-center rounded-xl border-2 text-2xl font-mono shadow-md transition-colors ${
          status === "found" ? "bg-emerald-500/10 border-emerald-500 text-emerald-500 shadow-[0_0_15px_hsla(142,71%,45%,0.3)]" :
          status === "not-found" ? "bg-red-500/10 border-red-500 text-red-500" :
          "bg-card border-primary/50 text-foreground"
        }`}>
          {target}
        </div>
        {status === "found" && (
          <Badge className="bg-emerald-500 text-white border-none mt-2">Found!</Badge>
        )}
        {status === "not-found" && (
          <Badge variant="destructive" className="mt-2">Not Found</Badge>
        )}
      </div>

      {/* Array Container */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl p-8 bg-card/30 rounded-2xl border border-border/50">
        <AnimatePresence mode="popLayout">
          {array.map((val, idx) => {
            const isFound = foundIndex === idx;
            const isCurrent = currentIndex === idx;
            const isMid = midIndex === idx;
            const isLow = lowIndex === idx;
            const isHigh = highIndex === idx;
            
            // Logic to dim elements outside binary search bounds
            let isDimmed = false;
            if (lowIndex !== null && highIndex !== null) {
              isDimmed = idx < lowIndex || idx > highIndex;
            } else if (lowIndex !== null && highIndex === null) {
              isDimmed = idx < lowIndex;
            }

            return (
              <motion.div
                key={`cell-${idx}`}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-2 relative"
              >
                {/* Pointer Labels (top) */}
                <div className="h-6 flex flex-col items-center justify-end">
                  {isCurrent && !isMid && (
                    <motion.div 
                      initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                      className="text-[10px] font-bold text-amber-500"
                    >
                      CURR
                    </motion.div>
                  )}
                  {isMid && (
                    <motion.div 
                      initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                      className="text-[10px] font-bold text-blue-500"
                    >
                      MID
                    </motion.div>
                  )}
                  {isLow && !isMid && (
                    <motion.div 
                      initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                      className="text-[10px] font-bold text-primary"
                    >
                      LOW
                    </motion.div>
                  )}
                  {isHigh && !isMid && (
                    <motion.div 
                      initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                      className="text-[10px] font-bold text-primary"
                    >
                      HIGH
                    </motion.div>
                  )}
                </div>

                {/* Array Cell */}
                <motion.div
                  className={`w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-lg font-mono text-base md:text-lg border-2 transition-all duration-300 ${
                    isFound ? "border-emerald-500 bg-emerald-500/20 text-emerald-500 shadow-[0_0_20px_hsla(142,71%,45%,0.4)] scale-110 z-10" :
                    isMid ? "border-blue-500 bg-blue-500/10 text-blue-500 shadow-md scale-105 z-10" :
                    isCurrent ? "border-amber-500 bg-amber-500/10 text-amber-500 shadow-md scale-105 z-10" :
                    isDimmed ? "border-border/40 bg-muted/20 text-muted-foreground opacity-30" :
                    "border-border bg-card text-foreground shadow-sm"
                  }`}
                  animate={{
                    y: isFound || isCurrent || isMid ? -4 : 0
                  }}
                >
                  {val}
                </motion.div>

                {/* Index (bottom) */}
                <div className="text-[10px] text-muted-foreground font-mono mt-1">
                  {idx}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-8 text-[11px] text-muted-foreground">
         <div className="flex items-center gap-1">
           <div className="w-3 h-3 rounded-sm border-2 border-amber-500 bg-amber-500/10" />
           <span>Checking</span>
         </div>
         <div className="flex items-center gap-1">
           <div className="w-3 h-3 rounded-sm border-2 border-emerald-500 bg-emerald-500/20" />
           <span>Found</span>
         </div>
         <div className="flex items-center gap-1">
           <div className="w-3 h-3 rounded-sm border-2 border-blue-500 bg-blue-500/10" />
           <span>Mid Point (Binary)</span>
         </div>
      </div>
    </div>
  );
}
