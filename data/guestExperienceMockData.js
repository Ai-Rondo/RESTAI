const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const managers = ["Avery Cole", "Mina Patel", "Jordan Reyes", "Sam Brooks"];
const complaints = ["Long ticket times", "Order accuracy", "Cleanliness", "Understaffed", "Out of stock item", "Wait time"];
const compliments = ["Friendly register", "Fresh food", "Spotless lobby", "Manager recovery", "Fast pickup", "Great smoothie"];

export const guestRanges = ["Last 7 Days", "Last 14 Days", "Last 30 Days", "This Month", "Custom"];

export const dailyGuestExperience = Array.from({ length: 30 }, (_, index) => {
  const dayIndex = index % 7;
  const date = new Date(2026, 4, index + 1);
  const iso = date.toISOString().slice(0, 10);
  const staffingWeek = index >= 9 && index <= 15;
  const orderAccuracyIssue = index >= 18 && index <= 23;
  const cleanlinessDip = index === 12 || index === 13;
  const sunday = dayIndex === 6;
  const manager = managers[index % managers.length];
  const managerBoost = manager === "Mina Patel" ? 5 : manager === "Sam Brooks" ? -3 : 0;
  const baseScore = 90 + managerBoost - (sunday ? 7 : 0) - (staffingWeek ? 6 : 0) - (orderAccuracyIssue ? 4 : 0) - (cleanlinessDip ? 8 : 0) + (index % 5);
  const score = Math.max(78, Math.min(96, baseScore));
  const nps = Math.max(25, Math.min(80, score - 22 + (manager === "Mina Patel" ? 6 : 0) - (sunday ? 6 : 0)));
  const volume = 16 + ((index * 9) % 82) + (dayIndex >= 4 ? 24 : 0);
  const responseRate = Math.min(20, 6 + ((index * 1.7) % 11) + (dayIndex >= 5 ? 1 : 0));
  return {
    date: iso,
    day: days[dayIndex],
    guestScore: score,
    nps,
    surveyCount: volume,
    responseRate: Number(responseRate.toFixed(1)),
    wouldReturn: Math.max(70, Math.min(98, score + 1 - (orderAccuracyIssue ? 4 : 0))),
    wouldRecommend: Math.max(65, Math.min(97, score - 2 - (staffingWeek ? 3 : 0))),
    topComplaint: cleanlinessDip ? "Cleanliness" : orderAccuracyIssue ? "Order accuracy" : staffingWeek ? "Long ticket times" : complaints[index % complaints.length],
    topCompliment: manager === "Mina Patel" ? "Manager recovery" : compliments[index % compliments.length],
    openRecoveries: index % 6 === 0 ? 4 : index % 5 === 0 ? 3 : index % 4 === 0 ? 2 : 1,
    recoveredGuests: index % 6 === 0 ? 2 : index % 3 === 0 ? 4 : 5,
    manager
  };
});

export const guestKpis = [
  ["Overall Guest Satisfaction Score", "88", "+3 vs prior", "Improving", [84, 82, 86, 89, 88, 90, 88]],
  ["Net Promoter Score (NPS)", "61", "+5", "Good", [50, 54, 57, 60, 58, 63, 61]],
  ["Would Return %", "91%", "+2 pts", "Good", [86, 88, 89, 90, 91, 92, 91]],
  ["Would Recommend %", "87%", "+4 pts", "Good", [80, 82, 84, 86, 85, 88, 87]],
  ["Survey Response Count", "1,642", "+12%", "Healthy", [120, 170, 210, 198, 240, 265, 255]],
  ["Service Score", "86", "-2", "Watch", [89, 87, 85, 84, 86, 88, 86]],
  ["Food Quality Score", "91", "+1", "Good", [89, 90, 91, 90, 92, 91, 91]],
  ["Cleanliness Score", "93", "+6", "Strong", [84, 87, 91, 94, 93, 95, 93]],
  ["Order Accuracy Score", "83", "-5", "Watch", [91, 88, 84, 80, 82, 85, 83]],
  ["Speed of Service Score", "81", "-4", "Needs Focus", [88, 84, 80, 79, 81, 82, 81]],
  ["Hospitality Score", "92", "+3", "Strong", [86, 89, 90, 91, 92, 94, 92]],
  ["Recovered Guests %", "74%", "+11 pts", "Improving", [55, 60, 63, 68, 71, 74, 74]],
  ["Repeat Guest Satisfaction", "94", "+2", "Strong", [90, 92, 93, 93, 94, 95, 94]]
].map(([label, value, change, status, trend]) => ({ label, value, change, status, trend }));

