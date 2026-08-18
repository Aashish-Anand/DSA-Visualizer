import { motion } from "framer-motion";
import { MousePointerClick, ScanEye, Lightbulb } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MousePointerClick,
    title: "Choose a problem",
    description: "Pick from a curated list of essential algorithms. Arrays, sorting, dynamic programming — organized by difficulty.",
  },
  {
    number: "02",
    icon: ScanEye,
    title: "Watch it execute",
    description: "Hit play. Watch pointers move, elements swap, and state evolve. Scrub through time at your own pace.",
  },
  {
    number: "03",
    icon: Lightbulb,
    title: "Understand the logic",
    description: "Each frame syncs with highlighted code and a plain-English explanation. No jargon. No guesswork.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 md:py-20 px-6 md:px-10 border-t border-foreground/[0.06]">
      <div className="max-w-[900px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[13px] font-medium text-primary uppercase tracking-[0.15em] mb-4"
        >
          How it works
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.02em] leading-[1.15] mb-10 md:mb-12"
        >
          Three steps to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">
            mastery.
          </span>
        </motion.h2>

        <div className="space-y-0">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex items-start gap-6 md:gap-10 py-7 md:py-8 border-t border-foreground/[0.06] last:border-b"
            >
              <div className="text-[13px] font-mono text-muted-foreground/50 pt-1 shrink-0">
                {step.number}
              </div>
              <div className="w-10 h-10 rounded-xl bg-foreground/[0.04] border border-foreground/[0.06] flex items-center justify-center shrink-0 group-hover:border-primary/30 group-hover:bg-primary/[0.06] transition-colors duration-300">
                <step.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed max-w-lg">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
