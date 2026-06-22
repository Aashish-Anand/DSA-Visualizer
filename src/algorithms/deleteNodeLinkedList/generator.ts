import type { VisualizationStep, AdvancedLinkedListState, AdvancedLinkedListNode } from "@/types";

export function* generateDeleteNodeLinkedListSteps(array: number[], k: number): Generator<VisualizationStep<AdvancedLinkedListState>> {
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
    phase: "init",
    extraInfo: `k = ${k}`
  };

  yield {
    state: JSON.parse(JSON.stringify(state)),
    activeLine: 0,
    explanation: `We want to delete the node at index ${k} (0-indexed).`,
    beginnerExplanation: `We want to remove the node at position ${k}.`,
    complexityMetrics: { operations: 0, reads: 0, writes: 0 }
  };

  if (nodes.length === 0) return;

  const metrics = { operations: 0, reads: 0, writes: 0 };

  metrics.reads++; 
  yield {
    state: JSON.parse(JSON.stringify(state)),
    activeLine: 1,
    explanation: `Check if k == 0.`,
    beginnerExplanation: `First, we check if we need to delete the very first node.`,
    complexityMetrics: { ...metrics }
  };

  if (k === 0) {
    state.pointers.head = nodes.length > 1 ? nodes[1].id : null;
    state.pointers.deleted = nodes[0].id;
    state.nodes[0].y += 100; 
    state.nodes[0].nextId = null;
    metrics.operations++;
    metrics.reads++;
    yield {
      state: JSON.parse(JSON.stringify(state)),
      activeLine: 2,
      explanation: `k is 0, so we return head.next as the new head.`,
      beginnerExplanation: `Since k is 0, we just bypass the first node and make the second node the new head.`,
      complexityMetrics: { ...metrics }
    };
    return;
  }

  state.pointers.curr = state.pointers.head;
  metrics.writes++;
  yield {
    state: JSON.parse(JSON.stringify(state)),
    activeLine: 3,
    explanation: `Initialize curr pointer at head.`,
    beginnerExplanation: `We start our journey at the first node.`,
    complexityMetrics: { ...metrics }
  };

  let currIdx = 0;
  for (let i = 0; i < k; i++) {
    metrics.operations++;
    
    yield {
      state: JSON.parse(JSON.stringify(state)),
      activeLine: 4,
      explanation: `Looping to reach the k-th node. Currently i=${i}.`,
      beginnerExplanation: `We step forward until we reach the node just before the one we want to delete.`,
      complexityMetrics: { ...metrics }
    };

    state.pointers.prev = nodes[currIdx].id;
    metrics.writes++;
    yield {
      state: JSON.parse(JSON.stringify(state)),
      activeLine: 5,
      explanation: `Update prev to curr.`,
      beginnerExplanation: `The 'prev' pointer follows 'curr'.`,
      complexityMetrics: { ...metrics }
    };

    currIdx++;
    state.pointers.curr = currIdx < nodes.length ? nodes[currIdx].id : null;
    metrics.reads++;
    metrics.writes++;

    yield {
      state: JSON.parse(JSON.stringify(state)),
      activeLine: 6,
      explanation: `Move curr forward.`,
      beginnerExplanation: `We move 'curr' to the next node.`,
      complexityMetrics: { ...metrics }
    };
  }

  const isCritical = k > 0;
  
  if (currIdx < nodes.length) {
    const prevNodeId = state.pointers.prev!;
    const prevNode = state.nodes.find(n => n.id === prevNodeId)!;
    const currNode = state.nodes.find(n => n.id === state.pointers.curr!)!;
    
    prevNode.nextId = currNode.nextId;
    metrics.reads += 2;
    metrics.writes++;

    state.pointers.deleted = currNode.id;
    currNode.y += 100;

    yield {
      state: JSON.parse(JSON.stringify(state)),
      activeLine: 7,
      explanation: `Bypass curr by setting prev.next = curr.next.`,
      beginnerExplanation: `We change the arrow of the previous node to point to the node AFTER the current one. This removes the current node from the chain!`,
      complexityMetrics: { ...metrics },
      ...(isCritical ? {
        dryRunPrompt: {
          question: "What happens to the 'curr' node after we change prev.next?",
          options: [
            "It moves to the end of the list.",
            "It is completely removed from the list, as no node points to it anymore.",
            "It becomes the new head of the list."
          ],
          correctOptionIndex: 1
        }
      } : {})
    };
  }

  yield {
    state: JSON.parse(JSON.stringify(state)),
    activeLine: 8,
    explanation: `Return head.`,
    beginnerExplanation: `We return the original head since it wasn't deleted.`,
    complexityMetrics: { ...metrics }
  };
}

export function generateRandomDeleteNodeInput(size: number): { array: number[], k: number } {
  return {
    array: Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10),
    k: Math.floor(Math.random() * size)
  };
}