export const dayparts = [
  { name: "Breakfast", score: 91, nps: 66, count: 188, complaint: "Wait time", compliment: "Smoothies", trend: "+3" },
  { name: "Lunch", score: 94, nps: 72, count: 512, complaint: "Pickup shelf crowding", compliment: "Fresh food", trend: "+2" },
  { name: "Afternoon", score: 89, nps: 61, count: 266, complaint: "Out of stock item", compliment: "Friendly register", trend: "+1" },
  { name: "Dinner", score: 82, nps: 48, count: 438, complaint: "Long ticket times", compliment: "Manager recovery", trend: "-5" },
  { name: "Late Night", score: 86, nps: 55, count: 94, complaint: "Order accuracy", compliment: "Fast pickup", trend: "-1" }
];

export const surveyQuestions = [
  ["Food quality", 4.6, "+0.1", 4.4, 88, 5, 312],
  ["Food temperature", 4.2, "-0.2", 4.3, 76, 12, 184],
  ["Order accuracy", 3.9, "-0.5", 4.4, 68, 20, 246],
  ["Cleanliness", 4.7, "+0.4", 4.5, 91, 4, 128],
  ["Friendliness", 4.8, "+0.2", 4.5, 94, 3, 220],
  ["Speed of service", 3.8, "-0.4", 4.2, 64, 24, 292],
  ["Value for money", 4.1, "+0.1", 4.0, 75, 10, 148],
  ["Likelihood to return", 4.5, "+0.2", 4.3, 87, 6, 196],
  ["Likelihood to recommend", 4.4, "+0.2", 4.2, 84, 8, 176],
  ["Manager visibility", 4.0, "+0.6", 3.8, 72, 14, 112]
].map(([question, average, trend, benchmark, positive, negative, comments]) => ({ question, average, trend, benchmark, positive, negative, comments }));

export const operationalDrivers = [
  { issue: "Order Accuracy", impact: -11, occurrences: 32, effect: "Missing sauces, wrong proteins, and incomplete online bags.", comments: ["Food was great but we were missing two items.", "My bowl had chicken instead of tofu."] },
  { issue: "Long ticket times", impact: -9, occurrences: 41, effect: "Dinner and Sunday rush wait perception.", comments: ["The food was excellent but our order took almost 20 minutes.", "The restaurant seemed understaffed."] },
  { issue: "Staffing shortages", impact: -8, occurrences: 27, effect: "Line backup and limited table touches.", comments: ["Only one person was working the front.", "Everyone was nice but clearly stretched."] },
  { issue: "Cleanliness issues", impact: -7, occurrences: 18, effect: "Lunch dining room resets fell behind.", comments: ["The dining room was dirty during lunch.", "Trash was full near the drink station."] },
  { issue: "Manager coverage", impact: +10, occurrences: 22, effect: "Visible recovery improves return intent.", comments: ["The manager came over and fixed the issue immediately.", "They handled the mistake quickly."] }
];

