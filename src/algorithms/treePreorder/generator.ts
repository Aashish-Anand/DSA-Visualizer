import type { VisualizationStep, TreeTraversalState, TreeNode } from "@/types";

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
  });

  function traverse(nodeId: string | null, parentId: string | null = null, side: "left" | "right" | null = null, parentStack: string[] = []) {
    const virtualId = nodeId || (parentId ? `${parentId}-null-${side}` : "null-root");
    const currentStack = nodeId ? [...parentStack, nodeId] : [...parentStack, "null"];
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
    });

    if (!nodeId) {
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
      });
      return;
    }

    const node = nodeMap.get(nodeId)!;

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
    });
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
    });
    traverse(node.right, nodeId, "right", currentStack);

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
  });

  return steps;
}
