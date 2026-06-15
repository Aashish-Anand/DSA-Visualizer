// ================================
// Core Visualization Types
// ================================

/**
 * A single step in an algorithm visualization.
 * Generic over T to support any algorithm-specific state shape.
 */
export interface VisualizationStep<T = Record<string, unknown>> {
  /** The algorithm-specific state at this step */
  state: T;
  /** Index of the currently active pseudocode line (0-based) */
  activeLine: number;
  /** Technical explanation of what's happening */
  explanation: string;
  /** Beginner-friendly explanation ("Explain Like I'm 12") */
  beginnerExplanation: string;
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
// Algorithm Config Types
// ================================

export interface AlgorithmConfig {
  id: string;
  title: string;
  category: string;
  categoryIcon: string;
  description: string;
  pseudocode: PseudocodeLine[];
  difficulty: "Easy" | "Medium" | "Hard";
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
}

export interface PlaybackControls {
  play: () => void;
  pause: () => void;
  next: () => void;
  previous: () => void;
  reset: () => void;
  setSpeed: (speed: PlaybackSpeed) => void;
  goToStep: (index: number) => void;
}
