import type { ComplexityExplorerConfig, ComplexityMetrics } from "@/types";

/** Count the same calls and completed states instrumented by the tree generators. */
export function runDPCallExperiment(size: number, memoized: boolean, kind: "stairs" | "frog"): ComplexityMetrics {
  let recursiveCalls = 0, computedStates = 0, cacheHits = 0;
  const cache = new Set<number>();
  function visit(index: number) {
    recursiveCalls++;
    if (memoized && cache.has(index)) { cacheHits++; return; }
    if (kind === "stairs" ? index > 1 : index > 0) {
      visit(index - 1);
      if (index > 1) visit(index - 2);
    }
    computedStates++;
    if (memoized) cache.add(index);
  }
  visit(kind === "stairs" ? size : size - 1);
  return { operations: recursiveCalls + computedStates, comparisons: 0, recursiveCalls, computedStates, cacheHits };
}

export function getDPComplexity(kind: "stairs" | "frog", variant: "recursive" | "memoized" | "iterative", iterative: ComplexityExplorerConfig): ComplexityExplorerConfig {
  if (variant === "iterative") return { ...iterative, expectedGrowth: "linear", spaceCases: {best:"O(n)",average:"O(n)",worst:"O(n)"}, operationDefinition: kind === "stairs" ? "Counts table setup, initialization, loop iterations, and additions. Comparisons count base-case checks." : "Counts setup, loop iterations, height subtraction, absolute value, addition, and minimum selection. Comparisons count boundary checks and minimum selections." };
  const memoized = variant === "memoized";
  return {
    trackedMetrics: ["recursiveCalls", "computedStates", ...(memoized ? ["cacheHits" as const] : []), "operations"],
    storyParagraphs: memoized ? ["Memoization remembers each computed subproblem, so each state is solved once.", "Repeated calls return cached results. The total work grows linearly with input size. The cache and recursion stack each require O(n) extra space."] : ["Plain recursion explores both predecessor choices and solves the same subproblems repeatedly.", "The call tree grows exponentially. O(2ⁿ) is a convenient upper bound; this Fibonacci-shaped tree grows approximately as φⁿ. The deepest active call stack requires O(n) extra space."],
    timeCases: { best: memoized ? "O(n)" : "O(2ⁿ)", average: memoized ? "O(n)" : "O(2ⁿ)", worst: memoized ? "O(n)" : "O(2ⁿ)" },
    spaceCases: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    inputSizeRange: { min: 2, max: memoized ? 100 : 12, default: memoized ? 20 : 5 },
    runExperiment: n => runDPCallExperiment(n, memoized, kind),
    expectedGrowth: memoized ? "linear" : "exponential",
    operationDefinition: "One operation per function call and per completed subproblem. Cache hits are included in calls; visualization snapshots are not counted as operations.",
  };
}
