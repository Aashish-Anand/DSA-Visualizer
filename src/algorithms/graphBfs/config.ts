import type { AlgorithmConfig } from "@/types";

export const graphBfsConfig: AlgorithmConfig = {
  id: "graph-bfs",
  title: "Graph BFS",
  category: "Graphs",
  categoryIcon: "network",
  description: "Breadth-First Search (BFS) for a graph explores nodes level by level starting from a source node. It uses a queue to keep track of nodes to visit, ensuring that it visits all neighbors of a node before moving deeper.",
  difficulty: "Medium",
  pseudocode: [
    { code: "function bfs_all(graph):", indent: 0 },
    { code: "for each node in graph:", indent: 1 },
    { code: "if node is not visited:", indent: 2 },
    { code: "bfs(graph, node)", indent: 3 },
    { code: "", indent: 0 },
    { code: "function bfs(graph, start):", indent: 0 },
    { code: "queue.enqueue(start)", indent: 1 },
    { code: "mark start as visited", indent: 1 },
    { code: "while queue is not empty:", indent: 1 },
    { code: "node = queue.dequeue()", indent: 2 },
    { code: "visit(node)", indent: 2 },
    { code: "for each neighbor in graph[node]:", indent: 2 },
    { code: "if neighbor is not visited:", indent: 3 },
    { code: "mark neighbor as visited", indent: 4 },
    { code: "queue.enqueue(neighbor)", indent: 4 }
  ]
};
