import type { VisualizationStep, MergeSortState, MergeSortSubarray, ComplexityMetrics } from "@/types";

export function generateMergeSortSteps(
  inputArray: number[]
): VisualizationStep<MergeSortState>[] {
  const steps: VisualizationStep<MergeSortState>[] = [];
  const array = [...inputArray];
  const n = array.length;
  const sortedIndices: number[] = [];

  let comparisons = 0;
  let operations = 0;

  const getMetrics = (): ComplexityMetrics => ({
    comparisons,
    operations,
  });

  // Tree representation of current split state
  let currentSubarrays: MergeSortSubarray[] = [{
    startIndex: 0,
    endIndex: n - 1,
    values: [...array],
    isSorted: false
  }];

  const createBaseState = (
    phase: MergeSortState["phase"] = "splitting",
    activeSubarray: number | null = null,
    mergingIndices: number[] = [],
    depth: number = 0
  ): MergeSortState => ({
    array: [...array],
    subarrays: JSON.parse(JSON.stringify(currentSubarrays)), // deep copy
    activeSubarray,
    mergingIndices,
    sortedIndices: [...sortedIndices],
    depth,
    phase
  });

  steps.push({
    state: createBaseState("splitting", 0),
    activeLine: 0,
    explanation: `Starting Merge Sort. We will recursively divide the array in half until we have subarrays of size 1.`,
    beginnerExplanation: `Merge sort works by breaking the problem down! We'll split the array in half again and again until we just have single numbers.`,
    complexityMetrics: getMetrics(),
  });

  function merge(left: number, mid: number, right: number, depth: number) {
    const leftSize = mid - left + 1;
    const rightSize = right - mid;
    
    operations += leftSize + rightSize; // Array slice cost essentially
    const leftArr = array.slice(left, mid + 1);
    const rightArr = array.slice(mid + 1, right + 1);

    // Find the subarrays we are merging and update view to show them
    currentSubarrays = currentSubarrays.filter(sub => 
      !(sub.startIndex >= left && sub.endIndex <= right)
    );
    
    currentSubarrays.push({
      startIndex: left,
      endIndex: mid,
      values: [...leftArr],
      isSorted: true
    });
    currentSubarrays.push({
      startIndex: mid + 1,
      endIndex: right,
      values: [...rightArr],
      isSorted: true
    });
    
    // Sort to keep them in visual order
    currentSubarrays.sort((a, b) => a.startIndex - b.startIndex);
    
    // Find index of the left one we just pushed
    const leftSubIdx = currentSubarrays.findIndex(sub => sub.startIndex === left);

    steps.push({
      state: createBaseState("merging", leftSubIdx, [], depth),
      activeLine: 7,
      explanation: `Merging two sorted subarrays: [${leftArr.join(", ")}] and [${rightArr.join(", ")}].`,
      beginnerExplanation: `Now we merge two small sorted groups into a bigger sorted group!`,
      complexityMetrics: getMetrics(),
    });

    let i = 0, j = 0, k = left;
    operations += 3;

    while (i < leftSize && j < rightSize) {
      operations++; // loop check
      const leftAbsIdx = left + i;
      const rightAbsIdx = mid + 1 + j;

      steps.push({
        state: createBaseState("merging", leftSubIdx, [leftAbsIdx, rightAbsIdx], depth),
        activeLine: 9,
        explanation: `Comparing leftArr[${i}] (${leftArr[i]}) and rightArr[${j}] (${rightArr[j]}).`,
        beginnerExplanation: `Which number is smaller: ${leftArr[i]} or ${rightArr[j]}?`,
        complexityMetrics: getMetrics(),
      });

      comparisons++;
      if (leftArr[i] <= rightArr[j]) {
        operations++;
        steps.push({
          state: createBaseState("merging", leftSubIdx, [leftAbsIdx], depth),
          activeLine: 11,
          explanation: `${leftArr[i]} is smaller. Placing it at index ${k}.`,
          beginnerExplanation: `${leftArr[i]} is smaller, so it goes next in our merged group.`,
          complexityMetrics: getMetrics(),
        });
        array[k] = leftArr[i];
        i++;
      } else {
        operations++;
        steps.push({
          state: createBaseState("merging", leftSubIdx + 1, [rightAbsIdx], depth),
          activeLine: 13,
          explanation: `${rightArr[j]} is smaller. Placing it at index ${k}.`,
          beginnerExplanation: `${rightArr[j]} is smaller, so it goes next in our merged group.`,
          complexityMetrics: getMetrics(),
        });
        array[k] = rightArr[j];
        j++;
      }
      
      // Update the main array view
      if (left === 0 && right === n - 1) {
        sortedIndices.push(k);
      }
      k++;
      operations++;
    }

    while (i < leftSize) {
      operations++; // loop check
      steps.push({
        state: createBaseState("merging", leftSubIdx, [left + i], depth),
        activeLine: 14,
        explanation: `Copying remaining element ${leftArr[i]} from left array.`,
        beginnerExplanation: `The right group is empty, so we just copy the rest of the left group.`,
        complexityMetrics: getMetrics(),
      });
      array[k] = leftArr[i];
      if (left === 0 && right === n - 1) sortedIndices.push(k);
      i++;
      k++;
      operations += 3;
    }

    while (j < rightSize) {
      operations++; // loop check
      steps.push({
        state: createBaseState("merging", leftSubIdx + 1, [mid + 1 + j], depth),
        activeLine: 14,
        explanation: `Copying remaining element ${rightArr[j]} from right array.`,
        beginnerExplanation: `The left group is empty, so we just copy the rest of the right group.`,
        complexityMetrics: getMetrics(),
      });
      array[k] = rightArr[j];
      if (left === 0 && right === n - 1) sortedIndices.push(k);
      j++;
      k++;
      operations += 3;
    }

    // Merge complete for this level, replace the two subarrays with the merged one
    currentSubarrays = currentSubarrays.filter(sub => 
      !(sub.startIndex >= left && sub.endIndex <= right)
    );
    currentSubarrays.push({
      startIndex: left,
      endIndex: right,
      values: array.slice(left, right + 1),
      isSorted: true
    });
    currentSubarrays.sort((a, b) => a.startIndex - b.startIndex);

    steps.push({
      state: createBaseState("merging", null, [], depth),
      activeLine: 5,
      explanation: `Merge complete for subarray ${left} to ${right}. Merged values: [${array.slice(left, right + 1).join(", ")}].`,
      beginnerExplanation: `Finished merging this group! It's now perfectly sorted.`,
      complexityMetrics: getMetrics(),
    });
  }

  function mergeSort(left: number, right: number, depth: number) {
    if (left >= right) {
      steps.push({
        state: createBaseState("splitting", null, [], depth),
        activeLine: 1,
        explanation: `Base case: Subarray of size 1 at index ${left} (${array[left]}) is naturally sorted.`,
        beginnerExplanation: `A single number by itself is already sorted!`,
        complexityMetrics: getMetrics(),
      });
      return;
    }

    const mid = Math.floor((left + right) / 2);

    // Visual split
    const currentSubIdx = currentSubarrays.findIndex(sub => sub.startIndex === left && sub.endIndex === right);
    if (currentSubIdx !== -1) {
       currentSubarrays.splice(currentSubIdx, 1);
       currentSubarrays.push({
         startIndex: left,
         endIndex: mid,
         values: array.slice(left, mid + 1),
         isSorted: left === mid
       });
       currentSubarrays.push({
         startIndex: mid + 1,
         endIndex: right,
         values: array.slice(mid + 1, right + 1),
         isSorted: mid + 1 === right
       });
       currentSubarrays.sort((a, b) => a.startIndex - b.startIndex);
    }

    steps.push({
      state: createBaseState("splitting", null, [], depth),
      activeLine: 2,
      explanation: `Splitting subarray [${left}..${right}] at mid point ${mid}.`,
      beginnerExplanation: `Let's slice this group into two smaller groups!`,
      complexityMetrics: getMetrics(),
    });

    mergeSort(left, mid, depth + 1);
    mergeSort(mid + 1, right, depth + 1);
    merge(left, mid, right, depth);
  }

  mergeSort(0, n - 1, 0);

  steps.push({
    state: createBaseState("complete", null, [], 0),
    activeLine: 0,
    explanation: `Merge Sort complete! The array is fully sorted.`,
    beginnerExplanation: `We did it! 🎉 By repeatedly merging smaller sorted groups, the whole array is now sorted!`,
    complexityMetrics: getMetrics(),
  });

  return steps;
}

