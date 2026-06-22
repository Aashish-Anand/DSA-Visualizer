import type { VisualizationStep, AdvancedLinkedListState, AdvancedLinkedListNode } from "@/types";

export function* generateAddTwoNumbersSteps(arr1: number[], arr2: number[]): Generator<VisualizationStep<AdvancedLinkedListState>> {
  const nodes: AdvancedLinkedListNode[] = [];
  
  for (let i = 0; i < arr1.length; i++) {
    nodes.push({
      id: `l1-${i}`,
      value: arr1[i],
      nextId: i < arr1.length - 1 ? `l1-${i + 1}` : null,
      x: 100 + i * 160,
      y: 100
    });
  }

  for (let i = 0; i < arr2.length; i++) {
    nodes.push({
      id: `l2-${i}`,
      value: arr2[i],
      nextId: i < arr2.length - 1 ? `l2-${i + 1}` : null,
      x: 100 + i * 160,
      y: 220
    });
  }

  const dummyNode: AdvancedLinkedListNode = {
    id: "dummy",
    value: 0, // usually 0 or -1
    nextId: null,
    x: 100,
    y: 340
  };
  nodes.push(dummyNode);

  const state: AdvancedLinkedListState = {
    nodes: JSON.parse(JSON.stringify(nodes)),
    pointers: { 
      l1: arr1.length > 0 ? "l1-0" : null,
      l2: arr2.length > 0 ? "l2-0" : null
    },
    phase: "init",
    extraInfo: "Carry: 0, Sum: 0"
  };

  const metrics = { operations: 0, comparisons: 0, reads: 0, writes: 0 };

  yield {
    state: JSON.parse(JSON.stringify(state)),
    activeLine: 0,
    explanation: "Initialize the addition process.",
    beginnerExplanation: "We are going to add two numbers. Since the digits are reversed, we add them starting from the head (which is the ones place, then tens place, etc).",
    complexityMetrics: { ...metrics }
  };

  state.pointers.dummy = "dummy";
  state.pointers.curr = "dummy";
  metrics.writes += 2;

  yield {
    state: JSON.parse(JSON.stringify(state)),
    activeLine: 2,
    explanation: "Create a dummy node and curr pointer to build the new list.",
    beginnerExplanation: "We create a 'dummy' node to hold the start of our answer.",
    complexityMetrics: { ...metrics }
  };

  let carry = 0;
  metrics.writes++;
  
  yield {
    state: JSON.parse(JSON.stringify(state)),
    activeLine: 3,
    explanation: "Initialize carry to 0.",
    beginnerExplanation: "Just like in regular math, we start with a carry of 0.",
    complexityMetrics: { ...metrics }
  };

  let currId = "dummy";
  let currX = 100;
  let newNodeIdx = 0;

  while (state.pointers.l1 !== null || state.pointers.l2 !== null || carry !== 0) {
    metrics.operations++;
    metrics.reads += 3; 

    yield {
      state: JSON.parse(JSON.stringify(state)),
      activeLine: 4,
      explanation: "Check loop condition: l1, l2, or carry exists.",
      beginnerExplanation: "We continue as long as there are still digits to add, or we have a leftover carry.",
      complexityMetrics: { ...metrics }
    };

    let sum = carry;
    metrics.writes++;
    state.extraInfo = `Carry: ${carry}, Sum: ${sum}`;

    yield {
      state: JSON.parse(JSON.stringify(state)),
      activeLine: 5,
      explanation: `Initialize sum with current carry (${carry}).`,
      beginnerExplanation: `We start our total for this column with the carry.`,
      complexityMetrics: { ...metrics }
    };

    metrics.reads++;
    if (state.pointers.l1 !== null) {
      yield {
        state: JSON.parse(JSON.stringify(state)),
        activeLine: 6,
        explanation: "l1 is not null, so we add its value.",
        beginnerExplanation: "We have a digit from the first number, so we add it.",
        complexityMetrics: { ...metrics }
      };

      const l1Node = state.nodes.find(n => n.id === state.pointers.l1)!;
      sum += l1Node.value as number;
      metrics.reads++;
      metrics.writes++;
      state.extraInfo = `Carry: ${carry}, Sum: ${sum} (added ${l1Node.value})`;

      yield {
        state: JSON.parse(JSON.stringify(state)),
        activeLine: 7,
        explanation: `Add l1.val (${l1Node.value}) to sum. Sum is now ${sum}.`,
        beginnerExplanation: `Adding ${l1Node.value} makes our sum ${sum}.`,
        complexityMetrics: { ...metrics }
      };

      state.pointers.l1 = l1Node.nextId;
      metrics.writes++;

      yield {
        state: JSON.parse(JSON.stringify(state)),
        activeLine: 8,
        explanation: "Move l1 forward.",
        beginnerExplanation: "Move to the next digit of the first number.",
        complexityMetrics: { ...metrics }
      };
    }

    metrics.reads++;
    if (state.pointers.l2 !== null) {
      yield {
        state: JSON.parse(JSON.stringify(state)),
        activeLine: 9,
        explanation: "l2 is not null, so we add its value.",
        beginnerExplanation: "We have a digit from the second number, so we add it.",
        complexityMetrics: { ...metrics }
      };

      const l2Node = state.nodes.find(n => n.id === state.pointers.l2)!;
      sum += l2Node.value as number;
      metrics.reads++;
      metrics.writes++;
      state.extraInfo = `Carry: ${carry}, Sum: ${sum} (added ${l2Node.value})`;

      yield {
        state: JSON.parse(JSON.stringify(state)),
        activeLine: 10,
        explanation: `Add l2.val (${l2Node.value}) to sum. Sum is now ${sum}.`,
        beginnerExplanation: `Adding ${l2Node.value} makes our sum ${sum}.`,
        complexityMetrics: { ...metrics }
      };

      state.pointers.l2 = l2Node.nextId;
      metrics.writes++;

      yield {
        state: JSON.parse(JSON.stringify(state)),
        activeLine: 11,
        explanation: "Move l2 forward.",
        beginnerExplanation: "Move to the next digit of the second number.",
        complexityMetrics: { ...metrics }
      };
    }

    carry = Math.floor(sum / 10);
    metrics.writes++;
    state.extraInfo = `Carry: ${carry}, Sum: ${sum}`;

    const isCritical = sum >= 10 && carry === 1;

    yield {
      state: JSON.parse(JSON.stringify(state)),
      activeLine: 12,
      explanation: `Calculate new carry: floor(${sum} / 10) = ${carry}.`,
      beginnerExplanation: `If our sum is 10 or more, we carry over a 1 to the next column! The carry is now ${carry}.`,
      complexityMetrics: { ...metrics },
      ...(isCritical ? {
        dryRunPrompt: {
          question: "Since our sum is 10 or more, what digit will we actually store in the new node?",
          options: [
            `We will store ${sum}.`,
            `We will store ${sum % 10}.`,
            "We will store the carry."
          ],
          correctOptionIndex: 1
        }
      } : {})
    };

    const digit = sum % 10;
    const newNodeId = `res-${newNodeIdx++}`;
    currX += 160;
    
    const newNode: AdvancedLinkedListNode = {
      id: newNodeId,
      value: digit,
      nextId: null,
      x: currX,
      y: 340
    };
    state.nodes.push(newNode);
    
    const currNode = state.nodes.find(n => n.id === currId)!;
    currNode.nextId = newNodeId;
    metrics.writes++;

    yield {
      state: JSON.parse(JSON.stringify(state)),
      activeLine: 13,
      explanation: `Create new node with value ${digit} (${sum} % 10) and attach to curr.`,
      beginnerExplanation: `We put the ones-digit (${digit}) into a new node in our answer list.`,
      complexityMetrics: { ...metrics }
    };

    currId = newNodeId;
    state.pointers.curr = currId;
    metrics.writes++;

    yield {
      state: JSON.parse(JSON.stringify(state)),
      activeLine: 14,
      explanation: "Move curr forward.",
      beginnerExplanation: "Move the curr pointer forward to the new node.",
      complexityMetrics: { ...metrics }
    };
  }

  delete state.pointers.curr;
  delete state.pointers.l1;
  delete state.pointers.l2;
  state.extraInfo = undefined;
  state.phase = "complete";
  state.pointers.head = state.nodes.find(n => n.id === "dummy")!.nextId;

  yield {
    state: JSON.parse(JSON.stringify(state)),
    activeLine: 15,
    explanation: "Loop finished. Return dummy.next.",
    beginnerExplanation: "We have finished adding all digits and carries! The final answer starts right after the dummy node.",
    complexityMetrics: { ...metrics }
  };
}

export function generateRandomAddTwoNumbersInput(size: number): { arr1: number[], arr2: number[] } {
  // size represents roughly total nodes. 
  const len1 = Math.floor(size / 2) || 1;
  const len2 = size - len1 || 1;
  
  const arr1 = Array.from({ length: len1 }, () => Math.floor(Math.random() * 10));
  const arr2 = Array.from({ length: len2 }, () => Math.floor(Math.random() * 10));
  
  return { arr1, arr2 };
}
