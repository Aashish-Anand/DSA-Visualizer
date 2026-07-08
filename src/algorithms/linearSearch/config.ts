import type { AlgorithmConfig } from "@/types";
import { runLinearSearchExperiment } from "./generator";

export const linearSearchConfig: AlgorithmConfig = {
  id: "linear-search",
  title: "Linear Search",
  category: "Searching",
  categoryIcon: "Search",
  description:
    "Linear search sequentially checks each element of the list until a match is found or the whole list has been searched.",
  difficulty: "Easy",
  pseudocode: [
    { code: "function linearSearch(arr, target):", indent: 0 },
    { code: "for i from 0 to arr.length - 1:", indent: 1 },
    { code: "if arr[i] == target:", indent: 2 },
    { code: "return i", indent: 3 },
    { code: "return -1;", indent: 1 },
  ],
  complexityExplorer: {
    trackedMetrics: ["comparisons", "operations"],
    storyParagraphs: [
      "Linear Search is the most basic search algorithm. We simply check every element one by one until we find our target.",
      "Because we might have to check every single element in the worst case (if the target is at the very end or doesn't exist), the time complexity is O(N).",
      "While it is slower than Binary Search, Linear Search is the only option when the data is unsorted."
    ],
    timeCases: { best: "O(1)", average: "O(N)", worst: "O(N)" },
    spaceCases: { best: "O(1)", average: "O(1)", worst: "O(1)" },
    inputSizeRange: { min: 10, max: 2000, default: 100 },
    runExperiment: runLinearSearchExperiment,
  },
};
