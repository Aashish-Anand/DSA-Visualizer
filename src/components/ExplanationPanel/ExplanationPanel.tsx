import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Baby, GraduationCap, CheckCircle2, XCircle } from "lucide-react";
import { HelpfulRating } from "@/components/Feedback/HelpfulRating";
import type { DryRunPrompt } from "@/types";

interface ExplanationPanelProps {
  explanation: string;
  beginnerExplanation: string;
  currentStep: number;
  totalSteps: number;
  algorithmName?: string;
  isDryRunMode?: boolean;
  dryRunPrompt?: DryRunPrompt;
}

export function ExplanationPanel({
  explanation,
  beginnerExplanation,
  currentStep,
  totalSteps,
  algorithmName,
  isDryRunMode,
  dryRunPrompt,
}: ExplanationPanelProps) {
  const [isBeginnerMode, setIsBeginnerMode] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  // Reset answer when step changes
  useEffect(() => {
    // eslint-disable-next-line
    setSelectedAnswer(null);
  }, [currentStep]);

  const displayText = isBeginnerMode ? beginnerExplanation : explanation;

  return (
    <div className="flex flex-col gap-3 p-4 h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Explanation
          </span>
          <Badge
            variant="secondary"
            className="text-[10px] px-2 py-0 h-5 tabular-nums font-semibold"
          >
            Step {currentStep + 1} / {totalSteps}
          </Badge>
        </div>

        {/* Right Side Header Controls */}
        <div className="flex items-center gap-3">
          {/* Helpful Rating */}
          {algorithmName && (
            <HelpfulRating
              algorithmName={algorithmName}
              currentStep={currentStep}
            />
          )}

          {/* Vertical Divider */}
          <div className="w-px h-4 bg-border mx-1" />

          {/* Beginner Mode Toggle */}
          <div className="flex items-center gap-2">
            <GraduationCap
              size={14}
              className={`transition-colors ${
                !isBeginnerMode ? "text-primary" : "text-muted-foreground/40"
              }`}
            />
            <Switch
              checked={isBeginnerMode}
              onCheckedChange={setIsBeginnerMode}
              className="data-[state=checked]:bg-amber-500"
            />
            <Baby
              size={14}
              className={`transition-colors ${
                isBeginnerMode ? "text-amber-500" : "text-muted-foreground/40"
              }`}
            />
            <span
              className={`text-[11px] font-medium transition-colors ${
                isBeginnerMode ? "text-amber-500" : "text-muted-foreground"
              }`}
            >
              {isBeginnerMode ? "ELI12 On" : "ELI12"}
            </span>
          </div>
        </div>
      </div>

      {/* Explanation Text */}
      <div className="flex-1 flex flex-col relative min-h-[48px] overflow-y-auto pr-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${displayText}-${isBeginnerMode}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className={`text-sm leading-relaxed ${
              isBeginnerMode
                ? "text-amber-400/90 dark:text-amber-300/90"
                : "text-foreground/80"
            }`}
          >
            {isBeginnerMode && (
              <span className="inline-block mr-1.5">💡</span>
            )}
            {displayText}
          </motion.div>
        </AnimatePresence>

        {/* Dry Run Quiz UI */}
        {isDryRunMode && dryRunPrompt && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 pt-4 border-t border-border"
          >
            <div className="mb-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                <GraduationCap size={14} /> Active Learning
              </span>
              <p className="text-sm font-medium">{dryRunPrompt.question}</p>
            </div>
            
            <div className="flex flex-col gap-2">
              {dryRunPrompt.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === dryRunPrompt.correctOptionIndex;
                const showFeedback = selectedAnswer !== null;
                
                let variant: "outline" | "default" | "destructive" | "secondary" = "outline";
                let icon = null;
                
                if (showFeedback) {
                  if (isCorrect) {
                    variant = "default"; // Green/Primary for correct
                    icon = <CheckCircle2 size={16} className="ml-auto" />;
                  } else if (isSelected && !isCorrect) {
                    variant = "destructive"; // Red for incorrect selected
                    icon = <XCircle size={16} className="ml-auto" />;
                  } else {
                    variant = "secondary"; // Gray out others
                  }
                } else if (isSelected) {
                  variant = "secondary";
                }

                return (
                  <Button
                    key={index}
                    variant={variant}
                    className={`justify-start text-left h-auto py-2 px-3 ${
                      showFeedback && isCorrect ? "bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-500" : ""
                    } ${showFeedback && !isCorrect && isSelected ? "bg-red-500 hover:bg-red-600 text-white border-red-500" : ""}`}
                    onClick={() => {
                      if (selectedAnswer === null) setSelectedAnswer(index);
                    }}
                    disabled={selectedAnswer !== null}
                  >
                    <span className="mr-2 text-xs opacity-50">{String.fromCharCode(65 + index)}.</span>
                    <span className="text-sm whitespace-pre-wrap">{option}</span>
                    {icon}
                  </Button>
                );
              })}
            </div>
            
            {selectedAnswer !== null && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`mt-4 text-sm font-medium ${
                  selectedAnswer === dryRunPrompt.correctOptionIndex ? "text-emerald-500" : "text-red-500"
                }`}
              >
                {selectedAnswer === dryRunPrompt.correctOptionIndex 
                  ? "Correct! You can press Play or Next to continue." 
                  : "Not quite! Check the explanation and try again later."}
              </motion.div>
            )}
          </motion.div>
        )}
      </div>

    </div>
  );
}

