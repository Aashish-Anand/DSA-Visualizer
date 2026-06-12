import { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { usePlaybackEngine } from "@/hooks/usePlaybackEngine";
import { PlaybackControls } from "@/components/Controls/PlaybackControls";
import { InputControls } from "@/components/Controls/InputControls";
import { PseudocodePanel } from "@/components/PseudocodePanel/PseudocodePanel";
import { ExplanationPanel } from "@/components/ExplanationPanel/ExplanationPanel";

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
import { TreeVisualizer } from "@/visualizers/TreeVisualizer/TreeVisualizer";

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
import { stockBuySellConfig } from "@/algorithms/StockBuySell/config";
import { generateStockBuySellSteps, generateStockArray } from "@/algorithms/StockBuySell/generator";
import { kadaneConfig } from "@/algorithms/Kadane/config";
import { generateKadaneSteps, generateKadaneArray } from "@/algorithms/Kadane/generator";
import { majorityElement1Config } from "@/algorithms/MajorityElement1/config";
import { generateMajorityElement1Steps, generateMajorityElement1Array } from "@/algorithms/MajorityElement1/generator";
import { majorityElement2Config } from "@/algorithms/MajorityElement2/config";
import { generateMajorityElement2Steps, generateMajorityElement2Array } from "@/algorithms/MajorityElement2/generator";

import { treePreorderConfig } from "@/algorithms/treePreorder/config";
import { generateTreePreorderSteps } from "@/algorithms/treePreorder/generator";
import { treeInorderConfig } from "@/algorithms/treeInorder/config";
import { generateTreeInorderSteps } from "@/algorithms/treeInorder/generator";
import { treePostorderConfig } from "@/algorithms/treePostorder/config";
import { generateTreePostorderSteps } from "@/algorithms/treePostorder/generator";
import { treeLevelorderConfig } from "@/algorithms/treeLevelorder/config";
import { generateTreeLevelorderSteps } from "@/algorithms/treeLevelorder/generator";
import { generateBinaryTree } from "@/algorithms/tree/utils";

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
  TreeNode,
  AlgorithmConfig,
  VisualizationStep
} from "@/types";

interface AlgorithmPageProps {
  algorithmId: string;
}

export function AlgorithmPage({ algorithmId }: AlgorithmPageProps) {
  switch (algorithmId) {
    // Sorting
    case "bubble-sort":
      return <BarSortPage config={bubbleSortConfig} generator={generateBubbleSortSteps} />;
    case "selection-sort":
      return <BarSortPage config={selectionSortConfig} generator={generateSelectionSortSteps} />;
    case "insertion-sort":
      return <BarSortPage config={insertionSortConfig} generator={generateInsertionSortSteps} />;
    case "quick-sort":
      return <BarSortPage config={quickSortConfig} generator={generateQuickSortSteps} />;
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
      
    // Trees
    case "tree-preorder":
      return <TreeTraversalPage config={treePreorderConfig} generator={generateTreePreorderSteps} />;
    case "tree-inorder":
      return <TreeTraversalPage config={treeInorderConfig} generator={generateTreeInorderSteps} />;
    case "tree-postorder":
      return <TreeTraversalPage config={treePostorderConfig} generator={generateTreePostorderSteps} />;
    case "tree-levelorder":
      return <TreeTraversalPage config={treeLevelorderConfig} generator={generateTreeLevelorderSteps} />;

    default:
      return <div className="p-8">Algorithm not found</div>;
  }
}

// ================================
// Generic Array Search Page (Linear, Binary)
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

  return (
    <AlgorithmLayout
      config={config}
      engine={engine}
      inputControls={
        <InputControls
          type="search"
          arraySize={arraySize}
          target={target}
          onArraySizeChange={handleArraySizeChange}
          onTargetChange={handleTargetChange}
          onRandomize={handleRandomize}
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

  return (
    <AlgorithmLayout
      config={config}
      engine={engine}
      inputControls={
        <InputControls
          type="search"
          arraySize={arraySize}
          target={target}
          onArraySizeChange={handleArraySizeChange}
          onTargetChange={handleTargetChange}
          onRandomize={handleRandomize}
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
// Generic Bar Sort Page (Bubble, Selection, Insertion, Quick)
// ================================

interface BarSortPageProps {
  config: AlgorithmConfig;
  generator: (arr: number[]) => VisualizationStep<SortingBarState>[];
}

function BarSortPage({ config, generator }: BarSortPageProps) {
  const [arraySize, setArraySize] = useState(8);
  const [inputArray, setInputArray] = useState<number[]>(() =>
    generateRandomArray(8)
  );

  const steps = useMemo(() => generator(inputArray), [inputArray, generator]);
  const engine = usePlaybackEngine<SortingBarState>(steps);

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
          type="sorting"
          arraySize={arraySize}
          onArraySizeChange={handleArraySizeChange}
          onRandomize={handleRandomize}
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
    generateRandomArray(8).map(x => x * Math.floor(Math.random() * 10)) // make numbers larger for better visualization
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
  const [arraySize, setArraySize] = useState(9); // Default size 9 ensures 3 occurrences is majority
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
// Shared Algorithm Layout
// ================================

interface AlgorithmLayoutProps {
  config: AlgorithmConfig;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  engine: ReturnType<typeof usePlaybackEngine<any>>; // Using any here because it's a generic wrapper and layout doesn't care about specific state.
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
        <p className="text-xs text-muted-foreground max-w-2xl leading-relaxed">
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
        />
        <Separator orientation="vertical" className="h-6 hidden lg:block" />
        <div className="w-full sm:w-auto">
          {inputControls}
        </div>
      </div>

      {/* Main content — Visualizer + Pseudocode */}
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

        {/* Pseudocode */}
        <motion.div
          className="lg:flex-[2] lg:max-w-sm xl:max-w-md lg:overflow-hidden border-b lg:border-b-0 border-border bg-card/30 min-h-[300px] lg:min-h-0"
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
        className="shrink-0 border-t border-border bg-card/50 lg:min-h-[100px] lg:max-h-[140px]"
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
