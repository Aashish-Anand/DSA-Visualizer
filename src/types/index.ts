// ================================
// Core Visualization Types
// ================================

// ================================
// Complexity Explorer Types
// ================================

export interface ComplexityMetrics {
  operations: number;
  comparisons: number;
  swaps?: number;
  reads?: number;
  writes?: number;
  hashmapLookups?: number;
  hashmapInserts?: number;
}

export interface ComplexityCaseSummary {
  best: string;
  average: string;
  worst: string;
}

export interface GrowthDataPoint {
  inputSize: number;
  operations: number;
}

export interface ComplexityExplorerConfig {
  /** Which metrics to display for this algorithm */
  trackedMetrics: (keyof ComplexityMetrics)[];
  /** Educational story paragraphs (the "why" explanation) */
  storyParagraphs: string[];
  /** Best/average/worst case breakdown */
  timeCases: ComplexityCaseSummary;
  spaceCases: ComplexityCaseSummary;
  /** ID for the custom visual explanation (e.g., "nested-loops", "hashmap-lookup") */
  visualExplanationId?: string;
  /** Input size range for the growth experiment */
  inputSizeRange: { min: number; max: number; default: number };
  /** Runs the algorithm at a given size and returns total metrics (no steps) */
  runExperiment: (inputSize: number) => ComplexityMetrics;
}

export interface DryRunPrompt {
  question: string;
  options: string[];
  correctOptionIndex: number;
}

/**
 * A single step in an algorithm visualization.
 * Generic over T to support any algorithm-specific state shape.
 */
export interface VisualizationStep<T = Record<string, unknown>> {
  /** The algorithm-specific state at this step */
  state: T;
  /** Index of the currently active pseudocode line (0-based). -1 for pre-steps or problem walkthroughs. */
  activeLine: number;
  /** Technical explanation of what's happening */
  explanation: string;
  /** Beginner-friendly explanation ("Explain Like I'm 12") */
  beginnerExplanation: string;
  /** Optional interactive prompt for Dry Run mode */
  dryRunPrompt?: DryRunPrompt;
  /** Phase of the step: either explaining the problem or executing the algorithm */
  phase?: "problem" | "algorithm";
  /** Running complexity metrics at this step (for Complexity Explorer) */
  complexityMetrics?: ComplexityMetrics;
}

// ================================
// Problem Statement Types
// ================================

export interface FrogJumpProblemState {
  heights: number[];
  frogPosition: number;
  jump1Target: number | null; // index the frog might jump to (1 step)
  jump2Target: number | null; // index the frog might jump to (2 steps)
  energyCost: number | null;
}

// ================================
// Shared Sorting Types
// ================================

export interface SortingBarState {
  array: number[];
  comparingIndices: [number, number] | null;
  swappedIndices: [number, number] | null;
  sortedIndices: number[];
  
  // Extended markers for other sorts
  highlightedIndex: number | null;
  highlightLabel: string | null;
  partitionRegion: [number, number] | null;
  pivotIndex: number | null;
  insertingFromIndex: number | null;
  sortedRegion: [number, number] | null;
  floatingBar?: { value: number; index: number } | null;
}

// ================================
// Merge Sort Types
// ================================

export interface MergeSortSubarray {
  startIndex: number;
  endIndex: number;
  values: number[];
  isSorted: boolean;
}

export interface MergeSortState {
  array: number[];
  subarrays: MergeSortSubarray[];
  activeSubarray: number | null;
  mergingIndices: number[];
  sortedIndices: number[];
  depth: number;
  phase: "splitting" | "merging" | "complete";
}

// ================================
// Radix Sort Types
// ================================

export interface RadixSortState {
  array: number[];
  currentDigit: number;
  buckets: number[][];
  highlightedIndex: number | null;
  highlightedDigit: number | null;
  phase: "distributing" | "collecting" | "complete";
  sortedIndices: number[];
  currentBucket: number | null;
}

// ================================
// Counting Sort Types
// ================================

export interface CountingSortState {
  inputArray: number[];
  countArray: number[];
  outputArray: (number | null)[];
  currentIndex: number | null;
  highlightedCountIndex: number | null;
  phase: "counting" | "accumulating" | "placing" | "complete";
  sortedIndices: number[];
  maxValue: number;
}

// ================================
// Array Search Types (Linear, Binary)
// ================================

export interface ArraySearchState {
  array: number[];
  target: number;
  currentIndex: number | null;
  lowIndex: number | null;
  highIndex: number | null;
  midIndex: number | null;
  foundIndex: number | null;
  status: "searching" | "found" | "not-found";
}

// ================================
// Linked List Types
// ================================

