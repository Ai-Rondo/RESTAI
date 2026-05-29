export const inventoryRanges = ["Last 14 Days", "This Week", "Last Week", "This Month", "Custom"];

export const syncSources = [
  ["POS synced", "Today 4:08 AM"],
  ["Vendor invoices synced", "Today 3:42 AM"],
  ["Inventory count synced", "Yesterday 10:18 PM"],
  ["Recipe database synced", "Today 2:15 AM"]
];

export const foodCostTrend = [
  { date: "May 7", actual: 31.2, theoretical: 27.8, target: 28.5, waste: 235 },
  { date: "May 8", actual: 30.4, theoretical: 27.2, target: 28.5, waste: 210 },
  { date: "May 9", actual: 32.1, theoretical: 28.0, target: 28.5, waste: 305 },
  { date: "May 10", actual: 31.8, theoretical: 27.6, target: 28.5, waste: 290 },
  { date: "May 11", actual: 29.7, theoretical: 26.9, target: 28.5, waste: 185 },
  { date: "May 12", actual: 34.6, theoretical: 28.9, target: 28.5, waste: 610 },
  { date: "May 13", actual: 35.1, theoretical: 29.4, target: 28.5, waste: 665 },
  { date: "May 14", actual: 32.8, theoretical: 28.7, target: 28.5, waste: 340 },
  { date: "May 15", actual: 31.6, theoretical: 27.9, target: 28.5, waste: 255 },
  { date: "May 16", actual: 33.4, theoretical: 29.1, target: 28.5, waste: 390 },
  { date: "May 17", actual: 32.2, theoretical: 28.4, target: 28.5, waste: 315 },
  { date: "May 18", actual: 30.9, theoretical: 27.7, target: 28.5, waste: 205 },
  { date: "May 19", actual: 34.2, theoretical: 29.6, target: 28.5, waste: 540 },
  { date: "May 20", actual: 33.0, theoretical: 29.6, target: 28.5, waste: 360 }
];

export const inventoryKpis = [
  { label: "Actual Food Cost %", value: "33.0%", change: "+1.8 pts", status: "Watch", trend: [31, 30, 32, 35, 33, 34, 33] },
  { label: "Theoretical Food Cost %", value: "29.6%", change: "+0.7 pts", status: "Good", trend: [28, 27, 28, 29, 28, 30, 30] },
  { label: "Food Cost Variance", value: "3.4 pts", change: "+$2,840", status: "High Risk", trend: [2.9, 3.1, 4.1, 5.7, 4.3, 4.6, 3.4] },
  { label: "Total Inventory Value", value: "$31,840", change: "-$1,230", status: "Improving", trend: [34, 35, 33, 32, 33, 32, 31] },
  { label: "Purchases This Period", value: "$22,460", change: "+8.4%", status: "Watch", trend: [18, 19, 21, 22, 23, 21, 22] },
  { label: "Waste / Spoilage Cost", value: "$2,265", change: "+$740", status: "High Risk", trend: [190, 210, 305, 610, 665, 540, 360] },
  { label: "Menu Gross Margin", value: "68.2%", change: "-1.6 pts", status: "Watch", trend: [70, 69, 68, 67, 68, 67, 68] },
  { label: "Items Below Par", value: "7", change: "+3", status: "Watch", trend: [4, 3, 5, 7, 8, 7, 7] },
  { label: "Vendor Price Increases", value: "6", change: "+2", status: "High Risk", trend: [2, 3, 4, 6, 5, 6, 6] },
  { label: "Inventory Turnover", value: "5.7x", change: "+0.4x", status: "Good", trend: [4.8, 5.0, 5.2, 5.4, 5.3, 5.6, 5.7] },
  { label: "Days of Inventory On Hand", value: "8.8", change: "-0.9 days", status: "Improving", trend: [10, 9.8, 9.5, 9.4, 9.1, 8.9, 8.8] },
  { label: "Open Purchase Orders", value: "4", change: "+1", status: "Good", trend: [3, 4, 4, 5, 4, 3, 4] }
];

