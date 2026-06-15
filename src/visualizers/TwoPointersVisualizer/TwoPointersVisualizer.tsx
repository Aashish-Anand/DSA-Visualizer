import { motion, AnimatePresence } from "framer-motion";
import type { TwoPointersState } from "@/types";

interface TwoPointersVisualizerProps {
  state: TwoPointersState;
}

export function TwoPointersVisualizer({ state }: TwoPointersVisualizerProps) {
  const { array, target, pointers, currentSum, foundSets, phase } = state;

  const getPointerLabels = (index: number) => {
    const labels: { label: string; color: string }[] = [];
    if (index === pointers.i) labels.push({ label: "i", color: "var(--color-primary)" });
    if (index === pointers.j) labels.push({ label: "j", color: "var(--color-primary)" });
    if (index === pointers.left) labels.push({ label: "L", color: "var(--color-viz-active)" });
    if (index === pointers.right) labels.push({ label: "R", color: "var(--color-viz-active)" });
    return labels;
  };

  const isHighlighted = (index: number) => {
    return (
      index === pointers.i ||
      index === pointers.j ||
      index === pointers.left ||
      index === pointers.right
    );
  };

  const isFoundPair = (index: number) => {
    // We only glow if phase is "found" and this index is one of the active pointers
    return phase === "found" && isHighlighted(index);
  };

  return (
    <div className="flex flex-col items-center w-full h-full p-4 gap-6 overflow-auto">
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
      <div className="w-full mt-4">
        <div className="w-full overflow-x-auto pb-10 custom-scrollbar">
          <div className="flex items-start justify-center gap-2 flex-nowrap min-w-max px-2">
            {array.map((value, index) => {
              const active = isHighlighted(index);
              const found = isFoundPair(index);
              
              let bg = "var(--color-card)";
              let border = "var(--color-border)";
              let text = "var(--color-foreground)";
              let glow = "none";

              if (found) {
                bg = "var(--color-viz-found)";
                border = "var(--color-viz-found)";
                text = "white";
                glow = "0 0 20px hsla(142, 71%, 45%, 0.5)";
              } else if (active) {
                if (index === pointers.i || index === pointers.j) {
                  bg = "var(--color-primary)";
                  border = "var(--color-primary)";
                  text = "white";
                  glow = "0 0 16px hsla(262, 83%, 58%, 0.4)";
                } else {
                  bg = "var(--color-viz-active)";
                  border = "var(--color-viz-active)";
                  text = "white";
                  glow = "0 0 16px hsla(199, 89%, 48%, 0.4)";
                }
              } else if (
                pointers.left !== null &&
                pointers.right !== null &&
                (index < pointers.left || index > pointers.right) &&
                index !== pointers.i &&
                index !== pointers.j
              ) {
                // Dimmed out boundaries
                bg = "var(--color-muted)";
                text = "var(--color-muted-foreground)";
              }

              const ptrs = getPointerLabels(index);

              return (
                <div key={`cell-${index}`} className="flex flex-col items-center gap-2 relative">
                  <motion.div
                    className="flex items-center justify-center rounded-lg font-semibold text-sm min-w-[48px] h-[48px] border-2 transition-colors relative z-10"
                    style={{
                      backgroundColor: bg,
                      borderColor: border,
                      color: text,
                      boxShadow: glow,
                    }}
                    animate={{
                      scale: found ? [1, 1.15, 1] : 1,
                    }}
                    transition={{
                      scale: {
                        duration: 0.6,
                        repeat: found ? Infinity : 0,
                        repeatType: "reverse",
                      },
                    }}
                  >
                    {value}
                  </motion.div>
                  <span className="text-[10px] text-muted-foreground tabular-nums absolute top-[52px]">
                    {index}
                  </span>

                  {/* Pointers */}
                  <div className="absolute top-[68px] flex flex-col items-center gap-1">
                    {ptrs.map((p) => (
                      <motion.div
                        key={`${p.label}-${index}`}
                        layoutId={`ptr-${p.label}`}
                        className="flex flex-col items-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      >
                        <div
                          className="text-[10px] font-black rounded px-1.5 py-0.5 mt-0.5"
                          style={{ backgroundColor: p.color, color: "white" }}
                        >
                          {p.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Current Sum Calculation */}
      {currentSum !== null && phase !== "init" && phase !== "sorting" && (
        <motion.div
          className="flex flex-col items-center px-6 py-4 rounded-xl border border-border bg-card/50 shadow-sm mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-2">
            Current Sum
          </span>
          <div className="flex items-center gap-3 text-lg font-mono">
            {pointers.i !== null && (
              <span className="text-primary font-bold">{array[pointers.i]}</span>
            )}
            {pointers.j !== null && (
              <>
                <span className="text-muted-foreground">+</span>
                <span className="text-primary font-bold">{array[pointers.j]}</span>
              </>
            )}
            {pointers.left !== null && (
              <>
                <span className="text-muted-foreground">+</span>
                <span className="text-[var(--color-viz-active)] font-bold">{array[pointers.left]}</span>
              </>
            )}
            {pointers.right !== null && (
              <>
                <span className="text-muted-foreground">+</span>
                <span className="text-[var(--color-viz-active)] font-bold">{array[pointers.right]}</span>
              </>
            )}
            <span className="text-muted-foreground font-bold mx-2">=</span>
            <motion.span
              key={currentSum}
              className="text-2xl font-black"
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{
                color:
                  currentSum === target
                    ? "var(--color-viz-found)"
                    : currentSum > target
                    ? "var(--color-destructive)"
                    : "var(--color-foreground)",
              }}
            >
              {currentSum}
            </motion.span>
          </div>
          {currentSum !== target && (
            <div className="text-[10px] text-muted-foreground mt-2 font-medium">
              {currentSum > target ? "Sum is too large → move R left" : "Sum is too small → move L right"}
            </div>
          )}
        </motion.div>
      )}

      {/* Found Sets */}
      {foundSets.length > 0 && (
        <div className="w-full max-w-lg mt-2">
          <div className="text-xs font-medium text-muted-foreground mb-3 text-center">
            Found Subsets ({foundSets.length})
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <AnimatePresence>
              {foundSets.map((set, idx) => (
                <motion.div
                  key={`set-${idx}`}
                  className="px-3 py-1.5 rounded-lg border-2 font-mono text-sm font-bold"
                  style={{
                    backgroundColor: "hsla(142, 71%, 45%, 0.1)",
                    borderColor: "var(--color-viz-found)",
                    color: "var(--color-viz-found)",
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  [{set.join(", ")}]
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
