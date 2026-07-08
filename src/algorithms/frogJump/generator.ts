import type { VisualizationStep, DP1DState, ComplexityMetrics } from "@/types";

export function generateRandomHeights(size: number): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 50) + 10);
}

export function generateFrogJumpSteps(heights: number[]): VisualizationStep<DP1DState>[] {
  const steps: VisualizationStep<DP1DState>[] = [];
  const n = heights.length;
  const dp: (number | null)[] = Array(n).fill(null);

  let comparisons = 0;
  let operations = 0;

  const getMetrics = (): ComplexityMetrics => ({
    comparisons,
    operations,
  });

  steps.push({
    state: { dpArray: [...dp], inputArray: heights, currentIndex: null, dependencies: [], phase: "init", result: null },
    activeLine: 0,
    explanation: `n is the number of stones: ${n}.`,
    beginnerExplanation: `There are ${n} stones in total.`,
    complexityMetrics: getMetrics(),
  });

  operations++;
  steps.push({
    state: { dpArray: [...dp], inputArray: heights, currentIndex: null, dependencies: [], phase: "init", result: null },
    activeLine: 1,
    explanation: `Create a DP array of size ${n} to store minimum energy up to each stone.`,
    beginnerExplanation: "Let's make a list to track the minimum energy to reach each stone.",
    complexityMetrics: getMetrics(),
  });

  dp[0] = 0;
  operations++;
  steps.push({
    state: { dpArray: [...dp], inputArray: heights, currentIndex: null, dependencies: [], phase: "calculating", result: null },
    activeLine: 3,
    explanation: `The frog starts at stone 0, so the energy required is 0.`,
    beginnerExplanation: "Starting at the first stone takes 0 energy!",
    complexityMetrics: getMetrics(),
  });

  comparisons++;
  if (n > 1) {
    operations += 2;
    dp[1] = Math.abs(heights[1] - heights[0]);
    steps.push({
      state: { dpArray: [...dp], inputArray: heights, currentIndex: 1, dependencies: [0], phase: "calculating", result: null },
      activeLine: 4,
      explanation: `Energy to reach stone 1 is just the jump from stone 0: |${heights[1]} - ${heights[0]}| = ${dp[1]}.`,
      beginnerExplanation: `To reach stone 1, there's only one way: jump from stone 0. The energy is ${dp[1]}.`,
      complexityMetrics: getMetrics(),
    });
  }

  for (let i = 2; i < n; i++) {
    operations++;
    steps.push({
      state: { dpArray: [...dp], inputArray: heights, currentIndex: i, dependencies: [i - 1, i - 2], phase: "calculating", result: null },
      activeLine: 5,
      explanation: `Now we calculate minimum energy for stone ${i}.`,
      beginnerExplanation: `Let's figure out the best way to reach stone ${i}.`,
      complexityMetrics: getMetrics(),
    });

    operations += 3;
    const jump1Cost = Math.abs(heights[i] - heights[i - 1]);
    const jump1 = (dp[i - 1] as number) + jump1Cost;
    steps.push({
      state: { dpArray: [...dp], inputArray: heights, currentIndex: i, dependencies: [i - 1], phase: "calculating", result: null },
      activeLine: 6,
      explanation: `Cost if jumping from stone ${i - 1}: dp[${i - 1}] + jump cost (${jump1Cost}) = ${jump1}.`,
      beginnerExplanation: `If we take a small jump from the previous stone, it costs ${jump1} energy total.`,
      complexityMetrics: getMetrics(),
    });

    operations += 3;
    const jump2Cost = Math.abs(heights[i] - heights[i - 2]);
    const jump2 = (dp[i - 2] as number) + jump2Cost;
    steps.push({
      state: { dpArray: [...dp], inputArray: heights, currentIndex: i, dependencies: [i - 2], phase: "calculating", result: null },
      activeLine: 7,
      explanation: `Cost if jumping from stone ${i - 2}: dp[${i - 2}] + jump cost (${jump2Cost}) = ${jump2}.`,
      beginnerExplanation: `If we take a big jump from two stones back, it costs ${jump2} energy total.`,
      complexityMetrics: getMetrics(),
    });

    comparisons++;
    operations++;
    dp[i] = Math.min(jump1, jump2);
    steps.push({
      state: { dpArray: [...dp], inputArray: heights, currentIndex: i, dependencies: [i - 1, i - 2], phase: "calculating", result: null },
      activeLine: 8,
      explanation: `We take the minimum of the two options: min(${jump1}, ${jump2}) = ${dp[i]}.`,
      beginnerExplanation: `We want to save energy! So we choose the smaller path, which costs ${dp[i]}.`,
      complexityMetrics: getMetrics(),
    });
  }

  steps.push({
    state: { dpArray: [...dp], inputArray: heights, currentIndex: null, dependencies: [], phase: "complete", result: dp[n - 1] },
    activeLine: 9,
    explanation: `We've reached the last stone! Minimum energy is ${dp[n - 1]}.`,
    beginnerExplanation: `We made it! The least tiring path costs ${dp[n - 1]} energy.`,
    complexityMetrics: getMetrics(),
  });

  return steps;
}

