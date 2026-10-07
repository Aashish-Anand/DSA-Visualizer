import { useMemo, useState } from "react";
import { AlgorithmLayout } from "@/components/Lesson/AlgorithmLayout";
import { InputControls } from "@/components/Controls/InputControls";
import { usePlaybackEngine } from "@/hooks/usePlaybackEngine";
import { histogramConfig, histogramExamples } from "@/algorithms/largestRectangleHistogram/config";
import { generateHistogramSteps } from "@/algorithms/largestRectangleHistogram/generator";
import { HistogramVisualizer } from "@/visualizers/HistogramVisualizer/HistogramVisualizer";

const randomHeights = (n: number) => Array.from({ length: n }, () => Math.floor(Math.random() * 10));
export function HistogramPage() {
  const [heights, setHeights] = useState(histogramExamples[0]);
  const steps = useMemo(() => generateHistogramSteps(heights), [heights]);
  const engine = usePlaybackEngine(steps);
  return <AlgorithmLayout config={histogramConfig} engine={engine} currentArray={heights} hasDryRunPrompts={steps.some(step => !!step.dryRunPrompt)} onExampleSelect={i => setHeights([...histogramExamples[i]])}
    inputControls={<><InputControls type="sorting" inputLabel="Bar heights" minSize={1} maxSize={30} arraySize={heights.length} currentArray={heights} onCustomArrayChange={setHeights} onArraySizeChange={n => setHeights(randomHeights(n))} onRandomize={() => setHeights(randomHeights(heights.length))} validateArray={arr => arr.some(h => !Number.isSafeInteger(h) || h < 0 || h > 1_000_000) ? "Use whole-number heights from 0 to 1,000,000." : null}/><span className="text-xs text-muted-foreground">1–30 bars · nonnegative whole heights</span></>}
    visualizer={engine.currentStep && <HistogramVisualizer state={engine.currentStep.state}/>}/>;
}
