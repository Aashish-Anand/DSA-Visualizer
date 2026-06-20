import { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, BarChart2, Code2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { usePlaybackEngine } from "@/hooks/usePlaybackEngine";
import { PlaybackControls } from "@/components/Controls/PlaybackControls";
import { InputControls } from "@/components/Controls/InputControls";
import { CodePanel } from "@/components/CodePanel/CodePanel";
import { ExplanationPanel } from "@/components/ExplanationPanel/ExplanationPanel";
import { ComplexityExplorer } from "@/components/Complexity/ComplexityExplorer";
import { useFeedbackContext } from "@/hooks/useFeedbackContext";

// Visualizers
import { SortingBarVisualizer } from "@/visualizers/SortingBarVisualizer/SortingBarVisualizer";
import { MergeSortVisualizer } from "@/visualizers/MergeSortVisualizer/MergeSortVisualizer";
import { RadixSortVisualizer } from "@/visualizers/RadixSortVisualizer/RadixSortVisualizer";
import { CountingSortVisualizer } from "@/visualizers/CountingSortVisualizer/CountingSortVisualizer";
import { ArraySearchVisualizer } from "@/visualizers/ArraySearchVisualizer/ArraySearchVisualizer";
import { LinkedListVisualizer } from "@/visualizers/LinkedListVisualizer/LinkedListVisualizer";
import { TwoSumVisualizer } from "@/visualizers/TwoSumVisualizer/TwoSumVisualizer";
import { StockBuySellVisualizer } from "@/visualizers/StockBuySellVisualizer/StockBuySellVisualizer";
import { KadaneVisualizer } from "@/visualizers/KadaneVisualizer/KadaneVisualizer";
import { MajorityElementVisualizer } from "@/visualizers/MajorityElementVisualizer/MajorityElementVisualizer";
import type { DP1DState, RecursionTreeState } from "@/types";
import { TreeVisualizer } from "@/visualizers/TreeVisualizer/TreeVisualizer";
import { GraphVisualizer } from "@/visualizers/GraphVisualizer/GraphVisualizer";
import { DP1DVisualizer } from "@/visualizers/DP1DVisualizer/DP1DVisualizer";
import { RecursionTreeVisualizer } from "@/visualizers/RecursionTreeVisualizer/RecursionTreeVisualizer";
import { FrogJumpProblemVisualizer } from "@/visualizers/ProblemVisualizer/FrogJumpProblemVisualizer";
import { ClimbingStairsProblemVisualizer } from "@/visualizers/ProblemVisualizer/ClimbingStairsProblemVisualizer";
import { TwoPointersVisualizer } from "@/visualizers/TwoPointersVisualizer/TwoPointersVisualizer";
import { WaterVisualizer } from "@/visualizers/WaterVisualizer/WaterVisualizer";

// Generators & Configs
import { bubbleSortConfig } from "@/algorithms/bubbleSort/config";
import { generateBubbleSortSteps, generateRandomArray } from "@/algorithms/bubbleSort/generator";
import { selectionSortConfig } from "@/algorithms/selectionSort/config";
import { generateSelectionSortSteps } from "@/algorithms/selectionSort/generator";
import { insertionSortConfig } from "@/algorithms/insertionSort/config";
import { generateInsertionSortSteps } from "@/algorithms/insertionSort/generator";
import { quickSortConfig } from "@/algorithms/quickSort/config";
import { generateQuickSortSteps } from "@/algorithms/quickSort/generator";
import { mergeSortConfig } from "@/algorithms/mergeSort/config";
import { generateMergeSortSteps } from "@/algorithms/mergeSort/generator";
import { radixSortConfig } from "@/algorithms/radixSort/config";
import { generateRadixSortSteps } from "@/algorithms/radixSort/generator";
import { countingSortConfig } from "@/algorithms/countingSort/config";
import { generateCountingSortSteps, generateCountingSortArray } from "@/algorithms/countingSort/generator";
import { linearSearchConfig } from "@/algorithms/linearSearch/config";
import { generateLinearSearchSteps, generateSearchTarget } from "@/algorithms/linearSearch/generator";
import { binarySearchConfig } from "@/algorithms/binarySearch/config";
import { generateBinarySearchSteps } from "@/algorithms/binarySearch/generator";
import { singlyLinkedListSearchConfig } from "@/algorithms/singlyLinkedListSearch/config";
import { generateSinglyLinkedListSearchSteps } from "@/algorithms/singlyLinkedListSearch/generator";
import { twoSumConfig } from "@/algorithms/twoSum/config";
import { generateTwoSumSteps, generateRandomTwoSumInput } from "@/algorithms/twoSum/generator";

import { climbingStairsConfig } from "@/algorithms/climbingStairs/config";
import { generateClimbingStairsSteps, generateClimbingStairsMemoizedSteps, generateClimbingStairsRecursiveSteps } from "@/algorithms/climbingStairs/generator";

import { frogJumpConfig } from "@/algorithms/frogJump/config";
import { generateFrogJumpSteps, generateFrogJumpRecursiveSteps, generateFrogJumpMemoizedSteps, generateRandomHeights } from "@/algorithms/frogJump/generator";

import { stockBuySellConfig } from "@/algorithms/stockBuySell/config";
import { generateStockBuySellSteps, generateStockArray } from "@/algorithms/stockBuySell/generator";
import { kadaneConfig } from "@/algorithms/kadane/config";
import { generateKadaneSteps, generateKadaneArray } from "@/algorithms/kadane/generator";
import { majorityElement1Config } from "@/algorithms/majorityElement1/config";
import { generateMajorityElement1Steps, generateMajorityElement1Array } from "@/algorithms/majorityElement1/generator";
import { majorityElement2Config } from "@/algorithms/majorityElement2/config";
import { generateMajorityElement2Steps, generateMajorityElement2Array } from "@/algorithms/majorityElement2/generator";

import { treePreorderConfig } from "@/algorithms/treePreorder/config";
import { generateTreePreorderSteps } from "@/algorithms/treePreorder/generator";
import { treeInorderConfig } from "@/algorithms/treeInorder/config";
import { generateTreeInorderSteps } from "@/algorithms/treeInorder/generator";
import { treePostorderConfig } from "@/algorithms/treePostorder/config";
import { generateTreePostorderSteps } from "@/algorithms/treePostorder/generator";
import { treeLevelorderConfig } from "@/algorithms/treeLevelorder/config";
import { generateTreeLevelorderSteps } from "@/algorithms/treeLevelorder/generator";
import { generateBinaryTree } from "@/algorithms/tree/utils";

import { graphBfsConfig } from "@/algorithms/graphBfs/config";
import { generateGraphBfsSteps } from "@/algorithms/graphBfs/generator";
import { graphDfsConfig } from "@/algorithms/graphDfs/config";
import { generateGraphDfsSteps } from "@/algorithms/graphDfs/generator";
import { generateRandomGraph } from "@/algorithms/graph/utils";

import { threeSumConfig } from "@/algorithms/threeSum/config";
import { generateThreeSumSteps, generateRandomThreeSumInput } from "@/algorithms/threeSum/generator";
import { fourSumConfig } from "@/algorithms/fourSum/config";
import { generateFourSumSteps, generateRandomFourSumInput } from "@/algorithms/fourSum/generator";
import { containerWithMostWaterConfig } from "@/algorithms/containerWithMostWater/config";
import { generateContainerSteps, generateRandomContainerInput } from "@/algorithms/containerWithMostWater/generator";
import { trappingRainWaterConfig } from "@/algorithms/trappingRainWater/config";
import { generateTrappingRainWaterSteps, generateRandomTrappingInput } from "@/algorithms/trappingRainWater/generator";

import type {
  SortingBarState,
  MergeSortState,
  RadixSortState,
  CountingSortState,
  ArraySearchState,
  LinkedListState,
  TwoSumState,
  StockBuySellState,
  KadaneState,
  MajorityElement1State,
  MajorityElement2State,
  TreeTraversalState,
  GraphTraversalState,
  TwoPointersState,
  WaterState,
  GraphNode,
  GraphEdge,
  TreeNode,
  AlgorithmConfig,
  VisualizationStep,
  PlaybackState,
  PlaybackControls as PlaybackControlsType
} from "@/types";

interface AlgorithmPageProps {
  algorithmId: string;
}

export function AlgorithmPage({ algorithmId }: AlgorithmPageProps) {
  switch (algorithmId) {
    case "climbing-stairs":
      return <ClimbingStairsPage />;
    case "frog-jump":
      return <FrogJumpPage />;
    // Sorting
    case "bubble-sort":
      return <SortingPage config={bubbleSortConfig} generator={generateBubbleSortSteps} />;
    case "selection-sort":
      return <SortingPage config={selectionSortConfig} generator={generateSelectionSortSteps} />;
    case "insertion-sort":
      return <SortingPage config={insertionSortConfig} generator={generateInsertionSortSteps} />;
    case "quick-sort":
      return <SortingPage config={quickSortConfig} generator={generateQuickSortSteps} />;
    case "merge-sort":
      return <MergeSortPage />;
    case "radix-sort":
      return <RadixSortPage />;
    case "counting-sort":
      return <CountingSortPage />;

    // Searching
    case "linear-search":
      return <ArraySearchPage config={linearSearchConfig} generator={generateLinearSearchSteps} />;
    case "binary-search":
      return <ArraySearchPage config={binarySearchConfig} generator={generateBinarySearchSteps} />;

    // Linked Lists
    case "sll-search":
      return <LinkedListSearchPage config={singlyLinkedListSearchConfig} generator={generateSinglyLinkedListSearchSteps} />;

    // Arrays
    case "two-sum":
      return <TwoSumPage />;
    case "stock-buy-sell":
      return <StockBuySellPage />;
    case "kadane":
      return <KadanePage />;
    case "majority-element-1":
      return <MajorityElement1Page />;
    case "majority-element-2":
      return <MajorityElement2Page />;

    // Two Pointers
    case "three-sum":
      return <TwoPointersPage config={threeSumConfig} generator={generateThreeSumSteps} generateInput={generateRandomThreeSumInput} />;
    case "four-sum":
      return <TwoPointersPage config={fourSumConfig} generator={generateFourSumSteps} generateInput={generateRandomFourSumInput} />;
    case "container-with-most-water":
      return <WaterPage config={containerWithMostWaterConfig} generator={generateContainerSteps} generateInput={generateRandomContainerInput} />;
    case "trapping-rain-water":
      return <WaterPage config={trappingRainWaterConfig} generator={generateTrappingRainWaterSteps} generateInput={generateRandomTrappingInput} />;

    // Trees
    case "tree-preorder":
      return <TreeTraversalPage config={treePreorderConfig} generator={generateTreePreorderSteps} />;
    case "tree-inorder":
      return <TreeTraversalPage config={treeInorderConfig} generator={generateTreeInorderSteps} />;
    case "tree-postorder":
      return <TreeTraversalPage config={treePostorderConfig} generator={generateTreePostorderSteps} />;
    case "tree-levelorder":
      return <TreeTraversalPage config={treeLevelorderConfig} generator={generateTreeLevelorderSteps} />;

    // Graphs
    case "graph-bfs":
      return <GraphTraversalPage config={graphBfsConfig} generator={generateGraphBfsSteps} />;
    case "graph-dfs":
      return <GraphTraversalPage config={graphDfsConfig} generator={generateGraphDfsSteps} />;

    default:
      return <div className="p-8">Algorithm not found</div>;
  }
}

// ================================
// Generic Two Pointers Page
// ================================

interface TwoPointersPageProps {
  config: AlgorithmConfig;
  generator: (arr: number[], target: number) => VisualizationStep<TwoPointersState>[];
  generateInput: (size: number) => { nums: number[]; target: number };
}

function TwoPointersPage({ config, generator, generateInput }: TwoPointersPageProps) {
  const [arraySize, setArraySize] = useState(8);
  const [input, setInput] = useState(() => generateInput(8));

  const steps = useMemo(
    () => generator(input.nums, input.target),
    [input, generator]
  );

  const engine = usePlaybackEngine<TwoPointersState>(steps);

  const handleRandomize = useCallback(() => {
    setInput(generateInput(arraySize));
  }, [generateInput, arraySize]);

  const handleArraySizeChange = useCallback(
    (size: number) => {
      setArraySize(size);
      setInput(generateInput(size));
    },
    [generateInput]
  );

  const handleTargetChange = useCallback(
    (target: number) => {
      setInput((prev) => ({ ...prev, target }));
    },
    []
  );

  const handleCustomArrayChange = useCallback((arr: number[]) => {
    setArraySize(arr.length);
    setInput((prev) => ({ ...prev, nums: arr }));
  }, []);

  return (
    <AlgorithmLayout
      config={config}
      engine={engine}
      inputControls={
        <InputControls
          type="search"
          arraySize={arraySize}
          maxSize={12}
          target={input.target}
          onTargetChange={handleTargetChange}
          onArraySizeChange={handleArraySizeChange}
          onRandomize={handleRandomize}
          currentArray={input.nums}
          onCustomArrayChange={handleCustomArrayChange}
        />
      }
      visualizer={
        engine.currentStep ? (
          <TwoPointersVisualizer state={engine.currentStep.state} />
        ) : null
      }
    />
  );
}

// ================================
// Generic Water Page
// ================================

interface WaterPageProps {
  config: AlgorithmConfig;
  generator: (arr: number[]) => VisualizationStep<WaterState>[];
  generateInput: (size: number) => number[];
}

function WaterPage({ config, generator, generateInput }: WaterPageProps) {
  const [arraySize, setArraySize] = useState(12);
  const [inputArray, setInputArray] = useState(() => generateInput(12));

  const steps = useMemo(
    () => generator(inputArray),
    [inputArray, generator]
  );

  const engine = usePlaybackEngine<WaterState>(steps);

  const handleRandomize = useCallback(() => {
    setInputArray(generateInput(arraySize));
  }, [generateInput, arraySize]);

  const handleArraySizeChange = useCallback(
    (size: number) => {
      setArraySize(size);
      setInputArray(generateInput(size));
    },
    [generateInput]
  );

  return (
    <AlgorithmLayout
      config={config}
      engine={engine}
      inputControls={
        <InputControls
          type="sorting"
          arraySize={arraySize}
          onArraySizeChange={handleArraySizeChange}
          onRandomize={handleRandomize}
        />
      }
      visualizer={
        engine.currentStep ? (
          <WaterVisualizer state={engine.currentStep.state} />
        ) : null
      }
    />
  );
}

// ================================
// Generic Sorting Page
// ================================

interface SortingPageProps {
  config: AlgorithmConfig;
  generator: (arr: number[]) => VisualizationStep<SortingBarState>[];
}

function SortingPage({ config, generator }: SortingPageProps) {
  const [arraySize, setArraySize] = useState(8);
  const [inputArray, setInputArray] = useState<number[]>(() =>
    generateRandomArray(8)
  );
  const [viewMode, setViewMode] = useState<"algorithm" | "complexity">("algorithm");

  const steps = useMemo(() => generator(inputArray), [inputArray, generator]);
  const engine = usePlaybackEngine<SortingBarState>(steps);

  const handleRandomize = useCallback(() => {
    setInputArray(generateRandomArray(arraySize));
  }, [arraySize]);

  const handleArraySizeChange = useCallback((size: number) => {
    setArraySize(size);
    setInputArray(generateRandomArray(size));
  }, []);

  const handleCustomArrayChange = useCallback((arr: number[]) => {
    setArraySize(arr.length);
    setInputArray(arr);
  }, []);

  // If this algorithm has a complexity explorer config, show the mode toggle
  if (config.complexityExplorer) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex justify-center border-b border-border bg-card/30 p-2 gap-2">
          <button
            onClick={() => setViewMode("algorithm")}
            className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors flex items-center gap-2 ${viewMode === "algorithm" ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:bg-muted"
              }`}
          >
            <Code2 className="w-4 h-4" /> Algorithm View
          </button>
          <button
            onClick={() => setViewMode("complexity")}
            className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors flex items-center gap-2 ${viewMode === "complexity" ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:bg-muted"
              }`}
          >
            <BarChart2 className="w-4 h-4" /> Complexity Explorer
            <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full ${viewMode === "complexity" ? "bg-primary-foreground/20 text-primary-foreground" : "bg-primary/10 text-primary border border-primary/20"}`}>Beta</span>
          </button>
        </div>

        {viewMode === "algorithm" ? (
          <AlgorithmLayout
            config={config}
            engine={engine}
            inputControls={
              <InputControls
                type="sorting"
                arraySize={arraySize}
                onArraySizeChange={handleArraySizeChange}
                onRandomize={handleRandomize}
                currentArray={inputArray}
                onCustomArrayChange={handleCustomArrayChange}
              />
            }
            visualizer={
              engine.currentStep ? (
                <SortingBarVisualizer state={engine.currentStep.state} />
              ) : null
            }
          />
        ) : (
          <ComplexityExplorer
            config={config.complexityExplorer}
            algorithmName={config.title}
            currentMetrics={engine.currentStep?.complexityMetrics}
            currentArray={inputArray}
          />
        )}
      </div>
    );
  }

  return (
    <AlgorithmLayout
      config={config}
      engine={engine}
      inputControls={
        <InputControls
          type="sorting"
          arraySize={arraySize}
          onArraySizeChange={handleArraySizeChange}
          onRandomize={handleRandomize}
          currentArray={inputArray}
          onCustomArrayChange={handleCustomArrayChange}
        />
      }
      visualizer={
        engine.currentStep ? (
          <SortingBarVisualizer state={engine.currentStep.state} />
        ) : null
      }
    />
  );
}

// ================================
// Generic Search Page
// ================================

interface ArraySearchPageProps {
  config: AlgorithmConfig;
  generator: (arr: number[], target: number) => VisualizationStep<ArraySearchState>[];
}

function ArraySearchPage({ config, generator }: ArraySearchPageProps) {
  const [arraySize, setArraySize] = useState(10);
  const [inputArray, setInputArray] = useState<number[]>(() =>
    generateRandomArray(10)
  );
  const [target, setTarget] = useState<number>(() => generateSearchTarget(inputArray));

  const steps = useMemo(() => generator(inputArray, target), [inputArray, target, generator]);
  const engine = usePlaybackEngine<ArraySearchState>(steps);

  const handleRandomize = useCallback(() => {
    const newArray = generateRandomArray(arraySize);
    setInputArray(newArray);
    setTarget(generateSearchTarget(newArray));
  }, [arraySize]);

  const handleArraySizeChange = useCallback((size: number) => {
    setArraySize(size);
    const newArray = generateRandomArray(size);
    setInputArray(newArray);
    setTarget(generateSearchTarget(newArray));
  }, []);

  const handleTargetChange = useCallback((newTarget: number) => {
    setTarget(newTarget);
  }, []);

  const handleCustomArrayChange = useCallback((arr: number[]) => {
    setArraySize(arr.length);
    setInputArray(arr);
  }, []);

  return (
    <AlgorithmLayout
      config={config}
      engine={engine}
      inputControls={
        <InputControls
          type="search"
          arraySize={arraySize}
          target={target}
          onTargetChange={handleTargetChange}
          onArraySizeChange={handleArraySizeChange}
          onRandomize={handleRandomize}
          currentArray={inputArray}
          onCustomArrayChange={handleCustomArrayChange}
        />
      }
      visualizer={
        engine.currentStep ? (
          <ArraySearchVisualizer state={engine.currentStep.state} />
        ) : null
      }
    />
  );
}

// ================================
// Linked List Search Page
// ================================

interface LinkedListSearchPageProps {
  config: AlgorithmConfig;
  generator: (arr: number[], target: number) => VisualizationStep<LinkedListState>[];
}

function LinkedListSearchPage({ config, generator }: LinkedListSearchPageProps) {
  const [arraySize, setArraySize] = useState(8);
  const [inputArray, setInputArray] = useState<number[]>(() =>
    generateRandomArray(8)
  );
  const [target, setTarget] = useState<number>(() => generateSearchTarget(inputArray));

  const steps = useMemo(() => generator(inputArray, target), [inputArray, target, generator]);
  const engine = usePlaybackEngine<LinkedListState>(steps);

  const handleRandomize = useCallback(() => {
    const newArray = generateRandomArray(arraySize);
    setInputArray(newArray);
    setTarget(generateSearchTarget(newArray));
  }, [arraySize]);

  const handleArraySizeChange = useCallback((size: number) => {
    setArraySize(size);
    const newArray = generateRandomArray(size);
    setInputArray(newArray);
    setTarget(generateSearchTarget(newArray));
  }, []);

  const handleTargetChange = useCallback((newTarget: number) => {
    setTarget(newTarget);
  }, []);

  const handleCustomArrayChange = useCallback((arr: number[]) => {
    setArraySize(arr.length);
    setInputArray(arr);
  }, []);

  return (
    <AlgorithmLayout
      config={config}
      engine={engine}
      inputControls={
        <InputControls
          type="search"
          arraySize={arraySize}
          target={target}
          onTargetChange={handleTargetChange}
          onArraySizeChange={handleArraySizeChange}
          onRandomize={handleRandomize}
          currentArray={inputArray}
          onCustomArrayChange={handleCustomArrayChange}
        />
      }
      visualizer={
        engine.currentStep ? (
          <LinkedListVisualizer state={engine.currentStep.state} />
        ) : null
      }
    />
  );
}

// ================================
// Merge Sort Page
// ================================

function MergeSortPage() {
  const [arraySize, setArraySize] = useState(8);
  const [inputArray, setInputArray] = useState<number[]>(() =>
    generateRandomArray(8)
  );

  const steps = useMemo(() => generateMergeSortSteps(inputArray), [inputArray]);
  const engine = usePlaybackEngine<MergeSortState>(steps);

  const handleRandomize = useCallback(() => {
    setInputArray(generateRandomArray(arraySize));
  }, [arraySize]);

  const handleArraySizeChange = useCallback((size: number) => {
    setArraySize(size);
    setInputArray(generateRandomArray(size));
  }, []);

  const handleCustomArrayChange = useCallback((arr: number[]) => {
    setArraySize(arr.length);
    setInputArray(arr);
  }, []);

  return (
    <AlgorithmLayout
      config={mergeSortConfig}
      engine={engine}
      inputControls={
        <InputControls
          type="sorting"
          arraySize={arraySize}
          onArraySizeChange={handleArraySizeChange}
          onRandomize={handleRandomize}
          currentArray={inputArray}
          onCustomArrayChange={handleCustomArrayChange}
        />
      }
      visualizer={
        engine.currentStep ? (
          <MergeSortVisualizer state={engine.currentStep.state} />
        ) : null
      }
    />
  );
}

// ================================
// Radix Sort Page
// ================================

function RadixSortPage() {
  const [arraySize, setArraySize] = useState(8);
  const [inputArray, setInputArray] = useState<number[]>(() =>
    generateRandomArray(8).map(x => x * Math.floor(Math.random() * 10))
  );

  const steps = useMemo(() => generateRadixSortSteps(inputArray), [inputArray]);
  const engine = usePlaybackEngine<RadixSortState>(steps);

  const handleRandomize = useCallback(() => {
    setInputArray(generateRandomArray(arraySize).map(x => x * Math.floor(Math.random() * 10)));
  }, [arraySize]);

  const handleArraySizeChange = useCallback((size: number) => {
    setArraySize(size);
    setInputArray(generateRandomArray(size).map(x => x * Math.floor(Math.random() * 10)));
  }, []);

  const handleCustomArrayChange = useCallback((arr: number[]) => {
    setArraySize(arr.length);
    setInputArray(arr);
  }, []);

  return (
    <AlgorithmLayout
      config={radixSortConfig}
      engine={engine}
      inputControls={
        <InputControls
          type="sorting"
          arraySize={arraySize}
          onArraySizeChange={handleArraySizeChange}
          onRandomize={handleRandomize}
          currentArray={inputArray}
          onCustomArrayChange={handleCustomArrayChange}
        />
      }
      visualizer={
        engine.currentStep ? (
          <RadixSortVisualizer state={engine.currentStep.state} />
        ) : null
      }
    />
  );
}

// ================================
// Counting Sort Page
// ================================

function CountingSortPage() {
  const [arraySize, setArraySize] = useState(8);
  const [inputArray, setInputArray] = useState<number[]>(() =>
    generateCountingSortArray(8)
  );

  const steps = useMemo(() => generateCountingSortSteps(inputArray), [inputArray]);
  const engine = usePlaybackEngine<CountingSortState>(steps);

  const handleRandomize = useCallback(() => {
    setInputArray(generateCountingSortArray(arraySize));
  }, [arraySize]);

  const handleArraySizeChange = useCallback((size: number) => {
    setArraySize(size);
    setInputArray(generateCountingSortArray(size));
  }, []);

  const handleCustomArrayChange = useCallback((arr: number[]) => {
    setArraySize(arr.length);
    setInputArray(arr);
  }, []);

  return (
    <AlgorithmLayout
      config={countingSortConfig}
      engine={engine}
      inputControls={
        <InputControls
          type="sorting"
          arraySize={arraySize}
          onArraySizeChange={handleArraySizeChange}
          onRandomize={handleRandomize}
          currentArray={inputArray}
          onCustomArrayChange={handleCustomArrayChange}
        />
      }
      visualizer={
        engine.currentStep ? (
          <CountingSortVisualizer state={engine.currentStep.state} />
        ) : null
      }
    />
  );
}

// ================================
// Two Sum Page
// ================================

function TwoSumPage() {
  const [arraySize, setArraySize] = useState(8);
  const [input, setInput] = useState(() => generateRandomTwoSumInput(8));
  const [viewMode, setViewMode] = useState<"algorithm" | "complexity">("algorithm");

  const steps = useMemo(
    () => generateTwoSumSteps(input.nums, input.target),
    [input]
  );
  const engine = usePlaybackEngine<TwoSumState>(steps);

  const handleRandomize = useCallback(() => {
    setInput(generateRandomTwoSumInput(arraySize));
  }, [arraySize]);

  const handleArraySizeChange = useCallback((size: number) => {
    setArraySize(size);
    setInput(generateRandomTwoSumInput(size));
  }, []);

  const handleTargetChange = useCallback((target: number) => {
    setInput((prev) => ({ ...prev, target }));
  }, []);

  const handleCustomArrayChange = useCallback((arr: number[]) => {
    setArraySize(arr.length);
    setInput((prev) => ({ ...prev, nums: arr }));
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-center border-b border-border bg-card/30 p-2 gap-2">
        <button
          onClick={() => setViewMode("algorithm")}
          className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors flex items-center gap-2 ${viewMode === "algorithm" ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:bg-muted"
            }`}
        >
          <Code2 className="w-4 h-4" /> Algorithm View
        </button>
        <button
          onClick={() => setViewMode("complexity")}
          className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors flex items-center gap-2 ${viewMode === "complexity" ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:bg-muted"
            }`}
        >
          <BarChart2 className="w-4 h-4" /> Complexity Explorer
          <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full ${viewMode === "complexity" ? "bg-primary-foreground/20 text-primary-foreground" : "bg-primary/10 text-primary border border-primary/20"}`}>Beta</span>
        </button>
      </div>

      {viewMode === "algorithm" ? (
        <AlgorithmLayout
          config={twoSumConfig}
          engine={engine}
          inputControls={
            <InputControls
              type="search"
              arraySize={arraySize}
              onArraySizeChange={handleArraySizeChange}
              onRandomize={handleRandomize}
              target={input.target}
              onTargetChange={handleTargetChange}
              currentArray={input.nums}
              onCustomArrayChange={handleCustomArrayChange}
            />
          }
          visualizer={
            engine.currentStep ? (
              <TwoSumVisualizer state={engine.currentStep.state} />
            ) : null
          }
        />
      ) : (
        <ComplexityExplorer
          config={twoSumConfig.complexityExplorer!}
          algorithmName={twoSumConfig.title}
          currentMetrics={engine.currentStep?.complexityMetrics}
          currentArray={input.nums}
          currentTarget={input.target}
        />
      )}
    </div>
  );
}

