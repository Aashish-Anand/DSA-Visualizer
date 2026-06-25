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
  problemContext: {
    statement: "Given an integer array `nums` of size `n`, find all elements that appear more than `⌊n / 3⌋` times. You must solve the problem in `O(N)` linear time and in `O(1)` constant space.",
    examples: [
      {
        input: "nums = [3, 2, 3]",
        output: "[3]",
        explanation: "3 appears 2 times, which is greater than 3/3 (1). 2 appears 1 time, which is not greater than 1."
      },
      {
        input: "nums = [1, 2]",
        output: "[1, 2]",
        explanation: "Both 1 and 2 appear once, which is strictly greater than 2/3 (0)."
      },
      {
        input: "nums = [1, 2, 3, 1, 2, 3, 1, 2]",
        output: "[1, 2]",
        explanation: "n = 8, n/3 = 2. Both 1 and 2 appear 3 times (>2), while 3 appears only 2 times."
      }
    ],
    intuitionPrompt: "How many elements can possibly appear more than n/3 times in an array? At most TWO! (If three elements appeared more than n/3 times, the total count would exceed n). Therefore, we can extend the Boyer-Moore Voting Algorithm to maintain exactly two candidates and two counts.",
    approaches: [
      {
        name: "Brute Force",
        complexity: "O(N²)",
        spaceComplexity: "O(1)",
        isOptimal: false,
        description: "For each element, count its occurrences across the entire array. Add to results if count > n/3 and it's not already in the results list."
      },
      {
        name: "Hash Map Frequency Table",
        complexity: "O(N)",
        spaceComplexity: "O(N)",
        isOptimal: false,
        description: "Traverse the array once to build a frequency map of all numbers. Then filter the map keys where the value exceeds n/3."
      },
      {
        name: "Extended Boyer-Moore Voting",
        complexity: "O(N)",
        spaceComplexity: "O(1)",
        isOptimal: true,
        description: "Maintain two candidates (`cand1`, `cand2`) and two counts (`count1`, `count2`). Traverse the array to pair off triplets of distinct elements. Finally, do a second pass to verify if the remaining two candidates strictly appear more than n/3 times."
      }
    ],
    realWorldApplications: [
      "Distributed Consensus (Quorum Systems): Finding leading nodes or validating transactions where agreement requires more than 1/3 of the network nodes (e.g. Byzantine Fault Tolerance).",
      "Network Traffic Analysis: Identifying top bandwidth hogging IP addresses where up to two dominant streams consume over a third of total pipeline capacity.",
      "Recommendation Engines: Spotting co-dominant user preferences or top two heavily purchased items in customer shopping baskets."
    ],
    patterns: ["Extended Boyer-Moore", "Array", "Two Passes"]
  },
};
