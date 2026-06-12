import { motion } from "framer-motion";
import { XCircle, CheckCircle2 } from "lucide-react";

export function BeforeAfter() {
  return (
    <section className="py-24 px-6 bg-muted/10 border-y border-border/40 overflow-hidden">
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-16 text-center">
          The <span className="text-primary">AlgoLens</span> Difference
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          
          {/* Before */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col p-8 rounded-3xl bg-card border border-border/50 opacity-80 grayscale-[30%]"
          >
            <div className="flex items-center gap-3 mb-8">
              <XCircle className="w-8 h-8 text-red-500" />
              <h3 className="text-2xl font-bold text-muted-foreground">The Old Way</h3>
            </div>
            
            <ul className="space-y-6">
              {[
                "Reading dense textbooks that put you to sleep",
                "Manually drawing arrays on paper to trace a loop",
                "Struggling to remember complex logic during interviews",
                "Pasting print statements everywhere to see state changes",
                "Memorizing code without actually understanding why it works"
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                  </div>
                  <span className="text-muted-foreground">{text}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* After */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col p-8 rounded-3xl bg-primary/5 border border-primary/30 shadow-[0_0_40px_hsla(var(--primary),0.1)] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10" />
            
            <div className="flex items-center gap-3 mb-8">
              <CheckCircle2 className="w-8 h-8 text-primary" />
              <h3 className="text-2xl font-bold text-foreground">With AlgoLens</h3>
            </div>
            
            <ul className="space-y-6">
              {[
                "Watching algorithms unfold in real-time, step-by-step",
                "Letting the visualizer track pointers and state for you",
                "Building lasting mental models through visual memory",
                "Scrubbing through history to pinpoint exactly what happened",
                "Understanding the core logic first, making coding trivial"
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                  <span className="text-foreground font-medium">{text}</span>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