export interface LinkedListNode {
  id: string; // Unique ID for animations
  value: number;
  nextId: string | null;
}

export interface LinkedListState {
  nodes: LinkedListNode[];
  headId: string | null;
  currId: string | null;
  target: number;
  foundId: string | null;
  status: "searching" | "found" | "not-found";
}

// ================================
// Advanced Linked List Types
// ================================

export interface AdvancedLinkedListNode {
  id: string; // Unique ID for animations
  value: number;
  nextId: string | null;
  x: number;
  y: number;
}

export interface AdvancedLinkedListState {
  nodes: AdvancedLinkedListNode[];
  pointers: Record<string, string | null>;
  phase?: string;
  extraInfo?: string;
}

// ================================
// Two Sum Types
// ================================

export type TwoSumPhase =
  | "init"
  | "scanning"
  | "computing"
  | "checking"
  | "not-in-map"
  | "adding"
  | "found"
  | "complete";

export interface TwoSumState {
  array: number[];
  target: number;
  currentIndex: number;
  currentNumber: number;
  complement: number;
  hashMap: Map<number, number>;
  highlightedIndex: number | null;
  foundPair: [number, number] | null;
  phase: TwoSumPhase;
  checkedIndices: number[];
}

// ================================
// Two Pointers Types (3Sum, 4Sum)
// ================================

export type TwoPointersPhase =
  | "init"
  | "sorting"
  | "outer-loop"
  | "inner-loop"
  | "moving-left"
  | "moving-right"
  | "checking-sum"
  | "found"
  | "skipping-duplicates"
  | "complete";

export interface TwoPointersState {
  array: number[];
  target: number;
  pointers: {
    i: number | null;
    j: number | null; // used in 4sum
    left: number | null;
    right: number | null;
  };
  currentSum: number | null;
  foundSets: number[][]; // e.g., [[-1, 0, 1], [-2, 0, 1, 1]]
  phase: TwoPointersPhase;
}

// ================================
// Water Problems Types (Container, Trapping Rain)
// ================================

export type WaterPhase = 
  | "init" 
  | "scanning" 
  | "found-new-max" 
  | "moving-pointer" 
  | "calculating-water" 
  | "complete";

export interface WaterState {
  type: "container" | "trapping";
  heights: number[];
  left: number | null;
  right: number | null;
  
  // Container With Most Water specific
  currentArea: number | null;
  maxArea: number;
  bestLeft: number | null;
  bestRight: number | null;
  
  // Trapping Rain Water specific
  leftMax: number;
  rightMax: number;
  waterLevels: number[]; // Amount of water trapped at each index
  totalWater: number;
  
  phase: WaterPhase;
}

// ================================
// Stock Buy and Sell Types
// ================================

export type StockBuySellPhase =
  | "init"
  | "scanning"
  | "found-new-min"
  | "found-new-max-profit"
  | "complete";

export interface StockBuySellState {
  prices: number[];
  currentIndex: number | null;
  minPriceIndex: number | null;
  buyIndex: number | null; // The index of the buy day that yields max profit
  sellIndex: number | null; // The index of the sell day that yields max profit
  maxProfit: number;
  currentProfit: number | null;
  phase: StockBuySellPhase;
}

// ================================
// Kadane's Algorithm Types
// ================================

export type KadanePhase =
  | "init"
  | "adding"
  | "resetting-sum"
  | "new-max-found"
  | "complete";

export interface KadaneState {
  array: number[];
  currentIndex: number | null;
  currentSum: number;
  maxSum: number;
  currentStartIndex: number;
  maxStartIndex: number | null;
  maxEndIndex: number | null;
  phase: KadanePhase;
}

// ================================
// Majority Element Types
// ================================

export interface MajorityElement1State {
  array: number[];
  currentIndex: number | null;
  candidate: number | null;
  count: number;
  phase: "init" | "new-candidate" | "increment" | "decrement" | "complete";
}

export interface MajorityElement2State {
  array: number[];
  currentIndex: number | null;
  candidate1: number | null;
  count1: number;
  candidate2: number | null;
  count2: number;
  phase: "init" | "vote-cand1" | "vote-cand2" | "decrement-both" | "new-cand1" | "new-cand2" | "verify" | "complete";
}

// ================================
// Dynamic Programming Types
// ================================

export interface DP1DState {
  dpArray: (number | null)[];
  inputArray?: number[]; // Used for problems like Frog Jump with costs
  currentIndex: number | null;
  dependencies: number[]; // Indices that the current state depends on
  phase: "init" | "calculating" | "complete";
  result: number | null;
}

// ================================
// Recursion Tree Types (For DP)
// ================================

