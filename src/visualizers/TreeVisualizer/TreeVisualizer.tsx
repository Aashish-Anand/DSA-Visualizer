import { motion } from "framer-motion";
import type { TreeTraversalState, TreeNode } from "@/types";

interface TreeVisualizerProps {
  state: TreeTraversalState;
}

export function TreeVisualizer({ state }: TreeVisualizerProps) {
  const { nodes, currentNodeId, visitedNodeIds, queueIds = [], callStackIds = [] } = state;

  // Create a map for easy lookup of node coordinates when drawing edges
  const nodeMap = new Map<string, TreeNode>();
  for (const node of nodes) {
    nodeMap.set(node.id, node);
  }

  // Draw edges and calculate null nodes
  const edges: { id: string; x1: number; y1: number; x2: number; y2: number; isNull?: boolean }[] = [];
  const nullNodes: { id: string; x: number; y: number; parentId: string }[] = [];

  for (const node of nodes) {
    const depth = Math.round((node.y - 50) / 80);
    const xOffset = 200 / Math.pow(2, depth);
    const childY = node.y + 80;

    // Left child
    if (node.left) {
      const leftChild = nodeMap.get(node.left);
      if (leftChild) {
        edges.push({
          id: `${node.id}-${leftChild.id}`,
          x1: node.x,
          y1: node.y,
          x2: leftChild.x,
          y2: leftChild.y,
        });
      }
    } else {
      const nullX = node.x - xOffset;
      const nullId = `${node.id}-null-left`;
      nullNodes.push({ id: nullId, x: nullX, y: childY, parentId: node.id });
      edges.push({
        id: `edge-${nullId}`,
        x1: node.x,
        y1: node.y,
        x2: nullX,
        y2: childY,
        isNull: true,
      });
    }

    // Right child
    if (node.right) {
      const rightChild = nodeMap.get(node.right);
      if (rightChild) {
        edges.push({
          id: `${node.id}-${rightChild.id}`,
          x1: node.x,
          y1: node.y,
          x2: rightChild.x,
          y2: rightChild.y,
        });
      }
    } else {
      const nullX = node.x + xOffset;
      const nullId = `${node.id}-null-right`;
      nullNodes.push({ id: nullId, x: nullX, y: childY, parentId: node.id });
      edges.push({
        id: `edge-${nullId}`,
        x1: node.x,
        y1: node.y,
        x2: nullX,
        y2: childY,
        isNull: true,
      });
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-card/30 p-4">
      {/* 
        We use an SVG viewBox of 0 0 1000 400.
        The tree generator places the root at X=500, Y=50, 
        with the lowest level at Y=290. 
      */}
      <div className="w-full max-w-4xl aspect-[5/2]">
        <svg viewBox="0 0 1000 400" className="w-full h-full overflow-visible">
          {/* Edges Layer */}
          <g className="edges">
            {edges.map((edge) => (
              <line
                key={edge.id}
                x1={edge.x1}
                y1={edge.y1}
                x2={edge.x2}
                y2={edge.y2}
                stroke="currentColor"
                strokeWidth={2}
                className={edge.isNull ? "text-muted-foreground/30" : "text-muted-foreground/60"}
                strokeDasharray={edge.isNull ? "4 4" : "none"}
              />
            ))}
          </g>

          {/* Null Nodes Layer */}
          <g className="null-nodes">
            {nullNodes.map((nn) => {
              const isCurrent = nn.id === currentNodeId;
              return (
                <motion.g
                  key={nn.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {isCurrent && (
                    <motion.circle
                      cx={nn.x}
                      cy={nn.y}
                      r={16}
                      fill="var(--color-viz-active)"
                      opacity={0.3}
                      initial={{ scale: 1 }}
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                  <motion.text
                    x={nn.x}
                    y={nn.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="font-mono font-bold"
                    animate={{ 
                      fill: isCurrent ? "var(--viz-active)" : "var(--muted-fg)",
                      opacity: isCurrent ? 1 : 0.5,
                      fontSize: isCurrent ? 20 : 16
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    ∅
                  </motion.text>
                </motion.g>
              );
            })}
          </g>

          {/* Nodes Layer */}
          <g className="nodes">
            {nodes.map((node) => {
              const isCurrent = node.id === currentNodeId;
              const isVisited = visitedNodeIds.includes(node.id);
              const isInQueue = queueIds.includes(node.id);

              let fillColor = "var(--bg)";
              let strokeColor = "var(--muted-fg)";
              let textColor = "var(--fg)";

              if (isCurrent) {
                fillColor = "var(--color-viz-active)";
                strokeColor = "var(--color-viz-active)";
                textColor = "#fff";
              } else if (isVisited) {
                fillColor = "var(--color-viz-sorted)";
                strokeColor = "var(--color-viz-sorted)";
                textColor = "#fff";
              } else if (isInQueue) {
                fillColor = "var(--color-viz-comparing)";
                strokeColor = "var(--color-viz-comparing)";
                textColor = "#000";
              }

              return (
                <motion.g
                  key={node.id}
                  initial={{ x: node.x, y: node.y - 20, opacity: 0 }}
                  animate={{ x: node.x, y: node.y, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                >
                  {/* Outer glow for active node */}
                  {isCurrent && (
                    <motion.circle
                      cx={0}
                      cy={0}
                      r={24}
                      fill="var(--color-viz-active)"
                      opacity={0.3}
                      initial={{ scale: 1 }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}

                  {/* Main Circle */}
                  <motion.circle
                    cx={0}
                    cy={0}
                    r={18}
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth={2}
                    animate={{
                      scale: isCurrent ? 1.15 : 1,
                      fill: fillColor,
                      stroke: strokeColor,
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Text */}
                  <motion.text
                    x={0}
                    y={0}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={textColor}
                    fontSize={14}
                    fontWeight={600}
                    fontFamily="var(--font-mono)"
                    animate={{ fill: textColor }}
                  >
                    {node.value}
                  </motion.text>
                </motion.g>
              );
            })}
          </g>
        </svg>
      </div>
      
      {/* Bottom Information UI */}
      <div className="w-full max-w-5xl mt-2 flex flex-col md:flex-row items-start justify-center gap-8 px-4 pb-8">
        {/* Queue UI for Level Order Traversal */}
        {queueIds.length > 0 && (
          <div className="flex flex-col items-center border border-border rounded-xl p-4 bg-background/50 backdrop-blur-sm min-w-[200px]">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
              Queue (Front → Back)
            </span>
            <div className="flex gap-2 min-h-[40px] px-2 flex-wrap justify-center">
              {queueIds.map((id, index) => {
                const node = nodeMap.get(id)!;
                return (
                  <motion.div
                    key={`${id}-${index}`}
                    layout
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-viz-comparing text-black font-mono font-bold shadow-sm shrink-0"
                  >
                    {node.value}
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Call Stack UI for Recursive Traversals */}
        {callStackIds.length > 0 && (
          <div className="flex flex-col items-center border border-border rounded-xl p-4 bg-background/50 backdrop-blur-sm min-w-[200px]">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
              Call Stack (Bottom → Top)
            </span>
            <div className="flex gap-2 min-h-[40px] px-2 flex-wrap justify-center items-center">
              {callStackIds.map((id, index) => {
                if (id === "null") {
                  return (
                    <div key={`stack-null-${index}`} className="flex items-center gap-2">
                      {index > 0 && <span className="text-muted-foreground/50 text-sm">→</span>}
                      <motion.div
                        layout
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-dashed border-muted text-muted-foreground font-mono font-bold shrink-0 bg-background/50"
                        title="Null Pointer"
                      >
                        ∅
                      </motion.div>
                    </div>
                  );
                }

                const node = nodeMap.get(id)!;
                return (
                  <div key={`stack-${id}-${index}`} className="flex items-center gap-2">
                    {index > 0 && <span className="text-muted-foreground/50 text-sm">→</span>}
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="w-10 h-10 flex items-center justify-center rounded-lg bg-viz-active text-white font-mono font-bold shadow-sm shrink-0"
                    >
                      {node.value}
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Output Array / Visited Nodes */}
        {visitedNodeIds.length > 0 && (
          <div className="flex flex-col items-center flex-1 w-full">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
              Traversal Output
            </span>
            <div className="flex flex-wrap justify-center gap-2">
              {visitedNodeIds.map((id, index) => {
                const node = nodeMap.get(id)!;
                return (
                  <motion.div
                    key={`visited-${id}-${index}`}
                    initial={{ opacity: 0, scale: 0.5, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-viz-sorted text-white font-mono font-bold shadow-sm shrink-0"
                  >
                    {node.value}
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
