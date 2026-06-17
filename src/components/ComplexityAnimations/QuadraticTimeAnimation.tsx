import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function QuadraticTimeAnimation() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentOp, setCurrentOp] = useState(0);
  const N = 8;
  const TOTAL_OPS = N * N;

  useEffect(() => {
    if (!isPlaying) return;

    if (currentOp < TOTAL_OPS) {
      const timer = setTimeout(() => {
        setCurrentOp((prev) => prev + 1);
      }, 100); // Fast animation to get through 64 steps smoothly
      return () => clearTimeout(timer);
    }
  }, [isPlaying, currentOp, TOTAL_OPS]);

  const handleReplay = () => {
    setCurrentOp(0);
    setIsPlaying(true);
  };

  const currentI = Math.floor(currentOp / N);
  const currentJ = currentOp % N;

  return (
    <div className="flex flex-col items-center w-full bg-card/30 rounded-xl border border-border p-4">
      <div className="flex justify-between items-center w-full mb-4">
        <h4 className="text-sm font-semibold text-foreground">Quadratic Growth O(n²)</h4>
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

      <div className="w-full relative h-[240px] bg-background/50 rounded-lg border border-border flex flex-col items-center justify-center p-4">
        
        {/* N x N Grid */}
        <div className="grid gap-1 mb-4" style={{ gridTemplateColumns: `repeat(${N}, minmax(0, 1fr))` }}>
          {Array.from({ length: TOTAL_OPS }).map((_, index) => {
            const isProcessed = index < currentOp;
            const isActive = index === currentOp;
            
            return (
              <motion.div
                key={index}
                className={`w-6 h-6 sm:w-5 sm:h-5 rounded-sm transition-colors border ${
                  isActive 
                    ? "bg-viz-active border-viz-active z-10" 
                    : isProcessed
                    ? "bg-viz-sorted/60 border-viz-sorted/80"
                    : "bg-card border-border/50"
                }`}
                animate={{
                  scale: isActive ? 1.2 : 1,
                  opacity: isActive ? 1 : isProcessed ? 0.8 : 0.4
                }}
                transition={{ duration: 0.1 }}
              />
            );
          })}
        </div>

        <div className="absolute bottom-2 left-2 right-2 flex justify-between bg-card/80 backdrop-blur-sm p-2 rounded-md border border-border text-xs font-mono">
          <div className="flex flex-col">
            <span className="text-muted-foreground">Size (N): <span className="text-foreground font-bold">{N}</span></span>
            <span className="text-muted-foreground mt-0.5 text-[10px]">
              i={currentOp < TOTAL_OPS ? currentI : N-1}, j={currentOp < TOTAL_OPS ? currentJ : N-1}
            </span>
          </div>
          <span className="text-muted-foreground flex items-center">
            Operations: <span className="text-viz-active font-bold ml-1 text-sm">{currentOp} / {TOTAL_OPS}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
