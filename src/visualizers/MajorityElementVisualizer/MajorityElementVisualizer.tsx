import { motion, AnimatePresence } from "framer-motion";
import type { MajorityElement1State, MajorityElement2State } from "@/types";

interface MajorityElementVisualizerProps {
  // We'll use a discriminated union later for ME2. For now, it's just ME1.
  state: MajorityElement1State | MajorityElement2State;
  variant: "majority-1" | "majority-2";
}

export function MajorityElementVisualizer({ state, variant }: MajorityElementVisualizerProps) {
  
  if (variant === "majority-1") {
    const s = state as MajorityElement1State;
    return <Majority1View state={s} />;
  }

  const s2 = state as MajorityElement2State;
  return <Majority2View state={s2} />;
}

function Majority1View({ state }: { state: MajorityElement1State }) {
  const { array, currentIndex, candidate, count, phase } = state;

  return (
    <div className="flex flex-col items-center w-full h-full p-4 overflow-y-auto min-h-[400px]">
      
      {/* Candidate Dashboard */}
      <div className="flex flex-col items-center justify-center w-full max-w-4xl shrink-0 mt-8 mb-16">
        <div className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-widest">
          Voting Dashboard
        </div>
        
        <motion.div
          layout
          className={`flex flex-col items-center p-6 rounded-2xl border-2 transition-all duration-300 min-w-[200px] ${
            phase === "complete"
              ? "border-emerald-500 bg-emerald-500/10 shadow-[0_0_30px_hsla(142,71%,45%,0.3)]"
              : phase === "new-candidate"
              ? "border-primary bg-primary/10 shadow-[0_0_20px_hsla(var(--primary),0.3)] scale-105"
              : candidate !== null
              ? "border-primary/50 bg-card/80"
              : "border-border border-dashed bg-card/30 opacity-50"
          }`}
        >
          <span className="text-xs uppercase tracking-wider text-muted-foreground font-bold mb-2">
            {phase === "complete" ? "Winner!" : "Current Candidate"}
          </span>
          <div className="flex items-end gap-4">
             <div className="flex flex-col items-center">
                <span className={`text-4xl font-black ${phase === "complete" ? "text-emerald-500" : "text-primary"}`}>
                  {candidate !== null ? candidate : "?"}
                </span>
             </div>
             
             {candidate !== null && (
               <div className="flex flex-col items-center ml-4">
                 <span className="text-[10px] text-muted-foreground font-bold">VOTES</span>
                 <motion.span 
                   key={`count-${count}`}
                   initial={{ opacity: 0, y: -10 }}
                   animate={{ opacity: 1, y: 0 }}
                   className={`text-2xl font-bold ${
                     phase === "increment" ? "text-emerald-500" : phase === "decrement" ? "text-red-500" : "text-foreground"
                   }`}
                 >
                   {count}
                 </motion.span>
               </div>
             )}
          </div>
        </motion.div>
      </div>

      {/* Array Display */}
      <div className="w-full overflow-x-auto pb-8 custom-scrollbar">
        <div className="flex items-center justify-center min-w-max mx-auto px-4 gap-3 relative mt-4">
          <AnimatePresence mode="popLayout">
            {array.map((val, idx) => {
              const isCurrent = idx === currentIndex && phase !== "complete";
              const isMatch = isCurrent && val === candidate && phase === "increment";
              const isMismatch = isCurrent && val !== candidate && phase === "decrement";

              return (
                <div key={`cell-${idx}`} className="flex flex-col items-center relative group">
                  
                  {/* Indicators Above */}
                  <div className="h-6 flex flex-col justify-end items-center mb-2 w-full">
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
                    className={`w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-xl font-mono text-xl font-bold border-2 transition-all duration-300 relative ${
                      isMatch
                        ? "border-emerald-500 bg-emerald-500/20 text-emerald-500 shadow-[0_0_15px_hsla(142,71%,45%,0.3)] scale-110 z-20"
                        : isMismatch
                        ? "border-red-500 bg-red-500/20 text-red-500 shadow-[0_0_15px_hsla(0,84%,60%,0.3)] scale-110 z-20"
                        : phase === "new-candidate" && isCurrent
                        ? "border-primary bg-primary/20 text-primary shadow-[0_0_15px_hsla(var(--primary),0.3)] scale-110 z-20"
                        : isCurrent
                        ? "border-amber-500 bg-amber-500/20 text-amber-500 scale-105 z-10"
                        : phase === "complete" && val === candidate
                        ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-500"
                        : "border-border bg-card text-foreground opacity-70"
                    }`}
                  >
                    {val}
                  </motion.div>
                  
                  <div className="text-[10px] text-muted-foreground mt-3 tabular-nums">
                    {idx}
                  </div>
                </div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Majority2View({ state }: { state: MajorityElement2State }) {
  const { array, currentIndex, candidate1, count1, candidate2, count2, phase } = state;

  return (
    <div className="flex flex-col items-center w-full h-full p-4 overflow-y-auto min-h-[400px]">
      
      {/* Candidate Dashboard */}
      <div className="flex flex-col items-center justify-center w-full max-w-4xl shrink-0 mt-8 mb-16">
        <div className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-widest">
          Voting Dashboard
        </div>
        
        <div className="flex flex-wrap justify-center gap-8 w-full">
          {/* Candidate 1 */}
          <motion.div
            layout
            className={`flex flex-col items-center p-6 rounded-2xl border-2 transition-all duration-300 min-w-[200px] ${
              phase === "complete" && candidate1 !== null
                ? "border-emerald-500 bg-emerald-500/10 shadow-[0_0_30px_hsla(142,71%,45%,0.3)]"
                : phase === "new-cand1"
                ? "border-primary bg-primary/10 shadow-[0_0_20px_hsla(var(--primary),0.3)] scale-105"
                : phase === "decrement-both"
                ? "border-red-500 bg-red-500/10 shadow-[0_0_20px_hsla(0,84%,60%,0.2)]"
                : candidate1 !== null
                ? "border-primary/50 bg-card/80"
                : "border-border border-dashed bg-card/30 opacity-50"
            }`}
          >
            <span className="text-xs uppercase tracking-wider text-muted-foreground font-bold mb-2">
              {phase === "complete" ? (candidate1 !== null ? "Winner 1!" : "Discarded") : "Candidate 1"}
            </span>
            <div className="flex items-end gap-4">
              <div className="flex flex-col items-center">
                  <span className={`text-4xl font-black ${phase === "complete" && candidate1 !== null ? "text-emerald-500" : "text-primary"}`}>
                    {candidate1 !== null ? candidate1 : "?"}
                  </span>
              </div>
              
              {candidate1 !== null && phase !== "complete" && (
                <div className="flex flex-col items-center ml-4">
                  <span className="text-[10px] text-muted-foreground font-bold">VOTES</span>
                  <motion.span 
                    key={`count1-${count1}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-2xl font-bold ${
                      phase === "vote-cand1" ? "text-emerald-500" : phase === "decrement-both" ? "text-red-500" : "text-foreground"
                    }`}
                  >
                    {count1}
                  </motion.span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Candidate 2 */}
          <motion.div
            layout
            className={`flex flex-col items-center p-6 rounded-2xl border-2 transition-all duration-300 min-w-[200px] ${
              phase === "complete" && candidate2 !== null
                ? "border-emerald-500 bg-emerald-500/10 shadow-[0_0_30px_hsla(142,71%,45%,0.3)]"
                : phase === "new-cand2"
                ? "border-amber-500 bg-amber-500/10 shadow-[0_0_20px_hsla(var(--amber-500),0.3)] scale-105"
                : phase === "decrement-both"
                ? "border-red-500 bg-red-500/10 shadow-[0_0_20px_hsla(0,84%,60%,0.2)]"
                : candidate2 !== null
                ? "border-amber-500/50 bg-card/80"
                : "border-border border-dashed bg-card/30 opacity-50"
            }`}
          >
            <span className="text-xs uppercase tracking-wider text-muted-foreground font-bold mb-2">
              {phase === "complete" ? (candidate2 !== null ? "Winner 2!" : "Discarded") : "Candidate 2"}
            </span>
            <div className="flex items-end gap-4">
              <div className="flex flex-col items-center">
                  <span className={`text-4xl font-black ${phase === "complete" && candidate2 !== null ? "text-emerald-500" : "text-amber-500"}`}>
                    {candidate2 !== null ? candidate2 : "?"}
                  </span>
              </div>
              
              {candidate2 !== null && phase !== "complete" && (
                <div className="flex flex-col items-center ml-4">
                  <span className="text-[10px] text-muted-foreground font-bold">VOTES</span>
                  <motion.span 
                    key={`count2-${count2}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-2xl font-bold ${
                      phase === "vote-cand2" ? "text-emerald-500" : phase === "decrement-both" ? "text-red-500" : "text-foreground"
                    }`}
                  >
                    {count2}
                  </motion.span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Array Display */}
      <div className="w-full overflow-x-auto pb-8 custom-scrollbar">
        <div className="flex items-center justify-center min-w-max mx-auto px-4 gap-3 relative mt-4">
          <AnimatePresence mode="popLayout">
            {array.map((val, idx) => {
              const isCurrent = idx === currentIndex && phase !== "complete" && phase !== "verify";
              const isMatch1 = isCurrent && val === candidate1 && phase === "vote-cand1";
              const isMatch2 = isCurrent && val === candidate2 && phase === "vote-cand2";
              const isMismatch = isCurrent && phase === "decrement-both";

              return (
                <div key={`cell-${idx}`} className="flex flex-col items-center relative group">
                  
                  {/* Indicators Above */}
                  <div className="h-6 flex flex-col justify-end items-center mb-2 w-full">
                     {isCurrent && (
                        <motion.div 
                          initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                          className="text-[10px] font-bold text-blue-500"
                        >
                          i
                        </motion.div>
                     )}
                  </div>

                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-xl font-mono text-xl font-bold border-2 transition-all duration-300 relative ${
                      isMatch1
                        ? "border-emerald-500 bg-emerald-500/20 text-emerald-500 shadow-[0_0_15px_hsla(142,71%,45%,0.3)] scale-110 z-20"
                        : isMatch2
                        ? "border-emerald-500 bg-emerald-500/20 text-emerald-500 shadow-[0_0_15px_hsla(142,71%,45%,0.3)] scale-110 z-20"
                        : isMismatch
                        ? "border-red-500 bg-red-500/20 text-red-500 shadow-[0_0_15px_hsla(0,84%,60%,0.3)] scale-110 z-20"
                        : phase === "new-cand1" && isCurrent
                        ? "border-primary bg-primary/20 text-primary shadow-[0_0_15px_hsla(var(--primary),0.3)] scale-110 z-20"
                        : phase === "new-cand2" && isCurrent
                        ? "border-amber-500 bg-amber-500/20 text-amber-500 shadow-[0_0_15px_hsla(var(--amber-500),0.3)] scale-110 z-20"
                        : isCurrent
                        ? "border-blue-500 bg-blue-500/20 text-blue-500 scale-105 z-10"
                        : phase === "complete" && (val === candidate1 || val === candidate2)
                        ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-500"
                        : phase === "verify" && (val === candidate1 || val === candidate2)
                        ? "border-blue-500/50 bg-blue-500/10 text-blue-500"
                        : "border-border bg-card text-foreground opacity-70"
                    }`}
                  >
                    {val}
                  </motion.div>
                  
                  <div className="text-[10px] text-muted-foreground mt-3 tabular-nums">
                    {idx}
                  </div>
                </div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
