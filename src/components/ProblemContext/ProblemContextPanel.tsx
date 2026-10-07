import type { AlgorithmVariant, ProblemContext } from "@/types";
import { ArrowRight, Lightbulb } from "lucide-react";
import { InlineText } from "@/components/Lesson/InlineText";

interface Props {
  context: ProblemContext;
  onStartVisualization: () => void;
  onExampleSelect?: (index: number) => void;
  simulation?: React.ReactNode;
  variants?: AlgorithmVariant[];
  onVariantSelect?: (id: string) => void;
}
export function ProblemContextPanel({ context, onStartVisualization, onExampleSelect, simulation, variants, onVariantSelect }: Props) {
  return <article className="max-w-4xl mx-auto px-5 sm:px-8 py-8 space-y-8">
    <section aria-labelledby="problem-statement"><div className="flex flex-wrap items-center justify-between gap-3 mb-4"><h2 id="problem-statement" className="text-xl font-bold">The problem</h2><button onClick={onStartVisualization} className="lesson-action text-primary">Explore the visualization <ArrowRight size={14}/></button></div><p className="text-base leading-7"><InlineText text={context.statement}/></p>{context.referenceImage && <img src={context.referenceImage} alt="Problem illustration" className="max-h-72 mx-auto mt-5"/>}</section>
    <section aria-labelledby="examples-heading"><h2 id="examples-heading" className="text-lg font-bold mb-4">Examples</h2><div className="grid sm:grid-cols-2 gap-4">{context.examples.map((example, index) => {
      const values = example.input.match(/\[([^\]]+)\]/)?.[1].split(',').map(v => v.trim());
      return <div key={index} className="rounded-xl border border-border bg-card/50 p-5 space-y-3"><span className="text-xs font-semibold text-muted-foreground">EXAMPLE {index + 1}</span><p className="text-sm break-words"><strong>Input: </strong><code className="font-mono">{example.input}</code></p>{values && <div className="flex flex-wrap gap-1.5" aria-hidden="true">{values.map((value, i) => <span key={i} className={`w-9 h-9 rounded-md border flex items-center justify-center text-sm font-mono ${context.patterns.includes("Boyer-Moore Voting") && value === example.output ? "border-primary/40 bg-primary/10 text-primary font-bold" : "border-border bg-background"}`}>{value}</span>)}</div>}<p className="text-sm"><strong>Output: </strong><code className="text-primary font-bold">{example.output}</code></p><p className="text-sm text-muted-foreground leading-6"><InlineText text={example.explanation}/></p>{onExampleSelect && <button onClick={() => onExampleSelect(index)} className="lesson-action text-primary">Visualize this example <ArrowRight size={14}/></button>}</div>;
    })}</div></section>
    {simulation && <section aria-label="Explore the problem">{simulation}</section>}
    <section className="rounded-xl bg-amber-500/5 border-l-4 border-amber-500 p-5"><h2 className="text-lg font-bold mb-3 flex items-center gap-2"><Lightbulb size={18} className="text-amber-600 dark:text-amber-400"/>Build the intuition</h2><p className="text-base leading-7"><InlineText text={context.intuitionPrompt}/></p></section>
    <section><h2 className="text-lg font-bold mb-4">Compare approaches</h2><div className="space-y-2">{context.approaches.map((approach, index) => <details key={index} open={approach.isOptimal} className="rounded-lg border border-border bg-card/30 p-4"><summary className="cursor-pointer text-sm font-semibold"><span>{approach.name}</span><span className="inline-flex flex-wrap gap-2 ml-3 text-xs font-mono font-normal"><span className="text-primary">Time {approach.complexity}</span>{approach.spaceComplexity && <span className="text-muted-foreground">Space {approach.spaceComplexity}</span>}</span></summary><p className="text-sm leading-6 text-muted-foreground mt-3"><InlineText text={approach.description}/></p></details>)}</div>{variants && onVariantSelect && <div className="mt-4 flex flex-wrap gap-2">{variants.map(v => <button key={v.id} onClick={() => onVariantSelect(v.id)} className="lesson-action">Explore {v.id === "iterative" ? "tabulation" : v.id === "memoized" ? "memoization" : "recursion"}<ArrowRight size={14}/></button>)}</div>}</section>
    <details className="border-t border-border pt-5"><summary className="cursor-pointer font-semibold text-sm">Where this is useful</summary><ul className="list-disc pl-5 mt-3 space-y-2 text-sm leading-6 text-muted-foreground">{context.realWorldApplications.map(app => <li key={app}>{app}</li>)}</ul></details>
    <div className="flex flex-wrap gap-2">{context.patterns.map(pattern => <span key={pattern} className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">{pattern}</span>)}</div>
    <button onClick={onStartVisualization} className="bg-primary text-primary-foreground rounded-xl px-5 py-3 font-semibold text-sm flex items-center gap-2">Start visualization <ArrowRight size={16}/></button>
  </article>;
}
