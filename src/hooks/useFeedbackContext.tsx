/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useCallback, useMemo } from "react";
import type { FeedbackContext as FeedbackContextData } from "@/types/feedback";
import type { PlaybackSpeed } from "@/types";

// ================================
// Context Shape
// ================================

export interface FeedbackContextValue {
  // Algorithm info (set by AlgorithmLayout)
  algorithmName: string | null;
  currentStepIndex: number | null;
  playbackSpeed: PlaybackSpeed | null;

  // Theme (set by App.tsx)
  currentTheme: "light" | "dark";

  // Modal state
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;

  // Setters
  setAlgorithmInfo: (name: string, step: number, speed: PlaybackSpeed) => void;
  clearAlgorithmInfo: () => void;
  setTheme: (theme: "light" | "dark") => void;

  // Build the full auto-collected context
  buildContext: () => FeedbackContextData;
}

export const FeedbackCtx = createContext<FeedbackContextValue | null>(null);

// ================================
// Provider (only component export in this file)
// ================================

export function FeedbackProvider({ children }: { children: React.ReactNode }) {
  const [algorithmName, setAlgorithmName] = useState<string | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState<number | null>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState<PlaybackSpeed | null>(null);
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const setAlgorithmInfo = useCallback(
    (name: string, step: number, speed: PlaybackSpeed) => {
      setAlgorithmName(name);
      setCurrentStepIndex(step);
      setPlaybackSpeed(speed);
    },
    []
  );

  const clearAlgorithmInfo = useCallback(() => {
    setAlgorithmName(null);
    setCurrentStepIndex(null);
    setPlaybackSpeed(null);
  }, []);

  const setTheme = useCallback((theme: "light" | "dark") => {
    setCurrentTheme(theme);
  }, []);

  const buildContext = useCallback((): FeedbackContextData => {
    return {
      pageUrl: window.location.href,
      algorithmName,
      currentStep: currentStepIndex,
      playbackSpeed: playbackSpeed ? `${playbackSpeed}x` : null,
      timestamp: new Date().toISOString(),
      browserUserAgent: navigator.userAgent,
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      currentTheme,
    };
  }, [algorithmName, currentStepIndex, playbackSpeed, currentTheme]);

  const value = useMemo<FeedbackContextValue>(
    () => ({
      algorithmName,
      currentStepIndex,
      playbackSpeed,
      currentTheme,
      isModalOpen,
      openModal,
      closeModal,
      setAlgorithmInfo,
      clearAlgorithmInfo,
      setTheme,
      buildContext,
    }),
    [
      algorithmName,
      currentStepIndex,
      playbackSpeed,
      currentTheme,
      isModalOpen,
      openModal,
      closeModal,
      setAlgorithmInfo,
      clearAlgorithmInfo,
      setTheme,
      buildContext,
    ]
  );

  return <FeedbackCtx.Provider value={value}>{children}</FeedbackCtx.Provider>;
}
