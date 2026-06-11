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
// Bubble Sort Types
// ================================

export interface BubbleSortState {
  array: number[];
  comparingIndices: [number, number] | null;
  swappedIndices: [number, number] | null;
  sortedIndices: number[];
  currentI: number;
  currentJ: number;
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
