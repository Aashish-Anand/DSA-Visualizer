import { describe, expect, it } from "vitest";
import { generateHistogramSteps, experimentHeights, runHistogramExperiment } from "./generator";
import { histogramConfig } from "./config";

function bruteForce(heights: number[]) {
  let best = 0;
  for (let left = 0; left < heights.length; left++) {
    let min = Infinity;
    for (let right = left; right < heights.length; right++) {
      min = Math.min(min, heights[right]);
      best = Math.max(best, min * (right - left + 1));
    }
  }
  return best;
}

describe("Largest Rectangle in Histogram", () => {
  it("matches a brute-force oracle for every small profile, including zeros and plateaus", () => {
    for (let length = 0; length <= 5; length++) {
      for (let encoding = 0; encoding < 4 ** length; encoding++) {
        const heights = Array.from({ length }, (_, i) => Math.floor(encoding / 4 ** i) % 4);
        const final = generateHistogramSteps(heights).at(-1)!;
        expect(final.state.bestArea).toBe(bruteForce(heights));
        const best = final.state.best;
        if (best) {
          expect(best.area).toBe(best.height * best.width);
          expect(best.width).toBe(best.right - best.left + 1);
          expect(heights.slice(best.left, best.right + 1).every(h => h >= best.height)).toBe(true);
        }
      }
    }
  });
  it("handles classic, monotone, equal, zero, and single-bar inputs", () => {
    for (const [heights, answer] of [[ [2,1,5,6,2,3], 10 ], [[1,2,3,4,5],9], [[5,4,3,2,1],9], [[3,3,3],9], [[0,0],0], [[7],7]] as [number[], number][]) {
      expect(generateHistogramSteps(heights).at(-1)!.state.bestArea).toBe(answer);
    }
  });
  it("keeps snapshots and input isolated, with bounded work and valid code/quiz references", () => {
    const heights = [2,1,5,6,2,3];
    const steps = generateHistogramSteps(heights);
    expect(heights).toEqual([2,1,5,6,2,3]);
    expect(steps[0].state.stack).toEqual([]);
    for (const step of steps) {
      for (const language of [histogramConfig.pseudocode, histogramConfig.python!, histogramConfig.java!, histogramConfig.cpp!]) expect(step.activeLine).toBeLessThan(language.length);
      if (step.dryRunPrompt) expect(step.dryRunPrompt.correctOptionIndex).toBeLessThan(step.dryRunPrompt.options.length);
      const candidate = step.state.candidate;
      if (candidate) expect(candidate.width).toBe(step.state.currentIndex - (candidate.left - 1) - 1);
    }
    steps.at(-1)!.state.heights[0] = 99;
    expect(steps[0].state.heights[0]).toBe(2);
    const positive = generateHistogramSteps(experimentHeights(50)).at(-1)!;
    expect(positive.complexityMetrics).toEqual(runHistogramExperiment(50));
    expect(positive.complexityMetrics!.operations).toBe(100);
    expect(positive.complexityMetrics!.comparisons).toBeLessThanOrEqual(100);
    expect(positive.complexityMetrics!.computedStates).toBe(50);
  });
  it("rejects invalid heights", () => {
    for (const heights of [[-1], [1.5], [NaN], [Infinity], [1_000_001]]) expect(() => generateHistogramSteps(heights)).toThrow(RangeError);
  });
});
