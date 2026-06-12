import type { AlgorithmConfig } from "@/types";

export const treePreorderConfig: AlgorithmConfig = {
  id: "tree-preorder",
  title: "Pre-order Traversal",
  category: "Trees",
  categoryIcon: "network",
  description: "Pre-order traversal visits the current node first, then recursively visits the left subtree, and finally the right subtree. It's often used to create a copy of the tree or get a prefix expression.",
  difficulty: "Easy",
  pseudocode: [
    { code: "function preOrder(node):", indent: 0 },
    { code: "if node is null:", indent: 1 },
    { code: "return", indent: 2 },
    { code: "visit(node)", indent: 1 },
    { code: "preOrder(node.left)", indent: 1 },
    { code: "preOrder(node.right)", indent: 1 }
  ]
};
