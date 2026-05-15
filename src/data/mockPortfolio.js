export const mockPortfolio = {
  totalValue: 284750.42,
  dailyReturn: 3241.18,
  dailyReturnPct: 1.15,
  totalReturn: 54750.42,
  totalReturnPct: 23.8,
  cash: 12450.00,

  holdings: [
    {
      ticker: "AAPL",
      company: "Apple Inc.",
      shares: 120,
      avgCost: 152.30,
      currentPrice: 189.84,
      value: 22780.80,
      gain: 4500.48,
      gainPct: 24.67,
      weight: 8.0,
      sector: "Technology",
    },
    {
      ticker: "MSFT",
      company: "Microsoft Corp.",
      shares: 55,
      avgCost: 310.45,
      currentPrice: 415.32,
      value: 22842.60,
      gain: 5768.35,
      gainPct: 33.77,
      weight: 8.02,
      sector: "Technology",
    },
    {
      ticker: "NVDA",
      company: "NVIDIA Corp.",
      shares: 30,
      avgCost: 520.00,
      currentPrice: 875.40,
      value: 26262.00,
      gain: 10662.00,
      gainPct: 68.38,
      weight: 9.22,
      sector: "Technology",
    },
    {
      ticker: "GOOGL",
      company: "Alphabet Inc.",
      shares: 80,
      avgCost: 140.20,
      currentPrice: 175.98,
      value: 14078.40,
      gain: 2862.40,
      gainPct: 25.52,
      weight: 4.94,
      sector: "Communication Services",
    },
    {
      ticker: "AMZN",
      company: "Amazon.com Inc.",
      shares: 90,
      avgCost: 155.80,
      currentPrice: 192.45,
      value: 17320.50,
      gain: 3298.50,
      gainPct: 23.52,
      weight: 6.08,
      sector: "Consumer Discretionary",
    },
    {
      ticker: "META",
      company: "Meta Platforms Inc.",
      shares: 45,
      avgCost: 380.00,
      currentPrice: 512.67,
      value: 23070.15,
      gain: 5970.15,
      gainPct: 34.93,
      weight: 8.10,
      sector: "Communication Services",
    },
    {
      ticker: "JPM",
      company: "JPMorgan Chase",
      shares: 100,
      avgCost: 165.40,
      currentPrice: 198.76,
      value: 19876.00,
      gain: 3336.00,
      gainPct: 20.17,
      weight: 6.98,
      sector: "Financials",
    },
    {
      ticker: "V",
      company: "Visa Inc.",
      shares: 75,
      avgCost: 230.10,
      currentPrice: 278.34,
      value: 20875.50,
      gain: 3618.00,
      gainPct: 20.96,
      weight: 7.33,
      sector: "Financials",
    },
    {
      ticker: "UNH",
      company: "UnitedHealth Group",
      shares: 35,
      avgCost: 480.00,
      currentPrice: 521.90,
      value: 18266.50,
      gain: 1466.50,
      gainPct: 8.73,
      weight: 6.41,
      sector: "Healthcare",
    },
    {
      ticker: "NFLX",
      company: "Netflix Inc.",
      shares: 40,
      avgCost: 520.00,
      currentPrice: 634.20,
      value: 25368.00,
      gain: 4568.00,
      gainPct: 21.96,
      weight: 8.91,
      sector: "Communication Services",
    },
  ],

  allocationByAsset: [
    { name: "Technology",             value: 35.2, color: "#3B82F6" },
    { name: "Communication Services", value: 22.0, color: "#8B5CF6" },
    { name: "Financials",             value: 14.3, color: "#22C55E" },
    { name: "Consumer Discretionary", value: 6.1,  color: "#F59E0B" },
    { name: "Healthcare",             value: 6.4,  color: "#EC4899" },
    { name: "Cash",                   value: 4.4,  color: "#6B7280" },
    { name: "Other",                  value: 11.6, color: "#14B8A6" },
  ],

  sectorExposure: [
    { sector: "Technology",             weight: 35.2 },
    { sector: "Communication Services", weight: 22.0 },
    { sector: "Financials",             weight: 14.3 },
    { sector: "Healthcare",             weight: 6.4  },
    { sector: "Consumer Discretionary", weight: 6.1  },
    { sector: "Cash",                   weight: 4.4  },
    { sector: "Other",                  weight: 11.6 },
  ],

  performanceHistory: generatePerformanceHistory(284750.42, 180),

  riskMetrics: {
    sharpeRatio: 1.84,
    beta: 1.12,
    alpha: 4.2,
    maxDrawdown: -12.4,
    volatility: 18.6,
    var95: -2.8,
  },
};

function generatePerformanceHistory(finalValue, days) {
  const data = [];
  let value = finalValue * 0.78;
  const benchmark = finalValue * 0.78;
  let benchValue = benchmark;
  const now = new Date();

  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    value = value * (1 + (Math.random() - 0.46) * 0.018);
    benchValue = benchValue * (1 + (Math.random() - 0.47) * 0.015);
    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      portfolio: parseFloat(value.toFixed(2)),
      benchmark: parseFloat(benchValue.toFixed(2)),
    });
  }
  data[data.length - 1].portfolio = finalValue;
  return data;
}
