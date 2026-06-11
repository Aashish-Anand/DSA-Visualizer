import type { AlgorithmConfig } from "@/types";

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
};
