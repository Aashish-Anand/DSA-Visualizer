import type { AlgorithmConfig } from "@/types";
import { runSinglyLinkedListSearchExperiment } from "./generator";

export const singlyLinkedListSearchConfig: AlgorithmConfig = {
  id: "sll-search",
  title: "Search in Singly Linked List",
  category: "Linked Lists",
  categoryIcon: "Network",
  description:
    "Searching in a singly linked list involves traversing the list from the head node, following the 'next' pointers, until the target value is found or the end of the list (null) is reached.",
  difficulty: "Easy",
  pseudocode: [
    { code: "function searchLinkedList(head, target):", indent: 0 },
    { code: "curr = head", indent: 1 },
    { code: "while curr != null:", indent: 1 },
    { code: "if curr.value == target:", indent: 2 },
    { code: "return curr", indent: 3 },
    { code: "curr = curr.next", indent: 2 },
    { code: "return null", indent: 1 },
  ],
  complexityExplorer: {
    trackedMetrics: ["operations", "comparisons"],
    storyParagraphs: [
      "Searching in a singly linked list requires traversing the list node by node from the head to the tail.",
      "Since nodes are not stored in contiguous memory locations, we cannot use random access or binary search. We must visit each node, check its value, and follow its 'next' pointer until we find the target or reach the end.",
      "This linear traversal results in O(N) time complexity. However, it requires O(1) auxiliary space, as only a single pointer is needed for the traversal."
    ],
    timeCases: { best: "O(1)", average: "O(N)", worst: "O(N)" },
    spaceCases: { best: "O(1)", average: "O(1)", worst: "O(1)" },
    inputSizeRange: { min: 5, max: 100, default: 20 },
    runExperiment: runSinglyLinkedListSearchExperiment,
  },
  problemContext: {
    statement: "Given the `head` of a singly linked list and a target value `target`, return `true` if a node with `val == target` exists in the linked list, or `false` otherwise.",
    examples: [
      {
        input: "head = [1 -> 2 -> 3 -> 4 -> 5], target = 3",
        output: "true",
        explanation: "Node with value 3 is present at 0-indexed position 2."
      },
      {
        input: "head = [1 -> 2 -> 3 -> 4 -> 5], target = 6",
        output: "false",
        explanation: "No node in the linked list has value 6."
      }
    ],
    intuitionPrompt: "Unlike arrays, linked list elements cannot be accessed by index (no arr[i]). You must follow the chain of `next` pointers step-by-step from the head until you find the node or hit null.",
    approaches: [
      {
        name: "Iterative Traversal",
        complexity: "O(n)",
        spaceComplexity: "O(1)",
        description: "Initialize curr = head. Loop while curr != null, comparing curr.val with target and updating curr = curr.next.",
        isOptimal: true
      },
      {
        name: "Recursive Traversal",
        complexity: "O(n)",
        spaceComplexity: "O(n) stack",
        description: "Recursively check head.val == target or search(head.next, target).",
        isOptimal: false
      }
    ],
    realWorldApplications: [
      "Hash table chaining collision resolution (searching through a bucket's linked list).",
      "Dynamic allocation lists and free-list memory tracking in operating system kernels.",
      "Undo-redo node history navigation."
    ],
    patterns: ["Linked List", "Pointer Traversal", "Linear Search"]
  }
};

