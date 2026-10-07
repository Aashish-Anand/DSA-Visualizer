import type { ComplexityMetrics, VisualizationStep } from "@/types";

export interface HistogramRectangle { left: number; right: number; height: number; width: number; area: number }
export interface HistogramState {
  heights: number[];
  stack: number[];
  currentIndex: number;
  poppedIndex: number | null;
  candidate: HistogramRectangle | null;
  best: HistogramRectangle | null;
  bestArea: number;
  complete: boolean;
}

type Emit = (line: number, explanation: string, beginner: string, prompt?: VisualizationStep<HistogramState>["dryRunPrompt"]) => void;

// Both playback and experiments execute this core; experiments skip snapshot allocation.
function solve(heights: number[], record?: (state: HistogramState, metrics: ComplexityMetrics, emit: Parameters<Emit>) => void) {
  if (heights.some(h => !Number.isSafeInteger(h) || h < 0 || h > 1_000_000)) throw new RangeError("Heights must be whole numbers from 0 to 1,000,000.");
  const state: HistogramState = { heights, stack: [], currentIndex: -1, poppedIndex: null, candidate: null, best: null, bestArea: 0, complete: false };
  const metrics: ComplexityMetrics = { operations: 0, comparisons: 0, computedStates: 0 };
  const emit: Emit = (...args) => record?.(state, metrics, args);
  emit(1, "Initialize an empty index stack and a maximum area of 0.", "Every bar has width 1. We will keep bars whose right boundary is still unknown.");
  for (let i = 0; i <= heights.length; i++) {
    state.currentIndex = i; state.poppedIndex = null; state.candidate = null;
    const current = i === heights.length ? 0 : heights[i];
    emit(3, i === heights.length ? "Use a virtual height-0 bar to flush remaining positive bars." : `Scan bar ${i}, height ${current}.`, "A shorter bar ends the possible rectangle for any taller bars waiting on the stack.");
    while (state.stack.length) {
      metrics.comparisons++;
      const top = state.stack[state.stack.length - 1];
      const mustPop = heights[top] > current;
      emit(4, `Compare stack-top height ${heights[top]} with current height ${current}.`, mustPop ? "The waiting bar cannot extend through this shorter bar. Its rectangle is ready to measure." : "This bar can keep waiting. Equal heights are allowed on the stack.", mustPop ? { question: "Why calculate the taller bar's rectangle now?", options: ["The shorter bar fixes its right boundary", "The taller bar's height changes", "All earlier bars have width zero"], correctOptionIndex: 0 } : undefined);
      if (!mustPop) break;
      const popped = state.stack.pop()!;
      state.poppedIndex = popped; state.candidate = null; metrics.operations++;
      emit(5, `Pop index ${popped} (height ${heights[popped]}).`, "Removing this index reveals the boundary on its left.");
      const left = state.stack.length ? state.stack[state.stack.length - 1] : -1;
      const width = i - left - 1;
      state.candidate = { left: left + 1, right: i - 1, height: heights[popped], width, area: heights[popped] * width };
      metrics.computedStates!++;
      emit(8, `Width = ${i} − (${left}) − 1 = ${width}; area = ${heights[popped]} × ${width} = ${state.candidate.area}.`, `The rectangle spans bars ${left + 1} through ${i - 1}. The current bar is excluded.`, { question: `Candidate area is ${state.candidate.area}; best so far is ${state.bestArea}. What should happen next?`, options: ["Replace best with this area", "Keep the existing best", "Reset best to zero"], correctOptionIndex: state.candidate.area > state.bestArea ? 0 : 1 });
      if (state.candidate.area > state.bestArea) { state.bestArea = state.candidate.area; state.best = { ...state.candidate }; }
      emit(9, `Maximum area so far: ${state.bestArea}.`, "Keep the biggest rectangle seen so far; a smaller candidate does not replace it.");
    }
    if (i < heights.length) {
      state.stack.push(i); metrics.operations++;
      emit(10, `Push index ${i}. Stack heights are nondecreasing.`, "This bar waits until a shorter bar tells us how far it can extend to the right.");
    }
  }
  state.complete = true; state.poppedIndex = null; state.candidate = null;
  emit(11, `Largest rectangle area: ${state.bestArea}.`, state.best ? `The winning rectangle has height ${state.best.height} and width ${state.best.width}. Each index was pushed once and popped at most once.` : "All heights are zero (or the input is empty), so no positive-area rectangle exists.");
  return metrics;
}

export function generateHistogramSteps(heights: number[]): VisualizationStep<HistogramState>[] {
  const steps: VisualizationStep<HistogramState>[] = [];
  solve([...heights], (state, metrics, [activeLine, explanation, beginnerExplanation, dryRunPrompt]) => {
    steps.push({ state: { ...state, heights: [...state.heights], stack: [...state.stack], candidate: state.candidate && { ...state.candidate }, best: state.best && { ...state.best } }, complexityMetrics: { ...metrics }, activeLine, explanation, beginnerExplanation, dryRunPrompt });
  });
  return steps;
}

export function experimentHeights(size: number) { return Array.from({ length: size }, (_, i) => 1 + ((i * 37 + 11) % 100)); }
export function runHistogramExperiment(size: number): ComplexityMetrics { return solve(experimentHeights(size)); }
