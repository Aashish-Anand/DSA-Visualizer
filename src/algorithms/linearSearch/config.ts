import type { AlgorithmConfig } from "@/types";

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
    { code: "return -1", indent: 1 },
  ],
};
