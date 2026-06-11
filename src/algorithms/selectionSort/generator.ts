import type { VisualizationStep, SortingBarState } from "@/types";
import { generateRandomArray } from "../bubbleSort/generator";

export function generateSelectionSortSteps(
  inputArray: number[]
): VisualizationStep<SortingBarState>[] {
  const steps: VisualizationStep<SortingBarState>[] = [];
  const array = [...inputArray];
  const n = array.length;
  const sortedIndices: number[] = [];

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

  steps.push({
    state: createBaseState(),
    activeLine: 0,
    explanation: `Starting Selection Sort with array [${array.join(", ")}].`,
    beginnerExplanation: `Let's sort these numbers! We'll do this by finding the smallest number in the unsorted part and moving it to the front.`,
  });

  for (let i = 0; i < n; i++) {
    steps.push({
      state: createBaseState(),
      activeLine: 1,
      explanation: `Starting pass ${i + 1}. The sorted region is indices 0 to ${i - 1}.`,
      beginnerExplanation: `Let's find the smallest number in the remaining unsorted part of the array.`,
    });

    let minIndex = i;

    steps.push({
      state: {
        ...createBaseState(),
        highlightedIndex: minIndex,
        highlightLabel: "MIN",
      },
      activeLine: 2,
      explanation: `Assume the element at index ${i} (${array[i]}) is the minimum.`,
      beginnerExplanation: `We'll start by assuming the first unsorted number, ${array[i]}, is the smallest.`,
    });

    for (let j = i + 1; j < n; j++) {
      steps.push({
        state: {
          ...createBaseState(),
          comparingIndices: [minIndex, j],
          highlightedIndex: minIndex,
          highlightLabel: "MIN",
        },
        activeLine: 4,
        explanation: `Comparing current min (${array[minIndex]}) with arr[${j}] (${array[j]}).`,
        beginnerExplanation: `Is ${array[j]} smaller than our current smallest number (${array[minIndex]})?`,
      });

      if (array[j] < array[minIndex]) {
        minIndex = j;
        steps.push({
          state: {
            ...createBaseState(),
            highlightedIndex: minIndex,
            highlightLabel: "MIN",
          },
          activeLine: 5,
          explanation: `Found new minimum: ${array[minIndex]} at index ${minIndex}.`,
          beginnerExplanation: `Yes! ${array[minIndex]} is our new smallest number.`,
        });
      }
    }

    if (minIndex !== i) {
      const temp = array[i];
      array[i] = array[minIndex];
      array[minIndex] = temp;

      steps.push({
        state: {
          ...createBaseState(),
          swappedIndices: [i, minIndex],
        },
        activeLine: 6,
        explanation: `Swapping arr[${i}] and arr[${minIndex}]. The minimum value ${array[i]} is now in its correct position.`,
        beginnerExplanation: `We checked the whole unsorted part! The smallest number was ${array[i]}. Let's swap it to the front of the unsorted section.`,
      });
    } else {
      steps.push({
        state: createBaseState(),
        activeLine: 6,
        explanation: `The minimum element ${array[i]} is already at index ${i}. No swap needed.`,
        beginnerExplanation: `The smallest number was already at the front. No need to swap!`,
      });
    }

    sortedIndices.push(i);
  }

  steps.push({
    state: createBaseState(),
    activeLine: 0, // Should be out of loop but 0 is fine for "done"
    explanation: `Selection Sort complete! The sorted array is [${array.join(", ")}].`,
    beginnerExplanation: `We did it! 🎉 All the numbers are sorted from smallest to biggest.`,
  });

  return steps;
}

export { generateRandomArray };
