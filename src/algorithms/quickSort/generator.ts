import type { VisualizationStep, SortingBarState, ComplexityMetrics } from "@/types";

export function generateQuickSortSteps(
  inputArray: number[]
): VisualizationStep<SortingBarState>[] {
  const steps: VisualizationStep<SortingBarState>[] = [];
  const array = [...inputArray];
  const sortedIndices: number[] = [];

  let comparisons = 0;
  let operations = 0;
  let swaps = 0;

  const getMetrics = (): ComplexityMetrics => ({
    comparisons,
    operations,
    swaps,
  });

  const createBaseState = (
    partitionRegion: [number, number] | null = null,
    pivotIndex: number | null = null
  ): SortingBarState => ({
    array: [...array],
    comparingIndices: null,
    swappedIndices: null,
    sortedIndices: [...sortedIndices],
    highlightedIndex: null,
    highlightLabel: null,
    partitionRegion,
    pivotIndex,
    insertingFromIndex: null,
    sortedRegion: null,
  });

  steps.push({
    state: createBaseState(),
    activeLine: 0,
    explanation: `Starting Quick Sort on array of size ${array.length}.`,
    beginnerExplanation: `Let's use Quick Sort! We'll pick a 'pivot' number, put all smaller numbers to its left and bigger numbers to its right. Then we repeat!`,
    complexityMetrics: getMetrics(),
  });

  function partition(low: number, high: number): number {
    operations++;
    const pivot = array[high];
    
    steps.push({
      state: createBaseState([low, high], high),
      activeLine: 6,
      explanation: `Selected arr[${high}] (${pivot}) as the pivot. Partitioning subarray from index ${low} to ${high}.`,
      beginnerExplanation: `We chose ${pivot} as our pivot. We'll compare everything in this shaded section to it.`,
      complexityMetrics: getMetrics(),
    });

    let i = low - 1;
    operations++;

    for (let j = low; j < high; j++) {
      operations++;
      steps.push({
        state: {
          ...createBaseState([low, high], high),
          comparingIndices: [j, high],
        },
        activeLine: 9,
        explanation: `Comparing arr[${j}] (${array[j]}) with pivot (${pivot}).`,
        beginnerExplanation: `Is ${array[j]} smaller than our pivot ${pivot}?`,
        complexityMetrics: getMetrics(),
      });

      comparisons++;
      if (array[j] < pivot) {
        operations++;
        i++;
        if (i !== j) {
          swaps++;
          operations += 3;
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;

          steps.push({
            state: {
              ...createBaseState([low, high], high),
              swappedIndices: [i, j],
            },
            activeLine: 11,
            explanation: `Since ${array[i]} < ${pivot}, swap arr[${i}] and arr[${j}].`,
            beginnerExplanation: `Yes, ${array[i]} is smaller! Let's swap it to the left side.`,
            complexityMetrics: getMetrics(),
          });
        } else {
           steps.push({
            state: {
              ...createBaseState([low, high], high),
              highlightedIndex: i,
              highlightLabel: "LEFT",
            },
            activeLine: 10,
            explanation: `${array[j]} < ${pivot}, but it is already in the left partition. i is advanced to ${i}.`,
            beginnerExplanation: `Yes, and it's already on the left side. Let's move our "left side" boundary forward.`,
            complexityMetrics: getMetrics(),
          });
        }
      } else {
        steps.push({
          state: createBaseState([low, high], high),
          activeLine: 9,
          explanation: `${array[j]} >= pivot (${pivot}). Leave it in the right partition.`,
          beginnerExplanation: `No, it's bigger or equal. Leave it on the right side for now.`,
          complexityMetrics: getMetrics(),
        });
      }
    }

    // Place pivot in correct position
    const pivotPos = i + 1;
    operations++;
    if (pivotPos !== high) {
      swaps++;
      operations += 3;
      const temp = array[pivotPos];
      array[pivotPos] = array[high];
      array[high] = temp;

      steps.push({
        state: {
          ...createBaseState([low, high], pivotPos),
          swappedIndices: [pivotPos, high],
        },
        activeLine: 12,
        explanation: `Partition complete. Swapping pivot to its final position at index ${pivotPos}.`,
        beginnerExplanation: `We've checked all numbers in this section! Now let's put the pivot exactly in the middle between the small numbers and big numbers.`,
        complexityMetrics: getMetrics(),
      });
    }

    sortedIndices.push(pivotPos);
    steps.push({
      state: createBaseState(),
      activeLine: 13,
      explanation: `Pivot ${pivot} is now in its sorted position at index ${pivotPos}.`,
      beginnerExplanation: `Awesome! The pivot ${pivot} is now exactly where it belongs in the fully sorted array.`,
      complexityMetrics: getMetrics(),
    });

    return pivotPos;
  }

  function quickSort(low: number, high: number) {
    if (low < high) {
      const pi = partition(low, high);
      
      steps.push({
        state: createBaseState(),
        activeLine: 3,
        explanation: `Recursively sorting the left partition (indices ${low} to ${pi - 1}).`,
        beginnerExplanation: `Now let's repeat the same process for the numbers to the left of our old pivot.`,
        complexityMetrics: getMetrics(),
      });
      quickSort(low, pi - 1);
      
      steps.push({
        state: createBaseState(),
        activeLine: 4,
        explanation: `Recursively sorting the right partition (indices ${pi + 1} to ${high}).`,
        beginnerExplanation: `And now let's sort the numbers to the right of our old pivot.`,
        complexityMetrics: getMetrics(),
      });
      quickSort(pi + 1, high);
    } else if (low === high) {
       // Single element is naturally sorted
       if (!sortedIndices.includes(low)) {
         sortedIndices.push(low);
         steps.push({
           state: createBaseState(),
           activeLine: 1,
           explanation: `Base case reached: Subarray of size 1 at index ${low} is sorted.`,
           beginnerExplanation: `A section with just one number is already sorted!`,
           complexityMetrics: getMetrics(),
         });
       }
    }
  }

  quickSort(0, array.length - 1);

  steps.push({
    state: {
      ...createBaseState(),
      sortedIndices: Array.from({ length: array.length }, (_, i) => i),
    },
    activeLine: 0,
    explanation: `Quick Sort complete! The sorted array is [${array.join(", ")}].`,
    beginnerExplanation: `We did it! 🎉 All the numbers are sorted!`,
    complexityMetrics: getMetrics(),
  });

  return steps;
}

export function runQuickSortExperiment(inputSize: number): ComplexityMetrics {
  const array = Array.from({ length: inputSize }, () => Math.random());
  
  let comparisons = 0;
  let operations = 0;
  let swaps = 0;

  function partitionExp(low: number, high: number): number {
    operations++;
    const pivot = array[high];
    let i = low - 1;
    operations++;

    for (let j = low; j < high; j++) {
      operations++;
      comparisons++;
      if (array[j] < pivot) {
        operations++;
        i++;
        if (i !== j) {
          swaps++;
          operations += 3;
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
      }
    }

    const pivotPos = i + 1;
    operations++;
    if (pivotPos !== high) {
      swaps++;
      operations += 3;
      const temp = array[pivotPos];
      array[pivotPos] = array[high];
      array[high] = temp;
    }

    return pivotPos;
  }

  function quickSortExp(low: number, high: number) {
    if (low < high) {
      const pi = partitionExp(low, high);
      quickSortExp(low, pi - 1);
      quickSortExp(pi + 1, high);
    }
  }

  quickSortExp(0, array.length - 1);

  return { comparisons, operations, swaps };
}
