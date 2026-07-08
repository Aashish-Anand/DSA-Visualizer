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
};
