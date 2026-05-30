export const harborStores = [
  {
    id: "carmel",
    name: "Carmel",
    manager: "Avery Collins",
    weeklySales: 58940,
    salesTrend: 4.2,
    foodCost: 28.8,
    foodTrend: 1.1,
    labor: 30.4,
    laborTrend: -0.7,
    reviewScore: 4.6,
    reviewTrend: 0.2,
    ebitda: 12.8,
    ebitdaTrend: 1.4,
    safety: 96,
    safetyTrend: 1,
    delivery: 91,
    deliveryTrend: 2,
    managerAlerts: 2,
    openActions: 4,
    profile: "High-volume store with good momentum, but protein cost is drifting above target."
  },
  {
    id: "fishers",
    name: "Fishers",
    manager: "Mia Graham",
    weeklySales: 53420,
    salesTrend: 1.8,
    foodCost: 26.9,
    foodTrend: -0.4,
    labor: 35.7,
    laborTrend: 2.1,
    reviewScore: 4.8,
    reviewTrend: 0.1,
    ebitda: 9.2,
    ebitdaTrend: -0.8,
    safety: 89,
    safetyTrend: -2,
    delivery: 94,
    deliveryTrend: 1,
    managerAlerts: 3,
    openActions: 5,
    profile: "Excellent guest sentiment and delivery execution, but labor control needs attention."
  },
  {
    id: "broad-ripple",
    name: "Broad Ripple",
    manager: "Jordan Lee",
    weeklySales: 47180,
    salesTrend: -3.6,
    foodCost: 31.6,
    foodTrend: 1.9,
    labor: 33.4,
    laborTrend: 0.9,
    reviewScore: 4.1,
    reviewTrend: -0.3,
    ebitda: 6.1,
    ebitdaTrend: -2.2,
    safety: 82,
    safetyTrend: -5,
    delivery: 86,
    deliveryTrend: -3,
    managerAlerts: 7,
    openActions: 11,
    profile: "Needs attention: sales softened while food cost, review sentiment, and safety trend worsened."
  },
  {
    id: "downtown",
    name: "Downtown Indy",
    manager: "Nolan Price",
    weeklySales: 62310,
    salesTrend: 6.4,
    foodCost: 33.2,
    foodTrend: 2.4,
    labor: 29.8,
    laborTrend: -1.2,
    reviewScore: 4.3,
    reviewTrend: -0.1,
    ebitda: 8.4,
    ebitdaTrend: -0.6,
    safety: 91,
    safetyTrend: 0,
    delivery: 82,
    deliveryTrend: -5,
    managerAlerts: 5,
    openActions: 8,
    profile: "Great sales and labor discipline, but food cost and delivery refunds are eating margin."
  },
  {
    id: "greenwood",
    name: "Greenwood",
    manager: "Sofia Diaz",
    weeklySales: 51270,
    salesTrend: 3.1,
    foodCost: 25.7,
    foodTrend: -0.6,
    labor: 28.9,
    laborTrend: -0.3,
    reviewScore: 4.7,
    reviewTrend: 0.2,
    ebitda: 15.6,
    ebitdaTrend: 1.9,
    safety: 98,
    safetyTrend: 2,
    delivery: 92,
    deliveryTrend: 1,
    managerAlerts: 1,
    openActions: 2,
    profile: "Overall top performer with strong profitability, stable controls, and clean audit history."
  },
  {
    id: "westfield",
    name: "Westfield",
    manager: "Camden Reed",
    weeklySales: 43860,
    salesTrend: 0.8,
    foodCost: 27.4,
    foodTrend: 0.2,
    labor: 31.6,
    laborTrend: 0.4,
    reviewScore: 4.2,
    reviewTrend: -0.4,
    ebitda: 8.8,
    ebitdaTrend: -1.0,
    safety: 94,
    safetyTrend: 1,
    delivery: 77,
    deliveryTrend: -6,
    managerAlerts: 4,
    openActions: 7,
    profile: "Profitable enough, but delivery experience is declining and review score is slipping."
  },
  {
    id: "noblesville",
    name: "Noblesville",
    manager: "Elena Martin",
    weeklySales: 49220,
    salesTrend: 2.5,
    foodCost: 27.1,
    foodTrend: -0.2,
    labor: 30.1,
    laborTrend: -0.1,
    reviewScore: 4.5,
    reviewTrend: 0.1,
    ebitda: 11.7,
    ebitdaTrend: 0.7,
    safety: 95,
    safetyTrend: 0,
    delivery: 90,
    deliveryTrend: 2,
    managerAlerts: 2,
    openActions: 3,
    profile: "Consistent operator with balanced sales, cost control, safety, and guest experience."
  },
  {
    id: "zionsville",
    name: "Zionsville",
    manager: "Theo Bennett",
    weeklySales: 39790,
    salesTrend: -1.9,
    foodCost: 24.9,
    foodTrend: -0.8,
    labor: 27.6,
    laborTrend: -0.4,
    reviewScore: 4.9,
    reviewTrend: 0.2,
    ebitda: 14.9,
    ebitdaTrend: 1.1,
    safety: 97,
    safetyTrend: 1,
    delivery: 88,
    deliveryTrend: -1,
    managerAlerts: 1,
    openActions: 2,
    profile: "Lower-volume but highly controlled store with outstanding reviews and strong margin."
  }
];

