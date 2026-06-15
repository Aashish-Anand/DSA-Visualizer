import type { GraphNode, GraphEdge } from "@/types";

export function generateSampleGraph(): {
  nodes: GraphNode[];
  edges: GraphEdge[];
  startNodeId: string;
} {
  // Realistic planar grid graph matching the user's image example
  const nodes: GraphNode[] = [
    { id: "node-1", value: 1, x: 350, y: 100, neighbors: ["node-2", "node-7", "node-9"] },
    { id: "node-2", value: 2, x: 500, y: 100, neighbors: ["node-1", "node-3", "node-8", "node-5"] },
    { id: "node-3", value: 3, x: 650, y: 100, neighbors: ["node-2", "node-4", "node-5"] },
    { id: "node-4", value: 4, x: 800, y: 200, neighbors: ["node-3", "node-5"] },
    { id: "node-5", value: 5, x: 650, y: 300, neighbors: ["node-4", "node-6", "node-2", "node-3"] },
    { id: "node-6", value: 6, x: 500, y: 300, neighbors: ["node-5", "node-7", "node-8"] },
    { id: "node-7", value: 7, x: 350, y: 300, neighbors: ["node-6", "node-9", "node-1", "node-8"] },
    { id: "node-8", value: 8, x: 500, y: 200, neighbors: ["node-7", "node-2", "node-6"] },
    { id: "node-9", value: 9, x: 200, y: 200, neighbors: ["node-7", "node-1"] },
  ];
  const edges: GraphEdge[] = [
    { id: "e1", source: "node-1", target: "node-2" },
    { id: "e2", source: "node-2", target: "node-3" },
    { id: "e4", source: "node-3", target: "node-4" },
    { id: "e5", source: "node-5", target: "node-4" },
    { id: "e6", source: "node-6", target: "node-5" },
    { id: "e7", source: "node-7", target: "node-6" },
    { id: "e8", source: "node-9", target: "node-7" },
    { id: "e9", source: "node-9", target: "node-1" },
    { id: "e10", source: "node-1", target: "node-7" },
    { id: "e11", source: "node-7", target: "node-8" },
    { id: "e12", source: "node-2", target: "node-8" },
    { id: "e13", source: "node-8", target: "node-6" },
    { id: "e14", source: "node-2", target: "node-5" },
    { id: "e15", source: "node-3", target: "node-5" },
  ];
  return { nodes, edges, startNodeId: "node-9" }; // Start at far left node
}

export function generateDisconnectedGraph(): {
  nodes: GraphNode[];
  edges: GraphEdge[];
  startNodeId: string;
} {
  const baseGraph = generateSampleGraph();
  
  // Add a completely disconnected component
  baseGraph.nodes.push(
    { id: "node-10", value: 10, x: 100, y: 100, neighbors: ["node-11"] },
    { id: "node-11", value: 11, x: 100, y: 300, neighbors: ["node-10"] }
  );
  
  baseGraph.edges.push(
    { id: "e16", source: "node-10", target: "node-11" }
  );

  return { nodes: baseGraph.nodes, edges: baseGraph.edges, startNodeId: "node-9" };
}

export function generateLectureGraph(): {
  nodes: GraphNode[];
  edges: GraphEdge[];
  startNodeId: string;
} {
  // A clean, planar graph commonly used in DSA lectures (e.g., Striver's A2Z series)
  // Perfect for cycle detection, bipartite checks, DFS/BFS without crossing edges.
  const nodes: GraphNode[] = [
    { id: "node-1", value: 1, x: 200, y: 180, neighbors: ["node-2"] },
    { id: "node-2", value: 2, x: 350, y: 180, neighbors: ["node-1", "node-3", "node-7"] },
    { id: "node-3", value: 3, x: 450, y: 100, neighbors: ["node-2", "node-4"] },
    { id: "node-4", value: 4, x: 650, y: 100, neighbors: ["node-3", "node-5"] },
    { id: "node-5", value: 5, x: 750, y: 180, neighbors: ["node-4", "node-6"] },
    { id: "node-6", value: 6, x: 650, y: 260, neighbors: ["node-5", "node-7"] },
    { id: "node-7", value: 7, x: 450, y: 260, neighbors: ["node-6", "node-2", "node-8"] },
    { id: "node-8", value: 8, x: 450, y: 340, neighbors: ["node-7"] },
  ];

  const edges: GraphEdge[] = [
    { id: "e-1-2", source: "node-1", target: "node-2" },
    { id: "e-2-3", source: "node-2", target: "node-3" },
    { id: "e-3-4", source: "node-3", target: "node-4" },
    { id: "e-4-5", source: "node-4", target: "node-5" },
    { id: "e-5-6", source: "node-5", target: "node-6" },
    { id: "e-6-7", source: "node-6", target: "node-7" },
    { id: "e-7-2", source: "node-7", target: "node-2" },
    { id: "e-7-8", source: "node-7", target: "node-8" },
  ];

  return { nodes, edges, startNodeId: "node-1" };
}

export function generateStarGraph(): {
  nodes: GraphNode[];
  edges: GraphEdge[];
  startNodeId: string;
} {
  const nodes: GraphNode[] = [{ id: "node-0", value: 0, x: 500, y: 200, neighbors: [] }];
  const edges: GraphEdge[] = [];
  const numOuter = 6;
  const radius = 150;
  
  for (let i = 1; i <= numOuter; i++) {
    const angle = (2 * Math.PI * i) / numOuter;
    const nId = `node-${i}`;
    nodes.push({
      id: nId,
      value: i,
      x: 500 + radius * Math.cos(angle),
      y: 200 + radius * Math.sin(angle),
      neighbors: ["node-0"]
    });
    nodes[0].neighbors.push(nId);
    edges.push({ id: `e-${0}-${i}`, source: "node-0", target: nId });
  }
  
  return { nodes, edges, startNodeId: "node-0" };
}

export function generateCycleGraph(): {
  nodes: GraphNode[];
  edges: GraphEdge[];
  startNodeId: string;
} {
  const numNodes = 8;
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];
  const radiusX = 300;
  const radiusY = 120;
  
  for (let i = 0; i < numNodes; i++) {
    const angle = (2 * Math.PI * i) / numNodes;
    nodes.push({
      id: `node-${i}`,
      value: i,
      x: 500 + radiusX * Math.cos(angle),
      y: 200 + radiusY * Math.sin(angle),
      neighbors: []
    });
  }
  
  for (let i = 0; i < numNodes; i++) {
    const next = (i + 1) % numNodes;
    nodes[i].neighbors.push(`node-${next}`);
    nodes[next].neighbors.push(`node-${i}`);
    edges.push({ id: `e-${i}-${next}`, source: `node-${i}`, target: `node-${next}` });
  }
  
  // Add one cross edge for flavor
  nodes[0].neighbors.push("node-4");
  nodes[4].neighbors.push("node-0");
  edges.push({ id: "e-0-4", source: "node-0", target: "node-4" });
  
  return { nodes, edges, startNodeId: "node-0" };
}

export function generateRandomGraph() {
  const rand = Math.random();
  if (rand < 0.2) {
    return generateSampleGraph();
  } else if (rand < 0.4) {
    return generateDisconnectedGraph();
  } else if (rand < 0.6) {
    return generateStarGraph();
  } else if (rand < 0.8) {
    return generateCycleGraph();
  } else {
    return generateLectureGraph();
  }
}
