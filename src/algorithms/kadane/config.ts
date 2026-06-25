import type { AlgorithmConfig } from "@/types";

export const kadaneConfig: AlgorithmConfig = {
  id: "kadane",
  title: "Kadane's Algorithm",
  category: "Arrays",
  categoryIcon: "arrays",
  difficulty: "Medium",
  description:
    "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
  pseudocode: [
    { code: "function maxSubArray(nums):", indent: 0 },
    { code: "currentSum = 0", indent: 1 },
    { code: "maxSum = -Infinity", indent: 1 },
    { code: "for i = 0 to nums.length - 1:", indent: 1 },
    { code: "currentSum = currentSum + nums[i]", indent: 2 },
    { code: "if currentSum > maxSum:", indent: 2 },
    { code: "maxSum = currentSum", indent: 3 },
    { code: "if currentSum < 0:", indent: 2 },
    { code: "currentSum = 0", indent: 3 },
    { code: "return maxSum", indent: 1 },
  ],
  problemContext: {
    statement: "Given an integer array `nums`, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
    examples: [
      {
        input: "nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]",
        output: "6",
        explanation: "The contiguous subarray [4, -1, 2, 1] has the largest sum = 6."
      },
      {
        input: "nums = [1]",
        output: "1",
        explanation: "The subarray [1] has the largest sum = 1."
      },
      {
        input: "nums = [5, 4, -1, 7, 8]",
        output: "23",
        explanation: "All numbers are positive or slightly negative but overcome by positives, so the entire array sum is 23."
      }
    ],
    intuitionPrompt: "If the total sum of a subarray becomes negative, it can never contribute positively to the next element! When your running sum dips below zero, it's better to reset it to zero and start fresh with the next number.",
    approaches: [
      {
        name: "Brute Force (All Subarrays)",
        complexity: "O(N³)",
        spaceComplexity: "O(1)",
        isOptimal: false,
        description: "Consider every possible starting index `i` and ending index `j`. Calculate the sum of elements between `i` and `j` using a third loop, tracking the maximum."
      },
      {
        name: "Optimized Brute Force",
        complexity: "O(N²)",
        spaceComplexity: "O(1)",
        isOptimal: false,
        description: "Eliminate the third loop by maintaining a running sum as you expand the ending index `j` for each starting index `i`."
      },
      {
        name: "Divide and Conquer",
        complexity: "O(N log N)",
        spaceComplexity: "O(log N)",
        isOptimal: false,
        description: "Divide the array into left and right halves. The max subarray is either entirely in the left half, entirely in the right half, or crossing the middle. Recursively find the max."
      },
      {
        name: "Kadane's Algorithm (Dynamic Programming)",
        complexity: "O(N)",
        spaceComplexity: "O(1)",
        isOptimal: true,
        description: "Maintain a `currentSum` and `maxSum`. As you iterate, add the element to `currentSum`. Update `maxSum` if `currentSum` is larger. If `currentSum` becomes negative, reset it to 0. This elegantly solves the problem in a single linear pass."
      }
    ],
    realWorldApplications: [
      "Financial Analysis: Evaluating stock price fluctuations to find the specific historical period that yielded the highest potential continuous gain.",
      "Computer Vision (Bitmap Image Processing): Identifying the brightest contiguous region or area of highest interest within a 1D scan line.",
      "Genomic Sequence Analysis: Locating biologically significant segments in DNA sequences where specific scoring matrices yield maximum cumulative affinity."
    ],
    patterns: ["Dynamic Programming", "Kadane's", "Array", "Greedy"]
  },
};
