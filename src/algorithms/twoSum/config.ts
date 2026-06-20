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
};
