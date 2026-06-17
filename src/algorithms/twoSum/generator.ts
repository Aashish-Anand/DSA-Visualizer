import type { VisualizationStep, TwoSumState } from "@/types";

/**
 * Generates a complete sequence of visualization steps for the Two Sum algorithm
 * using the hashmap approach.
 */
export function generateTwoSumSteps(
  nums: number[],
  target: number
): VisualizationStep<TwoSumState>[] {
  const steps: VisualizationStep<TwoSumState>[] = [];
  const hashMap = new Map<number, number>();
  const checkedIndices: number[] = [];

  // Initial state
  steps.push({
    state: {
      array: [...nums],
      target,
      currentIndex: -1,
      currentNumber: 0,
      complement: 0,
      hashMap: new Map(hashMap),
      highlightedIndex: null,
      foundPair: null,
      phase: "init",
      checkedIndices: [],
    },
    activeLine: 0,
    explanation: `Starting Two Sum. Array: [${nums.join(", ")}], Target: ${target}. We'll use a HashMap to find two numbers that add up to ${target}.`,
    beginnerExplanation: `We need to find two numbers in [${nums.join(", ")}] that add up to ${target}. Instead of checking every pair (which would be slow), we'll use a clever trick with a HashMap! 🧠`,
  });

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    const complement = target - num;

    // Scanning step — highlight current element
    steps.push({
      state: {
        array: [...nums],
        target,
        currentIndex: i,
        currentNumber: num,
        complement: 0,
        hashMap: new Map(hashMap),
        highlightedIndex: null,
        foundPair: null,
        phase: "scanning",
        checkedIndices: [...checkedIndices],
      },
      activeLine: 1,
      explanation: `Looking at index ${i}: value is ${num}.`,
      beginnerExplanation: `Let's look at the number at position ${i}. It's ${num}! 👀`,
    });

    // Computing complement
    steps.push({
      state: {
        array: [...nums],
        target,
        currentIndex: i,
        currentNumber: num,
        complement,
        hashMap: new Map(hashMap),
        highlightedIndex: null,
        foundPair: null,
        phase: "computing",
        checkedIndices: [...checkedIndices],
      },
      activeLine: 2,
      explanation: `Complement needed: ${target} - ${num} = ${complement}. Checking if ${complement} exists in the HashMap.`,
      beginnerExplanation: `If we have ${num}, what other number do we need to reach ${target}? That's ${target} - ${num} = ${complement}. Let's check if we've already seen ${complement}!`,
      dryRunPrompt: {
        question: `The current number is ${num} and our target is ${target}. What number must we find in our HashMap to solve the problem?`,
        options: [
          `${num}`,
          `${target}`,
          `${complement} (Target - Current)`,
          `0`
        ],
        correctOptionIndex: 2
      }
    });

    if (hashMap.has(complement)) {
      // Found the pair!
      const complementIndex = hashMap.get(complement)!;

      steps.push({
        state: {
          array: [...nums],
          target,
          currentIndex: i,
          currentNumber: num,
          complement,
          hashMap: new Map(hashMap),
          highlightedIndex: complementIndex,
          foundPair: [complementIndex, i],
          phase: "found",
          checkedIndices: [...checkedIndices],
        },
        activeLine: 3,
        explanation: `Found ${complement} at index ${complementIndex} in the HashMap! The pair is [${complementIndex}, ${i}] → (${nums[complementIndex]} + ${num} = ${target}).`,
        beginnerExplanation: `YES! We found ${complement} in our HashMap at position ${complementIndex}! 🎉 So ${nums[complementIndex]} + ${num} = ${target}. The answer is indices [${complementIndex}, ${i}]!`,
      });

      // Complete state
      steps.push({
        state: {
          array: [...nums],
          target,
          currentIndex: i,
          currentNumber: num,
          complement,
          hashMap: new Map(hashMap),
          highlightedIndex: complementIndex,
          foundPair: [complementIndex, i],
          phase: "complete",
          checkedIndices: [...checkedIndices],
        },
        activeLine: 4,
        explanation: `Two Sum solved! Answer: [${complementIndex}, ${i}]. Values: ${nums[complementIndex]} + ${num} = ${target}.`,
        beginnerExplanation: `We solved it! 🏆 The two numbers that add up to ${target} are ${nums[complementIndex]} (at position ${complementIndex}) and ${num} (at position ${i}). The HashMap trick saved us from checking every possible pair!`,
      });

      return steps;
    }

    // Not found in map
    steps.push({
      state: {
        array: [...nums],
        target,
        currentIndex: i,
        currentNumber: num,
        complement,
        hashMap: new Map(hashMap),
        highlightedIndex: null,
        foundPair: null,
        phase: "not-in-map",
        checkedIndices: [...checkedIndices],
      },
      activeLine: 3,
      explanation: `${complement} is not in the HashMap yet. We haven't seen our complement.`,
      beginnerExplanation: `Hmm, ${complement} is not in our HashMap yet. That means we haven't seen it before. No match yet! 🤔`,
    });

    // Add current to hashmap
    hashMap.set(num, i);
    checkedIndices.push(i);

    steps.push({
      state: {
        array: [...nums],
        target,
        currentIndex: i,
        currentNumber: num,
        complement,
        hashMap: new Map(hashMap),
        highlightedIndex: null,
        foundPair: null,
        phase: "adding",
        checkedIndices: [...checkedIndices],
      },
      activeLine: 5,
      explanation: `Adding ${num} → ${i} to the HashMap. HashMap now has ${hashMap.size} ${hashMap.size === 1 ? "entry" : "entries"}.`,
      beginnerExplanation: `Let's remember this number! We'll store "${num} is at position ${i}" in our HashMap. This way, if a future number needs ${num} as its complement, we'll find it instantly! 📝`,
    });
  }

  // No solution found (edge case)
  steps.push({
    state: {
      array: [...nums],
      target,
      currentIndex: nums.length,
      currentNumber: 0,
      complement: 0,
      hashMap: new Map(hashMap),
      highlightedIndex: null,
      foundPair: null,
      phase: "complete",
      checkedIndices: [...checkedIndices],
    },
    activeLine: 6,
    explanation: `No two numbers sum to ${target}. No solution exists for this input.`,
    beginnerExplanation: `We checked every number but couldn't find a pair that adds up to ${target}. There's no solution for this input! 😢`,
  });

  return steps;
}

/**
 * Generate a random Two Sum input that's guaranteed to have a solution.
 */
export function generateRandomTwoSumInput(size: number = 6): {
  nums: number[];
  target: number;
} {
  const nums: number[] = [];
  // Generate random numbers
  for (let i = 0; i < size; i++) {
    nums.push(Math.floor(Math.random() * 20) + 1);
  }
  // Pick two random distinct indices to form the answer
  const idx1 = Math.floor(Math.random() * size);
  let idx2 = Math.floor(Math.random() * (size - 1));
  if (idx2 >= idx1) idx2++;
  const target = nums[idx1] + nums[idx2];
  return { nums, target };
}
