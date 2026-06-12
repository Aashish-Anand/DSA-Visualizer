import type { VisualizationStep, StockBuySellState } from "@/types";

export function generateStockArray(size: number = 8): number[] {
  // Generate array with realistic positive stock prices
  return Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10); // 10 to 100
}

export function generateStockBuySellSteps(
  prices: number[]
): VisualizationStep<StockBuySellState>[] {
  const steps: VisualizationStep<StockBuySellState>[] = [];

  let minPriceIndex: number | null = null;
  let maxProfit = 0;
  let buyIndex: number | null = null;
  let sellIndex: number | null = null;

  // Helper to push state
  const pushStep = (
    activeLine: number,
    explanation: string,
    beginnerExplanation: string,
    phase: StockBuySellState["phase"],
    currentIndex: number | null = null,
    currentProfit: number | null = null
  ) => {
    steps.push({
      state: {
        prices: [...prices],
        currentIndex,
        minPriceIndex,
        buyIndex,
        sellIndex,
        maxProfit,
        currentProfit,
        phase,
      },
      activeLine,
      explanation,
      beginnerExplanation,
    });
  };

  // Init
  pushStep(
    0,
    "Initialize minPrice to Infinity and maxProfit to 0.",
    "We start by assuming we haven't found any price to buy at, and our profit is zero.",
    "init"
  );

  for (let i = 0; i < prices.length; i++) {
    const currentPrice = prices[i];

    pushStep(
      3,
      `Examining price at day ${i} (Price = ${currentPrice}).`,
      `We look at the stock price on day ${i}. It is $${currentPrice}.`,
      "scanning",
      i,
      minPriceIndex !== null ? currentPrice - prices[minPriceIndex] : null
    );

    if (minPriceIndex === null || currentPrice < prices[minPriceIndex]) {
      minPriceIndex = i;
      pushStep(
        5,
        `Price ${currentPrice} is less than the current minimum. Update minPrice.`,
        `This is the lowest price we've seen so far! We would ideally want to buy on this day.`,
        "found-new-min",
        i
      );
    } else {
      const profitIfSoldToday = currentPrice - prices[minPriceIndex];
      pushStep(
        6,
        `Calculate profit if bought at minimum and sold today: ${currentPrice} - ${prices[minPriceIndex]} = ${profitIfSoldToday}`,
        `If we bought at our lowest past price and sold today, we would make $${profitIfSoldToday}.`,
        "scanning",
        i,
        profitIfSoldToday
      );

      if (profitIfSoldToday > maxProfit) {
        maxProfit = profitIfSoldToday;
        buyIndex = minPriceIndex;
        sellIndex = i;
        pushStep(
          7,
          `New maximum profit found: ${maxProfit}.`,
          `This is the best profit we've found so far! We record this combination.`,
          "found-new-max-profit",
          i,
          profitIfSoldToday
        );
      }
    }
  }

  pushStep(
    8,
    `Finished scanning all days. Maximum profit is ${maxProfit}.`,
    `We've looked at all the days. The absolute best profit we can make is $${maxProfit}.`,
    "complete"
  );

  return steps;
}
