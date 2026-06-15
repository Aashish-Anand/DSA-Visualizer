import type { AlgorithmConfig } from "@/types";

export const threeSumConfig: AlgorithmConfig = {
  id: "three-sum",
  title: "3 Sum",
  category: "Two Pointers",
  categoryIcon: "layers",
  difficulty: "Medium",
  description:
    "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0. The optimal approach uses sorting and the two-pointer technique to achieve O(N²) time complexity.",
  pseudocode: [
    { code: "function threeSum(nums):", indent: 0 },
    { code: "nums.sort()", indent: 1 },
    { code: "for i from 0 to nums.length - 3:", indent: 1 },
    { code: "if i > 0 and nums[i] == nums[i-1]: continue", indent: 2 },
    { code: "left = i + 1", indent: 2 },
    { code: "right = nums.length - 1", indent: 2 },
    { code: "while left < right:", indent: 2 },
    { code: "sum = nums[i] + nums[left] + nums[right]", indent: 3 },
    { code: "if sum == 0:", indent: 3 },
    { code: "add [nums[i], nums[left], nums[right]] to results", indent: 4 },
    { code: "left++; right--", indent: 4 },
    { code: "while left < right and nums[left] == nums[left-1]: left++", indent: 4 },
    { code: "while left < right and nums[right] == nums[right+1]: right--", indent: 4 },
    { code: "else if sum < 0:", indent: 3 },
    { code: "left++", indent: 4 },
    { code: "else:", indent: 3 },
    { code: "right--", indent: 4 },
    { code: "return results", indent: 1 },
  ],
};
