import type { WaterState, VisualizationStep } from "@/types";

export function generateRandomTrappingInput(length: number = 12) {
  // A classic test case is [0,1,0,2,1,0,1,3,2,1,2,1]
  if (Math.random() > 0.5) {
    return { nums: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1], target: 0 };
  }
  const arr = Array.from({ length }, () => Math.floor(Math.random() * 6));
  return { nums: arr, target: 0 };
}

export function generateTrappingRainWaterSteps(
  heights: number[]
): VisualizationStep<WaterState>[] {
  const steps: VisualizationStep<WaterState>[] = [];
  const array = [...heights];

  let leftMax = 0;
  let rightMax = 0;
  let totalWater = 0;
  const waterLevels = new Array(array.length).fill(0);

  const pushStep = (
    phase: WaterState["phase"],
    left: number | null,
    right: number | null,
    activeLine: number,
    explanation: string,
    beginnerExplanation: string
  ) => {
    steps.push({
      state: {
        type: "trapping",
        heights: [...array],
        left,
        right,
        currentArea: null,
        maxArea: 0,
        bestLeft: null,
        bestRight: null,
        leftMax,
        rightMax,
        waterLevels: [...waterLevels],
        totalWater,
        phase,
      },
      activeLine,
      explanation,
      beginnerExplanation,
    });
  };

  pushStep("init", null, null, 0, "Function initialized with array of heights.", "We start with a landscape of blocks.");

  let left = 0;
  let right = array.length - 1;

  pushStep("init", left, right, 1, `Initialize pointers: left = 0, right = ${right}.`, "We place pointers at both ends of our landscape.");
  pushStep("init", left, right, 3, `Initialize leftMax = 0 and rightMax = 0.`, "We'll keep track of the highest walls we've seen on the left and right.");

  while (left < right) {
    pushStep("scanning", left, right, 6, `Comparing height[left] (${array[left]}) and height[right] (${array[right]}).`, "We look at the walls at our two pointers to see which is shorter.");

    if (array[left] < array[right]) {
      pushStep("scanning", left, right, 7, `height[left] < height[right]. We process the left side because it's the limiting factor.`, "The left wall is shorter, so it controls how much water can be trapped here.");
      
      if (array[left] >= leftMax) {
        leftMax = array[left];
        pushStep("found-new-max", left, right, 9, `height[left] >= leftMax. Update leftMax to ${leftMax}. Cannot trap water here.`, "This is the tallest wall we've seen on the left so far, so water would just spill over. We record its height.");
      } else {
        const trapped = leftMax - array[left];
        totalWater += trapped;
        waterLevels[left] = trapped;
        pushStep("calculating-water", left, right, 11, `height[left] < leftMax. Water trapped = leftMax (${leftMax}) - height (${array[left]}) = ${trapped}. Total = ${totalWater}.`, `We found a dip! Water fills it up to the tallest left wall we've seen. We trap ${trapped} units of water.`);
      }
      left++;
      pushStep("moving-pointer", left, right, 12, `Increment left pointer.`, "Move the left pointer one step to the right.");
    } else {
      pushStep("scanning", left, right, 13, `height[right] <= height[left]. We process the right side.`, "The right wall is shorter (or equal), so it controls the water here.");
      
      if (array[right] >= rightMax) {
        rightMax = array[right];
        pushStep("found-new-max", left, right, 15, `height[right] >= rightMax. Update rightMax to ${rightMax}. Cannot trap water here.`, "This is the tallest wall we've seen on the right so far. We record its height.");
      } else {
        const trapped = rightMax - array[right];
        totalWater += trapped;
        waterLevels[right] = trapped;
        pushStep("calculating-water", left, right, 17, `height[right] < rightMax. Water trapped = rightMax (${rightMax}) - height (${array[right]}) = ${trapped}. Total = ${totalWater}.`, `We found a dip! Water fills it up to the tallest right wall we've seen. We trap ${trapped} units of water.`);
      }
      right--;
      pushStep("moving-pointer", left, right, 18, `Decrement right pointer.`, "Move the right pointer one step to the left.");
    }
  }

  pushStep("complete", left, right, 19, `Pointers met. Total water trapped is ${totalWater}.`, `All done! The total amount of rain water trapped is ${totalWater}.`);

  return steps;
}
