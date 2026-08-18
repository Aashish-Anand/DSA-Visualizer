import { motion } from "framer-motion";
import { Maximize, TerminalSquare, MessageSquare, FastForward, SlidersHorizontal, Moon, BarChart2, PlayCircle } from "lucide-react";

const features = [
  {
    title: "Step-by-Step Execution",
    description: "Every algorithm is broken down into atomic steps. No magic jumps. You see exactly what changes and when.",
    icon: FastForward,
    colSpan: "md:col-span-2",
    bgClass: "bg-gradient-to-br from-violet-500/15 via-violet-500/5 to-transparent",
    borderClass: "border-violet-500/20 hover:border-violet-500/50",
    iconColor: "text-violet-500 dark:text-violet-400"
  },
  {
    title: "Code Sync",
    description: "The active line of code highlights exactly as the visualization updates in real time.",
    icon: TerminalSquare,
    colSpan: "md:col-span-1",
    bgClass: "bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-transparent",
    borderClass: "border-emerald-500/20 hover:border-emerald-500/50",
    iconColor: "text-emerald-500 dark:text-emerald-400"
  },
  {
    title: "ELI5 Explanations",
    description: "Every single step comes with an 'Explain Like I'm 5' plain-English translation.",
    icon: MessageSquare,
    colSpan: "md:col-span-1",
    bgClass: "bg-gradient-to-br from-amber-500/15 via-amber-500/5 to-transparent",
    borderClass: "border-amber-500/20 hover:border-amber-500/50",
    iconColor: "text-amber-500 dark:text-amber-400"
  },
  {
    title: "Custom Inputs",
    description: "Don't just watch static demos. Input your own arrays and see how the algorithm handles edge cases.",
    icon: SlidersHorizontal,
    colSpan: "md:col-span-2",
    bgClass: "bg-gradient-to-br from-blue-500/15 via-blue-500/5 to-transparent",
    borderClass: "border-blue-500/20 hover:border-blue-500/50",
    iconColor: "text-blue-500 dark:text-blue-400"
  },
  {
    title: "Full Screen Focus",
    description: "Expand visualizers to take over your entire monitor for distraction-free study sessions.",
    icon: Maximize,
    colSpan: "md:col-span-2",
    bgClass: "bg-gradient-to-br from-teal-500/15 via-teal-500/5 to-transparent",
    borderClass: "border-teal-500/20 hover:border-teal-500/50",
    iconColor: "text-teal-500 dark:text-teal-400"
  },
  {
    title: "Native Dark Mode",
    description: "Built from the ground up for night owls. Easy on the eyes for those late-night interview prep sessions.",
    icon: Moon,
    colSpan: "md:col-span-1",
    bgClass: "bg-gradient-to-br from-purple-500/15 via-slate-500/5 to-transparent",
    borderClass: "border-purple-500/20 hover:border-purple-500/50",
    iconColor: "text-purple-500 dark:text-purple-400"
  },
  {
    title: "Complexity Explorer",
    badge: "Interactive",
    description: "Go beyond Big-O notation. Run live experiments, view interactive charts, and watch exactly why an algorithm performs the way it does.",
    icon: BarChart2,
    colSpan: "md:col-span-1",
    bgClass: "bg-gradient-to-br from-pink-500/15 via-pink-500/5 to-transparent",
    borderClass: "border-pink-500/20 hover:border-pink-500/50",
    iconColor: "text-pink-500 dark:text-pink-400"
  },
  {
    title: "Problem Simulations",
    description: "Understand the 'why' before the 'how'. Watch intuitive analogies and step animations before diving into raw code.",
    icon: PlayCircle,
    colSpan: "md:col-span-2",
    bgClass: "bg-gradient-to-br from-indigo-500/15 via-indigo-500/5 to-transparent",
    borderClass: "border-indigo-500/20 hover:border-indigo-500/50",
    iconColor: "text-indigo-500 dark:text-indigo-400"
  }
];

export function FeaturesGrid() {
  return (
    <section id="features" className="py-16 md:py-20 px-6 md:px-10 bg-background relative border-t border-foreground/[0.06]">
      <div className="w-full max-w-6xl mx-auto">
        <div className="mb-10 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Everything you need to <span className="text-primary">master DSA</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            AlgoLens isn't just a video player. It's a complete toolkit designed specifically for visual learners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`rounded-3xl border p-8 flex flex-col justify-between overflow-hidden group transition-all duration-300 backdrop-blur-sm ${feature.colSpan} ${feature.bgClass} ${feature.borderClass}`}
            >
              <div className="mb-8">
                <div className={`w-12 h-12 rounded-xl bg-background/60 backdrop-blur-sm border border-foreground/[0.08] flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform ${feature.iconColor}`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <h3 className="text-2xl font-bold tracking-tight">{feature.title}</h3>
                  {feature.badge && (
                    <span className="px-2.5 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/25 text-[10px] font-bold uppercase tracking-wider">
                      {feature.badge}
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground leading-relaxed text-[15px]">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
