import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FrogJumpProblemVisualizerProps {
  heights: number[];
  onSwitchToAlgorithm: () => void;
}

export function FrogJumpProblemVisualizer({ heights, onSwitchToAlgorithm }: FrogJumpProblemVisualizerProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [frogPosition, setFrogPosition] = useState(0);
  const [jump1Target, setJump1Target] = useState<number | null>(null);
  const [jump2Target, setJump2Target] = useState<number | null>(null);
  const [energyCost, setEnergyCost] = useState<number | null>(null);
  const [totalEnergy, setTotalEnergy] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [phase, setPhase] = useState<"evaluate" | "jump" | "wait">("evaluate");

  useEffect(() => {
    if (!isPlaying || isFinished) return;

    let timer: ReturnType<typeof setTimeout>;

    if (phase === "evaluate") {
      // Show jump options
      const j1 = frogPosition + 1 < heights.length ? frogPosition + 1 : null;
      const j2 = frogPosition + 2 < heights.length ? frogPosition + 2 : null;
      
      // eslint-disable-next-line
      setJump1Target(j1);
       
      setJump2Target(j2);
      
      let cost1 = Infinity;
      let cost2 = Infinity;
      if (j1 !== null) cost1 = Math.abs(heights[j1] - heights[frogPosition]);
      if (j2 !== null) cost2 = Math.abs(heights[j2] - heights[frogPosition]);
      
      const chosenCost = Math.min(cost1, cost2);
      setEnergyCost(chosenCost);

      timer = setTimeout(() => {
        setPhase("jump");
      }, 1500); // Wait to show evaluation
    } else if (phase === "jump") {
      // Perform the jump
      let nextPos = frogPosition + 1;
      let cost1 = Infinity;
      let cost2 = Infinity;
      
      if (frogPosition + 1 < heights.length) cost1 = Math.abs(heights[frogPosition + 1] - heights[frogPosition]);
      if (frogPosition + 2 < heights.length) cost2 = Math.abs(heights[frogPosition + 2] - heights[frogPosition]);
      
      if (cost2 < cost1) {
        nextPos = frogPosition + 2;
      }

      setFrogPosition(nextPos);
      setTotalEnergy(prev => prev + Math.min(cost1, cost2));
      setJump1Target(null);
      setJump2Target(null);
      setEnergyCost(null);

      if (nextPos === heights.length - 1) {
        setIsFinished(true);
        setIsPlaying(false);
      } else {
        setPhase("wait");
      }
    } else if (phase === "wait") {
      timer = setTimeout(() => {
        setPhase("evaluate");
      }, 800); // Quick rest before next eval
    }

    return () => clearTimeout(timer);
  }, [isPlaying, isFinished, phase, frogPosition, heights]);

  const handleReplay = () => {
    setFrogPosition(0);
    setTotalEnergy(0);
    setJump1Target(null);
    setJump2Target(null);
    setEnergyCost(null);
    setIsFinished(false);
    setPhase("evaluate");
    setIsPlaying(true);
  };

  return (
    <div className="w-full h-full flex flex-col items-center bg-card/30 p-4 relative overflow-y-auto">
      
      {/* Simulation Controls */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-8 mt-4 border-b border-border pb-4">
        <div>
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <span>🐸</span> Problem Simulation: Frog Jump
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            The frog wants to reach the end using minimum energy. Watch a "Greedy" attempt!
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsPlaying(!isPlaying)}
            disabled={isFinished}
            className="w-24 gap-2"
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            {isPlaying ? "Pause" : "Play"}
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="w-9 h-9"
            onClick={handleReplay}
          >
            <RotateCcw size={14} />
          </Button>
        </div>
      </div>

      <div className="relative flex flex-col items-center w-full max-w-4xl mx-auto px-10 mt-12">
        
        {/* SVG overlay for jump arrows */}
        <div className="absolute inset-0 pointer-events-none z-10" style={{ height: "150px", top: "-100px" }}>
          <svg className="w-full h-full overflow-visible">
            <defs>
              <marker
                id="arrowhead-jump"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="var(--color-viz-active)" />
              </marker>
            </defs>

            {(jump1Target !== null || jump2Target !== null) && (
              <>
                {jump1Target !== null && (
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    d={`M ${50 + (frogPosition / (heights.length - 1)) * 100}% 150 Q ${
                      50 + (((frogPosition + jump1Target) / 2) / (heights.length - 1)) * 100
                    }% 20 ${50 + (jump1Target / (heights.length - 1)) * 100}% 150`}
                    fill="none"
                    stroke={jump2Target && Math.abs(heights[jump1Target]-heights[frogPosition]) > Math.abs(heights[jump2Target]-heights[frogPosition]) ? "var(--color-border)" : "var(--color-viz-active)"}
                    strokeWidth={4}
                    strokeDasharray="8 4"
                    markerEnd="url(#arrowhead-jump)"
                  />
                )}
                {jump2Target !== null && (
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
                    d={`M ${50 + (frogPosition / (heights.length - 1)) * 100}% 150 Q ${
                      50 + (((frogPosition + jump2Target) / 2) / (heights.length - 1)) * 100
                    }% -20 ${50 + (jump2Target / (heights.length - 1)) * 100}% 150`}
                    fill="none"
                    stroke={jump1Target && Math.abs(heights[jump2Target]-heights[frogPosition]) > Math.abs(heights[jump1Target]-heights[frogPosition]) ? "var(--color-border)" : "var(--color-viz-active)"}
                    strokeWidth={4}
                    strokeDasharray="8 4"
                    markerEnd="url(#arrowhead-jump)"
                  />
                )}
              </>
            )}
          </svg>
        </div>

        {/* The Stones (Array) */}
        <div className="flex gap-4 sm:gap-6 justify-between w-full relative z-20">
          {heights.map((height, i) => {
            const isFrogHere = i === frogPosition;
            const isTarget = i === jump1Target || i === jump2Target;
            const isDestination = i === heights.length - 1;

            return (
              <div key={i} className="flex flex-col items-center gap-2 relative flex-1">
                {/* Frog Emoji */}
                <div className="h-12 w-12 flex items-center justify-center absolute -top-16">
                  {isFrogHere && (
                    <motion.div
                      layoutId="frog"
                      initial={false}
                      animate={{ y: [0, -10, 0], scale: 1 }}
                      transition={{ y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" } }}
                      className="text-4xl drop-shadow-lg z-30"
                    >
                      🐸
                    </motion.div>
                  )}
                  {isTarget && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`bg-background font-mono font-bold text-xs px-2 py-1 rounded-full shadow-lg whitespace-nowrap absolute -top-6 border ${
                        Math.abs(height - heights[frogPosition]) === energyCost 
                          ? "text-viz-active border-viz-active" 
                          : "text-muted-foreground border-border"
                      }`}
                    >
                      Cost: {Math.abs(height - heights[frogPosition])}
                    </motion.div>
                  )}
                </div>

                {/* Stone */}
                <motion.div
                  className={`w-full max-w-[80px] aspect-square flex flex-col items-center justify-center rounded-2xl shadow-xl border-4 transition-colors ${
                    isFrogHere
                      ? "bg-primary/20 border-primary text-primary"
                      : isTarget
                      ? "bg-viz-active/20 border-viz-active text-viz-active"
                      : isDestination
                      ? "bg-green-500/20 border-green-500 text-green-500"
                      : "bg-card border-border text-foreground"
                  }`}
                  animate={{ scale: isFrogHere || isTarget ? 1.1 : 1 }}
                >
                  <span className="text-xs uppercase tracking-widest opacity-60 font-semibold mb-1">
                    {isDestination ? "Goal" : `Stn ${i}`}
                  </span>
                  <span className="text-2xl font-bold">{height}</span>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Information Panel */}
      <div className="mt-16 w-full max-w-xl bg-card border border-border rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <span className="text-muted-foreground font-medium">Total Energy Expended:</span>
          <span className="text-2xl font-bold font-mono text-viz-active">{totalEnergy}</span>
        </div>
        
        <AnimatePresence>
          {isFinished && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="bg-primary/10 border border-primary/20 rounded-lg p-4 mt-4 text-sm leading-relaxed"
            >
              <p className="mb-4">
                The frog reached the end using a <strong>Greedy</strong> strategy (always picking the cheapest immediate jump). 
                However, Greedy choices do not always lead to the global minimum energy in the long run!
              </p>
              <Button onClick={onSwitchToAlgorithm} className="w-full font-bold">
                See Optimal Algorithm
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