export interface RecursionNode {
  id: string;      // Unique identifier (e.g., "node-1")
  label: string;   // The function signature (e.g., "f(3)")
  value?: number;  // The computed result (populated when the function returns)
  x: number;       // Layout coordinate
  y: number;       // Layout coordinate
}

export interface RecursionEdge {
  source: string;
  target: string;
}

export interface RecursionTreeState {
  nodes: RecursionNode[];         // All nodes discovered so far
  edges: RecursionEdge[];         // Edges between callers and callees
  currentNodeId: string | null;   // The node currently executing
  computedNodeIds: string[];      // Nodes that have finished computing
  memoizedNodeIds: string[];      // Nodes that hit the cache (for Memoization variant)
  callStackIds: string[];         // Bottom-to-top representation of the call stack
  memoArray: (number | null)[];   // Array representing the memoization cache
}

// ================================
// Tree Types
// ================================

export interface TreeNode {
  id: string;
  value: number;
  left: string | null;
  right: string | null;
  x: number;
  y: number;
}

export interface TreeTraversalState {
  nodes: TreeNode[]; // The list of all nodes in the tree
  rootId: string | null;
  currentNodeId: string | null;
  visitedNodeIds: string[];
  queueIds?: string[]; // Used for level-order traversal
  callStackIds?: string[]; // Used to visualize recursion stack
  phase: "init" | "traversing" | "complete";
}

// ================================
// Graph Types
// ================================

export interface GraphNode {
  id: string;
  value: number;
  x: number;
  y: number;
  neighbors: string[]; // List of connected node IDs
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
}

export interface GraphTraversalState {
  nodes: GraphNode[];
  edges: GraphEdge[];
  startNodeId: string;
  currentNodeId: string | null;
  visitedNodeIds: string[];
  queueIds?: string[]; // Used for BFS
  callStackIds?: string[]; // Used for DFS
  phase: "init" | "traversing" | "complete";
}

// ================================
// Problem Context Types
// ================================

export interface ProblemExample {
  input: string;
  output: string;
  explanation: string;
}

export interface ProblemApproach {
  name: string;
  complexity: string;
  spaceComplexity?: string;
  description: string;
  isOptimal: boolean;
}

export interface ProblemContext {
  /** The formal problem statement */
  statement: string;
  /** Optional reference image URL to illustrate the problem statement */
  referenceImage?: string;
  /** Input/Output examples with explanations */
  examples: ProblemExample[];
  /** A prompt to help users think through the problem intuitively */
  intuitionPrompt: string;
  /** Different approaches from brute-force to optimal */
  approaches: ProblemApproach[];
  /** Real-world applications of this algorithm */
  realWorldApplications: string[];
  /** DSA patterns this problem belongs to (e.g., "Hash Map", "Two Pointers") */
  patterns: string[];
  /** Related algorithm IDs on the platform */
  relatedProblems?: string[];
}

// ================================
// Algorithm Config Types
// ================================


export interface AlgorithmVariant {
  id: string;
  title: string;
  description: string;
  pseudocode: PseudocodeLine[];
  python?: PseudocodeLine[];
  java?: PseudocodeLine[];
  cpp?: PseudocodeLine[];
}

export interface AlgorithmConfig {
  id: string;
  title: string;
  category: string;
  categoryIcon: string;
  description: string;
  pseudocode: PseudocodeLine[];
  python?: PseudocodeLine[];
  java?: PseudocodeLine[];
  cpp?: PseudocodeLine[];
  difficulty: "Easy" | "Medium" | "Hard";
  variants?: AlgorithmVariant[];
  /** Configuration for the Complexity Explorer feature */
  complexityExplorer?: ComplexityExplorerConfig;
  /** Problem context for the "Understand First" panel */
  problemContext?: ProblemContext;
}

export interface PseudocodeLine {
  code: string;
  indent: number;
}

// ================================
// Algorithm Registry Types
// ================================

export interface AlgorithmEntry {
  config: AlgorithmConfig;
  component: React.ComponentType;
}

// ================================
// Playback Engine Types
// ================================

export type PlaybackSpeed = 0.5 | 1 | 2 | 4;

export interface PlaybackState<T> {
  currentStepIndex: number;
  isPlaying: boolean;
  speed: PlaybackSpeed;
  currentStep: VisualizationStep<T> | null;
  totalSteps: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  progress: number;
  isDryRunMode: boolean;
}

export interface PlaybackControls {
  play: () => void;
  pause: () => void;
  next: () => void;
  previous: () => void;
  reset: () => void;
  setSpeed: (speed: PlaybackSpeed) => void;
  goToStep: (index: number) => void;
  toggleDryRunMode: () => void;
}