export const executiveModules = {
  score: {
    label: "Store Health Score",
    unit: "score",
    source: "Restaurant Technology Solutions",
    target: 85,
    description: "Weighted operating health score across sales, food cost, labor, reviews, safety, delivery, profitability, and action load."
  },
  sales: {
    label: "Weekly Sales",
    unit: "money",
    source: "Toast / Square / Clover",
    target: 50000,
    description: "Compares weekly net sales and trend movement by location."
  },
  foodCost: {
    label: "Food Cost %",
    unit: "percent",
    source: "MarginEdge / Inventory / POS",
    target: 28,
    description: "Compares COGS pressure and variance to target across locations."
  },
  labor: {
    label: "Labor %",
    unit: "percent",
    source: "7shifts / POS Labor",
    target: 31,
    description: "Highlights stores with labor pressure, overtime exposure, or scheduling drift."
  },
  reviews: {
    label: "Guest Review Score",
    unit: "rating",
    source: "Google Reviews / Guest Feedback",
    target: 4.5,
    description: "Tracks public and internal sentiment across service, food, speed, and cleanliness."
  },
  ebitda: {
    label: "EBITDA %",
    unit: "percent",
    source: "Restaurant365 / Accounting",
    target: 10,
    description: "Profitability comparison using financial summaries and operating cost rollups."
  },
  safety: {
    label: "Safety Score",
    unit: "score",
    source: "Health Audit / Checklist System",
    target: 92,
    description: "Audit trend visibility for food safety, sanitation, and compliance."
  },
  delivery: {
    label: "Delivery Performance",
    unit: "score",
    source: "DoorDash / Uber Eats",
    target: 88,
    description: "Tracks off-premise execution, ratings, refunds, accuracy, and delivery time."
  }
};

export const foodCostRows = [
  { key: "totalCogs", label: "Total COGS", target: 30, values: [31.2, 28.9, 34.1, 35.7, 27.6, 29.8, 29.1, 26.7] },
  { key: "food", label: "Food", target: 26, values: [28.8, 26.9, 31.6, 33.2, 25.7, 27.4, 27.1, 24.9] },
  { key: "beverage", label: "Beverage", target: 21, values: [22.4, 20.9, 23.2, 21.7, 19.6, 22.0, 21.2, 19.4] },
  { key: "packaging", label: "Packaging", target: 3, values: [3.1, 2.8, 3.9, 4.6, 2.5, 3.7, 3.0, 2.4] },
  { key: "waste", label: "Waste", target: 1.5, values: [1.8, 1.2, 2.9, 2.4, 0.9, 1.6, 1.1, 0.8] },
  { key: "comps", label: "Comps", target: 1.8, values: [1.6, 1.4, 2.7, 3.1, 1.2, 2.2, 1.5, 1.0] },
  { key: "variance", label: "Variance To Target", target: 0, values: [0.8, -1.1, 3.6, 5.2, -2.3, -0.6, -0.9, -3.1] }
];

export const salesRows = [
  { label: "Weekly Sales", target: 50000, values: [58940, 53420, 47180, 62310, 51270, 43860, 49220, 39790], source: "Toast / Square / Clover" },
  { label: "Sales Trend", target: 0, values: [4.2, 1.8, -3.6, 6.4, 3.1, 0.8, 2.5, -1.9], source: "POS comparison report" },
  { label: "Guest Count", target: 1400, values: [1510, 1348, 1288, 1640, 1322, 1114, 1268, 984], source: "POS guest counts" },
  { label: "Average Check", target: 38, values: [39.0, 39.6, 36.6, 38.0, 38.8, 39.4, 38.8, 40.4], source: "POS check detail" },
  { label: "Bar Sales", target: 9500, values: [12400, 10480, 13680, 14990, 8320, 7650, 8920, 6120], source: "Revenue center report" },
  { label: "Catering Sales", target: 3500, values: [4200, 2800, 2100, 5900, 3300, 1800, 2600, 1500], source: "POS catering center" }
];

