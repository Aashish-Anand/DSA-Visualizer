import { useFollowActive } from "@/hooks/useFollowActive";
import type { HistogramState, HistogramRectangle } from "@/algorithms/largestRectangleHistogram/generator";

export function HistogramVisualizer({ state }: { state: HistogramState }) {
  const { heights, currentIndex, stack, candidate, best, complete } = state;
  const activeIndex = complete ? (best?.left ?? 0) : currentIndex;
  const { viewportRef, activeRef, follow, setFollow } = useFollowActive<SVGGElement>(activeIndex);
  const slot = 48;
  const width = Math.max(280, (heights.length + 1) * slot + 32);
  const baseline = 220;
  const scale = 170 / Math.max(1, ...heights);
  const shown = candidate ?? best;
  const rectangle = (r: HistogramRectangle) => ({ x: 24 + r.left * slot, y: baseline - r.height * scale, width: r.width * slot, height: r.height * scale });
  return <div className="w-full max-w-4xl mx-auto p-4 sm:p-5 space-y-3">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div><h2 className="font-semibold">{complete ? "Largest rectangle found" : "Find each bar’s widest rectangle"}</h2><p className="text-xs text-muted-foreground mt-1">Every bar has width 1 · indices start at 0</p></div>
      <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2"><span className="text-xs text-muted-foreground">Best area</span><div className="text-2xl font-bold tabular-nums">{state.bestArea}</div></div>
    </div>
    <label className="flex items-center gap-2 text-xs text-muted-foreground"><input type="checkbox" checked={follow} onChange={e => setFollow(e.target.checked)}/>Follow active bar</label>
    <div ref={viewportRef} className="overflow-x-auto rounded-xl border border-border bg-card p-2" tabIndex={0} aria-label="Scrollable histogram">
      <svg viewBox={`0 0 ${width} 275`} width={width} height={200} className="max-w-none" style={{ width: "100%", minWidth: width }} role="img" aria-label={`Histogram heights ${heights.join(", ")}. ${shown ? `Highlighted rectangle: bars ${shown.left} through ${shown.right}, height ${shown.height}, area ${shown.area}.` : "No rectangle measured yet."}`}>
        <line x1={24} y1={baseline} x2={width - 12} y2={baseline} stroke="currentColor" opacity={0.25}/>
        {heights.map((height, i) => <g key={i} ref={i === activeIndex ? activeRef : undefined}>
          <rect x={24 + i * slot + 3} y={baseline - height * scale} width={slot - 6} height={height * scale} rx={3} fill={i === currentIndex ? "#f59e0b" : i === state.poppedIndex ? "#a78bfa" : "#38bdf8"} opacity={0.5}/>
          <text x={24 + i * slot + slot / 2} y={Math.max(28, baseline - height * scale - 9)} textAnchor="middle" fill="currentColor" fontSize={13} fontWeight={600}>{height}</text>
          <text x={24 + i * slot + slot / 2} y={baseline + 22} textAnchor="middle" fill="currentColor" opacity={0.7} fontSize={12}>{i}</text>
          {stack.includes(i) && <circle cx={24 + i * slot + slot / 2} cy={baseline + 34} r={3} fill="#38bdf8"/>}
          {i === currentIndex && <text x={24 + i * slot + slot / 2} y={baseline + 49} textAnchor="middle" fill="currentColor" fontSize={11}>scan</text>}
        </g>)}
        {shown && <rect {...rectangle(shown)} fill={candidate ? "#f59e0b" : "#10b981"} fillOpacity={0.18} stroke={candidate ? "#f59e0b" : "#10b981"} strokeWidth={3}/>}
        <g ref={activeIndex === heights.length ? activeRef : undefined} opacity={currentIndex === heights.length ? 1 : 0.4}><text x={24 + heights.length * slot + 22} y={baseline - 10} textAnchor="middle" fill="currentColor" fontSize={13}>0</text><text x={24 + heights.length * slot + 22} y={baseline + 22} textAnchor="middle" fill="currentColor" fontSize={11}>virtual</text><text x={24 + heights.length * slot + 22} y={baseline + 38} textAnchor="middle" fill="currentColor" fontSize={11}>flush</text></g>
      </svg>
    </div>
    <p className="text-xs text-muted-foreground">Amber bar: scanning · Purple bar: popped · Blue dot: on stack · {candidate ? "Amber outline: current candidate" : "Green outline: best rectangle"}</p>
    <div className="grid sm:grid-cols-2 gap-3">
      <div className="rounded-xl border border-border p-4"><h3 className="text-sm font-semibold mb-2">Stack <span className="text-xs font-normal text-muted-foreground">bottom → top · index : height</span></h3><div className="flex flex-wrap gap-2 min-h-8">{stack.length ? stack.map(i => <span key={i} className="rounded-md bg-sky-500/10 border border-sky-500/30 px-2 py-1 text-sm font-mono">{i} : {heights[i]}</span>) : <span className="text-sm text-muted-foreground">Empty</span>}</div></div>
      <div className="rounded-xl border border-border p-4"><h3 className="text-sm font-semibold mb-2">{candidate ? "Current candidate" : "Best rectangle"}</h3>{shown ? <><p className="font-mono text-lg">{shown.height} × {shown.width} = {shown.area}</p><p className="text-xs text-muted-foreground mt-1">Bars {shown.left}–{shown.right} (inclusive){candidate ? ` · width = ${currentIndex} − (${shown.left - 1}) − 1` : ""}</p></> : <p className="text-sm text-muted-foreground">No positive rectangle measured yet.</p>}</div>
    </div>
    {best && candidate && <p className="text-sm text-emerald-600 dark:text-emerald-400">Best so far: height {best.height} × width {best.width} = {best.area}, spanning bars {best.left}–{best.right}.</p>}
  </div>;
}
