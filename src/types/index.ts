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
