import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Bug, BookOpen, Lightbulb, Loader2 } from "lucide-react";
import type { FeedbackType, FeedbackFormData } from "@/types/feedback";

// ================================
// Constants
// ================================

const FEEDBACK_TYPES: { value: FeedbackType; label: string; icon: React.ReactNode }[] = [
  { value: "bug", label: "Bug", icon: <Bug size={14} /> },
  { value: "content-issue", label: "Content Issue", icon: <BookOpen size={14} /> },
  { value: "feature-request", label: "Feature Request", icon: <Lightbulb size={14} /> },
];

const MIN_DESCRIPTION = 10;
const MAX_DESCRIPTION = 2000;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ================================
// Component
// ================================

interface FeedbackFormProps {
  onSubmit: (data: FeedbackFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
  error: string | null;
}

export function FeedbackForm({
  onSubmit,
  onCancel,
  isSubmitting,
  error,
}: FeedbackFormProps) {
  const [type, setType] = useState<FeedbackType>("bug");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [cooldownError, setCooldownError] = useState<string | null>(null);
  const [touched, setTouched] = useState({ description: false, email: false });
  const descRef = useRef<HTMLTextAreaElement>(null);

  // Validation
  const descriptionError =
    touched.description && description.length > 0 && description.length < MIN_DESCRIPTION
      ? `At least ${MIN_DESCRIPTION} characters required (${description.length}/${MIN_DESCRIPTION})`
      : touched.description && description.length === 0
      ? "Description is required"
      : null;

  const emailError =
    touched.email && email.length > 0 && !EMAIL_REGEX.test(email)
      ? "Please enter a valid email address"
      : null;

  const isValid =
    description.length >= MIN_DESCRIPTION &&
    description.length <= MAX_DESCRIPTION &&
    (email.length === 0 || EMAIL_REGEX.test(email));

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setTouched({ description: true, email: true });
      if (!isValid) return;

      // Rate limit check: 30-second cooldown per client browser
      const lastSubmit = localStorage.getItem("algolens_last_feedback_time");
      if (lastSubmit && Date.now() - parseInt(lastSubmit, 10) < 30000) {
        setCooldownError("Please wait a few seconds before submitting more feedback.");
        return;
      }
      setCooldownError(null);
      localStorage.setItem("algolens_last_feedback_time", Date.now().toString());

      onSubmit({ 
        type, 
        description: description.trim(), 
        email: email.trim(),
        honeypot: honeypot.trim()
      });
    },
    [type, description, email, honeypot, isValid, onSubmit]
  );

  const displayError = error || cooldownError;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Invisible Honeypot field for bot trap */}
      <input
        type="text"
        name="website_url"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="hidden opacity-0 absolute -z-50 pointer-events-none"
        aria-hidden="true"
      />

      {/* Error banner */}
      {displayError && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-3 py-2.5 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm"
        >
          {displayError}
        </motion.div>
      )}

      {/* Feedback Type */}
      <fieldset disabled={isSubmitting}>
        <legend className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2.5">
          Feedback Type
        </legend>
        <div className="flex gap-2">
          {FEEDBACK_TYPES.map((ft) => (
            <button
              key={ft.value}
              type="button"
              onClick={() => setType(ft.value)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer border ${
                type === ft.value
                  ? "bg-primary/10 text-primary border-primary/30 shadow-sm"
                  : "bg-muted/30 text-muted-foreground border-transparent hover:bg-muted/60 hover:text-foreground"
              }`}
              aria-pressed={type === ft.value}
            >
              {ft.icon}
              {ft.label}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Description */}
      <div>
        <label
          htmlFor="feedback-description"
          className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block"
        >
          Description <span className="text-destructive">*</span>
        </label>
        <textarea
          ref={descRef}
          id="feedback-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, description: true }))}
          placeholder="Tell us what happened or how we can improve."
          disabled={isSubmitting}
          maxLength={MAX_DESCRIPTION}
          rows={4}
          className={`w-full px-3 py-2.5 rounded-lg bg-muted/30 border text-sm text-foreground placeholder:text-muted-foreground/50 resize-none transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 ${
            descriptionError
              ? "border-destructive/50"
              : "border-border"
          }`}
          aria-describedby="desc-error desc-count"
          aria-invalid={!!descriptionError}
        />
        <div className="flex items-center justify-between mt-1">
          {descriptionError ? (
            <span id="desc-error" className="text-[11px] text-destructive">
              {descriptionError}
            </span>
          ) : (
            <span />
          )}
          <span
            id="desc-count"
            className={`text-[11px] tabular-nums ${
              description.length > MAX_DESCRIPTION * 0.9
                ? "text-destructive"
                : "text-muted-foreground/60"
            }`}
          >
            {description.length}/{MAX_DESCRIPTION}
          </span>
        </div>
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="feedback-email"
          className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block"
        >
          Email <span className="text-muted-foreground/50">(optional)</span>
        </label>
        <input
          id="feedback-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
          placeholder="your@email.com"
          disabled={isSubmitting}
          className={`w-full px-3 py-2.5 rounded-lg bg-muted/30 border text-sm text-foreground placeholder:text-muted-foreground/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 ${
            emailError ? "border-destructive/50" : "border-border"
          }`}
          aria-describedby="email-error"
          aria-invalid={!!emailError}
        />
        {emailError && (
          <span id="email-error" className="text-[11px] text-destructive mt-1 block">
            {emailError}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-1">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting || !isValid}
          className="flex items-center gap-2 px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold shadow-sm transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isSubmitting && <Loader2 size={14} className="animate-spin" />}
          {isSubmitting ? "Sending..." : "Send Feedback"}
        </button>
      </div>
    </form>
  );
}
