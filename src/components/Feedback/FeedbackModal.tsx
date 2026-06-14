import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Sparkles } from "lucide-react";
import { FeedbackForm } from "./FeedbackForm";
import { useFeedbackContext } from "@/hooks/useFeedbackContext";
import { submitFeedback } from "@/services/feedbackService";
import type { FeedbackFormData } from "@/types/feedback";

// ================================
// Modal States
// ================================

type ModalState = "form" | "submitting" | "success";

// ================================
// Component
// ================================

export function FeedbackModal() {
  const { isModalOpen, closeModal, buildContext } = useFeedbackContext();
  const [modalState, setModalState] = useState<ModalState>("form");
  const [error, setError] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Save and restore focus
  useEffect(() => {
    if (isModalOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      // Focus the modal container after animation
      const timer = setTimeout(() => {
        modalRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    } else {
      previousFocusRef.current?.focus();
    }
  }, [isModalOpen]);

  // Reset state when modal opens
  useEffect(() => {
    if (isModalOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setModalState("form");
      setError(null);
    }
  }, [isModalOpen]);
  useEffect(() => {
    if (!isModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, closeModal]);

  // Focus trap
  useEffect(() => {
    if (!isModalOpen || !modalRef.current) return;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !modalRef.current) return;

      const focusable = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [isModalOpen]);

  const handleSubmit = useCallback(
    async (formData: FeedbackFormData) => {
      setModalState("submitting");
      setError(null);
      try {
        const context = buildContext();
        await submitFeedback({ formData, context });
        setModalState("success");
      } catch {
        setError("Unable to send feedback right now. Please try again later.");
        setModalState("form");
      }
    },
    [buildContext]
  );

  const handleCancel = useCallback(() => {
    closeModal();
  }, [closeModal]);

  return (
    <AnimatePresence>
      {isModalOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="feedback-modal-title"
            aria-describedby="feedback-modal-desc"
            tabIndex={-1}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl p-6 pointer-events-auto"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors cursor-pointer"
                aria-label="Close feedback modal"
              >
                <X size={16} />
              </button>

              <AnimatePresence mode="wait">
                {modalState === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center py-8 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 15,
                        delay: 0.1,
                      }}
                      className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4"
                    >
                      <CheckCircle2 className="w-7 h-7 text-emerald-500" />
                    </motion.div>
                    <h3 className="text-lg font-bold text-foreground mb-1.5">
                      Thank You!
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6 max-w-[260px]">
                      Your feedback helps improve AlgoLens for everyone.
                    </p>
                    <button
                      onClick={closeModal}
                      className="px-6 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold transition-all hover:brightness-110 cursor-pointer"
                    >
                      Close
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles size={16} className="text-primary" />
                      <h2
                        id="feedback-modal-title"
                        className="text-base font-bold text-foreground"
                      >
                        Help Improve AlgoLens
                      </h2>
                    </div>
                    <p
                      id="feedback-modal-desc"
                      className="text-xs text-muted-foreground mb-5 pr-8"
                    >
                      Found a bug, confusing explanation, or have an idea? We&apos;d
                      love to hear from you.
                    </p>

                    <FeedbackForm
                      onSubmit={handleSubmit}
                      onCancel={handleCancel}
                      isSubmitting={modalState === "submitting"}
                      error={error}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
