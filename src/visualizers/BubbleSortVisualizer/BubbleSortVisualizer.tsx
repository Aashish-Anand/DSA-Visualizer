import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { BubbleSortState } from "@/types";

interface BubbleSortVisualizerProps {
  state: BubbleSortState;
}

export function BubbleSortVisualizer({ state }: BubbleSortVisualizerProps) {
  const { array, comparingIndices, swappedIndices, sortedIndices } = state;

  const maxValue = useMemo(() => Math.max(...array, 1), [array]);

  const getBarColor = (index: number): string => {
    if (swappedIndices && (index === swappedIndices[0] || index === swappedIndices[1])) {
      return "var(--color-viz-swapping)";
    }
    if (comparingIndices && (index === comparingIndices[0] || index === comparingIndices[1])) {
      return "var(--color-viz-comparing)";
    }
    if (sortedIndices.includes(index)) {
      return "var(--color-viz-sorted)";
    }
    return "var(--color-viz-default)";
  };

  const getBarGlow = (index: number): string => {
    if (swappedIndices && (index === swappedIndices[0] || index === swappedIndices[1])) {
      return "0 0 20px hsla(0, 84%, 60%, 0.4)";
    }
    if (comparingIndices && (index === comparingIndices[0] || index === comparingIndices[1])) {
      return "0 0 20px hsla(45, 93%, 47%, 0.4)";
    }
    if (sortedIndices.includes(index)) {
      return "0 0 12px hsla(142, 71%, 45%, 0.3)";
    }
    return "none";
  };

  const getStatusLabel = (index: number): string | null => {
    if (swappedIndices && (index === swappedIndices[0] || index === swappedIndices[1])) {
      return "SWAP";
    }
    if (comparingIndices && (index === comparingIndices[0] || index === comparingIndices[1])) {
      return "CMP";
    }
    if (sortedIndices.includes(index)) {
      return "✓";
    }
    return null;
  };

  const barWidth = Math.max(24, Math.min(56, 600 / array.length));
  const gap = Math.max(3, Math.min(8, 200 / array.length));

  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[300px] p-4">
      {/* Legend */}
      <div className="flex items-center gap-4 mb-6 text-xs font-medium">
        <div className="flex items-center gap-1.5">
          <div
            className="w-3 h-3 rounded-sm"
            style={{ backgroundColor: "var(--color-viz-comparing)" }}
          />
          <span className="text-muted-foreground">Comparing</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div
            className="w-3 h-3 rounded-sm"
            style={{ backgroundColor: "var(--color-viz-swapping)" }}
          />
          <span className="text-muted-foreground">Swapping</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div
            className="w-3 h-3 rounded-sm"
            style={{ backgroundColor: "var(--color-viz-sorted)" }}
          />
          <span className="text-muted-foreground">Sorted</span>
        </div>
      </div>

      {/* Bars container */}
      <div
        className="flex items-end justify-center"
        style={{ gap: `${gap}px`, height: "280px" }}
      >
        <AnimatePresence mode="popLayout">
          {array.map((value, index) => {
            const heightPercent = (value / maxValue) * 100;
            const color = getBarColor(index);
            const glow = getBarGlow(index);
            const label = getStatusLabel(index);

            return (
              <motion.div
                key={`bar-${index}`}
                layout
                className="flex flex-col items-center"
                style={{ width: `${barWidth}px` }}
                initial={false}
              >
                {/* Value label */}
                <motion.div
                  className="text-xs font-semibold mb-1 tabular-nums"
                  style={{ color }}
                  animate={{ scale: label === "SWAP" ? [1, 1.2, 1] : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {value}
                </motion.div>

                {/* Bar */}
                <motion.div
                  className="rounded-t-md relative w-full"
                  style={{
                    backgroundColor: color,
                    boxShadow: glow,
                    width: `${barWidth}px`,
                  }}
                  animate={{
                    height: `${Math.max(heightPercent * 2.4, 12)}px`,
                    backgroundColor: color,
                    boxShadow: glow,
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

                {/* Status label */}
                <AnimatePresence>
                  {label && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      className="text-[9px] font-bold mt-0.5"
                      style={{ color }}
                    >
                      {label}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Progress indicator */}
      <div className="mt-6 flex items-center gap-3 text-xs text-muted-foreground">
        <span>
          Sorted: {sortedIndices.length} / {array.length}
        </span>
        <div className="w-32 h-1.5 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: "var(--color-viz-sorted)" }}
            animate={{
              width: `${(sortedIndices.length / array.length) * 100}%`,
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </div>
  );
}
