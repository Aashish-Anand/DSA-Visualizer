import type { VisualizationStep, SortingBarState, ComplexityMetrics } from "@/types";

/**
 * Generates a complete sequence of visualization steps for the Bubble Sort algorithm.
 * Each comparison, swap, and "mark as sorted" action produces a separate step.
 * Steps include cumulative complexityMetrics for the Complexity Explorer.
 */
export function generateBubbleSortSteps(
  inputArray: number[]
): VisualizationStep<SortingBarState>[] {
  const steps: VisualizationStep<SortingBarState>[] = [];
  const array = [...inputArray];
  const n = array.length;
  const sortedIndices: number[] = [];

  // Running complexity counters
  let comparisons = 0;
  let swaps = 0;
  let reads = 0;
  let writes = 0;

  const getMetrics = (): ComplexityMetrics => ({
    operations: comparisons + swaps,
    comparisons,
    swaps,
    reads,
    writes,
  });

  const createBaseState = (): SortingBarState => ({
    array: [...array],
    comparingIndices: null,
    swappedIndices: null,
    sortedIndices: [...sortedIndices],
    highlightedIndex: null,
    highlightLabel: null,
    partitionRegion: null,
    pivotIndex: null,
    insertingFromIndex: null,
    sortedRegion: null,
  });

  // Initial state
  steps.push({
    state: createBaseState(),
    activeLine: 0,
    explanation: `Starting Bubble Sort with array [${array.join(", ")}]. Array has ${n} elements.`,
    beginnerExplanation: `Let's sort these ${n} numbers from smallest to biggest! We'll do this by comparing neighbors and swapping them if they're in the wrong order.`,
    complexityMetrics: getMetrics(),
  });

  for (let i = 0; i < n - 1; i++) {
    // Start of outer loop pass
    steps.push({
      state: createBaseState(),
      activeLine: 1,
      explanation: `Starting pass ${i + 1} of ${n - 1}. Will compare elements from index 0 to ${n - i - 2}.`,
      beginnerExplanation: `Round ${i + 1}! We'll walk through the unsorted part of the array and bubble the biggest number to the right.`,
      complexityMetrics: getMetrics(),
    });

    let swapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      // Comparing step — count reads and comparison
      reads += 2;
      comparisons++;

      steps.push({
        state: {
          ...createBaseState(),
          comparingIndices: [j, j + 1],
        },
        activeLine: 2,
        explanation: `Comparing arr[${j}] = ${array[j]} and arr[${j + 1}] = ${array[j + 1]}.`,
        beginnerExplanation: `Let's look at ${array[j]} and ${array[j + 1]} side by side. Which one is bigger?`,
        complexityMetrics: getMetrics(),
      });

      if (array[j] > array[j + 1]) {
        // Swap step — count reads, writes, and swap
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        swapped = true;
        swaps++;
        reads += 2;
        writes += 2;

        steps.push({
          state: {
            ...createBaseState(),
            swappedIndices: [j, j + 1],
          },
          activeLine: 3,
          explanation: `Since ${temp} > ${array[j]}, swap them. Array is now [${array.join(", ")}].`,
          beginnerExplanation: `${temp} is bigger than ${array[j]}, so they're in the wrong order! Let's swap them. The bigger number moves one step to the right. 🔄`,
          complexityMetrics: getMetrics(),
        });
      } else {
        // No swap needed
        steps.push({
          state: createBaseState(),
          activeLine: 2,
          explanation: `${array[j]} ≤ ${array[j + 1]}, no swap needed. They are already in the correct order.`,
          beginnerExplanation: `${array[j]} is not bigger than ${array[j + 1]}, so they're already in the right order. No swap needed! ✓`,
          complexityMetrics: getMetrics(),
        });
      }
    }

    // Mark the last unsorted position as sorted
    sortedIndices.push(n - 1 - i);

    steps.push({
      state: createBaseState(),
      activeLine: 4,
      explanation: `Pass ${i + 1} complete.${swapped ? "" : " No swaps were made."} Element ${array[n - 1 - i]} is now in its final position at index ${n - 1 - i}.`,
      beginnerExplanation: `Round ${i + 1} is done! The number ${array[n - 1 - i]} has bubbled up to its correct spot. ${swapped ? "We made some swaps this round." : "No swaps were needed — things are getting sorted!"} 🎯`,
      complexityMetrics: getMetrics(),
    });
  }

  // Mark the first element as sorted too
  if (!sortedIndices.includes(0)) {
    sortedIndices.push(0);
  }

  // Final sorted state
  steps.push({
    state: createBaseState(),
    activeLine: 5,
    explanation: `Bubble Sort complete! The sorted array is [${array.join(", ")}].`,
    beginnerExplanation: `We did it! 🎉 All the numbers are now sorted from smallest to biggest: [${array.join(", ")}]. Each number bubbled up to its correct position!`,
    complexityMetrics: getMetrics(),
  });

  return steps;
}

/**
 * Generate a random array of the given size with values between 5 and 99.
 */
export function generateRandomArray(size: number): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 95) + 5);
}

/**
 * Runs Bubble Sort on a random array of the given size and returns
 * the final complexity metrics. Used by the Growth Chart experiment.
 */
export function runBubbleSortExperiment(inputSize: number): ComplexityMetrics {
  const array = generateRandomArray(inputSize);
  const n = array.length;
  let comparisons = 0;
  let swaps = 0;
  let reads = 0;
  let writes = 0;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      reads += 2;
      comparisons++;
      if (array[j] > array[j + 1]) {
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        swaps++;
        reads += 2;
        writes += 2;
      }
    }
  }

  return {
    operations: comparisons + swaps,
    comparisons,
    swaps,
    reads,
    writes,
  };
}
