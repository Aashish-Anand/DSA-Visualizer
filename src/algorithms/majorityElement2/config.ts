import type { AlgorithmConfig } from "@/types";

export const majorityElement2Config: AlgorithmConfig = {
  id: "majority-element-2",
  title: "Majority Element II (> N/3)",
  category: "Arrays",
  categoryIcon: "arrays",
  difficulty: "Hard",
  description:
    "Given an integer array of size n, find all elements that appear more than ⌊n / 3⌋ times. The algorithm should run in linear time and in O(1) space. This uses the Extended Boyer-Moore Voting Algorithm.",
  pseudocode: [
    { code: "function majorityElement(nums):", indent: 0 },
    { code: "cand1 = null, cand2 = null", indent: 1 },
    { code: "count1 = 0, count2 = 0", indent: 1 },
    { code: "for each num in nums:", indent: 1 },
    { code: "if num == cand1:", indent: 2 },
    { code: "count1 += 1", indent: 3 },
    { code: "else if num == cand2:", indent: 2 },
    { code: "count2 += 1", indent: 3 },
    { code: "else if count1 == 0:", indent: 2 },
    { code: "cand1 = num; count1 = 1", indent: 3 },
    { code: "else if count2 == 0:", indent: 2 },
    { code: "cand2 = num; count2 = 1", indent: 3 },
    { code: "else:", indent: 2 },
    { code: "count1 -= 1; count2 -= 1", indent: 3 },
    { code: "return verify(cand1, cand2)", indent: 1 },
  ],
};
