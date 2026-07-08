import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { GrowthDataPoint, ComplexityMetrics } from "@/types";

interface GrowthChartProps {
  runExperiment: (inputSize: number) => ComplexityMetrics;
  inputSizeRange: { min: number; max: number; default: number };
}

// Chart dimensions
const W = 480;
const H = 240;
const PAD = { top: 20, right: 20, bottom: 35, left: 50 };
const chartW = W - PAD.left - PAD.right;
const chartH = H - PAD.top - PAD.bottom;

// Reference curves for comparison
function getReferenceCurves(maxN: number, maxOps: number) {
  const points = 50;
  const step = maxN / points;

  const logn: { x: number; y: number }[] = [];
  const linear: { x: number; y: number }[] = [];
  const quadratic: { x: number; y: number }[] = [];
  const nlogn: { x: number; y: number }[] = [];

  // Scale factor: make reference curves relative to actual data
  const scaleFactor = maxOps / (maxN * maxN || 1);
  const maxLog = Math.max(Math.log2(Math.max(maxN, 2)), 0.1);

  for (let i = 1; i <= points; i++) {
    const n = step * i;
    const safeLog = Math.max(Math.log2(Math.max(n, 1)), 0.1);
    
    logn.push({ x: n, y: safeLog * scaleFactor * (maxN * maxN / maxLog) });
    linear.push({ x: n, y: n * scaleFactor * maxN });
    quadratic.push({ x: n, y: n * n * scaleFactor });
    nlogn.push({ x: n, y: n * safeLog * scaleFactor * (maxN / maxLog) });
  }

  return { logn, linear, quadratic, nlogn };
}

