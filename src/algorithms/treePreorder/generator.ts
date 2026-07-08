import type { VisualizationStep, TreeTraversalState, TreeNode, ComplexityMetrics } from "@/types";

export function generateTreePreorderSteps(
  nodes: TreeNode[],
  rootId: string | null
): VisualizationStep<TreeTraversalState>[] {
  const steps: VisualizationStep<TreeTraversalState>[] = [];
  const visitedNodeIds: string[] = [];

  const nodeMap = new Map<string, TreeNode>();
  for (const node of nodes) {
    nodeMap.set(node.id, node);
  }

  let operations = 0;
  let recursiveCalls = 0;

  const getMetrics = (): ComplexityMetrics => ({
    operations,
    recursiveCalls,
    comparisons: 0,
  });

  // Initial step
  steps.push({
    state: {
      nodes,
      rootId,
      currentNodeId: null,
      visitedNodeIds: [...visitedNodeIds],
      callStackIds: [],
      phase: "init",
    },
    activeLine: 0,
    explanation: "Starting pre-order traversal. We will visit nodes in this order: Root, Left, Right.",
    beginnerExplanation: "Pre-order traversal means we look at the current item first, then explore its left side completely, and finally its right side.",
    complexityMetrics: getMetrics(),
  });

  function traverse(nodeId: string | null, parentId: string | null = null, side: "left" | "right" | null = null, parentStack: string[] = []) {
    recursiveCalls++;
    const virtualId = nodeId || (parentId ? `${parentId}-null-${side}` : "null-root");
    const currentStack = nodeId ? [...parentStack, nodeId] : [...parentStack, "null"];
    
    operations++; // null check
    // 1. if node is null
    steps.push({
      state: {
        nodes,
        rootId,
        currentNodeId: virtualId,
        visitedNodeIds: [...visitedNodeIds],
        callStackIds: currentStack,
        phase: "traversing",
      },
      activeLine: 1,
      explanation: `Checking if node is null.`,
      beginnerExplanation: `We check if there is a node here.`,
      complexityMetrics: getMetrics(),
    });

    if (!nodeId) {
      operations++; // return
      // 2. return
      steps.push({
        state: {
          nodes,
          rootId,
          currentNodeId: virtualId,
          visitedNodeIds: [...visitedNodeIds],
          callStackIds: currentStack,
          phase: "traversing",
        },
        activeLine: 2,
        explanation: `Node is null, returning to previous caller.`,
        beginnerExplanation: `There's no node here, so we go back.`,
        complexityMetrics: getMetrics(),
      });
      return;
    }

    const node = nodeMap.get(nodeId)!;

    operations++; // visit
    // 3. visit(node)
    visitedNodeIds.push(nodeId);
    steps.push({
      state: {
        nodes,
        rootId,
        currentNodeId: virtualId,
        visitedNodeIds: [...visitedNodeIds],
        callStackIds: currentStack,
        phase: "traversing",
      },
      activeLine: 3,
      explanation: `Visiting node ${node.value}. (Root)`,
      beginnerExplanation: `We 'visit' or record the current node's value: ${node.value}.`,
      complexityMetrics: getMetrics(),
    });

    // 4. preOrder(node.left)
    steps.push({
      state: {
        nodes,
        rootId,
        currentNodeId: virtualId,
        visitedNodeIds: [...visitedNodeIds],
        callStackIds: currentStack,
        phase: "traversing",
      },
      activeLine: 4,
      explanation: `Recursively calling preOrder on the left child of ${node.value}.`,
      beginnerExplanation: `Now we move down to the left child and repeat the whole process.`,
      complexityMetrics: getMetrics(),
    });
    operations++;
    traverse(node.left, nodeId, "left", currentStack);

    // 5. preOrder(node.right)
    steps.push({
      state: {
        nodes,
        rootId,
        currentNodeId: virtualId, // After left is done, we are back at current node
        visitedNodeIds: [...visitedNodeIds],
        callStackIds: currentStack,
        phase: "traversing",
      },
      activeLine: 5,
      explanation: `Left subtree of ${node.value} is done. Now recursively calling preOrder on the right child.`,
      beginnerExplanation: `We've finished exploring the left side of ${node.value}. Now we move down to the right child.`,
      complexityMetrics: getMetrics(),
    });
    operations++;
    traverse(node.right, nodeId, "right", currentStack);

    operations++; // return
    // Return step
    steps.push({
      state: {
        nodes,
        rootId,
        currentNodeId: virtualId,
        visitedNodeIds: [...visitedNodeIds],
        callStackIds: parentStack,
        phase: "traversing",
      },
      activeLine: 0,
      explanation: `Finished exploring subtree of ${node.value}. Returning to parent.`,
      beginnerExplanation: `We have completely finished with ${node.value}. We go back up the tree.`,
      complexityMetrics: getMetrics(),
    });
  }

  traverse(rootId);

  // Complete step
  steps.push({
    state: {
      nodes,
      rootId,
      currentNodeId: null,
      visitedNodeIds: [...visitedNodeIds],
      callStackIds: [],
      phase: "complete",
    },
    activeLine: 0,
    explanation: "Pre-order traversal complete.",
    beginnerExplanation: "We have visited all nodes in the tree using the Pre-order sequence!",
    complexityMetrics: getMetrics(),
  });

  return steps;
}

export function runTreePreorderExperiment(inputSize: number): ComplexityMetrics {
  let operations = 0;
  let recursiveCalls = 0;

  // Simulate a balanced tree for the experiment
  function traverse(n: number) {
    recursiveCalls++;
    operations++; // null check
    if (n === 0) {
      operations++; // return
      return;
    }
    operations++; // visit
    operations++; // traverse left
    traverse(Math.floor((n - 1) / 2));
    operations++; // traverse right
    traverse(Math.ceil((n - 1) / 2));
    operations++; // return
  }

  traverse(inputSize);

  return { operations, recursiveCalls, comparisons: 0 };
}
