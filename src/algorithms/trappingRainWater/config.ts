import type { AlgorithmConfig } from "@/types";
import { runTrappingRainWaterExperiment } from "./generator";

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
  problemContext: {
    statement: "Given `n` non-negative integers representing an elevation map where the width of each bar is `1`, compute how much water it can trap after raining.",
    referenceImage: "/trapping_rain_water_illustration.svg",
    examples: [
      {
        input: "height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]",
        output: "6",
        explanation: "Water is trapped between the bars: 1 unit at index 2, 1 unit at index 4, 2 units at index 5, 1 unit at index 6, and 1 unit at index 9. Total = 1 + 1 + 2 + 1 + 1 = 6."
      },
      {
        input: "height = [4, 2, 0, 3, 2, 5]",
        output: "9",
        explanation: "Trapped water: 2 units at index 1, 4 units at index 2, 1 unit at index 3, 2 units at index 4. Total = 2 + 4 + 1 + 2 = 9."
      }
    ],
    intuitionPrompt: "For any single bar, the water it can trap above it is determined by the tallest bar to its left and the tallest bar to its right (`min(max_left, max_right) - height[i]`). Instead of finding these maximums independently for every bar, we can dynamically track `leftMax` and `rightMax` using two pointers moving inwards from both sides!",
    approaches: [
      {
        name: "Brute Force",
        complexity: "O(N²)",
        spaceComplexity: "O(1)",
        isOptimal: false,
        description: "For every element `i`, iterate to the left to find `leftMax` and iterate to the right to find `rightMax`. Water trapped at `i` is `min(leftMax, rightMax) - height[i]`. This requires scanning the array anew for every single position."
      },
      {
        name: "Dynamic Programming (Prefix & Suffix Arrays)",
        complexity: "O(N)",
        spaceComplexity: "O(N)",
        isOptimal: false,
        description: "Precompute two arrays: `leftMax[]` and `rightMax[]`. In one pass from left to right, populate `leftMax[i]`. In another pass from right to left, populate `rightMax[i]`. Finally, iterate through the array to calculate trapped water. This achieves linear time but requires O(N) extra memory."
      },
      {
        name: "Monotonic Stack",
        complexity: "O(N)",
        spaceComplexity: "O(N)",
        isOptimal: false,
        description: "Use a stack to store indices of bars. When you encounter a bar taller than the top of the stack, it means a bounded hollow basin has been found. Pop from the stack and calculate the bounded water width and height."
      },
      {
        name: "Two Pointers (Optimal)",
        complexity: "O(N)",
        spaceComplexity: "O(1)",
        isOptimal: true,
        description: "Maintain `left = 0`, `right = n - 1`, `leftMax = 0`, and `rightMax = 0`. If `height[left] < height[right]`, we know the water level at `left` is strictly bounded by `leftMax` (regardless of what happens further right!). Update `leftMax` or add `leftMax - height[left]` to total water, then `left++`. Otherwise, do the corresponding operations on the right side."
      }
    ],
    realWorldApplications: [
      "Topographical Hydrology & Flood Simulation: Analyzing terrain elevation maps to predict flood plain accumulation, puddle formation, or drainage basin volumes.",
      "Surface Roughness & Micro-Fluidics: Calculating lubricant or fluid retention capacity across microscopically rough mechanical surfaces.",
      "Optical & Radar Profiling: Processing altimeter or LiDAR elevation scans to determine concavity and volume capacity in geological surveys."
    ],
    patterns: ["Two Pointers", "Dynamic Programming", "Monotonic Stack", "Prefix-Suffix Max"]
  },
  complexityExplorer: {
    trackedMetrics: ["comparisons", "operations"],
    storyParagraphs: [
      "The optimal Two Pointers approach for Trapping Rain Water maintains left and right pointers moving inwards.",
      "At each step, it compares the current left and right heights. The side with the smaller height limits the water that can be trapped at its position, so it can be safely processed.",
      "Because each step processes exactly one element and then moves a pointer inwards, it guarantees an O(N) time complexity and requires only O(1) space."
    ],
    timeCases: { best: "O(N)", average: "O(N)", worst: "O(N)" },
    spaceCases: { best: "O(1)", average: "O(1)", worst: "O(1)" },
    inputSizeRange: { min: 10, max: 2000, default: 100 },
    runExperiment: runTrappingRainWaterExperiment,
  },
};
