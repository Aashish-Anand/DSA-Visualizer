import type { VisualizationStep, MajorityElement1State, ComplexityMetrics } from "@/types";

export function generateMajorityElement1Array(size: number = 8): number[] {
  // Guarantee a majority element
  const majorityElement = Math.floor(Math.random() * 9) + 1;
  const array = Array(size).fill(0);
  
  const majorityCount = Math.floor(size / 2) + 1;
  let placed = 0;
  
  // Place majority elements randomly
  while (placed < majorityCount) {
    const idx = Math.floor(Math.random() * size);
    if (array[idx] === 0) {
      array[idx] = majorityElement;
      placed++;
    }
  }
  
  // Fill the rest with random numbers (ensuring they aren't the majority element)
  for (let i = 0; i < size; i++) {
    if (array[i] === 0) {
      let rand = Math.floor(Math.random() * 9) + 1;
      while (rand === majorityElement) {
        rand = Math.floor(Math.random() * 9) + 1;
      }
      array[i] = rand;
    }
  }
  
  return array;
}

export function generateMajorityElement1Steps(
  array: number[]
): VisualizationStep<MajorityElement1State>[] {
  const steps: VisualizationStep<MajorityElement1State>[] = [];

  let candidate: number | null = null;
  let count = 0;
  
  let comparisons = 0;
  let operations = 0;

  const getMetrics = (): ComplexityMetrics => ({
    comparisons,
    operations,
  });

  const pushStep = (
    activeLine: number,
    explanation: string,
    beginnerExplanation: string,
    phase: MajorityElement1State["phase"],
    currentIndex: number | null = null
  ) => {
    steps.push({
      state: {
        array: [...array],
        currentIndex,
        candidate,
        count,
        phase,
      },
      activeLine,
      explanation,
      beginnerExplanation,
      complexityMetrics: getMetrics(),
    });
  };

  pushStep(
    0,
    "Initialize candidate to null and count to 0.",
    "We start with no candidate and 0 votes.",
    "init"
  );

  for (let i = 0; i < array.length; i++) {
    operations++;
    const num = array[i];

    pushStep(
      3,
      `Examining element at index ${i}: ${num}.`,
      `Let's look at the next number: ${num}.`,
      "init",
      i
    );

    comparisons++;
    if (count === 0) {
      candidate = num;
      pushStep(
        5,
        `Count is 0. Setting new candidate to ${num}.`,
        `Since we have 0 votes, we pick ${num} as our new potential winner!`,
        "new-candidate",
        i
      );
    }

    comparisons++;
    if (num === candidate) {
      count += 1;
      pushStep(
        7,
        `Current element (${num}) matches candidate. Incrementing count to ${count}.`,
        `This number voted for our candidate! We increase the votes to ${count}.`,
        "increment",
        i
      );
    } else {
      count -= 1;
      pushStep(
        9,
        `Current element (${num}) does NOT match candidate (${candidate}). Decrementing count to ${count}.`,
        `This number voted against our candidate! We decrease the votes to ${count}.`,
        "decrement",
        i
      );
    }
  }

  pushStep(
    10,
    `Finished traversal. Majority element is ${candidate}.`,
    `We checked all numbers! The winner that survived the voting is ${candidate}.`,
    "complete"
  );

  return steps;
}

export function runMajorityElement1Experiment(inputSize: number): ComplexityMetrics {
  const array = generateMajorityElement1Array(inputSize);
  let comparisons = 0;
  let operations = 0;
  
  let candidate: number | null = null;
  let count = 0;

  for (let i = 0; i < array.length; i++) {
    operations++;
    const num = array[i];
    comparisons++;
    if (count === 0) {
      candidate = num;
    }
    comparisons++;
    if (num === candidate) {
      count++;
    } else {
      count--;
    }
  }

  return { comparisons, operations };
}