export const categoryBreakdown = [
  { category: "Meat & Seafood", value: 9450, purchases: 7120, usage: 6680, waste: 740, variance: 5.8, belowPar: 3, risk: "High Risk" },
  { category: "Produce", value: 4180, purchases: 3820, usage: 3320, waste: 685, variance: 5.1, belowPar: 2, risk: "High Risk" },
  { category: "Dairy", value: 2860, purchases: 1740, usage: 1560, waste: 125, variance: 2.4, belowPar: 0, risk: "Good" },
  { category: "Dry Goods", value: 5120, purchases: 2680, usage: 2210, waste: 95, variance: 1.8, belowPar: 0, risk: "Good" },
  { category: "Beer", value: 3740, purchases: 2460, usage: 2280, waste: 55, variance: 1.2, belowPar: 0, risk: "Good" },
  { category: "Wine", value: 3210, purchases: 1320, usage: 1125, waste: 40, variance: 1.5, belowPar: 0, risk: "Overstock" },
  { category: "Liquor", value: 2475, purchases: 1180, usage: 1045, waste: 35, variance: 1.1, belowPar: 0, risk: "Good" },
  { category: "NA Beverages", value: 1190, purchases: 620, usage: 575, waste: 20, variance: 1.0, belowPar: 1, risk: "Watch" },
  { category: "Paper / disposables", value: 1615, purchases: 1520, usage: 1410, waste: 0, variance: 0.5, belowPar: 1, risk: "Watch" }
];

export const ingredients = [
  ["Atlantic Salmon", "Meat & Seafood", "Coastal Catch", "lb", 42, 70, 35, 16.85, 708, 86, 72, 85, 18.1, 190, 12.8, "Below Par"],
  ["Ground Beef", "Meat & Seafood", "Prime Provision", "lb", 118, 100, 50, 5.15, 608, 145, 140, 147, 5.0, 44, 4.2, "Healthy"],
  ["Chicken Breast", "Meat & Seafood", "Prime Provision", "lb", 76, 90, 45, 4.72, 359, 110, 104, 112, 7.7, 38, 2.1, "Below Par"],
  ["Ribeye", "Meat & Seafood", "Prime Provision", "lb", 34, 40, 20, 18.4, 626, 43, 38, 46, 21.1, 72, 5.8, "Variance"],
  ["Shrimp", "Meat & Seafood", "Coastal Catch", "lb", 52, 60, 30, 10.2, 530, 62, 58, 66, 13.8, 85, 6.4, "Watch"],
  ["Romaine", "Produce", "Greenline Produce", "case", 8, 12, 6, 28, 224, 18, 16, 21, 31.3, 145, 3.2, "Below Par"],
  ["Tomatoes", "Produce", "Greenline Produce", "case", 14, 14, 7, 31, 434, 19, 18, 20, 11.1, 66, 1.8, "Healthy"],
  ["Avocados", "Produce", "Greenline Produce", "case", 5, 10, 5, 64, 320, 14, 12, 17, 41.7, 210, 18.4, "Price Alert"],
  ["Fries", "Dry Goods", "Harbor Foods", "case", 26, 20, 10, 22, 572, 31, 29, 30, 3.4, 18, 0.0, "Overstock"],
  ["Brioche Buns", "Dry Goods", "Bay Bakery", "case", 9, 12, 6, 38, 342, 16, 15, 15, 0.0, 0, -3.2, "Healthy"],
  ["Cheddar", "Dairy", "Harbor Foods", "lb", 38, 35, 18, 3.9, 148, 44, 42, 43, 2.4, 12, 1.5, "Healthy"],
  ["Eggs", "Dairy", "Harbor Foods", "case", 7, 8, 4, 41, 287, 10, 9, 10, 11.1, 22, 4.8, "Watch"],
  ["Heavy Cream", "Dairy", "Harbor Foods", "qt", 22, 20, 10, 4.6, 101, 30, 28, 31, 10.7, 18, 2.5, "Healthy"],
  ["Flour", "Dry Goods", "Harbor Foods", "bag", 11, 8, 4, 18.5, 204, 7, 7, 7, 0.0, 0, 0.8, "Overstock"],
  ["Olive Oil", "Dry Goods", "Mediterranean Supply", "gal", 6, 8, 4, 44, 264, 9, 8, 10, 25.0, 42, 7.1, "Below Par"],
  ["IPA Keg", "Beer", "North Pier Brewing", "keg", 5, 4, 2, 142, 710, 6, 6, 6, 0.0, 0, 3.7, "Healthy"],
  ["House Red Wine", "Wine", "Vineyard Row", "case", 16, 10, 5, 118, 1888, 8, 7, 7, 0.0, 0, 1.2, "Overstock"],
  ["Vodka", "Liquor", "Shoreline Spirits", "bottle", 18, 14, 7, 24, 432, 12, 12, 12, 0.0, 0, 0.0, "Healthy"],
  ["To-Go Containers", "Paper / disposables", "Harbor Packaging", "case", 6, 12, 6, 49, 294, 14, 14, 15, 7.1, 0, 9.6, "Below Par"]
].map(([item, category, vendor, unit, onHand, par, reorderPoint, unitCost, inventoryValue, usage7, theoreticalUsage, actualUsage, variance, waste, priceChange, status]) => ({
  item, category, vendor, unit, onHand, par, reorderPoint, unitCost, inventoryValue, usage7, theoreticalUsage, actualUsage, variance, waste, priceChange, status
}));

