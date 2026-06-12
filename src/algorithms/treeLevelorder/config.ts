import type { AlgorithmConfig } from "@/types";

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
  ]
};
