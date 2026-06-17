import type { AlgorithmConfig } from "@/types";

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
  complexity: {
    time: "O(n²)",
    space: "O(1)",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    timeExplanation: [
      "Insertion Sort has two nested loops in the worst case (reverse sorted array).",
      "The outer loop runs 'n' times, and the inner loop shifts elements one by one.",
      "This results in roughly n²/2 comparisons and shifts, making the worst-case time complexity O(n²)."
    ],
    spaceExplanation: [
      "Insertion Sort sorts the array in-place.",
      "It only requires O(1) extra space to hold the 'key' variable and loop counters."
    ],
    timeAnimationId: "quadratic"
  }
};
