import type { AlgorithmConfig } from "@/types";
import { runRadixSortExperiment } from "./generator";

export const radixSortConfig: AlgorithmConfig = {
  id: "radix-sort",
  title: "Radix Sort",
  category: "Sorting",
  categoryIcon: "ArrowDownUp",
  description:
    "Radix Sort is a non-comparative sorting algorithm. It avoids comparison by creating and distributing elements into buckets according to their radix (base). It processes digits individually, starting from the least significant digit.",
  difficulty: "Medium",
  pseudocode: [
    { code: "function radixSort(arr):", indent: 0 },
    { code: "max_val = max(arr)", indent: 1 },
    { code: "place = 1", indent: 1 },
    { code: "while max_val / place > 0:", indent: 1 },
    { code: "buckets = array of 10 empty arrays", indent: 2 },
    { code: "for each num in arr:", indent: 2 },
    { code: "digit = (num / place) % 10", indent: 3 },
    { code: "buckets[digit].push(num)", indent: 3 },
    { code: "idx = 0", indent: 2 },
    { code: "for each bucket in buckets:", indent: 2 },
    { code: "for each num in bucket:", indent: 3 },
    { code: "arr[idx++] = num", indent: 4 },
    { code: "place *= 10", indent: 2 },
  ],
  complexityExplorer: {
    trackedMetrics: ["operations", "comparisons"],
    storyParagraphs: [
      "Radix Sort is a non-comparative sorting algorithm that sorts elements by processing them digit by digit.",
      "It operates in O(N × D) time, where N is the number of elements and D is the number of digits in the largest number. Because it doesn't compare elements directly, it can be faster than O(N log N) algorithms like Quick Sort or Merge Sort for certain datasets.",
      "However, it requires O(N + K) space (where K is the radix, usually 10 for decimal numbers), and it relies on the data being representable as a sequence of digits or characters."
    ],
    timeCases: { best: "O(N × D)", average: "O(N × D)", worst: "O(N × D)" },
    spaceCases: { best: "O(N + K)", average: "O(N + K)", worst: "O(N + K)" },
    inputSizeRange: { min: 10, max: 200, default: 50 },
    runExperiment: runRadixSortExperiment,
  },
  problemContext: {
    statement: "Given an array of non-negative integers `arr`, sort the array using Radix Sort by processing digits individually from the least significant digit (LSD) to the most significant digit (MSD) using a stable sorting subroutine (e.g. Counting Sort).",
    examples: [
      {
        input: "arr = [170, 45, 75, 90, 802, 24, 2, 66]",
        output: "[2, 24, 45, 66, 75, 90, 170, 802]",
        explanation: "Sort by 1s digit: [170, 90, 802, 2, 24, 45, 75, 66]. Sort by 10s digit: [802, 2, 24, 45, 66, 170, 75, 90]. Sort by 100s digit: [2, 24, 45, 66, 75, 90, 170, 802]."
      }
    ],
    intuitionPrompt: "Sorting multi-digit numbers by first sorting all ones digits, then all tens digits, then hundreds digits, preserving the relative order of earlier digits at each step!",
    approaches: [
      {
        name: "LSD Radix Sort",
        complexity: "O(d × (n + k))",
        spaceComplexity: "O(n + k)",
        description: "Iterate from place=1 (1s, 10s, 100s...). Group numbers into 10 buckets (0-9) based on current digit and flatten back into array stably.",
        isOptimal: true
      }
    ],
    realWorldApplications: [
      "Sorting fixed-length string records or binary integer keys.",
      "Card sorter machines and postal code sorting systems.",
      "Parallel computing sorting routines on GPU architectures."
    ],
    patterns: ["Non-Comparison Sort", "Digit Distribution", "Stable Bucket Sorting"]
  }
};

