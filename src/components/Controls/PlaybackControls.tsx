import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
} from "lucide-react";
import type { PlaybackSpeed } from "@/types";
import { useEffect } from "react";

interface PlaybackControlsProps {
  isPlaying: boolean;
  speed: PlaybackSpeed;
  currentStep: number;
  totalSteps: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  progress: number;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onReset: () => void;
  onSpeedChange: (speed: PlaybackSpeed) => void;
  isDryRunMode?: boolean;
  onToggleDryRunMode?: () => void;
}

const SPEEDS: PlaybackSpeed[] = [0.5, 1, 2, 4];

export function PlaybackControls({
  isPlaying,
  speed,
  currentStep,
  totalSteps,
  isFirstStep,
  isLastStep,
  progress,
  onPlay,
  onPause,
  onNext,
  onPrevious,
  onReset,
  onSpeedChange,
  isDryRunMode = false,
  onToggleDryRunMode,
}: PlaybackControlsProps) {
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (e.key) {
        case " ":
          e.preventDefault();
          if (isPlaying) {
            onPause();
          } else {
            onPlay();
          }
          break;
        case "ArrowRight":
          e.preventDefault();
          onNext();
          break;
        case "ArrowLeft":
          e.preventDefault();
          onPrevious();
          break;
        case "r":
        case "R":
          e.preventDefault();
          onReset();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, onPlay, onPause, onNext, onPrevious, onReset]);

  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex items-center gap-3 flex-wrap">
        {/* Playback buttons */}
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onReset}
                disabled={isFirstStep && !isPlaying}
                className="h-8 w-8"
              >
                <RotateCcw size={15} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Reset (R)</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onPrevious}
                disabled={isFirstStep}
                className="h-8 w-8"
              >
                <SkipBack size={15} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Previous (←)</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="default"
                size="icon"
                onClick={isPlaying ? onPause : onPlay}
                className="h-9 w-9 rounded-full"
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>{isPlaying ? "Pause" : "Play"} (Space)</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onNext}
                disabled={isLastStep}
                className="h-8 w-8"
              >
                <SkipForward size={15} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Next (→)</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Separator */}
        <div className="w-px h-6 bg-border" />

        {/* Speed controls */}
        <div className="flex items-center gap-1">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mr-1">
            Speed
          </span>
          {SPEEDS.map((s) => (
            <button
              key={s}
              onClick={() => onSpeedChange(s)}
              className={`px-2 py-1 rounded-md text-xs font-semibold transition-all ${
                speed === s
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {s}x
            </button>
          ))}
        </div>

        {/* Separator */}
        <div className="w-px h-6 bg-border" />

        {/* Dry Run Toggle */}
        {onToggleDryRunMode && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
              Dry Run
            </span>
            <button
              onClick={onToggleDryRunMode}
              className={`relative inline-flex h-4 w-7 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                isDryRunMode ? "bg-primary" : "bg-input"
              }`}
            >
              <span
                className={`inline-block h-3 w-3 transform rounded-full bg-background transition-transform ${
                  isDryRunMode ? "translate-x-3.5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
        )}

        {/* Separator */}
        <div className="w-px h-6 bg-border" />

        {/* Progress */}
        <div className="flex items-center gap-2 ml-auto">
          <Badge
            variant="outline"
            className="text-[10px] px-2 py-0 h-5 tabular-nums font-semibold"
          >
            {currentStep + 1} / {totalSteps}
          </Badge>
          <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
