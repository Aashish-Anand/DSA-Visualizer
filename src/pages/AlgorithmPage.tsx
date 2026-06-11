import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { usePlaybackEngine } from "@/hooks/usePlaybackEngine";
import { PlaybackControls } from "@/components/Controls/PlaybackControls";
import { InputControls } from "@/components/Controls/InputControls";
import { PseudocodePanel } from "@/components/PseudocodePanel/PseudocodePanel";
import { ExplanationPanel } from "@/components/ExplanationPanel/ExplanationPanel";
import { BubbleSortVisualizer } from "@/visualizers/BubbleSortVisualizer/BubbleSortVisualizer";
import { TwoSumVisualizer } from "@/visualizers/TwoSumVisualizer/TwoSumVisualizer";
import {
  generateBubbleSortSteps,
  generateRandomArray,
} from "@/algorithms/bubbleSort/generator";
import { bubbleSortConfig } from "@/algorithms/bubbleSort/config";
import {
  generateTwoSumSteps,
  generateRandomTwoSumInput,
} from "@/algorithms/twoSum/generator";
import { twoSumConfig } from "@/algorithms/twoSum/config";
import type { BubbleSortState, TwoSumState } from "@/types";

interface AlgorithmPageProps {
  algorithmId: string;
}

export function AlgorithmPage({ algorithmId }: AlgorithmPageProps) {
  if (algorithmId === "bubble-sort") {
    return <BubbleSortPage />;
  }
  return <TwoSumPage />;
}

// ================================
// Bubble Sort Page
// ================================

function BubbleSortPage() {
  const config = bubbleSortConfig;
  const [arraySize, setArraySize] = useState(8);
  const [inputArray, setInputArray] = useState<number[]>(() =>
    generateRandomArray(8)
  );

  const steps = useMemo(
    () => generateBubbleSortSteps(inputArray),
    [inputArray]
  );

  const engine = usePlaybackEngine<BubbleSortState>(steps);

  const handleRandomize = useCallback(() => {
    setInputArray(generateRandomArray(arraySize));
  }, [arraySize]);

  const handleArraySizeChange = useCallback((size: number) => {
    setArraySize(size);
    setInputArray(generateRandomArray(size));
  }, []);

  return (
    <AlgorithmLayout
      config={config}
      engine={engine}
      inputControls={
        <InputControls
          type="bubble-sort"
          arraySize={arraySize}
          onArraySizeChange={handleArraySizeChange}
          onRandomize={handleRandomize}
        />
      }
      visualizer={
        engine.currentStep ? (
          <BubbleSortVisualizer state={engine.currentStep.state} />
        ) : null
      }
    />
  );
}

// ================================
// Two Sum Page
// ================================

function TwoSumPage() {
  const config = twoSumConfig;
  const [input, setInput] = useState(() => generateRandomTwoSumInput());

  const steps = useMemo(
    () => generateTwoSumSteps(input.nums, input.target),
    [input]
  );

  const engine = usePlaybackEngine<TwoSumState>(steps);

  const handleRandomize = useCallback(() => {
    setInput(generateRandomTwoSumInput());
  }, []);

  const handleTargetChange = useCallback(
    (target: number) => {
      setInput({ nums: input.nums, target });
    },
    [input.nums]
  );

  return (
    <AlgorithmLayout
      config={config}
      engine={engine}
      inputControls={
        <InputControls
          type="two-sum"
          target={input.target}
          onTargetChange={handleTargetChange}
          onRandomize={handleRandomize}
        />
      }
      visualizer={
        engine.currentStep ? (
          <TwoSumVisualizer state={engine.currentStep.state} />
        ) : null
      }
    />
  );
}

// ================================
// Shared Algorithm Layout
// ================================

interface AlgorithmLayoutProps {
  config: typeof bubbleSortConfig;
  engine: ReturnType<typeof usePlaybackEngine<BubbleSortState>> | ReturnType<typeof usePlaybackEngine<TwoSumState>>;
  inputControls: React.ReactNode;
  visualizer: React.ReactNode;
}

function AlgorithmLayout({
  config,
  engine,
  inputControls,
  visualizer,
}: AlgorithmLayoutProps) {
  const DIFFICULTY_COLORS: Record<string, string> = {
    Easy: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    Medium: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    Hard: "bg-red-500/10 text-red-500 border-red-500/20",
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <motion.header
        className="shrink-0 px-4 lg:px-6 py-3 border-b border-border"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-lg font-bold text-foreground">{config.title}</h1>
          <Badge
            variant="outline"
            className={`text-[10px] ${DIFFICULTY_COLORS[config.difficulty]}`}
          >
            {config.difficulty}
          </Badge>
          <Badge variant="secondary" className="text-[10px]">
            {config.category}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground max-w-2xl leading-relaxed">
          {config.description}
        </p>
      </motion.header>

      {/* Controls Bar */}
      <div className="shrink-0 px-4 lg:px-6 py-2.5 border-b border-border bg-card/50 flex items-center justify-between gap-4 flex-wrap">
        <PlaybackControls
          isPlaying={engine.isPlaying}
          speed={engine.speed}
          currentStep={engine.currentStepIndex}
          totalSteps={engine.totalSteps}
          isFirstStep={engine.isFirstStep}
          isLastStep={engine.isLastStep}
          progress={engine.progress}
          onPlay={engine.play}
          onPause={engine.pause}
          onNext={engine.next}
          onPrevious={engine.previous}
          onReset={engine.reset}
          onSpeedChange={engine.setSpeed}
        />
        <Separator orientation="vertical" className="h-6 hidden sm:block" />
        {inputControls}
      </div>

      {/* Main content — Visualizer + Pseudocode */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0">
        {/* Visualizer */}
        <motion.div
          className="flex-1 lg:flex-[3] overflow-auto border-b lg:border-b-0 lg:border-r border-border"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {visualizer}
        </motion.div>

        {/* Pseudocode */}
        <motion.div
          className="lg:flex-[2] lg:max-w-sm xl:max-w-md overflow-hidden border-b lg:border-b-0 border-border bg-card/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {engine.currentStep && (
            <PseudocodePanel
              lines={config.pseudocode}
              activeLine={engine.currentStep.activeLine}
            />
          )}
        </motion.div>
      </div>

      {/* Explanation Panel */}
      <motion.div
        className="shrink-0 border-t border-border bg-card/50 min-h-[100px] max-h-[140px]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {engine.currentStep && (
          <ExplanationPanel
            explanation={engine.currentStep.explanation}
            beginnerExplanation={engine.currentStep.beginnerExplanation}
            currentStep={engine.currentStepIndex}
            totalSteps={engine.totalSteps}
          />
        )}
      </motion.div>
    </div>
  );
}
