import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LogarithmicTimeAnimation() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const ARRAY_SIZE = 16;
  const array = Array.from({ length: ARRAY_SIZE }, (_, i) => i + 1);

  // We will simulate searching for the number '11' (index 10)
  const steps = [
    { l: 0, r: 15, m: 7 },
    { l: 8, r: 15, m: 11 },
    { l: 8, r: 10, m: 9 },
    { l: 10, r: 10, m: 10 } // Found
  ];

  useEffect(() => {
    if (!isPlaying) return;

    if (currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 1500); 
      return () => clearTimeout(timer);
    }
  }, [isPlaying, currentStep, steps.length]);

  const handleReplay = () => {
    setCurrentStep(0);
    setIsPlaying(true);
  };

  const { l, r, m } = steps[currentStep];

  return (
    <div className="flex flex-col items-center w-full bg-card/30 rounded-xl border border-border p-4">
      <div className="flex justify-between items-center w-full mb-4">
        <h4 className="text-sm font-semibold text-foreground">Logarithmic Growth O(log n)</h4>
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

      <div className="w-full relative h-[160px] bg-background/50 rounded-lg border border-border flex flex-col items-center justify-center gap-4">
        
        {/* Array */}
        <div className="flex gap-1 overflow-x-auto px-4 w-full justify-center">
          {array.map((item, index) => {
            const isActive = index >= l && index <= r;
            const isMid = index === m;
            const isFound = currentStep === steps.length - 1 && index === m;
            
            return (
              <div key={index} className="flex flex-col items-center gap-1">
                {/* Pointers Area */}
                <div className="h-4 flex items-end justify-center text-[10px] font-bold font-mono">
                  {index === l && <span className="text-blue-500">L</span>}
                  {index === r && index !== l && <span className="text-blue-500">R</span>}
                  {isMid && index !== l && index !== r && <span className="text-viz-active">M</span>}
                  {isMid && (index === l || index === r) && <span className="text-viz-active ml-1">M</span>}
                </div>

                {/* Box */}
                <motion.div
                  className={`w-7 h-9 flex items-center justify-center rounded-sm font-mono text-xs border transition-colors ${
                    isFound
                      ? "bg-green-500 text-white border-green-500 shadow-lg scale-110 z-20"
                      : isMid
                      ? "bg-viz-active text-white border-viz-active scale-110 z-10"
                      : isActive
                      ? "bg-card text-foreground border-border"
                      : "bg-background text-muted-foreground/30 border-border/30"
                  }`}
                  animate={{
                    opacity: isActive ? 1 : 0.3,
                    scale: isMid || isFound ? 1.1 : 1
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {item}
                </motion.div>
              </div>
            );
          })}
        </div>

        <div className="absolute bottom-2 left-2 right-2 flex justify-between bg-card/80 backdrop-blur-sm p-2 rounded-md border border-border text-xs font-mono">
          <span className="text-muted-foreground">Size (N): <span className="text-foreground font-bold">{r - l + 1}</span></span>
          <span className="text-muted-foreground">Operations: <span className="text-viz-active font-bold">{currentStep + 1} / {steps.length}</span></span>
        </div>
      </div>
    </div>
  );
}
