import type { VisualizationStep, LinkedListState, LinkedListNode } from "@/types";

export function generateSinglyLinkedListSearchSteps(
  inputArray: number[],
  target: number
): VisualizationStep<LinkedListState>[] {
  const steps: VisualizationStep<LinkedListState>[] = [];
  
  // Build linked list structure from array
  const nodes: LinkedListNode[] = inputArray.map((val, idx) => ({
    id: `node-${idx}`,
    value: val,
    nextId: idx < inputArray.length - 1 ? `node-${idx + 1}` : null,
  }));

  const headId = nodes.length > 0 ? nodes[0].id : null;

  const createBaseState = (
    currId: string | null = null,
    foundId: string | null = null,
    status: LinkedListState["status"] = "searching"
  ): LinkedListState => ({
    nodes: JSON.parse(JSON.stringify(nodes)), // Deep copy to avoid reference issues
    headId,
    currId,
    target,
    foundId,
    status,
  });

  steps.push({
    state: createBaseState(null, null),
    activeLine: 0,
    explanation: `Starting search in Singly Linked List for target ${target}.`,
    beginnerExplanation: `Let's find ${target} in our chain of boxes! We have to start at the very beginning and follow the arrows.`,
  });

  if (!headId) {
    steps.push({
      state: createBaseState(null, null, "not-found"),
      activeLine: 6,
      explanation: `The linked list is empty (head is null). Returning null.`,
      beginnerExplanation: `Our chain is completely empty! So we definitely can't find ${target}.`,
    });
    return steps;
  }

  let currId: string | null = headId;

  steps.push({
    state: createBaseState(currId, null),
    activeLine: 1,
    explanation: `Set curr pointer to the head of the list.`,
    beginnerExplanation: `We put our 'CURR' (current) marker on the first box (the HEAD).`,
  });

  while (currId !== null) {
    const currNode = nodes.find(n => n.id === currId)!;

    steps.push({
      state: createBaseState(currId, null),
      activeLine: 2,
      explanation: `Checking condition: curr != null. Condition is true.`,
      beginnerExplanation: `Are we still on a box? Yes!`,
    });

    steps.push({
      state: createBaseState(currId, null),
      activeLine: 3,
      explanation: `Comparing curr.value (${currNode.value}) with target (${target}).`,
      beginnerExplanation: `Let's open this box. Is ${currNode.value} equal to our target ${target}?`,
    });

    if (currNode.value === target) {
      steps.push({
        state: createBaseState(currId, currId, "found"),
        activeLine: 4,
        explanation: `Target ${target} found! Returning the node.`,
        beginnerExplanation: `Yes! We found the box with our target! 🎉`,
      });
      return steps;
    }

    steps.push({
      state: createBaseState(currId, null),
      activeLine: 5,
      explanation: `curr.value != target. Moving curr to curr.next.`,
      beginnerExplanation: `Not this one. Let's follow the arrow to the next box!`,
    });

    currId = currNode.nextId;

    if (currId) {
      steps.push({
        state: createBaseState(currId, null),
        activeLine: 5,
        explanation: `curr is now pointing to the next node.`,
        beginnerExplanation: `We've moved our 'CURR' marker to the next box.`,
      });
    }
  }

  steps.push({
    state: createBaseState(null, null, "not-found"),
    activeLine: 2,
    explanation: `Checking condition: curr != null. Condition is false (curr is null).`,
    beginnerExplanation: `We followed the last arrow and it led to nowhere (null).`,
  });

  steps.push({
    state: createBaseState(null, null, "not-found"),
    activeLine: 6,
    explanation: `Reached the end of the list without finding target ${target}. Returning null.`,
    beginnerExplanation: `We checked every single box in the chain and couldn't find ${target}.`,
  });

  return steps;
}