// ================================
// DP: Climbing Stairs
// ================================

function ClimbingStairsPage() {
  const [n, setN] = useState(5);
  const [activeVariantId, setActiveVariantId] = useState("iterative");
  const [viewMode, setViewMode] = useState<"problem" | "algorithm">("problem");

  const steps = useMemo(() => {
    if (activeVariantId === "recursive") return generateClimbingStairsRecursiveSteps(n);
    if (activeVariantId === "memoized") return generateClimbingStairsMemoizedSteps(n);
    return generateClimbingStairsSteps(n);
  }, [n, activeVariantId]);

  const engine = usePlaybackEngine<unknown>(steps);

  const handleRandomize = useCallback(() => {
    setN(Math.floor(Math.random() * 8) + 3);
  }, []);

  const handleNChange = useCallback((newN: number) => {
    setN(newN);
  }, []);

  useEffect(() => {
    if (activeVariantId === "recursive" && n > 8) {
      // eslint-disable-next-line
      setN(8);
    } else if (activeVariantId !== "recursive" && n > 20) {

      setN(20);
    }
  }, [activeVariantId, n]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-center border-b border-border bg-card/30 p-2 gap-2">
        <button
          onClick={() => setViewMode("problem")}
          className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors ${viewMode === "problem" ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:bg-muted"
            }`}
        >
          🏃 Problem Simulation
        </button>
        <button
          onClick={() => setViewMode("algorithm")}
          className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors ${viewMode === "algorithm" ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:bg-muted"
            }`}
        >
          💻 Algorithm Execution
        </button>
      </div>

      {viewMode === "problem" ? (
        <div className="flex-1 overflow-hidden relative">
          <ClimbingStairsProblemVisualizer n={n} onSwitchToAlgorithm={() => setViewMode("algorithm")} />
        </div>
      ) : (
        <AlgorithmLayout
          config={climbingStairsConfig}
          engine={engine}
          activeVariantId={activeVariantId}
          onVariantChange={setActiveVariantId}
          inputControls={
            <InputControls
              type="two-sum"
              target={n}
              onTargetChange={handleNChange}
              onRandomize={handleRandomize}
            />
          }
          visualizer={
            engine.currentStep ? (
              activeVariantId === "iterative" ? (
                <DP1DVisualizer state={engine.currentStep.state as DP1DState} />
              ) : (
                <RecursionTreeVisualizer state={engine.currentStep.state as RecursionTreeState} />
              )
            ) : null
          }
        />
      )}
    </div>
  );
}

