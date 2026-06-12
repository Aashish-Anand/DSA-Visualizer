import { motion } from "framer-motion";
import { CheckCircle2, Circle } from "lucide-react";

const categories = [
  {
    name: "Arrays & Searching",
    status: "live" as const,
    items: ["Linear Search", "Binary Search", "Two Sum", "Kadane's Algorithm", "Stock Buy & Sell", "Majority Element I & II"],
  },
  {
    name: "Sorting",
    status: "live" as const,
    items: ["Bubble Sort", "Selection Sort", "Insertion Sort", "Merge Sort", "Quick Sort", "Counting Sort", "Radix Sort"],
  },
  {
    name: "Linked Lists",
    status: "next" as const,
    items: ["Traversal", "Reverse", "Cycle Detection", "Merge Two Sorted"],
  },
  {
    name: "Trees",
    status: "planned" as const,
    items: ["Inorder / Preorder / Postorder", "Level Order", "LCA", "Invert Tree"],
  },
  {
    name: "Graphs",
    status: "planned" as const,
    items: ["BFS", "DFS", "Dijkstra", "Topological Sort"],
  },
  {
    name: "Dynamic Programming",
    status: "planned" as const,
    items: ["Fibonacci", "Knapsack", "LCS", "Coin Change"],
  },
];

export function Roadmap() {
  return (
    <section id="roadmap" className="py-32 md:py-40 px-6 md:px-10 border-t border-white/[0.04]">
      <div className="max-w-[900px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[13px] font-medium text-primary uppercase tracking-[0.15em] mb-6"
        >
          Roadmap
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.02em] leading-[1.15] mb-4"
        >
          Growing every week.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-muted-foreground mb-16 max-w-xl"
        >
          We&apos;re building the most comprehensive visual DSA library.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`p-6 rounded-xl border transition-colors ${
                cat.status === "live"
                  ? "border-white/[0.08] bg-white/[0.02]"
                  : cat.status === "next"
                  ? "border-primary/20 bg-primary/[0.03]"
                  : "border-white/[0.04] bg-transparent"
              }`}
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[15px] font-semibold">{cat.name}</h3>
                {cat.status === "live" ? (
                  <span className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" />
                    Live
                  </span>
                ) : cat.status === "next" ? (
                  <span className="flex items-center gap-1.5 text-[11px] font-medium text-primary animate-pulse">
                    <Circle className="w-3 h-3" />
                    In Progress
                  </span>
                ) : (
                  <span className="text-[11px] text-muted-foreground/50">Planned</span>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {cat.items.map((item, j) => (
                  <span
                    key={j}
                    className={`text-[12px] px-2.5 py-1 rounded-md ${
                      cat.status === "live"
                        ? "bg-white/[0.04] text-foreground/80"
                        : cat.status === "next"
                        ? "bg-primary/10 text-primary/80"
                        : "bg-white/[0.02] text-muted-foreground/50"
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
