import type { ComplexityCaseSummary } from "@/types";
import { motion } from "framer-motion";
import { Clock, HardDrive } from "lucide-react";

interface ComplexityComparisonCardProps {
  timeCases: ComplexityCaseSummary;
  spaceCases: ComplexityCaseSummary;
}

const CASE_STYLES = {
  best: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  average: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  worst: "bg-rose-500/10 text-rose-500 border-rose-500/20",
};

function CaseRow({
  label,
  icon,
  cases,
  delay,
}: {
  label: string;
  icon: React.ReactNode;
  cases: ComplexityCaseSummary;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="space-y-2"
    >
      <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {(["best", "average", "worst"] as const).map((caseKey) => (
          <div
            key={caseKey}
            className={`flex flex-col items-center p-2.5 rounded-lg border ${CASE_STYLES[caseKey]}`}
          >
            <span className="text-[10px] font-semibold uppercase tracking-wider opacity-70 mb-1">
              {caseKey}
            </span>
            <span className="text-sm font-mono font-bold">{cases[caseKey]}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function ComplexityComparisonCard({
  timeCases,
  spaceCases,
}: ComplexityComparisonCardProps) {
  return (
    <div className="p-4 rounded-xl bg-card border border-border/50 space-y-4">
      <CaseRow
        label="Time Complexity"
        icon={<Clock size={12} />}
        cases={timeCases}
        delay={0.1}
      />
      <div className="h-px bg-border/50" />
      <CaseRow
        label="Space Complexity"
        icon={<HardDrive size={12} />}
        cases={spaceCases}
        delay={0.2}
      />
    </div>
  );
}
