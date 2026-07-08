import type { AlgorithmConfig } from "@/types";
import { runTreeInorderExperiment } from "./generator";

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
  ],
  complexityExplorer: {
    trackedMetrics: ["operations", "recursiveCalls"],
    storyParagraphs: [
      "In an In-order traversal, every node in the tree is visited exactly once. This means the time complexity is strictly proportional to the number of nodes, resulting in O(N) time complexity.",
      "The space complexity is determined by the maximum depth of the recursive call stack. In the best case (a perfectly balanced tree), the height is log(N), so space is O(log N). In the worst case (a completely skewed tree, essentially a linked list), the height is N, so the space complexity becomes O(N)."
    ],
    timeCases: { best: "O(N)", average: "O(N)", worst: "O(N)" },
    spaceCases: { best: "O(log N)", average: "O(log N)", worst: "O(N)" },
    inputSizeRange: { min: 3, max: 63, default: 15 },
    runExperiment: runTreeInorderExperiment,
  }
};
