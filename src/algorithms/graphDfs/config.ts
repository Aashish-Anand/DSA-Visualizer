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
  }
};
