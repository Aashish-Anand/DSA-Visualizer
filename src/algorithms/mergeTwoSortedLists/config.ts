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
  },
  problemContext: {
    statement: "You are given the heads of two sorted linked lists `list1` and `list2`. Merge the two lists into one sorted linked list by splicing together the nodes of the first two lists, and return the head of the merged list.",
    examples: [
      {
        input: "list1 = [1, 2, 4], list2 = [1, 3, 4]",
        output: "[1, 1, 2, 3, 4, 4]",
        explanation: "Compare heads: 1 vs 1 (take list1's 1), then 2 vs 1 (take list2's 1), 2 vs 3 (take list1's 2), 4 vs 3 (take list2's 3), 4 vs 4 (take list1's 4), attach remaining 4."
      }
    ],
    intuitionPrompt: "Like combining two sorted decks of cards held in each hand, comparing top cards and placing the smaller card onto the output pile.",
    approaches: [
      {
        name: "Iterative Dummy Head",
        complexity: "O(n + m)",
        spaceComplexity: "O(1)",
        description: "Create a dummy node. Compare list1.val and list2.val. Append smaller node to dummy list and advance pointers until one list is exhausted, then append the remainder.",
        isOptimal: true
      },
      {
        name: "Recursive Merge",
        complexity: "O(n + m)",
        spaceComplexity: "O(n + m) stack",
        description: "If list1.val < list2.val, set list1.next = merge(list1.next, list2) and return list1.",
        isOptimal: false
      }
    ],
    realWorldApplications: [
      "Subroutine in External Merge Sort for sorting multi-gigabyte files.",
      "Merging database index query results.",
      "Stream processing of timestamped log entries from multiple microservices."
    ],
    patterns: ["Linked List", "Two Pointers", "Dummy Node", "Merge Routine"]
  }
};

