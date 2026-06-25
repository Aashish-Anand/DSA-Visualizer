import type { AlgorithmConfig } from "@/types";

export const fourSumConfig: AlgorithmConfig = {
  id: "four-sum",
  title: "4 Sum",
  category: "Two Pointers",
  categoryIcon: "layers",
  difficulty: "Medium",
  description:
    "Given an array nums of n integers, return an array of all the unique quadruplets [nums[i], nums[j], nums[k], nums[l]] such that the sum is equal to target. The optimal approach uses sorting and two nested loops with the two-pointer technique to achieve O(N³) time complexity.",
  pseudocode: [
    { code: "function fourSum(nums, target):", indent: 0 },
    { code: "nums.sort()", indent: 1 },
    { code: "for i from 0 to nums.length - 4:", indent: 1 },
    { code: "if i > 0 and nums[i] == nums[i-1]: continue", indent: 2 },
    { code: "for j from i + 1 to nums.length - 3:", indent: 2 },
    { code: "if j > i + 1 and nums[j] == nums[j-1]: continue", indent: 3 },
    { code: "left = j + 1", indent: 3 },
    { code: "right = nums.length - 1", indent: 3 },
    { code: "while left < right:", indent: 3 },
    { code: "sum = nums[i] + nums[j] + nums[left] + nums[right]", indent: 4 },
    { code: "if sum == target:", indent: 4 },
    { code: "add [nums[i], nums[j], nums[left], nums[right]] to results", indent: 5 },
    { code: "left++; right--", indent: 5 },
    { code: "while left < right and nums[left] == nums[left-1]: left++", indent: 5 },
    { code: "while left < right and nums[right] == nums[right+1]: right--", indent: 5 },
    { code: "else if sum < target:", indent: 4 },
    { code: "left++", indent: 5 },
    { code: "else:", indent: 4 },
    { code: "right--", indent: 5 },
    { code: "return results", indent: 1 },
  ],
  problemContext: {
    statement: "Given an array `nums` of `n` integers, return an array of all the unique quadruplets `[nums[i], nums[j], nums[k], nums[l]]` such that `i`, `j`, `k`, and `l` are distinct, and `nums[i] + nums[j] + nums[k] + nums[l] == target`. The solution set must not contain duplicate quadruplets.",
    examples: [
      {
        input: "nums = [1, 0, -1, 0, -2, 2], target = 0",
        output: "[[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]",
        explanation: "These three distinct quadruplets all sum up to the target value 0."
      },
      {
        input: "nums = [2, 2, 2, 2, 2], target = 8",
        output: "[[2, 2, 2, 2]]",
        explanation: "Even though there are five 2s, the unique quadruplet is [2, 2, 2, 2]."
      }
    ],
    intuitionPrompt: "Extend the logic of 3Sum! If you fix TWO numbers (`nums[i]` and `nums[j]`) using two outer loops, you are left with finding two remaining numbers that sum to `target - (nums[i] + nums[j])`. Now you can use the super-fast Two Pointers approach on the remainder of the array!",
    approaches: [
      {
        name: "Brute Force (Four Nested Loops)",
        complexity: "O(N⁴)",
        spaceComplexity: "O(1)",
        isOptimal: false,
        description: "Use four nested loops to evaluate every possible quadruplet combination. Store them in a set to eliminate duplicates. This is immensely slow for arrays larger than a few dozen elements."
      },
      {
        name: "Pair Sums Hash Map",
        complexity: "O(N²)",
        spaceComplexity: "O(N²)",
        isOptimal: false,
        description: "Store the sum of all pairs `(nums[i] + nums[j])` in a hash table. Then iterate through pairs again to find if `target - sum` exists in the map. Ensuring all four indices are distinct and avoiding duplicate quadruplets makes this implementation highly complex."
      },
      {
        name: "Sorting + Nested Two Pointers",
        complexity: "O(N³)",
        spaceComplexity: "O(1)",
        isOptimal: true,
        description: "Sort the array first. Use two nested outer loops for indices `i` and `j`. For each pair, set `left = j + 1` and `right = n - 1`. Check the sum and move pointers inwards while skipping duplicate numbers at all four pointer levels to guarantee unique quadruplets."
      }
    ],
    realWorldApplications: [
      "Robotics Kinematics: Solving inverse kinematics equations where four robotic joints or actuators must align to reach a precise target coordinate in 4D/3D space.",
      "Financial Portfolio Balancing: Selecting combinations of four distinct assets or securities that perfectly match a target risk or yield profile.",
      "General K-Sum Generalization: Providing the structural foundation for solving generalized k-sum problems in advanced combinatorial optimization."
    ],
    patterns: ["Two Pointers", "Sorting", "K-Sum Pattern", "Array"]
  },
};
