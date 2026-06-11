import { useState, useCallback, useRef, useEffect } from "react";
import type {
  VisualizationStep,
  PlaybackSpeed,
  PlaybackState,
  PlaybackControls,
} from "@/types";

const BASE_INTERVAL_MS = 1000;

/**
 * Generic, algorithm-agnostic playback engine.
 * Accepts an array of VisualizationStep<T> and provides
 * play/pause/next/prev/reset controls with variable speed.
 */
export function usePlaybackEngine<T>(
  steps: VisualizationStep<T>[]
): PlaybackState<T> & PlaybackControls {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeedState] = useState<PlaybackSpeed>(1);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stepsRef = useRef(steps);
  const speedRef = useRef(speed);

  // Keep refs in sync
  useEffect(() => {
    stepsRef.current = steps;
  }, [steps]);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  const clearTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
     
  }, []);

  // Reset when steps change (new algorithm input)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentStepIndex(0);
     
    setIsPlaying(false);
    clearTimer();
  }, [steps, clearTimer]);

  const startTimer = useCallback(() => {
    clearTimer();
    const intervalMs = BASE_INTERVAL_MS / speedRef.current;
    intervalRef.current = setInterval(() => {
      setCurrentStepIndex((prev) => {
        const maxIndex = stepsRef.current.length - 1;
        if (prev >= maxIndex) {
          // Auto-pause at last step
          clearTimer();
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, intervalMs);
  }, [clearTimer]);

  const play = useCallback(() => {
    if (steps.length === 0) return;
    // If at the end, restart from beginning
    setCurrentStepIndex((prev) => {
      if (prev >= steps.length - 1) {
        return 0;
      }
      return prev;
    });
    setIsPlaying(true);
    startTimer();
  }, [steps.length, startTimer]);

  const pause = useCallback(() => {
    setIsPlaying(false);
    clearTimer();
  }, [clearTimer]);

  const next = useCallback(() => {
    pause();
    setCurrentStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
  }, [steps.length, pause]);

  const previous = useCallback(() => {
    pause();
    setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
  }, [pause]);

  const reset = useCallback(() => {
    pause();
    setCurrentStepIndex(0);
  }, [pause]);

  const setSpeed = useCallback(
    (newSpeed: PlaybackSpeed) => {
      setSpeedState(newSpeed);
      speedRef.current = newSpeed;
      // If currently playing, restart timer with new speed
      if (isPlaying) {
        startTimer();
      }
    },
    [isPlaying, startTimer]
  );

  const goToStep = useCallback(
    (index: number) => {
      pause();
      setCurrentStepIndex(Math.max(0, Math.min(index, steps.length - 1)));
    },
    [steps.length, pause]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  const totalSteps = steps.length;
  const currentStep = totalSteps > 0 ? steps[currentStepIndex] ?? null : null;
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex >= totalSteps - 1;
  const progress = totalSteps > 1 ? (currentStepIndex / (totalSteps - 1)) * 100 : 0;

  return {
    // State
    currentStepIndex,
    isPlaying,
    speed,
    currentStep,
    totalSteps,
    isFirstStep,
    isLastStep,
    progress,
    // Controls
    play,
    pause,
    next,
    previous,
    reset,
    setSpeed,
    goToStep,
  };
}
