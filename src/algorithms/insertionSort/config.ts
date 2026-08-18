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
  problemContext: {
    statement: "Given an unsorted array of integers `arr`, sort the array in non-decreasing order in-place using Insertion Sort.",
    examples: [
      {
        input: "arr = [12, 11, 13, 5, 6]",
        output: "[5, 6, 11, 12, 13]",
        explanation: "Element 11 is inserted before 12. Then 13 remains. Then 5 is inserted at index 0. Finally 6 is inserted after 5."
      }
    ],
    intuitionPrompt: "Think of sorting a hand of playing cards. You pick one card at a time from the table, compare it against cards in your left hand from right to left, and slide it into its proper spot!",
    approaches: [
      {
        name: "Standard Insertion Sort",
        complexity: "O(n²)",
        spaceComplexity: "O(1)",
        description: "Iterate from index 1 to n-1. Pick element key=arr[i] and shift elements of arr[0..i-1] that are greater than key to one position ahead.",
        isOptimal: true
      }
    ],
    realWorldApplications: [
      "Hybrid sorting algorithms like Timsort and introsort (used in Python and C++ std::sort) for small partitions (typically n <= 16 or 32).",
      "Online sorting where numbers are received one by one over a live network stream."
    ],
    patterns: ["In-Place Sorting", "Incremental Construction", "Card Playing Sorting"]
  }
};

