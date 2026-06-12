import { motion, AnimatePresence } from "framer-motion";
import type { StockBuySellState } from "@/types";

interface StockBuySellVisualizerProps {
  state: StockBuySellState;
}

export function StockBuySellVisualizer({ state }: StockBuySellVisualizerProps) {
  const {
    prices,
    currentIndex,
    minPriceIndex,
    buyIndex,
    sellIndex,
    maxProfit,
    currentProfit,
    phase,
  } = state;

  const maxPrice = Math.max(...prices, 1);

  return (
    <div className="flex flex-col items-center w-full h-full p-4 overflow-y-auto min-h-[400px]">
      {/* Top Info Cards */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-10 w-full max-w-4xl shrink-0">
        <div className="flex flex-col items-center p-3 rounded-xl border border-border bg-card shadow-sm min-w-[120px]">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
            Max Profit Found
          </span>
          <span className="text-2xl font-bold text-primary mt-1">${maxProfit}</span>
        </div>
        
        {currentProfit !== null && phase !== "init" && phase !== "complete" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`flex flex-col items-center p-3 rounded-xl border min-w-[120px] ${
              phase === "found-new-max-profit" 
                ? "border-emerald-500 bg-emerald-500/10 shadow-[0_0_15px_hsla(142,71%,45%,0.2)]" 
                : "border-border bg-card/50"
            }`}
          >
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
              Current Potential Profit
            </span>
            <span className={`text-xl font-bold mt-1 ${phase === "found-new-max-profit" ? "text-emerald-500" : "text-foreground"}`}>
              ${currentProfit > 0 ? currentProfit : 0}
            </span>
          </motion.div>
        )}
      </div>

      {/* Main Visualizer (Horizontal Scroll Wrapper) */}
      <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
        <div className="flex items-end justify-center min-w-max mx-auto px-4 h-[280px] gap-2 md:gap-4 relative mt-10">
          
          <AnimatePresence mode="popLayout">
            {prices.map((price, idx) => {
              const heightPercent = (price / maxPrice) * 100;
              
              const isCurrent = idx === currentIndex;
              const isMin = idx === minPriceIndex;
              const isBuy = phase === "complete" ? idx === buyIndex : false;
              const isSell = phase === "complete" ? idx === sellIndex : false;
              
              const isMaxProfitCombo = phase === "complete" && (isBuy || isSell);
              
              let barColor = "var(--color-viz-default)";
              let barGlow = "none";
              let opacity = 1;

              if (isMaxProfitCombo) {
                barColor = "var(--color-viz-found)";
                barGlow = "0 0 15px hsla(142, 71%, 45%, 0.4)";
              } else if (isCurrent) {
                barColor = "var(--color-viz-active)";
                barGlow = "0 0 15px hsla(199, 89%, 48%, 0.4)";
              } else if (isMin) {
                barColor = "hsla(262, 83%, 58%, 0.8)";
              } else if (currentIndex !== null && idx > currentIndex && phase !== "complete") {
                // Dim future days
                opacity = 0.3;
              }

              return (
                <motion.div
                  key={`price-bar-${idx}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity }}
                  className="flex flex-col items-center relative group"
                >
                  {/* Floating Labels */}
                  <div className="absolute -top-12 flex flex-col items-center pointer-events-none">
                    {isMin && !isMaxProfitCombo && (
                      <motion.div 
                        initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                        className="bg-primary/20 text-primary text-[10px] px-2 py-0.5 rounded font-bold mb-1 border border-primary/30"
                      >
                        MIN
                      </motion.div>
                    )}
                    {isBuy && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
                        className="bg-emerald-500/20 text-emerald-500 text-[10px] px-2 py-0.5 rounded font-bold mb-1 border border-emerald-500/30"
                      >
                        BUY
                      </motion.div>
                    )}
                    {isSell && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
                        className="bg-emerald-500/20 text-emerald-500 text-[10px] px-2 py-0.5 rounded font-bold mb-1 border border-emerald-500/30"
                      >
                        SELL
                      </motion.div>
                    )}
                  </div>

                  {/* Price Value */}
                  <div className={`text-xs font-semibold mb-2 tabular-nums transition-colors ${
                    isMaxProfitCombo ? "text-emerald-500 font-bold" : isCurrent ? "text-primary" : "text-muted-foreground"
                  }`}>
                    ${price}
                  </div>

                  {/* Bar */}
                  <motion.div
                    className="w-8 md:w-12 rounded-t-md relative transition-colors duration-300"
                    style={{
                      backgroundColor: barColor,
                      boxShadow: barGlow,
                    }}
                    animate={{
                      height: `${Math.max(heightPercent * 2.2, 10)}px`,
                      backgroundColor: barColor,
                      boxShadow: barGlow,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />

                  {/* Day Label */}
                  <div className="text-[10px] text-muted-foreground/60 mt-2">
                    Day {idx}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Completion Banner */}
      <AnimatePresence>
        {phase === "complete" && maxProfit > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 flex items-center gap-3 px-6 py-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 shadow-[0_0_20px_hsla(142,71%,45%,0.15)]"
          >
            <span className="text-2xl">💰</span>
            <div className="flex flex-col">
              <span className="font-bold">Maximum Profit Achieved!</span>
              <span className="text-xs opacity-80">
                Buy on Day {buyIndex} (${prices[buyIndex!]}), Sell on Day {sellIndex} (${prices[sellIndex!]})
              </span>
            </div>
          </motion.div>
        )}
        {phase === "complete" && maxProfit === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 flex items-center gap-3 px-6 py-3 rounded-xl border border-border bg-card"
          >
            <div className="flex flex-col items-center">
              <span className="font-bold text-muted-foreground">No Profit Possible</span>
              <span className="text-xs text-muted-foreground/60">
                The price goes down every day! Best to not buy at all.
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