export const foodDrillRows = [
  { label: "Protein", target: 10.5, values: [11.9, 10.4, 13.8, 14.2, 9.8, 10.9, 10.7, 9.2], source: "MarginEdge item detail" },
  { label: "Dairy", target: 3.2, values: [3.4, 3.0, 3.7, 3.5, 2.8, 3.3, 3.1, 2.9], source: "Vendor invoices" },
  { label: "Bread", target: 2.5, values: [2.7, 2.4, 2.9, 3.1, 2.3, 2.6, 2.4, 2.2], source: "Recipe costing" },
  { label: "Produce", target: 4.8, values: [5.1, 4.3, 5.9, 6.2, 4.2, 5.3, 4.7, 4.1], source: "Inventory counts" },
  { label: "Sauces", target: 2.1, values: [2.2, 1.9, 2.5, 2.8, 1.8, 2.0, 2.1, 1.7], source: "Recipe costing" },
  { label: "Desserts", target: 1.7, values: [1.6, 1.8, 1.9, 2.0, 1.5, 1.7, 1.6, 1.4], source: "POS PMIX" },
  { label: "Prepared Items", target: 2.6, values: [2.9, 2.5, 3.0, 3.4, 2.4, 2.8, 2.5, 2.2], source: "Prep sheets" }
];

export const proteinRows = [
  { label: "Chicken", target: 3.2, values: [3.8, 3.0, 4.4, 4.7, 2.9, 3.4, 3.1, 2.8], source: "Vendor/product detail" },
  { label: "Beef", target: 3.6, values: [4.1, 3.5, 4.8, 4.9, 3.4, 3.6, 3.8, 3.2], source: "Vendor/product detail" },
  { label: "Pork", target: 1.4, values: [1.2, 1.3, 1.7, 1.6, 1.1, 1.5, 1.2, 1.0], source: "Vendor/product detail" },
  { label: "Seafood", target: 1.8, values: [2.4, 1.8, 2.6, 2.7, 1.6, 1.9, 1.8, 1.5], source: "Vendor/product detail" },
  { label: "Other", target: 0.5, values: [0.4, 0.8, 0.3, 0.3, 0.8, 0.5, 0.8, 0.7], source: "Vendor/product detail" }
];

export const reviewRows = [
  { label: "Review Score", target: 4.5, values: [4.6, 4.8, 4.1, 4.3, 4.7, 4.2, 4.5, 4.9] },
  { label: "Review Count", target: 70, values: [88, 76, 102, 124, 69, 58, 64, 42] },
  { label: "Positive %", target: 86, values: [88, 93, 76, 81, 91, 79, 86, 95] },
  { label: "Negative %", target: 8, values: [7, 4, 15, 12, 5, 14, 8, 3] },
  { label: "Speed Of Service", target: 85, values: [86, 91, 74, 79, 90, 76, 84, 92] },
  { label: "Food Quality", target: 88, values: [89, 92, 80, 84, 91, 83, 87, 94] },
  { label: "Cleanliness", target: 90, values: [92, 93, 81, 88, 95, 86, 91, 96] },
  { label: "Staff Friendliness", target: 90, values: [91, 96, 82, 86, 94, 84, 89, 97] }
];

export const deliveryRows = [
  { label: "DoorDash", target: 88, values: [90, 94, 84, 78, 91, 74, 88, 87] },
  { label: "Uber Eats", target: 88, values: [92, 93, 86, 83, 93, 80, 91, 89] },
  { label: "Average Delivery Time", target: 31, values: [29, 27, 36, 41, 28, 43, 32, 33] },
  { label: "Accuracy %", target: 96, values: [96, 98, 93, 91, 97, 90, 96, 95] },
  { label: "Guest Rating", target: 4.4, values: [4.5, 4.7, 4.1, 3.9, 4.6, 3.8, 4.4, 4.3] },
  { label: "Refund %", target: 2.5, values: [2.2, 1.6, 3.7, 5.1, 1.9, 6.2, 2.4, 2.8] },
  { label: "Order Volume", target: 350, values: [390, 362, 481, 524, 334, 308, 347, 246] }
];

