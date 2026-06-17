import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, HardDrive } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ComplexityAnalysis } from "@/types";
import { ExponentialTimeAnimation } from "@/components/ComplexityAnimations/ExponentialTimeAnimation";
import { LinearTimeAnimation } from "@/components/ComplexityAnimations/LinearTimeAnimation";

import { LogarithmicTimeAnimation } from "@/components/ComplexityAnimations/LogarithmicTimeAnimation";
import { QuadraticTimeAnimation } from "@/components/ComplexityAnimations/QuadraticTimeAnimation";

interface ComplexityDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  complexity: ComplexityAnalysis;
  algorithmName: string;
}

export function ComplexityDrawer({
  isOpen,
  onClose,
  complexity,
  algorithmName,
}: ComplexityDrawerProps) {
  const renderTimeAnimation = () => {
    switch (complexity.timeAnimationId) {
      case "exponential":
        return <ExponentialTimeAnimation />;
      case "linear":
        return <LinearTimeAnimation />;
      case "logarithmic":
        return <LogarithmicTimeAnimation />;
      case "quadratic":
        return <QuadraticTimeAnimation />;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-xl bg-card border-l border-border shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div>
                <h2 className="text-lg font-semibold tracking-tight">Complexity Analysis</h2>
                <p className="text-sm text-muted-foreground">{algorithmName}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                <X size={18} />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              
              {/* Time Complexity Section */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 text-primary">
                  <Clock size={20} />
                  <h3 className="font-semibold text-lg">Time Complexity</h3>
                  <div className="ml-auto px-3 py-1 bg-primary/10 text-primary rounded-md font-mono text-sm font-bold">
                    {complexity.timeComplexity}
                  </div>
                </div>

                {complexity.timeAnimationId && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-full mb-4"
                  >
                    {renderTimeAnimation()}
                  </motion.div>
                )}
                
                <div className="space-y-3">
                  {(complexity.timeExplanation || []).map((text, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="p-3 bg-muted/50 rounded-lg text-sm border border-border/50 leading-relaxed"
                    >
                      {text}
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              <div className="h-px bg-border/50 w-full" />

              {/* Space Complexity Section */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 text-indigo-500">
                  <HardDrive size={20} />
                  <h3 className="font-semibold text-lg">Space Complexity</h3>
                  <div className="ml-auto px-3 py-1 bg-indigo-500/10 text-indigo-500 rounded-md font-mono text-sm font-bold">
                    {complexity.spaceComplexity}
                  </div>
                </div>
                
                <div className="space-y-3">
                  {(complexity.spaceExplanation || []).map((text, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="p-3 bg-muted/50 rounded-lg text-sm border border-border/50 leading-relaxed"
                    >
                      {text}
                    </motion.div>
                  ))}
                </div>
              </motion.section>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
