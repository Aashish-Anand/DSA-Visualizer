import type { AlgorithmConfig } from "@/types";

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
};
