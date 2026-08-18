import type { AlgorithmConfig } from "@/types";

export const deleteNodeLinkedListConfig: AlgorithmConfig = {
  id: "delete-node-linked-list",
  title: "Delete K-th Node",
  category: "Linked Lists",
  categoryIcon: "Trash2",
  description: "Delete the k-th node (0-indexed) from a singly linked list.",
  difficulty: "Easy",
  pseudocode: [
    { code: "function deleteKthNode(head, k):", indent: 0 },
    { code: "if k == 0:", indent: 1 },
    { code: "return head.next", indent: 2 },
    { code: "curr = head", indent: 1 },
    { code: "for i from 0 to k-1:", indent: 1 },
    { code: "prev = curr", indent: 2 },
    { code: "curr = curr.next", indent: 2 },
    { code: "prev.next = curr.next", indent: 1 },
    { code: "return head", indent: 1 }
  ],
  python: [
    { code: "def deleteKthNode(head, k):", indent: 0 },
    { code: "if k == 0:", indent: 1 },
    { code: "return head.next", indent: 2 },
    { code: "curr = head", indent: 1 },
    { code: "for _ in range(k):", indent: 1 },
    { code: "prev = curr", indent: 2 },
    { code: "curr = curr.next", indent: 2 },
    { code: "prev.next = curr.next", indent: 1 },
    { code: "return head", indent: 1 }
  ],
  java: [
    { code: "public ListNode deleteKthNode(ListNode head, int k) {", indent: 0 },
    { code: "if (k == 0) return head.next;", indent: 1 },
    { code: "ListNode curr = head;", indent: 1 },
    { code: "ListNode prev = null;", indent: 1 },
    { code: "for (int i = 0; i < k; i++) {", indent: 1 },
    { code: "prev = curr;", indent: 2 },
    { code: "curr = curr.next;", indent: 2 },
    { code: "}", indent: 1 },
    { code: "prev.next = curr.next;", indent: 1 },
    { code: "return head;", indent: 1 },
    { code: "}", indent: 0 }
  ],
  cpp: [
    { code: "ListNode* deleteKthNode(ListNode* head, int k) {", indent: 0 },
    { code: "if (k == 0) {", indent: 1 },
    { code: "ListNode* newHead = head->next;", indent: 2 },
    { code: "delete head;", indent: 2 },
    { code: "return newHead;", indent: 2 },
    { code: "}", indent: 1 },
    { code: "ListNode* curr = head;", indent: 1 },
    { code: "ListNode* prev = nullptr;", indent: 1 },
    { code: "for (int i = 0; i < k; i++) {", indent: 1 },
    { code: "prev = curr;", indent: 2 },
    { code: "curr = curr->next;", indent: 2 },
    { code: "}", indent: 1 },
    { code: "prev->next = curr->next;", indent: 1 },
    { code: "delete curr;", indent: 1 },
    { code: "return head;", indent: 1 },
    { code: "}", indent: 0 }
  ],
  complexityExplorer: {
    trackedMetrics: ["operations", "comparisons", "reads", "writes"],
    timeCases: {
      best: "O(1)",
      average: "O(K)",
      worst: "O(N)"
    },
    spaceCases: {
      best: "O(1)",
      average: "O(1)",
      worst: "O(1)"
    },
    storyParagraphs: [
      "Deleting the head node requires O(1) time. Deleting any other node requires traversing to that node, which takes O(K) time.",
      "Since we only use a few pointers to keep track of the current and previous nodes, the space complexity is O(1)."
    ],
    inputSizeRange: { min: 5, max: 100, default: 20 },
    runExperiment: (inputSize: number) => {
      let operations = 0;
      let reads = 0;
      let writes = 0;
      
      const k = Math.floor(inputSize / 2); // Average case
      
      if (k === 0) {
        operations += 1;
        reads += 1;
      } else {
        writes += 1;
        for (let i = 0; i < k; i++) {
          operations += 1;
          reads += 2;
          writes += 2;
        }
        reads += 2;
        writes += 1;
      }
      return { operations, comparisons: 0, reads, writes };
    }
  },
  problemContext: {
    statement: "Given the `head` of a singly linked list and an integer `k` (0-indexed), delete the k-th node from the linked list and return the updated head.",
    examples: [
      {
        input: "head = [4, 5, 1, 9], k = 2",
        output: "[4, 5, 9]",
        explanation: "The node at 0-indexed position 2 (value 1) is removed by pointing node 5 directly to node 9."
      }
    ],
    intuitionPrompt: "Traverse to node k-1, then re-route its `next` pointer to bypass node k: `prev.next = curr.next`.",
    approaches: [
      {
        name: "Pointer Bypass",
        complexity: "O(k)",
        spaceComplexity: "O(1)",
        description: "Special check for k=0 (return head.next). Otherwise, traverse k steps, keeping track of prev. Set prev.next = curr.next.",
        isOptimal: true
      }
    ],
    realWorldApplications: [
      "Unlinking tasks from a process schedule queue.",
      "LRU Cache cache-eviction node unlinking.",
      "Memory pool node deallocation."
    ],
    patterns: ["Linked List", "Pointer Manipulation", "Node Removal"]
  }
};

