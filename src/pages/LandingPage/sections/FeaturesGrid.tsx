import { motion } from "framer-motion";
import { Maximize, TerminalSquare, MessageSquare, FastForward, SlidersHorizontal, Moon, BarChart2, PlayCircle } from "lucide-react";

const features = [
  {
    title: "Step-by-Step Execution",
    description: "Every algorithm is broken down into atomic steps. No magic jumps. You see exactly what changes and when.",
    icon: FastForward,
    colSpan: "md:col-span-2",
    bgClass: "bg-gradient-to-br from-primary/20 to-primary/5",
    iconColor: "text-primary"
  },
  {
    title: "Code Sync",
    description: "The active line of code highlights exactly as the visualization updates.",
    icon: TerminalSquare,
    colSpan: "md:col-span-1",
    bgClass: "bg-card",
    iconColor: "text-emerald-500"
  },
  {
    title: "ELI5 Explanations",
    description: "Every single step comes with an 'Explain Like I'm 5' translation.",
    icon: MessageSquare,
    colSpan: "md:col-span-1",
    bgClass: "bg-card",
    iconColor: "text-amber-500"
  },
  {
    title: "Custom Inputs",
    description: "Don't just watch static demos. Input your own arrays and see how the algorithm handles edge cases.",
    icon: SlidersHorizontal,
    colSpan: "md:col-span-2",
    bgClass: "bg-gradient-to-tr from-blue-500/20 to-blue-500/5",
    iconColor: "text-blue-500"
  },
  {
    title: "Full Screen Focus",
    description: "Expand visualizers to take over your entire monitor for distraction-free study sessions.",
    icon: Maximize,
    colSpan: "md:col-span-2",
    bgClass: "bg-card",
    iconColor: "text-foreground"
  },
  {
    title: "Native Dark Mode",
    description: "Built from the ground up for night owls. Easy on the eyes for those 2 AM cram sessions.",
    icon: Moon,
    colSpan: "md:col-span-1",
    bgClass: "bg-card",
    iconColor: "text-slate-500 dark:text-slate-300"
  },
  {
    title: "Complexity Explorer",
    badge: "Beta",
    description: "Go beyond Big-O notation. Run live experiments, view interactive charts, and watch exactly why an algorithm performs the way it does.",
    icon: BarChart2,
    colSpan: "md:col-span-1",
    bgClass: "bg-gradient-to-br from-pink-500/10 to-transparent",
    iconColor: "text-pink-500"
  },
  {
    title: "Problem Simulations",
    description: "Understand the 'why' before the 'how'. Watch a greedy frog jump or a person climb stairs before diving into the actual DP code.",
    icon: PlayCircle,
    colSpan: "md:col-span-2",
    bgClass: "bg-gradient-to-l from-indigo-500/20 to-indigo-500/5",
    iconColor: "text-indigo-500"
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
              transition={{ delay: i * 0.1 }}
              className={`rounded-3xl border border-border p-8 flex flex-col justify-between overflow-hidden group hover:border-primary/50 transition-colors ${feature.colSpan} ${feature.bgClass}`}
            >
              <div className="mb-8">
                <div className={`w-12 h-12 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform ${feature.iconColor}`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <h3 className="text-2xl font-bold">{feature.title}</h3>
                  {feature.badge && (
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-[10px] font-bold uppercase tracking-wider">
                      {feature.badge}
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground leading-relaxed">
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
