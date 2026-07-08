import type { VisualizationStep, GraphTraversalState, GraphNode, GraphEdge, ComplexityMetrics } from "@/types";

export function generateGraphBfsSteps(
  nodes: GraphNode[],
  edges: GraphEdge[],
  startNodeId: string
): VisualizationStep<GraphTraversalState>[] {
  const steps: VisualizationStep<GraphTraversalState>[] = [];
  const visitedNodeIds: string[] = [];
  const queueIds: string[] = [];

  const nodeMap = new Map<string, GraphNode>();
  for (const node of nodes) {
    nodeMap.set(node.id, node);
  }

  let operations = 0;
  let comparisons = 0;
  let reads = 0;
  let writes = 0;

  const getMetrics = (): ComplexityMetrics => ({
    operations, comparisons, reads, writes
  });

  steps.push({
    state: {
      nodes, edges, startNodeId, currentNodeId: null,
      visitedNodeIds: [...visitedNodeIds], queueIds: [...queueIds], phase: "init",
    },
    activeLine: 0,
    explanation: "Starting Graph BFS. We iterate over all nodes to ensure we visit disconnected components.",
    beginnerExplanation: "We want to make sure we visit every part of the graph, even if it's broken into separate pieces.",
    complexityMetrics: getMetrics(),
  });

  function runBfs(startId: string) {
    queueIds.push(startId);
    visitedNodeIds.push(startId);
    operations += 2;
    writes += 2;
    
    steps.push({
      state: {
        nodes, edges, startNodeId, currentNodeId: null,
        visitedNodeIds: [...visitedNodeIds], queueIds: [...queueIds], phase: "traversing",
      },
      activeLine: 6,
      explanation: `Enqueuing the start node and marking it as visited.`,
      beginnerExplanation: `We put the starting node into our line so we can visit it. We also mark it as visited so we don't add it again.`,
      complexityMetrics: getMetrics(),
    });

    steps.push({
      state: {
        nodes, edges, startNodeId, currentNodeId: null,
        visitedNodeIds: [...visitedNodeIds], queueIds: [...queueIds], phase: "traversing",
      },
      activeLine: 7,
      explanation: "Marking start node as visited.",
      beginnerExplanation: "We make sure we remember we've seen this node.",
      complexityMetrics: getMetrics(),
    });

    while (queueIds.length > 0) {
      operations++; // length check
      reads++;
      steps.push({
        state: {
          nodes, edges, startNodeId, currentNodeId: null,
          visitedNodeIds: [...visitedNodeIds], queueIds: [...queueIds], phase: "traversing",
        },
        activeLine: 8,
        explanation: `Queue has ${queueIds.length} item(s). Continuing loop.`,
        beginnerExplanation: `As long as our queue isn't empty, we keep going.`,
        complexityMetrics: getMetrics(),
      });

      const currentId = queueIds.shift()!;
      const node = nodeMap.get(currentId)!;
      operations++; // shift
      reads++;
      writes++;

      steps.push({
        state: {
          nodes, edges, startNodeId, currentNodeId: currentId,
          visitedNodeIds: [...visitedNodeIds], queueIds: [...queueIds], phase: "traversing",
        },
        activeLine: 9,
        explanation: `Dequeued node ${node.value} from the queue.`,
        beginnerExplanation: `We take the next node out of the line. It's ${node.value}.`,
        complexityMetrics: getMetrics(),
      });

      operations++; // visit
      steps.push({
        state: {
          nodes, edges, startNodeId, currentNodeId: currentId,
          visitedNodeIds: [...visitedNodeIds], queueIds: [...queueIds], phase: "traversing",
        },
        activeLine: 10,
        explanation: `Visiting node ${node.value}.`,
        beginnerExplanation: `We are currently at node ${node.value}. Let's look at its neighbors.`,
        complexityMetrics: getMetrics(),
      });

      steps.push({
        state: {
          nodes, edges, startNodeId, currentNodeId: currentId,
          visitedNodeIds: [...visitedNodeIds], queueIds: [...queueIds], phase: "traversing",
        },
        activeLine: 11,
        explanation: `Iterating through neighbors of ${node.value}.`,
        beginnerExplanation: `Now we look at all the nodes directly connected to ${node.value}.`,
        complexityMetrics: getMetrics(),
      });

      for (const neighborId of node.neighbors) {
        operations++; // iterate
        reads++;
        const neighborNode = nodeMap.get(neighborId)!;
        
        steps.push({
          state: {
            nodes, edges, startNodeId, currentNodeId: currentId,
            visitedNodeIds: [...visitedNodeIds], queueIds: [...queueIds], phase: "traversing",
          },
          activeLine: 12,
          explanation: `Checking if neighbor ${neighborNode.value} is visited.`,
          beginnerExplanation: `Have we already seen node ${neighborNode.value}?`,
          complexityMetrics: getMetrics(),
        });

        operations++; // visited check
        reads++;
        comparisons++;
        if (!visitedNodeIds.includes(neighborId)) {
          visitedNodeIds.push(neighborId);
          operations++;
          writes++;
          steps.push({
            state: {
              nodes, edges, startNodeId, currentNodeId: currentId,
              visitedNodeIds: [...visitedNodeIds], queueIds: [...queueIds], phase: "traversing",
            },
            activeLine: 13,
            explanation: `Marking neighbor ${neighborNode.value} as visited.`,
            beginnerExplanation: `No we haven't! Let's mark ${neighborNode.value} as visited.`,
            complexityMetrics: getMetrics(),
          });

          queueIds.push(neighborId);
          operations++;
          writes++;
          steps.push({
            state: {
              nodes, edges, startNodeId, currentNodeId: currentId,
              visitedNodeIds: [...visitedNodeIds], queueIds: [...queueIds], phase: "traversing",
            },
            activeLine: 14,
            explanation: `Enqueuing neighbor ${neighborNode.value}.`,
            beginnerExplanation: `And let's add ${neighborNode.value} to our line so we can visit its neighbors later.`,
            complexityMetrics: getMetrics(),
          });
        } else {
          steps.push({
            state: {
              nodes, edges, startNodeId, currentNodeId: currentId,
              visitedNodeIds: [...visitedNodeIds], queueIds: [...queueIds], phase: "traversing",
            },
            activeLine: 12,
            explanation: `Neighbor ${neighborNode.value} is already visited, skipping.`,
            beginnerExplanation: `Yes, we already saw node ${neighborNode.value}, so we ignore it.`,
            complexityMetrics: getMetrics(),
          });
        }
      }
    }
  }

  const allIds = [startNodeId, ...nodes.map(n => n.id).filter(id => id !== startNodeId)];
  
  for (const nodeId of allIds) {
    operations++; // iterate
    reads++;
    const node = nodeMap.get(nodeId)!;
    steps.push({
      state: {
        nodes, edges, startNodeId, currentNodeId: null,
        visitedNodeIds: [...visitedNodeIds], queueIds: [...queueIds], phase: "traversing",
      },
      activeLine: 1,
      explanation: `Iterating nodes. Next node is ${node.value}.`,
      beginnerExplanation: `Let's check the next node to make sure no disconnected parts are left behind.`,
      complexityMetrics: getMetrics(),
    });

    steps.push({
      state: {
        nodes, edges, startNodeId, currentNodeId: null,
        visitedNodeIds: [...visitedNodeIds], queueIds: [...queueIds], phase: "traversing",
      },
      activeLine: 2,
      explanation: `Is node ${node.value} already visited?`,
      beginnerExplanation: `Is node ${node.value} visited?`,
      complexityMetrics: getMetrics(),
    });

    operations++;
    reads++;
    comparisons++;
    if (!visitedNodeIds.includes(nodeId)) {
      steps.push({
        state: {
          nodes, edges, startNodeId, currentNodeId: null,
          visitedNodeIds: [...visitedNodeIds], queueIds: [...queueIds], phase: "traversing",
        },
        activeLine: 3,
        explanation: `Node ${node.value} is not visited. Starting BFS from it.`,
        beginnerExplanation: `It is unvisited! We start a new BFS from here.`,
        complexityMetrics: getMetrics(),
      });

      runBfs(nodeId);
    }
  }

  steps.push({
    state: {
      nodes, edges, startNodeId, currentNodeId: null,
      visitedNodeIds: [...visitedNodeIds], queueIds: [...queueIds], phase: "complete",
    },
    activeLine: 0,
    explanation: "BFS complete across all components.",
    beginnerExplanation: "We've explored all nodes in all components!",
    complexityMetrics: getMetrics(),
  });

  return steps;
}

