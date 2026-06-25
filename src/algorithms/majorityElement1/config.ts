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
  problemContext: {
    statement: "Given an array `nums` of size `n`, return the majority element. The majority element is the element that appears more than `⌊n / 2⌋` times. You may assume that the majority element always exists in the array.",
    examples: [
      {
        input: "nums = [3, 2, 3]",
        output: "3",
        explanation: "The number 3 appears 2 times out of 3 elements, which is strictly greater than 3/2 (1.5)."
      },
      {
        input: "nums = [2, 2, 1, 1, 1, 2, 2]",
        output: "2",
        explanation: "The number 2 appears 4 times out of 7 elements, which is strictly greater than 7/2 (3.5)."
      }
    ],
    intuitionPrompt: "If an element appears more than half the time, its count will strictly outweigh the combined count of all other elements in the array. Imagine a battle where each majority element knocks out one non-majority element—the majority element will always be the last one standing!",
    approaches: [
      {
        name: "Brute Force (Nested Loops)",
        complexity: "O(N²)",
        spaceComplexity: "O(1)",
        isOptimal: false,
        description: "Iterate through each element and count its occurrences in the entire array using a second nested loop. If the count exceeds n/2, return it."
      },
      {
        name: "Hash Map Counting",
        complexity: "O(N)",
        spaceComplexity: "O(N)",
        isOptimal: false,
        description: "Iterate through the array and store element counts in a hash map. While fast, this requires O(N) additional memory to store the map."
      },
      {
        name: "Sorting",
        complexity: "O(N log N)",
        spaceComplexity: "O(1)",
        isOptimal: false,
        description: "Sort the array in non-decreasing order. Since the majority element appears more than n/2 times, it will always occupy the middle index `nums[n/2]`."
      },
      {
        name: "Boyer-Moore Voting Algorithm",
        complexity: "O(N)",
        spaceComplexity: "O(1)",
        isOptimal: true,
        description: "Maintain a `candidate` and a `count`. When `count` is 0, pick the current element as the new `candidate`. For subsequent elements, increment `count` if it matches the candidate, and decrement otherwise. This finds the majority element in a single pass with constant extra space."
      }
    ],
    realWorldApplications: [
      "Fault-Tolerant Computing: Finding consensus among redundant systems or sensors where a majority must agree on a valid signal.",
      "Data Stream Mining: Quickly identifying trending topics, viral hashtags, or heavy hitters in massive data streams without storing all items.",
      "Election Tabulation: Finding a clear majority winner (>50%) in single-winner voting systems."
    ],
    patterns: ["Boyer-Moore Voting", "Array", "Space Optimization"]
  },
};
