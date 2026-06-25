import type { AlgorithmConfig } from "@/types";

export const stockBuySellConfig: AlgorithmConfig = {
  id: "stock-buy-sell",
  title: "Stock Buy and Sell",
  category: "Arrays",
  categoryIcon: "arrays",
  difficulty: "Medium",
  description:
    "You are given an array of prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve.",
  pseudocode: [
    { code: "function maxProfit(prices):", indent: 0 },
    { code: "minPrice = Infinity", indent: 1 },
    { code: "maxProfit = 0", indent: 1 },
    { code: "for each price in prices:", indent: 1 },
    { code: "if price < minPrice:", indent: 2 },
    { code: "minPrice = price", indent: 3 },
    { code: "else if price - minPrice > maxProfit:", indent: 2 },
    { code: "maxProfit = price - minPrice", indent: 3 },
    { code: "return maxProfit", indent: 1 },
  ],
  problemContext: {
    statement: "You are given an array `prices` where `prices[i]` is the price of a given stock on the `i`th day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve. If no profit can be achieved, return `0`.",
    examples: [
      {
        input: "prices = [7, 1, 5, 3, 6, 4]",
        output: "5",
        explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5."
      },
      {
        input: "prices = [7, 6, 4, 3, 1]",
        output: "0",
        explanation: "Prices are strictly decreasing. In this case, no transaction is done, and the max profit is 0."
      }
    ],
    intuitionPrompt: "To maximize profit, you want to buy at the lowest possible price before selling. As you move through the days, keep track of the absolute minimum price seen so far. For every day, see what the profit would be if you sold at today's price minus that minimum price!",
    approaches: [
      {
        name: "Brute Force (Check All Pairs)",
        complexity: "O(N²)",
        spaceComplexity: "O(1)",
        isOptimal: false,
        description: "Use two nested loops. For every buying day `i`, check every possible future selling day `j` (where `j > i`). Calculate `prices[j] - prices[i]` and track the maximum profit."
      },
      {
        name: "One Pass (Running Minimum)",
        complexity: "O(N)",
        spaceComplexity: "O(1)",
        isOptimal: true,
        description: "Traverse the array once. Maintain `minPrice` (the lowest price encountered so far) and `maxProfit`. On each day, update `minPrice` if today's price is lower, or update `maxProfit` if today's price minus `minPrice` is greater than the current `maxProfit`."
      }
    ],
    realWorldApplications: [
      "Algorithmic Trading & Arbitrage: Identifying optimal historical trade entry and exit windows for backtesting high-frequency trading strategies.",
      "Commodity Inventory Management: Deciding when to purchase raw materials and when to sell finished goods to maximize profit margins over time.",
      "Resource Allocation: Optimizing computing resource procurement when cloud spot prices fluctuate dynamically."
    ],
    patterns: ["Prefix Minimum", "Array", "Greedy", "Single Pass"]
  },
};
