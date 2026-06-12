import type { AlgorithmConfig } from "@/types";

export const treeInorderConfig: AlgorithmConfig = {
  id: "tree-inorder",
  title: "In-order Traversal",
  category: "Trees",
  categoryIcon: "network",
  description: "In-order traversal visits the left subtree, then the current node, and finally the right subtree. In a Binary Search Tree (BST), this visits the nodes in sorted order.",
  difficulty: "Easy",
  pseudocode: [
    { code: "function inOrder(node):", indent: 0 },
    { code: "if node is null:", indent: 1 },
    { code: "return", indent: 2 },
    { code: "inOrder(node.left)", indent: 1 },
    { code: "visit(node)", indent: 1 },
    { code: "inOrder(node.right)", indent: 1 }
  ]
};
