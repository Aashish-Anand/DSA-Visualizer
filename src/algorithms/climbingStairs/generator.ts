import type { VisualizationStep, DP1DState, RecursionTreeState, RecursionNode, RecursionEdge } from "@/types";

// ================================
// Iterative DP Generator
// ================================

export function generateClimbingStairsSteps(n: number): VisualizationStep<DP1DState>[] {
  const steps: VisualizationStep<DP1DState>[] = [];
  const dp: (number | null)[] = Array(n + 1).fill(null);

  steps.push({
    state: { dpArray: [...dp], currentIndex: null, dependencies: [], phase: "init", result: null },
    activeLine: 0,
    explanation: `We want to find the number of ways to climb ${n} stairs.`,
    beginnerExplanation: "Imagine we have stairs. How many ways can we reach the top?"
  });

  if (n <= 1) {
    steps.push({
      state: { dpArray: [...dp], currentIndex: null, dependencies: [], phase: "complete", result: 1 },
      activeLine: 1,
      explanation: `For n <= 1, there is only 1 way.`,
      beginnerExplanation: "If there's only 0 or 1 stair, there's just 1 way to climb it."
    });
    return steps;
  }

  steps.push({
    state: { dpArray: [...dp], currentIndex: null, dependencies: [], phase: "init", result: null },
    activeLine: 2,
    explanation: `Create a DP array of size ${n + 1} to store the results of subproblems.`,
    beginnerExplanation: "Let's make a list to write down the answers for smaller stairs as we figure them out."
  });

  dp[0] = 1;
  dp[1] = 1;
  steps.push({
    state: { dpArray: [...dp], currentIndex: null, dependencies: [], phase: "calculating", result: null },
    activeLine: 3,
    explanation: `Base cases: 1 way to reach step 0, and 1 way to reach step 1.`,
    beginnerExplanation: "We know the answer for 0 stairs and 1 stair is always 1. Let's write that down."
  });

  for (let i = 2; i <= n; i++) {
    steps.push({
      state: { dpArray: [...dp], currentIndex: i, dependencies: [i - 1, i - 2], phase: "calculating", result: null },
      activeLine: 4,
      explanation: `Now we calculate ways for step ${i}.`,
      beginnerExplanation: `Let's figure out how many ways we can reach stair number ${i}.`
    });

    dp[i] = (dp[i - 1] as number) + (dp[i - 2] as number);
    
    steps.push({
      state: { dpArray: [...dp], currentIndex: i, dependencies: [i - 1, i - 2], phase: "calculating", result: null },
      activeLine: 5,
      explanation: `Ways to reach step ${i} is the sum of ways to reach step ${i-1} and step ${i-2} (${dp[i-1]} + ${dp[i-2]} = ${dp[i]}).`,
      beginnerExplanation: `To reach stair ${i}, we could have come from stair ${i-1} (by taking 1 step) or stair ${i-2} (by taking 2 steps). So we add those two answers together!`
    });
  }

  steps.push({
    state: { dpArray: [...dp], currentIndex: null, dependencies: [], phase: "complete", result: dp[n] },
    activeLine: 6,
    explanation: `We've reached the top! The total number of ways is ${dp[n]}.`,
    beginnerExplanation: `We reached the top! The final answer is ${dp[n]}.`
  });

  return steps;
}

// ================================
// DP Recursion Tree Generators
// ================================

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

  if (index >= 2) {
    node.left = buildLayoutTree(index - 1, depth + 1, isMemoized, memo);
    node.right = buildLayoutTree(index - 2, depth + 1, isMemoized, memo);
  }
  return node;
}

