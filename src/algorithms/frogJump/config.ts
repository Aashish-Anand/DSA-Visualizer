import type { AlgorithmConfig } from "@/types";
import { runFrogJumpExperiment } from "./generator";

export const frogJumpConfig: AlgorithmConfig = {
  id: "frog-jump",
  title: "Frog Jump",
  category: "Dynamic Programming",
  categoryIcon: "layers",
  description:
    "A frog is crossing a river. The river is divided into some number of units, and at each unit, there may or may not exist a stone. The frog can jump on a stone, but it must not jump into the water. Given an array of heights, the frog can jump 1 or 2 steps. The energy required to jump is abs(heights[i] - heights[j]). Find the minimum energy required to reach the last stone.",
  difficulty: "Easy",
  pseudocode: [
    { code: "function frogJump(heights):", indent: 0 },
    { code: "n = length(heights)", indent: 1 },
    { code: "dp = array of size n", indent: 1 },
    { code: "dp[0] = 0", indent: 1 },
    { code: "dp[1] = abs(heights[1] - heights[0])", indent: 1 },
    { code: "for i from 2 to n-1:", indent: 1 },
    { code: "jump1 = dp[i-1] + abs(heights[i] - heights[i-1])", indent: 2 },
    { code: "jump2 = dp[i-2] + abs(heights[i] - heights[i-2])", indent: 2 },
    { code: "dp[i] = min(jump1, jump2)", indent: 2 },
    { code: "return dp[n-1]", indent: 1 },
  ],
  python: [
    { code: "def frogJump(heights):", indent: 0 },
    { code: "n = len(heights)", indent: 1 },
    { code: "dp = [0] * n", indent: 1 },
    { code: "dp[0] = 0", indent: 1 },
    { code: "dp[1] = abs(heights[1] - heights[0])", indent: 1 },
    { code: "for i in range(2, n):", indent: 1 },
    { code: "jump1 = dp[i-1] + abs(heights[i] - heights[i-1])", indent: 2 },
    { code: "jump2 = dp[i-2] + abs(heights[i] - heights[i-2])", indent: 2 },
    { code: "dp[i] = min(jump1, jump2)", indent: 2 },
    { code: "return dp[-1]", indent: 1 },
  ],
  java: [
    { code: "public int frogJump(int[] heights) {", indent: 0 },
    { code: "int n = heights.length;", indent: 1 },
    { code: "int[] dp = new int[n];", indent: 1 },
    { code: "dp[0] = 0;", indent: 1 },
    { code: "dp[1] = Math.abs(heights[1] - heights[0]);", indent: 1 },
    { code: "for (int i = 2; i < n; i++) {", indent: 1 },
    { code: "int jump1 = dp[i-1] + Math.abs(heights[i] - heights[i-1]);", indent: 2 },
    { code: "int jump2 = dp[i-2] + Math.abs(heights[i] - heights[i-2]);", indent: 2 },
    { code: "dp[i] = Math.min(jump1, jump2);", indent: 2 },
    { code: "return dp[n-1];", indent: 1 },
  ],
  variants: [
    {
      id: "recursive",
      title: "1. Recursive (O(2^N) Time)",
      description: "A top-down recursive approach. We explore every possible jump path, leading to exponential time complexity.",
      pseudocode: [
        { code: "function frogJump(index, heights):", indent: 0 },
        { code: "if index == 0: return 0", indent: 1 },
        { code: "jump1 = frogJump(index-1) + abs(heights[index] - heights[index-1])", indent: 1 },
        { code: "if index > 1:", indent: 1 },
        { code: "jump2 = frogJump(index-2) + abs(heights[index] - heights[index-2])", indent: 2 },
        { code: "return min(jump1, jump2)", indent: 2 },
        { code: "return jump1", indent: 1 }
      ],
    },
    {
      id: "memoized",
      title: "2. Memoized (Top-Down DP)",
      description: "We optimize the recursion by storing previously computed results in a cache, bringing time complexity down to O(N).",
      pseudocode: [
        { code: "function frogJump(index, heights, memo):", indent: 0 },
        { code: "if index == 0: return 0", indent: 1 },
        { code: "if memo[index] != null: return memo[index]", indent: 1 },
        { code: "jump1 = frogJump(index-1) + abs(heights[index] - heights[index-1])", indent: 1 },
        { code: "if index > 1:", indent: 1 },
        { code: "jump2 = frogJump(index-2) + abs(heights[index] - heights[index-2])", indent: 2 },
        { code: "memo[index] = min(jump1, jump2)", indent: 2 },
        { code: "return memo[index]", indent: 2 },
        { code: "memo[index] = jump1", indent: 1 },
        { code: "return memo[index]", indent: 1 }
      ]
    },
    {
      id: "iterative",
      title: "3. Iterative (Bottom-Up DP)",
      description: "We build the solution from the base case up, completely avoiding the overhead of recursion.",
      pseudocode: [
        { code: "function frogJump(heights):", indent: 0 },
        { code: "n = length(heights)", indent: 1 },
        { code: "dp = array of size n", indent: 1 },
        { code: "dp[0] = 0", indent: 1 },
        { code: "dp[1] = abs(heights[1] - heights[0])", indent: 1 },
        { code: "for i from 2 to n-1:", indent: 1 },
        { code: "jump1 = dp[i-1] + abs(heights[i] - heights[i-1])", indent: 2 },
        { code: "jump2 = dp[i-2] + abs(heights[i] - heights[i-2])", indent: 2 },
        { code: "dp[i] = min(jump1, jump2)", indent: 2 },
        { code: "return dp[n-1]", indent: 1 },
      ]
    }
  ],
  complexityExplorer: {
    trackedMetrics: ["comparisons", "operations"],
    storyParagraphs: [
      "The iterative dynamic programming approach for Frog Jump builds the solution from the ground up.",
      "By maintaining an array of minimum energy costs to reach each stone, it computes the optimal path to the `i`-th stone by taking the minimum cost of a 1-step jump and a 2-step jump from previous stones.",
      "Since it performs a constant number of calculations (two possible jumps) for each of the N stones exactly once, it guarantees an O(N) time complexity. The space complexity is O(N) for storing the array, though it can be optimized to O(1) by keeping track of just the last two costs."
    ],
    timeCases: { best: "O(N)", average: "O(N)", worst: "O(N)" },
    spaceCases: { best: "O(1)", average: "O(N)", worst: "O(N)" },
    inputSizeRange: { min: 10, max: 2000, default: 100 },
    runExperiment: runFrogJumpExperiment,
  },
};
