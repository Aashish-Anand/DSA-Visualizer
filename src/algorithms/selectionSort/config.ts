import type { AlgorithmConfig } from "@/types";
import { runSelectionSortExperiment } from "./generator";

export const selectionSortConfig: AlgorithmConfig = {
  id: "selection-sort",
  title: "Selection Sort",
  category: "Sorting",
  categoryIcon: "ArrowDownUp",
  description:
    "Selection Sort divides the input array into two parts: a sorted subarray and an unsorted subarray. It repeatedly selects the smallest element from the unsorted subarray and swaps it with the leftmost unsorted element.",
  difficulty: "Easy",
  pseudocode: [
    { code: "function selectionSort(arr):", indent: 0 },
    { code: "for i from 0 to n - 1:", indent: 1 },
    { code: "minIndex = i", indent: 2 },
    { code: "for j from i + 1 to n - 1:", indent: 2 },
    { code: "if arr[j] < arr[minIndex]:", indent: 3 },
    { code: "minIndex = j", indent: 4 },
    { code: "swap(arr[i], arr[minIndex])", indent: 2 },
  ],
  complexityExplorer: {
    trackedMetrics: ["comparisons", "swaps", "operations"],
    storyParagraphs: [
      "Selection sort is an in-place comparison sorting algorithm that divides the input list into two parts: a sorted sublist and an unsorted sublist.",
      "It always takes O(N²) time regardless of the initial order of the array. Even if the array is already sorted, it still scans the entire unsorted portion to find the minimum element.",
      "The primary advantage of Selection Sort over Bubble Sort is that it never makes more than O(N) swaps, making it useful when memory writing is costly."
    ],
    timeCases: { best: "O(N²)", average: "O(N²)", worst: "O(N²)" },
    spaceCases: { best: "O(1)", average: "O(1)", worst: "O(1)" },
    inputSizeRange: { min: 10, max: 200, default: 50 },
    runExperiment: runSelectionSortExperiment,
  },
  problemContext: {
    statement: "Given an unsorted array `arr`, sort it in non-decreasing order using Selection Sort by repeatedly finding the minimum element from the unsorted segment and moving it to the beginning.",
    examples: [
      {
        input: "arr = [64, 25, 12, 22, 11]",
        output: "[11, 12, 22, 25, 64]",
        explanation: "Find min (11) swap with 64 -> [11, 25, 12, 22, 64]. Find min (12) swap with 25 -> [11, 12, 25, 22, 64]. Find min (22) swap with 25 -> [11, 12, 22, 25, 64]."
      }
    ],
    intuitionPrompt: "Scanning the unsorted portion of a list to pick the absolute smallest remaining item, placing it into the next open slot on the left.",
    approaches: [
      {
        name: "Selection Sort",
        complexity: "O(n²)",
        spaceComplexity: "O(1)",
        description: "Maintain a sorted sublist on the left. Find minimum element in unsorted sublist and swap with arr[i]. Performs at most N-1 swaps total.",
        isOptimal: true
      }
    ],
    realWorldApplications: [
      "Flash memory devices where writes are significantly more expensive than reads (Selection Sort makes at most O(N) writes).",
      "Small dataset sorting when O(1) space and minimal writes are strictly required."
    ],
    patterns: ["In-Place Sorting", "Min Selection", "Minimal Writes"]
  }
};

