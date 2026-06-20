import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NestedLoopVisualizationProps {
  currentArray?: number[];
}

/**
 * Standalone animated visualization showing WHY Bubble Sort is O(n²).
 * Shows two nested loops with an animated cursor tracking both i and j,
 * accumulating operations to demonstrate the quadratic growth pattern.
 */
export function NestedLoopVisualization({ currentArray }: NestedLoopVisualizationProps) {
  const N = currentArray ? currentArray.length : 6;
  const [isPlaying, setIsPlaying] = useState(true);
  const [outerIdx, setOuterIdx] = useState(0);
  const [innerIdx, setInnerIdx] = useState(0);
  const [totalOps, setTotalOps] = useState(0);
  const [phase, setPhase] = useState<"running" | "pass-done" | "complete">("running");

  useEffect(() => {
    if (!isPlaying || phase === "complete") return;

    const timer = setTimeout(() => {
      if (phase === "pass-done") {
        // Move to next outer iteration
        const nextOuter = outerIdx + 1;
        if (nextOuter >= N - 1) {
          setPhase("complete");
        } else {
          setOuterIdx(nextOuter);
          setInnerIdx(0);
          setPhase("running");
        }
        return;
      }

      // Inner loop step
      const innerLimit = N - outerIdx - 2;
      if (innerIdx >= innerLimit) {
        setPhase("pass-done");
      } else {
        setInnerIdx((prev) => prev + 1);
        setTotalOps((prev) => prev + 1);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [isPlaying, outerIdx, innerIdx, phase, N]);

  const handleReplay = () => {
    setOuterIdx(0);
    setInnerIdx(0);
    setTotalOps(0);
    setPhase("running");
    setIsPlaying(true);
  };

  // Calculate inner loop size for current outer iteration
  const innerLoopSize = N - outerIdx - 1;

  return (
    <div className="rounded-xl bg-card border border-border/50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-border/50">
        <div>
          <h4 className="text-sm font-semibold">Nested Loops Visualized</h4>
          <p className="text-[10px] text-muted-foreground">
            See how the inner loop runs for each outer iteration
          </p>
        </div>
        <div className="flex gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={handleReplay}
          >
            <RotateCcw size={14} />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Loop indicators */}
        <div className="flex gap-4">
          {/* Outer loop */}
          <div className="flex-1 rounded-lg border border-primary/30 bg-primary/5 p-3">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-primary mb-2">
              Outer Loop (i)
            </div>
            <div className="flex gap-1">
              {Array.from({ length: N - 1 }).map((_, i) => (
                <motion.div
                  key={i}
                  className={`w-8 h-8 rounded-md flex items-center justify-center text-xs font-mono font-bold border transition-colors ${
                    i === outerIdx
                      ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25"
                      : i < outerIdx
                      ? "bg-primary/20 text-primary border-primary/30"
                      : "bg-card text-muted-foreground border-border/50"
                  }`}
                  animate={{
                    scale: i === outerIdx ? 1.1 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {i}
                </motion.div>
              ))}
            </div>
            <div className="text-[10px] text-muted-foreground mt-1.5 font-mono">
              Pass {outerIdx + 1} of {N - 1}
            </div>
          </div>

          {/* Inner loop */}
          <div className="flex-1 rounded-lg border border-viz-active/30 bg-viz-active/5 p-3">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-viz-active mb-2">
              Inner Loop (j) — {innerLoopSize} iterations
            </div>
            <div className="flex gap-1 flex-wrap">
              {Array.from({ length: innerLoopSize }).map((_, j) => (
                <motion.div
                  key={j}
                  className={`w-8 h-8 rounded-md flex items-center justify-center text-xs font-mono font-bold border transition-colors ${
                    j === innerIdx && phase === "running"
                      ? "bg-viz-active text-white border-viz-active shadow-lg shadow-viz-active/25"
                      : j < innerIdx || phase === "pass-done" || phase === "complete"
                      ? "bg-viz-active/20 text-viz-active border-viz-active/30"
                      : "bg-card text-muted-foreground border-border/50"
                  }`}
                  animate={{
                    scale: j === innerIdx && phase === "running" ? 1.1 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {j}
                </motion.div>
              ))}
            </div>
            <div className="text-[10px] text-muted-foreground mt-1.5 font-mono">
              {phase === "pass-done"
                ? `Done! ${innerLoopSize} comparisons this pass`
                : phase === "complete"
                ? "All passes complete"
                : `Step ${innerIdx + 1} of ${innerLoopSize}`}
            </div>
          </div>
        </div>

        {/* Operations counter + insight */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border/50">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Total Comparisons
            </div>
            <motion.div
              className="text-2xl font-bold font-mono tabular-nums text-primary"
              key={totalOps}
              initial={{ scale: 1.3 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              {totalOps}
            </motion.div>
          </div>

          <div className="text-right">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Expected Total
            </div>
            <div className="text-lg font-mono font-bold text-muted-foreground">
              {(N * (N - 1)) / 2}
            </div>
            <div className="text-[10px] text-muted-foreground font-mono">
              n(n-1)/2 = {N}×{N - 1}/2
            </div>
          </div>
        </div>

        {/* Key insight */}
        <div className="text-xs text-muted-foreground leading-relaxed p-3 rounded-lg border border-border/30 bg-primary/5">
          <span className="text-primary font-semibold">Key Insight:</span>{" "}
          {phase === "complete" ? (
            <>
              The inner loop ran <span className="font-mono font-bold text-foreground">{N - 1}</span>,
              then <span className="font-mono font-bold text-foreground">{N - 2}</span>,
              then <span className="font-mono font-bold text-foreground">{N - 3}</span>...
              down to <span className="font-mono font-bold text-foreground">1</span> time.
              That&apos;s {N - 1} + {N - 2} + ... + 1 = <span className="font-mono font-bold text-primary">{(N * (N - 1)) / 2}</span> total operations.
              This sum equals <span className="font-mono font-bold text-primary">n(n-1)/2 ≈ n²</span>.
            </>
          ) : (
            <>
              Notice how the inner loop gets <span className="font-semibold text-foreground">shorter</span> each pass —
              it only needs to check unsorted elements. But the total work still adds up to roughly n².
            </>
          )}
        </div>
      </div>
    </div>
  );
}
