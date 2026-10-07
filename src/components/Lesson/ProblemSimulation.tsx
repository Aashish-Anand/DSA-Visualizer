import { useState } from "react";

/** Small deterministic examples that connect the problem to its recurrence. */
export function ProblemSimulation({ kind }: { kind: "stairs" | "frog" | "majority" }) {
  const [path, setPath] = useState(0);
  if (kind === "majority") return <div className="rounded-xl border border-primary/20 bg-primary/5 p-5"><h3 className="font-semibold">Different values cancel each other</h3><p className="text-sm text-muted-foreground mt-2">In [2, 2, 1, 1, 1, 2, 2], pair each 1 with a 2. Three pairs cancel, leaving a 2.</p><div className="flex flex-wrap gap-3 mt-4">{[0, 1, 2].map(i => <span key={i} className="rounded-lg border border-border bg-background px-3 py-2 font-mono text-muted-foreground line-through">2 ↔ 1</span>)}<span className="rounded-lg border border-primary bg-primary/10 px-3 py-2 font-mono font-bold text-primary">2 survives</span></div><p className="text-sm mt-4"><strong>Assumption:</strong> a majority exists. The vote balance counts uncancelled votes, not total occurrences.</p></div>;
  const stairsPaths = [[1, 1, 1], [1, 2], [2, 1]];
  return <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 sm:p-6">
    <h3 className="font-semibold mb-2">{kind === "stairs" ? "Three paths to stair 3" : "Why the cheapest next jump can fail"}</h3>
    {kind === "stairs" ? <>
      <p className="text-sm text-muted-foreground mb-4">One animation represents one route. The problem asks us to count every distinct route.</p>
      <div className="flex flex-wrap gap-2 mb-4">{stairsPaths.map((steps, i) => <button key={i} aria-pressed={path === i} onClick={() => setPath(i)} className={`rounded-lg px-3 py-2 border text-sm font-mono ${path === i ? "border-primary text-primary bg-primary/10" : "border-border bg-background"}`}>{steps.join(" + ")}</button>)}</div>
      <div className="flex items-end gap-2 h-28" aria-label={`Path ${stairsPaths[path].join(' plus ')} to stair 3`}>{[0, 1, 2, 3].map(i => { const visited = [0, ...stairsPaths[path].map((_, j) => stairsPaths[path].slice(0, j + 1).reduce((a, b) => a + b, 0))].includes(i); return <div key={i} style={{height: `${32 + i * 22}px`}} className={`flex-1 rounded-t-lg flex items-center justify-center font-mono border ${visited ? "bg-primary/15 border-primary text-primary" : "bg-background border-border"}`}>{i}</div>; })}</div>
      <p className="text-sm mt-4">Reach stair 3 from stair 2 or stair 1: <strong>2 + 1 = 3 ways.</strong></p>
    </> : <>
      <p className="text-sm text-muted-foreground mb-4">Stone heights: [10, 15, 0, 0]. A cheaper first jump can make the entire route more expensive.</p>
      <div className="grid sm:grid-cols-2 gap-3">{[{name:"Greedy route",route:"0 → 1 → 3",cost:"5 + 15 = 20"},{name:"Optimal route",route:"0 → 2 → 3",cost:"10 + 0 = 10"}].map(item => <div key={item.name} className="rounded-lg bg-background border border-border p-4"><p className="text-sm font-semibold">{item.name}</p><p className="font-mono text-sm mt-2">{item.route}</p><p className="text-sm mt-2">Energy: <strong>{item.cost}</strong></p></div>)}</div>
      <p className="text-sm mt-4">The first one-step jump costs only 5, but its route costs 20. DP compares the full cost of reaching each stone.</p>
    </>}
  </div>;
}
