import type { AlgorithmConfig, PseudocodeLine } from "@/types";
import { runTwoSumExperiment } from "./generator";

export const twoSumPseudocode: PseudocodeLine[] = [
  { code: "function twoSum(nums, target):", indent: 0 },
  { code: "for i from 0 to nums.length - 1:", indent: 1 },
  { code: "complement = target - nums[i]", indent: 2 },
  { code: "if complement in hashMap:", indent: 2 },
  { code: "return [hashMap[complement], i]", indent: 3 },
  { code: "hashMap[nums[i]] = i", indent: 2 },
  { code: "return []  // No solution found", indent: 1 },
];

export const twoSumConfig: AlgorithmConfig = {
  id: "two-sum",
  title: "Two Sum",
  category: "Arrays",
  categoryIcon: "brackets",
  description:
    "Given an array of integers and a target, find two numbers that add up to the target. The HashMap approach gives us O(n) time complexity by storing previously seen numbers.",
  pseudocode: twoSumPseudocode,
  python: [
    { code: "def twoSum(nums, target):", indent: 0 },
    { code: "for i in range(len(nums)):", indent: 1 },
    { code: "complement = target - nums[i]", indent: 2 },
    { code: "if complement in hash_map:", indent: 2 },
    { code: "return [hash_map[complement], i]", indent: 3 },
    { code: "hash_map[nums[i]] = i", indent: 2 },
    { code: "return []", indent: 1 },
  ],
  java: [
    { code: "public int[] twoSum(int[] nums, int target) {", indent: 0 },
    { code: "for (int i = 0; i < nums.length; i++) {", indent: 1 },
    { code: "int comp = target - nums[i];", indent: 2 },
    { code: "if (map.containsKey(comp)) {", indent: 2 },
    { code: "return new int[] { map.get(comp), i };", indent: 3 },
    { code: "map.put(nums[i], i);", indent: 2 },
    { code: "return new int[] {};", indent: 1 },
  ],
  cpp: [
    { code: "vector<int> twoSum(vector<int>& nums, int target) {", indent: 0 },
    { code: "for (int i = 0; i < nums.size(); i++) {", indent: 1 },
    { code: "int comp = target - nums[i];", indent: 2 },
    { code: "if (map.count(comp)) {", indent: 2 },
    { code: "return {map[comp], i};", indent: 3 },
    { code: "map[nums[i]] = i;", indent: 2 },
    { code: "return {};", indent: 1 },
  ],
  difficulty: "Easy",
  complexityExplorer: {
    trackedMetrics: ["hashmapLookups", "hashmapInserts", "comparisons", "operations"],
    storyParagraphs: [
      "Why is Two Sum so efficient with a HashMap?",
      "The brute-force approach would check every possible pair — that's n × (n-1) / 2 checks, giving us O(n²) time.",
      "But with a HashMap, we trade space for speed. Each lookup and insert takes constant time — O(1).",
      "We only loop through the array once. For each element, we ask: \"Have I seen my complement before?\" That single lookup replaces an entire inner loop.",
      "Double the input? Double the work. That's the beauty of O(n) — linear growth instead of quadratic explosion.",
      "The cost is memory: we might store up to n entries in the HashMap. But this space-time tradeoff is almost always worth it."
    ],
    timeCases: { best: "O(1)", average: "O(n)", worst: "O(n)" },
    spaceCases: { best: "O(1)", average: "O(n)", worst: "O(n)" },
    visualExplanationId: "hashmap-lookup",
    inputSizeRange: { min: 5, max: 100, default: 10 },
    runExperiment: runTwoSumExperiment,
  },
  problemContext: {
    statement: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.",
    examples: [
      {
        input: "nums = [2, 7, 11, 15], target = 9",
        output: "[0, 1]",
        explanation: "nums[0] + nums[1] == 2 + 7 == 9, so we return [0, 1]."
      },
      {
        input: "nums = [3, 2, 4], target = 6",
        output: "[1, 2]",
        explanation: "nums[1] + nums[2] == 2 + 4 == 6, so we return [1, 2]."
      }
    ],
    intuitionPrompt: "If you were scanning the array by hand, for every number you look at, you instantly know what 'partner' number you need to reach the target. What if you wrote down every number you've seen so far in a notepad? Then you could instantly check if the required partner is already in your notes!",
    approaches: [
      {
        name: "Brute Force (Two Loops)",
        complexity: "O(n²)",
        spaceComplexity: "O(1)",
        description: "Check every possible pair of numbers in the array using nested loops. If `nums[i] + nums[j] == target`, return `[i, j]`. This is very slow for large arrays.",
        isOptimal: false
      },
      {
        name: "Two Pointers (Sorting)",
        complexity: "O(n log n)",
        spaceComplexity: "O(n)",
        description: "Store original indices, sort the array, and use two pointers (left and right) to find the sum. Faster than brute force, but sorting modifies the order and takes O(n log n) time.",
        isOptimal: false
      },
      {
        name: "One-Pass Hash Map",
        complexity: "O(n)",
        spaceComplexity: "O(n)",
        description: "As we iterate through the array, we calculate `complement = target - nums[i]`. We check if this complement exists in our Hash Map. If it does, we found our pair! If not, we store `nums[i]` and its index in the map. This achieves blazing fast linear time.",
        isOptimal: true
      }
    ],
    realWorldApplications: [
      "Financial systems matching buy and sell orders that equal a specific target transaction amount.",
      "Game development for pair matching mechanics or inventory weight optimization.",
      "Data deduplication and two-factor correlation in analytics engines."
    ],
    patterns: ["Hash Map", "Array", "Space-Time Tradeoff"]
  }
};

