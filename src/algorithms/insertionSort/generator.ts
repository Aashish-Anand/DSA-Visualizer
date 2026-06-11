import type { VisualizationStep, SortingBarState } from "@/types";

export function generateInsertionSortSteps(
  inputArray: number[]
): VisualizationStep<SortingBarState>[] {
  const steps: VisualizationStep<SortingBarState>[] = [];
  const array = [...inputArray];
  const n = array.length;

  const createBaseState = (
    sortedTo: number,
    keyIndex: number | null = null,
    insertingFrom: number | null = null,
  ): SortingBarState => ({
    array: [...array],
    comparingIndices: null,
    swappedIndices: null,
    sortedIndices: [], // We'll use sortedRegion instead
    highlightedIndex: keyIndex,
    highlightLabel: keyIndex !== null ? "KEY" : null,
    partitionRegion: null,
    pivotIndex: null,
    insertingFromIndex: insertingFrom,
    sortedRegion: [0, sortedTo],
  });

  steps.push({
    state: createBaseState(0),
    activeLine: 0,
    explanation: `Starting Insertion Sort. The first element (${array[0]}) is trivially sorted by itself.`,
    beginnerExplanation: `Let's sort! We'll start by looking at the second number and seeing where it fits compared to the first.`,
  });

  for (let i = 1; i < n; i++) {
    const key = array[i];
    let j = i - 1;

    steps.push({
      state: createBaseState(i - 1, i),
      activeLine: 2,
      explanation: `Selected arr[${i}] (${key}) as the key to insert into the sorted region (0 to ${i - 1}).`,
      beginnerExplanation: `We're picking up ${key}. We need to find its correct spot in the sorted numbers to the left.`,
    });

    let lastJ = i;
    while (j >= 0) {
      steps.push({
        state: {
          ...createBaseState(i - 1, j + 1), // The key is temporarily conceptually at j+1
          comparingIndices: [j, j + 1],
        },
        activeLine: 4,
        explanation: `Comparing key (${key}) with arr[${j}] (${array[j]}).`,
        beginnerExplanation: `Is our key (${key}) smaller than the number to its left (${array[j]})?`,
      });

      if (array[j] > key) {
        // Shift right
        array[j + 1] = array[j];
        
        steps.push({
          state: {
            ...createBaseState(i - 1, j), // Key has moved left conceptually
            insertingFromIndex: j + 1,
            swappedIndices: [j, j + 1], // Visually represent the shift as a swap for the bar highlight
          },
          activeLine: 5,
          explanation: `Since ${array[j]} > ${key}, shift ${array[j]} to the right.`,
          beginnerExplanation: `Yes, ${key} is smaller! So we shift ${array[j]} to the right to make room.`,
        });
        lastJ = j;
        j--;
      } else {
        break;
      }
    }

    array[j + 1] = key;

    steps.push({
      state: createBaseState(i),
      activeLine: 7,
      explanation: `Inserted key (${key}) at index ${j + 1}. The sorted region now extends to index ${i}.`,
      beginnerExplanation: `We found the spot! We placed ${key} here. The sorted part of our array is growing.`,
    });
  }

  steps.push({
    state: {
      array: [...array],
      comparingIndices: null,
      swappedIndices: null,
      sortedIndices: Array.from({ length: n }, (_, i) => i),
      highlightedIndex: null,
      highlightLabel: null,
      partitionRegion: null,
      pivotIndex: null,
      insertingFromIndex: null,
      sortedRegion: null,
    },
    activeLine: 0,
    explanation: `Insertion Sort complete! The sorted array is [${array.join(", ")}].`,
    beginnerExplanation: `We did it! 🎉 All the numbers have been inserted into their correct places.`,
  });

  return steps;
}
