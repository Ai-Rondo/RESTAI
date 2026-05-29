export const shiftRanges = ["Today", "Yesterday", "Last 7 Days", "Last 14 Days", "Custom"];
export const shiftOptions = ["Opening", "Lunch", "Dinner", "Closing", "Full Day"];
export const managerOptions = ["All Managers", "Maya Chen", "Jordan Ellis", "Tara Brooks", "Luis Moreno"];

export const shiftSyncSources = [
  ["POS synced", "Today 4:18 AM"],
  ["Scheduling synced", "Today 3:55 AM"],
  ["Checklist system synced", "Today 2:44 AM"],
  ["Temp logs synced", "Today 10:05 PM"],
  ["Cash closeout synced", "Today 11:18 PM"]
];

export const shiftKpis = [
  { label: "Shift Score", value: "84", status: "Watch", change: "-6 vs prior Fri", trend: [92, 88, 90, 84, 79, 86, 84] },
  { label: "Open Tasks", value: "7", status: "Watch", change: "+3 vs prior", trend: [3, 4, 5, 6, 8, 7, 7] },
  { label: "Completed Tasks", value: "136", status: "Good", change: "94% complete", trend: [90, 94, 96, 93, 91, 94, 94] },
  { label: "Late Tasks", value: "4", status: "Watch", change: "+2 today", trend: [1, 2, 1, 4, 5, 3, 4] },
  { label: "Critical Issues", value: "1", status: "Critical", change: "Walk-in warning", trend: [0, 0, 1, 0, 2, 1, 1] },
  { label: "Guest Incidents", value: "3", status: "Watch", change: "Online rush spike", trend: [1, 1, 2, 4, 3, 2, 3] },
  { label: "Staff Callouts", value: "1", status: "Watch", change: "Lunch cashier", trend: [0, 1, 0, 0, 2, 1, 1] },
  { label: "Temp Log Compliance", value: "94%", status: "Good", change: "+2 pts", trend: [91, 96, 98, 94, 92, 95, 94] },
  { label: "Cash Variance", value: "+$7.25", status: "Good", change: "Within tolerance", trend: [4, -8, 13, 7, -18, 12, 7] },
  { label: "Sales vs Forecast", value: "+6.8%", status: "Good", change: "Dinner above plan", trend: [1, 3, 5, 7, -2, 8, 7] },
  { label: "Labor vs Scheduled", value: "+3.1 hrs", status: "Watch", change: "Expo stayed late", trend: [0, 1, 2, 3, 5, 2, 3] },
  { label: "Equipment Issues", value: "2", status: "Watch", change: "Tablet + dispenser", trend: [1, 0, 1, 2, 2, 1, 2] },
  { label: "Follow-Ups Due", value: "5", status: "Watch", change: "3 due tomorrow", trend: [2, 3, 3, 5, 6, 4, 5] }
];

export const dailyShiftReports = [
  ["2026-05-07", "Thursday", 7720, 286, 91, 98, 100, 2, 5, 0, 3.15, 1, "Maya Chen", "Closed", 1],
  ["2026-05-08", "Friday", 10680, 402, 82, 88, 96, 7, 4, 1, 31.4, 4, "Jordan Ellis", "Needs Review", 5],
  ["2026-05-09", "Saturday", 11890, 426, 89, 95, 98, 4, 6, 0, -12.1, 2, "Tara Brooks", "Closed", 2],
  ["2026-05-10", "Sunday", 8530, 318, 78, 82, 92, 8, 3, 2, -4.5, 3, "Luis Moreno", "Late Checklist", 6],
  ["2026-05-11", "Monday", 5920, 214, 94, 100, 100, 1, 4, 0, 1.25, 0, "Maya Chen", "Closed", 0],
  ["2026-05-12", "Tuesday", 6180, 226, 88, 93, 90, 4, 5, 0, 13.5, 1, "Jordan Ellis", "Closed", 2],
  ["2026-05-13", "Wednesday", 7040, 254, 90, 96, 100, 3, 5, 0, -7.2, 1, "Tara Brooks", "Closed", 1],
  ["2026-05-14", "Thursday", 7925, 301, 87, 92, 96, 5, 4, 1, 8.0, 2, "Luis Moreno", "Closed", 3],
  ["2026-05-15", "Friday", 11240, 415, 76, 84, 91, 9, 5, 1, 42.75, 5, "Maya Chen", "Needs Review", 7],
  ["2026-05-16", "Saturday", 12110, 430, 86, 91, 95, 6, 7, 0, 18.2, 2, "Jordan Ellis", "Closed", 3],
  ["2026-05-17", "Sunday", 8345, 312, 72, 80, 93, 10, 4, 1, -16.0, 3, "Tara Brooks", "Late Checklist", 8],
  ["2026-05-18", "Monday", 5650, 198, 96, 100, 100, 1, 6, 0, 2.4, 0, "Luis Moreno", "Closed", 0],
  ["2026-05-19", "Tuesday", 6425, 238, 92, 97, 98, 2, 5, 0, -3.8, 1, "Maya Chen", "Closed", 1],
  ["2026-05-20", "Wednesday", 7310, 271, 84, 94, 94, 7, 6, 1, 7.25, 3, "Jordan Ellis", "Needs Review", 5]
].map(([date, day, sales, guests, score, checklist, temp, openIssues, resolvedIssues, callouts, cashVariance, complaints, mod, closingStatus, followUps]) => ({
  date, day, sales, guests, score, checklist, temp, openIssues, resolvedIssues, callouts, cashVariance, complaints, mod, closingStatus, followUps
}));

