import type { AlgorithmConfig } from "@/types";
import { runQuickSortExperiment } from "./generator";

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
  complexityExplorer: {
    trackedMetrics: ["operations", "comparisons", "swaps"],
    storyParagraphs: [
      "Quick Sort is an extremely fast, in-place sorting algorithm based on the divide and conquer paradigm.",
      "In the average case, the pivot splits the array into two roughly equal halves, resulting in O(N log N) time complexity. However, if the pivot is always the smallest or largest element (e.g., when sorting an already sorted array using the last element as pivot), the partitioning becomes highly unbalanced.",
      "This worst-case scenario degenerates to O(N²) time complexity. A randomized pivot (or median-of-three) is typically used in practice to ensure the O(N log N) average case."
    ],
    timeCases: { best: "O(N log N)", average: "O(N log N)", worst: "O(N²)" },
    spaceCases: { best: "O(log N)", average: "O(log N)", worst: "O(N)" },
    inputSizeRange: { min: 10, max: 200, default: 50 },
    runExperiment: runQuickSortExperiment,
  },
  problemContext: {
    statement: "Given an unsorted array of integers `arr`, sort the array in non-decreasing order using the Quick Sort algorithm (Divide and Conquer). Pick a pivot, partition elements smaller than pivot to its left and larger to its right, then recursively sort partitions.",
    examples: [
      {
        input: "arr = [10, 7, 8, 9, 1, 5]",
        output: "[1, 5, 7, 8, 9, 10]",
        explanation: "Pick 5 as pivot. Partition into [1] and [10, 7, 8, 9]. Recursively sort sub-arrays."
      }
    ],
    intuitionPrompt: "Pick a benchmark element (pivot). Put everyone shorter than the pivot on the left, everyone taller on the right. Now the pivot is in its exact final position! Repeat this process on both sides.",
    approaches: [
      {
        name: "Quick Sort (Lomuto Partition)",
        complexity: "O(n log n) avg / O(n²) worst",
        spaceComplexity: "O(log n) stack",
        description: "Choose last element as pivot. Maintain index i for smaller elements, iterate j from low to high-1. Swap elements <= pivot.",
        isOptimal: true
      },
      {
        name: "Randomized / Dual-Pivot Quick Sort",
        complexity: "O(n log n)",
        spaceComplexity: "O(log n) stack",
        description: "Randomly pick pivot or pick median-of-three to avoid worst-case O(n²) degradation on sorted inputs.",
        isOptimal: true
      }
    ],
    realWorldApplications: [
      "C++ `std::sort` (Introsort, which starts as Quick Sort and switches to Heap Sort if recursion depth gets too large).",
      "Java `Arrays.sort` for primitive types (uses Dual-Pivot Quick Sort).",
      "In-place high-performance sorting systems where minimal memory overhead is required."
    ],
    patterns: ["Divide and Conquer", "Pivot Partitioning", "In-Place Sorting", "Recursion"]
  }
};

