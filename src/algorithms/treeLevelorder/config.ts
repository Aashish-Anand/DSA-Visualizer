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
  }
};
