import type { AlgorithmConfig } from "@/types";
import { runGraphBfsExperiment } from "./generator";

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
  ],
  problemContext: {
    statement: "Given an undirected or directed graph and a starting node `source`, explore all reachable vertices in Breadth-First order. You must visit all immediate neighbors of a node before moving on to neighbors of neighbors (exploring level by level).",
    examples: [
      {
        input: "Graph = {0: [1, 2], 1: [0, 3], 2: [0, 3], 3: [1, 2]}, start = 0",
        output: "[0, 1, 2, 3] (or [0, 2, 1, 3])",
        explanation: "Starting at 0 (Level 0), we visit its immediate neighbors 1 and 2 (Level 1). Then we visit their unvisited neighbor 3 (Level 2)."
      },
      {
        input: "Graph = {A: [B, C], B: [D], C: [], D: []}, start = A",
        output: "[A, B, C, D]",
        explanation: "Level 0: A. Level 1: B, C. Level 2: D."
      }
    ],
    intuitionPrompt: "Imagine dropping a pebble in a calm pond. The ripples expand outward in perfect concentric rings. Breadth-First Search behaves exactly like those ripples — exploring everything 1 step away, then 2 steps away, then 3 steps away, guaranteeing you find the shortest path in an unweighted graph!",
    approaches: [
      {
        name: "Breadth-First Search (Queue)",
        complexity: "O(V + E)",
        spaceComplexity: "O(V)",
        description: "Use a First-In-First-Out (FIFO) Queue. Push the starting node, mark it as visited, and loop while the queue isn't empty. Dequeue a node, explore its unvisited neighbors, mark them, and enqueue them. Optimal for level-order traversal and finding shortest unweighted paths.",
        isOptimal: true
      },
      {
        name: "Alternative: Depth-First Search (Stack / Recursion)",
        complexity: "O(V + E)",
        spaceComplexity: "O(V)",
        description: "Instead of a Queue, use a Last-In-First-Out (LIFO) Stack or recursion. Plunges as deep as possible along each branch before backtracking. Great for connectivity or topological sorting, but does NOT guarantee shortest paths in unweighted graphs.",
        isOptimal: false
      }
    ],
    realWorldApplications: [
      "GPS Navigation & Routing: Finding the minimum number of turns or road hops between two locations.",
      "Social Networks: Finding friends of friends (e.g., LinkedIn's 1st, 2nd, and 3rd degree connections).",
      "Network Broadcast & Peer-to-Peer systems: Broadcasting packets or discovering routing topology in BitTorrent/Blockchain networks.",
      "Web Crawlers: Search engines crawling the web link by link, level by level."
    ],
    patterns: ["Graph Traversal", "Queue (FIFO)", "Level Order", "Shortest Path"]
  },
  complexityExplorer: {
    trackedMetrics: ["operations", "comparisons", "reads", "writes"],
    storyParagraphs: [
      "In a Graph BFS, we visit every vertex exactly once, and inspect every edge from that vertex exactly once. This leads to a time complexity proportional to the sum of vertices and edges, O(V + E).",
      "The space complexity is bounded by the size of the Queue and the visited set. In the worst case, the Queue could contain all the vertices of the widest level of the graph. Hence, the space complexity is O(V)."
    ],
    timeCases: { best: "O(V + E)", average: "O(V + E)", worst: "O(V + E)" },
    spaceCases: { best: "O(1)", average: "O(V)", worst: "O(V)" },
    inputSizeRange: { min: 3, max: 100, default: 20 },
    runExperiment: runGraphBfsExperiment,
  }
};

