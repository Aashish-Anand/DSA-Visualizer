import { motion } from "framer-motion";
import type { WaterState } from "@/types";

interface WaterVisualizerProps {
  state: WaterState;
}

export function WaterVisualizer({ state }: WaterVisualizerProps) {
  const {
    type,
    heights,
    left,
    right,
    currentArea,
    maxArea,
    bestLeft,
    bestRight,
    leftMax,
    rightMax,
    waterLevels,
    totalWater,
    phase,
  } = state;

  const maxVal = Math.max(...heights, 1);
  const containerHeight = 240;
  const pxPerUnit = containerHeight / maxVal;

  const isTrapping = type === "trapping";
  const isContainer = type === "container";

  // For Container, calculate the water rectangle
  let containerWaterLeft = 0;
  let containerWaterWidth = 0;
  let containerWaterHeight = 0;

  if (isContainer && left !== null && right !== null) {
    const minH = Math.min(heights[left], heights[right]);
    containerWaterHeight = minH * pxPerUnit;
    // Water spans exactly between the inner edges of the left and right boundary bars
    containerWaterWidth = Math.max(0, (right - left) * 56 - 48); 
    containerWaterLeft = left * 56 + 48;
  }

  return (
    <div className="flex flex-col items-center w-full h-full p-4 gap-6 overflow-auto">
      {/* Stats Display */}
      <div className="flex items-center gap-4 flex-wrap justify-center">
        {isContainer && (
          <>
            <motion.div
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className="text-xs font-medium text-muted-foreground">Current Area:</span>
              <span className="text-lg font-bold text-primary">{currentArea !== null ? currentArea : "-"}</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border-2"
              style={{ borderColor: "var(--color-viz-found)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className="text-xs font-medium text-muted-foreground">Max Area:</span>
              <span className="text-lg font-bold" style={{ color: "var(--color-viz-found)" }}>{maxArea}</span>
            </motion.div>
          </>
        )}
        
        {isTrapping && (
          <>
            <motion.div
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className="text-xs font-medium text-muted-foreground">Left Max:</span>
              <span className="text-lg font-bold text-primary">{leftMax}</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className="text-xs font-medium text-muted-foreground">Right Max:</span>
              <span className="text-lg font-bold" style={{ color: "var(--color-viz-comparing)" }}>{rightMax}</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 bg-[hsla(199,89%,48%,0.1)]"
              style={{ borderColor: "var(--color-viz-active)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className="text-xs font-medium text-[var(--color-viz-active)]">Total Water:</span>
              <span className="text-xl font-bold text-[var(--color-viz-active)]">{totalWater}</span>
            </motion.div>
          </>
        )}
      </div>

      {/* Main Visualization Area */}
      <div className="w-full mt-4 flex justify-center">
        <div className="w-full max-w-5xl overflow-x-auto pb-10 custom-scrollbar">
          <div className="flex items-end justify-start gap-2 flex-nowrap min-w-max px-8 pt-10 pb-2 relative h-[320px]">
            
            {/* Container Water Rectangle Overlay */}
            {isContainer && left !== null && right !== null && phase !== "init" && (
              <motion.div
                className="absolute bottom-2 rounded-sm flex items-center justify-center"
                style={{
                  left: `${containerWaterLeft + 32}px`, // +32 for px-8 padding
                  width: `${containerWaterWidth}px`,
                  height: `${containerWaterHeight}px`,
                  backgroundColor: "hsla(199, 89%, 48%, 0.3)",
                  border: "2px solid hsla(199, 89%, 48%, 0.6)",
                  borderTopWidth: "4px",
                  zIndex: 30,
                  pointerEvents: "none",
                }}
                initial={false}
                animate={{
                  left: `${containerWaterLeft + 32}px`,
                  width: `${containerWaterWidth}px`,
                  height: `${containerWaterHeight}px`,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                {currentArea !== null && containerWaterHeight > 30 && (
                  <span className="text-white font-mono text-xs md:text-sm font-bold whitespace-nowrap bg-black/40 px-3 py-1.5 rounded-full shadow-sm backdrop-blur-sm">
                    ({right} - {left}) × min({heights[left]}, {heights[right]}) = {currentArea}
                  </span>
                )}
              </motion.div>
            )}

            {heights.map((height, index) => {
              const isLeft = index === left;
              const isRight = index === right;
              const isBest = isContainer && (index === bestLeft || index === bestRight);
              const waterAmount = isTrapping && waterLevels ? waterLevels[index] : 0;
              
              const barHeight = height * pxPerUnit;
              const waterBlockHeight = waterAmount * pxPerUnit;

              let borderColor = "var(--color-border)";
              let bgColor = "var(--color-muted)";
              
              if (isLeft) {
                borderColor = "var(--color-primary)";
                bgColor = "var(--color-primary)";
              } else if (isRight) {
                borderColor = "var(--color-viz-comparing)";
                bgColor = "var(--color-viz-comparing)";
              } else if (isBest) {
                borderColor = "var(--color-viz-found)";
                bgColor = "var(--color-viz-found)";
              } else if (isContainer && left !== null && right !== null && index > left && index < right) {
                bgColor = "var(--color-card)";
              }

              return (
                <div key={`bar-${index}`} className="flex flex-col items-center gap-2 relative z-10 w-[48px]">
                  {/* Trapping Rain Water: Water Block */}
                  {isTrapping && waterAmount > 0 && (
                    <motion.div
                      className="absolute w-full rounded-sm flex items-center justify-center text-xs font-bold text-white shadow-[0_0_10px_hsla(199,89%,48%,0.5)] z-20"
                      style={{
                        bottom: `${barHeight}px`,
                        height: `${waterBlockHeight}px`,
                        backgroundColor: "var(--color-viz-active)", // Blue water
                        borderBottom: "none",
                      }}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: waterBlockHeight, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                      {waterAmount > 0 && waterBlockHeight > 15 ? waterAmount : ""}
                    </motion.div>
                  )}

                  {/* The Solid Height Bar */}
                  <motion.div
                    className="w-full rounded-t-md border-2 border-b-0 flex items-start justify-center pt-2 text-xs font-bold transition-colors z-10 overflow-hidden"
                    style={{
                      height: `${Math.max(barHeight, 2)}px`,
                      backgroundColor: bgColor,
                      borderColor: borderColor,
                      color: isLeft || isRight || isBest ? "white" : "var(--color-foreground)",
                    }}
                    layout
                  >
                    {barHeight > 16 ? height : ""}
                  </motion.div>

                  {/* Index Label */}
                  <span className="text-[10px] text-muted-foreground absolute -bottom-5">
                    {index}
                  </span>

                  {/* Pointers */}
                  <div className="absolute -bottom-12 flex flex-col items-center gap-1">
                    {isLeft && (
                      <motion.div layoutId="ptr-left" className="text-[10px] font-black rounded px-1.5 py-0.5 bg-primary text-white">
                        L
                      </motion.div>
                    )}
                    {isRight && (
                      <motion.div layoutId="ptr-right" className="text-[10px] font-black rounded px-1.5 py-0.5" style={{ backgroundColor: "var(--color-viz-comparing)", color: "white" }}>
                        R
                      </motion.div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
