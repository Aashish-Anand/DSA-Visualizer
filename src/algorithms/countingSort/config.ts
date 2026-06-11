import type { AlgorithmConfig } from "@/types";

export const countingSortConfig: AlgorithmConfig = {
  id: "counting-sort",
  title: "Counting Sort",
  category: "Sorting",
  categoryIcon: "ArrowDownUp",
  description:
    "Counting Sort is an integer sorting algorithm that operates by counting the number of objects that possess distinct key values, and applying prefix sum to those counts to determine the positions of each key value in the output sequence.",
  difficulty: "Medium",
  pseudocode: [
    { code: "function countingSort(arr):", indent: 0 },
    { code: "max_val = max(arr)", indent: 1 },
    { code: "count = array of zeros of size max_val + 1", indent: 1 },
    { code: "output = array of size arr.length", indent: 1 },
    { code: "for each num in arr:", indent: 1 },
    { code: "count[num]++", indent: 2 },
    { code: "for i from 1 to max_val:", indent: 1 },
    { code: "count[i] += count[i - 1]", indent: 2 },
    { code: "for i from arr.length - 1 down to 0:", indent: 1 },
    { code: "num = arr[i]", indent: 2 },
    { code: "output[count[num] - 1] = num", indent: 2 },
    { code: "count[num]--", indent: 2 },
    { code: "return output", indent: 1 },
  ],
};
