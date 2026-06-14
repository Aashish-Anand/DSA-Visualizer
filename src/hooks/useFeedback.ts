import { useContext } from "react";
import { FeedbackCtx } from "./useFeedbackContext";
import type { FeedbackContextValue } from "./useFeedbackContext";

export function useFeedbackContext(): FeedbackContextValue {
  const ctx = useContext(FeedbackCtx);
  if (!ctx) {
    throw new Error(
      "useFeedbackContext must be used within a <FeedbackProvider>"
    );
  }
  return ctx;
}
