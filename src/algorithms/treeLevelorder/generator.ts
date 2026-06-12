import type { VisualizationStep, TreeTraversalState, TreeNode } from "@/types";

export function generateTreeLevelorderSteps(
  nodes: TreeNode[],
  rootId: string | null
): VisualizationStep<TreeTraversalState>[] {
  const steps: VisualizationStep<TreeTraversalState>[] = [];
  const visitedNodeIds: string[] = [];
  const queueIds: string[] = [];

  const nodeMap = new Map<string, TreeNode>();
  for (const node of nodes) {
    nodeMap.set(node.id, node);
  }

  // Initial step
  steps.push({
    state: {
      nodes,
      rootId,
      currentNodeId: null,
      visitedNodeIds: [...visitedNodeIds],
      queueIds: [...queueIds],
      phase: "init",
    },
    activeLine: 0,
    explanation: "Starting level-order traversal (BFS). We use a Queue to keep track of nodes.",
    beginnerExplanation: "Level-order traversal visits nodes level by level, left to right. We use a 'line' or queue to remember which node to visit next.",
  });

  // 1. if root is null return
  steps.push({
    state: {
      nodes,
      rootId,
      currentNodeId: null,
      visitedNodeIds: [...visitedNodeIds],
      queueIds: [...queueIds],
      phase: "traversing",
    },
    activeLine: 1,
    explanation: "Checking if root is null.",
    beginnerExplanation: "First, we check if the tree is empty.",
  });

  if (!rootId) {
    steps.push({
      state: {
        nodes,
        rootId,
        currentNodeId: null,
        visitedNodeIds: [...visitedNodeIds],
        queueIds: [...queueIds],
        phase: "complete",
      },
      activeLine: 1,
      explanation: "Tree is empty.",
      beginnerExplanation: "The tree is empty, so there's nothing to traverse.",
    });
    return steps;
  }

  // 2. queue.enqueue(root)
  queueIds.push(rootId);
  steps.push({
    state: {
      nodes,
      rootId,
      currentNodeId: null,
      visitedNodeIds: [...visitedNodeIds],
      queueIds: [...queueIds],
      phase: "traversing",
    },
    activeLine: 2,
    explanation: "Enqueueing the root node to start.",
    beginnerExplanation: "We put the root node into our queue so we can visit it.",
  });

  // 3. while queue is not empty
  while (queueIds.length > 0) {
    steps.push({
      state: {
        nodes,
        rootId,
        currentNodeId: null,
        visitedNodeIds: [...visitedNodeIds],
        queueIds: [...queueIds],
        phase: "traversing",
      },
      activeLine: 3,
      explanation: `Queue has ${queueIds.length} item(s). Continuing loop.`,
      beginnerExplanation: `As long as our queue isn't empty, we keep going.`,
    });

    // 4. node = queue.dequeue()
    const currentId = queueIds.shift()!;
    const node = nodeMap.get(currentId)!;

    steps.push({
      state: {
        nodes,
        rootId,
        currentNodeId: currentId,
        visitedNodeIds: [...visitedNodeIds],
        queueIds: [...queueIds],
        phase: "traversing",
      },
      activeLine: 4,
      explanation: `Dequeued node ${node.value} from the queue.`,
      beginnerExplanation: `We take the next node out of the line. It's ${node.value}.`,
    });

    // 5. visit(node)
    visitedNodeIds.push(currentId);
    steps.push({
      state: {
        nodes,
        rootId,
        currentNodeId: currentId,
        visitedNodeIds: [...visitedNodeIds],
        queueIds: [...queueIds],
        phase: "traversing",
      },
      activeLine: 5,
      explanation: `Visiting node ${node.value}.`,
      beginnerExplanation: `We 'visit' or record the value of the current node: ${node.value}.`,
    });

    // 6. if node.left: queue.enqueue(node.left)
    steps.push({
      state: {
        nodes,
        rootId,
        currentNodeId: currentId,
        visitedNodeIds: [...visitedNodeIds],
        queueIds: [...queueIds],
        phase: "traversing",
      },
      activeLine: 6,
      explanation: `Checking left child of ${node.value}.`,
      beginnerExplanation: `Does ${node.value} have a left child?`,
    });

    if (node.left) {
      queueIds.push(node.left);
      steps.push({
        state: {
          nodes,
          rootId,
          currentNodeId: currentId,
          visitedNodeIds: [...visitedNodeIds],
          queueIds: [...queueIds],
          phase: "traversing",
        },
        activeLine: 6,
        explanation: `Enqueued left child of ${node.value}.`,
        beginnerExplanation: `Yes! We add the left child to our line so we visit it later.`,
      });
    }

    // 7. if node.right: queue.enqueue(node.right)
    steps.push({
      state: {
        nodes,
        rootId,
        currentNodeId: currentId,
        visitedNodeIds: [...visitedNodeIds],
        queueIds: [...queueIds],
        phase: "traversing",
      },
      activeLine: 7,
      explanation: `Checking right child of ${node.value}.`,
      beginnerExplanation: `Does ${node.value} have a right child?`,
    });

    if (node.right) {
      queueIds.push(node.right);
      steps.push({
        state: {
          nodes,
          rootId,
          currentNodeId: currentId,
          visitedNodeIds: [...visitedNodeIds],
          queueIds: [...queueIds],
          phase: "traversing",
        },
        activeLine: 7,
        explanation: `Enqueued right child of ${node.value}.`,
        beginnerExplanation: `Yes! We add the right child to our line so we visit it later.`,
      });
    }
  }

  // Complete step
  steps.push({
    state: {
      nodes,
      rootId,
      currentNodeId: null,
      visitedNodeIds: [...visitedNodeIds],
      queueIds: [...queueIds],
      phase: "complete",
    },
    activeLine: 0,
    explanation: "Level-order traversal complete.",
    beginnerExplanation: "Queue is empty. We have visited all nodes in the tree level by level!",
  });

  return steps;
}
