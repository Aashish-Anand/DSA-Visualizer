import { motion, AnimatePresence } from "framer-motion";
import type { RadixSortState } from "@/types";

interface RadixSortVisualizerProps {
  state: RadixSortState;
}

export function RadixSortVisualizer({ state }: RadixSortVisualizerProps) {
  const { array, currentDigit, buckets, highlightedIndex, highlightedDigit, phase, sortedIndices, currentBucket } = state;

  const maxValue = Math.max(...array, 1);
  const barWidth = Math.max(16, Math.min(48, 600 / array.length));

  return (
    <div className="flex flex-col items-center w-full h-full p-4 overflow-y-auto min-h-[500px]">
      {/* Header Info */}
      <div className="flex items-center gap-6 mb-8 mt-2">
        <div className="flex items-center gap-2 bg-card border border-border px-4 py-2 rounded-lg shadow-sm">
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Phase:</span>
          <span className="text-sm font-medium">
            {phase === "distributing" ? "Distributing to Buckets" : phase === "collecting" ? "Collecting from Buckets" : "Complete"}
          </span>
        </div>
        {phase !== "complete" && (
          <div className="flex items-center gap-2 bg-card border border-border px-4 py-2 rounded-lg shadow-sm">
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Digit Place:</span>
            <span className="text-sm font-medium font-mono text-primary">
              1{Array(currentDigit).fill('0').join('')}s
            </span>
          </div>
        )}
      </div>

      {/* Main Array Top Level */}
      <div className="flex items-end justify-center mb-12 h-[120px] gap-2">
        <AnimatePresence mode="popLayout">
          {array.map((val, idx) => {
            const heightPercent = (val / maxValue) * 100;
            const isHighlighted = highlightedIndex === idx && phase === "distributing";
            const isSorted = sortedIndices.includes(idx);
            
            let color = "var(--color-viz-default)";
            let glow = "none";
            let opacity = 1;

            if (isSorted) {
              color = "var(--color-viz-sorted)";
              glow = "0 0 12px hsla(142, 71%, 45%, 0.3)";
            } else if (isHighlighted) {
              color = "var(--color-viz-comparing)";
              glow = "0 0 20px hsla(45, 93%, 47%, 0.4)";
            } else if (phase === "distributing" && idx < (highlightedIndex || 0)) {
              // Dim elements that have already been distributed in this pass
              opacity = 0.3;
            } else if (phase === "collecting" && !isSorted) {
              // Dim elements not yet collected
              opacity = 0.3;
            }

            // Extract the current digit for highlighting
            const valStr = val.toString();
            // Removed unused digitChar

            return (
              <motion.div
                key={`main-arr-${idx}-${val}`}
                layout
                className="flex flex-col items-center"
                style={{ opacity }}
              >
                <div className="text-xs font-semibold mb-2 font-mono flex items-center justify-center">
                  {phase !== "complete" && valStr.length <= currentDigit && (
                    <span className={isHighlighted ? "text-primary font-bold text-sm" : "opacity-30"}>
                      0
                    </span>
                  )}
                  {valStr.split('').map((char, charIdx) => {
                    const isTargetDigit = charIdx === valStr.length - 1 - currentDigit;
                    return (
                      <span 
                        key={charIdx} 
                        className={isTargetDigit && (isHighlighted || isSorted) ? "text-primary font-bold text-sm" : ""}
                        style={{ color: isTargetDigit && isHighlighted ? "var(--color-viz-comparing)" : undefined }}
                      >
                        {char}
                      </span>
                    );
                  })}
                </div>
                <motion.div
                  className="rounded-t-sm"
                  style={{ backgroundColor: color, boxShadow: glow, width: `${barWidth}px` }}
                  animate={{ height: `${Math.max(heightPercent, 10)}px`, backgroundColor: color, boxShadow: glow }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* 10 Buckets */}
      <div className="w-full max-w-5xl bg-card/30 border border-border rounded-xl p-6 relative">
        <div className="absolute -top-3 left-4 bg-background px-2 text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
          Digit Buckets (0-9)
        </div>
        
        <div className="grid grid-cols-5 md:grid-cols-10 gap-4">
          {buckets.map((bucket, bucketIdx) => {
            const isActiveBucket = currentBucket === bucketIdx || highlightedDigit === bucketIdx;
            
            return (
              <div 
                key={`bucket-${bucketIdx}`}
                className={`flex flex-col items-center border rounded-lg overflow-hidden transition-colors duration-300 ${
                  isActiveBucket 
                    ? "border-primary/50 bg-primary/5" 
                    : "border-border/50 bg-background/50"
                }`}
              >
                {/* Bucket Label */}
                <div className={`w-full py-1 text-center text-xs font-bold border-b ${
                  isActiveBucket ? "bg-primary/20 text-primary border-primary/20" : "bg-muted/50 text-muted-foreground border-border/50"
                }`}>
                  {bucketIdx}
                </div>
                
                {/* Bucket Contents */}
                <div className="w-full flex flex-col items-center justify-end p-2 gap-1 min-h-[140px]">
                  <AnimatePresence mode="popLayout">
                    {bucket.map((val, idx) => {
                      const isBeingCollected = phase === "collecting" && isActiveBucket && idx === 0;
                      
                      return (
                        <motion.div
                          key={`bucket-${bucketIdx}-val-${val}-${idx}`}
                          layout
                          initial={{ opacity: 0, scale: 0.5, y: -20 }}
                          animate={{ 
                            opacity: 1, 
                            scale: isBeingCollected ? 1.2 : 1, 
                            y: 0,
                            backgroundColor: isBeingCollected ? "var(--color-viz-comparing)" : "var(--color-viz-active)",
                            color: isBeingCollected ? "black" : "white"
                          }}
                          exit={{ opacity: 0, scale: 0.5, y: 20 }}
                          transition={{ duration: 0.3 }}
                          className="w-full py-1 text-center text-xs font-mono font-medium rounded shadow-sm"
                        >
                          {val}
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
