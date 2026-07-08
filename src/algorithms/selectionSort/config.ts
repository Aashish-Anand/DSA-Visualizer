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
};
