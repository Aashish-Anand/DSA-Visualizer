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
};
