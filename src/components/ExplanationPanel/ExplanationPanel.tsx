import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Baby, GraduationCap } from "lucide-react";
import { HelpfulRating } from "@/components/Feedback/HelpfulRating";

interface ExplanationPanelProps {
  explanation: string;
  beginnerExplanation: string;
  currentStep: number;
  totalSteps: number;
  algorithmName?: string;
}

export function ExplanationPanel({
  explanation,
  beginnerExplanation,
  currentStep,
  totalSteps,
  algorithmName,
}: ExplanationPanelProps) {
  const [isBeginnerMode, setIsBeginnerMode] = useState(false);

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

      {/* Explanation Text */}
      <div className="flex-1 relative min-h-[48px]">
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
      </div>

      {/* Helpful Rating */}
      {algorithmName && (
        <HelpfulRating
          algorithmName={algorithmName}
          currentStep={currentStep}
        />
      )}
    </div>
  );
}

