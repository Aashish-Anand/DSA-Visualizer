import type { VisualizationStep, GraphTraversalState, GraphNode, GraphEdge } from "@/types";

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

  steps.push({
    state: {
      nodes, edges, startNodeId, currentNodeId: null,
      visitedNodeIds: [...visitedNodeIds], queueIds: [...queueIds], phase: "init",
    },
    activeLine: 0,
    explanation: "Starting Graph BFS. We iterate over all nodes to ensure we visit disconnected components.",
    beginnerExplanation: "We want to make sure we visit every part of the graph, even if it's broken into separate pieces.",
  });

  function runBfs(startId: string) {
    queueIds.push(startId);
    visitedNodeIds.push(startId);
    
    steps.push({
      state: {
        nodes, edges, startNodeId, currentNodeId: null,
        visitedNodeIds: [...visitedNodeIds], queueIds: [...queueIds], phase: "traversing",
      },
      activeLine: 6,
      explanation: `Enqueuing the start node and marking it as visited.`,
      beginnerExplanation: `We put the starting node into our line so we can visit it. We also mark it as visited so we don't add it again.`,
    });

    steps.push({
      state: {
        nodes, edges, startNodeId, currentNodeId: null,
        visitedNodeIds: [...visitedNodeIds], queueIds: [...queueIds], phase: "traversing",
      },
      activeLine: 7,
      explanation: "Marking start node as visited.",
      beginnerExplanation: "We make sure we remember we've seen this node.",
    });

    while (queueIds.length > 0) {
      steps.push({
        state: {
          nodes, edges, startNodeId, currentNodeId: null,
          visitedNodeIds: [...visitedNodeIds], queueIds: [...queueIds], phase: "traversing",
        },
        activeLine: 8,
        explanation: `Queue has ${queueIds.length} item(s). Continuing loop.`,
        beginnerExplanation: `As long as our queue isn't empty, we keep going.`,
      });

      const currentId = queueIds.shift()!;
      const node = nodeMap.get(currentId)!;

      steps.push({
        state: {
          nodes, edges, startNodeId, currentNodeId: currentId,
          visitedNodeIds: [...visitedNodeIds], queueIds: [...queueIds], phase: "traversing",
        },
        activeLine: 9,
        explanation: `Dequeued node ${node.value} from the queue.`,
        beginnerExplanation: `We take the next node out of the line. It's ${node.value}.`,
      });

      steps.push({
        state: {
          nodes, edges, startNodeId, currentNodeId: currentId,
          visitedNodeIds: [...visitedNodeIds], queueIds: [...queueIds], phase: "traversing",
        },
        activeLine: 10,
        explanation: `Visiting node ${node.value}.`,
        beginnerExplanation: `We are currently at node ${node.value}. Let's look at its neighbors.`,
      });

      steps.push({
        state: {
          nodes, edges, startNodeId, currentNodeId: currentId,
          visitedNodeIds: [...visitedNodeIds], queueIds: [...queueIds], phase: "traversing",
        },
        activeLine: 11,
        explanation: `Iterating through neighbors of ${node.value}.`,
        beginnerExplanation: `Now we look at all the nodes directly connected to ${node.value}.`,
      });

      for (const neighborId of node.neighbors) {
        const neighborNode = nodeMap.get(neighborId)!;
        
        steps.push({
          state: {
            nodes, edges, startNodeId, currentNodeId: currentId,
            visitedNodeIds: [...visitedNodeIds], queueIds: [...queueIds], phase: "traversing",
          },
          activeLine: 12,
          explanation: `Checking if neighbor ${neighborNode.value} is visited.`,
          beginnerExplanation: `Have we already seen node ${neighborNode.value}?`,
        });

        if (!visitedNodeIds.includes(neighborId)) {
          visitedNodeIds.push(neighborId);
          steps.push({
            state: {
              nodes, edges, startNodeId, currentNodeId: currentId,
              visitedNodeIds: [...visitedNodeIds], queueIds: [...queueIds], phase: "traversing",
            },
            activeLine: 13,
            explanation: `Marking neighbor ${neighborNode.value} as visited.`,
            beginnerExplanation: `No we haven't! Let's mark ${neighborNode.value} as visited.`,
          });

          queueIds.push(neighborId);
          steps.push({
            state: {
              nodes, edges, startNodeId, currentNodeId: currentId,
              visitedNodeIds: [...visitedNodeIds], queueIds: [...queueIds], phase: "traversing",
            },
            activeLine: 14,
            explanation: `Enqueuing neighbor ${neighborNode.value}.`,
            beginnerExplanation: `And let's add ${neighborNode.value} to our line so we can visit its neighbors later.`,
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
          });
        }
      }
    }
  }

  const allIds = [startNodeId, ...nodes.map(n => n.id).filter(id => id !== startNodeId)];
  
  for (const nodeId of allIds) {
    const node = nodeMap.get(nodeId)!;
    steps.push({
      state: {
        nodes, edges, startNodeId, currentNodeId: null,
        visitedNodeIds: [...visitedNodeIds], queueIds: [...queueIds], phase: "traversing",
      },
      activeLine: 1,
      explanation: `Iterating nodes. Next node is ${node.value}.`,
      beginnerExplanation: `Let's check the next node to make sure no disconnected parts are left behind.`,
    });

    steps.push({
      state: {
        nodes, edges, startNodeId, currentNodeId: null,
        visitedNodeIds: [...visitedNodeIds], queueIds: [...queueIds], phase: "traversing",
      },
      activeLine: 2,
      explanation: `Is node ${node.value} already visited?`,
      beginnerExplanation: `Is node ${node.value} visited?`,
    });

    if (!visitedNodeIds.includes(nodeId)) {
      steps.push({
        state: {
          nodes, edges, startNodeId, currentNodeId: null,
          visitedNodeIds: [...visitedNodeIds], queueIds: [...queueIds], phase: "traversing",
        },
        activeLine: 3,
        explanation: `Node ${node.value} is not visited. Starting BFS from it.`,
        beginnerExplanation: `It is unvisited! We start a new BFS from here.`,
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
  });

  return steps;
}