export function runFrogJumpExperiment(n: number): ComplexityMetrics {
  
  let comparisons = 0;
  let operations = 0;

  comparisons++;
  if (n <= 1) {
    return { comparisons, operations };
  }

  operations += 4; // array init, dp[0], dp[1]
  
  for (let i = 2; i < n; i++) {
    operations += 8; // jump1, jump2, assignment
    comparisons++; // min()
  }

  return { comparisons, operations };
}

// ================================
// DP Recursion Tree Generators
// ================================

import type { RecursionTreeState, RecursionNode, RecursionEdge } from "@/types";

// Helper to pre-calculate tree layout using bottom-up leaf spacing
interface LayoutNode {
  id: string;
  label: string;
  index: number;
  left?: LayoutNode;
  right?: LayoutNode;
  x: number;
  y: number;
}

function buildLayoutTree(index: number, depth: number, isMemoized: boolean, memo: Record<number, number> = {}): LayoutNode {
  const id = `node-${index}-${Math.random().toString(36).substr(2, 9)}`;
  const node: LayoutNode = { id, label: `f(${index})`, index, x: 0, y: depth * 80 + 50 };
  
  if (isMemoized && memo[index] !== undefined) return node;
  if (isMemoized) memo[index] = 1;

  if (index > 0) {
    node.left = buildLayoutTree(index - 1, depth + 1, isMemoized, memo);
    if (index > 1) {
      node.right = buildLayoutTree(index - 2, depth + 1, isMemoized, memo);
    }
  }
  return node;
}

let currentLeafX = 0;
function assignXCoordinates(node: LayoutNode) {
  if (!node.left && !node.right) {
    node.x = currentLeafX;
    currentLeafX += 140; // horizontal spacing between leaves
  } else {
    if (node.left) assignXCoordinates(node.left);
    if (node.right) assignXCoordinates(node.right);
    
    if (node.left && node.right) {
      node.x = (node.left.x + node.right.x) / 2;
    } else if (node.left) {
      node.x = node.left.x; // if only one child, place it directly above its child
    }
  }
}

function flattenLayoutTree(node: LayoutNode, nodes: RecursionNode[], edges: RecursionEdge[]) {
  nodes.push({ id: node.id, label: node.label, x: node.x, y: node.y });
  if (node.left) {
    edges.push({ source: node.id, target: node.left.id });
    flattenLayoutTree(node.left, nodes, edges);
  }
  if (node.right) {
    edges.push({ source: node.id, target: node.right.id });
    flattenLayoutTree(node.right, nodes, edges);
  }
}

export function generateFrogJumpRecursiveSteps(heights: number[]): VisualizationStep<RecursionTreeState>[] {
  const nodes: RecursionNode[] = [];
  const edges: RecursionEdge[] = [];
  
  currentLeafX = 0; // Reset global layout counter
  const root = buildLayoutTree(heights.length - 1, 0, false);
  assignXCoordinates(root);
  flattenLayoutTree(root, nodes, edges);
  
  return buildFrogJumpTreeSteps(heights, nodes, false);
}

export function generateFrogJumpMemoizedSteps(heights: number[]): VisualizationStep<RecursionTreeState>[] {
  const nodes: RecursionNode[] = [];
  const edges: RecursionEdge[] = [];
  
  currentLeafX = 0; // Reset global layout counter
  const root = buildLayoutTree(heights.length - 1, 0, true);
  assignXCoordinates(root);
  flattenLayoutTree(root, nodes, edges);
  
  return buildFrogJumpTreeSteps(heights, nodes, true);
}