// ================================
// DP: Frog Jump
// ================================

function FrogJumpPage() {
  const [arraySize, setArraySize] = useState(8);
  const [heights, setHeights] = useState(() => generateRandomHeights(8));

  const [activeVariantId, setActiveVariantId] = useState("iterative");
  const [viewMode, setViewMode] = useState<"problem" | "algorithm">("problem");

  const steps = useMemo(() => {
    if (activeVariantId === "recursive") return generateFrogJumpRecursiveSteps(heights);
    if (activeVariantId === "memoized") return generateFrogJumpMemoizedSteps(heights);
    return generateFrogJumpSteps(heights);
  }, [heights, activeVariantId]);

  const engine = usePlaybackEngine<unknown>(steps);

  const handleRandomize = useCallback(() => {
    setHeights(generateRandomHeights(arraySize));
  }, [arraySize]);

  const handleArraySizeChange = useCallback((size: number) => {
    setArraySize(size);
    setHeights(generateRandomHeights(size));
  }, []);

  const handleCustomArrayChange = useCallback((arr: number[]) => {
    setArraySize(arr.length);
    setHeights(arr);
  }, []);

  // Effect to automatically limit array size for recursive approach
  useEffect(() => {
    if (activeVariantId === "recursive" && arraySize > 6) {
      // eslint-disable-next-line
      setArraySize(6);

      setHeights((prev) => prev.slice(0, 6));
    }
  }, [activeVariantId, arraySize]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-center border-b border-border bg-card/30 p-2 gap-2">
        <button
          onClick={() => setViewMode("problem")}
          className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors ${viewMode === "problem" ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:bg-muted"
            }`}
        >
          🐸 Problem Simulation
        </button>
        <button
          onClick={() => setViewMode("algorithm")}
          className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors ${viewMode === "algorithm" ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:bg-muted"
            }`}
        >
          💻 Algorithm Execution
        </button>
      </div>

      {viewMode === "problem" ? (
        <div className="flex-1 overflow-hidden relative">
          <FrogJumpProblemVisualizer heights={heights} onSwitchToAlgorithm={() => setViewMode("algorithm")} />
        </div>
      ) : (
        <AlgorithmLayout
          config={frogJumpConfig}
          engine={engine}
          activeVariantId={activeVariantId}
          onVariantChange={setActiveVariantId}
          inputControls={
            <InputControls
              type="sorting"
              arraySize={arraySize}
              maxSize={activeVariantId === "recursive" ? 6 : 12}
              onArraySizeChange={handleArraySizeChange}
              onRandomize={handleRandomize}
              currentArray={heights}
              onCustomArrayChange={handleCustomArrayChange}
            />
          }
          visualizer={
            engine.currentStep ? (
              activeVariantId === "iterative" ? (
                <DP1DVisualizer state={engine.currentStep.state as import("@/types").DP1DState} />
              ) : (
                <RecursionTreeVisualizer state={engine.currentStep.state as import("@/types").RecursionTreeState} />
              )
            ) : null
          }
        />
      )}
    </div>
  );
}

