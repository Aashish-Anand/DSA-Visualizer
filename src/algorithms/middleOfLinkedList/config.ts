import type { AlgorithmConfig } from "@/types";

export const middleOfLinkedListConfig: AlgorithmConfig = {
  id: "middle-of-linked-list",
  title: "Middle of the Linked List",
  category: "Linked Lists",
  categoryIcon: "Goal",
  description: "Find the middle node of a singly linked list using the slow and fast pointer approach.",
  difficulty: "Easy",
  pseudocode: [
    { code: "function middleNode(head):", indent: 0 },
    { code: "slow = head", indent: 1 },
    { code: "fast = head", indent: 1 },
    { code: "while fast != null and fast.next != null:", indent: 1 },
    { code: "slow = slow.next", indent: 2 },
    { code: "fast = fast.next.next", indent: 2 },
    { code: "return slow", indent: 1 }
  ],
  python: [
    { code: "def middleNode(head):", indent: 0 },
    { code: "slow = fast = head", indent: 1 },
    { code: "while fast and fast.next:", indent: 1 },
    { code: "slow = slow.next", indent: 2 },
    { code: "fast = fast.next.next", indent: 2 },
    { code: "return slow", indent: 1 }
  ],
  java: [
    { code: "public ListNode middleNode(ListNode head) {", indent: 0 },
    { code: "ListNode slow = head;", indent: 1 },
    { code: "ListNode fast = head;", indent: 1 },
    { code: "while (fast != null && fast.next != null) {", indent: 1 },
    { code: "slow = slow.next;", indent: 2 },
    { code: "fast = fast.next.next;", indent: 2 },
    { code: "}", indent: 1 },
    { code: "return slow;", indent: 1 },
    { code: "}", indent: 0 }
  ],
  cpp: [
    { code: "ListNode* middleNode(ListNode* head) {", indent: 0 },
    { code: "ListNode* slow = head;", indent: 1 },
    { code: "ListNode* fast = head;", indent: 1 },
    { code: "while (fast != nullptr && fast->next != nullptr) {", indent: 1 },
    { code: "slow = slow->next;", indent: 2 },
    { code: "fast = fast->next->next;", indent: 2 },
    { code: "}", indent: 1 },
    { code: "return slow;", indent: 1 },
    { code: "}", indent: 0 }
  ],
  complexityExplorer: {
    trackedMetrics: ["operations", "reads", "writes"],
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
      "The 'fast' pointer traverses the list twice as fast as the 'slow' pointer. By the time 'fast' reaches the end, 'slow' will be exactly at the middle. This requires scanning the list once, resulting in O(N) time complexity.",
      "Because we only need two pointers regardless of the linked list size, the space complexity is strictly O(1)."
    ],
    inputSizeRange: { min: 5, max: 100, default: 20 },
    runExperiment: (inputSize: number) => {
      let operations = 0;
      let reads = 0;
      let writes = 0;
      
      reads += 2;
      writes += 2;
      
      let fast = 0;
      while (fast < inputSize && fast + 1 < inputSize) {
        operations += 1;
        reads += 4; 
        writes += 2; 
        fast += 2;
      }
      return { operations, reads, writes };
    }
  }
};
