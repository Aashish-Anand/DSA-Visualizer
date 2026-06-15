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
};
