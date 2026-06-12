import { motion } from "framer-motion";

export function ProblemSection() {
  return (
    <section className="py-32 md:py-40 px-6 md:px-10">
      <div className="max-w-[900px] mx-auto">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[13px] font-medium text-primary uppercase tracking-[0.15em] mb-6"
        >
          The Problem
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.02em] leading-[1.15] mb-8"
        >
          Reading code is not the same as{" "}
          <span className="text-muted-foreground">understanding it.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-muted-foreground leading-relaxed mb-20 max-w-2xl"
        >
          Traditional DSA learning forces you to simulate complex state changes in your head.
          You stare at a for-loop and try to imagine where pointers are, which elements have
          been swapped, and what the array looks like after each iteration. It doesn&apos;t work.
        </motion.p>

        {/* Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl border border-foreground/[0.06] bg-foreground/[0.02]"
          >
            <div className="text-[13px] font-medium text-red-400/80 uppercase tracking-[0.1em] mb-6">
              Without AlgoLens
            </div>
            <div className="space-y-4">
              {[
                "Read 50 lines of C++ you don't fully understand",
                "Manually trace pointer positions on paper",
                "Memorize patterns without grasping the \"why\"",
                "Get stuck on edge cases during interviews",
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-1 h-1 rounded-full bg-muted-foreground/40 mt-2.5 shrink-0" />
                  <span className="text-[15px] text-muted-foreground leading-relaxed">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-8 rounded-2xl border border-primary/20 bg-primary/[0.03]"
          >
            <div className="text-[13px] font-medium text-primary uppercase tracking-[0.1em] mb-6">
              With AlgoLens
            </div>
            <div className="space-y-4">
              {[
                "Watch the algorithm execute visually, frame by frame",
                "See pointers, swaps, and state changes in real-time",
                "Build lasting intuition through visual patterns",
                "Understand the logic before you ever write code",
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-1 h-1 rounded-full bg-primary mt-2.5 shrink-0" />
                  <span className="text-[15px] text-foreground leading-relaxed">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
