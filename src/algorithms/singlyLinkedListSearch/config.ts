import type { AlgorithmConfig } from "@/types";

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
};