export const vendorPriceChanges = [
  { vendor: "Coastal Catch", item: "Atlantic Salmon", oldPrice: 14.94, newPrice: 16.85, change: 12.8, impact: 420, action: "Review feature pricing or portioning this week." },
  { vendor: "Greenline Produce", item: "Avocados", oldPrice: 54.05, newPrice: 64.0, change: 18.4, impact: 265, action: "Reduce garnish quantity or substitute on lunch specials." },
  { vendor: "Mediterranean Supply", item: "Fry oil", oldPrice: 41.08, newPrice: 44.0, change: 7.1, impact: 185, action: "Audit filtration schedule and fryer discard logs." },
  { vendor: "Bay Bakery", item: "Brioche Buns", oldPrice: 39.25, newPrice: 38.0, change: -3.2, impact: -72, action: "Lock pricing for next four weeks if quality holds." }
];

export const wasteReasons = [
  { reason: "Spoilage", amount: 775 },
  { reason: "Over-prep", amount: 520 },
  { reason: "Burned / remade", amount: 285 },
  { reason: "Trim loss", amount: 260 },
  { reason: "Incorrect portion", amount: 190 },
  { reason: "Expired product", amount: 150 },
  { reason: "Returned item", amount: 85 }
];

export const topWasteItems = [
  { item: "Avocados", category: "Produce", reason: "Spoilage", cost: 210, day: "Tuesday" },
  { item: "Atlantic Salmon", category: "Meat & Seafood", reason: "Trim loss", cost: 190, day: "Wednesday" },
  { item: "Romaine", category: "Produce", reason: "Over-prep", cost: 145, day: "Tuesday" },
  { item: "Shrimp", category: "Meat & Seafood", reason: "Returned item", cost: 85, day: "Friday" },
  { item: "Ribeye", category: "Meat & Seafood", reason: "Incorrect portion", cost: 72, day: "Saturday" }
];

