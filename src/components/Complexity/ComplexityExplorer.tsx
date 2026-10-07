import type { ComplexityExplorerConfig, ComplexityMetrics } from "@/types";
import { ComplexityMetricsPanel } from "./ComplexityMetricsPanel";
import { ComplexityStory } from "./ComplexityStory";
import { GrowthChart } from "./GrowthChart";
import { ComplexityComparisonCard } from "./ComplexityComparisonCard";
import { NestedLoopVisualization } from "./NestedLoopVisualization";
import { HashmapLookupVisualization } from "./HashmapLookupVisualization";

interface Props {
  config: ComplexityExplorerConfig;
  algorithmName: string;
  approachName?: string;
  currentMetrics?: ComplexityMetrics;
  currentArray?: number[];
  currentTarget?: number;
  currentStep?: number;
  totalSteps?: number;
  onReturnToVisualization?: () => void;
}
export function ComplexityExplorer({ config, algorithmName, approachName, currentMetrics, currentArray, currentTarget, currentStep, totalSteps, onReturnToVisualization }: Props) {
  return <div className="max-w-5xl mx-auto p-5 sm:p-8 space-y-6">
    <div><h2 className="text-xl font-bold">How {algorithmName} scales</h2><p className="text-sm text-muted-foreground mt-2">{approachName ? `Selected approach: ${approachName === "iterative" ? "tabulation" : approachName === "memoized" ? "memoization" : "recursion"}. ` : ""}Explore operation counts as input size increases.</p></div>
    <ComplexityComparisonCard timeCases={config.timeCases} spaceCases={config.spaceCases}/>
    <GrowthChart runExperiment={config.runExperiment} inputSizeRange={config.inputSizeRange} expectedGrowth={config.expectedGrowth} operationDefinition={config.operationDefinition}/>
    <section className="rounded-xl border border-border p-5"><div className="flex flex-wrap justify-between items-center gap-2 mb-4"><h3 className="font-semibold">Current playback step {currentStep && <span className="text-sm font-normal text-muted-foreground">{currentStep} / {totalSteps}</span>}</h3>{onReturnToVisualization && <button className="lesson-action text-primary" onClick={onReturnToVisualization}>Return to visualization</button>}</div>{currentMetrics ? <ComplexityMetricsPanel metrics={currentMetrics} trackedMetrics={config.trackedMetrics}/> : <p className="text-sm text-muted-foreground">Operation counts are unavailable for this playback step.</p>}<p className="text-xs text-muted-foreground mt-3">These cumulative counts belong to your current input and playback position. The experiment above runs separate inputs to measure growth.</p></section>
    <section><h3 className="font-semibold mb-3">Why this complexity?</h3><ComplexityStory paragraphs={config.storyParagraphs}/></section>
    {config.visualExplanationId === "nested-loops" && <NestedLoopVisualization currentArray={currentArray}/>}
    {config.visualExplanationId === "hashmap-lookup" && <HashmapLookupVisualization currentArray={currentArray} currentTarget={currentTarget}/>}
  </div>;
}
