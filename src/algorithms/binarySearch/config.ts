import type { AlgorithmConfig } from "@/types";

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
  complexity: {
    time: "O(log n)",
    space: "O(1)",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    timeExplanation: [
      "In each step, the algorithm compares the target with the middle element.",
      "If it's not a match, half of the array is eliminated from the search space.",
      "Because the search space is halved every time, it takes at most log₂(n) steps to find the target or conclude it's missing."
    ],
    spaceExplanation: [
      "Binary search only requires a few pointers (low, high, mid) to keep track of the search space.",
      "Therefore, the memory required is constant, independent of the input array size."
    ],
    timeAnimationId: "logarithmic"
  }
};
