// ================================
// Feedback System Types
// ================================

export type FeedbackType = "bug" | "content-issue" | "feature-request";

export interface FeedbackFormData {
  type: FeedbackType;
  description: string;
  email: string; // empty string if not provided
}

export interface FeedbackContext {
  pageUrl: string;
  algorithmName: string | null;
  currentStep: number | null;
  playbackSpeed: string | null;
  timestamp: string;
  browserUserAgent: string;
  screenWidth: number;
  screenHeight: number;
  currentTheme: "light" | "dark";
}

export interface FeedbackPayload {
  formData: FeedbackFormData;
  context: FeedbackContext;
}

export interface HelpfulRatingPayload {
  algorithmName: string;
  currentStep: number;
  helpful: boolean;
  timestamp: string;
}
