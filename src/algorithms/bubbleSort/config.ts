import type { AlgorithmConfig, PseudocodeLine } from "@/types";
import { runBubbleSortExperiment } from "./generator";

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
  complexityExplorer: {
    trackedMetrics: ["comparisons", "swaps", "operations", "reads", "writes"],
    storyParagraphs: [
      "Why does Bubble Sort grow so quickly?",
      "Bubble Sort uses two nested loops. The outer loop picks each position, and the inner loop bubbles the largest unsorted element into that position.",
      "For every single element in the array, the inner loop may need to compare it against almost every other element.",
      "As the array grows, the number of comparisons grows dramatically — not just double, but squared.",
      "An array of 10 elements needs ~45 comparisons. An array of 100? Nearly 5,000. That's the power of n².",
      "When the input doubles from n to 2n, the work quadruples from n² to 4n². This is why Bubble Sort is impractical for large datasets."
    ],
    timeCases: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    spaceCases: { best: "O(1)", average: "O(1)", worst: "O(1)" },
    visualExplanationId: "nested-loops",
    inputSizeRange: { min: 5, max: 100, default: 10 },
    runExperiment: runBubbleSortExperiment,
  },
};
