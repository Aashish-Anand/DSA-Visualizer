import type { AlgorithmConfig } from "@/types";

export const treePostorderConfig: AlgorithmConfig = {
  id: "tree-postorder",
  title: "Post-order Traversal",
  category: "Trees",
  categoryIcon: "network",
  description: "Post-order traversal visits the left subtree, then the right subtree, and finally the current node. It's useful for deleting a tree or evaluating postfix expressions.",
  difficulty: "Easy",
  pseudocode: [
    { code: "function postOrder(node):", indent: 0 },
    { code: "if node is null:", indent: 1 },
    { code: "return", indent: 2 },
    { code: "postOrder(node.left)", indent: 1 },
    { code: "postOrder(node.right)", indent: 1 },
    { code: "visit(node)", indent: 1 }
  ]
};
