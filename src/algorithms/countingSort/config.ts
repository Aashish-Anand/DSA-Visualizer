import type { AlgorithmConfig } from "@/types";
import { runCountingSortExperiment } from "./generator";

export const countingSortConfig: AlgorithmConfig = {
  id: "counting-sort",
  title: "Counting Sort",
  category: "Sorting",
  categoryIcon: "ArrowDownUp",
  description:
    "Counting Sort is an integer sorting algorithm that operates by counting the number of objects that possess distinct key values, and applying prefix sum to those counts to determine the positions of each key value in the output sequence.",
  difficulty: "Medium",
  pseudocode: [
    { code: "function countingSort(arr):", indent: 0 },
    { code: "max_val = max(arr)", indent: 1 },
    { code: "count = array of zeros of size max_val + 1", indent: 1 },
    { code: "output = array of size arr.length", indent: 1 },
    { code: "for each num in arr:", indent: 1 },
    { code: "count[num]++", indent: 2 },
    { code: "for i from 1 to max_val:", indent: 1 },
    { code: "count[i] += count[i - 1]", indent: 2 },
    { code: "for i from arr.length - 1 down to 0:", indent: 1 },
    { code: "num = arr[i]", indent: 2 },
    { code: "output[count[num] - 1] = num", indent: 2 },
    { code: "count[num]--", indent: 2 },
    { code: "return output", indent: 1 },
  ],
  complexityExplorer: {
    trackedMetrics: ["operations", "comparisons"],
    storyParagraphs: [
      "Counting sort is an integer sorting algorithm that operates by counting the number of objects that possess distinct key values.",
      "It determines the positions of each key value in the output sequence by applying a prefix sum to those counts.",
      "Because it does not compare elements (comparisons are only used to find the max value initially), it runs in O(N + K) time, where N is the number of elements and K is the range of the non-negative key values. However, it requires O(N + K) auxiliary space, making it impractical when K is significantly larger than N."
    ],
    timeCases: { best: "O(N + K)", average: "O(N + K)", worst: "O(N + K)" },
    spaceCases: { best: "O(N + K)", average: "O(N + K)", worst: "O(N + K)" },
    inputSizeRange: { min: 10, max: 200, default: 50 },
    runExperiment: runCountingSortExperiment,
  },
  problemContext: {
    statement: "Given an array of integers `arr` where the range of key values is known and small, sort the array in non-decreasing order using Counting Sort without using comparison operations.",
    examples: [
      {
        input: "arr = [4, 2, 2, 8, 3, 3, 1]",
        output: "[1, 2, 2, 3, 3, 4, 8]",
        explanation: "Count frequencies: 1:1, 2:2, 3:2, 4:1, 8:1. Use prefix sums to place each element into output array stably."
      }
    ],
    intuitionPrompt: "Instead of comparing numbers to each other, simply count how many times each number appears! If there are two 2s and one 1, 1 goes at index 0 and 2s go at indices 1 and 2.",
    approaches: [
      {
        name: "Counting Sort",
        complexity: "O(n + k)",
        spaceComplexity: "O(n + k)",
        description: "Find max element k. Count element frequencies, calculate prefix sums to determine target positions, and construct output array stably.",
        isOptimal: true
      }
    ],
    realWorldApplications: [
      "Subroutine in Radix Sort for multi-digit sorting.",
      "Sorting test scores or age distributions where key ranges (k) are very small relative to n.",
      "Histogram computation and bucket categorization in data engineering."
    ],
    patterns: ["Non-Comparison Sort", "Frequency Array", "Prefix Sum"]
  }
};

