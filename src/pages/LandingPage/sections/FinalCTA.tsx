import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface FinalCTAProps {
  onLaunchApp: () => void;
}

export function FinalCTA({ onLaunchApp }: FinalCTAProps) {
  return (
    <section className="relative py-20 md:py-24 px-6 md:px-10 border-t border-foreground/[0.06] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/[0.08] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-[700px] mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.03em] leading-[1.1] mb-5"
        >
          Stop reading.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">
            Start seeing.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-muted-foreground mb-10"
        >
          Free. Open source. No sign-up required.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          onClick={onLaunchApp}
          className="h-12 px-8 text-[15px] font-medium text-primary-foreground bg-primary rounded-xl hover:brightness-110 transition-all active:scale-[0.97] inline-flex items-center gap-2 group shadow-[0_0_32px_hsla(262,83%,58%,0.3)]"
        >
          Launch AlgoLens
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </motion.button>
      </div>
    </section>
  );
}
