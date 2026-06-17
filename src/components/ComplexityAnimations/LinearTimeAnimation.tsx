import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LinearTimeAnimation() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const ARRAY_SIZE = 10;
  const array = Array.from({ length: ARRAY_SIZE }, (_, i) => i);

  useEffect(() => {
    if (!isPlaying) return;

    if (currentIndex < ARRAY_SIZE) {
      const timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 500); // slightly faster than exponential to feel linear
      return () => clearTimeout(timer);
    }
  }, [isPlaying, currentIndex]);

  const handleReplay = () => {
    setCurrentIndex(-1);
    setIsPlaying(true);
  };

  return (
    <div className="flex flex-col items-center w-full bg-card/30 rounded-xl border border-border p-4">
      <div className="flex justify-between items-center w-full mb-4">
        <h4 className="text-sm font-semibold text-foreground">Linear Growth O(n)</h4>
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

      <div className="w-full relative h-[150px] bg-background/50 rounded-lg border border-border flex flex-col items-center justify-center gap-4">
        <div className="flex gap-1 overflow-x-auto px-4 max-w-full">
          {array.map((item, index) => {
            const isProcessed = index < currentIndex;
            const isActive = index === currentIndex;
            
            return (
              <motion.div
                key={index}
                className={`w-8 h-10 flex items-center justify-center rounded-md font-mono text-xs border ${
                  isActive 
                    ? "bg-viz-active text-white border-viz-active scale-110 z-10" 
                    : isProcessed
                    ? "bg-viz-sorted text-white border-viz-sorted"
                    : "bg-background text-muted-foreground border-border"
                }`}
                animate={{
                  scale: isActive ? 1.1 : 1,
                  y: isActive ? -5 : 0
                }}
              >
                {item}
              </motion.div>
            );
          })}
        </div>

        <div className="absolute bottom-2 left-2 right-2 flex justify-between bg-card/80 backdrop-blur-sm p-2 rounded-md border border-border text-xs font-mono">
          <span className="text-muted-foreground">Input Size (n): <span className="text-foreground font-bold">{ARRAY_SIZE}</span></span>
          <span className="text-muted-foreground">Operations: <span className="text-viz-active font-bold">{Math.max(0, currentIndex)}</span></span>
        </div>
      </div>
    </div>
  );
}
