import type { VisualizationStep, AdvancedLinkedListState, AdvancedLinkedListNode } from "@/types";

export function* generateReverseLinkedListSteps(array: number[]): Generator<VisualizationStep<AdvancedLinkedListState>> {
  const nodes: AdvancedLinkedListNode[] = array.map((val, idx) => ({
    id: `node-${idx}`,
    value: val,
    nextId: idx < array.length - 1 ? `node-${idx + 1}` : null,
    x: 100 + idx * 120, 
    y: 200
  }));

  const state: AdvancedLinkedListState = {
    nodes: JSON.parse(JSON.stringify(nodes)),
    pointers: { head: nodes.length > 0 ? nodes[0].id : null },
    phase: "init"
  };

  yield {
    state: JSON.parse(JSON.stringify(state)),
    activeLine: 0,
    explanation: "Initialize the reversing process.",
    beginnerExplanation: "We are ready to reverse the linked list. The 'head' points to the first node.",
    complexityMetrics: { operations: 0, reads: 0, writes: 0 }
  };

  if (nodes.length === 0) return;

  state.pointers.prev = null;
  yield {
    state: JSON.parse(JSON.stringify(state)),
    activeLine: 1,
    explanation: "Set prev to null. This will become the new tail of the reversed list.",
    beginnerExplanation: "We need a variable 'prev' to keep track of the node behind us. Initially, there is nothing behind the first node, so we set it to null.",
    complexityMetrics: { operations: 1, reads: 0, writes: 1 }
  };

  state.pointers.curr = state.pointers.head;
  yield {
    state: JSON.parse(JSON.stringify(state)),
    activeLine: 2,
    explanation: "Set curr to head.",
    beginnerExplanation: "We use 'curr' to keep track of the node we are currently looking at. We start at the beginning (the head).",
    complexityMetrics: { operations: 2, reads: 1, writes: 2 }
  };

  let currIdx = 0;
  const metrics = { operations: 2, reads: 1, writes: 2 };

  while (currIdx < nodes.length) {
    metrics.operations++;
    metrics.reads++; // curr != null
    
    yield {
      state: JSON.parse(JSON.stringify(state)),
      activeLine: 3,
      explanation: "Check if curr is not null. It is not, so we enter the loop.",
      beginnerExplanation: "As long as we haven't run out of nodes, we keep going.",
      complexityMetrics: { ...metrics }
    };

    const nextIdx = currIdx + 1;
    state.pointers.nextTemp = nextIdx < nodes.length ? nodes[nextIdx].id : null;
    metrics.reads++;
    metrics.writes++;
    
    const isCritical = currIdx === 1;

    yield {
      state: JSON.parse(JSON.stringify(state)),
      activeLine: 4,
      explanation: "Save the next node in nextTemp before we overwrite curr.next.",
      beginnerExplanation: "Before we change the arrow of the current node to point backwards, we must remember where the next node is. We save it in 'nextTemp'.",
      complexityMetrics: { ...metrics },
      ...(isCritical ? {
        dryRunPrompt: {
          question: "Why do we need the 'nextTemp' variable?",
          options: [
            "To keep track of the tail of the list.",
            "Because once we change curr.next to point to prev, we lose the reference to the rest of the list.",
            "It is required by the while loop condition."
          ],
          correctOptionIndex: 1
        }
      } : {})
    };

    const currNodeId = nodes[currIdx].id;
    const currNodeState = state.nodes.find(n => n.id === currNodeId)!;
    currNodeState.nextId = state.pointers.prev;
    metrics.reads++;
    metrics.writes++;

    yield {
      state: JSON.parse(JSON.stringify(state)),
      activeLine: 5,
      explanation: "Reverse the link: set curr.next to point to prev.",
      beginnerExplanation: "We change the arrow of the current node so it points to the previous node instead of the next one.",
      complexityMetrics: { ...metrics }
    };

    state.pointers.prev = currNodeId;
    metrics.reads++;
    metrics.writes++;

    yield {
      state: JSON.parse(JSON.stringify(state)),
      activeLine: 6,
      explanation: "Move prev forward to curr.",
      beginnerExplanation: "We move the 'prev' pointer one step forward, so it now points to the node we just reversed.",
      complexityMetrics: { ...metrics }
    };

    state.pointers.curr = state.pointers.nextTemp;
    metrics.reads++;
    metrics.writes++;

    yield {
      state: JSON.parse(JSON.stringify(state)),
      activeLine: 7,
      explanation: "Move curr forward to nextTemp.",
      beginnerExplanation: "We move the 'curr' pointer one step forward to the node we saved earlier in 'nextTemp'.",
      complexityMetrics: { ...metrics }
    };

    currIdx++;
  }

  metrics.reads++; // curr != null fails
  delete state.pointers.nextTemp;
  delete state.pointers.curr;
  state.pointers.head = state.pointers.prev;
  state.phase = "complete";

  yield {
    state: JSON.parse(JSON.stringify(state)),
    activeLine: 8,
    explanation: "The loop terminates because curr is null. We return prev as the new head of the reversed list.",
    beginnerExplanation: "We have reached the end of the list. The 'prev' pointer is now at the last node, which has become the new start (head) of our reversed list!",
    complexityMetrics: { ...metrics }
  };
}

export function generateRandomLinkedListInput(size: number): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);
}
