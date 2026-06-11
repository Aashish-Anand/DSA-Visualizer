import type { AlgorithmConfig } from "@/types";

export const quickSortConfig: AlgorithmConfig = {
  id: "quick-sort",
  title: "Quick Sort",
  category: "Sorting",
  categoryIcon: "ArrowDownUp",
  description:
    "Quick Sort is a divide-and-conquer algorithm. It picks an element as a pivot and partitions the given array around the picked pivot, placing smaller elements to the left and larger elements to the right.",
  difficulty: "Medium",
  pseudocode: [
    { code: "function quickSort(arr, low, high):", indent: 0 },
    { code: "if low < high:", indent: 1 },
    { code: "pivotIndex = partition(arr, low, high)", indent: 2 },
    { code: "quickSort(arr, low, pivotIndex - 1)", indent: 2 },
    { code: "quickSort(arr, pivotIndex + 1, high)", indent: 2 },
    { code: "function partition(arr, low, high):", indent: 0 },
    { code: "pivot = arr[high]", indent: 1 },
    { code: "i = low - 1", indent: 1 },
    { code: "for j from low to high - 1:", indent: 1 },
    { code: "if arr[j] < pivot:", indent: 2 },
    { code: "i++", indent: 3 },
    { code: "swap(arr[i], arr[j])", indent: 3 },
    { code: "swap(arr[i + 1], arr[high])", indent: 1 },
    { code: "return i + 1", indent: 1 },
  ],
};