export function GrowthChart({ runExperiment, inputSizeRange }: GrowthChartProps) {
  const [dataPoints, setDataPoints] = useState<GrowthDataPoint[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const handleRunExperiment = useCallback(() => {
    setIsRunning(true);
    setDataPoints([]);

    // Run experiments at logarithmically spaced sizes
    const sizes: number[] = [];
    const { min, max } = inputSizeRange;
    const numPoints = 12;
    for (let i = 0; i < numPoints; i++) {
      const size = Math.round(min + (max - min) * (i / (numPoints - 1)));
      if (!sizes.includes(size)) sizes.push(size);
    }

    // Simulate progressive build-up
    const results: GrowthDataPoint[] = [];
    let idx = 0;

    const addNext = () => {
      if (idx >= sizes.length) {
        setIsRunning(false);
        return;
      }

      // Average 3 runs for stability
      let totalOps = 0;
      const runs = 3;
      for (let r = 0; r < runs; r++) {
        const metrics = runExperiment(sizes[idx]);
        totalOps += metrics.operations;
      }

      results.push({
        inputSize: sizes[idx],
        operations: Math.round(totalOps / runs),
      });

      setDataPoints([...results]);
      idx++;
      requestAnimationFrame(() => setTimeout(addNext, 80));
    };

    requestAnimationFrame(() => addNext());
  }, [runExperiment, inputSizeRange]);

  const handleClear = useCallback(() => {
    setDataPoints([]);
  }, []);


  const { maxN, maxOps, xScale, yScale } = useMemo(() => {
    if (dataPoints.length === 0)
      return {
        maxN: inputSizeRange.max,
        maxOps: 100,
        xScale: (n: number) => PAD.left + (n / inputSizeRange.max) * chartW,
        yScale: (ops: number) => PAD.top + chartH - (ops / 100) * chartH,
      };

    const maxN = Math.max(...dataPoints.map((d) => d.inputSize));
    const maxOps = Math.max(...dataPoints.map((d) => d.operations)) * 1.1;

    return {
      maxN,
      maxOps,
      xScale: (n: number) => PAD.left + (n / maxN) * chartW,
      yScale: (ops: number) =>
        PAD.top + chartH - (ops / maxOps) * chartH,
    };
  }, [dataPoints, inputSizeRange.max]);

  // Reference curves
  const refCurves = useMemo(() => {
    if (dataPoints.length < 2) return null;
    return getReferenceCurves(maxN, maxOps);
  }, [dataPoints.length, maxN, maxOps]);

  const pathFromPoints = (pts: { x: number; y: number }[]) => {
    return pts
      .map((p, i) => {
        const sx = xScale(p.x);
        const sy = yScale(p.y);
        return `${i === 0 ? "M" : "L"} ${sx} ${sy}`;
      })
      .join(" ");
  };

  const dataPath = useMemo(() => {
    if (dataPoints.length < 2) return "";
    return pathFromPoints(
      dataPoints.map((d) => ({ x: d.inputSize, y: d.operations }))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataPoints, xScale, yScale]);

  // Y-axis ticks
  const yTicks = useMemo(() => {
    const ticks: number[] = [];
    const count = 4;
    for (let i = 0; i <= count; i++) {
      ticks.push(Math.round((maxOps / count) * i));
    }
    return ticks;
  }, [maxOps]);

  // X-axis ticks
  const xTicks = useMemo(() => {
    const ticks: number[] = [];
    const count = 4;
    for (let i = 0; i <= count; i++) {
      ticks.push(Math.round((maxN / count) * i));
    }
    return ticks;
  }, [maxN]);

  return (
    <div className="rounded-xl bg-card border border-border/50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-border/50">
        <div>
          <h4 className="text-sm font-semibold">Growth Analysis</h4>
          <p className="text-[10px] text-muted-foreground">
            See how work scales with input size
          </p>
        </div>
        <div className="flex gap-2">
          {dataPoints.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs gap-1"
              onClick={handleClear}
            >
              <Trash2 size={12} />
              Clear
            </Button>
          )}
          <Button
            variant="default"
            size="sm"
            className="h-7 text-xs gap-1"
            onClick={handleRunExperiment}
            disabled={isRunning}
          >
            <Play size={12} />
            {isRunning ? "Running..." : "Run Experiment"}
          </Button>
        </div>
      </div>

      {/* Chart */}
      <div className="p-3">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full"
          style={{ maxHeight: 260 }}
        >
          {/* Grid lines */}
          {yTicks.map((tick) => (
            <g key={`y-${tick}`}>
              <line
                x1={PAD.left}
                y1={yScale(tick)}
                x2={W - PAD.right}
                y2={yScale(tick)}
                stroke="var(--border)"
                strokeWidth={0.5}
                strokeDasharray="4 4"
              />
              <text
                x={PAD.left - 8}
                y={yScale(tick) + 3}
                textAnchor="end"
                fontSize={9}
                fill="var(--muted-fg)"
                fontFamily="var(--font-mono)"
              >
                {tick >= 1000 ? `${(tick / 1000).toFixed(1)}k` : tick}
              </text>
            </g>
          ))}

          {xTicks.map((tick) => (
            <g key={`x-${tick}`}>
              <text
                x={xScale(tick)}
                y={H - 8}
                textAnchor="middle"
                fontSize={9}
                fill="var(--muted-fg)"
                fontFamily="var(--font-mono)"
              >
                {tick}
              </text>
            </g>
          ))}

          {/* Axis labels */}
          <text
            x={W / 2}
            y={H - 0}
            textAnchor="middle"
            fontSize={10}
            fill="var(--muted-fg)"
            fontWeight="600"
          >
            Input Size (n)
          </text>
          <text
            x={12}
            y={H / 2}
            textAnchor="middle"
            fontSize={10}
            fill="var(--muted-fg)"
            fontWeight="600"
            transform={`rotate(-90, 12, ${H / 2})`}
          >
            Operations
          </text>

          {/* Reference curves */}
          <AnimatePresence>
            {refCurves && (
              <>
                <motion.path
                  d={pathFromPoints(refCurves.logn)}
                  fill="none"
                  stroke="hsl(199 89% 48%)"
                  strokeWidth={1.5}
                  strokeDasharray="6 4"
                  opacity={0.3}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                />
                <motion.path
                  d={pathFromPoints(refCurves.linear)}
                  fill="none"
                  stroke="hsl(142 71% 45%)"
                  strokeWidth={1.5}
                  strokeDasharray="6 4"
                  opacity={0.3}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
                <motion.path
                  d={pathFromPoints(refCurves.quadratic)}
                  fill="none"
                  stroke="hsl(0 84% 60%)"
                  strokeWidth={1.5}
                  strokeDasharray="6 4"
                  opacity={0.3}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
                <motion.path
                  d={pathFromPoints(refCurves.nlogn)}
                  fill="none"
                  stroke="hsl(45 93% 47%)"
                  strokeWidth={1.5}
                  strokeDasharray="6 4"
                  opacity={0.3}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                />
              </>
            )}
          </AnimatePresence>

          {/* Data line */}
          {dataPath && (
            <motion.path
              d={dataPath}
              fill="none"
              stroke="var(--primary)"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6 }}
            />
          )}

          {/* Data points */}
          {dataPoints.map((point, i) => (
            <motion.circle
              key={`${point.inputSize}-${i}`}
              cx={xScale(point.inputSize)}
              cy={yScale(point.operations)}
              r={4}
              fill="var(--primary)"
              stroke="var(--bg)"
              strokeWidth={2}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          ))}

          {/* Hover tooltips — rendered as SVG text for simplicity */}
          {dataPoints.map((point, i) => (
            <g key={`tooltip-${i}`} className="opacity-0 hover:opacity-100 transition-opacity">
              <rect
                x={xScale(point.inputSize) - 35}
                y={yScale(point.operations) - 28}
                width={70}
                height={20}
                rx={4}
                fill="var(--card)"
                stroke="var(--border)"
                strokeWidth={1}
              />
              <text
                x={xScale(point.inputSize)}
                y={yScale(point.operations) - 14}
                textAnchor="middle"
                fontSize={9}
                fill="var(--fg)"
                fontFamily="var(--font-mono)"
                fontWeight="600"
              >
                n={point.inputSize} → {point.operations}
              </text>
            </g>
          ))}
        </svg>

        {/* Legend */}
        {dataPoints.length > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-4 mt-2 text-[10px] font-medium"
          >
            <span className="flex items-center gap-1">
              <span className="w-3 h-0.5 bg-primary inline-block rounded-full" />
              <span className="text-muted-foreground">Your Data</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-0.5 inline-block rounded-full" style={{ backgroundColor: "hsl(199 89% 48%)", opacity: 0.5 }} />
              <span className="text-muted-foreground">O(log n)</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-0.5 inline-block rounded-full" style={{ backgroundColor: "hsl(142 71% 45%)", opacity: 0.5 }} />
              <span className="text-muted-foreground">O(n)</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-0.5 inline-block rounded-full" style={{ backgroundColor: "hsl(45 93% 47%)", opacity: 0.5 }} />
              <span className="text-muted-foreground">O(n log n)</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-0.5 inline-block rounded-full" style={{ backgroundColor: "hsl(0 84% 60%)", opacity: 0.5 }} />
              <span className="text-muted-foreground">O(n²)</span>
            </span>
          </motion.div>
        )}

        {/* Empty state */}
        {dataPoints.length === 0 && !isRunning && (
          <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
            <p className="text-sm font-medium">No data yet</p>
            <p className="text-xs mt-1">
              Click "Run Experiment" to see how operations scale
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
