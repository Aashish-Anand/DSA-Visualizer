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
      return { operations, comparisons: 0, reads, writes };
    }
  },
  problemContext: {
    statement: "Given the `head` of a singly linked list, return the middle node of the linked list. If there are two middle nodes, return the second middle node.",
    examples: [
      {
        input: "head = [1, 2, 3, 4, 5]",
        output: "Node 3",
        explanation: "The middle node of the list is 3."
      },
      {
        input: "head = [1, 2, 3, 4, 5, 6]",
        output: "Node 4",
        explanation: "Since the list has two middle nodes with values 3 and 4, we return the second one (4)."
      }
    ],
    intuitionPrompt: "If two runners start at the same line and Runner A runs twice as fast as Runner B, when Runner A crosses the finish line, Runner B is exactly at the midpoint!",
    approaches: [
      {
        name: "Fast & Slow Pointers (Floyd's Cycle / Tortoise & Hare)",
        complexity: "O(n)",
        spaceComplexity: "O(1)",
        description: "Move slow pointer by 1 step and fast pointer by 2 steps per iteration until fast reaches end.",
        isOptimal: true
      },
      {
        name: "Two-Pass Length Counting",
        complexity: "O(n)",
        spaceComplexity: "O(1)",
        description: "First pass counts total list length L. Second pass traverses L / 2 steps from head.",
        isOptimal: false
      }
    ],
    realWorldApplications: [
      "Merge Sort on Linked Lists (splitting linked list into equal halves).",
      "Finding palindrome center in linked lists.",
      "Buffer partitioning in streaming data structures."
    ],
    patterns: ["Linked List", "Fast and Slow Pointers", "Two Pointers"]
  }
};

