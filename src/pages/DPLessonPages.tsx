import { useMemo, useState } from "react";
import { AlgorithmLayout } from "@/components/Lesson/AlgorithmLayout";
import { InputControls } from "@/components/Controls/InputControls";
import { usePlaybackEngine } from "@/hooks/usePlaybackEngine";
import { climbingStairsConfig } from "@/algorithms/climbingStairs/config";
import { frogJumpConfig } from "@/algorithms/frogJump/config";
import { generateClimbingStairsSteps, generateClimbingStairsRecursiveSteps, generateClimbingStairsMemoizedSteps } from "@/algorithms/climbingStairs/generator";
import { generateFrogJumpSteps, generateFrogJumpRecursiveSteps, generateFrogJumpMemoizedSteps, generateRandomHeights } from "@/algorithms/frogJump/generator";
import { DP1DVisualizer } from "@/visualizers/DP1DVisualizer/DP1DVisualizer";
import { RecursionTreeVisualizer } from "@/visualizers/RecursionTreeVisualizer/RecursionTreeVisualizer";
import { ProblemSimulation } from "@/components/Lesson/ProblemSimulation";
import type { DP1DState, RecursionTreeState, VisualizationStep } from "@/types";

type DPFrame = DP1DState | RecursionTreeState;
export function ClimbingStairsPage() {
  const [n, setN] = useState(5);
  const [variant, setVariant] = useState("iterative");
  const [notice, setNotice] = useState("");
  const steps = useMemo<VisualizationStep<DPFrame>[]>(() => variant === "recursive" ? generateClimbingStairsRecursiveSteps(n) : variant === "memoized" ? generateClimbingStairsMemoizedSteps(n) : generateClimbingStairsSteps(n), [n, variant]);
  const engine = usePlaybackEngine(steps);
  const selectVariant = (id: string) => {
    if (id === "recursive" && n > 8) { setNotice("Recursion expands every path. Use 8 stairs or fewer to visualize it; your input has been kept."); return; }
    setNotice(""); setVariant(id);
  };
  return <AlgorithmLayout config={climbingStairsConfig} engine={engine} activeVariantId={variant} onVariantChange={selectVariant} onExampleSelect={i => { setN(i === 0 ? 2 : 3); setNotice(""); }} simulation={<ProblemSimulation kind="stairs"/>} inputControls={<><label className="flex items-center gap-2 text-sm font-medium">Number of stairs (n)<input aria-label="Number of stairs" type="number" min={1} max={variant === "recursive" ? 8 : 20} value={n} onChange={e => { const value = Number(e.target.value); if (Number.isInteger(value) && value >= 1 && value <= (variant === "recursive" ? 8 : 20)) setN(value); }} className="w-20 rounded-lg border border-border bg-background px-3 py-2"/></label><button className="lesson-action" onClick={() => setN(variant === "recursive" ? 3 + Math.floor(Math.random() * 6) : 3 + Math.floor(Math.random() * 8))}>Randomize</button><span className="text-xs text-muted-foreground">{variant === "recursive" ? "1–8 stairs" : "1–20 stairs"}</span>{notice && <p role="status" className="w-full text-sm text-amber-600 dark:text-amber-400">{notice}</p>}</>} visualizer={engine.currentStep ? variant === "iterative" ? <DP1DVisualizer state={engine.currentStep.state as DP1DState} kind="stairs"/> : <RecursionTreeVisualizer state={engine.currentStep.state as RecursionTreeState} showMemo={variant === "memoized"}/> : null}/>;
}

export function FrogJumpPage() {
  const [heights, setHeights] = useState([10, 30, 40, 20]);
  const [variant, setVariant] = useState("iterative");
  const [notice, setNotice] = useState("");
  const steps = useMemo<VisualizationStep<DPFrame>[]>(() => variant === "recursive" ? generateFrogJumpRecursiveSteps(heights) : variant === "memoized" ? generateFrogJumpMemoizedSteps(heights) : generateFrogJumpSteps(heights), [heights, variant]);
  const engine = usePlaybackEngine(steps);
  const selectVariant = (id: string) => {
    if (id === "recursive" && heights.length > 6) { setNotice("Use 6 stones or fewer for the recursive tree. Your input has been kept; edit it to explore recursion."); return; }
    setNotice(""); setVariant(id);
  };
  return <AlgorithmLayout config={frogJumpConfig} engine={engine} activeVariantId={variant} onVariantChange={selectVariant} currentArray={heights} onExampleSelect={i => { setHeights(i === 0 ? [10, 30, 40, 20] : [30, 10, 60, 10, 60, 50]); setNotice(""); }} simulation={<ProblemSimulation kind="frog"/>} inputControls={<><InputControls type="sorting" arraySize={heights.length} minSize={1} maxSize={variant === "recursive" ? 6 : 12} inputLabel="Stone heights" onArraySizeChange={size => setHeights(generateRandomHeights(size))} onRandomize={() => setHeights(generateRandomHeights(heights.length))} currentArray={heights} onCustomArrayChange={arr => { setHeights(arr); setNotice(""); }}/>{notice && <p role="status" className="w-full text-sm text-amber-600 dark:text-amber-400">{notice}</p>}</>} visualizer={engine.currentStep ? variant === "iterative" ? <DP1DVisualizer state={engine.currentStep.state as DP1DState} kind="frog"/> : <RecursionTreeVisualizer state={engine.currentStep.state as RecursionTreeState} showMemo={variant === "memoized"}/> : null}/>;
}
