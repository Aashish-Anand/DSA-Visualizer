import type { AlgorithmConfig } from "@/types";

export const trappingRainWaterConfig: AlgorithmConfig = {
  id: "trapping-rain-water",
  title: "Trapping Rain Water",
  category: "Two Pointers",
  categoryIcon: "droplets",
  difficulty: "Hard",
  description:
    "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining. This optimal approach uses two pointers to achieve O(N) time and O(1) space.",
  pseudocode: [
    { code: "function trap(height):", indent: 0 },
    { code: "left = 0", indent: 1 },
    { code: "right = height.length - 1", indent: 1 },
    { code: "leftMax = 0", indent: 1 },
    { code: "rightMax = 0", indent: 1 },
    { code: "totalWater = 0", indent: 1 },
    { code: "while left < right:", indent: 1 },
    { code: "if height[left] < height[right]:", indent: 2 },
    { code: "if height[left] >= leftMax:", indent: 3 },
    { code: "leftMax = height[left]", indent: 4 },
    { code: "else:", indent: 3 },
    { code: "totalWater += leftMax - height[left]", indent: 4 },
    { code: "left++", indent: 3 },
    { code: "else:", indent: 2 },
    { code: "if height[right] >= rightMax:", indent: 3 },
    { code: "rightMax = height[right]", indent: 4 },
    { code: "else:", indent: 3 },
    { code: "totalWater += rightMax - height[right]", indent: 4 },
    { code: "right--", indent: 3 },
    { code: "return totalWater", indent: 1 },
  ],
};
