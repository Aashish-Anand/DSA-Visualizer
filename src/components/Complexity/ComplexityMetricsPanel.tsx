import { motion } from "framer-motion";
import { Activity, ArrowLeftRight, Eye, Pencil, Hash, Database, Repeat } from "lucide-react";
import type { ComplexityMetrics } from "@/types";

interface ComplexityMetricsPanelProps {
  metrics: ComplexityMetrics;
  trackedMetrics: (keyof ComplexityMetrics)[];
}

const METRIC_CONFIG: Record<
  keyof ComplexityMetrics,
  { label: string; icon: React.ReactNode; color: string }
> = {
  operations: {
    label: "Operations",
    icon: <Activity size={16} />,
    color: "hsl(262 83% 58%)",
  },
  comparisons: {
    label: "Comparisons",
    icon: <ArrowLeftRight size={16} />,
    color: "hsl(199 89% 48%)",
  },
  swaps: {
    label: "Swaps",
    icon: <ArrowLeftRight size={16} className="rotate-90" />,
    color: "hsl(0 84% 60%)",
  },
  reads: {
    label: "Array Reads",
    icon: <Eye size={16} />,
    color: "hsl(45 93% 47%)",
  },
  writes: {
    label: "Array Writes",
    icon: <Pencil size={16} />,
    color: "hsl(27 87% 67%)",
  },
  hashmapLookups: {
    label: "Map Lookups",
    icon: <Hash size={16} />,
    color: "hsl(262 60% 50%)",
  },
  hashmapInserts: {
    label: "Map Inserts",
    icon: <Database size={16} />,
    color: "hsl(142 71% 45%)",
  },
  recursiveCalls: {
    label: "Recursive Calls",
    icon: <Repeat size={16} />,
    color: "hsl(316 70% 50%)",
  },
};

export function ComplexityMetricsPanel({
  metrics,
  trackedMetrics,
}: ComplexityMetricsPanelProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
      {trackedMetrics.map((key) => {
        const config = METRIC_CONFIG[key];
        const value = metrics[key] ?? 0;

        return (
          <motion.div
            key={key}
            className="flex items-center gap-2.5 p-3 rounded-xl bg-card border border-border/50 relative overflow-hidden"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Accent bar */}
            <div
              className="absolute top-0 left-0 w-full h-0.5"
              style={{ backgroundColor: config.color }}
            />

            <div
              className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${config.color}15`, color: config.color }}
            >
              {config.icon}
            </div>

            <div className="min-w-0">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground truncate">
                {config.label}
              </div>
              <motion.div
                className="text-lg font-bold font-mono tabular-nums"
                key={value}
                initial={{ scale: 1.2, color: config.color }}
                animate={{ scale: 1, color: "var(--fg)" }}
                transition={{ duration: 0.3 }}
              >
                {value}
              </motion.div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