// ================================
// Stock Buy and Sell Page
// ================================

function StockBuySellPage() {
  const [arraySize, setArraySize] = useState(8);
  const [inputArray, setInputArray] = useState<number[]>(() =>
    generateStockArray(8)
  );

  const steps = useMemo(() => generateStockBuySellSteps(inputArray), [inputArray]);
  const engine = usePlaybackEngine<StockBuySellState>(steps);

  const handleRandomize = useCallback(() => {
    setInputArray(generateStockArray(arraySize));
  }, [arraySize]);

  const handleArraySizeChange = useCallback((size: number) => {
    setArraySize(size);
    setInputArray(generateStockArray(size));
  }, []);

  const handleCustomArrayChange = useCallback((arr: number[]) => {
    setArraySize(arr.length);
    setInputArray(arr);
  }, []);

  return (
    <AlgorithmLayout
      config={stockBuySellConfig}
      engine={engine}
      inputControls={
        <InputControls
          type="sorting"
          arraySize={arraySize}
          onArraySizeChange={handleArraySizeChange}
          onRandomize={handleRandomize}
          currentArray={inputArray}
          onCustomArrayChange={handleCustomArrayChange}
        />
      }
      visualizer={
        engine.currentStep ? (
          <StockBuySellVisualizer state={engine.currentStep.state} />
        ) : null
      }
    />
  );
}

