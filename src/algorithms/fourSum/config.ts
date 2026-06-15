import type { AlgorithmConfig } from "@/types";

export const fourSumConfig: AlgorithmConfig = {
  id: "four-sum",
  title: "4 Sum",
  category: "Two Pointers",
  categoryIcon: "layers",
  difficulty: "Medium",
  description:
    "Given an array nums of n integers, return an array of all the unique quadruplets [nums[i], nums[j], nums[k], nums[l]] such that the sum is equal to target. The optimal approach uses sorting and two nested loops with the two-pointer technique to achieve O(N³) time complexity.",
  pseudocode: [
    { code: "function fourSum(nums, target):", indent: 0 },
    { code: "nums.sort()", indent: 1 },
    { code: "for i from 0 to nums.length - 4:", indent: 1 },
    { code: "if i > 0 and nums[i] == nums[i-1]: continue", indent: 2 },
    { code: "for j from i + 1 to nums.length - 3:", indent: 2 },
    { code: "if j > i + 1 and nums[j] == nums[j-1]: continue", indent: 3 },
    { code: "left = j + 1", indent: 3 },
    { code: "right = nums.length - 1", indent: 3 },
    { code: "while left < right:", indent: 3 },
    { code: "sum = nums[i] + nums[j] + nums[left] + nums[right]", indent: 4 },
    { code: "if sum == target:", indent: 4 },
    { code: "add [nums[i], nums[j], nums[left], nums[right]] to results", indent: 5 },
    { code: "left++; right--", indent: 5 },
    { code: "while left < right and nums[left] == nums[left-1]: left++", indent: 5 },
    { code: "while left < right and nums[right] == nums[right+1]: right--", indent: 5 },
    { code: "else if sum < target:", indent: 4 },
    { code: "left++", indent: 5 },
    { code: "else:", indent: 4 },
    { code: "right--", indent: 5 },
    { code: "return results", indent: 1 },
  ],
};
