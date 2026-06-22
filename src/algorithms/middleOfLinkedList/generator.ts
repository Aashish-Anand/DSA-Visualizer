import type { VisualizationStep, AdvancedLinkedListState, AdvancedLinkedListNode } from "@/types";

export function* generateMiddleOfLinkedListSteps(array: number[]): Generator<VisualizationStep<AdvancedLinkedListState>> {
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
    explanation: "Initialize to find the middle node.",
    beginnerExplanation: "We have our linked list ready. The 'head' points to the first node.",
    complexityMetrics: { operations: 0, reads: 0, writes: 0 }
  };

  if (nodes.length === 0) return;

  state.pointers.slow = state.pointers.head;
  yield {
    state: JSON.parse(JSON.stringify(state)),
    activeLine: 1,
    explanation: "Initialize the slow pointer at head.",
    beginnerExplanation: "The 'slow' pointer starts at the beginning.",
    complexityMetrics: { operations: 1, reads: 1, writes: 1 }
  };

  state.pointers.fast = state.pointers.head;
  yield {
    state: JSON.parse(JSON.stringify(state)),
    activeLine: 2,
    explanation: "Initialize the fast pointer at head.",
    beginnerExplanation: "The 'fast' pointer also starts at the beginning. It will move twice as fast as the slow pointer.",
    complexityMetrics: { operations: 2, reads: 2, writes: 2 }
  };

  let slowIdx = 0;
  let fastIdx = 0;
  const metrics = { operations: 2, reads: 2, writes: 2 };

  while (fastIdx < nodes.length && fastIdx + 1 < nodes.length) {
    metrics.operations++;
    metrics.reads += 2; 
    
    const isCritical = slowIdx === 1;

    yield {
      state: JSON.parse(JSON.stringify(state)),
      activeLine: 3,
      explanation: `Check if fast and fast.next are not null. fast is at index ${fastIdx}, which is valid.`,
      beginnerExplanation: "As long as the fast pointer can still jump forward by two, we keep going.",
      complexityMetrics: { ...metrics },
      ...(isCritical ? {
        dryRunPrompt: {
          question: "Why does the fast pointer moving twice as fast find the middle?",
          options: [
            "Because it skips the nodes we don't care about.",
            "Because when fast travels the full distance, slow will have traveled exactly half the distance.",
            "Because it reaches the end of the list first, returning null."
          ],
          correctOptionIndex: 1
        }
      } : {})
    };

    slowIdx += 1;
    state.pointers.slow = nodes[slowIdx].id;
    metrics.reads++;
    metrics.writes++;

    yield {
      state: JSON.parse(JSON.stringify(state)),
      activeLine: 4,
      explanation: "Move slow pointer one step forward.",
      beginnerExplanation: "The slow pointer takes one step.",
      complexityMetrics: { ...metrics }
    };

    fastIdx += 2;
    state.pointers.fast = fastIdx < nodes.length ? nodes[fastIdx].id : null;
    metrics.reads++;
    metrics.writes++;

    yield {
      state: JSON.parse(JSON.stringify(state)),
      activeLine: 5,
      explanation: "Move fast pointer two steps forward.",
      beginnerExplanation: "The fast pointer takes two steps.",
      complexityMetrics: { ...metrics }
    };
  }

  metrics.reads++;
  state.pointers.found = state.pointers.slow;
  delete state.pointers.fast;
  state.phase = "complete";

  yield {
    state: JSON.parse(JSON.stringify(state)),
    activeLine: 6,
    explanation: "Loop terminates. Return slow pointer which is exactly at the middle.",
    beginnerExplanation: "The fast pointer has reached the end! Since it travels twice as fast, the slow pointer is exactly in the middle. We've found it!",
    complexityMetrics: { ...metrics }
  };
}
