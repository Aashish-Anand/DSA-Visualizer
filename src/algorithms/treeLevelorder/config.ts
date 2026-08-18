import type { AlgorithmConfig } from "@/types";
import { runTreeLevelorderExperiment } from "./generator";

export const treeLevelorderConfig: AlgorithmConfig = {
  id: "tree-levelorder",
  title: "Level-order Traversal",
  category: "Trees",
  categoryIcon: "network",
  description: "Level-order traversal (Breadth-First Search) visits nodes level by level from top to bottom, left to right. It uses a queue to keep track of the nodes to visit next.",
  difficulty: "Easy",
  pseudocode: [
    { code: "function levelOrder(root):", indent: 0 },
    { code: "if root is null return", indent: 1 },
    { code: "queue.enqueue(root)", indent: 1 },
    { code: "while queue is not empty:", indent: 1 },
    { code: "node = queue.dequeue()", indent: 2 },
    { code: "visit(node)", indent: 2 },
    { code: "if node.left: queue.enqueue(node.left)", indent: 2 },
    { code: "if node.right: queue.enqueue(node.right)", indent: 2 }
  ],
  complexityExplorer: {
    trackedMetrics: ["operations", "reads", "writes"],
    storyParagraphs: [
      "In a Level-order traversal, every node is pushed to the queue exactly once and popped exactly once. Therefore, the time complexity scales linearly with the number of nodes, resulting in O(N).",
      "The space complexity is defined by the maximum size of the queue. For a perfectly balanced tree, the widest level is the last one, which holds roughly N/2 nodes. Therefore, the space complexity in the worst-case scenario (balanced tree) is O(N)."
    ],
    timeCases: { best: "O(N)", average: "O(N)", worst: "O(N)" },
    spaceCases: { best: "O(1)", average: "O(N)", worst: "O(N)" },
    inputSizeRange: { min: 3, max: 63, default: 15 },
    runExperiment: runTreeLevelorderExperiment,
  },
  problemContext: {
    statement: "Given the `root` of a binary tree, return the level-order traversal of its nodes' values (i.e., from left to right, level by level).",
    examples: [
      {
        input: "root = [3, 9, 20, null, null, 15, 7]",
        output: "[[3], [9, 20], [15, 7]]",
        explanation: "Level 0: [3]. Level 1: [9, 20]. Level 2: [15, 7]."
      }
    ],
    intuitionPrompt: "Explore the binary tree layer by layer, top to bottom. Using a Queue (FIFO), visit all nodes at depth k before moving to depth k+1.",
    approaches: [
      {
        name: "Breadth-First Search (BFS with Queue)",
        complexity: "O(n)",
        spaceComplexity: "O(w) queue max width",
        description: "Maintain a FIFO queue initialized with root. For each level, snapshot current queue size, pop nodes, record values, and enqueue children.",
        isOptimal: true
      }
    ],
    realWorldApplications: [
      "Finding the shortest path / minimum depth in unweighted trees or graphs.",
      "Serialization and deserialization of binary trees (e.g., LeetCode tree string format).",
      "Network broadcasting and organizational hierarchy rendering."
    ],
    patterns: ["Tree Traversal", "Breadth-First Search", "Level Order", "Queue"]
  }
};
