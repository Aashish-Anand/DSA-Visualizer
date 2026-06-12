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
};
