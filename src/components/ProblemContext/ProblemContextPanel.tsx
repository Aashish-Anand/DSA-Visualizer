import { motion, type Variants } from "framer-motion";
import {
  BookOpen,
  Lightbulb,
  TrendingUp,
  Globe,
  Tag,
  ArrowRight,
  Zap,
  ChevronRight,
} from "lucide-react";
import type { ProblemContext } from "@/types";

interface ProblemContextPanelProps {
  context: ProblemContext;
  onStartVisualization: () => void;
}

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export function ProblemContextPanel({ context, onStartVisualization }: ProblemContextPanelProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-24 space-y-5">
        {/* Problem Statement */}
        <motion.section variants={item} className="rounded-xl border border-border bg-card/60 backdrop-blur-sm p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 rounded-lg bg-primary/10">
              <BookOpen size={16} className="text-primary" />
            </div>
            <h2 className="text-sm font-bold text-foreground uppercase tracking-wide">Problem Statement</h2>
          </div>
          <p className="text-sm text-foreground/90 leading-relaxed">
            {context.statement}
          </p>
        </motion.section>

        {/* Examples */}
        <motion.section variants={item} className="rounded-xl border border-border bg-card/60 backdrop-blur-sm p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 rounded-lg bg-emerald-500/10">
              <Zap size={16} className="text-emerald-500" />
            </div>
            <h2 className="text-sm font-bold text-foreground uppercase tracking-wide">Examples</h2>
          </div>
          <div className="space-y-3">
            {context.examples.map((example, i) => (
              <div
                key={i}
                className="rounded-lg bg-muted/40 border border-border/50 p-3.5 space-y-2"
              >
                <div className="flex items-start gap-2 text-xs">
                  <span className="shrink-0 font-semibold text-muted-foreground w-12">Input:</span>
                  <code className="font-mono text-foreground/90 bg-background/60 px-1.5 py-0.5 rounded">
                    {example.input}
                  </code>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <span className="shrink-0 font-semibold text-muted-foreground w-12">Output:</span>
                  <code className="font-mono text-emerald-500 bg-emerald-500/5 px-1.5 py-0.5 rounded">
                    {example.output}
                  </code>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed pt-1 border-t border-border/30">
                  💡 {example.explanation}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Intuition Builder */}
        <motion.section variants={item} className="rounded-xl border border-amber-500/20 bg-amber-500/5 backdrop-blur-sm p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 rounded-lg bg-amber-500/10">
              <Lightbulb size={16} className="text-amber-500" />
            </div>
            <h2 className="text-sm font-bold text-foreground uppercase tracking-wide">Think First</h2>
          </div>
          <p className="text-sm text-foreground/90 leading-relaxed italic">
            &ldquo;{context.intuitionPrompt}&rdquo;
          </p>
        </motion.section>

        {/* Approach Evolution */}
        <motion.section variants={item} className="rounded-xl border border-border bg-card/60 backdrop-blur-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded-lg bg-violet-500/10">
              <TrendingUp size={16} className="text-violet-500" />
            </div>
            <h2 className="text-sm font-bold text-foreground uppercase tracking-wide">Approach Evolution</h2>
          </div>
          <div className="space-y-0">
            {context.approaches.map((approach, i) => (
              <div key={i} className="relative">
                {/* Connector line */}
                {i < context.approaches.length - 1 && (
                  <div className="absolute left-[15px] top-[36px] bottom-0 w-px bg-border" />
                )}
                <div className="flex gap-3 pb-4">
                  {/* Step indicator */}
                  <div
                    className={`relative z-10 shrink-0 w-[31px] h-[31px] rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                      approach.isOptimal
                        ? "bg-emerald-500/10 border-emerald-500 text-emerald-500"
                        : "bg-muted/50 border-border text-muted-foreground"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm text-foreground">{approach.name}</span>
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                          approach.isOptimal
                            ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                            : "bg-muted/50 text-muted-foreground border-border"
                        }`}
                      >
                        {approach.complexity}
                      </span>
                      {approach.spaceComplexity && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted/50 text-muted-foreground border border-border">
                          Space: {approach.spaceComplexity}
                        </span>
                      )}
                      {approach.isOptimal && (
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                          ✦ Optimal
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                      {approach.description}
                    </p>
                  </div>
                </div>
                {/* Arrow between approaches */}
                {i < context.approaches.length - 1 && (
                  <div className="flex items-center gap-2 pl-2 pb-4 -mt-1 relative z-10">
                    <div className="w-4 h-4 rounded-full bg-background border border-border flex items-center justify-center text-primary shadow-sm -ml-[1px]">
                      <ChevronRight size={12} className="text-primary stroke-[3]" />
                    </div>
                    <span className="text-xs font-semibold text-foreground/90 italic">Can we do better?</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.section>

        {/* Real-World Applications */}
        <motion.section variants={item} className="rounded-xl border border-border bg-card/60 backdrop-blur-sm p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 rounded-lg bg-sky-500/10">
              <Globe size={16} className="text-sky-500" />
            </div>
            <h2 className="text-sm font-bold text-foreground uppercase tracking-wide">Real-World Applications</h2>
          </div>
          <div className="grid gap-2">
            {context.realWorldApplications.map((app, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-xs text-foreground/80 leading-relaxed"
              >
                <ArrowRight size={12} className="shrink-0 text-sky-500 mt-0.5" />
                <span>{app}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Patterns */}
        {context.patterns.length > 0 && (
          <motion.section variants={item} className="rounded-xl border border-border bg-card/60 backdrop-blur-sm p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 rounded-lg bg-pink-500/10">
                <Tag size={16} className="text-pink-500" />
              </div>
              <h2 className="text-sm font-bold text-foreground uppercase tracking-wide">Patterns Used</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {context.patterns.map((pattern) => (
                <span
                  key={pattern}
                  className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                >
                  {pattern}
                </span>
              ))}
            </div>
          </motion.section>
        )}

        {/* CTA */}
        <motion.div variants={item} className="pt-1 pb-4">
          <button
            onClick={onStartVisualization}
            className="w-full group flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-sm font-bold bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.01] transition-all duration-200"
          >
            Start Visualization
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
