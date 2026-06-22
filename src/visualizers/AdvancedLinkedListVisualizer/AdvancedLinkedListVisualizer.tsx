import { motion, AnimatePresence } from "framer-motion";
import type { AdvancedLinkedListState, AdvancedLinkedListNode } from "@/types";

interface AdvancedLinkedListVisualizerProps {
  state: AdvancedLinkedListState;
}

export function AdvancedLinkedListVisualizer({ state }: AdvancedLinkedListVisualizerProps) {
  const { nodes, pointers, phase, extraInfo } = state;

  const nodeMap = new Map<string, AdvancedLinkedListNode>();
  for (const node of nodes) {
    nodeMap.set(node.id, node);
  }

  // Edges
  const edges: { id: string; path: string; isBackwards: boolean }[] = [];
  for (const node of nodes) {
    if (node.nextId) {
      const nextNode = nodeMap.get(node.nextId);
      if (nextNode) {
        // Local coords: node body is x=-32 to 12. Next box is x=12 to 32. Center of next box is 22.
        const startX = node.x + 22;
        const startY = node.y;
        
        let path: string;
        let isBackwards = false;

        if (nextNode.x < node.x && nextNode.y === node.y) {
          // Backward curve for reversing
          isBackwards = true;
          const sx = node.x + 22;
          const sy = node.y + 20; // bottom of source next box
          const ex = nextNode.x; // center bottom of target
          const ey = nextNode.y + 20 + 4; // bottom of target + gap
          
          path = `M ${sx} ${sy} Q ${(sx + ex) / 2} ${sy + 60} ${ex} ${ey}`;
        } else if (nextNode.y !== node.y) {
           // Diagonal/Cross-row (e.g. Merge Two Sorted Lists)
           // If moving to a different row, maybe draw an S-curve or just a straight line.
           // A straight line is fine, but cubic bezier looks premium.
           const sx = node.x + 22;
           const sy = node.y;
           const ex = nextNode.x - 32 - 4;
           const ey = nextNode.y;
           
           path = `M ${sx} ${sy} C ${sx + 40} ${sy}, ${ex - 40} ${ey}, ${ex} ${ey}`;
        } else {
          // Standard forward line
          const endX = nextNode.x - 32 - 4; // left edge of target minus arrow gap
          const endY = nextNode.y;
          path = `M ${startX} ${startY} L ${endX} ${endY}`;
        }
        
        edges.push({
          id: `${node.id}->${nextNode.id}`,
          path,
          isBackwards
        });
      }
    }
  }

  // Determine pointers for each node
  const pointersByNodeId = new Map<string, string[]>();
  for (const [pointerName, targetId] of Object.entries(pointers)) {
    if (targetId) {
      if (!pointersByNodeId.has(targetId)) {
        pointersByNodeId.set(targetId, []);
      }
      pointersByNodeId.get(targetId)!.push(pointerName);
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-card/30 p-4 relative overflow-hidden">
      {/* Top UI */}
      {(phase || extraInfo) && (
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-20">
          {phase && (
            <div className="bg-primary/20 text-primary border border-primary/30 px-4 py-1.5 rounded-full font-semibold text-sm">
              Phase: {phase}
            </div>
          )}
          {extraInfo && (
            <div className="bg-amber-500/20 text-amber-500 border border-amber-500/30 px-4 py-1.5 rounded-full font-semibold text-sm font-mono flex items-center gap-2">
              {extraInfo}
            </div>
          )}
        </div>
      )}

      {/* Canvas */}
      <div className="w-full max-w-5xl aspect-[5/2]">
        <svg viewBox="0 0 1000 400" className="w-full h-full overflow-visible">
          <defs>
            <marker
              id="arrowhead"
              markerWidth="8"
              markerHeight="6"
              refX="0"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 8 3, 0 6" fill="var(--muted-fg)" />
            </marker>
          </defs>

          {/* Edges Layer */}
          <g className="edges">
            <AnimatePresence>
              {edges.map((edge) => (
                <motion.path
                  key={edge.id}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1, d: edge.path }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  stroke="var(--muted-fg)"
                  strokeWidth={2}
                  fill="none"
                  markerEnd="url(#arrowhead)"
                />
              ))}
            </AnimatePresence>
          </g>

          {/* Nodes Layer */}
          <g className="nodes">
            <AnimatePresence>
              {nodes.map((node) => {
                const nodePointers = pointersByNodeId.get(node.id) || [];
                
                const isFound = nodePointers.includes('found') || nodePointers.includes('deleted');
                const isCurr = nodePointers.includes('curr');
                const isPrev = nodePointers.includes('prev');
                const isNext = nodePointers.includes('next');
                const isL1 = nodePointers.includes('l1') || nodePointers.includes('list1');
                const isL2 = nodePointers.includes('l2') || nodePointers.includes('list2');
                const isFast = nodePointers.includes('fast');
                const isSlow = nodePointers.includes('slow');
                
                let borderColor = "var(--border)";
                let bgColor = "var(--card)";
                let textColor = "var(--fg)";
                
                if (isFound) {
                  borderColor = "#10b981"; 
                  bgColor = "rgba(16, 185, 129, 0.1)";
                  textColor = "#10b981";
                } else if (isCurr || isFast) {
                  borderColor = "#f59e0b"; 
                  bgColor = "rgba(245, 158, 11, 0.1)";
                  textColor = "#f59e0b";
                } else if (isPrev || isNext || isSlow) {
                  borderColor = "#3b82f6"; 
                  bgColor = "rgba(59, 130, 246, 0.1)";
                  textColor = "#3b82f6";
                } else if (isL1) {
                  borderColor = "#a855f7"; 
                  bgColor = "rgba(168, 85, 247, 0.1)";
                  textColor = "#a855f7";
                } else if (isL2) {
                  borderColor = "#ec4899"; 
                  bgColor = "rgba(236, 72, 153, 0.1)";
                  textColor = "#ec4899";
                }

                return (
                  <motion.g
                    key={node.id}
                    layoutId={`node-${node.id}`}
                    initial={{ x: node.x, y: node.y - 20, opacity: 0 }}
                    animate={{ x: node.x, y: node.y, opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    {/* Pointers Text */}
                    {nodePointers.length > 0 && (
                      <motion.text
                        x={0}
                        y={-30}
                        textAnchor="middle"
                        fill={borderColor}
                        fontSize={12}
                        fontWeight="bold"
                        fontFamily="var(--font-mono)"
                      >
                        {nodePointers.join(", ")}
                      </motion.text>
                    )}

                    {/* Node Body */}
                    <g>
                      <rect
                        x={-32}
                        y={-20}
                        width={44}
                        height={40}
                        rx={6}
                        fill={bgColor}
                        stroke={borderColor}
                        strokeWidth={2}
                      />
                      <text
                        x={-10}
                        y={2}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill={textColor}
                        fontSize={16}
                        fontFamily="var(--font-mono)"
                        fontWeight="600"
                      >
                        {node.value}
                      </text>
                      
                      <rect
                        x={12}
                        y={-20}
                        width={20}
                        height={40}
                        rx={6}
                        fill="var(--muted)"
                        stroke={borderColor}
                        strokeWidth={2}
                      />
                      <circle
                        cx={22}
                        cy={0}
                        r={3}
                        fill={node.nextId ? "var(--fg)" : "transparent"}
                      />
                    </g>
                  </motion.g>
                );
              })}
            </AnimatePresence>
          </g>
        </svg>
      </div>
    </div>
  );
}
