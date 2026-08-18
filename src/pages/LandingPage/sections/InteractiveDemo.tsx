import { useMemo } from "react";
import { motion } from "framer-motion";
import { usePlaybackEngine } from "@/hooks/usePlaybackEngine";
import { generateKadaneSteps } from "@/algorithms/kadane/generator";
import { KadaneVisualizer } from "@/visualizers/KadaneVisualizer/KadaneVisualizer";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
} from "lucide-react";
import type { PlaybackSpeed } from "@/types";

const SPEEDS: PlaybackSpeed[] = [0.5, 1, 2, 4];

export function InteractiveDemo() {
  const array = useMemo(() => [-2, 1, -3, 4, -1, 2, 1, -5, 4], []);
  const steps = useMemo(() => generateKadaneSteps(array), [array]);
  const engine = usePlaybackEngine(steps);

  return (
    <section id="demo" className="py-16 md:py-20 px-6 md:px-10 border-t border-foreground/[0.06]">
      <div className="max-w-[1000px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[13px] font-medium text-primary uppercase tracking-[0.15em] mb-4"
        >
          Interactive Demo
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.02em] leading-[1.15] mb-4"
        >
          Try it yourself.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-muted-foreground mb-8 md:mb-10 max-w-xl"
        >
          Kadane&apos;s Algorithm — finding the maximum subarray sum. Use the controls below.
        </motion.p>

        {/* Demo Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl border border-foreground/[0.06] bg-foreground/[0.02] overflow-hidden"
        >
          {/* Window chrome */}
          <div className="flex items-center h-11 px-4 border-b border-foreground/[0.06] bg-foreground/[0.02]">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-foreground/[0.08]" />
              <div className="w-3 h-3 rounded-full bg-foreground/[0.08]" />
              <div className="w-3 h-3 rounded-full bg-foreground/[0.08]" />
            </div>
            <div className="flex-1 flex justify-center">
              <span className="text-[11px] text-muted-foreground font-mono">
                kadanes-algorithm.algo
              </span>
            </div>
            <div className="w-[52px]" />
          </div>

          {/* Visualizer */}
          <div className="p-6 md:p-10 min-h-[300px] flex items-center justify-center">
            {engine.currentStep && (
              <KadaneVisualizer state={engine.currentStep.state} />
            )}
          </div>

          {/* Explanation */}
          {engine.currentStep && (
            <div className="mx-4 md:mx-10 mb-6 p-4 rounded-xl bg-foreground/[0.03] border border-foreground/[0.06]">
              <p className="text-[13px] text-muted-foreground leading-relaxed">
                <span className="text-primary font-medium mr-2">Step {engine.currentStepIndex + 1}:</span>
                {engine.currentStep.beginnerExplanation}
              </p>
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center justify-between h-14 px-4 md:px-10 border-t border-foreground/[0.06] bg-foreground/[0.02]">
            {/* Playback buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={engine.reset}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/[0.06] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={engine.previous}
                disabled={engine.isFirstStep}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/[0.06] transition-colors disabled:opacity-30"
              >
                <SkipBack className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={engine.isPlaying ? engine.pause : engine.play}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-primary text-primary-foreground hover:brightness-110 transition-all"
              >
                {engine.isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4 ml-0.5" />
                )}
              </button>
              <button
                onClick={engine.next}
                disabled={engine.isLastStep}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/[0.06] transition-colors disabled:opacity-30"
              >
                <SkipForward className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Progress */}
            <div className="hidden sm:flex items-center gap-3 flex-1 max-w-xs mx-6">
              <div className="flex-1 h-1 rounded-full bg-foreground/[0.06] overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
                  style={{ width: `${engine.progress}%` }}
                />
              </div>
              <span className="text-[11px] text-muted-foreground font-mono tabular-nums w-12 text-right">
                {engine.currentStepIndex + 1}/{engine.totalSteps}
              </span>
            </div>

            {/* Speed */}
            <div className="flex items-center gap-1">
              {SPEEDS.map((s) => (
                <button
                  key={s}
                  onClick={() => engine.setSpeed(s)}
                  className={`h-7 px-2 text-[11px] font-mono rounded-md transition-colors ${
                    engine.speed === s
                      ? "bg-primary/20 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/[0.06]"
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
