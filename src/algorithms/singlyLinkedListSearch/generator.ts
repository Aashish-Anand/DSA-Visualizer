import type { VisualizationStep, LinkedListState, LinkedListNode, ComplexityMetrics } from "@/types";

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

  let comparisons = 0;
  let operations = 0;

  const getMetrics = (): ComplexityMetrics => ({
    comparisons,
    operations,
  });

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
    complexityMetrics: getMetrics(),
  });

  operations++; // head check
  if (!headId) {
    steps.push({
      state: createBaseState(null, null, "not-found"),
      activeLine: 6,
      explanation: `The linked list is empty (head is null). Returning null.`,
      beginnerExplanation: `Our chain is completely empty! So we definitely can't find ${target}.`,
      complexityMetrics: getMetrics(),
    });
    return steps;
  }

  let currId: string | null = headId;
  operations++;

  steps.push({
    state: createBaseState(currId, null),
    activeLine: 1,
    explanation: `Set curr pointer to the head of the list.`,
    beginnerExplanation: `We put our 'CURR' (current) marker on the first box (the HEAD).`,
    complexityMetrics: getMetrics(),
  });

  while (currId !== null) {
    operations++; // while condition
    const currNode = nodes.find(n => n.id === currId)!;
    operations++; // accessing node

    steps.push({
      state: createBaseState(currId, null),
      activeLine: 2,
      explanation: `Checking condition: curr != null. Condition is true.`,
      beginnerExplanation: `Are we still on a box? Yes!`,
      complexityMetrics: getMetrics(),
    });

    steps.push({
      state: createBaseState(currId, null),
      activeLine: 3,
      explanation: `Comparing curr.value (${currNode.value}) with target (${target}).`,
      beginnerExplanation: `Let's open this box. Is ${currNode.value} equal to our target ${target}?`,
      complexityMetrics: getMetrics(),
    });

    comparisons++;
    if (currNode.value === target) {
      operations++;
      steps.push({
        state: createBaseState(currId, currId, "found"),
        activeLine: 4,
        explanation: `Target ${target} found! Returning the node.`,
        beginnerExplanation: `Yes! We found the box with our target! 🎉`,
        complexityMetrics: getMetrics(),
      });
      return steps;
    }

    operations++;
    steps.push({
      state: createBaseState(currId, null),
      activeLine: 5,
      explanation: `curr.value != target. Moving curr to curr.next.`,
      beginnerExplanation: `Not this one. Let's follow the arrow to the next box!`,
      complexityMetrics: getMetrics(),
    });

    currId = currNode.nextId;
    operations++;

    if (currId) {
      steps.push({
        state: createBaseState(currId, null),
        activeLine: 5,
        explanation: `curr is now pointing to the next node.`,
        beginnerExplanation: `We've moved our 'CURR' marker to the next box.`,
        complexityMetrics: getMetrics(),
      });
    }
  }
  operations++; // final while condition failure

  steps.push({
    state: createBaseState(null, null, "not-found"),
    activeLine: 2,
    explanation: `Checking condition: curr != null. Condition is false (curr is null).`,
    beginnerExplanation: `We followed the last arrow and it led to nowhere (null).`,
    complexityMetrics: getMetrics(),
  });

  steps.push({
    state: createBaseState(null, null, "not-found"),
    activeLine: 6,
    explanation: `Reached the end of the list without finding target ${target}. Returning null.`,
    beginnerExplanation: `We checked every single box in the chain and couldn't find ${target}.`,
    complexityMetrics: getMetrics(),
  });

  return steps;
}

export function runSinglyLinkedListSearchExperiment(inputSize: number): ComplexityMetrics {
  const array = Array.from({ length: inputSize }, () => Math.random());
  const target = -1; // worst case: target not in list
  
  let comparisons = 0;
  let operations = 0;

  operations++; // head check
  let curr = 0;
  operations++; // curr init

  while (curr < array.length) {
    operations++; // while check
    
    comparisons++;
    if (array[curr] === target) {
      operations++;
      return { comparisons, operations };
    }
    
    operations++; // if miss
    curr++; // simulate curr = curr.next
    operations++;
  }
  operations++; // while exit

  return { comparisons, operations };
}
