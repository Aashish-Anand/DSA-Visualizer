import type { AlgorithmConfig } from "@/types";
import { runMergeSortExperiment } from "./generator";

export const mergeSortConfig: AlgorithmConfig = {
  id: "merge-sort",
  title: "Merge Sort",
  category: "Sorting",
  categoryIcon: "ArrowDownUp",
  description:
    "Merge Sort is a divide-and-conquer algorithm that divides the array into halves, recursively sorts them, and then merges the two sorted halves back together.",
  difficulty: "Medium",
  pseudocode: [
    { code: "function mergeSort(arr, left, right):", indent: 0 },
    { code: "if left >= right: return", indent: 1 },
    { code: "mid = (left + right) / 2", indent: 1 },
    { code: "mergeSort(arr, left, mid)", indent: 1 },
    { code: "mergeSort(arr, mid + 1, right)", indent: 1 },
    { code: "merge(arr, left, mid, right)", indent: 1 },
    { code: "function merge(arr, left, mid, right):", indent: 0 },
    { code: "create leftArr and rightArr", indent: 1 },
    { code: "i = 0, j = 0, k = left", indent: 1 },
    { code: "while i < leftArr.length and j < rightArr.length:", indent: 1 },
    { code: "if leftArr[i] <= rightArr[j]:", indent: 2 },
    { code: "arr[k++] = leftArr[i++]", indent: 3 },
    { code: "else:", indent: 2 },
    { code: "arr[k++] = rightArr[j++]", indent: 3 },
    { code: "copy remaining elements of leftArr and rightArr", indent: 1 },
  ],
  problemContext: {
    statement: "Given an array of integers `arr`, sort the array in non-decreasing order using the Merge Sort algorithm. You must divide the array into two halves, recursively sort each half, and then merge the two sorted halves into a single sorted array.",
    examples: [
      {
        input: "arr = [38, 27, 43, 3, 9, 82, 10]",
        output: "[3, 9, 10, 27, 38, 43, 82]",
        explanation: "The array is divided into [38, 27, 43, 3] and [9, 82, 10]. These are recursively split down to single elements, which are then merged step-by-step: [27, 38], [3, 43], [9, 82], [10]. Merging further yields [3, 27, 38, 43] and [9, 10, 82], and finally the fully sorted array."
      },
      {
        input: "arr = [5, 2, 3, 1]",
        output: "[1, 2, 3, 5]",
        explanation: "Split into [5, 2] and [3, 1]. Sorted to [2, 5] and [1, 3]. Merged to [1, 2, 3, 5]."
      }
    ],
    intuitionPrompt: "If you were handed two stacks of test papers that are already perfectly sorted alphabetically, how would you combine them into one sorted master stack? You'd just look at the top paper of each stack, pick the earlier name, and place it in the master stack. Merge Sort works by breaking the whole problem down until you're just merging simple sorted stacks!",
    approaches: [
      {
        name: "Recursive Top-Down Merge Sort",
        complexity: "O(n log n)",
        spaceComplexity: "O(n)",
        description: "Divide the array in half recursively until sub-arrays have 1 element (which are inherently sorted). Then merge them back up using temporary sub-arrays. Excellent predictable O(n log n) performance regardless of initial ordering.",
        isOptimal: true
      },
      {
        name: "Iterative Bottom-Up Merge Sort",
        complexity: "O(n log n)",
        spaceComplexity: "O(n)",
        description: "Treat the array as `n` sub-arrays of size 1. Merge adjacent pairs into sub-arrays of size 2, then size 4, 8, etc., until the whole array is sorted. Avoids recursion call-stack overhead.",
        isOptimal: true
      }
    ],
    realWorldApplications: [
      "External Sorting: Sorting massive datasets that do not fit into RAM (e.g., merging sorted chunks stored on a hard drive or database shards).",
      "E-commerce & Enterprise databases where stable sorting is required (preserving the relative order of items with equal keys).",
      "Base algorithm for Timsort (used in Python's `sort()` and Java's `Arrays.sort()`)."
    ],
    patterns: ["Divide and Conquer", "Recursion", "Stable Sorting", "O(n log n)"]
  },
  complexityExplorer: {
    trackedMetrics: ["operations", "comparisons"],
    storyParagraphs: [
      "Merge Sort is a highly efficient, stable sorting algorithm based on the divide and conquer paradigm.",
      "It consistently performs in O(N log N) time regardless of the initial order of the elements. It recursively divides the array into halves until the base case of 1 element is reached (which takes O(log N) splits), and then merges these sorted halves back together in O(N) time at each level.",
      "However, its primary drawback is its O(N) space complexity since it requires temporary arrays during the merge phase."
    ],
    timeCases: { best: "O(N log N)", average: "O(N log N)", worst: "O(N log N)" },
    spaceCases: { best: "O(N)", average: "O(N)", worst: "O(N)" },
    inputSizeRange: { min: 10, max: 200, default: 50 },
    runExperiment: runMergeSortExperiment,
  }
};

