import { useFollowActive } from "@/hooks/useFollowActive";
import type { DP1DState } from "@/types";

export function DP1DVisualizer({ state, kind = "stairs" }: { state: DP1DState; kind?: "stairs" | "frog" }) {
  const { dpArray, inputArray, currentIndex, dependencies, result, phase } = state;
  const i = currentIndex;
  const { viewportRef, activeRef, follow, setFollow } = useFollowActive(i);
  const previous = i !== null && i > 0 ? dpArray[i - 1] : null;
  const earlier = i !== null && i > 1 ? dpArray[i - 2] : null;
  const jump1 = inputArray && i !== null && i > 0 && previous !== null ? previous + Math.abs(inputArray[i] - inputArray[i - 1]) : null;
  const jump2 = inputArray && i !== null && i > 1 && earlier !== null ? earlier + Math.abs(inputArray[i] - inputArray[i - 2]) : null;
  return <div className="p-4 sm:p-6 space-y-5">
    <div className="flex flex-wrap justify-between items-center gap-2"><div><h2 className="font-semibold">{kind === "frog" ? "Minimum energy to each stone" : "Ways to reach each stair"}</h2><p className="text-sm text-muted-foreground mt-1">{kind === "frog" ? "dp[i] is the minimum total energy to reach stone i." : "dp[i] counts every distinct way to reach stair i."}</p></div>{phase === "complete" && result !== null && <span className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 px-4 py-2 text-emerald-700 dark:text-emerald-400 font-bold">{result} {kind === "frog" ? "energy" : "ways"}</span>}</div>
    <div ref={viewportRef} className="overflow-x-auto pb-3" aria-label="Dynamic programming table"><div className="flex gap-2 w-max min-w-full">
      {dpArray.map((value, index) => {
        const active = index === i, used = dependencies.includes(index);
        return <div ref={active ? activeRef : undefined} key={index} className="flex-1 min-w-12 text-center space-y-2">
          <span className="block text-xs text-muted-foreground">{kind === "frog" ? "Stone" : "Stair"} {index}</span>
          {inputArray && <div className="rounded-lg bg-muted/50 border border-border p-2 font-mono text-sm"><span className="block text-[10px] text-muted-foreground">Height</span>{inputArray[index]}</div>}
          <div aria-label={`dp[${index}]: ${value === null ? "not computed" : value}${active ? ", current" : used ? ", dependency" : ""}`} className={`rounded-lg border-2 p-3 font-mono font-semibold ${active ? "border-amber-500 bg-amber-500/10" : used ? "border-blue-500 bg-blue-500/10" : "border-border bg-card"}`}><span className="block text-[10px] font-sans text-muted-foreground mb-1">dp[{index}]</span>{value ?? "—"}</div>
          <span className="block h-4 text-[10px] font-semibold text-muted-foreground">{active ? "Current" : used ? "Uses" : value === null ? "Not computed" : "Computed"}</span>
        </div>;
      })}
    </div></div>
    <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
      <h3 className="text-xs font-bold uppercase tracking-wide text-primary mb-2">Current calculation</h3>
      {i === null ? <p className="text-sm text-muted-foreground">{phase === "complete" ? "All states are computed. The final table entry is the answer." : "Start playback or step forward to initialize the base cases."}</p> : i === 0 ? <p className="font-mono text-sm">dp[0] = {kind === "frog" ? "0 (no jump needed)" : "1 (one empty route)"}</p> : kind === "stairs" ? <p className="font-mono text-sm break-words">{i === 1 ? "dp[1] = 1 (one single step)" : `dp[${i}] = dp[${i - 1}] + dp[${i - 2}] = ${previous ?? "?"} + ${earlier ?? "?"}${previous !== null && earlier !== null ? ` = ${previous + earlier}` : ""}`}</p> : <div className="space-y-2 text-sm font-mono break-words"><p>From stone {i - 1}: {previous ?? "?"} + |{inputArray?.[i]} − {inputArray?.[i - 1]}| = {jump1 ?? "?"}</p>{i > 1 && <p>From stone {i - 2}: {earlier ?? "?"} + |{inputArray?.[i]} − {inputArray?.[i - 2]}| = {jump2 ?? "?"}</p>}<p className="font-semibold text-primary">dp[{i}] = {i === 1 ? jump1 : `min(${jump1 ?? "?"}, ${jump2 ?? "?"})${jump1 !== null && jump2 !== null ? ` = ${Math.min(jump1, jump2)}` : ""}`}</p></div>}
    </div>
    <label className="flex items-center gap-2 text-xs text-muted-foreground"><input type="checkbox" checked={follow} onChange={e => setFollow(e.target.checked)} className="accent-primary"/>Follow active state</label>
    <p className="text-xs text-muted-foreground">Amber: current state · Blue: dependencies · —: not computed</p>
  </div>;
}
