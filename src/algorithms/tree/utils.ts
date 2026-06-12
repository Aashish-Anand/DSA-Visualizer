import type { TreeNode } from "@/types";

export function generateBinaryTree(maxDepth: number = 3): { nodes: TreeNode[], rootId: string | null } {
  const nodes: TreeNode[] = [];
  let nextId = 1;

  // We use a predefined coordinate system assuming SVG center is X=500, Y=50
  // X offsets for each depth layer
  // Depth 0 (root): offset 0 (X=500)
  // Depth 1: offset 200 (X=300, 700)
  // Depth 2: offset 100 (X=200, 400, 600, 800)
  // Depth 3: offset 50 (X=150, 250, 350, 450, 550, 650, 750, 850)
  
  const X_CENTER = 500;
  const Y_START = 50;
  const Y_STEP = 80;

  function createNode(depth: number, currentX: number, currentY: number): string | null {
    if (depth > maxDepth) return null;

    // Optional: make it sparse by randomly returning null if not root
    if (depth > 0 && Math.random() < 0.15) return null;

    const id = `node-${nextId++}`;
    const value = Math.floor(Math.random() * 99) + 1;
    
    const xOffset = 200 / Math.pow(2, depth); // 200, 100, 50...

    const leftId = createNode(depth + 1, currentX - xOffset, currentY + Y_STEP);
    const rightId = createNode(depth + 1, currentX + xOffset, currentY + Y_STEP);

    const node: TreeNode = {
      id,
      value,
      left: leftId,
      right: rightId,
      x: currentX,
      y: currentY
    };
    
    nodes.push(node);
    return id;
  }

  const rootId = createNode(0, X_CENTER, Y_START);
  
  // Sorting nodes ensures a predictable array order, although we mainly look up by ID
  nodes.sort((a, b) => parseInt(a.id.split("-")[1]) - parseInt(b.id.split("-")[1]));

  return { nodes, rootId };
}