function buildFrogJumpTreeSteps(
  heights: number[], 
  layoutNodes: RecursionNode[], 
  useMemo: boolean
): VisualizationStep<RecursionTreeState>[] {
  const steps: VisualizationStep<RecursionTreeState>[] = [];
  const state: RecursionTreeState = {
    nodes: [],
    edges: [],
    currentNodeId: null,
    computedNodeIds: [],
    memoizedNodeIds: [],
    callStackIds: [],
    memoArray: Array(heights.length).fill(null)
  };

  function addStep(activeLine: number, explanation: string, beginnerExplanation: string) {
    // Deep clone state to ensure steps are completely isolated
    steps.push({
      state: {
        ...state,
        nodes: state.nodes.map(n => ({ ...n })),
        edges: state.edges.map(e => ({ ...e })),
        computedNodeIds: [...state.computedNodeIds],
        memoizedNodeIds: [...state.memoizedNodeIds],
        callStackIds: [...state.callStackIds],
        memoArray: [...state.memoArray]
      },
      activeLine,
      explanation,
      beginnerExplanation
    });
  }

  const memoCache: Record<number, number> = {};
  let layoutNodeIndex = 0; 

  function dfs(index: number, parentId: string | null): [number, string] {
    const currentNode = { ...layoutNodes[layoutNodeIndex++] };
    
    state.nodes = [...state.nodes, currentNode];
    if (parentId) {
      state.edges = [...state.edges, { source: parentId, target: currentNode.id }];
    }
    
    state.currentNodeId = currentNode.id;
    state.callStackIds = [...state.callStackIds, currentNode.id];
    
    addStep(
      useMemo ? 1 : 0, 
      `Calling f(${index}). We want the min energy to reach stone ${index}.`,
      `Let's find out how much energy we need to reach stone ${index}.`
    );

    if (useMemo && memoCache[index] !== undefined) {
      state.memoizedNodeIds = [...state.memoizedNodeIds, currentNode.id];
      // Update the node's value immutably in state.nodes
      state.nodes = state.nodes.map(n => n.id === currentNode.id ? { ...n, value: memoCache[index] } : n);
      
      addStep(
        2, 
        `Cache hit! f(${index}) was already computed as ${memoCache[index]}.`,
        `We've been here before! We already know the answer is ${memoCache[index]}.`
      );

      state.callStackIds = state.callStackIds.slice(0, -1);
      return [memoCache[index], currentNode.id];
    }

    if (index === 0) {
      state.nodes = state.nodes.map(n => n.id === currentNode.id ? { ...n, value: 0 } : n);
      state.computedNodeIds = [...state.computedNodeIds, currentNode.id];
      if (useMemo) {
        memoCache[0] = 0;
        const newMemo = [...state.memoArray];
        newMemo[0] = 0;
        state.memoArray = newMemo;
      }
      
      addStep(
        useMemo ? 4 : 1, 
        `Base case: f(0) = 0. No energy needed to stay at the start.`,
        `We are already at the first stone! Energy is 0.`
      );
      
      state.callStackIds = state.callStackIds.slice(0, -1);
      return [0, currentNode.id];
    }

    // Step 1: Jump from index - 1
    const cost1 = Math.abs(heights[index] - heights[index - 1]);
    const [prevEnergy1] = dfs(index - 1, currentNode.id);
    const jump1 = prevEnergy1 + cost1;
    
    state.currentNodeId = currentNode.id;
    addStep(
      useMemo ? 5 : 2,
      `Jump from stone ${index - 1} costs ${cost1}. Total for this path: ${prevEnergy1} + ${cost1} = ${jump1}.`,
      `If we take a small jump, it costs ${jump1} energy.`
    );

    let result = jump1;

    // Step 2: Jump from index - 2
    if (index > 1) {
      const cost2 = Math.abs(heights[index] - heights[index - 2]);
      const [prevEnergy2] = dfs(index - 2, currentNode.id);
      const jump2 = prevEnergy2 + cost2;
      
      state.currentNodeId = currentNode.id;
      addStep(
        useMemo ? 7 : 4,
        `Jump from stone ${index - 2} costs ${cost2}. Total for this path: ${prevEnergy2} + ${cost2} = ${jump2}.`,
        `If we take a big jump, it costs ${jump2} energy.`
      );
      
      result = Math.min(jump1, jump2);
      
      addStep(
        useMemo ? 8 : 5,
        `We take the minimum of the two jumps: min(${jump1}, ${jump2}) = ${result}.`,
        `We want to save energy! So we choose the smaller path, which costs ${result}.`
      );
    }

    state.nodes = state.nodes.map(n => n.id === currentNode.id ? { ...n, value: result } : n);
    state.computedNodeIds = [...state.computedNodeIds, currentNode.id];
    
    if (useMemo) {
      memoCache[index] = result;
      const newMemo = [...state.memoArray];
      newMemo[index] = result;
      state.memoArray = newMemo;

      addStep(
        9, 
        `Store f(${index}) = ${result} in the memo table for later.`,
        `Let's remember this answer so we don't have to calculate it again!`
      );
    }

    addStep(
      useMemo ? 10 : (index > 1 ? 5 : 6), 
      `f(${index}) returns ${result}.`,
      `We've figured out stone ${index}! It takes ${result} energy.`
    );

    state.callStackIds = state.callStackIds.slice(0, -1);
    return [result, currentNode.id];
  }

  // Pre-step
  addStep(
    -1,
    `We want to find the minimum energy to reach stone ${heights.length - 1} using a ${useMemo ? "Memoized Top-Down" : "Recursive"} approach.`,
    `Imagine a frog jumping across stones. Let's trace all the paths backwards from the final stone!`
  );

  dfs(heights.length - 1, null);
  
  state.currentNodeId = null;
  addStep(
    -1,
    `Execution complete. Minimum energy is ${memoCache[heights.length - 1] ?? steps[steps.length - 1].state.nodes[0].value}.`,
    `We traced all the paths! We know the best way across.`
  );

  return steps;
}
