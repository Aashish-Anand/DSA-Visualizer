import type { VisualizationStep, RadixSortState, ComplexityMetrics } from "@/types";

export function generateRadixSortSteps(
  inputArray: number[]
): VisualizationStep<RadixSortState>[] {
  const steps: VisualizationStep<RadixSortState>[] = [];
  const array = [...inputArray];
  const buckets: number[][] = Array.from({ length: 10 }, () => []);

  let operations = 0;
  let comparisons = 0; // minimal in radix sort, but we'll track max finding

  const getMetrics = (): ComplexityMetrics => ({
    comparisons,
    operations,
  });

  const createBaseState = (
    currentDigit: number = 0,
    highlightedIndex: number | null = null,
    highlightedDigit: number | null = null,
    phase: RadixSortState["phase"] = "distributing",
    sortedIndices: number[] = [],
    currentBucket: number | null = null
  ): RadixSortState => ({
    array: [...array],
    currentDigit,
    buckets: buckets.map(b => [...b]),
    highlightedIndex,
    highlightedDigit,
    phase,
    sortedIndices,
    currentBucket
  });

  steps.push({
    state: createBaseState(0, null, null, "distributing"),
    activeLine: 0,
    explanation: `Starting Radix Sort. We will sort numbers digit by digit, starting from the ones place (least significant digit).`,
    beginnerExplanation: `Let's sort by grouping! We'll look at the last digit of each number and put them into buckets 0-9.`,
    complexityMetrics: getMetrics(),
  });

  let max_val = 0;
  for (let i = 0; i < array.length; i++) {
    operations++;
    comparisons++;
    if (array[i] > max_val) {
      operations++;
      max_val = array[i];
    }
  }
  max_val = Math.max(max_val, 1);
  operations += 2;

  steps.push({
    state: createBaseState(0, null, null, "distributing"),
    activeLine: 1,
    explanation: `The maximum value is ${max_val}. We will process digits up to ${max_val.toString().length} places.`,
    beginnerExplanation: `The biggest number is ${max_val}, which has ${max_val.toString().length} digits. So we'll repeat our grouping process ${max_val.toString().length} times!`,
    complexityMetrics: getMetrics(),
  });

  let place = 1;
  let digitIndex = 0; // 0 for 1s, 1 for 10s, etc.
  operations += 2;

  while (Math.floor(max_val / place) > 0) {
    operations++; // while check
    steps.push({
      state: createBaseState(digitIndex, null, null, "distributing"),
      activeLine: 4,
      explanation: `Created 10 empty buckets for digit place ${place} (1${'0'.repeat(digitIndex)}s).`,
      beginnerExplanation: `We've set up 10 empty buckets (0 to 9) for the ${place}s place digit.`,
      complexityMetrics: getMetrics(),
    });

    // Distribute
    for (let i = 0; i < array.length; i++) {
      operations++; // loop check
      const num = array[i];
      const digit = Math.floor(num / place) % 10;
      operations += 3; // array access + math
      
      steps.push({
        state: createBaseState(digitIndex, i, digit, "distributing"),
        activeLine: 6,
        explanation: `Looking at arr[${i}] = ${num}. The digit at place ${place} is ${digit}.`,
        beginnerExplanation: `Let's look at ${num}. Its digit in this place is ${digit}.`,
        complexityMetrics: getMetrics(),
      });

      buckets[digit].push(num);
      operations++;

      steps.push({
        state: createBaseState(digitIndex, i, digit, "distributing"),
        activeLine: 7,
        explanation: `Placed ${num} into bucket ${digit}.`,
        beginnerExplanation: `So we put ${num} into bucket ${digit}!`,
        complexityMetrics: getMetrics(),
      });
    }

    steps.push({
      state: createBaseState(digitIndex, null, null, "collecting"),
      activeLine: 8,
      explanation: `Finished distributing. Now collecting numbers back from the buckets in order.`,
      beginnerExplanation: `All numbers are in buckets! Now we'll take them out, starting from bucket 0 to bucket 9.`,
      complexityMetrics: getMetrics(),
    });

    // Collect
    let idx = 0;
    for (let b = 0; b < 10; b++) {
      operations++; // loop check
      if (buckets[b].length > 0) {
        operations++;
        steps.push({
          state: createBaseState(digitIndex, null, b, "collecting", Array.from({length: idx}, (_, i) => i), b),
          activeLine: 9,
          explanation: `Collecting from bucket ${b}.`,
          beginnerExplanation: `Let's empty bucket ${b}.`,
          complexityMetrics: getMetrics(),
        });

        while (buckets[b].length > 0) {
          operations++;
          const num = buckets[b].shift()!;
          array[idx] = num;
          operations += 2;
          
          steps.push({
            state: createBaseState(digitIndex, idx, b, "collecting", Array.from({length: idx + 1}, (_, i) => i), b),
            activeLine: 11,
            explanation: `Moved ${num} from bucket ${b} back to array at index ${idx}.`,
            beginnerExplanation: `Taking ${num} out and putting it back in our list.`,
            complexityMetrics: getMetrics(),
          });
          
          idx++;
        }
      }
    }

    place *= 10;
    digitIndex++;
    operations += 2;
    
    // Check if we are done
    const isDone = Math.floor(max_val / place) === 0;
    operations++;

    steps.push({
      state: createBaseState(digitIndex, null, null, isDone ? "complete" : "distributing", isDone ? Array.from({length: array.length}, (_, i) => i) : []),
      activeLine: 12,
      explanation: `Moving to next digit place (${place}).`,
      beginnerExplanation: `Done with this digit! Let's move to the next digit to the left.`,
      complexityMetrics: getMetrics(),
    });
  }

  steps.push({
    state: createBaseState(digitIndex, null, null, "complete", Array.from({length: array.length}, (_, i) => i)),
    activeLine: 0,
    explanation: `Radix Sort complete! The array is fully sorted.`,
    beginnerExplanation: `We did it! 🎉 After checking every digit, the numbers are perfectly sorted!`,
    complexityMetrics: getMetrics(),
  });

  return steps;
}

export function runRadixSortExperiment(inputSize: number): ComplexityMetrics {
  const array = Array.from({ length: inputSize }, () => Math.floor(Math.random() * 1000));
  
  let comparisons = 0;
  let operations = 0;

  let max_val = 0;
  for (let i = 0; i < array.length; i++) {
    operations++;
    comparisons++;
    if (array[i] > max_val) {
      operations++;
      max_val = array[i];
    }
  }
  max_val = Math.max(max_val, 1);
  operations += 2;

  let place = 1;
  operations++;

  const buckets: number[][] = Array.from({ length: 10 }, () => []);
  operations += 10;

  while (Math.floor(max_val / place) > 0) {
    operations++;

    for (let i = 0; i < array.length; i++) {
      operations++;
      const num = array[i];
      const digit = Math.floor(num / place) % 10;
      buckets[digit].push(num);
      operations += 4;
    }

    let idx = 0;
    for (let b = 0; b < 10; b++) {
      operations++;
      while (buckets[b].length > 0) {
        operations++;
        array[idx] = buckets[b].shift()!;
        idx++;
        operations += 2;
      }
    }

    place *= 10;
    operations++;
  }

  return { comparisons, operations };
}
