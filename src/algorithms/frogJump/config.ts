import { getDPComplexity } from "../dpExperiments";
import type { AlgorithmConfig } from "@/types";
import { runFrogJumpExperiment } from "./generator";

export const frogJumpConfig: AlgorithmConfig = {
  id: "frog-jump",
  title: "Frog Jump",
  category: "Dynamic Programming",
  categoryIcon: "layers",
  description: "Start at stone 0. Jump one or two stones at a time, paying the absolute height difference. Find the minimum total energy to reach the last stone.",
  difficulty: "Easy",
  pseudocode: [
    { code: "function frogJump(heights):", indent: 0 },
    { code: "n = length(heights)", indent: 1 },
    { code: "dp = array of size n", indent: 1 },
    { code: "dp[0] = 0", indent: 1 },
    { code: "if n > 1: dp[1] = abs(heights[1] - heights[0])", indent: 1 },
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
    { code: "if n > 1: dp[1] = abs(heights[1] - heights[0])", indent: 1 },
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
    { code: "if (n > 1) dp[1] = Math.abs(heights[1] - heights[0]);", indent: 1 },
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
        { code: "if n > 1: dp[1] = abs(heights[1] - heights[0])", indent: 1 },
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
  problemContext: {
    statement: "A frog is at stone 0 and wants to reach stone N-1. The height of the i-th stone is `heights[i]`. The frog can jump from stone i to stone i+1 or stone i+2. The energy consumed in a jump from stone i to stone j is `|heights[i] - heights[j]|`. Find the minimum total energy consumed to reach stone N-1.",
    examples: [
      {
        input: "heights = [10, 30, 40, 20]",
        output: "30",
        explanation: "Jump 0 -> 1 (energy |10-30| = 20), then jump 1 -> 3 (energy |30-20| = 10). Total = 30."
      },
      {
        input: "heights = [30, 10, 60, 10, 60, 50]",
        output: "40",
        explanation: "Jump 0 -> 2 (30) -> 4 (0) -> 5 (10). Total energy = 40."
      }
    ],
    intuitionPrompt: "At stone `i`, the frog could only arrive from `i-1` or `i-2`. The min cost to reach stone `i` is min(costTo(i-1) + jumpCost(i-1, i), costTo(i-2) + jumpCost(i-2, i)).",
    approaches: [
      { name: "Recursion", complexity: "O(2ⁿ)", spaceComplexity: "O(n)", description: "Explore both predecessor choices recursively. Repeated subproblems make the work grow exponentially.", isOptimal: false },
      { name: "Memoization", complexity: "O(n)", spaceComplexity: "O(n)", description: "Solve top-down and cache each subproblem. The cache and recursion stack each use linear extra space.", isOptimal: true },
      { name: "Tabulation", complexity: "O(n)", spaceComplexity: "O(n)", description: "Fill a DP table from the base cases upward, using the previous two states to compute the next one.", isOptimal: true },
      { name: "Rolling variables (explanation only)", complexity: "O(n)", spaceComplexity: "O(1)", description: "Only the previous two values are needed. Replacing the table with two variables reduces storage; this optimization is not an available visualization approach yet.", isOptimal: false },
    ],
    realWorldApplications: [
      "Shortest path in weighted DAGs.",
      "Cost-optimized resource scheduling.",
      "Energy minimization in robotics motion planning."
    ],
    patterns: ["Dynamic Programming", "1D DP", "Greedy vs DP"]
  }
};


// Resolve performance metadata for the actual selected implementation.
for (const variant of frogJumpConfig.variants ?? []) {
  if (variant.id === "iterative") { variant.python = frogJumpConfig.python; variant.java = frogJumpConfig.java; }
  variant.complexityExplorer = getDPComplexity("frog", variant.id as "recursive" | "memoized" | "iterative", frogJumpConfig.complexityExplorer!);
}
