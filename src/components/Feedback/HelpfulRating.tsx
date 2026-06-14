import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { submitHelpfulRating } from "@/services/feedbackService";

interface HelpfulRatingProps {
  algorithmName: string;
  currentStep: number;
}

export function HelpfulRating({
  algorithmName,
  currentStep,
}: HelpfulRatingProps) {
  const [submitted, setSubmitted] = useState<boolean | null>(null);
  const [showAck, setShowAck] = useState(false);

  const handleRate = useCallback(
    async (helpful: boolean) => {
      if (submitted !== null) return; // Already rated this step
      setSubmitted(helpful);
      setShowAck(true);

      await submitHelpfulRating({
        algorithmName,
        currentStep,
        helpful,
        timestamp: new Date().toISOString(),
      });

      // Auto-hide acknowledgment after 2 seconds
      setTimeout(() => setShowAck(false), 2000);
    },
    [algorithmName, currentStep, submitted]
  );

  return (
    <div className="flex items-center gap-3 pt-2 border-t border-border/50 mt-auto">
      <span className="text-[11px] text-muted-foreground/70">
        Was this helpful?
      </span>

      <div className="flex items-center gap-1">
        <button
          onClick={() => handleRate(true)}
          disabled={submitted !== null}
          className={`p-1 rounded-md transition-all cursor-pointer ${
            submitted === true
              ? "text-emerald-500 bg-emerald-500/10"
              : submitted !== null
              ? "text-muted-foreground/30 cursor-not-allowed"
              : "text-muted-foreground/50 hover:text-emerald-500 hover:bg-emerald-500/10"
          }`}
          aria-label="Yes, this explanation was helpful"
        >
          <ThumbsUp size={13} />
        </button>
        <button
          onClick={() => handleRate(false)}
          disabled={submitted !== null}
          className={`p-1 rounded-md transition-all cursor-pointer ${
            submitted === false
              ? "text-red-500 bg-red-500/10"
              : submitted !== null
              ? "text-muted-foreground/30 cursor-not-allowed"
              : "text-muted-foreground/50 hover:text-red-500 hover:bg-red-500/10"
          }`}
          aria-label="No, this explanation was not helpful"
        >
          <ThumbsDown size={13} />
        </button>
      </div>

      <AnimatePresence>
        {showAck && (
          <motion.span
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="text-[10px] text-emerald-500 font-medium"
          >
            Thanks for your feedback!
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
