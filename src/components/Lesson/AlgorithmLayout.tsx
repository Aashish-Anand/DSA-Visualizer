import { useEffect, useMemo, useRef, useState } from "react";
import { BookOpen, Play, BarChart2, Share2, MessageSquareText } from "lucide-react";
import type { AlgorithmConfig, PlaybackState, PlaybackControls as EngineControls } from "@/types";
import { PlaybackControls } from "@/components/Controls/PlaybackControls";
import { CodePanel } from "@/components/CodePanel/CodePanel";
import { ExplanationPanel } from "@/components/ExplanationPanel/ExplanationPanel";
import { ProblemContextPanel } from "@/components/ProblemContext/ProblemContextPanel";
import { ComplexityExplorer } from "@/components/Complexity/ComplexityExplorer";
import { useFeedbackContext } from "@/hooks/useFeedbackContext";
import { resolveAlgorithmConfig } from "./resolveAlgorithmConfig";

type View = "understand" | "visualize" | "complexity";
interface Props<T> {
  config: AlgorithmConfig;
  engine: PlaybackState<T> & EngineControls;
  inputControls: React.ReactNode;
  visualizer: React.ReactNode;
  activeVariantId?: string;
  onVariantChange?: (id: string) => void;
  onExampleSelect?: (index: number) => void;
  simulation?: React.ReactNode;
  currentArray?: number[];
  currentTarget?: number;
  hasDryRunPrompts?: boolean;
}

