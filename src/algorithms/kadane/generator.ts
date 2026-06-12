import type { VisualizationStep, KadaneState } from "@/types";

export function generateKadaneArray(size: number = 8): number[] {
  // Generate array with both positive and negative numbers
  return Array.from({ length: size }, () => Math.floor(Math.random() * 41) - 20); // -20 to 20
}

export function generateKadaneSteps(
  array: number[]
): VisualizationStep<KadaneState>[] {
  const steps: VisualizationStep<KadaneState>[] = [];

  let currentSum = 0;
  let maxSum = -Infinity;
  let currentStartIndex = 0;
  let maxStartIndex: number | null = null;
  let maxEndIndex: number | null = null;

  const pushStep = (
    activeLine: number,
    explanation: string,
    beginnerExplanation: string,
    phase: KadaneState["phase"],
    currentIndex: number | null = null
  ) => {
    steps.push({
      state: {
        array: [...array],
        currentIndex,
        currentSum,
        maxSum,
        currentStartIndex,
        maxStartIndex,
        maxEndIndex,
        phase,
      },
      activeLine,
      explanation,
      beginnerExplanation,
    });
  };

  pushStep(
    0,
    "Initialize currentSum to 0 and maxSum to -Infinity.",
    "We start with a sum of 0, and assume our maximum sum so far is a very small number.",
    "init"
  );

  for (let i = 0; i < array.length; i++) {
    const val = array[i];

    pushStep(
      3,
      `Examining element at index ${i}: ${val}.`,
      `Let's look at the next number: ${val}.`,
      "adding",
      i
    );

    currentSum += val;

    pushStep(
      4,
      `Add ${val} to currentSum. New currentSum = ${currentSum}.`,
      `We add ${val} to our running total, making it ${currentSum}.`,
      "adding",
      i
    );

    if (currentSum > maxSum) {
      maxSum = currentSum;
      maxStartIndex = currentStartIndex;
      maxEndIndex = i;

      pushStep(
        5,
        `currentSum (${currentSum}) > maxSum. Update maxSum to ${currentSum}.`,
        `Our running total is now the biggest we've ever seen! We remember this subarray.`,
        "new-max-found",
        i
      );
    } else {
      pushStep(
        5,
        `currentSum (${currentSum}) is not strictly greater than maxSum (${maxSum}).`,
        `Our running total isn't the biggest we've seen, so we keep looking.`,
        "adding",
        i
      );
    }

    if (currentSum < 0) {
      pushStep(
        7,
        `currentSum is negative (${currentSum}). It will only decrease future sums.`,
        `Since our running total dropped below zero, it's a burden. It's better to start a fresh subarray from the next number.`,
        "resetting-sum",
        i
      );
      currentSum = 0;
      currentStartIndex = i + 1;
    }
  }

  pushStep(
    9,
    `Finished traversal. Maximum subarray sum is ${maxSum}.`,
    `We checked all possibilities! The biggest sum we could find is ${maxSum}.`,
    "complete"
  );

  return steps;
}
