import { HistogramPage } from "./HistogramPage";
import { ProblemSimulation } from "@/components/Lesson/ProblemSimulation";
import { AlgorithmLayout } from "@/components/Lesson/AlgorithmLayout";
import { ClimbingStairsPage, FrogJumpPage } from "@/pages/DPLessonPages";
import { useState, useMemo, useCallback } from "react";
import { Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePlaybackEngine } from "@/hooks/usePlaybackEngine";
import { InputControls } from "@/components/Controls/InputControls";

// Visualizers
import { SortingBarVisualizer } from "@/visualizers/SortingBarVisualizer/SortingBarVisualizer";
import { MergeSortVisualizer } from "@/visualizers/MergeSortVisualizer/MergeSortVisualizer";
import { RadixSortVisualizer } from "@/visualizers/RadixSortVisualizer/RadixSortVisualizer";
import { CountingSortVisualizer } from "@/visualizers/CountingSortVisualizer/CountingSortVisualizer";
import { ArraySearchVisualizer } from "@/visualizers/ArraySearchVisualizer/ArraySearchVisualizer";
import { LinkedListVisualizer } from "@/visualizers/LinkedListVisualizer/LinkedListVisualizer";
import { AdvancedLinkedListVisualizer } from "@/visualizers/AdvancedLinkedListVisualizer/AdvancedLinkedListVisualizer";
import { TwoSumVisualizer } from "@/visualizers/TwoSumVisualizer/TwoSumVisualizer";
import { StockBuySellVisualizer } from "@/visualizers/StockBuySellVisualizer/StockBuySellVisualizer";
import { KadaneVisualizer } from "@/visualizers/KadaneVisualizer/KadaneVisualizer";
import { MajorityElementVisualizer } from "@/visualizers/MajorityElementVisualizer/MajorityElementVisualizer";
import { TreeVisualizer } from "@/visualizers/TreeVisualizer/TreeVisualizer";
import { GraphVisualizer } from "@/visualizers/GraphVisualizer/GraphVisualizer";
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

import { reverseLinkedListConfig } from "@/algorithms/reverseLinkedList/config";
import { generateReverseLinkedListSteps, generateRandomLinkedListInput } from "@/algorithms/reverseLinkedList/generator";

import { middleOfLinkedListConfig } from "@/algorithms/middleOfLinkedList/config";
import { generateMiddleOfLinkedListSteps } from "@/algorithms/middleOfLinkedList/generator";

import { mergeTwoSortedListsConfig } from "@/algorithms/mergeTwoSortedLists/config";
import { generateMergeTwoSortedListsSteps, generateRandomMergeListsInput } from "@/algorithms/mergeTwoSortedLists/generator";

import { addTwoNumbersConfig } from "@/algorithms/addTwoNumbers/config";
import { generateAddTwoNumbersSteps, generateRandomAddTwoNumbersInput } from "@/algorithms/addTwoNumbers/generator";

import { deleteNodeLinkedListConfig } from "@/algorithms/deleteNodeLinkedList/config";
import { generateDeleteNodeLinkedListSteps, generateRandomDeleteNodeInput } from "@/algorithms/deleteNodeLinkedList/generator";

import { twoSumConfig } from "@/algorithms/twoSum/config";
import { generateTwoSumSteps, generateRandomTwoSumInput } from "@/algorithms/twoSum/generator";



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
  AdvancedLinkedListState,
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
} from "@/types";

interface AlgorithmPageProps {
  algorithmId: string;
}

