import type { VisualizationStep, CountingSortState } from "@/types";

export function generateCountingSortSteps(
  inputArray: number[]
): VisualizationStep<CountingSortState>[] {
  const steps: VisualizationStep<CountingSortState>[] = [];
  const array = [...inputArray];
  const max_val = Math.max(...array, 1);
  
  // Initialize state arrays
  const countArray = Array(max_val + 1).fill(0);
  const outputArray: (number | null)[] = Array(array.length).fill(null);
  const sortedIndices: number[] = [];

  const createBaseState = (
    phase: CountingSortState["phase"] = "counting",
    currentIndex: number | null = null,
    highlightedCountIndex: number | null = null,
  ): CountingSortState => ({
    inputArray: [...array],
    countArray: [...countArray],
    outputArray: [...outputArray],
    currentIndex,
    highlightedCountIndex,
    phase,
    sortedIndices: [...sortedIndices],
    maxValue: max_val
  });

  steps.push({
    state: createBaseState("counting", null, null),
    activeLine: 0,
    explanation: `Starting Counting Sort. This works well when we know the maximum value in our array (here it's ${max_val}).`,
    beginnerExplanation: `Let's sort by counting! Since the biggest number is ${max_val}, we'll make a list to count how many times we see each number from 0 to ${max_val}.`,
  });

  steps.push({
    state: createBaseState("counting", null, null),
    activeLine: 2,
    explanation: `Created a count array of size ${max_val + 1} initialized to 0.`,
    beginnerExplanation: `Here is our empty count list. Every slot from 0 to ${max_val} starts at zero.`,
  });

  // Step 1: Count frequencies
  for (let i = 0; i < array.length; i++) {
    const num = array[i];
    
    steps.push({
      state: createBaseState("counting", i, num),
      activeLine: 4,
      explanation: `Read ${num} from input array. Incrementing countArray[${num}].`,
      beginnerExplanation: `We found a ${num}! Let's add 1 to the count for ${num}.`,
    });
    
    countArray[num]++;
    
    steps.push({
      state: createBaseState("counting", i, num),
      activeLine: 5,
      explanation: `countArray[${num}] is now ${countArray[num]}.`,
      beginnerExplanation: `We've seen the number ${num} a total of ${countArray[num]} times now.`,
    });
  }

  // Step 2: Accumulate counts (prefix sum)
  steps.push({
    state: createBaseState("accumulating", null, null),
    activeLine: 6,
    explanation: `Now modifying count array such that each element at index i stores the sum of previous counts.`,
    beginnerExplanation: `Now for some math! We'll add up the counts so each slot tells us EXACTLY where that number should go in the final sorted list.`,
  });

  for (let i = 1; i <= max_val; i++) {
    steps.push({
      state: createBaseState("accumulating", null, i),
      activeLine: 7,
      explanation: `Adding countArray[${i - 1}] (${countArray[i-1]}) to countArray[${i}] (${countArray[i]}).`,
      beginnerExplanation: `Let's add the total so far to slot ${i}.`,
    });
    
    countArray[i] += countArray[i - 1];
    
    steps.push({
      state: createBaseState("accumulating", null, i),
      activeLine: 7,
      explanation: `countArray[${i}] is now ${countArray[i]}. This means numbers <= ${i} will occupy indices 0 to ${countArray[i] - 1}.`,
      beginnerExplanation: `Slot ${i} is now ${countArray[i]}. This means the last ${i} we see should go at position ${countArray[i] - 1}!`,
    });
  }

  // Step 3: Build output array (going backwards for stability)
  steps.push({
    state: createBaseState("placing", null, null),
    activeLine: 8,
    explanation: `Building the output array. We iterate the input array backwards to maintain stability.`,
    beginnerExplanation: `Time to put everything in its sorted place! We'll read our input backwards and use our count list to know exactly where to put each number.`,
  });

  for (let i = array.length - 1; i >= 0; i--) {
    const num = array[i];
    
    steps.push({
      state: createBaseState("placing", i, num),
      activeLine: 9,
      explanation: `Looking at arr[${i}] = ${num}. countArray[${num}] is ${countArray[num]}.`,
      beginnerExplanation: `We picked up a ${num}. Let's look at slot ${num} in our count list. It says ${countArray[num]}!`,
    });
    
    const outputIndex = countArray[num] - 1;
    
    steps.push({
      state: createBaseState("placing", i, num),
      activeLine: 10,
      explanation: `Placing ${num} at index ${outputIndex} in the output array.`,
      beginnerExplanation: `Since it says ${countArray[num]}, this ${num} belongs at position ${outputIndex} in the final list.`,
    });
    
    outputArray[outputIndex] = num;
    sortedIndices.push(outputIndex); // Technically placed in final spot, but we won't highlight green yet to avoid confusion
    
    steps.push({
      state: createBaseState("placing", outputIndex, num), // highlight output index as 'current' visually
      activeLine: 11,
      explanation: `Decremeting countArray[${num}] so the next ${num} is placed one position to the left.`,
      beginnerExplanation: `We put it there! Now we decrease the count for ${num} by 1, so if we see another ${num}, it goes right next to it.`,
    });
    
    countArray[num]--;
  }

  steps.push({
    state: {
      ...createBaseState("complete", null, null),
      sortedIndices: Array.from({length: array.length}, (_, i) => i) // Now mark all sorted
    },
    activeLine: 12,
    explanation: `Counting Sort complete! The output array is the final sorted array.`,
    beginnerExplanation: `We did it! 🎉 The output array is completely sorted!`,
  });

  return steps;
}

export function generateCountingSortArray(size: number): number[] {
  // Counting sort works best with a small range of values
  return Array.from({ length: size }, () => Math.floor(Math.random() * 15) + 1);
}
