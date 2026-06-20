import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HashmapLookupVisualizationProps {
  currentArray?: number[];
  currentTarget?: number;
}

const DEFAULT_ARRAY = [3, 7, 1, 5, 9, 2, 8, 4];
const DEFAULT_TARGET = 10;

/**
 * Standalone animated visualization showing WHY Two Sum with HashMap is O(n).
 * Contrasts HashMap approach (O(1) per lookup) vs brute-force (O(n) per check),
 * making the speedup viscerally obvious.
 */
export function HashmapLookupVisualization({
  currentArray,
  currentTarget,
}: HashmapLookupVisualizationProps) {
  const ARRAY = currentArray ?? DEFAULT_ARRAY;
  const TARGET = currentTarget ?? DEFAULT_TARGET;

  const [isPlaying, setIsPlaying] = useState(true);
  const [step, setStep] = useState(0);
  const [hashEntries, setHashEntries] = useState<{ key: number; idx: number }[]>([]);
  const [lookupResult, setLookupResult] = useState<"none" | "miss" | "hit">("none");
  const [bruteForceOps, setBruteForceOps] = useState(0);
  const [hashmapOps, setHashmapOps] = useState(0);
  const [foundPair, setFoundPair] = useState<[number, number] | null>(null);

  const totalSteps = ARRAY.length;

  useEffect(() => {
    if (!isPlaying || step >= totalSteps || foundPair) return;

    const timer = setTimeout(() => {
      const num = ARRAY[step];
      const complement = TARGET - num;

      // Brute force would check all previous elements
      setBruteForceOps((prev) => prev + step);

      // HashMap: 1 lookup + possible 1 insert
      setHashmapOps((prev) => prev + 1);

      const found = hashEntries.find((e) => e.key === complement);
      if (found) {
        setLookupResult("hit");
        setFoundPair([found.idx, step]);
      } else {
        setLookupResult("miss");
        setHashEntries((prev) => [...prev, { key: num, idx: step }]);
        setHashmapOps((prev) => prev + 1); // insert

        // Advance after showing the miss
        setTimeout(() => {
          setLookupResult("none");
          setStep((prev) => prev + 1);
        }, 600);
      }
    }, 900);

    return () => clearTimeout(timer);
  }, [isPlaying, step, hashEntries, foundPair, totalSteps, ARRAY, TARGET]);

  const handleReplay = () => {
    setStep(0);
    setHashEntries([]);
    setLookupResult("none");
    setBruteForceOps(0);
    setHashmapOps(0);
    setFoundPair(null);
    setIsPlaying(true);
  };

  return (
    <div className="rounded-xl bg-card border border-border/50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-border/50">
        <div>
          <h4 className="text-sm font-semibold">HashMap vs Brute Force</h4>
          <p className="text-[10px] text-muted-foreground">
            Why O(n) beats O(n²) — target: {TARGET}
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
        {/* Array display */}
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Array
          </div>
          <div className="flex gap-1">
            {ARRAY.map((val, i) => {
              const isCurrent = i === step && !foundPair;
              const isPartOfPair =
                foundPair && (i === foundPair[0] || i === foundPair[1]);
              const isProcessed = i < step;

              return (
                <motion.div
                  key={i}
                  className={`w-9 h-10 rounded-md flex flex-col items-center justify-center border text-xs font-mono font-bold transition-colors ${
                    isPartOfPair
                      ? "bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/25"
                      : isCurrent
                      ? "bg-viz-active text-white border-viz-active shadow-lg shadow-viz-active/25"
                      : isProcessed
                      ? "bg-viz-active/15 text-viz-active border-viz-active/30"
                      : "bg-card text-muted-foreground border-border/50"
                  }`}
                  animate={{ scale: isCurrent || isPartOfPair ? 1.1 : 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span>{val}</span>
                  <span className="text-[8px] opacity-50">[{i}]</span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* HashMap display */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              HashMap
            </div>
            <AnimatePresence>
              {lookupResult === "miss" && (
                <motion.span
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-[10px] font-bold text-amber-500"
                >
                  ✕ Not found — inserting
                </motion.span>
              )}
              {lookupResult === "hit" && (
                <motion.span
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-[10px] font-bold text-emerald-500"
                >
                  ✓ Found complement!
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <div className="flex gap-1 flex-wrap min-h-[40px]">
            <AnimatePresence>
              {hashEntries.map((entry) => (
                <motion.div
                  key={entry.key}
                  initial={{ opacity: 0, scale: 0.5, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="px-2 py-1.5 rounded-md bg-viz-hashmap/15 border border-viz-hashmap/30 text-xs font-mono"
                >
                  <span className="text-viz-hashmap font-bold">{entry.key}</span>
                  <span className="text-muted-foreground"> → {entry.idx}</span>
                </motion.div>
              ))}
            </AnimatePresence>
            {hashEntries.length === 0 && (
              <span className="text-xs text-muted-foreground/50 italic">
                Empty
              </span>
            )}
          </div>
        </div>

        {/* Operations comparison */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-emerald-500 mb-1">
              HashMap Approach
            </div>
            <div className="flex items-baseline gap-1.5">
              <motion.span
                className="text-xl font-bold font-mono tabular-nums text-emerald-500"
                key={hashmapOps}
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
              >
                {hashmapOps}
              </motion.span>
              <span className="text-[10px] text-muted-foreground">operations</span>
            </div>
            <div className="text-[10px] text-muted-foreground font-mono mt-1">
              ≈ O(n) — {step < totalSteps && !foundPair ? "growing linearly" : "done"}
            </div>
          </div>

          <div className="p-3 rounded-lg border border-rose-500/20 bg-rose-500/5">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-rose-500 mb-1">
              Brute Force
            </div>
            <div className="flex items-baseline gap-1.5">
              <motion.span
                className="text-xl font-bold font-mono tabular-nums text-rose-500"
                key={bruteForceOps}
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
              >
                {bruteForceOps}
              </motion.span>
              <span className="text-[10px] text-muted-foreground">operations</span>
            </div>
            <div className="text-[10px] text-muted-foreground font-mono mt-1">
              ≈ O(n²) — {step < totalSteps && !foundPair ? "growing quadratically" : "done"}
            </div>
          </div>
        </div>

        {/* Key insight */}
        <div className="text-xs text-muted-foreground leading-relaxed p-3 rounded-lg border border-border/30 bg-primary/5">
          <span className="text-primary font-semibold">Key Insight:</span>{" "}
          {foundPair ? (
            <>
              Found {ARRAY[foundPair[0]]} + {ARRAY[foundPair[1]]} = {TARGET}!
              The HashMap needed only{" "}
              <span className="font-mono font-bold text-emerald-500">{hashmapOps}</span>{" "}
              operations, while brute force would need{" "}
              <span className="font-mono font-bold text-rose-500">{bruteForceOps}</span>.
              With larger arrays, this gap becomes enormous.
            </>
          ) : (
            <>
              Each HashMap lookup is{" "}
              <span className="font-mono font-bold text-foreground">O(1)</span> —
              it replaces an entire inner loop scan that would be{" "}
              <span className="font-mono font-bold text-foreground">O(n)</span>.
              Watch how the brute-force counter grows much faster!
            </>
          )}
        </div>
      </div>
    </div>
  );
}
