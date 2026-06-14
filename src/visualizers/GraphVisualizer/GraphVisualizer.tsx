import { motion } from "framer-motion";
import type { GraphTraversalState, GraphNode } from "@/types";

interface GraphVisualizerProps {
  state: GraphTraversalState;
}

export function GraphVisualizer({ state }: GraphVisualizerProps) {
  const { nodes, edges, currentNodeId, visitedNodeIds, queueIds = [], callStackIds = [] } = state;

  // Create a map for easy lookup of node coordinates
  const nodeMap = new Map<string, GraphNode>();
  for (const node of nodes) {
    nodeMap.set(node.id, node);
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-card/30 p-4">
      <div className="w-full max-w-5xl flex flex-row items-center justify-center gap-6">
        {/* Viewbox tailored to fit our graph utils layout (around 1000x400) */}
        <div className="flex-1 aspect-[5/2]">
          <svg viewBox="0 0 1000 400" className="w-full h-full overflow-visible">
          {/* Edges Layer */}
          <g className="edges">
            {edges.map((edge) => {
              const sourceNode = nodeMap.get(edge.source);
              const targetNode = nodeMap.get(edge.target);
              
              if (!sourceNode || !targetNode) return null;

              // If edge is part of traversal path, we could highlight it
              const isSourceVisited = visitedNodeIds.includes(edge.source);
              const isTargetVisited = visitedNodeIds.includes(edge.target);
              const isEdgeVisited = isSourceVisited && isTargetVisited;

              return (
                <line
                  key={edge.id}
                  x1={sourceNode.x}
                  y1={sourceNode.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  stroke={isEdgeVisited ? "var(--color-viz-sorted)" : "currentColor"}
                  strokeWidth={isEdgeVisited ? 3 : 2}
                  className={isEdgeVisited ? "" : "text-muted-foreground/60"}
                  style={{ transition: "stroke 0.3s ease-in-out, stroke-width 0.3s ease-in-out" }}
                />
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

        {/* Adjacency List Panel */}
        <div className="w-64 flex-shrink-0 bg-background/60 backdrop-blur-md border border-border rounded-lg p-3 shadow-sm max-h-[350px] overflow-y-auto hidden md:block z-10">
          <h3 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2 border-b border-border pb-1">
            Adjacency List
          </h3>
          <div className="flex flex-col gap-1 text-xs font-mono">
            {nodes.map(node => {
              const isCurrent = node.id === currentNodeId;
              const isVisited = visitedNodeIds.includes(node.id);

              return (
                <motion.div 
                  key={`adj-${node.id}`} 
                  animate={{
                    x: isCurrent ? 8 : 0,
                    opacity: isVisited && !isCurrent ? 0.5 : 1,
                  }}
                  className="flex items-start gap-2 py-0.5"
                >
                  <motion.span 
                    animate={{ 
                      color: isCurrent ? "var(--color-viz-active)" : (isVisited ? "var(--color-viz-sorted)" : "var(--fg)"),
                      textDecoration: isCurrent ? "underline" : "none",
                      textUnderlineOffset: "4px"
                    }}
                    className="font-bold min-w-[20px]"
                  >
                    {node.value}:
                  </motion.span>
                  <span className="break-words max-w-[150px] flex gap-1 flex-wrap">
                    <span className="text-muted-foreground">[</span>
                    {node.neighbors.map((nId, idx) => {
                      const nNode = nodeMap.get(nId)!;
                      const nVisited = visitedNodeIds.includes(nId);
                      const nQueue = queueIds.includes(nId) || callStackIds.includes(nId);
                      const nCurrent = nId === currentNodeId;

                      let nColor = "var(--muted-fg)";
                      if (nCurrent) nColor = "var(--color-viz-active)";
                      else if (nVisited) nColor = "var(--color-viz-sorted)";
                      else if (nQueue) nColor = "var(--color-viz-comparing)";

                      return (
                        <motion.span 
                          key={`adj-n-${node.id}-${nId}`}
                          animate={{ color: nColor }}
                          className="font-semibold"
                        >
                          {nNode.value}{idx < node.neighbors.length - 1 ? <span className="text-muted-foreground">,</span> : ""}
                        </motion.span>
                      );
                    })}
                    <span className="text-muted-foreground">]</span>
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Information UI */}
      <div className="w-full max-w-5xl mt-2 flex flex-col md:flex-row items-start justify-center gap-8 px-4 pb-8">
        {/* Queue UI for BFS */}
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

        {/* Call Stack UI for DFS */}
        {callStackIds.length > 0 && (
          <div className="flex flex-col items-center border border-border rounded-xl p-4 bg-background/50 backdrop-blur-sm min-w-[200px]">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
              Call Stack (Bottom → Top)
            </span>
            <div className="flex gap-2 min-h-[40px] px-2 flex-wrap justify-center items-center">
              {callStackIds.map((id, index) => {
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

        {/* Visited Array Output */}
        <div className="flex flex-col items-center flex-1 w-full">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
            Visited Array
          </span>
          <div className="flex flex-wrap justify-center gap-2">
            {nodes.map((node) => {
              const isVisited = visitedNodeIds.includes(node.id);
              return (
                <div key={`visited-arr-${node.id}`} className="flex flex-col items-center gap-1">
                  <span className="text-[10px] text-muted-foreground font-mono">
                    {node.value}
                  </span>
                  <motion.div
                    initial={false}
                    animate={{
                      backgroundColor: isVisited ? "var(--color-viz-sorted)" : "var(--card)",
                      color: isVisited ? "#fff" : "var(--muted-fg)",
                      borderColor: isVisited ? "var(--color-viz-sorted)" : "var(--border)",
                    }}
                    className="w-10 h-10 flex items-center justify-center rounded-lg border-2 font-mono font-bold shadow-sm shrink-0 transition-colors"
                  >
                    {isVisited ? "T" : "F"}
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
