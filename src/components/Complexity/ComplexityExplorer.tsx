import { motion } from "framer-motion";
import { BarChart2 } from "lucide-react";
import type { ComplexityExplorerConfig, ComplexityMetrics } from "@/types";
import { ComplexityMetricsPanel } from "./ComplexityMetricsPanel";
import { ComplexityStory } from "./ComplexityStory";
import { GrowthChart } from "./GrowthChart";
import { ComplexityComparisonCard } from "./ComplexityComparisonCard";
import { NestedLoopVisualization } from "./NestedLoopVisualization";
import { HashmapLookupVisualization } from "./HashmapLookupVisualization";

interface ComplexityExplorerProps {
  config: ComplexityExplorerConfig;
  algorithmName: string;
  /** Current step's complexity metrics (live during playback) */
  currentMetrics?: ComplexityMetrics;
  /** Pass the current array state so visuals match user input */
  currentArray?: number[];
  /** Pass the current target so visuals match user input */
  currentTarget?: number;
}

const DEFAULT_METRICS: ComplexityMetrics = {
  operations: 0,
  comparisons: 0,
};

function renderVisualExplanation(
  id?: string,
  currentArray?: number[],
  currentTarget?: number
) {
  switch (id) {
    case "nested-loops":
      return <NestedLoopVisualization currentArray={currentArray} />;
    case "hashmap-lookup":
      return (
        <HashmapLookupVisualization
          currentArray={currentArray}
          currentTarget={currentTarget}
        />
      );
    default:
      return null;
  }
}

export function ComplexityExplorer({
  config,
  algorithmName,
  currentMetrics,
  currentArray,
  currentTarget,
}: ComplexityExplorerProps) {
  const metrics = currentMetrics ?? DEFAULT_METRICS;

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Hero header */}
      <motion.div
        className="px-6 pt-6 pb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-2 mb-1">
          <BarChart2 size={20} className="text-primary" />
          <h2 className="text-lg font-bold">Complexity Explorer</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Understand <span className="font-semibold text-foreground">{algorithmName}</span>&apos;s
          performance through interactive visualizations
        </p>
      </motion.div>

      {/* Content */}
      <div className="flex-1 px-6 pb-6 space-y-6">
        {/* Live Metrics */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Live Metrics
          </h3>
          <ComplexityMetricsPanel
            metrics={metrics}
            trackedMetrics={config.trackedMetrics}
          />
        </motion.section>

        {/* Visual Explanation (algorithm-specific) */}
        {config.visualExplanationId && (
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Visual Explanation
            </h3>
            {renderVisualExplanation(config.visualExplanationId, currentArray, currentTarget)}
          </motion.section>
        )}

        {/* Two-column layout: Story + Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Why This Complexity?
            </h3>
            <div className="p-4 rounded-xl bg-card border border-border/50">
              <ComplexityStory paragraphs={config.storyParagraphs} />
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Case Analysis
            </h3>
            <ComplexityComparisonCard
              timeCases={config.timeCases}
              spaceCases={config.spaceCases}
            />
          </motion.section>
        </div>

        {/* Growth Analysis Chart */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Growth Analysis
          </h3>
          <GrowthChart
            runExperiment={config.runExperiment}
            inputSizeRange={config.inputSizeRange}
          />
        </motion.section>
      </div>
    </div>
  );
}