export const timelineItems = [
  { time: "7:02 AM", shift: "Opening", category: "Manager Note", person: "Maya Chen", note: "Opening checklist completed. Patio unlocked. Tea brewer was slow to heat but operational.", priority: "Normal", attachments: 1, owner: "GM", status: "Resolved" },
  { time: "9:10 AM", shift: "Opening", category: "Staffing", person: "Jordan Ellis", note: "One cashier called out. Shift lead covered register until 11:30.", priority: "High", attachments: 0, owner: "Jordan", status: "Resolved" },
  { time: "10:52 AM", shift: "Lunch", category: "Checklist", person: "Tara Brooks", note: "Pre-lunch readiness completed. Expo printer paper restocked and cold line verified.", priority: "Normal", attachments: 0, owner: "Shift Lead", status: "Resolved" },
  { time: "11:45 AM", shift: "Lunch", category: "Rush Update", person: "Maya Chen", note: "Lunch rush started 20 minutes earlier than forecast. Added one floater to expo.", priority: "Normal", attachments: 0, owner: "MOD", status: "Resolved" },
  { time: "12:18 PM", shift: "Lunch", category: "Delivery Platform", person: "Luis Moreno", note: "DoorDash tablet disconnected twice. Reset completed, but monitor tomorrow.", priority: "High", attachments: 1, owner: "Luis", status: "Needs Review" },
  { time: "12:42 PM", shift: "Lunch", category: "Guest Issue", person: "Maya Chen", note: "Guest reported missing sauce on online order #4382. Refunded $4.50 and coached expo check.", priority: "Normal", attachments: 0, owner: "Expo Lead", status: "Resolved" },
  { time: "2:10 PM", shift: "Lunch", category: "Food Safety", person: "Tara Brooks", note: "Walk-in cooler temp hit 43°F. Product moved away from door and corrective action started.", priority: "Critical", attachments: 2, owner: "Kitchen Manager", status: "In Progress" },
  { time: "2:25 PM", shift: "Lunch", category: "Food Safety", person: "Tara Brooks", note: "Walk-in rechecked at 39°F after door was closed. Corrective action logged.", priority: "High", attachments: 1, owner: "Kitchen Manager", status: "Resolved" },
  { time: "5:48 PM", shift: "Dinner", category: "Product Shortage", person: "Jordan Ellis", note: "Prep shortage: cilantro-lime rice ran low by 7:30 PM. Need higher Friday prep target.", priority: "High", attachments: 0, owner: "Kitchen Manager", status: "Open" },
  { time: "8:36 PM", shift: "Dinner", category: "Maintenance", person: "Luis Moreno", note: "Restroom paper towel dispenser jammed again. Temporary refill placed on counter.", priority: "Normal", attachments: 1, owner: "Facilities", status: "Open" },
  { time: "10:14 PM", shift: "Closing", category: "Cash", person: "Jordan Ellis", note: "Closing drawer was $7.25 over. Deposit bag verified by MOD and shift lead.", priority: "Normal", attachments: 0, owner: "GM", status: "Resolved" },
  { time: "10:42 PM", shift: "Closing", category: "Handoff", person: "Jordan Ellis", note: "Closing recap sent. Follow up tomorrow on DoorDash tablet, rice prep target, and restroom dispenser.", priority: "High", attachments: 0, owner: "Maya", status: "Open" }
];

