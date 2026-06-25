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
  problemContext: {
    statement: "Given an unsorted array of integers `arr`, rearrange the elements in non-decreasing order in-place using the Bubble Sort algorithm. You must repeatedly swap adjacent elements that are out of order until the entire array is sorted.",
    examples: [
      {
        input: "arr = [5, 3, 8, 4, 2]",
        output: "[2, 3, 4, 5, 8]",
        explanation: "Pass 1: [3, 5, 4, 2, 8] (8 bubbles to the end). Pass 2: [3, 4, 2, 5, 8] (5 bubbles to its place). Pass 3: [3, 2, 4, 5, 8]. Pass 4: [2, 3, 4, 5, 8]. The array is now fully sorted."
      },
      {
        input: "arr = [2, 1]",
        output: "[1, 2]",
        explanation: "2 > 1, so they are swapped. The array is sorted in 1 pass."
      }
    ],
    intuitionPrompt: "Imagine standing in a line of people ordered by height. If you look at the person next to you and they are taller than you but standing in front of you, you swap places. If everyone keeps doing this from left to right, the tallest person will naturally end up at the very back of the line!",
    approaches: [
      {
        name: "Standard Bubble Sort",
        complexity: "O(n²)",
        spaceComplexity: "O(1)",
        description: "Use two nested loops. The outer loop runs `n` times, and the inner loop compares and swaps adjacent elements `arr[j]` and `arr[j+1]`. Even if the array becomes sorted early, it keeps running.",
        isOptimal: false
      },
      {
        name: "Optimized Bubble Sort (Early Exit)",
        complexity: "O(n) best / O(n²) average",
        spaceComplexity: "O(1)",
        description: "Add a `swapped` boolean flag to keep track of whether any swaps occurred during a pass. If a full pass completes with zero swaps, the array is already sorted and we can break out immediately. This achieves O(n) best-case time for nearly sorted arrays.",
        isOptimal: true
      }
    ],
    realWorldApplications: [
      "Educational introduction to sorting algorithms and algorithmic performance thinking.",
      "Embedded systems with extremely limited memory where simple code size and O(1) auxiliary space are paramount.",
      "Computer graphics algorithms for polygon sorting where lists are almost completely sorted between consecutive frames (temporal coherence)."
    ],
    patterns: ["In-Place Sorting", "Adjacent Comparison", "Quadratic Time"]
  }
};

