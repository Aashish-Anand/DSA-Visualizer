import type { AlgorithmConfig } from "@/types";
import { runInsertionSortExperiment } from "./generator";

export const insertionSortConfig: AlgorithmConfig = {
  id: "insertion-sort",
  title: "Insertion Sort",
  category: "Sorting",
  categoryIcon: "ArrowDownUp",
  description:
    "Insertion Sort builds the final sorted array one item at a time. It iterates through the input array, consuming one element per iteration, and finding its correct position in the already-sorted left portion of the array.",
  difficulty: "Easy",
  pseudocode: [
    { code: "function insertionSort(arr):", indent: 0 },
    { code: "for i from 1 to n - 1:", indent: 1 },
    { code: "key = arr[i]", indent: 2 },
    { code: "j = i - 1", indent: 2 },
    { code: "while j >= 0 and arr[j] > key:", indent: 2 },
    { code: "arr[j + 1] = arr[j]", indent: 3 },
    { code: "j = j - 1", indent: 3 },
    { code: "arr[j + 1] = key", indent: 2 },
  ],
  complexityExplorer: {
    trackedMetrics: ["comparisons", "swaps", "operations"],
    storyParagraphs: [
      "Insertion sort builds the final sorted array one item at a time. It iterates through the input array and removes one element per iteration, finds the location it belongs within the sorted list, and inserts it there.",
      "In the worst case (reverse sorted array), every new element needs to be compared with and shifted past all previously sorted elements, resulting in O(N²) time complexity.",
      "In the best case (already sorted array), the algorithm only makes one comparison per element and zero shifts, resulting in O(N) time complexity. The space complexity is O(1) since it sorts in-place."
    ],
    timeCases: { best: "O(N)", average: "O(N²)", worst: "O(N²)" },
    spaceCases: { best: "O(1)", average: "O(1)", worst: "O(1)" },
    inputSizeRange: { min: 10, max: 200, default: 50 },
    runExperiment: runInsertionSortExperiment,
  },
};
