import type { WaterState, VisualizationStep, ComplexityMetrics } from "@/types";

export function generateRandomContainerInput(length: number = 10): number[] {
  // Generate random heights between 1 and 10
  return Array.from({ length }, () => Math.floor(Math.random() * 9) + 1);
}

export function generateContainerSteps(
  heights: number[]
): VisualizationStep<WaterState>[] {
  const steps: VisualizationStep<WaterState>[] = [];
  const array = [...heights];

  let maxArea = 0;
  let bestLeft: number | null = null;
  let bestRight: number | null = null;

  let comparisons = 0;
  let operations = 0;

  const getMetrics = (): ComplexityMetrics => ({
    comparisons,
    operations,
  });

  const pushStep = (
    phase: WaterState["phase"],
    left: number | null,
    right: number | null,
    currentArea: number | null,
    activeLine: number,
    explanation: string,
    beginnerExplanation: string
  ) => {
    steps.push({
      state: {
        type: "container",
        heights: [...array],
        left,
        right,
        currentArea,
        maxArea,
        bestLeft,
        bestRight,
        leftMax: 0,
        rightMax: 0,
        waterLevels: [],
        totalWater: 0,
        phase,
      },
      activeLine,
      explanation,
      beginnerExplanation,
      complexityMetrics: getMetrics(),
    });
  };

  pushStep("init", null, null, null, 0, "Function initialized with array of heights.", "We start with a list of wall heights.");

  let left = 0;
  let right = array.length - 1;

  pushStep("init", left, null, null, 1, `Initialize left pointer at index ${left}.`, "We place the left pointer at the first wall.");
  pushStep("init", left, right, null, 2, `Initialize right pointer at index ${right}.`, "We place the right pointer at the last wall.");
  pushStep("init", left, right, null, 3, `Initialize max_area to 0.`, "We start our record for the largest area at 0.");

  while (left < right) {
    operations++;
    const width = right - left;
    pushStep("calculating-water", left, right, null, 5, `Width = right - left = ${right} - ${left} = ${width}.`, `The distance between the two walls is ${width}.`);

    comparisons++;
    const minHeight = Math.min(array[left], array[right]);
    pushStep("calculating-water", left, right, null, 6, `Current height = min(${array[left]}, ${array[right]}) = ${minHeight}.`, `The water can only go as high as the shorter wall, which is ${minHeight}.`);

    const currentArea = width * minHeight;
    pushStep("calculating-water", left, right, currentArea, 7, `Current area = ${width} * ${minHeight} = ${currentArea}.`, `The area of water trapped is ${width} times ${minHeight}, which equals ${currentArea}.`);

    comparisons++;
    if (currentArea > maxArea) {
      maxArea = currentArea;
      bestLeft = left;
      bestRight = right;
      pushStep("found-new-max", left, right, currentArea, 8, `New maximum area found: ${maxArea}. Updating best bounds.`, `We found a new personal best! The largest area so far is ${maxArea}.`);
    } else {
      pushStep("scanning", left, right, currentArea, 8, `Current area (${currentArea}) is not greater than max area (${maxArea}).`, `This area is not bigger than our record.`);
    }

    pushStep("scanning", left, right, currentArea, 9, `Comparing heights: left (${array[left]}) vs right (${array[right]}).`, "We check which wall is shorter.");

    comparisons++;
    if (array[left] < array[right]) {
      pushStep("moving-pointer", left, right, currentArea, 10, `Left height is smaller, so we increment left pointer to try and find a taller wall.`, "The left wall is shorter, so we move it inward hoping to find a taller one.");
      left++;
    } else {
      pushStep("moving-pointer", left, right, currentArea, 12, `Right height is smaller or equal, so we decrement right pointer to try and find a taller wall.`, "The right wall is shorter or equal, so we move it inward hoping to find a taller one.");
      right--;
    }
  }

  pushStep("complete", null, null, null, 13, `Pointers met. Maximum area found is ${maxArea} between indices ${bestLeft} and ${bestRight}.`, `We've checked all pairs. The biggest container holds ${maxArea} water!`);

  return steps;
}

export function runContainerExperiment(inputSize: number): ComplexityMetrics {
  const heights = generateRandomContainerInput(inputSize);
  
  let comparisons = 0;
  let operations = 0;
  
  let left = 0;
  let right = heights.length - 1;
  let maxArea = 0;

  while (left < right) {
    operations++;
    
    comparisons++;
    const h = heights[left] < heights[right] ? heights[left] : heights[right];
    
    const area = (right - left) * h;
    
    comparisons++;
    if (area > maxArea) {
      maxArea = area;
    }
    
    comparisons++;
    if (heights[left] < heights[right]) {
      left++;
    } else {
      right--;
    }
  }

  return { comparisons, operations };
}
