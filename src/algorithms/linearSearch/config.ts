import type { AlgorithmConfig } from "@/types";
import { runLinearSearchExperiment } from "./generator";

export const linearSearchConfig: AlgorithmConfig = {
  id: "linear-search",
  title: "Linear Search",
  category: "Searching",
  categoryIcon: "Search",
  description:
    "Linear search sequentially checks each element of the list until a match is found or the whole list has been searched.",
  difficulty: "Easy",
  pseudocode: [
    { code: "function linearSearch(arr, target):", indent: 0 },
    { code: "for i from 0 to arr.length - 1:", indent: 1 },
    { code: "if arr[i] == target:", indent: 2 },
    { code: "return i", indent: 3 },
    { code: "return -1;", indent: 1 },
  ],
  complexityExplorer: {
    trackedMetrics: ["comparisons", "operations"],
    storyParagraphs: [
      "Linear Search is the most basic search algorithm. We simply check every element one by one until we find our target.",
      "Because we might have to check every single element in the worst case (if the target is at the very end or doesn't exist), the time complexity is O(N).",
      "While it is slower than Binary Search, Linear Search is the only option when the data is unsorted."
    ],
    timeCases: { best: "O(1)", average: "O(N)", worst: "O(N)" },
    spaceCases: { best: "O(1)", average: "O(1)", worst: "O(1)" },
    inputSizeRange: { min: 10, max: 2000, default: 100 },
    runExperiment: runLinearSearchExperiment,
  },
  problemContext: {
    statement: "Given an array `arr` and a target value `target`, return the index of `target` in `arr`. If `target` is not present in `arr`, return `-1`.",
    examples: [
      {
        input: "arr = [10, 20, 80, 30, 60, 50, 110, 100, 130, 170], target = 110",
        output: "6",
        explanation: "Element 110 is present at index 6."
      },
      {
        input: "arr = [10, 20, 80, 30, 60, 50, 110, 100, 130, 170], target = 175",
        output: "-1",
        explanation: "Element 175 is not present in arr."
      }
    ],
    intuitionPrompt: "Looking through a stack of unsorted papers one by one from top to bottom until you find the exact paper you need.",
    approaches: [
      {
        name: "Linear Search",
        complexity: "O(n)",
        spaceComplexity: "O(1)",
        description: "Iterate through each element sequentially from index 0 to n-1. Compare each element with target.",
        isOptimal: true
      }
    ],
    realWorldApplications: [
      "Searching through unsorted arrays or linked lists.",
      "Small dataset lookups where setting up index data structures incurs unnecessary overhead.",
      "Unstructured file or raw data stream processing."
    ],
    patterns: ["Array Iteration", "Sequential Search", "Unsorted Search"]
  }
};

