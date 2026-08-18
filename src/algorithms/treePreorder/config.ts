import type { AlgorithmConfig } from "@/types";
import { runTreePreorderExperiment } from "./generator";

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
  ],
  complexityExplorer: {
    trackedMetrics: ["operations", "recursiveCalls"],
    storyParagraphs: [
      "In a Pre-order traversal, every node in the tree is visited exactly once. This means the time complexity is strictly proportional to the number of nodes, resulting in O(N) time complexity.",
      "The space complexity is determined by the maximum depth of the recursive call stack. In the best case (a perfectly balanced tree), the height is log(N), so space is O(log N). In the worst case (a completely skewed tree, essentially a linked list), the height is N, so the space complexity becomes O(N)."
    ],
    timeCases: { best: "O(N)", average: "O(N)", worst: "O(N)" },
    spaceCases: { best: "O(log N)", average: "O(log N)", worst: "O(N)" },
    inputSizeRange: { min: 3, max: 63, default: 15 }, // Keep sizes reasonable for tree visualizations
    runExperiment: runTreePreorderExperiment,
  },
  problemContext: {
    statement: "Given the `root` of a binary tree, return the pre-order traversal of its nodes' values (Root -> Left -> Right).",
    examples: [
      {
        input: "root = [1, null, 2, 3]",
        output: "[1, 2, 3]",
        explanation: "Visit root 1, then right child 2, which visits child 3."
      }
    ],
    intuitionPrompt: "Visit the parent node immediately before exploring its children. Useful when you need to clone or serialize a tree structure from top to bottom.",
    approaches: [
      {
        name: "Recursive Pre-order",
        complexity: "O(n)",
        spaceComplexity: "O(h) call stack",
        description: "Visit current node first, then recursively call helper(node.left) and helper(node.right).",
        isOptimal: true
      },
      {
        name: "Iterative with Stack",
        complexity: "O(n)",
        spaceComplexity: "O(h)",
        description: "Push root to stack. While stack not empty, pop node, visit it, then push right child first, then left child.",
        isOptimal: true
      }
    ],
    realWorldApplications: [
      "Cloning / duplicating binary trees.",
      "Tree serialization and deserialization (producing prefix / Polish notation).",
      "Directory structure listing (printing directories before their contents)."
    ],
    patterns: ["Tree Traversal", "Depth-First Search", "Pre-Order", "Prefix Traversal"]
  }
};
