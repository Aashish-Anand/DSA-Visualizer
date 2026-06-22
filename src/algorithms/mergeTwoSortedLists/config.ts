import type { AlgorithmConfig } from "@/types";

export const mergeTwoSortedListsConfig: AlgorithmConfig = {
  id: "merge-two-sorted-lists",
  title: "Merge Two Sorted Lists",
  category: "Linked Lists",
  categoryIcon: "GitMerge",
  description: "Merge two sorted linked lists into one sorted linked list.",
  difficulty: "Easy",
  pseudocode: [
    { code: "function mergeTwoLists(l1, l2):", indent: 0 },
    { code: "dummy = new Node(-1)", indent: 1 },
    { code: "curr = dummy", indent: 1 },
    { code: "while l1 != null and l2 != null:", indent: 1 },
    { code: "if l1.val <= l2.val:", indent: 2 },
    { code: "curr.next = l1", indent: 3 },
    { code: "l1 = l1.next", indent: 3 },
    { code: "else:", indent: 2 },
    { code: "curr.next = l2", indent: 3 },
    { code: "l2 = l2.next", indent: 3 },
    { code: "curr = curr.next", indent: 2 },
    { code: "if l1 != null: curr.next = l1", indent: 1 },
    { code: "if l2 != null: curr.next = l2", indent: 1 },
    { code: "return dummy.next", indent: 1 }
  ],
  python: [
    { code: "def mergeTwoLists(l1, l2):", indent: 0 },
    { code: "dummy = ListNode(-1)", indent: 1 },
    { code: "curr = dummy", indent: 1 },
    { code: "while l1 and l2:", indent: 1 },
    { code: "if l1.val <= l2.val:", indent: 2 },
    { code: "curr.next = l1", indent: 3 },
    { code: "l1 = l1.next", indent: 3 },
    { code: "else:", indent: 2 },
    { code: "curr.next = l2", indent: 3 },
    { code: "l2 = l2.next", indent: 3 },
    { code: "curr = curr.next", indent: 2 },
    { code: "curr.next = l1 or l2", indent: 1 },
    { code: "return dummy.next", indent: 1 }
  ],
  java: [
    { code: "public ListNode mergeTwoLists(ListNode l1, ListNode l2) {", indent: 0 },
    { code: "ListNode dummy = new ListNode(-1);", indent: 1 },
    { code: "ListNode curr = dummy;", indent: 1 },
    { code: "while (l1 != null && l2 != null) {", indent: 1 },
    { code: "if (l1.val <= l2.val) {", indent: 2 },
    { code: "curr.next = l1;", indent: 3 },
    { code: "l1 = l1.next;", indent: 3 },
    { code: "} else {", indent: 2 },
    { code: "curr.next = l2;", indent: 3 },
    { code: "l2 = l2.next;", indent: 3 },
    { code: "}", indent: 2 },
    { code: "curr = curr.next;", indent: 2 },
    { code: "}", indent: 1 },
    { code: "if (l1 != null) curr.next = l1;", indent: 1 },
    { code: "if (l2 != null) curr.next = l2;", indent: 1 },
    { code: "return dummy.next;", indent: 1 },
    { code: "}", indent: 0 }
  ],
  cpp: [
    { code: "ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {", indent: 0 },
    { code: "ListNode dummy(-1);", indent: 1 },
    { code: "ListNode* curr = &dummy;", indent: 1 },
    { code: "while (l1 != nullptr && l2 != nullptr) {", indent: 1 },
    { code: "if (l1->val <= l2->val) {", indent: 2 },
    { code: "curr->next = l1;", indent: 3 },
    { code: "l1 = l1->next;", indent: 3 },
    { code: "} else {", indent: 2 },
    { code: "curr->next = l2;", indent: 3 },
    { code: "l2 = l2->next;", indent: 3 },
    { code: "}", indent: 2 },
    { code: "curr = curr->next;", indent: 2 },
    { code: "}", indent: 1 },
    { code: "if (l1 != nullptr) curr->next = l1;", indent: 1 },
    { code: "if (l2 != nullptr) curr->next = l2;", indent: 1 },
    { code: "return dummy.next;", indent: 1 },
    { code: "}", indent: 0 }
  ],
  complexityExplorer: {
    trackedMetrics: ["operations", "comparisons", "writes"],
    timeCases: {
      best: "O(min(N, M))",
      average: "O(N + M)",
      worst: "O(N + M)"
    },
    spaceCases: {
      best: "O(1)",
      average: "O(1)",
      worst: "O(1)"
    },
    storyParagraphs: [
      "At each step, we compare the heads of both lists and pick the smaller one. The worst-case scenario forces us to visit every node in both lists, giving us O(N + M) time complexity.",
      "Since we only re-arrange existing pointers and use a constant number of new variables (dummy, curr), the space complexity is strictly O(1). No new nodes are created!"
    ],
    inputSizeRange: { min: 5, max: 100, default: 20 },
    runExperiment: (inputSize: number) => {
      let operations = 0;
      let comparisons = 0;
      let writes = 0;
      
      let len1 = Math.floor(inputSize / 2);
      let len2 = inputSize - len1;
      
      while (len1 > 0 && len2 > 0) {
        operations += 1;
        comparisons += 1; // if l1 <= l2
        writes += 3; // curr.next, lX.next, curr
        // simulate alternating
        if (len1 > len2) len1--;
        else len2--;
      }
      comparisons += 2; // if l1 != null, if l2 != null
      writes += 1; // append rest
      
      return { operations, comparisons, writes };
    }
  }
};
