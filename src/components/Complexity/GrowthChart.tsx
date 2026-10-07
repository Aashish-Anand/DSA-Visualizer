import { useMemo, useState } from "react";
import type { ComplexityExplorerConfig, GrowthDataPoint } from "@/types";

type Growth = NonNullable<ComplexityExplorerConfig["expectedGrowth"]>;
const curves: { id: Growth; label: string; color: string; fn: (n: number) => number }[] = [
  {id:"linear",label:"O(n)",color:"#16a34a",fn:n=>n},
  {id:"logarithmic",label:"O(log n)",color:"#0284c7",fn:n=>Math.log2(Math.max(n, 2))},
  {id:"linearithmic",label:"O(n log n)",color:"#a16207",fn:n=>n*Math.log2(Math.max(n,2))},
  {id:"quadratic",label:"O(n²)",color:"#e11d48",fn:n=>n*n},
  {id:"exponential",label:"φⁿ (Fibonacci recursion)",color:"#9333ea",fn:n=>Math.pow((1+Math.sqrt(5))/2,n)},
];
interface Props { runExperiment: ComplexityExplorerConfig["runExperiment"]; inputSizeRange: ComplexityExplorerConfig["inputSizeRange"]; expectedGrowth?: Growth; operationDefinition?: string; }
export function GrowthChart({ runExperiment, inputSizeRange, expectedGrowth, operationDefinition }: Props) {
  const [data, setData] = useState<GrowthDataPoint[]>([]);
  const [selected, setSelected] = useState<Growth[]>(expectedGrowth ? [expectedGrowth] : []);
  const [hovered, setHovered] = useState<number | null>(null);
  const [error, setError] = useState("");
  const run = () => {
    try {
      const sizes = [...new Set(Array.from({length:12}, (_,i)=>Math.round(inputSizeRange.min+(inputSizeRange.max-inputSizeRange.min)*i/11)))];
      const results = sizes.map(inputSize => ({inputSize, operations: Math.round(Array.from({length:3},()=>runExperiment(inputSize).operations).reduce((a,b)=>a+b,0)/3)}));
      setData(results); setHovered(null); setError("");
    } catch { setError("The experiment could not complete. Try running it again."); }
  };
  const refs = useMemo(() => {
    if (!data.length) return [];
    const anchor = data.find(p => p.operations > 0) ?? data[0];
    return curves.filter(c=>selected.includes(c.id)).map(curve=>({...curve,points:Array.from({length:60},(_,i)=>{const n=inputSizeRange.min+(inputSizeRange.max-inputSizeRange.min)*i/59;return {inputSize:n,operations:curve.fn(n)/curve.fn(anchor.inputSize)*anchor.operations};})}));
  },[data,selected,inputSizeRange]);
  const maxN = inputSizeRange.max;
  const maxOps = Math.max(1, ...data.map(d=>d.operations), ...refs.flatMap(r=>r.points.map(d=>d.operations))) * 1.1;
  const x = (n:number)=>60+n/maxN*560, y=(ops:number)=>240-ops/maxOps*210;
  const path = (points:GrowthDataPoint[])=>points.map((d,i)=>`${i ? "L" : "M"} ${x(d.inputSize)} ${y(d.operations)}`).join(" ");
  const last = data.at(-1), first = data[0];
  return <section className="rounded-xl bg-card/50 border border-border p-4 sm:p-5">
    <div className="flex flex-wrap justify-between items-start gap-3"><div><h3 className="font-semibold">Growth experiment</h3><p className="text-sm text-muted-foreground mt-1">n = {inputSizeRange.min}–{maxN} · Average of 3 runs per size</p></div><div className="flex gap-2">{data.length>0 && <button className="lesson-action" onClick={()=>{setData([]);setHovered(null);}}>Clear</button>}<button onClick={run} className="rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold">Run experiment</button></div></div>
    <p className="text-xs text-muted-foreground mt-3">{operationDefinition ?? "Operations are counted by this algorithm's instrumentation; these are operation counts, not elapsed time or animation frames."}</p>
    {error && <p role="alert" className="text-sm mt-3 text-red-600 dark:text-red-400">{error}</p>}
    {!data.length ? <div className="rounded-lg bg-muted/30 p-8 text-center mt-4"><p className="font-medium">See how input size changes the work</p><p className="text-sm text-muted-foreground mt-2">Run an experiment to plot measured operations.</p></div> : <>
      <svg role="img" aria-label="Measured operations versus input size" viewBox="0 0 660 280" className="w-full mt-4 max-h-80">
        {[0,1,2,3,4].map(i=><g key={i}><line x1={60} x2={620} y1={y(maxOps*i/4)} y2={y(maxOps*i/4)} stroke="var(--border)" strokeDasharray="4 4"/><text x={52} y={y(maxOps*i/4)+4} textAnchor="end" fontSize={11} fill="var(--muted-fg)">{Math.round(maxOps*i/4).toLocaleString()}</text><text x={x(maxN*i/4)} y={260} textAnchor="middle" fontSize={11} fill="var(--muted-fg)">{Math.round(maxN*i/4)}</text></g>)}
        <text x={335} y={278} textAnchor="middle" fontSize={12} fill="var(--muted-fg)">Input size (n)</text><text transform="translate(14,135) rotate(-90)" textAnchor="middle" fontSize={12} fill="var(--muted-fg)">Operations</text>
        {refs.map(r=><path key={r.id} d={path(r.points)} fill="none" stroke={r.color} strokeWidth={2} strokeDasharray="6 4"/>)}
        <path d={path(data)} fill="none" stroke="var(--primary)" strokeWidth={3}/>
        {data.map((d,i)=><circle key={d.inputSize} cx={x(d.inputSize)} cy={y(d.operations)} r={hovered===i ? 6 : 4} fill="var(--primary)" stroke="var(--bg)" strokeWidth={2} tabIndex={0} aria-label={`Input ${d.inputSize}, ${d.operations} operations`} onMouseEnter={()=>setHovered(i)} onMouseLeave={()=>setHovered(null)} onFocus={()=>setHovered(i)} onBlur={()=>setHovered(null)}><title>n={d.inputSize}: {d.operations} operations</title></circle>)}
      </svg>
      <p className="text-sm font-mono min-h-6 text-primary" aria-live="polite">{hovered !== null ? `n = ${data[hovered].inputSize} → ${data[hovered].operations.toLocaleString()} operations` : "Solid purple: measured operation counts"}</p>
      <fieldset className="mt-3"><legend className="text-xs font-semibold mb-2">Compare growth shapes</legend><div className="flex flex-wrap gap-x-4 gap-y-2">{curves.filter(c=>c.id!=="exponential" || inputSizeRange.max<=20).map(c=><label key={c.id} className="flex gap-2 items-center text-xs"><input type="checkbox" checked={selected.includes(c.id)} onChange={()=>setSelected(prev=>prev.includes(c.id)?prev.filter(v=>v!==c.id):[...prev,c.id])} className="accent-primary"/><span style={{color:c.color}}>{c.label}</span></label>)}</div></fieldset>
      {refs.length>0 && <p className="text-xs text-muted-foreground mt-3">Dashed curves are theoretical shapes scaled to match the first positive measured point. They illustrate growth, not exact operation counts. Comparing a much faster-growing shape may compress the measured line.</p>}
      {last && first && <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20"><p className="text-sm leading-6">Increasing n from <strong>{first.inputSize}</strong> to <strong>{last.inputSize}</strong> increased measured work from <strong>{first.operations.toLocaleString()}</strong> to <strong>{last.operations.toLocaleString()}</strong> operations.{expectedGrowth === "linear" ? " The trend is linear: roughly twice the input produces twice the work." : expectedGrowth === "exponential" ? " Repeated recursive calls make work grow much faster than input size." : " Compare the measured trend with the reference shapes."}</p></div>}
      <details className="mt-4"><summary className="text-sm cursor-pointer font-medium">View measured data</summary><table className="w-full text-sm mt-3"><thead><tr className="text-left border-b border-border"><th className="py-2">Input size</th><th>Operations</th></tr></thead><tbody>{data.map(d=><tr key={d.inputSize} className="border-b border-border/50"><td className="py-1 font-mono">{d.inputSize}</td><td className="font-mono">{d.operations.toLocaleString()}</td></tr>)}</tbody></table></details>
    </>}
  </section>;
}