export function AlgorithmPage({ algorithmId }: AlgorithmPageProps) {
  switch (algorithmId) {
    case "largest-rectangle-histogram":
      return <HistogramPage />;
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
    case "reverse-linked-list":
      return <AdvancedLinkedListPage config={reverseLinkedListConfig} generator={generateReverseLinkedListSteps} type="standard" />;
    case "middle-of-linked-list":
      return <AdvancedLinkedListPage config={middleOfLinkedListConfig} generator={generateMiddleOfLinkedListSteps} type="standard" />;
    case "merge-two-sorted-lists":
      return <AdvancedLinkedListPage config={mergeTwoSortedListsConfig} generator={generateMergeTwoSortedListsSteps} type="two-lists" />;
    case "add-two-numbers":
      return <AdvancedLinkedListPage config={addTwoNumbersConfig} generator={generateAddTwoNumbersSteps} type="two-lists" />;
    case "delete-node-linked-list":
      return <AdvancedLinkedListPage config={deleteNodeLinkedListConfig} generator={generateDeleteNodeLinkedListSteps} type="delete" />;

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
      hasDryRunPrompts={steps.some(step => !!step.dryRunPrompt)}
      currentArray={input.nums}
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
      hasDryRunPrompts={steps.some(step => !!step.dryRunPrompt)}
      currentArray={inputArray}
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

  return (
    <AlgorithmLayout
      hasDryRunPrompts={steps.some(step => !!step.dryRunPrompt)}
      currentArray={inputArray}
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
      hasDryRunPrompts={steps.some(step => !!step.dryRunPrompt)}
      currentArray={inputArray}
      currentTarget={target}
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
      hasDryRunPrompts={steps.some(step => !!step.dryRunPrompt)}
      currentArray={inputArray}
      currentTarget={target}
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
      hasDryRunPrompts={steps.some(step => !!step.dryRunPrompt)}
      currentArray={inputArray}
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
      hasDryRunPrompts={steps.some(step => !!step.dryRunPrompt)}
      currentArray={inputArray}
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
      hasDryRunPrompts={steps.some(step => !!step.dryRunPrompt)}
      currentArray={inputArray}
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
        <AlgorithmLayout
          currentArray={input.nums}
          currentTarget={input.target}
          hasDryRunPrompts={steps.some(step => !!step.dryRunPrompt)}
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
  );
}

// ================================
// DP: Climbing Stairs
// ================================

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

  const config = stockBuySellConfig;


  return (
    <AlgorithmLayout
      hasDryRunPrompts={steps.some(step => !!step.dryRunPrompt)}
      currentArray={inputArray}
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

  const config = kadaneConfig;


  return (
    <AlgorithmLayout
      hasDryRunPrompts={steps.some(step => !!step.dryRunPrompt)}
      currentArray={inputArray}
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
  const [arraySize, setArraySize] = useState(7);
  const [inputArray, setInputArray] = useState<number[]>(() =>
    [2, 2, 1, 1, 1, 2, 2]
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
      hasDryRunPrompts={steps.some(step => !!step.dryRunPrompt)}
      currentArray={inputArray}
      config={majorityElement1Config}
      simulation={<ProblemSimulation kind="majority"/>}
      engine={engine}
      onExampleSelect={(index) => handleCustomArrayChange(index === 0 ? [3, 2, 3] : [2, 2, 1, 1, 1, 2, 2])}
      inputControls={
        <InputControls
          type="sorting"
          minSize={1}
          maxSize={20}
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

  const config = majorityElement2Config;


  return (
    <AlgorithmLayout
      hasDryRunPrompts={steps.some(step => !!step.dryRunPrompt)}
      currentArray={inputArray}
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

  const controls = (
    <div className="flex items-center gap-2">
      <button
        onClick={handleRandomize}
        className="px-3 py-1.5 text-xs font-medium rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
      >
        Randomize Tree
      </button>
    </div>
  );


  return (
    <AlgorithmLayout
      hasDryRunPrompts={steps.some(step => !!step.dryRunPrompt)}
      currentArray={treeData.nodes.map(n => n.value as number)}
      config={config}
      engine={engine}
      inputControls={controls}
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

  const controls = (
    <div className="flex items-center gap-2">
      <button
        onClick={handleRandomize}
        className="px-3 py-1.5 text-xs font-medium rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
      >
        Reset Graph
      </button>
    </div>
  );


  return (
    <AlgorithmLayout
      hasDryRunPrompts={steps.some(step => !!step.dryRunPrompt)}
      currentArray={graphData.nodes.map(n => n.value)}
      config={config}
      engine={engine}
      inputControls={controls}
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

// --------------------------------------------------------
// ADVANCED LINKED LIST VISUALIZATION (Multiple rows, explicit x, y)
// --------------------------------------------------------
interface AdvancedLinkedListPageProps {
  config: AlgorithmConfig;
  generator: (...args: never[]) => Generator<VisualizationStep<AdvancedLinkedListState>>;
  type: "standard" | "two-lists" | "delete";
}

function AdvancedLinkedListPage({ config, generator, type }: AdvancedLinkedListPageProps) {
  const [array1, setArray1] = useState<number[]>([1, 2, 3, 4, 5]);
  const [array2, setArray2] = useState<number[]>([1, 3, 5]);
  const [target, setTarget] = useState<number>(2);

  const steps = useMemo(() => {
    if (type === "two-lists") {
      return Array.from(generator(array1 as never, array2 as never));
    } else if (type === "delete") {
      return Array.from(generator(array1 as never, target as never));
    } else {
      return Array.from(generator(array1 as never));
    }
  }, [array1, array2, target, type, generator]);

  const engine = usePlaybackEngine<AdvancedLinkedListState>(steps);

  const handleRandomize = () => {
    if (config.id === "merge-two-sorted-lists") {
      const { arr1, arr2 } = generateRandomMergeListsInput(8);
      setArray1(arr1);
      setArray2(arr2);
    } else if (config.id === "add-two-numbers") {
      const { arr1, arr2 } = generateRandomAddTwoNumbersInput(8);
      setArray1(arr1);
      setArray2(arr2);
    } else if (type === "delete") {
      const { array, k } = generateRandomDeleteNodeInput(6);
      setArray1(array);
      setTarget(k);
    } else {
      setArray1(generateRandomLinkedListInput(6));
    }
    engine.reset();
  };

  const controls = (
    <div className="flex gap-2 items-center">
      <Button variant="outline" size="sm" onClick={handleRandomize} className="h-8 text-xs gap-1.5">
        <Shuffle size={13} />
        Randomize Arrays
      </Button>
    </div>
  );


  return (
    <AlgorithmLayout
      hasDryRunPrompts={steps.some(step => !!step.dryRunPrompt)}
      currentArray={array1}
      config={config}
      engine={engine}
      inputControls={controls}
      visualizer={
        <div className="w-full h-full p-4 flex items-center justify-center">
          {engine.currentStep?.state && (
            <AdvancedLinkedListVisualizer state={engine.currentStep.state} />
          )}
        </div>
      }
    />
  );
}