export const guestComments = [
  ["2026-05-30", "Dinner", "Dinner", "Sam Brooks", 72, ["Long wait", "Dinner"], "Negative", "Speed", "The food was excellent but our order took almost 20 minutes."],
  ["2026-05-29", "Lunch", "Lunch", "Mina Patel", 96, ["Recovery", "Manager"], "Positive", "Recovery", "The manager came over and fixed the issue immediately."],
  ["2026-05-28", "Lunch", "Lunch", "Jordan Reyes", 70, ["Cleanliness"], "Negative", "Cleanliness", "The dining room was dirty during lunch."],
  ["2026-05-27", "Dinner", "Dinner", "Avery Cole", 76, ["Missing item", "Online"], "Negative", "Order Accuracy", "Food was great but we were missing two items."],
  ["2026-05-26", "Afternoon", "Afternoon", "Mina Patel", 97, ["Friendly"], "Positive", "Hospitality", "Everyone was extremely friendly."],
  ["2026-05-25", "Dinner", "Dinner", "Sam Brooks", 78, ["Staffing"], "Negative", "Service", "The restaurant seemed understaffed."],
  ["2026-05-24", "Lunch", "Lunch", "Jordan Reyes", 95, ["Clean"], "Positive", "Cleanliness", "The lobby was spotless."],
  ["2026-05-23", "Breakfast", "Breakfast", "Mina Patel", 98, ["Register"], "Positive", "Hospitality", "The employee at the register was fantastic."]
].map(([date, shift, daypart, manager, score, tags, sentiment, category, comment]) => ({ date, shift, daypart, manager, score, tags, sentiment, category, comment }));

export const recoveryCases = [
  ["R. Martin", "Missing item", "High", "Repeat guest risk", "Mina Patel", "Resolved", "Refund + next visit bowl", "Recovered"],
  ["A. Jackson", "Poor service", "Medium", "Dinner score drag", "Avery Cole", "In Progress", "Manager callback pending", "Open"],
  ["L. Nguyen", "Long wait", "Medium", "Sunday pattern", "Jordan Reyes", "Resolved", "Apology email + smoothie credit", "Recovered"],
  ["K. Wilson", "Incorrect order", "High", "Online accuracy issue", "Sam Brooks", "Needs Review", "Audit bagging process", "Open"],
  ["P. Garcia", "Cleanliness complaint", "Medium", "Lunch dining room", "Mina Patel", "Resolved", "Follow-up sent", "Recovered"]
].map(([guest, issue, severity, impact, assignedTo, status, resolution, recovery]) => ({ guest, issue, severity, impact, assignedTo, status, resolution, recovery }));

export const managerComparison = [
  { manager: "Mina Patel", score: 95, nps: 78, responses: 398, recovery: 91, accuracy: 90, service: 96 },
  { manager: "Avery Cole", score: 88, nps: 62, responses: 412, recovery: 74, accuracy: 84, service: 87 },
  { manager: "Jordan Reyes", score: 86, nps: 58, responses: 376, recovery: 70, accuracy: 82, service: 85 },
  { manager: "Sam Brooks", score: 81, nps: 46, responses: 315, recovery: 61, accuracy: 78, service: 79 }
];

export const districtMock = [
  { store: "Citrus Kitchen", score: 88, rank: 3, region: "Central", status: "Watch dinner" },
  { store: "Citrus Kitchen North", score: 92, rank: 1, region: "Central", status: "Top performer" },
  { store: "Citrus Kitchen West", score: 90, rank: 2, region: "Central", status: "Strong" },
  { store: "Citrus Kitchen East", score: 84, rank: 4, region: "Central", status: "Recovery focus" }
];

export const guestInsights = [
  "Guest satisfaction dropped primarily due to slower ticket times during dinner.",
  "Order accuracy complaints increased 18% over the prior two weeks.",
  "Cleanliness scores remain strong and correlate with high return intent.",
  "Lunch guest satisfaction remains the strongest performing daypart.",
  "The largest opportunity is reducing perceived wait times.",
  "Mina Patel is significantly outperforming peers on recovery success and hospitality scores."
];