let currentLeafX = 0;
function assignXCoordinates(node: LayoutNode) {
  if (!node.left && !node.right) {
    node.x = currentLeafX;
    currentLeafX += 140; 
  } else {
    if (node.left) assignXCoordinates(node.left);
    if (node.right) assignXCoordinates(node.right);
    
    if (node.left && node.right) {
      node.x = (node.left.x + node.right.x) / 2;
    } else if (node.left) {
      node.x = node.left.x;
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

export function generateClimbingStairsRecursiveSteps(n: number): VisualizationStep<RecursionTreeState>[] {
  const nodes: RecursionNode[] = [];
  const edges: RecursionEdge[] = [];
  
  currentLeafX = 0;
  const root = buildLayoutTree(n, 0, false);
  assignXCoordinates(root);
  flattenLayoutTree(root, nodes, edges);
  
  return buildTreeSteps(n, nodes, false);
}

export function generateClimbingStairsMemoizedSteps(n: number): VisualizationStep<RecursionTreeState>[] {
  const nodes: RecursionNode[] = [];
  const edges: RecursionEdge[] = [];
  
  currentLeafX = 0;
  const root = buildLayoutTree(n, 0, true);
  assignXCoordinates(root);
  flattenLayoutTree(root, nodes, edges);
  
  return buildTreeSteps(n, nodes, true);
}

function buildTreeSteps(
  n: number, 
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
    memoArray: Array(n + 1).fill(null)
  };

  function addStep(activeLine: number, explanation: string, beginnerExplanation: string) {
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
      useMemo ? 0 : 0, 
      `Calling climbStairs(${index}). We want to find ways to climb ${index} stairs.`,
      `Let's find out how many ways we can reach stair ${index}.`
    );

    if (useMemo && memoCache[index] !== undefined) {
      state.memoizedNodeIds = [...state.memoizedNodeIds, currentNode.id];
      state.nodes = state.nodes.map(n => n.id === currentNode.id ? { ...n, value: memoCache[index] } : n);
      
      addStep(
        2, 
        `Cache hit! climbStairs(${index}) was already computed as ${memoCache[index]}.`,
        `We've been here before! We already know the answer is ${memoCache[index]}.`
      );

      state.callStackIds = state.callStackIds.slice(0, -1);
      return [memoCache[index], currentNode.id];
    }

    if (index <= 1) {
      const res = 1;
      state.nodes = state.nodes.map(n => n.id === currentNode.id ? { ...n, value: res } : n);
      state.computedNodeIds = [...state.computedNodeIds, currentNode.id];
      
      if (useMemo) {
        state.memoArray[index] = res;
        memoCache[index] = res;
      }
      
      addStep(
        1,
        `Base case reached: climbStairs(${index}) = 1.`,
        `If there are ${index} stairs, there is exactly 1 way. Easy!`
      );
      state.callStackIds = state.callStackIds.slice(0, -1);
      return [res, currentNode.id];
    }

    // Call left (index - 1)
    const [leftVal] = dfs(index - 1, currentNode.id);
    
    state.currentNodeId = currentNode.id;
    state.callStackIds = [...state.callStackIds, currentNode.id];
    
    // Call right (index - 2)
    const [rightVal] = dfs(index - 2, currentNode.id);

    state.currentNodeId = currentNode.id;
    state.callStackIds = [...state.callStackIds, currentNode.id];

    const result = leftVal + rightVal;
    
    state.nodes = state.nodes.map(n => n.id === currentNode.id ? { ...n, value: result } : n);
    state.computedNodeIds = [...state.computedNodeIds, currentNode.id];
    
    if (useMemo) {
      memoCache[index] = result;
      state.memoArray[index] = result;
      addStep(
        3,
        `Computed climbStairs(${index}) = ${leftVal} + ${rightVal} = ${result}. Saving to memo cache.`,
        `We figured out there are ${result} ways to reach stair ${index}. Let's remember that!`
      );
    } else {
      addStep(
        2,
        `Computed climbStairs(${index}) = ${leftVal} + ${rightVal} = ${result}.`,
        `We figured out there are ${result} ways to reach stair ${index}.`
      );
    }

    state.callStackIds = state.callStackIds.slice(0, -1);
    return [result, currentNode.id];
  }

  dfs(n, null);
  
  state.currentNodeId = null;
  addStep(
    -1,
    `Done! Total distinct ways to climb ${n} stairs is ${memoCache[n] || state.nodes[0].value}.`,
    `We explored all the paths! The final answer is ${memoCache[n] || state.nodes[0].value}.`
  );

  return steps;
}
