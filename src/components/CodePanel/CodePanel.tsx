import { motion } from "framer-motion";
import type { AlgorithmConfig, PseudocodeLine } from "@/types";
import { useEffect, useRef, useState } from "react";

interface CodePanelProps {
  config: AlgorithmConfig;
  activeLine: number;
}

type Language = "pseudocode" | "python" | "java" | "cpp";

export function CodePanel({ config, activeLine }: CodePanelProps) {
  const activeRef = useRef<HTMLDivElement>(null);
  const [language, setLanguage] = useState<Language>("pseudocode");

  // Fallback to pseudocode if selected language is not available in config
  const lines: PseudocodeLine[] = config[language] || config.pseudocode;

  // Scroll active line into view
  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [activeLine, language]);

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-2.5 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Code
          </span>
        </div>
        
        <select
          className="text-[11px] bg-secondary text-secondary-foreground border border-border rounded px-2 py-1 outline-none focus:ring-1 focus:ring-primary cursor-pointer font-medium"
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
        >
          <option value="pseudocode">Pseudocode</option>
          {config.python && <option value="python">Python</option>}
          {config.java && <option value="java">Java</option>}
          {config.cpp && <option value="cpp">C++</option>}
        </select>
      </div>
      <div className="flex-1 overflow-y-auto py-2">
        {lines.map((line, index) => {
          const isActive = index === activeLine;
          return (
            <div
              key={index}
              ref={isActive ? activeRef : undefined}
              className="relative"
            >
              {/* Active line highlight */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-r-md"
                  style={{
                    backgroundColor: "hsla(262, 83%, 58%, 0.1)",
                    borderLeft: "3px solid var(--color-primary)",
                  }}
                  layoutId="active-pseudocode-line"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              <div
                className={`relative flex items-center gap-3 px-3 py-1.5 transition-colors ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {/* Line number */}
                <span
                  className={`text-[10px] font-mono w-4 text-right tabular-nums shrink-0 ${
                    isActive
                      ? "text-primary font-bold"
                      : "text-muted-foreground/50"
                  }`}
                >
                  {index + 1}
                </span>

                {/* Code */}
                <code
                  className={`text-[13px] font-mono whitespace-pre ${
                    isActive ? "font-semibold" : "font-normal"
                  }`}
                  style={{ paddingLeft: `${line.indent * 20}px` }}
                >
                  {line.code}
                </code>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
