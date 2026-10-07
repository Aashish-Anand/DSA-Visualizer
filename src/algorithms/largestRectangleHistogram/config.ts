import type { AlgorithmConfig } from "@/types";
import { runHistogramExperiment } from "./generator";

const lines = (code: string[], indents: number[]) => code.map((code, i) => ({ code, indent: indents[i] }));
export const histogramExamples = [[2, 1, 5, 6, 2, 3], [2, 4], [3, 3, 3], [0]];
export const histogramConfig: AlgorithmConfig = {
  id: "largest-rectangle-histogram", title: "Largest Rectangle in Histogram", category: "Stacks", categoryIcon: "layers", difficulty: "Hard",
  description: "Find the largest rectangle under adjacent width-1 bars using a monotonic stack.",
  pseudocode: lines([
    "function largestRectangle(heights):", "stack = []; best = 0", "for i = 0 to length(heights), inclusive:", "current = heights[i] if i < length(heights) else 0", "while stack is not empty and heights[stack.top] > current:", "popped = stack.pop()", "left = stack.top if stack is not empty else -1", "width = i - left - 1", "area = heights[popped] * width", "best = max(best, area)", "if i < length(heights): stack.push(i)", "return best"
  ], [0,1,1,2,2,3,3,3,3,3,2,1]),
  python: lines([
    "def largest_rectangle(heights):", "stack, best = [], 0", "for i in range(len(heights) + 1):", "current = heights[i] if i < len(heights) else 0", "while stack and heights[stack[-1]] > current:", "popped = stack.pop()", "left = stack[-1] if stack else -1", "width = i - left - 1", "area = heights[popped] * width", "best = max(best, area)", "if i < len(heights): stack.append(i)", "return best"
  ], [0,1,1,2,2,3,3,3,3,3,2,1]),
  java: lines([
    "long largestRectangle(int[] heights) {", "java.util.Deque<Integer> stack = new java.util.ArrayDeque<>(); long best = 0;", "for (int i = 0; i <= heights.length; i++) {", "int current = i < heights.length ? heights[i] : 0;", "while (!stack.isEmpty() && heights[stack.peek()] > current) {", "int popped = stack.pop();", "int left = stack.isEmpty() ? -1 : stack.peek();", "int width = i - left - 1;", "long area = (long) heights[popped] * width;", "best = Math.max(best, area);", "} if (i < heights.length) stack.push(i);", "} return best; }"
  ], [0,1,1,2,2,3,3,3,3,3,2,1]),
  cpp: lines([
    "long long largestRectangle(const std::vector<int>& heights) {", "std::stack<int> stack; long long best = 0;", "for (int i = 0; i <= static_cast<int>(heights.size()); ++i) {", "int current = i < static_cast<int>(heights.size()) ? heights[i] : 0;", "while (!stack.empty() && heights[stack.top()] > current) {", "int popped = stack.top(); stack.pop();", "int left = stack.empty() ? -1 : stack.top();", "int width = i - left - 1;", "long long area = 1LL * heights[popped] * width;", "best = std::max(best, area);", "} if (i < static_cast<int>(heights.size())) stack.push(i);", "} return best; }"
  ], [0,1,1,2,2,3,3,3,3,3,2,1]),
  problemContext: {
    statement: "Given nonnegative integer `heights`, each representing a histogram bar of width `1`, return the maximum area of a rectangle contained under consecutive bars. A rectangle's height cannot exceed the shortest bar it covers.",
    examples: [
      { input: "heights = [2, 1, 5, 6, 2, 3]", output: "10", explanation: "Bars at indices 2 and 3 support a rectangle of height 5 and width 2: area 10." },
      { input: "heights = [2, 4]", output: "4", explanation: "Either both bars at height 2, or the second bar at height 4, yields area 4." },
      { input: "heights = [3, 3, 3]", output: "9", explanation: "Equal heights can extend across the entire plateau: height 3 × width 3." },
      { input: "heights = [0]", output: "0", explanation: "A zero-height bar cannot support a positive-area rectangle." }
    ],
    intuitionPrompt: "Let each bar wait on a stack until a shorter bar arrives. That shorter bar fixes its right boundary. After popping, the new stack top fixes its left boundary. Equal heights may remain together; an earlier equal bar will eventually capture the full width. A virtual zero-height bar finishes the scan.",
    approaches: [
      { name: "Try every interval", complexity: "O(N²)", spaceComplexity: "O(1)", isOptimal: false, description: "For each left endpoint, extend the right endpoint while maintaining the minimum height. Calculate minimum height × interval width." },
      { name: "Monotonic stack", complexity: "O(N)", spaceComplexity: "O(N)", isOptimal: true, description: "Keep indices in nondecreasing height order. On a shorter bar, pop and measure each taller bar's widest rectangle. Each index enters once and leaves at most once." }
    ],
    realWorldApplications: ["Finding the largest contiguous rectangular region under a skyline or capacity profile.", "Building a maximal-rectangle solver for a binary matrix by treating each row as histogram heights."],
    patterns: ["Monotonic Stack", "Nearest Smaller Element", "Amortized Analysis"], relatedProblems: ["Trapping Rain Water", "Maximal Rectangle"]
  },
  complexityExplorer: {
    trackedMetrics: ["operations", "comparisons", "computedStates"], expectedGrowth: "linear",
    operationDefinition: "Operations count index pushes and pops. Comparisons count height comparisons when the stack is nonempty. Computed states count measured rectangles. The experiment uses a deterministic positive-height profile; every index is pushed and popped, giving 2N stack operations.",
    storyParagraphs: ["The nested while loop does not make this quadratic. A single scan position may pop many bars, but each index can be popped only once across the entire run.", "There are N pushes and at most N pops, so total stack work is O(N). Zero-height indices can remain after the sentinel because their area is already zero.", "A rising or equal-height profile can keep N indices on the stack, requiring O(N) auxiliary space in the worst case. A strictly falling positive profile keeps only one index at a time."],
    timeCases: { best: "O(N)", average: "O(N)", worst: "O(N)" }, spaceCases: { best: "O(1)", average: "O(N)", worst: "O(N)" },
    inputSizeRange: { min: 10, max: 2000, default: 100 }, runExperiment: runHistogramExperiment
  }
};
