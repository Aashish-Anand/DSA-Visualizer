import type { VisualizationStep, AdvancedLinkedListState, AdvancedLinkedListNode } from "@/types";

export function* generateMergeTwoSortedListsSteps(arr1: number[], arr2: number[]): Generator<VisualizationStep<AdvancedLinkedListState>> {
  const nodes: AdvancedLinkedListNode[] = [];
  
  // List 1 (Top row)
  for (let i = 0; i < arr1.length; i++) {
    nodes.push({
      id: `l1-${i}`,
      value: arr1[i],
      nextId: i < arr1.length - 1 ? `l1-${i + 1}` : null,
      x: 100 + i * 160,
      y: 100
    });
  }

  // List 2 (Middle row)
  for (let i = 0; i < arr2.length; i++) {
    nodes.push({
      id: `l2-${i}`,
      value: arr2[i],
      nextId: i < arr2.length - 1 ? `l2-${i + 1}` : null,
      x: 100 + i * 160,
      y: 200
    });
  }

  const dummyNode: AdvancedLinkedListNode = {
    id: "dummy",
    value: -1,
    nextId: null,
    x: 100,
    y: 320
  };
  nodes.push(dummyNode);

  const state: AdvancedLinkedListState = {
    nodes: JSON.parse(JSON.stringify(nodes)),
    pointers: { 
      l1: arr1.length > 0 ? "l1-0" : null,
      l2: arr2.length > 0 ? "l2-0" : null
    },
    phase: "init"
  };

  const metrics = { operations: 0, comparisons: 0, writes: 0 };

  yield {
    state: JSON.parse(JSON.stringify(state)),
    activeLine: 0,
    explanation: "Initialize the merge process with two sorted lists.",
    beginnerExplanation: "We have two sorted lists that we want to zip together like a zipper.",
    complexityMetrics: { ...metrics }
  };

  state.pointers.dummy = "dummy";
  state.pointers.curr = "dummy";
  metrics.writes += 2;
  
  yield {
    state: JSON.parse(JSON.stringify(state)),
    activeLine: 1,
    explanation: "Create a dummy node and a curr pointer to build the new list.",
    beginnerExplanation: "We create a 'dummy' node to act as the anchor for our new list, and a 'curr' pointer to keep track of the tail of the new list.",
    complexityMetrics: { ...metrics }
  };

  let currId = "dummy";
  let currX = 100;

  while (state.pointers.l1 !== null && state.pointers.l2 !== null) {
    metrics.operations++;
    metrics.comparisons += 2; // l1!=null and l2!=null

    yield {
      state: JSON.parse(JSON.stringify(state)),
      activeLine: 3,
      explanation: "Both l1 and l2 are not null, so we compare their values.",
      beginnerExplanation: "As long as both lists have nodes left, we look at the first node of each list.",
      complexityMetrics: { ...metrics }
    };

    const l1Node = state.nodes.find(n => n.id === state.pointers.l1)!;
    const l2Node = state.nodes.find(n => n.id === state.pointers.l2)!;
    
    metrics.comparisons++;
    const isL1Smaller = l1Node.value <= l2Node.value;
    
    const isCritical = metrics.operations === 2;

    yield {
      state: JSON.parse(JSON.stringify(state)),
      activeLine: 4,
      explanation: `Compare l1.val (${l1Node.value}) and l2.val (${l2Node.value}). ${isL1Smaller ? "l1" : "l2"} is smaller or equal.`,
      beginnerExplanation: `We compare ${l1Node.value} and ${l2Node.value}. Since ${isL1Smaller ? l1Node.value : l2Node.value} is smaller, we pick it!`,
      complexityMetrics: { ...metrics },
      ...(isCritical ? {
        dryRunPrompt: {
          question: "Since we always pick the smaller value, what property does the merged list maintain?",
          options: [
            "It maintains an alternating pattern from l1 and l2.",
            "It maintains the sorted order from smallest to largest.",
            "It removes duplicate values."
          ],
          correctOptionIndex: 1
        }
      } : {})
    };

    let chosenId = "";

    if (isL1Smaller) {
      const currStateNode = state.nodes.find(n => n.id === currId)!;
      currStateNode.nextId = l1Node.id;
      chosenId = l1Node.id;
      metrics.writes++;

      yield {
        state: JSON.parse(JSON.stringify(state)),
        activeLine: 5,
        explanation: "Set curr.next to point to l1.",
        beginnerExplanation: "We connect our new list to the smaller node.",
        complexityMetrics: { ...metrics }
      };

      state.pointers.l1 = l1Node.nextId;
      metrics.writes++;

      yield {
        state: JSON.parse(JSON.stringify(state)),
        activeLine: 6,
        explanation: "Move l1 forward.",
        beginnerExplanation: "We move the l1 pointer to the next node in its list.",
        complexityMetrics: { ...metrics }
      };
    } else {
      const currStateNode = state.nodes.find(n => n.id === currId)!;
      currStateNode.nextId = l2Node.id;
      chosenId = l2Node.id;
      metrics.writes++;

      yield {
        state: JSON.parse(JSON.stringify(state)),
        activeLine: 8,
        explanation: "Set curr.next to point to l2.",
        beginnerExplanation: "We connect our new list to the smaller node.",
        complexityMetrics: { ...metrics }
      };

      state.pointers.l2 = l2Node.nextId;
      metrics.writes++;

      yield {
        state: JSON.parse(JSON.stringify(state)),
        activeLine: 9,
        explanation: "Move l2 forward.",
        beginnerExplanation: "We move the l2 pointer to the next node in its list.",
        complexityMetrics: { ...metrics }
      };
    }

    // Move curr
    currId = chosenId;
    state.pointers.curr = currId;
    metrics.writes++;
    currX += 160;
    
    // Visually move the chosen node down to the merged list row
    const chosenNodeState = state.nodes.find(n => n.id === chosenId)!;
    chosenNodeState.y = 320;
    chosenNodeState.x = currX;

    yield {
      state: JSON.parse(JSON.stringify(state)),
      activeLine: 10,
      explanation: "Move curr forward to the newly added node.",
      beginnerExplanation: "We move our 'curr' pointer forward so it's ready to attach the next node.",
      complexityMetrics: { ...metrics }
    };
  }

  // Handle remaining nodes
  metrics.comparisons++;
  if (state.pointers.l1 !== null) {
    const currStateNode = state.nodes.find(n => n.id === currId)!;
    currStateNode.nextId = state.pointers.l1;
    metrics.writes++;
    
    // Move all remaining l1 nodes down
    let tempId: string | null = state.pointers.l1;
    let localCurrX = currX;
    while (tempId) {
      localCurrX += 160;
      const n = state.nodes.find(x => x.id === tempId)!;
      n.y = 320;
      n.x = localCurrX;
      tempId = n.nextId;
    }

    yield {
      state: JSON.parse(JSON.stringify(state)),
      activeLine: 11,
      explanation: "l1 still has nodes, so we attach the rest of l1 to curr.next.",
      beginnerExplanation: "List 2 is empty, but List 1 still has nodes. Since they are already sorted, we can just attach the whole rest of the list at once!",
      complexityMetrics: { ...metrics }
    };
  }

  metrics.comparisons++;
  if (state.pointers.l2 !== null) {
    const currStateNode = state.nodes.find(n => n.id === currId)!;
    currStateNode.nextId = state.pointers.l2;
    metrics.writes++;

    // Move all remaining l2 nodes down
    let tempId: string | null = state.pointers.l2;
    let localCurrX = currX;
    while (tempId) {
      localCurrX += 160;
      const n = state.nodes.find(x => x.id === tempId)!;
      n.y = 320;
      n.x = localCurrX;
      tempId = n.nextId;
    }

    yield {
      state: JSON.parse(JSON.stringify(state)),
      activeLine: 12,
      explanation: "l2 still has nodes, so we attach the rest of l2 to curr.next.",
      beginnerExplanation: "List 1 is empty, but List 2 still has nodes. We just attach the rest of List 2 to our merged list.",
      complexityMetrics: { ...metrics }
    };
  }

  delete state.pointers.curr;
  delete state.pointers.l1;
  delete state.pointers.l2;
  state.pointers.head = state.nodes.find(n => n.id === "dummy")!.nextId;
  state.phase = "complete";

  yield {
    state: JSON.parse(JSON.stringify(state)),
    activeLine: 13,
    explanation: "Return dummy.next, which is the head of our newly merged list.",
    beginnerExplanation: "The dummy node was just an anchor. The real merged list starts at the node right after the dummy!",
    complexityMetrics: { ...metrics }
  };
}

export function generateRandomMergeListsInput(size: number): { arr1: number[], arr2: number[] } {
  const len1 = Math.floor(Math.random() * (size - 1)) + 1;
  const len2 = size - len1;
  
  const arr1 = Array.from({ length: len1 }, () => Math.floor(Math.random() * 90) + 10).sort();
  const arr2 = Array.from({ length: len2 }, () => Math.floor(Math.random() * 90) + 10).sort();
  
  return { arr1, arr2 };
}
