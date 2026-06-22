import type { AlgorithmConfig } from "@/types";

export const addTwoNumbersConfig: AlgorithmConfig = {
  id: "add-two-numbers",
  title: "Add Two Numbers",
  category: "Linked Lists",
  categoryIcon: "Calculator",
  description: "Add two numbers represented by linked lists where digits are stored in reverse order.",
  difficulty: "Medium",
  pseudocode: [
    { code: "function addTwoNumbers(l1, l2):", indent: 0 },
    { code: "dummy = new Node(0)", indent: 1 },
    { code: "curr = dummy", indent: 1 },
    { code: "carry = 0", indent: 1 },
    { code: "while l1 != null or l2 != null or carry != 0:", indent: 1 },
    { code: "sum = carry", indent: 2 },
    { code: "if l1 != null:", indent: 2 },
    { code: "sum += l1.val", indent: 3 },
    { code: "l1 = l1.next", indent: 3 },
    { code: "if l2 != null:", indent: 2 },
    { code: "sum += l2.val", indent: 3 },
    { code: "l2 = l2.next", indent: 3 },
    { code: "carry = Math.floor(sum / 10)", indent: 2 },
    { code: "curr.next = new Node(sum % 10)", indent: 2 },
    { code: "curr = curr.next", indent: 2 },
    { code: "return dummy.next", indent: 1 }
  ],
  python: [
    { code: "def addTwoNumbers(l1, l2):", indent: 0 },
    { code: "dummy = ListNode(0)", indent: 1 },
    { code: "curr = dummy", indent: 1 },
    { code: "carry = 0", indent: 1 },
    { code: "while l1 or l2 or carry:", indent: 1 },
    { code: "val1 = l1.val if l1 else 0", indent: 2 },
    { code: "val2 = l2.val if l2 else 0", indent: 2 },
    { code: "total = val1 + val2 + carry", indent: 2 },
    { code: "carry = total // 10", indent: 2 },
    { code: "curr.next = ListNode(total % 10)", indent: 2 },
    { code: "curr = curr.next", indent: 2 },
    { code: "if l1: l1 = l1.next", indent: 2 },
    { code: "if l2: l2 = l2.next", indent: 2 },
    { code: "return dummy.next", indent: 1 }
  ],
  java: [
    { code: "public ListNode addTwoNumbers(ListNode l1, ListNode l2) {", indent: 0 },
    { code: "ListNode dummy = new ListNode(0);", indent: 1 },
    { code: "ListNode curr = dummy;", indent: 1 },
    { code: "int carry = 0;", indent: 1 },
    { code: "while (l1 != null || l2 != null || carry != 0) {", indent: 1 },
    { code: "int sum = carry;", indent: 2 },
    { code: "if (l1 != null) {", indent: 2 },
    { code: "sum += l1.val;", indent: 3 },
    { code: "l1 = l1.next;", indent: 3 },
    { code: "}", indent: 2 },
    { code: "if (l2 != null) {", indent: 2 },
    { code: "sum += l2.val;", indent: 3 },
    { code: "l2 = l2.next;", indent: 3 },
    { code: "}", indent: 2 },
    { code: "carry = sum / 10;", indent: 2 },
    { code: "curr.next = new ListNode(sum % 10);", indent: 2 },
    { code: "curr = curr.next;", indent: 2 },
    { code: "}", indent: 1 },
    { code: "return dummy.next;", indent: 1 },
    { code: "}", indent: 0 }
  ],
  cpp: [
    { code: "ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {", indent: 0 },
    { code: "ListNode dummy(0);", indent: 1 },
    { code: "ListNode* curr = &dummy;", indent: 1 },
    { code: "int carry = 0;", indent: 1 },
    { code: "while (l1 != nullptr || l2 != nullptr || carry != 0) {", indent: 1 },
    { code: "int sum = carry;", indent: 2 },
    { code: "if (l1 != nullptr) {", indent: 2 },
    { code: "sum += l1->val;", indent: 3 },
    { code: "l1 = l1->next;", indent: 3 },
    { code: "}", indent: 2 },
    { code: "if (l2 != nullptr) {", indent: 2 },
    { code: "sum += l2->val;", indent: 3 },
    { code: "l2 = l2->next;", indent: 3 },
    { code: "}", indent: 2 },
    { code: "carry = sum / 10;", indent: 2 },
    { code: "curr->next = new ListNode(sum % 10);", indent: 2 },
    { code: "curr = curr->next;", indent: 2 },
    { code: "}", indent: 1 },
    { code: "return dummy.next;", indent: 1 },
    { code: "}", indent: 0 }
  ],
  complexityExplorer: {
    trackedMetrics: ["operations", "reads", "writes"],
    timeCases: {
      best: "O(max(N, M))",
      average: "O(max(N, M))",
      worst: "O(max(N, M))"
    },
    spaceCases: {
      best: "O(max(N, M))",
      average: "O(max(N, M))",
      worst: "O(max(N, M))"
    },
    storyParagraphs: [
      "We iterate exactly up to the length of the longest linked list, plus at most one more iteration for a leftover carry. This makes the time complexity strictly O(max(N, M)).",
      "Since we create a new linked list to store the result, we allocate a new node for every digit. Thus, the space complexity is O(max(N, M))."
    ],
    inputSizeRange: { min: 5, max: 100, default: 20 },
    runExperiment: (inputSize: number) => {
      let operations = 0;
      let reads = 0;
      let writes = 0;
      
      const len1 = Math.floor(inputSize / 2);
      const len2 = inputSize - len1;
      
      let i = 0, j = 0;
      while (i < len1 || j < len2) {
        operations += 1;
        reads += 1; 
        writes += 1; 
        if (i < len1) {
          reads += 2;
          writes += 1;
          i++;
        }
        if (j < len2) {
          reads += 2;
          writes += 1;
          j++;
        }
        writes += 3; 
      }
      return { operations, reads, writes };
    }
  }
};
