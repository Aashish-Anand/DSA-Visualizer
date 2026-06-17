import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import type { DP1DState } from "@/types";

interface DP1DVisualizerProps {
  state: DP1DState;
}

export function DP1DVisualizer({ state }: DP1DVisualizerProps) {
  const { dpArray, inputArray, currentIndex, dependencies, phase, result } = state;

  return (
    <div className="flex flex-col items-center w-full h-full p-4 overflow-y-auto min-h-[400px]">
      {/* Result Info */}
      <div className="flex flex-col items-center gap-2 mb-10 min-h-[100px]">
        {phase === "complete" && result !== null ? (
          <>
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Result</span>
            <div className="w-16 h-16 flex items-center justify-center rounded-xl border-2 border-emerald-500 bg-emerald-500/10 text-emerald-500 text-2xl font-mono shadow-[0_0_15px_hsla(142,71%,45%,0.3)] transition-colors">
              {result}
            </div>
            <Badge className="bg-emerald-500 text-white border-none mt-2">Solved</Badge>
          </>
        ) : (
          <div className="flex flex-col items-center opacity-50">
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">Calculating DP Table...</span>
            <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          </div>
        )}
      </div>

      {/* DP Array Container */}
      <div className="w-full overflow-x-auto pb-8 custom-scrollbar">
        <div className="flex flex-col items-center gap-6">
          
          {/* Optional Input Array (e.g., costs) */}
          {inputArray && (
            <div className="flex flex-col items-center gap-2 opacity-60">
              <span className="text-[10px] font-bold text-muted-foreground tracking-wider uppercase">Input Array (Costs)</span>
              <div className="flex flex-nowrap items-center justify-center gap-2 p-3 bg-card/30 rounded-xl border border-border/30">
                {inputArray.map((val, idx) => (
                  <div key={`input-${idx}`} className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 flex items-center justify-center rounded-md font-mono text-sm border border-border/50 bg-card text-muted-foreground">
                      {val}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DP Array */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-bold text-primary tracking-wider uppercase">DP Table (State)</span>
            <div className="flex flex-nowrap items-center justify-center gap-2 p-6 bg-card/50 rounded-2xl border border-border/50 relative">
              <AnimatePresence mode="popLayout">
                {dpArray.map((val, idx) => {
                  const isCurrent = currentIndex === idx;
                  const isDependency = dependencies.includes(idx);
                  const isFilled = val !== null;
                  
                  return (
                    <motion.div
                      key={`dp-${idx}`}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col items-center gap-2 relative"
                    >
                      {/* Pointer Labels (top) */}
                      <div className="h-6 flex flex-col items-center justify-end">
                        {isCurrent && (
                          <motion.div 
                            initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                            className="text-[10px] font-bold text-amber-500"
                          >
                            dp[{idx}]
                          </motion.div>
                        )}
                        {isDependency && !isCurrent && (
                          <motion.div 
                            initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                            className="text-[10px] font-bold text-blue-500"
                          >
                            uses
                          </motion.div>
                        )}
                      </div>

                      {/* Array Cell */}
                      <motion.div
                        className={`w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-lg font-mono text-base md:text-lg border-2 transition-all duration-300 ${
                          isCurrent ? "border-amber-500 bg-amber-500/10 text-amber-500 shadow-md scale-110 z-20" :
                          isDependency ? "border-blue-500 bg-blue-500/10 text-blue-500 shadow-[0_0_15px_hsla(221,83%,53%,0.3)] scale-105 z-10" :
                          isFilled ? "border-primary/40 bg-primary/5 text-foreground" :
                          "border-border border-dashed bg-card text-muted-foreground/30"
                        }`}
                        animate={{
                          y: isCurrent ? -4 : 0
                        }}
                      >
                        {val !== null ? val : "∞"}
                      </motion.div>

                      {/* Index (bottom) */}
                      <div className={`text-[10px] font-mono mt-1 ${isCurrent ? "text-amber-500 font-bold" : "text-muted-foreground"}`}>
                        {idx}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-6 mt-4 text-[11px] text-muted-foreground bg-card/30 px-4 py-2 rounded-full border border-border/50">
         <div className="flex items-center gap-2">
           <div className="w-3 h-3 rounded-sm border-2 border-amber-500 bg-amber-500/10" />
           <span>Calculating Current</span>
         </div>
         <div className="flex items-center gap-2">
           <div className="w-3 h-3 rounded-sm border-2 border-blue-500 bg-blue-500/10" />
           <span>Dependency (Used in calculation)</span>
         </div>
      </div>
    </div>
  );
}
