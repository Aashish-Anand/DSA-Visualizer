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
};
