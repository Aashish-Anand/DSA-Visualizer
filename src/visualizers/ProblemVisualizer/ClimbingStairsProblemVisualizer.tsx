import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ClimbingStairsProblemVisualizerProps {
  n: number;
  onSwitchToAlgorithm: () => void;
}

export function ClimbingStairsProblemVisualizer({ n, onSwitchToAlgorithm }: ClimbingStairsProblemVisualizerProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [phase, setPhase] = useState<"evaluate" | "jump" | "wait">("evaluate");

  // In this simulation, we'll just take a random walk of 1s and 2s to reach n
  const [jumpAmount, setJumpAmount] = useState<1 | 2 | null>(null);

  useEffect(() => {
    if (!isPlaying || isFinished) return;

    let timer: ReturnType<typeof setTimeout>;

    if (phase === "evaluate") {
      // Pick a random valid jump (1 or 2 steps)
      const options = [];
      if (currentStep + 1 <= n) options.push(1);
      if (currentStep + 2 <= n) options.push(2);
      
      const chosen = options[Math.floor(Math.random() * options.length)] as 1 | 2;
      // eslint-disable-next-line
      setJumpAmount(chosen);

      timer = setTimeout(() => {
        setPhase("jump");
      }, 1000); 
    } else if (phase === "jump") {
      if (jumpAmount) {
        const nextStep = currentStep + jumpAmount;
        setCurrentStep(nextStep);
        
        if (nextStep === n) {
          setIsFinished(true);
          setIsPlaying(false);
        } else {
          setPhase("wait");
        }
      }
    } else if (phase === "wait") {
      timer = setTimeout(() => {
        setJumpAmount(null);
        setPhase("evaluate");
      }, 600); 
    }

    return () => clearTimeout(timer);
  }, [isPlaying, isFinished, phase, currentStep, n, jumpAmount]);

  const handleReplay = () => {
    setCurrentStep(0);
    setJumpAmount(null);
    setIsFinished(false);
    setPhase("evaluate");
    setIsPlaying(true);
  };

  // Generate stairs from top to bottom
  const stairs = Array.from({ length: n + 1 }, (_, i) => n - i);

  return (
    <div className="w-full h-full flex flex-col items-center bg-card/30 p-4 relative overflow-y-auto">
      
      {/* Simulation Controls */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-8 mt-4 border-b border-border pb-4">
        <div>
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <span>🏃</span> Problem Simulation: Climbing Stairs
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            You can climb 1 or 2 steps at a time. Watch a random path to the top!
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

      <div className="relative flex flex-col items-end w-full max-w-2xl mx-auto mt-4 pb-20 px-8">
        {stairs.map((stairIndex) => {
          const isCurrent = stairIndex === currentStep;
          const isTarget = phase === "evaluate" && jumpAmount !== null && stairIndex === currentStep + jumpAmount;
          
          return (
            <div key={stairIndex} className="flex flex-row items-end w-full">
              {/* Labels and Person */}
              <div className="flex-1 flex justify-end items-center pr-4 h-12 relative">
                {isTarget && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute right-16 top-1/2 -translate-y-1/2 bg-background font-bold text-xs px-2 py-1 rounded-full border border-viz-active text-viz-active shadow-lg"
                  >
                    +{jumpAmount} Step{jumpAmount === 2 ? 's' : ''}
                  </motion.div>
                )}

                {isCurrent && (
                  <motion.div
                    layoutId="person"
                    initial={false}
                    className="text-4xl absolute right-4 z-30"
                    style={{ bottom: "0" }}
                  >
                    🏃
                  </motion.div>
                )}
              </div>

              {/* Stair Block */}
              <div 
                className={`h-12 border-t-4 border-l-4 border-b-0 border-r-0 rounded-tl-md flex items-center justify-center transition-colors ${
                  stairIndex === n ? "bg-green-500/20 border-green-500 text-green-500" :
                  isCurrent ? "bg-primary/20 border-primary text-primary" : 
                  isTarget ? "bg-viz-active/20 border-viz-active" : 
                  "bg-card border-border text-muted-foreground"
                }`}
                style={{ width: `${30 + (stairIndex / n) * 70}%` }}
              >
                <span className="font-bold font-mono opacity-60">Step {stairIndex}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Information Panel */}
      <div className="mt-8 w-full max-w-xl bg-card border border-border rounded-xl p-6 shadow-sm">
        <AnimatePresence>
          {isFinished && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-sm leading-relaxed"
            >
              <p className="mb-4">
                The person reached the top using one specific path of 1s and 2s! <br/><br/>
                However, the problem asks: <strong>How many DISTINCT ways</strong> are there to reach the top? 
                To figure this out, we need to explore every possible branching path.
              </p>
              <Button onClick={onSwitchToAlgorithm} className="w-full font-bold">
                See DP Algorithm
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
