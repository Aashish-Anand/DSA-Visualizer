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
  const webhookUrl = import.meta.env.VITE_FEEDBACK_WEBHOOK_URL;

  if (webhookUrl) {
    const formattedData = {
      timestamp: new Date().toISOString(),
      type: payload.formData.type,
      description: payload.formData.description,
      email: payload.formData.email || "N/A",
      algorithm: payload.context.algorithmName || "General",
      pageUrl: payload.context.pageUrl || window.location.href,
      currentStep: payload.context.currentStep ?? "N/A",
      viewport: `${payload.context.screenWidth}x${payload.context.screenHeight}`,
      theme: payload.context.currentTheme,
      userAgent: payload.context.browserUserAgent,
      hp: payload.formData.honeypot || "",
    };

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(formattedData),
    });

    if (!response.ok && response.status !== 0) {
      throw new Error(`Failed to submit feedback: ${response.statusText}`);
    }
    return;
  }

  // Fallback: Console log mode when no webhook is set
  await delay(SIMULATED_DELAY_MS);
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