export const menuItems = [
  ["Harbor Salmon Plate", "Entrees", 31, 11.2, 36.1, 19.8, 142, 2, "Reprice"],
  ["Smash Burger", "Entrees", 17, 4.8, 28.2, 12.2, 286, 1, "Star"],
  ["Shrimp Tacos", "Entrees", 19, 6.9, 36.3, 12.1, 168, 4, "Portion Check"],
  ["Steak Frites", "Entrees", 34, 13.4, 39.4, 20.6, 74, 8, "Puzzle"],
  ["Chicken Sandwich", "Entrees", 16, 4.9, 30.6, 11.1, 190, 3, "Workhorse"],
  ["Crab Dip", "Appetizers", 15, 4.3, 28.7, 10.7, 126, 5, "Star"],
  ["Caesar Salad", "Salads", 13, 3.1, 23.8, 9.9, 98, 7, "Workhorse"],
  ["Fish & Chips", "Entrees", 21, 7.4, 35.2, 13.6, 121, 6, "Low Margin"],
  ["Brunch Benedict", "Brunch", 18, 5.2, 28.9, 12.8, 88, 9, "Workhorse"],
  ["Chocolate Torte", "Desserts", 10, 2.1, 21.0, 7.9, 66, 10, "Puzzle"]
].map(([item, category, price, recipeCost, foodCost, grossProfit, units, rank, status]) => ({
  item, category, price, recipeCost, foodCost, grossProfit, units, rank, status
}));

export const purchaseRecommendations = [
  { item: "Atlantic Salmon", vendor: "Coastal Catch", onHand: "42 lb", par: "70 lb", order: "36 lb", cost: 607, urgency: "High", reason: "Below par and usage running 18% above theoretical." },
  { item: "Avocados", vendor: "Greenline Produce", onHand: "5 cases", par: "10 cases", order: "6 cases", cost: 384, urgency: "High", reason: "Below par with active menu demand and price spike." },
  { item: "To-Go Containers", vendor: "Harbor Packaging", onHand: "6 cases", par: "12 cases", order: "8 cases", cost: 392, urgency: "Medium", reason: "Online ordering increased this week." },
  { item: "Chicken Breast", vendor: "Prime Provision", onHand: "76 lb", par: "90 lb", order: "25 lb", cost: 118, urgency: "Medium", reason: "Approaching reorder point before weekend." },
  { item: "Olive Oil", vendor: "Mediterranean Supply", onHand: "6 gal", par: "8 gal", order: "4 gal", cost: 176, urgency: "Low", reason: "Below par, price movement should be watched." }
];

export const inventoryAudits = [
  { date: "2026-05-20", countedBy: "M. Rivera", category: "Meat & Seafood", expected: 9805, counted: 9450, difference: -355, variance: -3.6, status: "Review" },
  { date: "2026-05-19", countedBy: "J. Ellis", category: "Produce", expected: 4590, counted: 4180, difference: -410, variance: -8.9, status: "High Variance" },
  { date: "2026-05-18", countedBy: "S. Patel", category: "Wine", expected: 2820, counted: 3210, difference: 390, variance: 13.8, status: "Overstock" },
  { date: "2026-05-17", countedBy: "M. Rivera", category: "Dry Goods", expected: 5175, counted: 5120, difference: -55, variance: -1.1, status: "Good" },
  { date: "2026-05-16", countedBy: "A. Morgan", category: "Paper / disposables", expected: 1740, counted: 1615, difference: -125, variance: -7.2, status: "Review" }
];

export const inventoryInsights = [
  "Actual food cost is 3.4 points above theoretical. The largest contributors are seafood variance, produce spoilage, and fryer oil price increases.",
  "Atlantic Salmon usage is 18% higher than expected based on POS sales. Check portioning, prep waste, or unrecorded specials.",
  "Avocado price increased 18.4%. Consider temporary menu pricing, substitution, or reduced garnish quantity.",
  "Produce waste peaked on Tuesday and Wednesday, likely from over-prep after a slower-than-forecast lunch period.",
  "Burger gross margin remains strong even with beef price movement. This is currently a reliable profit item.",
  "Three high-volume menu items are below target margin and should be reviewed before the next menu update."
];
