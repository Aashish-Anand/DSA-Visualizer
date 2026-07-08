import type { VisualizationStep, GraphTraversalState, GraphNode, GraphEdge, ComplexityMetrics } from "@/types";

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

  let operations = 0;
  let comparisons = 0;
  let recursiveCalls = 0;
  let reads = 0;
  let writes = 0;

  const getMetrics = (): ComplexityMetrics => ({
    operations, comparisons, recursiveCalls, reads, writes
  });

  steps.push({
    state: {
      nodes, edges, startNodeId, currentNodeId: null,
      visitedNodeIds: [...visitedNodeIds], callStackIds: [...callStackIds], phase: "init",
    },
    activeLine: 0,
    explanation: "Starting Graph DFS. We iterate over all nodes to ensure we visit disconnected components.",
    beginnerExplanation: "DFS explores a graph by going as deep as possible. We use an outer loop to make sure no disconnected parts are left behind.",
    complexityMetrics: getMetrics(),
  });

  function dfs(nodeId: string) {
    recursiveCalls++;
    operations++; // function entry
    reads++;
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
      complexityMetrics: getMetrics(),
    });

    operations++; // visited check
    reads++;
    comparisons++;
    if (visitedNodeIds.includes(nodeId)) {
      operations++; // pop
      writes++;
      steps.push({
        state: {
          nodes, edges, startNodeId, currentNodeId: nodeId,
          visitedNodeIds: [...visitedNodeIds], callStackIds: [...callStackIds], phase: "traversing",
        },
        activeLine: 6,
        explanation: `Node ${node.value} is visited, returning.`,
        beginnerExplanation: `Yes, we have. So we backtrack.`,
        complexityMetrics: getMetrics(),
      });
      callStackIds.pop();
      return;
    }

    operations++; // mark visited
    writes++;
    visitedNodeIds.push(nodeId);
    steps.push({
      state: {
        nodes, edges, startNodeId, currentNodeId: nodeId,
        visitedNodeIds: [...visitedNodeIds], callStackIds: [...callStackIds], phase: "traversing",
      },
      activeLine: 7,
      explanation: `Marking node ${node.value} as visited.`,
      beginnerExplanation: `No, this is our first time! Let's mark ${node.value} as visited.`,
      complexityMetrics: getMetrics(),
    });

    steps.push({
      state: {
        nodes, edges, startNodeId, currentNodeId: nodeId,
        visitedNodeIds: [...visitedNodeIds], callStackIds: [...callStackIds], phase: "traversing",
      },
      activeLine: 8,
      explanation: `Iterating over neighbors of ${node.value}.`,
      beginnerExplanation: `Let's look at all the paths going out from ${node.value}.`,
      complexityMetrics: getMetrics(),
    });

    for (const neighborId of node.neighbors) {
      operations++; // loop
      reads++;
      const neighborNode = nodeMap.get(neighborId)!;
      steps.push({
        state: {
          nodes, edges, startNodeId, currentNodeId: nodeId,
          visitedNodeIds: [...visitedNodeIds], callStackIds: [...callStackIds], phase: "traversing",
        },
        activeLine: 9,
        explanation: `Calling dfs on neighbor ${neighborNode.value}.`,
        beginnerExplanation: `Let's explore down the path to ${neighborNode.value}.`,
        complexityMetrics: getMetrics(),
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
        complexityMetrics: getMetrics(),
      });
    }

    operations++; // pop
    writes++;
    callStackIds.pop();
  }

  const allIds = [startNodeId, ...nodes.map(n => n.id).filter(id => id !== startNodeId)];
  
  for (const nodeId of allIds) {
    operations++; // loop
    reads++;
    const node = nodeMap.get(nodeId)!;
    steps.push({
      state: {
        nodes, edges, startNodeId, currentNodeId: null,
        visitedNodeIds: [...visitedNodeIds], callStackIds: [...callStackIds], phase: "traversing",
      },
      activeLine: 1,
      explanation: `Iterating nodes. Next node is ${node.value}.`,
      beginnerExplanation: `Let's check the next node to make sure no disconnected parts are left behind.`,
      complexityMetrics: getMetrics(),
    });

    steps.push({
      state: {
        nodes, edges, startNodeId, currentNodeId: null,
        visitedNodeIds: [...visitedNodeIds], callStackIds: [...callStackIds], phase: "traversing",
      },
      activeLine: 2,
      explanation: `Is node ${node.value} already visited?`,
      beginnerExplanation: `Is node ${node.value} visited?`,
      complexityMetrics: getMetrics(),
    });

    operations++; // visited check
    reads++;
    comparisons++;
    if (!visitedNodeIds.includes(nodeId)) {
      steps.push({
        state: {
          nodes, edges, startNodeId, currentNodeId: null,
          visitedNodeIds: [...visitedNodeIds], callStackIds: [...callStackIds], phase: "traversing",
        },
        activeLine: 3,
        explanation: `Node ${node.value} is not visited. Starting DFS from it.`,
        beginnerExplanation: `It is unvisited! We start a new DFS from here.`,
        complexityMetrics: getMetrics(),
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
    complexityMetrics: getMetrics(),
  });

  return steps;
}

export function runGraphDfsExperiment(inputSize: number): ComplexityMetrics {
  const V = Math.floor(inputSize / 3) + 1;
  const E = Math.max(0, inputSize - V);

  let operations = 0;
  let comparisons = 0;
  let recursiveCalls = 0;
  let reads = 0;
  let writes = 0;

  // Simulate DFS
  let edgesProcessed = 0;

  function simulateDfs(nodeIndex: number) {
    recursiveCalls++;
    operations++; // function entry
    reads++;

    operations++; // visited check
    reads++;
    comparisons++;
    
    // Node is not visited
    operations++; // mark visited
    writes++;

    // Average neighbors per node
    const avgNeighbors = Math.ceil(2 * E / V);
    
    for (let j = 0; j < avgNeighbors; j++) {
      if (edgesProcessed >= 2 * E) break;
      edgesProcessed++;

      operations++; // loop
      reads++;
      
      // Assume first V-1 edges lead to unvisited nodes (tree-like expansion)
      if (nodeIndex === 0 && edgesProcessed < V) {
        simulateDfs(nodeIndex + 1);
      } else {
        // Hitting a visited node
        recursiveCalls++;
        operations++; // function entry
        reads++;

        operations++; // visited check
        reads++;
        comparisons++;

        operations++; // return pop
        writes++;
      }
    }
    
    operations++; // pop
    writes++;
  }

  // Outer loop to iterate all nodes
  for (let i = 0; i < V; i++) {
    operations++;
    reads++;
    operations++; // visited check
    reads++;
    comparisons++;
    
    // Assume only the first node triggers the DFS deeply
    if (i === 0) {
      simulateDfs(i);
    }
  }

  return { operations, comparisons, recursiveCalls, reads, writes };
}