export const handoff = {
  wentWell: "Dinner throughput recovered after expo floater was added. Guest sentiment was strong in-store and line tickets stayed under target after 6:30 PM.",
  wentWrong: "Online ordering pressure hit lunch earlier than forecast. DoorDash tablet disconnected twice and contributed to one missed sauce complaint.",
  staffing: "One cashier called out at 9:10 AM. Shift lead covered register until 11:30. Expo stayed 45 minutes late to cover online order spike.",
  guest: "Three guest issues, all online-order related. One refund for missing sauce and two delay conversations handled by MOD.",
  product: "Cilantro-lime rice ran low during dinner. Kitchen manager flagged new prep cook for additional rice batch training.",
  equipment: "Tea brewer slow to heat but usable. Restroom paper towel dispenser jammed again. DoorDash tablet needs monitoring.",
  cash: "Drawer 1 was $3.25 short. Drawer 2 was $10.50 over. Net variance $7.25 over and deposit verified.",
  tomorrow: "Increase rice prep target, test DoorDash tablet before lunch, submit maintenance ticket for dispenser, review walk-in temp history."
};

export const checklists = [
  { name: "Opening Checklist", completion: 100, total: 11, completed: 11, late: 0, failed: 0, photos: 2, signedBy: "Maya Chen", time: "7:05 AM", tasks: ["Unlock front door", "Turn on POS stations", "Count starting drawers", "Verify safe count", "Check restrooms", "Check dining room cleanliness", "Verify sanitizer buckets", "Check walk-in temp", "Confirm prep list", "Review staffing", "Confirm online ordering tablets are live"] },
  { name: "Lunch Rush Readiness", completion: 92, total: 13, completed: 12, late: 1, failed: 0, photos: 1, signedBy: "Tara Brooks", time: "10:52 AM", tasks: ["Stock expo sauces", "Check pickup shelf", "Verify rice levels", "Assign floater", "Turn on delivery tablets"] },
  { name: "Line Check", completion: 96, total: 24, completed: 23, late: 1, failed: 0, photos: 4, signedBy: "Luis Moreno", time: "4:28 PM", tasks: ["Chicken temp", "Steak temp", "Cold salsa temp", "Rice hot hold", "Queso hot hold"] },
  { name: "Restroom Check", completion: 86, total: 7, completed: 6, late: 1, failed: 1, photos: 1, signedBy: "Shift Lead", time: "8:40 PM", tasks: ["Soap filled", "Paper towels stocked", "Trash removed", "Floor checked"] },
  { name: "FOH Cleanliness", completion: 95, total: 20, completed: 19, late: 1, failed: 0, photos: 2, signedBy: "Maya Chen", time: "9:55 PM", tasks: ["Dining room reset", "Drink station wiped", "Pickup shelf cleaned"] },
  { name: "BOH Cleanliness", completion: 91, total: 22, completed: 20, late: 2, failed: 0, photos: 3, signedBy: "Kitchen Lead", time: "10:04 PM", tasks: ["Line wiped", "Prep tables sanitized", "Walk-in organized"] },
  { name: "Delivery Tablet Check", completion: 75, total: 4, completed: 3, late: 1, failed: 1, photos: 1, signedBy: "Luis Moreno", time: "12:25 PM", tasks: ["DoorDash live", "Uber Eats live", "Pickup times verified", "Tablet chargers connected"] },
  { name: "Closing Checklist", completion: 84, total: 19, completed: 16, late: 3, failed: 0, photos: 2, signedBy: "Jordan Ellis", time: "10:38 PM", tasks: ["Final drawer count", "Deposit prepared", "Dining room reset", "Restrooms cleaned", "Line broken down", "Walk-in organized", "Trash taken out", "Online ordering tablets charged", "Manager log completed", "Doors locked / alarm set"] },
  { name: "Cash Closeout", completion: 100, total: 8, completed: 8, late: 0, failed: 0, photos: 0, signedBy: "Jordan Ellis", time: "10:14 PM", tasks: ["Drawer 1 counted", "Drawer 2 counted", "Tips declared", "Deposit bag sealed"] },
  { name: "Food Safety Close", completion: 94, total: 17, completed: 16, late: 1, failed: 0, photos: 4, signedBy: "Tara Brooks", time: "10:20 PM", tasks: ["Cold hold logs", "Hot hold logs", "Walk-in recheck", "Corrective actions"] }
];

