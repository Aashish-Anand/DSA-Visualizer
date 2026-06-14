import type { AlgorithmConfig } from "@/types";

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
  ]
};
