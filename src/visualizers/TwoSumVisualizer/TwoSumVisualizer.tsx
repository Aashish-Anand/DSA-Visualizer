import { motion, AnimatePresence } from "framer-motion";
import type { TwoSumState } from "@/types";

interface TwoSumVisualizerProps {
  state: TwoSumState;
}

export function TwoSumVisualizer({ state }: TwoSumVisualizerProps) {
  const {
    array,
    target,
    currentIndex,
    currentNumber,
    complement,
    hashMap,
    foundPair,
    phase,
    checkedIndices,
  } = state;

  const getCellStyle = (index: number) => {
    if (foundPair && (index === foundPair[0] || index === foundPair[1])) {
      return {
        bg: "var(--color-viz-found)",
        border: "var(--color-viz-found)",
        text: "white",
        glow: "0 0 20px hsla(142, 71%, 45%, 0.5)",
      };
    }
    if (index === currentIndex) {
      return {
        bg: "var(--color-viz-active)",
        border: "var(--color-viz-active)",
        text: "white",
        glow: "0 0 16px hsla(199, 89%, 48%, 0.4)",
      };
    }
    if (checkedIndices.includes(index)) {
      return {
        bg: "var(--color-muted)",
        border: "var(--color-border)",
        text: "var(--color-muted-foreground)",
        glow: "none",
      };
    }
    return {
      bg: "var(--color-card)",
      border: "var(--color-border)",
      text: "var(--color-foreground)",
      glow: "none",
    };
  };

  const hashMapEntries = Array.from(hashMap.entries());

  return (
    <div className="flex flex-col items-center w-full h-full p-4 gap-5 overflow-auto">
      {/* Target Display */}
      <motion.div
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <span className="text-xs font-medium text-muted-foreground">Target:</span>
        <span className="text-lg font-bold text-primary">{target}</span>
      </motion.div>

      {/* Array Display */}
      <div className="w-full">
        <div className="text-xs font-medium text-muted-foreground mb-2 text-center">
          Input Array
        </div>
        <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
          <div className="flex items-center justify-center gap-1.5 flex-nowrap min-w-max px-2">
          {array.map((value, index) => {
            const style = getCellStyle(index);
            return (
              <motion.div
                key={`cell-${index}`}
                className="flex flex-col items-center"
                initial={false}
              >
                <motion.div
                  className="flex items-center justify-center rounded-lg font-semibold text-sm min-w-[44px] h-[44px] border-2 transition-colors"
                  style={{
                    backgroundColor: style.bg,
                    borderColor: style.border,
                    color: style.text,
                    boxShadow: style.glow,
                  }}
                  animate={{
                    scale:
                      foundPair &&
                      (index === foundPair[0] || index === foundPair[1])
                        ? [1, 1.15, 1]
                        : 1,
                  }}
                  transition={{
                    scale: {
                      duration: 0.6,
                      repeat:
                        foundPair &&
                        (index === foundPair[0] || index === foundPair[1])
                          ? Infinity
                          : 0,
                      repeatType: "reverse",
                    },
                  }}
                >
                  {value}
                </motion.div>
                <span className="text-[10px] text-muted-foreground mt-1 tabular-nums">
                  {index}
                </span>
              </motion.div>
            );
          })}
          </div>
        </div>
      </div>

      {/* Info Cards Row */}
      {phase !== "init" && phase !== "complete" && (
        <motion.div
          className="flex items-stretch gap-3 flex-wrap justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Current Index */}
          <div className="flex flex-col items-center px-4 py-2.5 rounded-lg bg-card border border-border min-w-[90px]">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
              Index
            </span>
            <motion.span
              key={currentIndex}
              className="text-xl font-bold"
              style={{ color: "var(--color-viz-active)" }}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {currentIndex}
            </motion.span>
          </div>

          {/* Current Number */}
          <div className="flex flex-col items-center px-4 py-2.5 rounded-lg bg-card border border-border min-w-[90px]">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
              Value
            </span>
            <motion.span
              key={`val-${currentIndex}`}
              className="text-xl font-bold text-foreground"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {currentNumber}
            </motion.span>
          </div>

          {/* Complement Needed */}
          {(phase === "computing" ||
            phase === "checking" ||
            phase === "not-in-map" ||
            phase === "adding" ||
            phase === "found") && (
            <motion.div
              className="flex flex-col items-center px-4 py-2.5 rounded-lg border min-w-[90px]"
              style={{
                backgroundColor: foundPair
                  ? "hsla(142, 71%, 45%, 0.1)"
                  : "hsla(262, 83%, 58%, 0.1)",
                borderColor: foundPair
                  ? "hsla(142, 71%, 45%, 0.3)"
                  : "hsla(262, 83%, 58%, 0.2)",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                Need
              </span>
              <motion.span
                key={`comp-${currentIndex}`}
                className="text-xl font-bold"
                style={{
                  color: foundPair
                    ? "var(--color-viz-found)"
                    : "var(--color-primary)",
                }}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {complement}
              </motion.span>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* HashMap Visualization */}
      <div className="w-full max-w-sm">
        <div className="text-xs font-medium text-muted-foreground mb-2 text-center flex items-center justify-center gap-2">
          <span>HashMap</span>
          <span className="px-1.5 py-0.5 rounded-md bg-primary/10 text-primary font-semibold tabular-nums">
            {hashMapEntries.length}
          </span>
        </div>
        <div className="rounded-xl border border-border bg-card/50 overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-2 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold border-b border-border">
            <div className="px-4 py-2 border-r border-border">Value (Key)</div>
            <div className="px-4 py-2">Index (Value)</div>
          </div>

          {/* Entries */}
          <div className="max-h-[160px] overflow-y-auto">
            <AnimatePresence mode="popLayout">
              {hashMapEntries.length === 0 ? (
                <motion.div
                  key="empty"
                  className="px-4 py-3 text-xs text-muted-foreground text-center italic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  exit={{ opacity: 0 }}
                >
                  Empty — no entries yet
                </motion.div>
              ) : (
                hashMapEntries.map(([key, value], idx) => (
                  <motion.div
                    key={`map-${key}`}
                    className="grid grid-cols-2 border-b border-border/50 last:border-b-0"
                    initial={{ opacity: 0, x: -20, backgroundColor: "hsla(262, 83%, 58%, 0.2)" }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      backgroundColor: "transparent",
                    }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                  >
                    <div className="px-4 py-2 border-r border-border/50 font-mono text-sm font-semibold text-primary">
                      {key}
                    </div>
                    <div className="px-4 py-2 font-mono text-sm text-foreground">
                      {value}
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Success Banner */}
      <AnimatePresence>
        {foundPair && (
          <motion.div
            className="flex items-center gap-3 px-5 py-3 rounded-xl border-2"
            style={{
              backgroundColor: "hsla(142, 71%, 45%, 0.1)",
              borderColor: "var(--color-viz-found)",
            }}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <span className="text-2xl">🎉</span>
            <div className="flex flex-col">
              <span
                className="text-sm font-bold"
                style={{ color: "var(--color-viz-found)" }}
              >
                Solution Found!
              </span>
              <span className="text-xs text-muted-foreground">
                Indices [{foundPair[0]}, {foundPair[1]}] → {array[foundPair[0]]}{" "}
                + {array[foundPair[1]]} = {target}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
