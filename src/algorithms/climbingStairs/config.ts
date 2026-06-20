import type { AlgorithmConfig } from "@/types";

export const climbingStairsConfig: AlgorithmConfig = {
  id: "climbing-stairs",
  title: "Climbing Stairs",
  category: "Dynamic Programming",
  categoryIcon: "layers",
  description:
    "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top? This is a classic DP problem.",
  difficulty: "Easy",
  pseudocode: [],
  variants: [
    {
      id: "recursive",
      title: "1. Recursive (O(2^N) Time)",
      description: "A top-down recursive approach. We explore every possible jump path, leading to exponential time complexity.",
      pseudocode: [
        { code: "function climbStairs(n):", indent: 0 },
        { code: "if n <= 1 return 1", indent: 1 },
        { code: "return climbStairs(n-1) + climbStairs(n-2)", indent: 1 }
      ],
      python: [
        { code: "def climbStairs(n):", indent: 0 },
        { code: "if n <= 1: return 1", indent: 1 },
        { code: "return climbStairs(n-1) + climbStairs(n-2)", indent: 1 }
      ],
      java: [
        { code: "public int climbStairs(int n) {", indent: 0 },
        { code: "if (n <= 1) return 1;", indent: 1 },
        { code: "return climbStairs(n-1) + climbStairs(n-2);", indent: 1 },
        { code: "}", indent: 0 }
      ],
    },
    {
      id: "memoized",
      title: "2. Memoized (O(N) Time)",
      description: "Top-down recursion with memoization. We cache previously computed results to avoid redundant calculations, improving time complexity to O(n).",
      pseudocode: [
        { code: "function climbStairs(n, memo):", indent: 0 },
        { code: "if n <= 1 return 1", indent: 1 },
        { code: "if memo[n] exists return memo[n]", indent: 1 },
        { code: "memo[n] = climbStairs(n-1) + climbStairs(n-2)", indent: 1 },
        { code: "return memo[n]", indent: 1 }
      ],
      python: [
        { code: "def climbStairs(n, memo={}):", indent: 0 },
        { code: "if n <= 1: return 1", indent: 1 },
        { code: "if n in memo: return memo[n]", indent: 1 },
        { code: "memo[n] = climbStairs(n-1, memo) + climbStairs(n-2, memo)", indent: 1 },
        { code: "return memo[n]", indent: 1 }
      ],
      java: [
        { code: "public int climbStairs(int n, int[] memo) {", indent: 0 },
        { code: "if (n <= 1) return 1;", indent: 1 },
        { code: "if (memo[n] > 0) return memo[n];", indent: 1 },
        { code: "memo[n] = climbStairs(n-1, memo) + climbStairs(n-2, memo);", indent: 1 },
        { code: "return memo[n];", indent: 1 },
        { code: "}", indent: 0 }
      ],
    },
    {
      id: "iterative",
      title: "3. DP Iterative (O(N) Time)",
      description: "A bottom-up dynamic programming approach. We build the solution from the base cases up to n using an array.",
      pseudocode: [
        { code: "function climbStairs(n):", indent: 0 },
        { code: "if n <= 1 return 1", indent: 1 },
        { code: "dp = array of size n + 1", indent: 1 },
        { code: "dp[0] = 1, dp[1] = 1", indent: 1 },
        { code: "for i from 2 to n:", indent: 1 },
        { code: "dp[i] = dp[i-1] + dp[i-2]", indent: 2 },
        { code: "return dp[n]", indent: 1 },
      ],
      python: [
        { code: "def climbStairs(n):", indent: 0 },
        { code: "if n <= 1: return 1", indent: 1 },
        { code: "dp = [0] * (n + 1)", indent: 1 },
        { code: "dp[0] = dp[1] = 1", indent: 1 },
        { code: "for i in range(2, n + 1):", indent: 1 },
        { code: "dp[i] = dp[i-1] + dp[i-2]", indent: 2 },
        { code: "return dp[n]", indent: 1 },
      ],
      java: [
        { code: "public int climbStairs(int n) {", indent: 0 },
        { code: "if (n <= 1) return 1;", indent: 1 },
        { code: "int[] dp = new int[n + 1];", indent: 1 },
        { code: "dp[0] = 1; dp[1] = 1;", indent: 1 },
        { code: "for (int i = 2; i <= n; i++) {", indent: 1 },
        { code: "dp[i] = dp[i-1] + dp[i-2];", indent: 2 },
        { code: "return dp[n];", indent: 1 },
        { code: "}", indent: 0 }
      ],
    }
  ]
};
