import { describe, expect, it } from "vitest";
import { runDPCallExperiment } from "./dpExperiments";
import { generateClimbingStairsRecursiveSteps, generateClimbingStairsMemoizedSteps, generateClimbingStairsSteps } from "./climbingStairs/generator";
import { generateFrogJumpRecursiveSteps, generateFrogJumpMemoizedSteps, generateFrogJumpSteps } from "./frogJump/generator";
import { frogJumpConfig } from "./frogJump/config";

describe("DP lesson accuracy", () => {
  it("agrees on the answer across all three approaches", () => {
    const heights = [30, 10, 60, 10, 60, 50];
    expect(generateClimbingStairsSteps(5).at(-1)?.state.result).toBe(8);
    for (const generate of [generateClimbingStairsRecursiveSteps, generateClimbingStairsMemoizedSteps]) expect(generate(5).at(-1)?.state.nodes[0].value).toBe(8);
    expect(generateFrogJumpSteps(heights).at(-1)?.state.result).toBe(40);
    for (const generate of [generateFrogJumpRecursiveSteps, generateFrogJumpMemoizedSteps]) expect(generate(heights).at(-1)?.state.nodes[0].value).toBe(40);
    expect(frogJumpConfig.problemContext?.examples[1].explanation).toContain("0 -> 2 (30) -> 4 (0) -> 5 (10)");
  });
  it("matches experiment operation counts to actual playback instrumentation", () => {
    for (const size of [2, 5, 8]) for (const memoized of [false, true]) {
      const stairs = (memoized ? generateClimbingStairsMemoizedSteps : generateClimbingStairsRecursiveSteps)(size);
      const frog = (memoized ? generateFrogJumpMemoizedSteps : generateFrogJumpRecursiveSteps)(Array.from({length:size},(_,i)=>i*10));
      expect(stairs.at(-1)?.complexityMetrics).toEqual(runDPCallExperiment(size, memoized, "stairs"));
      expect(frog.at(-1)?.complexityMetrics).toEqual(runDPCallExperiment(size, memoized, "frog"));
    }
  });
  it("keeps call stacks free of duplicate frames and snapshots independent", () => {
    for (const generate of [generateClimbingStairsRecursiveSteps, generateClimbingStairsMemoizedSteps]) {
      const steps = generate(5);
      for (const step of steps) expect(new Set(step.state.callStackIds).size).toBe(step.state.callStackIds.length);
      expect(steps.at(-1)?.state.callStackIds).toEqual([]);
      expect(steps[0].state.nodes).toHaveLength(1);
      expect(steps[0].state.computedNodeIds).toEqual([]);
    }
  });
});