export const laborRows = [
  { label: "Labor %", target: 31, values: [30.4, 35.7, 33.4, 29.8, 28.9, 31.6, 30.1, 27.6] },
  { label: "OT %", target: 2.5, values: [2.6, 5.8, 4.1, 2.1, 1.6, 3.0, 2.2, 1.4] },
  { label: "Management Hours", target: 120, values: [128, 148, 135, 122, 118, 126, 121, 112] },
  { label: "Training Completion", target: 92, values: [90, 84, 81, 88, 96, 87, 92, 98] },
  { label: "Turnover", target: 18, values: [21, 28, 31, 19, 12, 24, 17, 10] },
  { label: "Open Positions", target: 2, values: [2, 5, 4, 1, 1, 3, 2, 0] }
];

export const pnlRows = [
  { label: "EBITDA", target: 10, values: [12.8, 9.2, 6.1, 8.4, 15.6, 8.8, 11.7, 14.9] },
  { label: "Profit %", target: 9, values: [10.9, 7.5, 4.8, 6.7, 13.2, 7.1, 9.8, 12.6] },
  { label: "Prime Cost", target: 59, values: [59.2, 62.6, 65.0, 63.0, 54.6, 59.0, 57.2, 52.5] },
  { label: "Sales", target: 50000, values: [58940, 53420, 47180, 62310, 51270, 43860, 49220, 39790] },
  { label: "Labor", target: 31, values: [30.4, 35.7, 33.4, 29.8, 28.9, 31.6, 30.1, 27.6] },
  { label: "Food", target: 28, values: [28.8, 26.9, 31.6, 33.2, 25.7, 27.4, 27.1, 24.9] },
  { label: "Other Controllables", target: 14, values: [13.8, 15.2, 16.9, 15.6, 12.2, 14.9, 13.4, 12.8] }
];

export const safetyHistory = {
  "Carmel": ["gold", "gold", "gold", "green"],
  "Fishers": ["gold", "gold", "green", "green"],
  "Broad Ripple": ["green", "yellow", "yellow", "red"],
  "Downtown Indy": ["gold", "green", "green", "green"],
  "Greenwood": ["gold", "gold", "gold", "gold"],
  "Westfield": ["gold", "green", "green", "gold"],
  "Noblesville": ["gold", "gold", "green", "gold"],
  "Zionsville": ["gold", "gold", "gold", "gold"]
};

export const actionItems = [
  { store: "Downtown Indy", issue: "Food Cost Above Target", severity: "High", source: "MarginEdge", owner: "Ops Director", due: "Today" },
  { store: "Fishers", issue: "Safety Audit Due", severity: "Medium", source: "Checklist System", owner: "Area Manager", due: "2 days" },
  { store: "Greenwood", issue: "Prepare top-performer playbook", severity: "Low", source: "Scorecard", owner: "Training Lead", due: "Next week" },
  { store: "Westfield", issue: "Delivery Refunds Rising", severity: "High", source: "DoorDash", owner: "GM", due: "Today" },
  { store: "Broad Ripple", issue: "Review Score Declining", severity: "High", source: "Google Reviews", owner: "District Manager", due: "Today" },
  { store: "Carmel", issue: "Protein Cost Drift", severity: "Medium", source: "Vendor Invoices", owner: "Chef Partner", due: "3 days" }
];

export function calculateStoreHealth(store) {
  const salesScore = Math.min(100, Math.max(50, 70 + store.salesTrend * 4 + (store.weeklySales - 45000) / 900));
  const foodScore = Math.max(45, 100 - Math.max(0, store.foodCost - 26) * 6);
  const laborScore = Math.max(45, 100 - Math.max(0, store.labor - 29) * 5);
  const reviewScore = Math.min(100, store.reviewScore * 20);
  const safetyScore = store.safety;
  const deliveryScore = store.delivery;
  const profitScore = Math.min(100, Math.max(45, 55 + store.ebitda * 3));
  const actionPenalty = Math.min(16, store.managerAlerts * 1.6 + store.openActions * 0.45);

  return Math.round(
    salesScore * 0.14 +
    foodScore * 0.14 +
    laborScore * 0.14 +
    reviewScore * 0.14 +
    safetyScore * 0.12 +
    deliveryScore * 0.12 +
    profitScore * 0.14 -
    actionPenalty
  );
}
