import { motion } from "framer-motion";
import { MessageSquareText } from "lucide-react";
import { useFeedbackContext } from "@/hooks/useFeedbackContext";

export function FeedbackButton() {
  const { openModal } = useFeedbackContext();

  return (
    <motion.button
      onClick={openModal}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full bg-primary text-primary-foreground font-medium text-sm shadow-lg shadow-primary/20 cursor-pointer"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 300, damping: 20 }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 8px 30px rgba(124, 58, 237, 0.35)",
      }}
      whileTap={{ scale: 0.95 }}
      aria-label="Send feedback"
    >
      <MessageSquareText size={16} />
      <span>Feedback</span>
    </motion.button>
  );
}
