import type { AlgorithmConfig, PseudocodeLine } from "@/types";

export const twoSumPseudocode: PseudocodeLine[] = [
  { code: "function twoSum(nums, target):", indent: 0 },
  { code: "for i from 0 to nums.length - 1:", indent: 1 },
  { code: "complement = target - nums[i]", indent: 2 },
  { code: "if complement in hashMap:", indent: 2 },
  { code: "return [hashMap[complement], i]", indent: 3 },
  { code: "hashMap[nums[i]] = i", indent: 2 },
  { code: "return []  // No solution found", indent: 1 },
];

export const twoSumConfig: AlgorithmConfig = {
  id: "two-sum",
  title: "Two Sum",
  category: "Arrays",
  categoryIcon: "brackets",
  description:
    "Given an array of integers and a target, find two numbers that add up to the target. The HashMap approach gives us O(n) time complexity by storing previously seen numbers.",
  pseudocode: twoSumPseudocode,
  difficulty: "Easy",
};
