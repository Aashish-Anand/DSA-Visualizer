import { describe, expect, it } from "vitest";
import { resolveAlgorithmConfig } from "./resolveAlgorithmConfig";
import { frogJumpConfig } from "@/algorithms/frogJump/config";
import { climbingStairsConfig } from "@/algorithms/climbingStairs/config";

describe("selected approach context", () => {
  it("does not present tabulation translations for Frog Jump recursion or memoization", () => {
    for (const variant of ["recursive", "memoized"]) {
      const resolved = resolveAlgorithmConfig(frogJumpConfig, variant);
      expect(resolved.python).toBeUndefined();
      expect(resolved.java).toBeUndefined();
      expect(resolved.pseudocode[0].code).toContain("index");
      expect(resolved.id).toBe("frog-jump");
    }
    expect(resolveAlgorithmConfig(frogJumpConfig, "iterative").python?.[0].code).toBe("def frogJump(heights):");
  });
  it("reports selected implementation complexity and safe recursive experiment limits", () => {
    for (const config of [frogJumpConfig, climbingStairsConfig]) {
      const recursive = resolveAlgorithmConfig(config, "recursive").complexityExplorer!;
      const memo = resolveAlgorithmConfig(config, "memoized").complexityExplorer!;
      const table = resolveAlgorithmConfig(config, "iterative").complexityExplorer!;
      expect(recursive.timeCases.worst).toBe("O(2ⁿ)");
      expect(recursive.inputSizeRange.max).toBeLessThanOrEqual(12);
      expect(memo.timeCases.worst).toBe("O(n)");
      expect(table.spaceCases.best).toBe("O(n)");
      expect(recursive.runExperiment(10).operations).toBeGreaterThan(memo.runExperiment(10).operations);
    }
  });
});