// ================================
// Kadane's Algorithm Page
// ================================

function KadanePage() {
  const [arraySize, setArraySize] = useState(8);
  const [inputArray, setInputArray] = useState<number[]>(() =>
    generateKadaneArray(8)
  );

  const steps = useMemo(() => generateKadaneSteps(inputArray), [inputArray]);
  const engine = usePlaybackEngine<KadaneState>(steps);

  const handleRandomize = useCallback(() => {
    setInputArray(generateKadaneArray(arraySize));
  }, [arraySize]);

  const handleArraySizeChange = useCallback((size: number) => {
    setArraySize(size);
    setInputArray(generateKadaneArray(size));
  }, []);

  const handleCustomArrayChange = useCallback((arr: number[]) => {
    setArraySize(arr.length);
    setInputArray(arr);
  }, []);

  return (
    <AlgorithmLayout
      config={kadaneConfig}
      engine={engine}
      inputControls={
        <InputControls
          type="sorting"
          arraySize={arraySize}
          onArraySizeChange={handleArraySizeChange}
          onRandomize={handleRandomize}
          currentArray={inputArray}
          onCustomArrayChange={handleCustomArrayChange}
        />
      }
      visualizer={
        engine.currentStep ? (
          <KadaneVisualizer state={engine.currentStep.state} />
        ) : null
      }
    />
  );
}

