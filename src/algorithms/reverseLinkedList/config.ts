import type { AlgorithmConfig } from "@/types";

export const reverseLinkedListConfig: AlgorithmConfig = {
  id: "reverse-linked-list",
  title: "Reverse Linked List",
  category: "Linked Lists",
  categoryIcon: "ArrowLeftRight",
  description: "Reverse a singly linked list in-place.",
  difficulty: "Easy",
  pseudocode: [
    { code: "function reverseList(head):", indent: 0 },
    { code: "prev = null", indent: 1 },
    { code: "curr = head", indent: 1 },
    { code: "while curr != null:", indent: 1 },
    { code: "nextTemp = curr.next", indent: 2 },
    { code: "curr.next = prev", indent: 2 },
    { code: "prev = curr", indent: 2 },
    { code: "curr = nextTemp", indent: 2 },
    { code: "return prev", indent: 1 }
  ],
  python: [
    { code: "def reverseList(head):", indent: 0 },
    { code: "prev = None", indent: 1 },
    { code: "curr = head", indent: 1 },
    { code: "while curr:", indent: 1 },
    { code: "next_temp = curr.next", indent: 2 },
    { code: "curr.next = prev", indent: 2 },
    { code: "prev = curr", indent: 2 },
    { code: "curr = next_temp", indent: 2 },
    { code: "return prev", indent: 1 }
  ],
  java: [
    { code: "public ListNode reverseList(ListNode head) {", indent: 0 },
    { code: "ListNode prev = null;", indent: 1 },
    { code: "ListNode curr = head;", indent: 1 },
    { code: "while (curr != null) {", indent: 1 },
    { code: "ListNode nextTemp = curr.next;", indent: 2 },
    { code: "curr.next = prev;", indent: 2 },
    { code: "prev = curr;", indent: 2 },
    { code: "curr = nextTemp;", indent: 2 },
    { code: "}", indent: 1 },
    { code: "return prev;", indent: 1 },
    { code: "}", indent: 0 }
  ],
  cpp: [
    { code: "ListNode* reverseList(ListNode* head) {", indent: 0 },
    { code: "ListNode* prev = nullptr;", indent: 1 },
    { code: "ListNode* curr = head;", indent: 1 },
    { code: "while (curr != nullptr) {", indent: 1 },
    { code: "ListNode* nextTemp = curr->next;", indent: 2 },
    { code: "curr->next = prev;", indent: 2 },
    { code: "prev = curr;", indent: 2 },
    { code: "curr = nextTemp;", indent: 2 },
    { code: "}", indent: 1 },
    { code: "return prev;", indent: 1 },
    { code: "}", indent: 0 }
  ],
  complexityExplorer: {
    trackedMetrics: ["operations", "comparisons", "reads", "writes"],
    timeCases: {
      best: "O(N)",
      average: "O(N)",
      worst: "O(N)"
    },
    spaceCases: {
      best: "O(1)",
      average: "O(1)",
      worst: "O(1)"
    },
    storyParagraphs: [
      "Reversing a linked list requires traversing the list exactly once. Since we do a constant amount of work (changing pointers) at each node, the time complexity is strictly O(N), where N is the number of nodes in the list.",
      "Since we reverse the list in-place using only a few variables (`prev`, `curr`, `nextTemp`), the space complexity is O(1) regardless of the size of the list."
    ],
    inputSizeRange: { min: 5, max: 100, default: 20 },
    runExperiment: (inputSize: number) => {
      let operations = 0;
      let reads = 0;
      let writes = 0;

      reads += 2; // prev, curr
      writes += 2;
      for (let i = 0; i < inputSize; i++) {
        operations += 1;
        reads += 4;
        writes += 3;
      }
      return { operations, comparisons: 0, reads, writes };
    }
  }
};