export function AlgorithmLayout<T>({ config, engine, inputControls, visualizer, activeVariantId, onVariantChange, onExampleSelect, simulation, currentArray, currentTarget, hasDryRunPrompts = false }: Props<T>) {
  const [view, setView] = useState<View>(config.problemContext ? "understand" : "visualize");
  const [copied, setCopied] = useState(false);
  const [shareError, setShareError] = useState("");
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const articleRef = useRef<HTMLDivElement>(null);
  const articlePosition = useRef({ inner: 0, page: 0 });
  const { setAlgorithmInfo, openModal } = useFeedbackContext();
  const displayConfig = useMemo(() => resolveAlgorithmConfig(config, activeVariantId), [config, activeVariantId]);
  const activeVariant = config.variants?.find(v => v.id === activeVariantId);
  const complexityViews = useMemo(() => config.variants?.length ? config.variants.map(variant => ({ id: variant.id, config: resolveAlgorithmConfig(config, variant.id).complexityExplorer })) : [{ id: config.id, config: config.complexityExplorer }], [config]);
  useEffect(() => {
    setAlgorithmInfo(config.title, engine.currentStepIndex, engine.speed);
  }, [config.title, engine.currentStepIndex, engine.speed, setAlgorithmInfo]);
  useEffect(() => () => { if (copyTimer.current) clearTimeout(copyTimer.current); }, []);
  const changeView = (next: View) => {
    engine.pause();
    if (view === "understand" && articleRef.current) articlePosition.current = { inner: articleRef.current.scrollTop, page: window.scrollY };
    setView(next);
  };
  useEffect(() => {
    if (view === "understand" && articleRef.current) articleRef.current.scrollTop = articlePosition.current.inner;
    if (window.innerWidth < 1024) window.scrollTo({ top: view === "understand" ? articlePosition.current.page : 0, behavior: "instant" });
  }, [view]);
  const share = async () => {
    try {
      await navigator.clipboard.writeText(`${location.origin}${location.pathname}#/app/${config.id}`);
      setCopied(true); setShareError("");
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch { setShareError("Could not copy the link. You can copy it from your address bar."); }
  };
  return (
    <div className="lesson-shell flex flex-col min-h-[100dvh] pb-28 lg:pb-0 lg:h-full lg:min-h-0">
      <header className="sticky top-0 z-20 lg:static shrink-0 border-b border-border bg-background px-4 pl-14 lg:pl-6 py-4">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-lg sm:text-xl font-bold mr-1">{config.title}</h1>
          <span className="rounded-full bg-primary/10 text-primary px-2 py-1 text-xs font-medium">{config.difficulty}</span>
          <span className="hidden sm:inline text-xs text-muted-foreground">{config.category}</span>
          <div className="ml-auto flex gap-2">
            <button onClick={share} className="lesson-action" aria-label="Copy shareable link"><Share2 size={14}/><span>{copied ? "Copied" : "Share"}</span></button>
            <button onClick={openModal} className="lesson-action" aria-label="Send feedback"><MessageSquareText size={14}/><span className="hidden sm:inline">Feedback</span></button>
          </div>
        </div>
        {shareError && <p role="status" className="text-xs text-muted-foreground mt-2">{shareError}</p>}
        <nav aria-label="Lesson sections" className="flex gap-1 mt-3 -ml-10 lg:ml-0">
          {([{ id: "understand", label: "Understand", icon: BookOpen, available: !!config.problemContext }, { id: "visualize", label: "Visualize", icon: Play, available: true }, { id: "complexity", label: "Complexity", icon: BarChart2, available: !!displayConfig.complexityExplorer }] as const).filter(tab => tab.available).map(tab => (
            <button key={tab.id} onClick={() => changeView(tab.id)} aria-current={view === tab.id ? "page" : undefined} className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold ${view === tab.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}><tab.icon size={15} className="hidden sm:block"/>{tab.label}</button>
          ))}
        </nav>
      </header>
      {view !== "understand" && config.variants && onVariantChange && (
        <div className="shrink-0 px-4 lg:px-6 py-3 border-b border-border bg-card/40">
          <div className="flex flex-wrap items-center gap-2"><span className="text-xs font-semibold text-muted-foreground mr-2">Approach</span>{config.variants.map(v => <button key={v.id} aria-pressed={activeVariantId === v.id} onClick={() => { engine.pause(); onVariantChange(v.id); }} className={`px-3 py-2 rounded-lg text-sm capitalize border ${v.id === activeVariantId ? "border-primary bg-primary/10 text-primary font-semibold" : "border-border hover:bg-muted"}`}>{v.id === "iterative" ? "Tabulation" : v.id === "memoized" ? "Memoization" : "Recursion"}</button>)}</div>
          {view === "complexity" && <p className="text-sm text-muted-foreground mt-2">{activeVariant?.description}</p>}
        </div>
      )}
      {view === "understand" && config.problemContext && <div ref={articleRef} className="flex-1 min-h-0 lg:overflow-y-auto"><ProblemContextPanel context={config.problemContext} simulation={simulation} onStartVisualization={() => changeView("visualize")} onExampleSelect={onExampleSelect ? index => { onExampleSelect(index); changeView("visualize"); } : undefined} variants={config.variants} onVariantSelect={onVariantChange ? id => { onVariantChange(id); changeView("visualize"); } : undefined}/></div>}
      {/* Keep experiments mounted while changing lesson sections to preserve results. */}
      {complexityViews.map(panel => panel.config && <div key={panel.id} className={view === "complexity" && panel.id === (activeVariantId ?? config.id) ? "flex-1 min-h-0 lg:overflow-y-auto" : "hidden"}><ComplexityExplorer config={panel.config} algorithmName={config.title} approachName={config.variants ? panel.id : undefined} currentMetrics={engine.currentStep?.complexityMetrics} currentStep={engine.currentStepIndex + 1} totalSteps={engine.totalSteps} onReturnToVisualization={() => changeView("visualize")} currentArray={currentArray} currentTarget={currentTarget}/></div>)}
      {/* Preserve code language and simple-explanation preferences between sections. */}
      <div className={view === "visualize" ? "flex-1 min-h-0 flex flex-col" : "hidden"}>
        <div className="shrink-0 px-4 lg:px-6 py-3 border-b border-border flex flex-wrap items-center gap-3 bg-card/30">{inputControls}<span role="status" className="ml-auto text-xs font-medium text-muted-foreground">{engine.isLastStep ? "Complete" : engine.isPlaying ? "Playing" : engine.isFirstStep ? "Ready" : "Paused"}</span></div>
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row">
          <div className="flex-1 min-w-0 min-h-0 flex flex-col">
            <div className="min-h-[260px] lg:min-h-0 lg:flex-1 lg:overflow-auto relative">{visualizer}</div>
            <div className="shrink-0 max-h-64 overflow-y-auto border-t border-border bg-card/40">{engine.currentStep && <ExplanationPanel explanation={engine.currentStep.explanation} beginnerExplanation={engine.currentStep.beginnerExplanation} currentStep={engine.currentStepIndex} totalSteps={engine.totalSteps} algorithmName={config.title} isDryRunMode={engine.isDryRunMode} dryRunPrompt={engine.currentStep.dryRunPrompt}/>}</div>
          </div>
          <aside aria-label="Algorithm code" className="lesson-code border-t lg:border-t-0 lg:border-l border-border min-w-0 lg:overflow-hidden bg-card/20">{engine.currentStep && <CodePanel config={displayConfig} activeLine={engine.currentStep.activeLine}/>}</aside>
        </div>
        <div className="fixed bottom-0 left-0 right-0 z-30 lg:static shrink-0 border-t border-border px-4 lg:px-6 py-3 bg-background"><PlaybackControls isPlaying={engine.isPlaying} speed={engine.speed} currentStep={engine.currentStepIndex} totalSteps={engine.totalSteps} isFirstStep={engine.isFirstStep} isLastStep={engine.isLastStep} progress={engine.progress} onPlay={engine.play} onPause={engine.pause} onNext={engine.next} onPrevious={engine.previous} onReset={engine.reset} onSpeedChange={engine.setSpeed} isDryRunMode={engine.isDryRunMode} onToggleDryRunMode={hasDryRunPrompts ? engine.toggleDryRunMode : undefined} onGoToStep={engine.goToStep} shortcutsEnabled={view === "visualize"}/></div>
      </div>
    </div>
  );
}
