import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
  className?: string;
}

export function ThemeToggle({ isDark, onToggle, className = "" }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted/50 transition-colors ${className}`}
      aria-label="Toggle theme"
    >
      <Sun 
        className={`w-5 h-5 transition-all duration-300 absolute ${isDark ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"}`} 
      />
      <Moon 
        className={`w-5 h-5 transition-all duration-300 absolute ${isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"}`} 
      />
    </button>
  );
}
