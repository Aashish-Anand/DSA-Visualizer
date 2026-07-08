import type { AlgorithmConfig } from "@/types";
import { runThreeSumExperiment } from "./generator";

export const threeSumConfig: AlgorithmConfig = {
  id: "three-sum",
  title: "3 Sum",
  category: "Two Pointers",
  categoryIcon: "layers",
  difficulty: "Medium",
  description:
    "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0. The optimal approach uses sorting and the two-pointer technique to achieve O(N²) time complexity.",
  pseudocode: [
    { code: "function threeSum(nums):", indent: 0 },
    { code: "nums.sort()", indent: 1 },
    { code: "for i from 0 to nums.length - 3:", indent: 1 },
    { code: "if i > 0 and nums[i] == nums[i-1]: continue", indent: 2 },
    { code: "left = i + 1", indent: 2 },
    { code: "right = nums.length - 1", indent: 2 },
    { code: "while left < right:", indent: 2 },
    { code: "sum = nums[i] + nums[left] + nums[right]", indent: 3 },
    { code: "if sum == 0:", indent: 3 },
    { code: "add [nums[i], nums[left], nums[right]] to results", indent: 4 },
    { code: "left++; right--", indent: 4 },
    { code: "while left < right and nums[left] == nums[left-1]: left++", indent: 4 },
    { code: "while left < right and nums[right] == nums[right+1]: right--", indent: 4 },
    { code: "else if sum < 0:", indent: 3 },
    { code: "left++", indent: 4 },
    { code: "else:", indent: 3 },
    { code: "right--", indent: 4 },
    { code: "return results", indent: 1 },
  ],
  problemContext: {
    statement: "Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`. Notice that the solution set must not contain duplicate triplets.",
    examples: [
      {
        input: "nums = [-1, 0, 1, 2, -1, -4]",
        output: "[[-1, -1, 2], [-1, 0, 1]]",
        explanation: "nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0. nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0. nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0. The distinct triplets are [-1, 0, 1] and [-1, -1, 2]."
      },
      {
        input: "nums = [0, 1, 1]",
        output: "[]",
        explanation: "The only possible triplet does not sum up to 0."
      },
      {
        input: "nums = [0, 0, 0]",
        output: "[[0, 0, 0]]",
        explanation: "The only possible triplet sums up to 0."
      }
    ],
    intuitionPrompt: "If we fix one number `nums[i]`, the problem reduces to finding two numbers that sum to `-nums[i]`, which is exactly Two Sum! By sorting the array first, we can use two pointers (`left` and `right`) to find pairs in O(N) time and easily skip duplicate numbers to avoid duplicate triplets.",
    approaches: [
      {
        name: "Brute Force (Three Nested Loops)",
        complexity: "O(N³)",
        spaceComplexity: "O(1)",
        isOptimal: false,
        description: "Check all possible triplets using three nested loops. To ensure unique triplets, sort each triplet and store them in a hash set. This is extremely slow and causes Time Limit Exceeded (TLE)."
      },
      {
        name: "Hash Map Lookup",
        complexity: "O(N²)",
        spaceComplexity: "O(N)",
        isOptimal: false,
        description: "Fix two elements using two nested loops and look up the required third element in a hash table. While faster than O(N³), handling duplicate triplets requires complex hashing and extra memory."
      },
      {
        name: "Sorting + Two Pointers",
        complexity: "O(N²)",
        spaceComplexity: "O(1)",
        isOptimal: true,
        description: "Sort the array first. Iterate through the array with pointer `i`. For each `nums[i]`, use two pointers (`left = i + 1` and `right = n - 1`) to find pairs that sum to `-nums[i]`. Increment/decrement pointers based on the sum and skip identical adjacent values to avoid duplicate triplets."
      }
    ],
    realWorldApplications: [
      "Computer Graphics & Physics Simulations: Calculating equilibrium points in 3D physical modeling where three force vectors must cancel each other out to zero.",
      "Computational Geometry: Identifying collinear points or balancing triangular mesh nodes in 3D rendering engines.",
      "Cryptographic Analysis & Subset Sum: Solving zero-sum sub-problems in knapsack or subset-sum variants within security protocols."
    ],
    patterns: ["Two Pointers", "Sorting", "Fix & Search", "Array"]
  },
  complexityExplorer: {
    trackedMetrics: ["comparisons", "operations"],
    storyParagraphs: [
      "The optimal approach for 3Sum relies heavily on sorting the array first, which takes O(N log N) time.",
      "Once sorted, it iterates through the array, fixing one number and using two pointers to find the remaining two numbers that sum to zero. This inner search takes O(N) time.",
      "Because the O(N) search is performed for each of the N elements, the total time complexity is O(N²). The space complexity is generally O(1) or O(log N) depending on the sorting algorithm used."
    ],
    timeCases: { best: "O(N²)", average: "O(N²)", worst: "O(N²)" },
    spaceCases: { best: "O(1)", average: "O(1)", worst: "O(1)" },
    inputSizeRange: { min: 10, max: 2000, default: 100 },
    runExperiment: runThreeSumExperiment,
  },
};
