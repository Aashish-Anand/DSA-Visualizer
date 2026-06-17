import type { AlgorithmConfig, PseudocodeLine } from "@/types";

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
  complexity: {
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    timeExplanation: [
      "We traverse the list containing n elements exactly once.",
      "Each lookup in the hash map costs only O(1) time.",
      "Therefore, the overall time complexity is strictly linear, O(n)."
    ],
    spaceExplanation: [
      "The extra space required depends on the number of items stored in the hash map.",
      "In the worst case, we might need to insert up to n elements into the map before finding a pair.",
      "Thus, the space complexity scales linearly as O(n)."
    ]
  }
};