// ================================
// Majority Element 1 Page
// ================================

function MajorityElement1Page() {
  const [arraySize, setArraySize] = useState(8);
  const [inputArray, setInputArray] = useState<number[]>(() =>
    generateMajorityElement1Array(8)
  );

  const steps = useMemo(() => generateMajorityElement1Steps(inputArray), [inputArray]);
  const engine = usePlaybackEngine<MajorityElement1State>(steps);

  const handleRandomize = useCallback(() => {
    setInputArray(generateMajorityElement1Array(arraySize));
  }, [arraySize]);

  const handleArraySizeChange = useCallback((size: number) => {
    setArraySize(size);
    setInputArray(generateMajorityElement1Array(size));
  }, []);

  const handleCustomArrayChange = useCallback((arr: number[]) => {
    setArraySize(arr.length);
    setInputArray(arr);
  }, []);

  return (
    <AlgorithmLayout
      config={majorityElement1Config}
      engine={engine}
      inputControls={
        <InputControls
          type="sorting"
          arraySize={arraySize}
          onArraySizeChange={handleArraySizeChange}
          onRandomize={handleRandomize}
          currentArray={inputArray}
          onCustomArrayChange={handleCustomArrayChange}
        />
      }
      visualizer={
        engine.currentStep ? (
          <MajorityElementVisualizer state={engine.currentStep.state} variant="majority-1" />
        ) : null
      }
    />
  );
}

