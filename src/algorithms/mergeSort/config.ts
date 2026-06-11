import type { AlgorithmConfig } from "@/types";

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
};
