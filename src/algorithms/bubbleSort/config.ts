import type { AlgorithmConfig, PseudocodeLine } from "@/types";

export const bubbleSortPseudocode: PseudocodeLine[] = [
  { code: "function bubbleSort(arr):", indent: 0 },
  { code: "for i from 0 to n - 1:", indent: 1 },
  { code: "for j from 0 to n - i - 2:", indent: 2 },
  { code: "if arr[j] > arr[j + 1]: swap(arr[j], arr[j+1])", indent: 3 },
  { code: "// arr[n-1-i] is now sorted", indent: 2 },
  { code: "return arr  // Array is fully sorted!", indent: 1 },
];

export const bubbleSortConfig: AlgorithmConfig = {
  id: "bubble-sort",
  title: "Bubble Sort",
  category: "Sorting",
  categoryIcon: "arrow-up-down",
  description:
    "Bubble Sort repeatedly steps through the array, compares adjacent elements, and swaps them if they are in the wrong order. The largest unsorted element \"bubbles up\" to its correct position in each pass.",
  pseudocode: bubbleSortPseudocode,
  difficulty: "Easy",
};
