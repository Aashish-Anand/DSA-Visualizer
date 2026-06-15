import type { TwoPointersState, VisualizationStep } from "@/types";

export function generateRandomThreeSumInput(length: number = 8) {
  // Generate array with duplicates to show duplicate skipping
  const arr = Array.from({ length }, () => Math.floor(Math.random() * 20) - 10);
  // Guarantee at least one zero sum triplet often
  if (Math.random() > 0.3) {
    arr[0] = -5;
    arr[1] = 2;
    arr[2] = 3;
  }
  return { nums: arr, target: 0 };
}

export function generateThreeSumSteps(
  nums: number[],
  target: number = 0
): VisualizationStep<TwoPointersState>[] {
  const steps: VisualizationStep<TwoPointersState>[] = [];
  const foundSets: number[][] = [];
  const array = [...nums];

  const pushStep = (
    phase: TwoPointersState["phase"],
    i: number | null,
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
        pointers: { i, j: null, left, right },
        currentSum,
        foundSets: [...foundSets],
        phase,
      },
      activeLine,
      explanation,
      beginnerExplanation,
    });
  };

  // Initial state
  pushStep("init", null, null, null, null, 0, "Function initialized with array.", "We start with a list of numbers.");

  // Sort array (instantaneous)
  array.sort((a, b) => a - b);
  pushStep("sorting", null, null, null, null, 1, "Array sorted in ascending order. This allows us to use the two-pointer technique.", "We sort the numbers from smallest to largest to make searching easier.");

  const n = array.length;
  for (let i = 0; i < n - 2; i++) {
    pushStep("outer-loop", i, null, null, null, 2, `Outer loop: setting fixed pointer i at index ${i} (value: ${array[i]}).`, `We pick the first number, ${array[i]}, and hold it in place.`);

    if (i > 0 && array[i] === array[i - 1]) {
      pushStep("skipping-duplicates", i, null, null, null, 3, `Skipping duplicate for fixed pointer i at index ${i}.`, `We've seen ${array[i]} before, so we skip it to avoid duplicate triplets.`);
      continue;
    }

    let left = i + 1;
    let right = n - 1;

    pushStep("init", i, left, null, null, 4, `Initialize left pointer at index ${left}.`, `We place a 'left' pointer right after our fixed number.`);
    pushStep("init", i, left, right, null, 5, `Initialize right pointer at the end of the array (index ${right}).`, `We place a 'right' pointer at the very end of the list.`);

    while (left < right) {
      const sum = array[i] + array[left] + array[right];
      
      pushStep("checking-sum", i, left, right, sum, 7, `Calculate sum: ${array[i]} + ${array[left]} + ${array[right]} = ${sum}.`, `We add the three numbers together. The sum is ${sum}.`);

      if (sum === target) {
        foundSets.push([array[i], array[left], array[right]]);
        pushStep("found", i, left, right, sum, 8, `Sum equals target (${target})! Found a valid triplet.`, `Bingo! The numbers add up exactly to ${target}. We save this triplet.`);
        pushStep("found", i, left, right, sum, 9, `Adding triplet [${array[i]}, ${array[left]}, ${array[right]}] to results.`, `We add the triplet to our collection of found answers.`);
        
        left++;
        right--;
        pushStep("moving-left", i, left, right, null, 10, `Move both pointers inward to find more triplets.`, `We move both pointers closer to the middle to keep searching.`);

        while (left < right && array[left] === array[left - 1]) {
          pushStep("skipping-duplicates", i, left, right, null, 11, `Skipping duplicate for left pointer at index ${left}.`, `We skip duplicate numbers to avoid getting the same triplet again.`);
          left++;
        }
        while (left < right && array[right] === array[right + 1]) {
          pushStep("skipping-duplicates", i, left, right, null, 12, `Skipping duplicate for right pointer at index ${right}.`, `We skip duplicate numbers on the right side too.`);
          right--;
        }
      } else if (sum < target) {
        pushStep("moving-left", i, left, right, sum, 13, `Sum (${sum}) is less than target (${target}).`, `The sum is too small.`);
        left++;
        pushStep("moving-left", i, left, right, null, 14, `Moving left pointer rightward to increase the sum.`, `Because the array is sorted, moving the left pointer to the right gives us a bigger number.`);
      } else {
        pushStep("moving-right", i, left, right, sum, 15, `Sum (${sum}) is greater than target (${target}).`, `The sum is too large.`);
        right--;
        pushStep("moving-right", i, left, right, null, 16, `Moving right pointer leftward to decrease the sum.`, `Because the array is sorted, moving the right pointer to the left gives us a smaller number.`);
      }
    }
  }

  pushStep("complete", null, null, null, null, 17, `Finished scanning array. Found ${foundSets.length} triplets.`, `We're done! We found all sets of three numbers that add up to ${target}.`);

  return steps;
}