// ================================
// Majority Element 2 Page
// ================================

function MajorityElement2Page() {
  const [arraySize, setArraySize] = useState(9);
  const [inputArray, setInputArray] = useState<number[]>(() =>
    generateMajorityElement2Array(9)
  );

  const steps = useMemo(() => generateMajorityElement2Steps(inputArray), [inputArray]);
  const engine = usePlaybackEngine<MajorityElement2State>(steps);

  const handleRandomize = useCallback(() => {
    setInputArray(generateMajorityElement2Array(arraySize));
  }, [arraySize]);

  const handleArraySizeChange = useCallback((size: number) => {
    setArraySize(size);
    setInputArray(generateMajorityElement2Array(size));
  }, []);

  const handleCustomArrayChange = useCallback((arr: number[]) => {
    setArraySize(arr.length);
    setInputArray(arr);
  }, []);

  return (
    <AlgorithmLayout
      config={majorityElement2Config}
      engine={engine}
      inputControls={
        <InputControls
          type="sorting"
          arraySize={arraySize}
          onArraySizeChange={handleArraySizeChange}
          onRandomize={handleRandomize}
          currentArray={inputArray}
          onCustomArrayChange={handleCustomArrayChange}
        />
      }
      visualizer={
        engine.currentStep ? (
          <MajorityElementVisualizer state={engine.currentStep.state} variant="majority-2" />
        ) : null
      }
    />
  );
}

// ================================
// Tree Traversal Page
// ================================

interface TreeTraversalPageProps {
  config: AlgorithmConfig;
  generator: (nodes: TreeNode[], rootId: string | null) => VisualizationStep<TreeTraversalState>[];
}

function TreeTraversalPage({ config, generator }: TreeTraversalPageProps) {
  const [treeData, setTreeData] = useState(() => generateBinaryTree(3));

  const steps = useMemo(() => generator(treeData.nodes, treeData.rootId), [treeData, generator]);
  const engine = usePlaybackEngine<TreeTraversalState>(steps);

  const handleRandomize = useCallback(() => {
    setTreeData(generateBinaryTree(3));
  }, []);

  return (
    <AlgorithmLayout
      config={config}
      engine={engine}
      inputControls={
        <div className="flex items-center gap-2">
          <button
            onClick={handleRandomize}
            className="px-3 py-1.5 text-xs font-medium rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
          >
            Randomize Tree
          </button>
        </div>
      }
      visualizer={
        engine.currentStep ? (
          <TreeVisualizer state={engine.currentStep.state} />
        ) : null
      }
    />
  );
}

