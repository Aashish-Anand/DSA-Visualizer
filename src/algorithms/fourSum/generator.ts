import type { TwoPointersState, VisualizationStep, ComplexityMetrics } from "@/types";

export function generateRandomFourSumInput(length: number = 8) {
  const arr = Array.from({ length }, () => Math.floor(Math.random() * 20) - 10);
  // Guarantee at least one valid quadruplet
  if (Math.random() > 0.3) {
    arr[0] = 1;
    arr[1] = 0;
    arr[2] = -1;
    arr[3] = 0;
    arr[4] = -2;
    arr[5] = 2;
  }
  return { nums: arr, target: 0 };
}

export function generateFourSumSteps(
  nums: number[],
  target: number = 0
): VisualizationStep<TwoPointersState>[] {
  const steps: VisualizationStep<TwoPointersState>[] = [];
  const foundSets: number[][] = [];
  const array = [...nums];

  let comparisons = 0;
  let operations = 0;

  const getMetrics = (): ComplexityMetrics => ({
    comparisons,
    operations,
  });

  const pushStep = (
    phase: TwoPointersState["phase"],
    i: number | null,
    j: number | null,
    left: number | null,
    right: number | null,
    currentSum: number | null,
    activeLine: number,
    explanation: string,
    beginnerExplanation: string
  ) => {
    steps.push({
      state: {
        array: [...array],
        target,
        pointers: { i, j, left, right },
        currentSum,
        foundSets: [...foundSets],
        phase,
      },
      activeLine,
      explanation,
      beginnerExplanation,
      complexityMetrics: getMetrics(),
    });
  };

  // Initial state
  pushStep("init", null, null, null, null, null, 0, "Function initialized with array.", "We start with a list of numbers.");

  // Sort array
  const nLogN = Math.floor(array.length * Math.log2(array.length));
  comparisons += nLogN;
  operations += nLogN;
  
  array.sort((a, b) => a - b);
  pushStep("sorting", null, null, null, null, null, 1, "Array sorted in ascending order.", "We sort the numbers from smallest to largest.");

  const n = array.length;
  for (let i = 0; i < n - 3; i++) {
    operations++;
    pushStep("outer-loop", i, null, null, null, null, 2, `Outer loop 1: setting fixed pointer i at index ${i} (value: ${array[i]}).`, `We pick our first number, ${array[i]}, and hold it in place.`);

    comparisons++;
    if (i > 0 && array[i] === array[i - 1]) {
      pushStep("skipping-duplicates", i, null, null, null, null, 3, `Skipping duplicate for fixed pointer i at index ${i}.`, `We've seen ${array[i]} before as our first number, so we skip it to avoid duplicate sets.`);
      continue;
    }

    for (let j = i + 1; j < n - 2; j++) {
      operations++;
      pushStep("inner-loop", i, j, null, null, null, 4, `Outer loop 2: setting fixed pointer j at index ${j} (value: ${array[j]}).`, `We pick our second number, ${array[j]}, and hold it in place alongside the first.`);

      comparisons++;
      if (j > i + 1 && array[j] === array[j - 1]) {
        pushStep("skipping-duplicates", i, j, null, null, null, 5, `Skipping duplicate for fixed pointer j at index ${j}.`, `We've seen ${array[j]} before as our second number, so we skip it.`);
        continue;
      }

      let left = j + 1;
      let right = n - 1;

      pushStep("init", i, j, left, null, null, 6, `Initialize left pointer at index ${left}.`, `We place a 'left' pointer right after our second number.`);
      pushStep("init", i, j, left, right, null, 7, `Initialize right pointer at the end (index ${right}).`, `We place a 'right' pointer at the very end.`);

      while (left < right) {
        operations++;
        const sum = array[i] + array[j] + array[left] + array[right];
        
        pushStep("checking-sum", i, j, left, right, sum, 9, `Calculate sum: ${array[i]} + ${array[j]} + ${array[left]} + ${array[right]} = ${sum}.`, `We add the four numbers together. The sum is ${sum}.`);

        comparisons++;
        if (sum === target) {
          foundSets.push([array[i], array[j], array[left], array[right]]);
          pushStep("found", i, j, left, right, sum, 10, `Sum equals target (${target})! Found a valid quadruplet.`, `Bingo! The four numbers add up exactly to ${target}.`);
          pushStep("found", i, j, left, right, sum, 11, `Adding quadruplet to results.`, `We save this quadruplet.`);
          
          left++;
          right--;
          pushStep("moving-left", i, j, left, right, null, 12, `Move both pointers inward to find more sets.`, `We move both searching pointers closer to the middle.`);

          while (left < right && array[left] === array[left - 1]) {
            comparisons++;
            operations++;
            pushStep("skipping-duplicates", i, j, left, right, null, 13, `Skipping duplicate for left pointer.`, `We skip duplicate numbers on the left.`);
            left++;
          }
          while (left < right && array[right] === array[right + 1]) {
            comparisons++;
            operations++;
            pushStep("skipping-duplicates", i, j, left, right, null, 14, `Skipping duplicate for right pointer.`, `We skip duplicate numbers on the right.`);
            right--;
          }
        } else if (sum < target) {
          comparisons++;
          pushStep("moving-left", i, j, left, right, sum, 15, `Sum (${sum}) is less than target.`, `The sum is too small.`);
          left++;
          pushStep("moving-left", i, j, left, right, null, 16, `Moving left pointer rightward.`, `We move the left pointer to the right to get a bigger number.`);
        } else {
          comparisons++;
          pushStep("moving-right", i, j, left, right, sum, 17, `Sum (${sum}) is greater than target.`, `The sum is too large.`);
          right--;
          pushStep("moving-right", i, j, left, right, null, 18, `Moving right pointer leftward.`, `We move the right pointer to the left to get a smaller number.`);
        }
      }
    }
  }

  pushStep("complete", null, null, null, null, null, 19, `Finished scanning array. Found ${foundSets.length} quadruplets.`, `We're done! We found all sets of four numbers that add up to ${target}.`);

  return steps;
}

export function runFourSumExperiment(inputSize: number): ComplexityMetrics {
  const { nums, target } = generateRandomFourSumInput(inputSize);
  
  let comparisons = 0;
  let operations = 0;

  const nLogN = Math.floor(nums.length * Math.log2(nums.length));
  comparisons += nLogN;
  operations += nLogN;
  
  nums.sort((a, b) => a - b);
  
  const n = nums.length;
  for (let i = 0; i < n - 3; i++) {
    operations++;
    
    comparisons++;
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    
    for (let j = i + 1; j < n - 2; j++) {
      operations++;
      
      comparisons++;
      if (j > i + 1 && nums[j] === nums[j - 1]) continue;
      
      let left = j + 1;
      let right = n - 1;
      
      while (left < right) {
        operations++;
        const sum = nums[i] + nums[j] + nums[left] + nums[right];
        
        comparisons++;
        if (sum === target) {
          left++;
          right--;
          
          while (left < right && nums[left] === nums[left - 1]) {
            comparisons++;
            operations++;
            left++;
          }
          while (left < right && nums[right] === nums[right + 1]) {
            comparisons++;
            operations++;
            right--;
          }
        } else if (sum < target) {
          comparisons++;
          left++;
        } else {
          comparisons++;
          right--;
        }
      }
    }
  }

  return { comparisons, operations };
}
