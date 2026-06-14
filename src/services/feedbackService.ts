import type { FeedbackPayload, HelpfulRatingPayload } from "@/types/feedback";

/**
 * Feedback Service — Abstraction layer for feedback submission.
 *
 * V1: Logs to console. Future: swap to Google Sheets API, Supabase, etc.
 * The UI never knows where feedback is stored.
 */

const SIMULATED_DELAY_MS = 800;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function submitFeedback(payload: FeedbackPayload): Promise<void> {
  await delay(SIMULATED_DELAY_MS);

  // V1: Log to console. Replace this block with an API call for production.
  console.group("📬 AlgoLens Feedback Submitted");
  console.log("Type:", payload.formData.type);
  console.log("Description:", payload.formData.description);
  if (payload.formData.email) {
    console.log("Email:", payload.formData.email);
  }
  console.log("Context:", payload.context);
  console.groupEnd();
}

export async function submitHelpfulRating(
  payload: HelpfulRatingPayload
): Promise<void> {
  await delay(300);

  // V1: Log to console.
  console.log(
    `${payload.helpful ? "👍" : "👎"} Explanation rating:`,
    payload.algorithmName,
    `Step ${payload.currentStep}`,
    `at ${payload.timestamp}`
  );
}
