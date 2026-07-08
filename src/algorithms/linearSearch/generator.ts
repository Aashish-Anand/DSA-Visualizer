import type { VisualizationStep, ArraySearchState, ComplexityMetrics } from "@/types";
import { generateRandomArray } from "../bubbleSort/generator";

export function generateLinearSearchSteps(
  inputArray: number[],
  target: number
): VisualizationStep<ArraySearchState>[] {
  const steps: VisualizationStep<ArraySearchState>[] = [];
  const array = [...inputArray];
  
  let comparisons = 0;
  let operations = 0;

  const getMetrics = (): ComplexityMetrics => ({
    comparisons,
    operations,
  });

  const createBaseState = (
    currentIndex: number | null = null,
    foundIndex: number | null = null,
    status: ArraySearchState["status"] = "searching"
  ): ArraySearchState => ({
    array: [...array],
    target,
    currentIndex,
    lowIndex: null,
    highIndex: null,
    midIndex: null,
    foundIndex,
    status,
  });

  steps.push({
    state: createBaseState(),
    activeLine: 0,
    explanation: `Starting Linear Search to find target ${target}.`,
    beginnerExplanation: `Let's find the number ${target} by checking each box one by one!`,
    complexityMetrics: getMetrics(),
  });

  for (let i = 0; i < array.length; i++) {
    operations++;
    
    steps.push({
      state: createBaseState(i),
      activeLine: 1,
      explanation: `Checking element at index ${i}.`,
      beginnerExplanation: `Looking at box number ${i}...`,
      complexityMetrics: getMetrics(),
    });

    comparisons++;
    steps.push({
      state: createBaseState(i),
      activeLine: 2,
      explanation: `Comparing arr[${i}] (${array[i]}) with target (${target}).`,
      beginnerExplanation: `Is ${array[i]} equal to our target ${target}?`,
      complexityMetrics: getMetrics(),
    });

    if (array[i] === target) {
      steps.push({
        state: createBaseState(i, i, "found"),
        activeLine: 3,
        explanation: `Target ${target} found at index ${i}.`,
        beginnerExplanation: `Yes! We found it! 🎉`,
        complexityMetrics: getMetrics(),
      });
      return steps;
    }
  }

  steps.push({
    state: createBaseState(null, null, "not-found"),
    activeLine: 4,
    explanation: `Reached the end of the array. Target ${target} not found. Returning -1.`,
    beginnerExplanation: `Oh no, we checked every single box and couldn't find ${target}.`,
    complexityMetrics: getMetrics(),
  });

  return steps;
}

export function generateSearchTarget(array: number[]): number {
  // 80% chance to pick an element that exists, 20% to pick a random missing one
  if (Math.random() > 0.2 && array.length > 0) {
    return array[Math.floor(Math.random() * array.length)];
  }
  return Math.floor(Math.random() * 100) + 100; // Something unlikely to be in the 1-100 random array
}

export function runLinearSearchExperiment(inputSize: number): ComplexityMetrics {
  const array = Array.from({ length: inputSize }, (_, i) => i);
  const target = Math.random() > 0.5 ? array[Math.floor(Math.random() * inputSize)] : -1;
  
  let comparisons = 0;
  let operations = 0;

  for (let i = 0; i < array.length; i++) {
    operations++;
    comparisons++;
    if (array[i] === target) {
      break;
    }
  }

  return { comparisons, operations };
}

export { generateRandomArray };