export function runGraphBfsExperiment(inputSize: number): ComplexityMetrics {
  // To simulate graph operations with a 1D slider (inputSize), we map inputSize to V and E.
  // We assume a moderately dense connected graph: V = floor(inputSize / 3) + 1, E = inputSize - V.
  const V = Math.floor(inputSize / 3) + 1;
  const E = Math.max(0, inputSize - V);

  let operations = 0;
  let comparisons = 0;
  let reads = 0;
  let writes = 0;

  // Outer loop to iterate all nodes
  for (let i = 0; i < V; i++) {
    operations++;
    reads++;
    operations++; // visited check
    reads++;
    comparisons++;
    
    // Assume only the first node triggers the BFS (fully connected graph)
    if (i === 0) {
      operations += 2; // queue and visit
      writes += 2;

      let queueSize = 1;
      let edgesProcessed = 0;

      while (queueSize > 0) {
        operations++; // length check
        reads++;
        
        operations++; // dequeue
        reads++;
        writes++;
        queueSize--;

        operations++; // visit

        // Average degrees per node = E / V.
        // Simulate checking neighbors
        const avgNeighbors = Math.ceil(2 * E / V); // undirected
        
        for (let j = 0; j < avgNeighbors; j++) {
          if (edgesProcessed >= 2 * E) break;
          edgesProcessed++;

          operations++; // loop
          reads++;
          operations++; // check visited
          reads++;
          comparisons++;
          
          // Assuming a tree-like expansion, first V-1 edges lead to unvisited nodes
          if (i === 0 && edgesProcessed < V) {
            operations += 2;
            writes += 2;
            queueSize++;
          }
        }
      }
      operations++; // length check exit
      reads++;
    }
  }

  return { operations, comparisons, reads, writes };
}
