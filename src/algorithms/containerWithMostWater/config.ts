import type { AlgorithmConfig } from "@/types";

export const containerWithMostWaterConfig: AlgorithmConfig = {
  id: "container-with-most-water",
  title: "Container With Most Water",
  category: "Two Pointers",
  categoryIcon: "glass-water",
  difficulty: "Medium",
  description:
    "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container, such that the container contains the most water.",
  pseudocode: [
    { code: "function maxArea(height):", indent: 0 },
    { code: "left = 0", indent: 1 },
    { code: "right = height.length - 1", indent: 1 },
    { code: "max_area = 0", indent: 1 },
    { code: "while left < right:", indent: 1 },
    { code: "width = right - left", indent: 2 },
    { code: "current_height = min(height[left], height[right])", indent: 2 },
    { code: "current_area = width * current_height", indent: 2 },
    { code: "max_area = max(max_area, current_area)", indent: 2 },
    { code: "if height[left] < height[right]:", indent: 2 },
    { code: "left++", indent: 3 },
    { code: "else:", indent: 2 },
    { code: "right--", indent: 3 },
    { code: "return max_area", indent: 1 },
  ],
  problemContext: {
    statement: "You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i`th line are `(i, 0)` and `(i, height[i])`. Find two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store.",
    examples: [
      {
        input: "height = [1, 8, 6, 2, 5, 4, 8, 3, 7]",
        output: "49",
        explanation: "The vertical lines at index 1 (height 8) and index 8 (height 7) form a container of width 8 - 1 = 7. The height is bounded by the shorter line (7). Area = 7 * 7 = 49."
      },
      {
        input: "height = [1, 1]",
        output: "1",
        explanation: "The two lines at index 0 and 1 have height 1. Width = 1, height = 1. Area = 1 * 1 = 1."
      }
    ],
    intuitionPrompt: "The volume of water is limited by the shorter line. If you start with the widest possible container (pointers at the far left and right), moving the pointer of the TALLER line inwards will only decrease the width without ever increasing the height barrier! To find a larger area, you MUST move the pointer of the SHORTER line inwards.",
    approaches: [
      {
        name: "Brute Force (All Line Pairs)",
        complexity: "O(N²)",
        spaceComplexity: "O(1)",
        isOptimal: false,
        description: "Check every possible pair of lines `i` and `j`. Calculate the area as `(j - i) * min(height[i], height[j])` and track the maximum area. This results in Time Limit Exceeded (TLE) on large inputs."
      },
      {
        name: "Greedy Two Pointers",
        complexity: "O(N)",
        spaceComplexity: "O(1)",
        isOptimal: true,
        description: "Initialize `left = 0` and `right = n - 1`. Calculate the area between the two pointers and update `max_area`. To explore better potential containers, advance the pointer that points to the shorter line (`height[left] < height[right] ? left++ : right--`). Continue until the pointers collide."
      }
    ],
    realWorldApplications: [
      "Civil Engineering & Hydraulics: Optimizing dam placements, reservoir boundaries, or retention basin walls to maximize water storage capacity across uneven terrain.",
      "Architectural Design & Lighting: Calculating maximum un-obscured cross-sectional areas between supporting pillars or structural walls.",
      "Histogram & Packaging Optimization: Determining optimal bounding box layouts for packing items or selecting maximum capacity containers in logistics."
    ],
    patterns: ["Two Pointers", "Greedy", "Array", "Min-Max Optimization"]
  },
};
