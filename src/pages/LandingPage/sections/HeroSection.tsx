import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { usePlaybackEngine } from "@/hooks/usePlaybackEngine";
import { generateBubbleSortSteps, generateRandomArray } from "@/algorithms/bubbleSort/generator";
import { SortingBarVisualizer } from "@/visualizers/SortingBarVisualizer/SortingBarVisualizer";

interface HeroSectionProps {
  onLaunchApp: () => void;
}

export function HeroSection({ onLaunchApp }: HeroSectionProps) {
  const array = useMemo(() => generateRandomArray(8), []);
  const steps = useMemo(() => generateBubbleSortSteps(array), [array]);
  const engine = usePlaybackEngine(steps);

  // Auto-play continuously
  useEffect(() => {
    const timer = setTimeout(() => {
      engine.setSpeed(2);
      engine.play();
    }, 800);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Loop when done
  useEffect(() => {
    if (engine.isLastStep && !engine.isPlaying) {
      const timer = setTimeout(() => {
        engine.reset();
        setTimeout(() => engine.play(), 400);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [engine.isLastStep, engine.isPlaying, engine]);

  return (
    <section className="relative pt-40 pb-8 md:pb-16 px-6 md:px-10">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/[0.07] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-[1100px] mx-auto">
        {/* Text */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full border border-white/[0.08] bg-white/[0.03] text-[13px] text-muted-foreground"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Now visualizing 10+ algorithms
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-[-0.03em] leading-[1.08] text-foreground max-w-3xl"
          >
            Watch algorithms{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-emerald-400">
              think.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-5 text-[clamp(1rem,2vw,1.2rem)] leading-relaxed text-muted-foreground max-w-xl"
          >
            Interactive visualizations. Real-time code tracking. Step-by-step execution. The way DSA was meant to be learned.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-3 mt-10"
          >
            <button
              onClick={onLaunchApp}
              className="h-11 px-6 text-[14px] font-medium text-primary-foreground bg-primary rounded-xl hover:brightness-110 transition-all active:scale-[0.97] flex items-center gap-2 group shadow-[0_0_24px_hsla(262,83%,58%,0.25)]"
            >
              Start Learning
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <a
              href="#demo"
              className="h-11 px-6 text-[14px] font-medium text-foreground bg-white/[0.04] border border-white/[0.08] rounded-xl hover:bg-white/[0.07] transition-all flex items-center"
            >
              Try the demo
            </a>
          </motion.div>
        </div>

        {/* Live Demo Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden shadow-[0_0_80px_-20px_hsla(262,83%,58%,0.15)]"
        >
          {/* Window chrome */}
          <div className="flex items-center h-11 px-4 border-b border-white/[0.06] bg-white/[0.02]">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-white/[0.08]" />
              <div className="w-3 h-3 rounded-full bg-white/[0.08]" />
              <div className="w-3 h-3 rounded-full bg-white/[0.08]" />
            </div>
            <div className="flex-1 flex justify-center">
              <span className="text-[11px] text-muted-foreground font-mono">
                bubble-sort.algo
              </span>
            </div>
            <div className="w-[52px]" /> {/* Spacer to center title */}
          </div>

          {/* Visualizer */}
          <div className="p-4 md:p-8 min-h-[350px] md:min-h-[420px] flex flex-col items-center justify-center">
            {engine.currentStep && (
              <SortingBarVisualizer state={engine.currentStep.state} />
            )}
          </div>

          {/* Status bar */}
          <div className="flex items-center justify-between h-9 px-4 border-t border-white/[0.06] bg-white/[0.02] text-[11px] text-muted-foreground font-mono">
            <span>Step {engine.currentStepIndex + 1} / {engine.totalSteps}</span>
            <span className="hidden sm:inline">{engine.currentStep?.explanation?.slice(0, 60)}…</span>
            <span>{engine.speed}x</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