// ================================
// Graph Traversal Page
// ================================

interface GraphTraversalPageProps {
  config: AlgorithmConfig;
  generator: (nodes: GraphNode[], edges: GraphEdge[], startNodeId: string) => VisualizationStep<GraphTraversalState>[];
}

function GraphTraversalPage({ config, generator }: GraphTraversalPageProps) {
  const [graphData, setGraphData] = useState(() => generateRandomGraph());

  const steps = useMemo(() => generator(graphData.nodes, graphData.edges, graphData.startNodeId), [graphData, generator]);
  const engine = usePlaybackEngine<GraphTraversalState>(steps);

  const handleRandomize = useCallback(() => {
    setGraphData(generateRandomGraph());
  }, []);

  return (
    <AlgorithmLayout
      config={config}
      engine={engine}
      inputControls={
        <div className="flex items-center gap-2">
          <button
            onClick={handleRandomize}
            className="px-3 py-1.5 text-xs font-medium rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
          >
            Reset Graph
          </button>
        </div>
      }
      visualizer={
        engine.currentStep ? (
          <GraphVisualizer state={engine.currentStep.state} />
        ) : null
      }
    />
  );
}

// ================================
// Shared Algorithm Layout
// ================================

interface AlgorithmLayoutProps<T> {
  config: AlgorithmConfig;
  engine: PlaybackState<T> & PlaybackControlsType;
  inputControls: React.ReactNode;
  visualizer: React.ReactNode;
  activeVariantId?: string;
  onVariantChange?: (id: string) => void;
}

function AlgorithmLayout<T>({
  config,
  engine,
  inputControls,
  visualizer,
  activeVariantId,
  onVariantChange,
}: AlgorithmLayoutProps<T>) {
  const activeVariant = useMemo(() => {
    return config.variants?.find((v) => v.id === activeVariantId) || null;
  }, [config.variants, activeVariantId]);

  const displayConfig = useMemo(() => {
    if (!activeVariant) return config;
    return {
      ...config,
      ...activeVariant,
    };
  }, [config, activeVariant]);

  const DIFFICULTY_COLORS: Record<string, string> = {
    Easy: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    Medium: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    Hard: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  };

  // Push algorithm context for feedback system
  const { setAlgorithmInfo } = useFeedbackContext();

  useEffect(() => {
    setAlgorithmInfo(displayConfig.title, engine.currentStepIndex, engine.speed);
  }, [displayConfig.title, engine.currentStepIndex, engine.speed, setAlgorithmInfo]);

  const [showDesktopToast, setShowDesktopToast] = useState(() => {
    return typeof window !== "undefined" && window.innerWidth < 1024;
  });

  useEffect(() => {
    if (showDesktopToast) {
      const timer = setTimeout(() => setShowDesktopToast(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showDesktopToast]);

  return (
    <div className="flex flex-col min-h-full lg:h-screen lg:overflow-hidden relative">
      {/* Mobile Toast */}
      <AnimatePresence>
        {showDesktopToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            className="fixed bottom-6 left-1/2 z-50 flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-xl text-xs font-medium whitespace-nowrap"
          >
            <Info size={14} />
            For the best experience, use a Desktop!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.header
        className="shrink-0 pl-14 pr-4 lg:px-6 py-3 border-b border-border"
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
        <p className="text-sm text-muted-foreground max-w-4xl leading-relaxed">
          {config.description}
        </p>
      </motion.header>

      {/* Controls Bar */}
      <div className="shrink-0 px-4 lg:px-6 py-2.5 border-b border-border bg-card/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
          isDryRunMode={engine.isDryRunMode}
          onToggleDryRunMode={engine.toggleDryRunMode}
        />
        <Separator orientation="vertical" className="h-6 hidden lg:block" />
        <div className="w-full sm:w-auto">
          {inputControls}
        </div>
      </div>

      {/* Main content — Visualizer + Right Sidebar */}
      <div className="flex-1 flex flex-col lg:flex-row lg:overflow-hidden min-h-0">
        {/* Visualizer */}
        <motion.div
          className="min-h-[40vh] lg:min-h-0 flex-1 lg:flex-[3] lg:overflow-auto border-b lg:border-b-0 lg:border-r border-border"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {visualizer}
        </motion.div>

        {/* Right Sidebar (Code + Explanation) */}
        <div className="lg:flex-[2] lg:max-w-sm xl:max-w-md flex flex-col bg-card/30 lg:overflow-hidden">

          {/* Variant Switcher */}
          {config.variants && config.variants.length > 0 && activeVariantId && onVariantChange && (
            <div className="p-2 border-b border-border bg-card/50">
              <div className="flex bg-secondary/50 p-1 rounded-lg">
                {config.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => onVariantChange(v.id)}
                    className={`flex-1 text-xs font-semibold py-1.5 px-2 rounded-md transition-all duration-200 capitalize ${activeVariantId === v.id
                        ? "bg-background shadow-sm text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                      }`}
                  >
                    {v.id}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Pseudocode */}
          <motion.div
            className="flex-1 border-b lg:border-b-0 border-border min-h-[300px] lg:min-h-0 overflow-hidden flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {engine.currentStep && (
              <CodePanel
                config={displayConfig}
                activeLine={engine.currentStep.activeLine}
              />
            )}
          </motion.div>

          {/* Explanation Panel */}
          <motion.div
            className={`shrink-0 border-t border-border bg-card/50 transition-all duration-300 ${engine.isDryRunMode && engine.currentStep?.dryRunPrompt
                ? "lg:h-[350px]"
                : "lg:h-[180px]"
              }`}
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
                algorithmName={displayConfig.title}
                isDryRunMode={engine.isDryRunMode}
                dryRunPrompt={engine.currentStep.dryRunPrompt}
              />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
