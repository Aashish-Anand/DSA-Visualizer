import type { VisualizationStep, MajorityElement2State } from "@/types";

export function generateMajorityElement2Array(size: number = 9): number[] {
  // Guarantee up to two majority elements (> n/3)
  const array = Array(size).fill(0);
  
  const majorityCount = Math.floor(size / 3) + 1;
  const cand1 = Math.floor(Math.random() * 5) + 1;
  const cand2 = Math.floor(Math.random() * 4) + 6; // Ensure different from cand1
  
  let placed1 = 0;
  let placed2 = 0;
  
  // Place cand1
  while (placed1 < majorityCount) {
    const idx = Math.floor(Math.random() * size);
    if (array[idx] === 0) {
      array[idx] = cand1;
      placed1++;
    }
  }

  // Place cand2 (Optional, but good for visualization. Let's do it 80% of the time)
  if (Math.random() > 0.2) {
    while (placed2 < majorityCount) {
      const idx = Math.floor(Math.random() * size);
      if (array[idx] === 0) {
        array[idx] = cand2;
        placed2++;
      }
    }
  }
  
  // Fill the rest with random numbers
  for (let i = 0; i < size; i++) {
    if (array[i] === 0) {
      let rand = Math.floor(Math.random() * 9) + 1;
      while (rand === cand1 || rand === cand2) {
        rand = Math.floor(Math.random() * 9) + 1;
      }
      array[i] = rand;
    }
  }
  
  return array;
}

export function generateMajorityElement2Steps(
  array: number[]
): VisualizationStep<MajorityElement2State>[] {
  const steps: VisualizationStep<MajorityElement2State>[] = [];

  let candidate1: number | null = null;
  let count1 = 0;
  let candidate2: number | null = null;
  let count2 = 0;

  const pushStep = (
    activeLine: number,
    explanation: string,
    beginnerExplanation: string,
    phase: MajorityElement2State["phase"],
    currentIndex: number | null = null
  ) => {
    steps.push({
      state: {
        array: [...array],
        currentIndex,
        candidate1,
        count1,
        candidate2,
        count2,
        phase,
      },
      activeLine,
      explanation,
      beginnerExplanation,
    });
  };

  pushStep(
    0,
    "Initialize both candidates to null and counts to 0.",
    "We start with zero votes for two open slots.",
    "init"
  );

  for (let i = 0; i < array.length; i++) {
    const num = array[i];

    pushStep(
      3,
      `Examining element at index ${i}: ${num}.`,
      `Let's look at the next number: ${num}.`,
      "init",
      i
    );

    if (num === candidate1) {
      count1 += 1;
      pushStep(
        5,
        `Matches Candidate 1. Incrementing Count 1 to ${count1}.`,
        `This number voted for Candidate 1! We increase its votes.`,
        "vote-cand1",
        i
      );
    } else if (num === candidate2) {
      count2 += 1;
      pushStep(
        7,
        `Matches Candidate 2. Incrementing Count 2 to ${count2}.`,
        `This number voted for Candidate 2! We increase its votes.`,
        "vote-cand2",
        i
      );
    } else if (count1 === 0) {
      candidate1 = num;
      count1 = 1;
      pushStep(
        9,
        `Count 1 is 0. Setting Candidate 1 to ${num} and Count 1 to 1.`,
        `Candidate 1 has 0 votes, so we put ${num} in the slot as our new candidate!`,
        "new-cand1",
        i
      );
    } else if (count2 === 0) {
      candidate2 = num;
      count2 = 1;
      pushStep(
        11,
        `Count 2 is 0. Setting Candidate 2 to ${num} and Count 2 to 1.`,
        `Candidate 2 has 0 votes, so we put ${num} in the slot as our new candidate!`,
        "new-cand2",
        i
      );
    } else {
      count1 -= 1;
      count2 -= 1;
      pushStep(
        13,
        `Matches neither candidate, and both counts > 0. Decrementing both counts.`,
        `This number didn't vote for either candidate! So BOTH candidates lose a vote.`,
        "decrement-both",
        i
      );
    }
  }

  // Verification step
  pushStep(
    14,
    "Phase 1 complete. Now we must verify if the candidates actually appear > n/3 times.",
    "We finished the voting! Now we double-check if our candidates actually won the election.",
    "verify"
  );

  let c1Votes = 0;
  let c2Votes = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === candidate1) c1Votes++;
    if (array[i] === candidate2) c2Votes++;
  }

  const threshold = Math.floor(array.length / 3);
  if (c1Votes <= threshold) candidate1 = null;
  if (c2Votes <= threshold) candidate2 = null;

  pushStep(
    14,
    `Verification complete. Final valid candidates: ${[candidate1, candidate2].filter(c => c !== null).join(", ") || "None"}`,
    `We counted the actual votes! Only candidates with more than ${threshold} votes survive.`,
    "complete"
  );

  return steps;
}
