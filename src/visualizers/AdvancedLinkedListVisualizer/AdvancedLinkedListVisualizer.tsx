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
  
  function getIntersectionPoint(x1: number, y1: number, x2: number, y2: number, w: number, h: number, padding: number) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    if (dx === 0 && dy === 0) return { x: x1, y: y1 };

    const hw = w / 2 + padding;
    const hh = h / 2 + padding;

    const tan_phi = hh / hw;
    const tan_theta = Math.abs(dy / dx);

    let qx: number;
    let qy: number;

    if (dx === 0 || tan_theta > tan_phi) {
      qy = hh * Math.sign(dy);
      qx = dx === 0 ? 0 : qy * (dx / dy);
    } else {
      qx = hw * Math.sign(dx);
      qy = dy === 0 ? 0 : qx * (dy / dx);
    }

    return { x: x1 + qx, y: y1 + qy };
  }

  for (const node of nodes) {
    if (node.nextId) {
      const nextNode = nodeMap.get(node.nextId);
      if (nextNode) {
        let path: string;
        let isBackwards = false;

        if (nextNode.x < node.x && nextNode.y === node.y) {
          // Backward curve for reversing
          isBackwards = true;
          const sx = node.x + 44 - 16; // start from bottom of current node
          const sy = node.y + 48; // below the text
          const ex = nextNode.x; // center bottom of target
          const ey = nextNode.y + 48; // below the text
          
          path = `M ${sx} ${sy} Q ${(sx + ex) / 2} ${sy + 40} ${ex} ${ey}`;
        } else {
          // Straight line with bounding box intersection for perfect arrowheads
          const startP = getIntersectionPoint(node.x, node.y, nextNode.x, nextNode.y, 88, 48, 4);
          const endP = getIntersectionPoint(nextNode.x, nextNode.y, node.x, node.y, 88, 48, 4);
          
          path = `M ${startP.x} ${startP.y} L ${endP.x} ${endP.y}`;
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
              refX="8"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 8 3, 0 6" fill="var(--border)" />
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
                  stroke="var(--border)"
                  strokeWidth={2.5}
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
                const isHead = nodePointers.includes('head') || nodePointers.includes('dummy');
                
                let borderColor = "var(--border)";
                let dataBgColor = "transparent";
                let textColor = "var(--foreground)";
                let dotColor = "var(--muted-foreground)";
                let dotOpacity = 0.5;
                let pointerTextColor = "var(--primary)";
                
                if (isFound) {
                  borderColor = "#10b981"; 
                  dataBgColor = "rgba(16, 185, 129, 0.2)";
                  textColor = "#10b981";
                  dotColor = "#10b981";
                  dotOpacity = 1;
                  pointerTextColor = "#10b981";
                } else if (isCurr || isFast) {
                  borderColor = "#f59e0b"; 
                  dataBgColor = "rgba(245, 158, 11, 0.1)";
                  textColor = "#f59e0b";
                  dotColor = "#f59e0b";
                  dotOpacity = 1;
                  pointerTextColor = "#f59e0b";
                } else if (isPrev || isNext || isSlow) {
                  borderColor = "#3b82f6"; 
                  dataBgColor = "rgba(59, 130, 246, 0.1)";
                  textColor = "#3b82f6";
                  dotColor = "#3b82f6";
                  dotOpacity = 1;
                  pointerTextColor = "#3b82f6";
                } else if (isL1) {
                  borderColor = "#a855f7"; 
                  dataBgColor = "rgba(168, 85, 247, 0.1)";
                  textColor = "#a855f7";
                  dotColor = "#a855f7";
                  dotOpacity = 1;
                  pointerTextColor = "#a855f7";
                } else if (isL2) {
                  borderColor = "#ec4899"; 
                  dataBgColor = "rgba(236, 72, 153, 0.1)";
                  textColor = "#ec4899";
                  dotColor = "#ec4899";
                  dotOpacity = 1;
                  pointerTextColor = "#ec4899";
                } else if (!isHead) {
                  pointerTextColor = "var(--muted-foreground)";
                }

                return (
                  <motion.g
                    key={node.id}
                    layoutId={`node-${node.id}`}
                    initial={{ x: node.x, y: node.y - 20, opacity: 0 }}
                    animate={{ 
                      x: node.x, 
                      y: node.y, 
                      opacity: 1,
                      scale: isFound ? 1.1 : isCurr || isFast ? 1.05 : 1
                    }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    style={{
                      filter: isFound
                        ? "drop-shadow(0px 0px 15px rgba(16, 185, 129, 0.4))"
                        : isCurr || isFast
                        ? "drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.1))"
                        : "drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.05))"
                    }}
                  >
                    {/* Pointers Text */}
                    {nodePointers.length > 0 && (
                      <motion.text
                        x={-40}
                        y={-32}
                        textAnchor="start"
                        fill={pointerTextColor}
                        fontSize={10}
                        fontWeight="bold"
                        fontFamily="var(--font-sans, system-ui)"
                        letterSpacing={1}
                        style={{ textTransform: "uppercase" }}
                      >
                        {nodePointers.join(", ")}
                      </motion.text>
                    )}

                    {/* Node Body */}
                    <g>
                      <clipPath id={`clip-${node.id}`}>
                        <rect x={-44} y={-24} width={88} height={48} rx={12} />
                      </clipPath>

                      {/* Backgrounds */}
                      <g clipPath={`url(#clip-${node.id})`}>
                        <rect x={-44} y={-24} width={88} height={48} fill="var(--card)" />
                        <rect x={-44} y={-24} width={56} height={48} fill={dataBgColor} />
                        <rect x={12} y={-24} width={32} height={48} fill="var(--muted)" fillOpacity={0.3} />
                      </g>

                      {/* Outline and Separator */}
                      <rect x={-44} y={-24} width={88} height={48} rx={12} fill="none" stroke={borderColor} strokeWidth={2} />
                      <line x1={12} y1={-24} x2={12} y2={24} stroke={borderColor} strokeWidth={2} />

                      {/* Data Text */}
                      <text
                        x={-16}
                        y={2}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill={textColor}
                        fontSize={18}
                        fontFamily="var(--font-mono)"
                        fontWeight="500"
                      >
                        {node.value}
                      </text>
                      
                      {/* Pointer Dot */}
                      <circle
                        cx={28}
                        cy={0}
                        r={4}
                        fill={dotColor}
                        opacity={dotOpacity}
                      />
                    </g>

                    {/* Index Text */}
                    <text
                      x={0}
                      y={40}
                      textAnchor="middle"
                      fill="var(--muted-foreground)"
                      opacity={0.5}
                      fontSize={9}
                      fontFamily="var(--font-mono)"
                    >
                      Node {node.id}
                    </text>
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
