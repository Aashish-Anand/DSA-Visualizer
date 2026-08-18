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
  },
  problemContext: {
    statement: "Given the `root` of a binary tree, return the in-order traversal of its nodes' values (Left -> Root -> Right). For a Binary Search Tree (BST), this visits elements in sorted order.",
    examples: [
      {
        input: "root = [1, null, 2, 3]",
        output: "[1, 3, 2]",
        explanation: "Traverse left subtree (empty), visit root 1, traverse right subtree (inorder of node 2 with left child 3 gives 3, then 2)."
      }
    ],
    intuitionPrompt: "Sweep from left to right across the binary tree. For every subtree, visit the left child first, process the current node, then visit the right child.",
    approaches: [
      {
        name: "Recursive In-order",
        complexity: "O(n)",
        spaceComplexity: "O(h) call stack",
        description: "Call helper(node.left), record node.val, call helper(node.right).",
        isOptimal: true
      },
      {
        name: "Iterative with Stack",
        complexity: "O(n)",
        spaceComplexity: "O(h)",
        description: "Push left children onto stack until null, pop and visit, then move to right child.",
        isOptimal: true
      },
      {
        name: "Morris Traversal",
        complexity: "O(n)",
        spaceComplexity: "O(1)",
        description: "Use temporary threaded binary tree pointers (predecessor links) for O(1) auxiliary space.",
        isOptimal: true
      }
    ],
    realWorldApplications: [
      "Sorted element extraction from Binary Search Trees (BST).",
      "Evaluating arithmetic expression trees (infix notation).",
      "Validating BST invariant (checking if inorder traversal is strictly increasing)."
    ],
    patterns: ["Tree Traversal", "Depth-First Search", "In-Order", "BST Processing"]
  }
};
