import { motion } from "framer-motion";
import type { RecursionTreeState } from "@/types";

interface RecursionTreeVisualizerProps {
  state: RecursionTreeState;
}

export function RecursionTreeVisualizer({ state }: RecursionTreeVisualizerProps) {
  const { nodes, edges, currentNodeId, computedNodeIds, memoizedNodeIds, callStackIds, memoArray } = state;

  // Create a map for easy lookup of node coordinates
  const nodeMap = new Map();
  for (const node of nodes) {
    nodeMap.set(node.id, node);
  }

  // Calculate bounding box dynamically to ensure all nodes fit and the tree is centered
  let minX = 0, maxX = 1000, maxY = 400;
  if (nodes.length > 0) {
    minX = Math.min(...nodes.map(n => n.x)) - 80;
    maxX = Math.max(...nodes.map(n => n.x)) + 80;
    maxY = Math.max(...nodes.map(n => n.y)) + 80;
  }
  
  const contentWidth = maxX - minX;
  const contentHeight = maxY; // y starts at 50, goes down
  const svgWidth = Math.max(1000, contentWidth + 100);
  const svgHeight = Math.max(400, contentHeight + 100);
  const cx = (minX + maxX) / 2;
  const viewBoxX = cx - svgWidth / 2;
  const viewBoxY = 0; // top is always 0
  const viewBox = `${viewBoxX} ${viewBoxY} ${svgWidth} ${svgHeight}`;

  return (
    <div className="w-full h-full flex flex-col items-center bg-card/30 p-4 overflow-y-auto">
      {/* 
        Dynamic SVG viewBox that expands to fit the generated tree bounds
      */}
      <div className="w-full flex-1 flex items-center justify-center min-h-0">
        <svg viewBox={viewBox} className="w-full h-full overflow-visible max-h-full">
          {/* Edges Layer */}
          <g className="edges">
            {edges.map((edge) => {
              const sourceNode = nodeMap.get(edge.source);
              const targetNode = nodeMap.get(edge.target);
              
              if (!sourceNode || !targetNode) return null;

              return (
                <line
                  key={`${edge.source}-${edge.target}`}
                  x1={sourceNode.x}
                  y1={sourceNode.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  stroke="currentColor"
                  strokeWidth={2}
                  className="text-muted-foreground/60"
                />
              );
            })}
          </g>

          {/* Nodes Layer */}
          <g className="nodes">
            {nodes.map((node) => {
              const isCurrent = node.id === currentNodeId;
              const isComputed = computedNodeIds.includes(node.id);
              const isMemoized = memoizedNodeIds.includes(node.id);

              let fillColor = "var(--bg)";
              let strokeColor = "var(--muted-fg)";
              let textColor = "var(--fg)";
              
              const displayText = (isComputed || isMemoized) && node.value !== undefined 
                ? `${node.label}=${node.value}` 
                : node.label;
              
              // Calculate rect width based on text length (approx 9px per char + 20px padding)
              const rectWidth = Math.max(50, displayText.length * 9 + 20);
              const rectHeight = 36;

              if (isCurrent) {
                fillColor = "var(--color-viz-active)";
                strokeColor = "var(--color-viz-active)";
                textColor = "#fff";
              } else if (isMemoized) {
                fillColor = "#eab308"; // Tailwind yellow-500
                strokeColor = "#ca8a04"; // Tailwind yellow-600
                textColor = "#fff";
              } else if (isComputed) {
                fillColor = "var(--color-viz-sorted)";
                strokeColor = "var(--color-viz-sorted)";
                textColor = "#fff";
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
                    <motion.rect
                      x={-rectWidth / 2}
                      y={-rectHeight / 2}
                      width={rectWidth}
                      height={rectHeight}
                      rx={18}
                      fill="var(--color-viz-active)"
                      opacity={0.3}
                      initial={{ scale: 1 }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                  
                  {/* Special glow for memoized hit */}
                  {isCurrent && isMemoized && (
                     <motion.rect
                      x={-rectWidth / 2}
                      y={-rectHeight / 2}
                      width={rectWidth}
                      height={rectHeight}
                      rx={18}
                      fill="#eab308"
                      opacity={0.5}
                      initial={{ scale: 1 }}
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 0.5 }}
                    />
                  )}

                  {/* Main Rect (rounded like a pill to fit text) */}
                  <motion.rect
                    x={-rectWidth / 2}
                    y={-rectHeight / 2}
                    width={rectWidth}
                    height={rectHeight}
                    rx={18} // Fully rounded ends
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
                    {displayText}
                  </motion.text>
                </motion.g>
              );
            })}
          </g>
        </svg>
      </div>
      
      {/* Bottom Information UI */}
      <div className="w-full max-w-5xl mt-2 flex flex-col md:flex-row items-start justify-center gap-8 px-4 pb-8 min-h-[120px]">
        
        {/* Memo Array UI */}
        {memoArray && memoArray.length > 0 && (
          <div className="flex flex-col items-center border border-border rounded-xl p-4 bg-background/50 backdrop-blur-sm min-w-[200px]">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
              Memo Table
            </span>
            <div className="flex gap-2 min-h-[40px] px-2 flex-wrap justify-center items-center">
              {memoArray.map((value, index) => (
                <div key={`memo-${index}`} className="flex flex-col items-center gap-1">
                  <span className="text-[10px] text-muted-foreground font-mono">f({index})</span>
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg font-mono font-bold shadow-sm shrink-0 border ${
                      value !== null
                        ? "bg-viz-sorted text-white border-viz-sorted"
                        : "bg-background text-muted-foreground/30 border-dashed border-muted-foreground/30"
                    }`}
                  >
                    {value !== null ? value : "∅"}
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call Stack UI */}
        {callStackIds.length > 0 && (
          <div className="flex flex-col items-center border border-border rounded-xl p-4 bg-background/50 backdrop-blur-sm min-w-[200px]">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
              Call Stack (Bottom → Top)
            </span>
            <div className="flex gap-2 min-h-[40px] px-2 flex-wrap justify-center items-center">
              {callStackIds.map((id, index) => {
                const node = nodeMap.get(id);
                if (!node) return null;
                
                const isMemoized = memoizedNodeIds.includes(node.id);
                const isTop = index === callStackIds.length - 1;

                let bgColor = "bg-viz-active text-white";
                if (isMemoized && isTop) {
                   bgColor = "bg-yellow-500 text-white";
                }

                return (
                  <div key={`stack-${id}-${index}`} className="flex items-center gap-2">
                    {index > 0 && <span className="text-muted-foreground/50 text-sm">→</span>}
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className={`px-3 h-10 flex items-center justify-center rounded-lg font-mono font-bold shadow-sm shrink-0 ${bgColor}`}
                    >
                      {node.label}
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
