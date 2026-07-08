import type { VisualizationStep, TreeTraversalState, TreeNode, ComplexityMetrics } from "@/types";

export function generateTreeInorderSteps(
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
    explanation: "Starting in-order traversal. We will visit nodes in this order: Left, Root, Right.",
    beginnerExplanation: "In-order traversal means we explore the left side completely, then visit the current node, and finally explore the right side.",
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

    // 3. inOrder(node.left)
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
      explanation: `Recursively calling inOrder on the left child of ${node.value}.`,
      beginnerExplanation: `First, we move down to explore the entire left child of ${node.value}.`,
      complexityMetrics: getMetrics(),
    });
    operations++;
    traverse(node.left, nodeId, "left", currentStack);

    operations++; // visit
    // 4. visit(node)
    visitedNodeIds.push(nodeId);
    steps.push({
      state: {
        nodes,
        rootId,
        currentNodeId: virtualId, // After left is done, we are back at current node
        visitedNodeIds: [...visitedNodeIds],
        callStackIds: currentStack,
        phase: "traversing",
      },
      activeLine: 4,
      explanation: `Visiting node ${node.value}. (Root)`,
      beginnerExplanation: `We've explored the left side, so now we 'visit' or record the current node's value: ${node.value}.`,
      complexityMetrics: getMetrics(),
    });

    // 5. inOrder(node.right)
    steps.push({
      state: {
        nodes,
        rootId,
        currentNodeId: virtualId,
        visitedNodeIds: [...visitedNodeIds],
        callStackIds: currentStack,
        phase: "traversing",
      },
      activeLine: 5,
      explanation: `Now recursively calling inOrder on the right child of ${node.value}.`,
      beginnerExplanation: `Finally, we move down to explore the right child of ${node.value}.`,
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
    explanation: "In-order traversal complete.",
    beginnerExplanation: "We have visited all nodes in the tree using the In-order sequence!",
    complexityMetrics: getMetrics(),
  });

  return steps;
}

export function runTreeInorderExperiment(inputSize: number): ComplexityMetrics {
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
    operations++; // traverse left
    traverse(Math.floor((n - 1) / 2));
    operations++; // visit
    operations++; // traverse right
    traverse(Math.ceil((n - 1) / 2));
    operations++; // return
  }

  traverse(inputSize);

  return { operations, recursiveCalls, comparisons: 0 };
}
