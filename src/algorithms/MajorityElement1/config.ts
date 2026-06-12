import type { AlgorithmConfig } from "@/types";

export const majorityElement1Config: AlgorithmConfig = {
  id: "majority-element-1",
  title: "Majority Element (> N/2)",
  category: "Arrays",
  categoryIcon: "arrays",
  difficulty: "Easy",
  description:
    "Given an array nums of size n, return the majority element. The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array. This uses the Boyer-Moore Voting Algorithm in O(1) space.",
  pseudocode: [
    { code: "function majorityElement(nums):", indent: 0 },
    { code: "candidate = null", indent: 1 },
    { code: "count = 0", indent: 1 },
    { code: "for each num in nums:", indent: 1 },
    { code: "if count == 0:", indent: 2 },
    { code: "candidate = num", indent: 3 },
    { code: "if num == candidate:", indent: 2 },
    { code: "count += 1", indent: 3 },
    { code: "else:", indent: 2 },
    { code: "count -= 1", indent: 3 },
    { code: "return candidate", indent: 1 },
  ],
};
