import type { VisualizationStep, ArraySearchState } from "@/types";
import { generateRandomArray } from "../bubbleSort/generator";

export function generateLinearSearchSteps(
  inputArray: number[],
  target: number
): VisualizationStep<ArraySearchState>[] {
  const steps: VisualizationStep<ArraySearchState>[] = [];
  const array = [...inputArray];

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
  });

  for (let i = 0; i < array.length; i++) {
    steps.push({
      state: createBaseState(i),
      activeLine: 1,
      explanation: `Checking element at index ${i}.`,
      beginnerExplanation: `Looking at box number ${i}...`,
    });

    steps.push({
      state: createBaseState(i),
      activeLine: 2,
      explanation: `Comparing arr[${i}] (${array[i]}) with target (${target}).`,
      beginnerExplanation: `Is ${array[i]} equal to our target ${target}?`,
    });

    if (array[i] === target) {
      steps.push({
        state: createBaseState(i, i, "found"),
        activeLine: 3,
        explanation: `Target ${target} found at index ${i}.`,
        beginnerExplanation: `Yes! We found it! 🎉`,
      });
      return steps;
    }
  }

  steps.push({
    state: createBaseState(null, null, "not-found"),
    activeLine: 4,
    explanation: `Reached the end of the array. Target ${target} not found. Returning -1.`,
    beginnerExplanation: `Oh no, we checked every single box and couldn't find ${target}.`,
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

export { generateRandomArray };