export const tempLogs = [
  ["Walk-in cooler", "34-40°F", "43°F → 39°F", "2:10 PM / 2:25 PM", "Tara", "Corrected", "Door closed, product moved from doorway, rechecked at 39°F."],
  ["Prep cooler 1", "34-40°F", "38°F", "11:10 AM", "Luis", "Pass", "None"],
  ["Prep cooler 2", "34-40°F", "39°F", "4:18 PM", "Tara", "Pass", "None"],
  ["Freezer", "-10-0°F", "-4°F", "9:20 AM", "Maya", "Pass", "None"],
  ["Hot holding rice", "135°F+", "148°F", "12:05 PM", "Jordan", "Pass", "None"],
  ["Grilled chicken", "135°F+", "151°F", "12:05 PM", "Jordan", "Pass", "None"],
  ["Steak", "135°F+", "144°F", "6:15 PM", "Luis", "Pass", "None"],
  ["Queso", "135°F+", "142°F", "6:15 PM", "Luis", "Pass", "None"],
  ["Cold salsa", "41°F or less", "40°F", "6:15 PM", "Tara", "Pass", "None"],
  ["Cut lettuce", "41°F or less", "42°F", "8:40 PM", "Tara", "Warning", "Moved to prep cooler 2 and retested at 40°F."]
].map(([item, range, temp, time, by, status, action]) => ({ item, range, temp, time, by, status, action }));

export const cashCloseout = {
  startingBank: 600,
  expectedCash: 2842.75,
  countedCash: 2850,
  variance: 7.25,
  paidOuts: 48,
  tipsDeclared: 412,
  deposit: 2250,
  safeCount: 1800,
  drawerStatus: "Within tolerance",
  verifiedBy: "Jordan Ellis + Shift Lead",
  bag: "ESB-0520-418",
  drawers: [
    { drawer: "Drawer 1", variance: -3.25 },
    { drawer: "Drawer 2", variance: 10.5 },
    { drawer: "Net variance", variance: 7.25 }
  ]
};

export const staffingNotes = [
  "One cashier called out at 9:10 AM. Shift lead covered register until 11:30.",
  "Expo stayed 45 minutes late to cover online order spike.",
  "Kitchen manager flagged new prep cook for additional rice batch training."
];

export const staffingSummary = [
  ["Scheduled team members", "21"],
  ["Actual clock-ins", "20"],
  ["Callouts", "1"],
  ["Late arrivals", "2"],
  ["Early cuts", "3"],
  ["Break compliance", "96%"],
  ["Shift coverage rating", "8.1/10"],
  ["Strong performers", "Expo, Line 2"],
  ["Coaching notes", "Rice batch training"]
];

export const issues = [
  ["12:18 PM", "DoorDash tablet disconnecting", "Delivery Platform", "High", "Luis", "Needs Review", "2026-05-21", "Reset completed. Monitor before lunch."],
  ["2:10 PM", "Walk-in temp warning", "Food Safety", "Critical", "Tara", "Resolved", "2026-05-21", "Corrected at 2:25 PM."],
  ["7:30 PM", "Cilantro-lime rice shortage", "Product Shortage", "High", "Kitchen Manager", "Open", "2026-05-21", "Raise Friday/Saturday prep target."],
  ["12:42 PM", "Guest missing sauce complaint", "Guest Complaint", "Medium", "Expo Lead", "Resolved", "2026-05-20", "Refunded $4.50 and coached expo check."],
  ["8:36 PM", "Restroom paper towel dispenser jammed", "Maintenance", "Medium", "Facilities", "Open", "2026-05-21", "Submit maintenance ticket."],
  ["10:14 PM", "Cash drawer variance", "Cash Handling", "Low", "GM", "Resolved", "2026-05-20", "Net $7.25 over, within tolerance."],
  ["12:05 PM", "Online order wait time spike", "Guest Complaint", "High", "MOD", "In Progress", "2026-05-21", "Lunch 11:45-1:15 needs pickup shelf review."]
].map(([time, issue, category, severity, owner, status, followUp, notes]) => ({ time, issue, category, severity, owner, status, followUp, notes }));

export const shiftCharts = [
  { key: "score", label: "Shift score by day" },
  { key: "checklist", label: "Checklist completion" },
  { key: "issues", label: "Open issues" },
  { key: "temp", label: "Temp compliance" },
  { key: "cash", label: "Cash variance" },
  { key: "complaints", label: "Guest complaints" },
  { key: "coverage", label: "Coverage vs pressure" },
  { key: "heatmap", label: "Issue heatmap" }
];

export const shiftInsights = [
  "Friday dinner had the lowest shift score of the week due to two unresolved equipment issues and a late closing checklist.",
  "Temperature compliance is strong overall, but the walk-in cooler has triggered two warnings in the last 10 days.",
  "Online order issues cluster during lunch rush between 11:45 AM and 1:15 PM.",
  "Cash variance is within tolerance, but Drawer 2 has been over three shifts in a row.",
  "Checklist completion drops on Sunday closing shifts. Consider assigning one closing owner earlier in the shift.",
  "Cilantro-lime rice shortages appeared twice this week. Increase Friday/Saturday prep targets."
];
