import type { AlgorithmConfig } from "@/types";
import { runTreePostorderExperiment } from "./generator";

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
  ],
  complexityExplorer: {
    trackedMetrics: ["operations", "recursiveCalls"],
    storyParagraphs: [
      "In a Post-order traversal, every node in the tree is visited exactly once. This means the time complexity is strictly proportional to the number of nodes, resulting in O(N) time complexity.",
      "The space complexity is determined by the maximum depth of the recursive call stack. In the best case (a perfectly balanced tree), the height is log(N), so space is O(log N). In the worst case (a completely skewed tree, essentially a linked list), the height is N, so the space complexity becomes O(N)."
    ],
    timeCases: { best: "O(N)", average: "O(N)", worst: "O(N)" },
    spaceCases: { best: "O(log N)", average: "O(log N)", worst: "O(N)" },
    inputSizeRange: { min: 3, max: 63, default: 15 },
    runExperiment: runTreePostorderExperiment,
  },
  problemContext: {
    statement: "Given the `root` of a binary tree, return the post-order traversal of its nodes' values (Left -> Right -> Root).",
    examples: [
      {
        input: "root = [1, null, 2, 3]",
        output: "[3, 2, 1]",
        explanation: "Process left subtree, process right subtree (child 3 then 2), then visit root 1 last."
      }
    ],
    intuitionPrompt: "Process children subtrees completely before processing their parent node. Perfect for bottom-up calculations like node deletion or calculating subtree sizes/heights.",
    approaches: [
      {
        name: "Recursive Post-order",
        complexity: "O(n)",
        spaceComplexity: "O(h) call stack",
        description: "Recursively visit node.left, node.right, then record node.val.",
        isOptimal: true
      },
      {
        name: "Iterative with Two Stacks or Reversed Pre-Order",
        complexity: "O(n)",
        spaceComplexity: "O(h)",
        description: "Process Root -> Right -> Left using stack, then reverse the collected result array to yield Left -> Right -> Root.",
        isOptimal: true
      }
    ],
    realWorldApplications: [
      "Safely deleting or freeing nodes in a binary tree (children freed before parent).",
      "Evaluating expression trees in postfix / Reverse Polish Notation (RPN).",
      "Calculating folder / directory disk sizes bottom-up."
    ],
    patterns: ["Tree Traversal", "Depth-First Search", "Post-Order", "Bottom-Up Processing"]
  }
};
