import type { AlgorithmConfig } from "@/types";
import { runBinarySearchExperiment } from "./generator";

export const binarySearchConfig: AlgorithmConfig = {
  id: "binary-search",
  title: "Binary Search",
  category: "Searching",
  categoryIcon: "Search",
  description:
    "Binary search compares the target value to the middle element of the array. If they are unequal, the half in which the target cannot lie is eliminated and the search continues on the remaining half.",
  difficulty: "Easy",
  pseudocode: [
    { code: "function binarySearch(arr, target):", indent: 0 },
    { code: "low = 0, high = arr.length - 1", indent: 1 },
    { code: "while low <= high:", indent: 1 },
    { code: "mid = (low + high) / 2", indent: 2 },
    { code: "if arr[mid] == target:", indent: 2 },
    { code: "return mid", indent: 3 },
    { code: "if arr[mid] < target:", indent: 2 },
    { code: "low = mid + 1", indent: 3 },
    { code: "else:", indent: 2 },
    { code: "high = mid - 1", indent: 3 },
    { code: "return -1", indent: 1 },
  ],
  python: [
    { code: "def binarySearch(arr, target):", indent: 0 },
    { code: "low, high = 0, len(arr) - 1", indent: 1 },
    { code: "while low <= high:", indent: 1 },
    { code: "mid = (low + high) // 2", indent: 2 },
    { code: "if arr[mid] == target:", indent: 2 },
    { code: "return mid", indent: 3 },
    { code: "elif arr[mid] < target:", indent: 2 },
    { code: "low = mid + 1", indent: 3 },
    { code: "else:", indent: 2 },
    { code: "high = mid - 1", indent: 3 },
    { code: "return -1", indent: 1 },
  ],
  java: [
    { code: "int binarySearch(int[] arr, int target) {", indent: 0 },
    { code: "int low = 0, high = arr.length - 1;", indent: 1 },
    { code: "while (low <= high) {", indent: 1 },
    { code: "int mid = low + (high - low) / 2;", indent: 2 },
    { code: "if (arr[mid] == target)", indent: 2 },
    { code: "return mid;", indent: 3 },
    { code: "if (arr[mid] < target)", indent: 2 },
    { code: "low = mid + 1;", indent: 3 },
    { code: "else", indent: 2 },
    { code: "high = mid - 1;", indent: 3 },
    { code: "return -1;", indent: 1 },
  ],
  cpp: [
    { code: "int binarySearch(vector<int>& arr, int target) {", indent: 0 },
    { code: "int low = 0, high = arr.size() - 1;", indent: 1 },
    { code: "while (low <= high) {", indent: 1 },
    { code: "int mid = low + (high - low) / 2;", indent: 2 },
    { code: "if (arr[mid] == target)", indent: 2 },
    { code: "return mid;", indent: 3 },
    { code: "if (arr[mid] < target)", indent: 2 },
    { code: "low = mid + 1;", indent: 3 },
    { code: "else", indent: 2 },
    { code: "high = mid - 1;", indent: 3 },
    { code: "return -1;", indent: 1 },
  ],
  complexityExplorer: {
    trackedMetrics: ["comparisons", "operations"],
    storyParagraphs: [
      "Binary Search is a textbook example of O(log N) time complexity. By requiring the array to be sorted, we can eliminate half of the remaining search space with every single comparison.",
      "If we have 1,000 items, we can find the target in at most 10 steps. If we have 1,000,000 items, it takes at most 20 steps! This logarithmic growth makes Binary Search incredibly fast for large datasets.",
      "The tradeoff is that the array must be sorted first, which takes O(N log N) time, so it's only worth it if we are searching multiple times."
    ],
    timeCases: { best: "O(1)", average: "O(log N)", worst: "O(log N)" },
    spaceCases: { best: "O(1)", average: "O(1)", worst: "O(1)" },
    inputSizeRange: { min: 10, max: 10000, default: 1000 },
    runExperiment: runBinarySearchExperiment,
  },
  problemContext: {
    statement: "Given a sorted array of distinct integers `arr` and a target value `target`, return the index of `target` if it is present in the array. If not found, return `-1`. You must write an algorithm with `O(log n)` runtime complexity.",
    examples: [
      {
        input: "arr = [-1, 0, 3, 5, 9, 12], target = 9",
        output: "4",
        explanation: "9 exists in arr and its index is 4."
      },
      {
        input: "arr = [-1, 0, 3, 5, 9, 12], target = 2",
        output: "-1",
        explanation: "2 does not exist in arr so return -1."
      }
    ],
    intuitionPrompt: "Imagine searching for a word in a physical dictionary. You wouldn't check page 1, then page 2, then page 3. Instead, you open to the middle page. If your word comes alphabetically before that page, you discard the entire right half of the book and repeat on the left!",
    approaches: [
      {
        name: "Linear Search",
        complexity: "O(n)",
        spaceComplexity: "O(1)",
        description: "Scan every element from index 0 to n-1 sequentially until target is found.",
        isOptimal: false
      },
      {
        name: "Binary Search (Iterative)",
        complexity: "O(log n)",
        spaceComplexity: "O(1)",
        description: "Maintain low and high pointers. Calculate mid = low + (high - low) / 2. Halve search space based on whether arr[mid] < target or arr[mid] > target.",
        isOptimal: true
      }
    ],
    realWorldApplications: [
      "Database Indexing (B-Trees and sorted page searching).",
      "Git Bisect (finding the commit that introduced a bug via binary search over commit history).",
      "Standard library implementations (e.g. C++ std::lower_bound, Java Arrays.binarySearch)."
    ],
    patterns: ["Binary Search", "Two Pointers", "Divide and Conquer"]
  }
};

