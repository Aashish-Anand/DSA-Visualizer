import type { VisualizationStep, GraphTraversalState, GraphNode, GraphEdge } from "@/types";

export function generateGraphDfsSteps(
  nodes: GraphNode[],
  edges: GraphEdge[],
  startNodeId: string
): VisualizationStep<GraphTraversalState>[] {
  const steps: VisualizationStep<GraphTraversalState>[] = [];
  const visitedNodeIds: string[] = [];
  const callStackIds: string[] = [];

  const nodeMap = new Map<string, GraphNode>();
  for (const node of nodes) {
    nodeMap.set(node.id, node);
  }

  steps.push({
    state: {
      nodes, edges, startNodeId, currentNodeId: null,
      visitedNodeIds: [...visitedNodeIds], callStackIds: [...callStackIds], phase: "init",
    },
    activeLine: 0,
    explanation: "Starting Graph DFS. We iterate over all nodes to ensure we visit disconnected components.",
    beginnerExplanation: "DFS explores a graph by going as deep as possible. We use an outer loop to make sure no disconnected parts are left behind.",
  });

  function dfs(nodeId: string) {
    const node = nodeMap.get(nodeId)!;
    
    callStackIds.push(nodeId);

    steps.push({
      state: {
        nodes, edges, startNodeId, currentNodeId: nodeId,
        visitedNodeIds: [...visitedNodeIds], callStackIds: [...callStackIds], phase: "traversing",
      },
      activeLine: 6,
      explanation: `Checking if node ${node.value} is already visited.`,
      beginnerExplanation: `Have we already been to node ${node.value}?`,
    });

    if (visitedNodeIds.includes(nodeId)) {
      steps.push({
        state: {
          nodes, edges, startNodeId, currentNodeId: nodeId,
          visitedNodeIds: [...visitedNodeIds], callStackIds: [...callStackIds], phase: "traversing",
        },
        activeLine: 6,
        explanation: `Node ${node.value} is visited, returning.`,
        beginnerExplanation: `Yes, we have. So we backtrack.`,
      });
      callStackIds.pop();
      return;
    }

    visitedNodeIds.push(nodeId);
    steps.push({
      state: {
        nodes, edges, startNodeId, currentNodeId: nodeId,
        visitedNodeIds: [...visitedNodeIds], callStackIds: [...callStackIds], phase: "traversing",
      },
      activeLine: 7,
      explanation: `Marking node ${node.value} as visited.`,
      beginnerExplanation: `No, this is our first time! Let's mark ${node.value} as visited.`,
    });

    steps.push({
      state: {
        nodes, edges, startNodeId, currentNodeId: nodeId,
        visitedNodeIds: [...visitedNodeIds], callStackIds: [...callStackIds], phase: "traversing",
      },
      activeLine: 8,
      explanation: `Iterating over neighbors of ${node.value}.`,
      beginnerExplanation: `Let's look at all the paths going out from ${node.value}.`,
    });

    for (const neighborId of node.neighbors) {
      const neighborNode = nodeMap.get(neighborId)!;
      steps.push({
        state: {
          nodes, edges, startNodeId, currentNodeId: nodeId,
          visitedNodeIds: [...visitedNodeIds], callStackIds: [...callStackIds], phase: "traversing",
        },
        activeLine: 9,
        explanation: `Calling dfs on neighbor ${neighborNode.value}.`,
        beginnerExplanation: `Let's explore down the path to ${neighborNode.value}.`,
      });
      
      dfs(neighborId);
      
      steps.push({
        state: {
          nodes, edges, startNodeId, currentNodeId: nodeId,
          visitedNodeIds: [...visitedNodeIds], callStackIds: [...callStackIds], phase: "traversing",
        },
        activeLine: 8,
        explanation: `Backtracked to ${node.value}. Checking next neighbor.`,
        beginnerExplanation: `We're back at ${node.value}. Are there any other paths to take?`,
      });
    }

    callStackIds.pop();
  }

  const allIds = [startNodeId, ...nodes.map(n => n.id).filter(id => id !== startNodeId)];
  
  for (const nodeId of allIds) {
    const node = nodeMap.get(nodeId)!;
    steps.push({
      state: {
        nodes, edges, startNodeId, currentNodeId: null,
        visitedNodeIds: [...visitedNodeIds], callStackIds: [...callStackIds], phase: "traversing",
      },
      activeLine: 1,
      explanation: `Iterating nodes. Next node is ${node.value}.`,
      beginnerExplanation: `Let's check the next node to make sure no disconnected parts are left behind.`,
    });

    steps.push({
      state: {
        nodes, edges, startNodeId, currentNodeId: null,
        visitedNodeIds: [...visitedNodeIds], callStackIds: [...callStackIds], phase: "traversing",
      },
      activeLine: 2,
      explanation: `Is node ${node.value} already visited?`,
      beginnerExplanation: `Is node ${node.value} visited?`,
    });

    if (!visitedNodeIds.includes(nodeId)) {
      steps.push({
        state: {
          nodes, edges, startNodeId, currentNodeId: null,
          visitedNodeIds: [...visitedNodeIds], callStackIds: [...callStackIds], phase: "traversing",
        },
        activeLine: 3,
        explanation: `Node ${node.value} is not visited. Starting DFS from it.`,
        beginnerExplanation: `It is unvisited! We start a new DFS from here.`,
      });

      dfs(nodeId);
    }
  }

  steps.push({
    state: {
      nodes, edges, startNodeId, currentNodeId: null,
      visitedNodeIds: [...visitedNodeIds], callStackIds: [...callStackIds], phase: "complete",
    },
    activeLine: 0,
    explanation: "DFS complete across all components.",
    beginnerExplanation: "We've explored all nodes deeply in all components!",
  });

  return steps;
}
