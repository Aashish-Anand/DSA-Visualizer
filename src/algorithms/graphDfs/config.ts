import type { AlgorithmConfig } from "@/types";
import { runGraphDfsExperiment } from "./generator";

export const graphDfsConfig: AlgorithmConfig = {
  id: "graph-dfs",
  title: "Graph DFS",
  category: "Graphs",
  categoryIcon: "network",
  description: "Depth-First Search (DFS) for a graph explores as far as possible along each branch before backtracking. It uses a call stack (recursion) to keep track of nodes.",
  difficulty: "Medium",
  pseudocode: [
    { code: "function dfs_all(graph):", indent: 0 },
    { code: "for each node in graph:", indent: 1 },
    { code: "if node is not visited:", indent: 2 },
    { code: "dfs(node)", indent: 3 },
    { code: "", indent: 0 },
    { code: "function dfs(node):", indent: 0 },
    { code: "if node is visited return", indent: 1 },
    { code: "mark node as visited", indent: 1 },
    { code: "for each neighbor in graph[node]:", indent: 1 },
    { code: "dfs(neighbor)", indent: 2 }
  ],
  complexityExplorer: {
    trackedMetrics: ["operations", "comparisons", "recursiveCalls", "reads", "writes"],
    storyParagraphs: [
      "In a Graph DFS, similar to BFS, we visit every vertex exactly once, and inspect every edge exactly once. Thus, the time complexity is proportional to the number of vertices and edges, yielding O(V + E).",
      "The space complexity is defined by the maximum depth of the call stack. In the worst case (e.g., a line graph), this depth can be V. The algorithm also needs space for the visited set, which takes O(V). Thus, the space complexity is O(V)."
    ],
    timeCases: { best: "O(V + E)", average: "O(V + E)", worst: "O(V + E)" },
    spaceCases: { best: "O(V)", average: "O(V)", worst: "O(V)" },
    inputSizeRange: { min: 3, max: 100, default: 20 },
    runExperiment: runGraphDfsExperiment,
  },
  problemContext: {
    statement: "Given an undirected or directed graph represented by an adjacency list and a starting node, perform Depth-First Search (DFS) to visit all reachable nodes. Traverse as deep as possible along each branch before backtracking.",
    examples: [
      {
        input: "graph = {0: [1, 2], 1: [2], 2: [0, 3], 3: [3]}, start = 2",
        output: "[2, 0, 1, 3]",
        explanation: "Starting from 2, visit neighbor 0, then 0's unvisited neighbor 1. Backtrack to 2 and visit 3."
      }
    ],
    intuitionPrompt: "Like navigating a maze by walking down a path until you hit a dead end, dropping breadcrumbs (marking visited) as you go, then stepping back to the last fork in the road to try another path!",
    approaches: [
      {
        name: "Recursive DFS",
        complexity: "O(V + E)",
        spaceComplexity: "O(V)",
        description: "Visit current node, mark visited. Recursively call DFS on each unvisited neighbor. Uses implicit call stack.",
        isOptimal: true
      },
      {
        name: "Iterative DFS with Stack",
        complexity: "O(V + E)",
        spaceComplexity: "O(V)",
        description: "Explicitly push nodes onto an LIFO stack data structure.",
        isOptimal: true
      }
    ],
    realWorldApplications: [
      "Topological sorting in build systems (e.g. Bazel, Make, Webpack).",
      "Cycle detection in directed and undirected graphs.",
      "Solving mazes and finding strongly connected components (Kosaraju / Tarjan algorithm)."
    ],
    patterns: ["Graph Traversal", "Depth-First Search", "Recursion", "Backtracking"]
  }
};
