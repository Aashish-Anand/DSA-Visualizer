import type { VisualizationStep, ArraySearchState, ComplexityMetrics } from "@/types";

export function generateBinarySearchSteps(
  inputArray: number[],
  target: number
): VisualizationStep<ArraySearchState>[] {
  const steps: VisualizationStep<ArraySearchState>[] = [];
  
  // Binary search REQUIRES a sorted array!
  const array = [...inputArray].sort((a, b) => a - b);
  
  let comparisons = 0;
  let operations = 0;

  const getMetrics = (): ComplexityMetrics => ({
    comparisons,
    operations,
  });

  const createBaseState = (
    lowIndex: number | null,
    highIndex: number | null,
    midIndex: number | null = null,
    foundIndex: number | null = null,
    status: ArraySearchState["status"] = "searching"
  ): ArraySearchState => ({
    array: [...array],
    target,
    currentIndex: null,
    lowIndex,
    highIndex,
    midIndex,
    foundIndex,
    status,
  });

  steps.push({
    state: createBaseState(null, null),
    activeLine: 0,
    explanation: `Starting Binary Search. Note that the input array has been automatically sorted, as Binary Search requires a sorted array to work.`,
    beginnerExplanation: `Let's use Binary Search to find ${target}. First, we MUST make sure our numbers are sorted from smallest to biggest!`,
    complexityMetrics: getMetrics(),
  });

  let low = 0;
  let high = array.length - 1;

  steps.push({
    state: createBaseState(low, high),
    activeLine: 1,
    explanation: `Initialize low pointer to 0 and high pointer to ${high}.`,
    beginnerExplanation: `We'll put a 'LOW' marker at the start and a 'HIGH' marker at the end. Our target must be between them!`,
    complexityMetrics: getMetrics(),
  });

  while (low <= high) {
    comparisons++;
    steps.push({
      state: createBaseState(low, high),
      activeLine: 2,
      explanation: `Checking condition: low (${low}) <= high (${high}). Condition is true.`,
      beginnerExplanation: `As long as our LOW marker is before or at our HIGH marker, we keep searching.`,
      complexityMetrics: getMetrics(),
    });

    operations++;
    const mid = Math.floor((low + high) / 2);

    steps.push({
      state: createBaseState(low, high, mid),
      activeLine: 3,
      explanation: `Calculate mid pointer: floor((${low} + ${high}) / 2) = ${mid}.`,
      beginnerExplanation: `Let's check the box exactly in the middle of our LOW and HIGH markers.`,
      complexityMetrics: getMetrics(),
    });

    comparisons++;
    steps.push({
      state: createBaseState(low, high, mid),
      activeLine: 4,
      explanation: `Comparing arr[mid] (${array[mid]}) with target (${target}).`,
      beginnerExplanation: `Is the number in the middle (${array[mid]}) equal to our target (${target})?`,
      complexityMetrics: getMetrics(),
    });

    if (array[mid] === target) {
      steps.push({
        state: createBaseState(low, high, mid, mid, "found"),
        activeLine: 5,
        explanation: `Target ${target} found at mid index ${mid}.`,
        beginnerExplanation: `Yes! We found it exactly in the middle! 🎉`,
        complexityMetrics: getMetrics(),
      });
      return steps;
    }

    comparisons++;
    steps.push({
      state: createBaseState(low, high, mid),
      activeLine: 6,
      explanation: `arr[mid] != target. Checking if arr[mid] < target (${array[mid]} < ${target}).`,
      beginnerExplanation: `Not quite. Is the middle number smaller than our target?`,
      complexityMetrics: getMetrics(),
    });

    if (array[mid] < target) {
      operations++;
      steps.push({
        state: createBaseState(low, high, mid),
        activeLine: 7,
        explanation: `Since ${array[mid]} < ${target}, the target must be in the right half. Setting low = mid + 1.`,
        beginnerExplanation: `Yes! Since our list is sorted, we know the target MUST be to the right. Let's move our LOW marker past the middle.`,
        complexityMetrics: getMetrics(),
      });
      low = mid + 1;
      
      if (low <= array.length - 1) {
        steps.push({
          state: createBaseState(low, high),
          activeLine: 7,
          explanation: `low is now ${low}. The search space is halved.`,
          beginnerExplanation: `We just eliminated half of the boxes without even checking them!`,
          complexityMetrics: getMetrics(),
        });
      }
    } else {
      operations++;
      steps.push({
        state: createBaseState(low, high, mid),
        activeLine: 8,
        explanation: `Since ${array[mid]} > ${target}, the target must be in the left half. Setting high = mid - 1.`,
        beginnerExplanation: `No, it's bigger! So our target MUST be to the left. Let's move our HIGH marker before the middle.`,
        complexityMetrics: getMetrics(),
      });
      high = mid - 1;
      
      if (high >= 0) {
        steps.push({
          state: createBaseState(low, high),
          activeLine: 9,
          explanation: `high is now ${high}. The search space is halved.`,
          beginnerExplanation: `We just eliminated half of the boxes without even checking them!`,
          complexityMetrics: getMetrics(),
        });
      }
    }
  }

  comparisons++; // false condition check
  steps.push({
    state: createBaseState(low, high, null, null, "not-found"),
    activeLine: 2,
    explanation: `Checking condition: low (${low}) <= high (${high}). Condition is false, exiting loop.`,
    beginnerExplanation: `Our LOW marker crossed our HIGH marker! This means there are no more boxes left to check.`,
    complexityMetrics: getMetrics(),
  });

  steps.push({
    state: createBaseState(low, high, null, null, "not-found"),
    activeLine: 10,
    explanation: `Target ${target} was not found in the array. Returning -1.`,
    beginnerExplanation: `We couldn't find ${target} in the list.`,
    complexityMetrics: getMetrics(),
  });

  return steps;
}

export function runBinarySearchExperiment(inputSize: number): ComplexityMetrics {
  const array = Array.from({ length: inputSize }, (_, i) => i * 2);
  const target = Math.random() > 0.5 ? array[Math.floor(Math.random() * inputSize)] : -1;
  
  let low = 0;
  let high = array.length - 1;
  let comparisons = 0;
  let operations = 0;

  while (low <= high) {
    comparisons++;
    operations++;
    const mid = Math.floor((low + high) / 2);
    
    comparisons++;
    if (array[mid] === target) {
      break;
    }
    
    comparisons++;
    if (array[mid] < target) {
      low = mid + 1;
      operations++;
    } else {
      high = mid - 1;
      operations++;
    }
  }
  
  if (low > high) {
    comparisons++;
  }
  
  return { comparisons, operations };
}
