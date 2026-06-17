import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TreeNode {
  id: string;
  x: number;
  y: number;
  level: number;
  parentId: string | null;
}

export function ExponentialTimeAnimation() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentLevel, setCurrentLevel] = useState(0);
  const MAX_LEVELS = 5;

  useEffect(() => {
    if (!isPlaying) return;

    if (currentLevel < MAX_LEVELS) {
      const timer = setTimeout(() => {
        setCurrentLevel((prev) => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isPlaying, currentLevel]);

  const handleReplay = () => {
    setCurrentLevel(0);
    setIsPlaying(true);
  };

  // Generate binary tree up to MAX_LEVELS
  const nodes: TreeNode[] = [];
  const edges: { source: TreeNode; target: TreeNode }[] = [];

  const width = 400;
  const height = 250;
  const rootX = width / 2;
  const rootY = 30;
  const levelHeight = 45;

  let idCounter = 0;
  function buildTree(level: number, x: number, y: number, xOffset: number, parentId: string | null) {
    if (level > MAX_LEVELS) return;
    
    const node: TreeNode = {
      id: `node-${idCounter++}`,
      x,
      y,
      level,
      parentId
    };
    nodes.push(node);

    if (parentId) {
      const parent = nodes.find(n => n.id === parentId);
      if (parent) {
        edges.push({ source: parent, target: node });
      }
    }

    if (level < MAX_LEVELS) {
      buildTree(level + 1, x - xOffset, y + levelHeight, xOffset / 2, node.id);
      buildTree(level + 1, x + xOffset, y + levelHeight, xOffset / 2, node.id);
    }
  }

  buildTree(0, rootX, rootY, 100, null);

  const visibleNodes = nodes.filter(n => n.level <= currentLevel);
  const visibleEdges = edges.filter(e => e.target.level <= currentLevel);

  return (
    <div className="flex flex-col items-center w-full bg-card/30 rounded-xl border border-border p-4">
      <div className="flex justify-between items-center w-full mb-4">
        <h4 className="text-sm font-semibold text-foreground">Exponential Growth O(2^n)</h4>
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7" 
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7" 
            onClick={handleReplay}
          >
            <RotateCcw size={14} />
          </Button>
        </div>
      </div>

      <div className="w-full relative h-[250px] bg-background/50 rounded-lg border border-border overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
          {/* Edges */}
          {visibleEdges.map((edge) => (
            <motion.line
              key={`edge-${edge.source.id}-${edge.target.id}`}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              x1={edge.source.x}
              y1={edge.source.y}
              x2={edge.target.x}
              y2={edge.target.y}
              stroke="var(--muted-fg)"
              strokeWidth={2}
              opacity={0.5}
            />
          ))}

          {/* Nodes */}
          {visibleNodes.map((node) => (
            <motion.circle
              key={`node-${node.id}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              cx={node.x}
              cy={node.y}
              r={12}
              fill={node.level === currentLevel ? "var(--color-viz-active)" : "var(--color-viz-sorted)"}
            />
          ))}
        </svg>

        <div className="absolute bottom-2 left-2 right-2 flex justify-between bg-card/80 backdrop-blur-sm p-2 rounded-md border border-border text-xs font-mono">
          <span className="text-muted-foreground">Input Size (n): <span className="text-foreground font-bold">{currentLevel}</span></span>
          <span className="text-muted-foreground">Operations: <span className="text-viz-active font-bold">{visibleNodes.length}</span></span>
        </div>
      </div>
    </div>
  );
}