export function runMergeSortExperiment(inputSize: number): ComplexityMetrics {
  const array = Array.from({ length: inputSize }, () => Math.random());
  
  let comparisons = 0;
  let operations = 0;

  function mergeExperiment(left: number, mid: number, right: number) {
    const leftSize = mid - left + 1;
    const rightSize = right - mid;
    
    operations += leftSize + rightSize; // temporary arrays creation conceptually
    const leftArr = array.slice(left, mid + 1);
    const rightArr = array.slice(mid + 1, right + 1);

    let i = 0, j = 0, k = left;
    operations += 3;

    while (i < leftSize && j < rightSize) {
      operations++;
      comparisons++;
      if (leftArr[i] <= rightArr[j]) {
        operations++;
        array[k] = leftArr[i];
        i++;
      } else {
        operations++;
        array[k] = rightArr[j];
        j++;
      }
      k++;
      operations++;
    }

    while (i < leftSize) {
      operations++;
      array[k] = leftArr[i];
      i++;
      k++;
      operations += 3;
    }

    while (j < rightSize) {
      operations++;
      array[k] = rightArr[j];
      j++;
      k++;
      operations += 3;
    }
  }

  function mergeSortExperiment(left: number, right: number) {
    if (left >= right) return;
    
    const mid = Math.floor((left + right) / 2);
    operations++; // midpoint calculation

    mergeSortExperiment(left, mid);
    mergeSortExperiment(mid + 1, right);
    mergeExperiment(left, mid, right);
  }

  mergeSortExperiment(0, array.length - 1);

  return { comparisons, operations };
}
