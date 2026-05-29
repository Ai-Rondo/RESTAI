"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Beer,
  Bell,
  CalendarDays,
  ClipboardList,
  FileText,
  MessageSquare,
  ReceiptText,
  Store,
  TrendingUp,
  Users,
  Utensils
} from "lucide-react";

const stores = ["Fork & Ale House"];
const ranges = [
  "Modeled Full Year 2019",
  "Modeled Q2 2019",
  "Modeled Q3 2019",
  "Modeled Q4 2019",
  "Actual Apr 25-27, 2019",
  "Apr 25, 2019",
  "Apr 26, 2019",
  "Apr 27, 2019",
  "Payroll Apr 15-28"
];

const dailySales = [
  { day: "Thu 4/25", sales: 6018.12, tax: 542.14, totalRevenue: 6560.26, cashDeposit: -255.0 },
  { day: "Fri 4/26", sales: 8632.9, tax: 776.91, totalRevenue: 9409.81, cashDeposit: -455.0 },
  { day: "Sat 4/27", sales: 8267.91, tax: 743.34, totalRevenue: 9011.25, cashDeposit: -996.39 }
];

const modeledMonths = [
  { month: "Jan", sales: 146000, labor: 35.8, guests: 4865, issues: 22, primeCost: 64.5, feedback: 4.1 },
  { month: "Feb", sales: 158500, labor: 34.9, guests: 5283, issues: 20, primeCost: 63.4, feedback: 4.2 },
  { month: "Mar", sales: 182700, labor: 33.8, guests: 6090, issues: 18, primeCost: 62.1, feedback: 4.3 },
  { month: "Apr", sales: 205900, labor: 36.6, guests: 6863, issues: 31, primeCost: 66.8, feedback: 4.2, actualAnchor: "DSR + payroll anchor" },
  { month: "May", sales: 228400, labor: 32.7, guests: 7613, issues: 17, primeCost: 60.9, feedback: 4.4 },
  { month: "Jun", sales: 244800, labor: 31.9, guests: 8160, issues: 15, primeCost: 59.7, feedback: 4.5 },
  { month: "Jul", sales: 259600, labor: 31.3, guests: 8653, issues: 14, primeCost: 58.8, feedback: 4.5 },
  { month: "Aug", sales: 252300, labor: 31.8, guests: 8410, issues: 16, primeCost: 59.4, feedback: 4.4 },
  { month: "Sep", sales: 231700, labor: 32.6, guests: 7723, issues: 18, primeCost: 60.8, feedback: 4.3 },
  { month: "Oct", sales: 238900, labor: 32.9, guests: 7963, issues: 19, primeCost: 61.2, feedback: 4.3 },
  { month: "Nov", sales: 224200, labor: 34.1, guests: 7473, issues: 23, primeCost: 63.1, feedback: 4.2 },
  { month: "Dec", sales: 267500, labor: 33.4, guests: 8917, issues: 21, primeCost: 62.4, feedback: 4.4 }
];

const laborByRole = [
  { role: "Kitchen", hours: 535.8, pay: 7097, sales: 0 },
  { role: "Server", hours: 459.1, pay: 1003, sales: 21615 },
  { role: "Host", hours: 273.0, pay: 1957, sales: 0 },
  { role: "Bartender", hours: 200.3, pay: 324, sales: 7939 }
];

const topServers = [
  { name: "Jessica Akin", role: "Server", hours: 36, sales: 2821, salesPerHour: 78, tipPercent: "20.29%" },
  { name: "Kelsey Polk", role: "Server", hours: 33, sales: 2213, salesPerHour: 67, tipPercent: "21.73%" },
  { name: "Rachel Tobias", role: "Server", hours: 34, sales: 2154, salesPerHour: 64, tipPercent: "20.62%" },
  { name: "Meagan Cooley", role: "Server", hours: 33, sales: 1946, salesPerHour: 59, tipPercent: "19.96%" },
  { name: "Taylor Nasser", role: "Server", hours: 34, sales: 1930, salesPerHour: 56, tipPercent: "23.15%" }
];

const pmixItems = [
  { item: "Ale House Dough Balls", category: "Apps", count: 29 },
  { item: "Wings", category: "Apps", count: 29 },
  { item: "Calzones", category: "Pizza Line", count: 13 },
  { item: "Cauli-Curds", category: "Apps", count: 11 },
  { item: "SM Pizza", category: "Pizza Line", count: 11 },
  { item: "MD Pizza", category: "Pizza Line", count: 11 },
  { item: "Cheesehead Burger", category: "Burgers", count: 8 },
  { item: "Double Layered Nachos", category: "Apps", count: 8 }
];

const notes = [
  { source: "DSR", type: "Sales", text: "Opening weekend DSR captured $22,918.93 net sales across Apr 25-27." },
  { source: "Payroll export", type: "Labor", text: "Payroll period shows 1,468.2 total hours and 64.8 overtime hours." },
  { source: "FOH schedule", type: "Staffing", text: "FOH schedule includes server pars, AM/PM shifts, manager schedule, and onboarding paperwork tracking." },
  { source: "PMIX", type: "Product", text: "Thursday PMIX highlights high-volume apps: Dough Balls and Wings at 29 each." },
  { source: "AOR files", type: "Management", text: "GM, FOH manager, KM, brewer, and master AOR documents can become accountability modules." }
];

const alerts = [
  { severity: "High", source: "Payroll", text: "64.8 overtime hours in Apr 15-28 payroll period needs review before scaling schedule model." },
  { severity: "Medium", source: "DSR", text: "Saturday cash deposit variance is larger than Thursday and Friday." },
  { severity: "Medium", source: "FOH papers", text: "Onboarding checklist has mixed complete/open employee paperwork items." },
  { severity: "Low", source: "PMIX", text: "High appetizer volume could inform prep pars and 86'd item tracking." },
  { severity: "Medium", source: "Modeled year", text: "January, February, April, and November show labor above 34% in the annual model." },
  { severity: "Low", source: "Modeled year", text: "Summer sales peak creates best window for catering, patio, and beer program analysis." }
];

const sourceFiles = [
  "Fork DSR 4.25.19.xlsx",
  "Fork DSR 4.26.19.xlsx",
  "Fork DSR 4.27.19.xlsx",
  "PayrollExport_2019_04_15-2019_04_28 (3).csv",
  "TOP SERVERS.csv",
  "Thursday 4_25 PMIX.xlsx",
  "FOH Schedule.xlsx",
  "BOH SCHEDULING.xlsx",
  "F+A Menu.pdf"
];

function money(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

function number(value, digits = 0) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: digits }).format(value);
}

export default function DashboardDemo() {
  const [selectedStore, setSelectedStore] = useState("Fork & Ale House");
  const [dateRange, setDateRange] = useState("Modeled Full Year 2019");

  const visibleDays = useMemo(() => {
    if (dateRange.startsWith("Modeled") || dateRange === "Payroll Apr 15-28") return dailySales;
    if (dateRange === "Apr 25, 2019") return dailySales.slice(0, 1);
    if (dateRange === "Apr 26, 2019") return dailySales.slice(1, 2);
    if (dateRange === "Apr 27, 2019") return dailySales.slice(2, 3);
    return dailySales;
  }, [dateRange]);

  const visibleMonths = useMemo(() => {
    if (dateRange === "Modeled Q2 2019") return modeledMonths.slice(3, 6);
    if (dateRange === "Modeled Q3 2019") return modeledMonths.slice(6, 9);
    if (dateRange === "Modeled Q4 2019") return modeledMonths.slice(9, 12);
    if (dateRange === "Modeled Full Year 2019") return modeledMonths;
    return [];
  }, [dateRange]);

  const usingModeledYear = visibleMonths.length > 0;
  const actualNetSales = visibleDays.reduce((sum, day) => sum + day.sales, 0);
  const netSales = usingModeledYear ? visibleMonths.reduce((sum, month) => sum + month.sales, 0) : actualNetSales;
  const tax = usingModeledYear ? netSales * 0.09 : visibleDays.reduce((sum, day) => sum + day.tax, 0);
  const totalRevenue = netSales + tax;
  const laborPay = usingModeledYear
    ? visibleMonths.reduce((sum, month) => sum + month.sales * (month.labor / 100), 0)
    : laborByRole.reduce((sum, role) => sum + role.pay, 0);
  const laborHours = usingModeledYear
    ? visibleMonths.reduce((sum, month) => sum + Math.round(month.sales / 156), 0)
    : laborByRole.reduce((sum, role) => sum + role.hours, 0);
  const laborPercent = netSales ? (laborPay / netSales) * 100 : 45.3;
  const guestCount = usingModeledYear ? visibleMonths.reduce((sum, month) => sum + month.guests, 0) : 764;
  const averageFeedback = usingModeledYear
    ? visibleMonths.reduce((sum, month) => sum + month.feedback, 0) / visibleMonths.length
    : 4.2;
  const issueCount = usingModeledYear ? visibleMonths.reduce((sum, month) => sum + month.issues, 0) : alerts.length;
  const overtimeHours = 64.8;

  return (
    <main className="demo-shell fork-demo">
      <header className="demo-header fork-header">
        <div className="fork-brand">
          <Image src="/demo-assets/fork-ale-mark.png" alt="Fork & Ale mark" width={74} height={74} />
          <div>
            <Link className="back-link" href="/"><ArrowLeft size={16} /> Restaurant Intelligence</Link>
            <h1>Fork & Ale Operations Dashboard</h1>
            <p>Realistic tester view built from historical Fork & Ale DSRs, payroll exports, top-server report, PMIX, schedules, menu files, AORs, and a modeled full-year operating layer.</p>
          </div>
        </div>
        <div className="demo-controls">
          <label><Store size={15} /> Store<select value={selectedStore} onChange={(event) => setSelectedStore(event.target.value)}>{stores.map((store) => <option key={store}>{store}</option>)}</select></label>
          <label><CalendarDays size={15} /> Range<select value={dateRange} onChange={(event) => setDateRange(event.target.value)}>{ranges.map((range) => <option key={range}>{range}</option>)}</select></label>
        </div>
      </header>

      <section className="demo-context">
        <strong>{selectedStore}</strong>
        <span>{dateRange} - {usingModeledYear ? "modeled from actual Fork & Ale source signals" : "actual local Fork+Ale source files"} - no live integrations yet</span>
      </section>

      <section className="demo-metrics">
        <Metric icon={TrendingUp} label="Net Sales" value={money(netSales)} detail={usingModeledYear ? `${visibleMonths.length} modeled month${visibleMonths.length > 1 ? "s" : ""}` : `${visibleDays.length} DSR day${visibleDays.length > 1 ? "s" : ""}`} />
        <Metric icon={ReceiptText} label="Total Revenue" value={money(totalRevenue)} detail={`${money(tax)} sales tax captured`} />
        <Metric icon={Users} label="Labor $" value={money(laborPay)} detail={`${number(laborHours, 1)} payroll hours`} alert={laborPercent > 40} />
        <Metric icon={Bell} label="Open Issues" value={issueCount} detail={usingModeledYear ? `${number(guestCount)} modeled guests` : `${number(overtimeHours, 1)} overtime hours`} alert />
      </section>

      {usingModeledYear ? (
        <section className="demo-grid">
          <article className="demo-panel wide">
            <div className="demo-panel-heading"><h2>Modeled Monthly Performance</h2><span>Anchored to DSR + payroll signals</span></div>
            <div className="demo-table annual-table">
              <div className="demo-table-head"><span>Month</span><span>Sales</span><span>Labor %</span><span>Guests</span><span>Issues</span><span>Prime Cost</span></div>
              {visibleMonths.map((month) => (
                <div className="demo-table-row" key={month.month}>
                  <span>{month.month}</span><span>{money(month.sales)}</span><span>{month.labor.toFixed(1)}%</span><span>{number(month.guests)}</span><span>{month.issues}</span><span>{month.primeCost.toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </article>
          <article className="demo-panel">
            <div className="demo-panel-heading"><h2>Year Signals</h2><span>Modeled tester data</span></div>
            <div className="demo-list">
              <div><strong>Average labor</strong><p>{laborPercent.toFixed(1)}% across selected period.</p></div>
              <div><strong>Guest feedback</strong><p>{averageFeedback.toFixed(1)} modeled average review score.</p></div>
              <div><strong>Average check</strong><p>{money(netSales / guestCount)} across {number(guestCount)} guests.</p></div>
              <div><strong>Peak month</strong><p>December modeled at {money(Math.max(...visibleMonths.map((month) => month.sales)))}.</p></div>
            </div>
          </article>
        </section>
      ) : null}

      <section className="demo-grid">
        <article className="demo-panel wide">
          <div className="demo-panel-heading"><h2>Actual Daily Sales Report</h2><span>Source: Fork DSR workbooks</span></div>
          <div className="demo-table fork-sales-table">
            <div className="demo-table-head"><span>Day</span><span>Net Sales</span><span>Sales Tax</span><span>Total Revenue</span><span>Cash Deposit</span><span>Status</span></div>
            {visibleDays.map((day) => (
              <div className="demo-table-row" key={day.day}>
                <span>{day.day}</span><span>{money(day.sales)}</span><span>{money(day.tax)}</span><span>{money(day.totalRevenue)}</span><span>{money(day.cashDeposit)}</span><span>{Math.abs(day.cashDeposit) > 800 ? "Review" : "Logged"}</span>
              </div>
            ))}
          </div>
        </article>
        <article className="demo-panel">
          <div className="demo-panel-heading"><h2>{usingModeledYear ? "Annual Sales Trend" : "Sales Trend"}</h2><span>{usingModeledYear ? "Modeled 2019" : "Apr 25-27 DSR"}</span></div>
          <div className={usingModeledYear ? "demo-bars labeled-bars annual-bars" : "demo-bars labeled-bars"}>
            {(usingModeledYear ? visibleMonths : dailySales).map((item) => {
              const label = usingModeledYear ? item.month : item.day;
              const value = usingModeledYear ? item.sales : item.sales;
              const max = usingModeledYear ? Math.max(...visibleMonths.map((month) => month.sales)) : 9000;
              return <div key={label}><span style={{ height: `${Math.max((value / max) * 100, 12)}%` }} /><small>{label}</small></div>;
            })}
          </div>
        </article>
      </section>

      <section className="demo-grid">
        <article className="demo-panel">
          <div className="demo-panel-heading"><h2><Users size={18} /> Labor by Role</h2><span>Source: payroll export</span></div>
          <div className="demo-list">{laborByRole.map((role) => <div key={role.role}><strong>{role.role}</strong><p>{number(role.hours, 1)} hours - {money(role.pay)} total pay{role.sales ? ` - ${money(role.sales)} sales` : ""}</p></div>)}</div>
        </article>
        <article className="demo-panel">
          <div className="demo-panel-heading"><h2><Beer size={18} /> Top Servers</h2><span>Source: TOP SERVERS.csv</span></div>
          <div className="demo-list compact-list">{topServers.map((server) => <div key={server.name}><strong>{server.name}</strong><p>{money(server.sales)} sales - ${server.salesPerHour}/hr - {server.tipPercent} tip</p></div>)}</div>
        </article>
      </section>

      <section className="demo-grid">
        <article className="demo-panel">
          <div className="demo-panel-heading"><h2><Utensils size={18} /> Product Mix</h2><span>Thursday 4/25 PMIX</span></div>
          <div className="demo-list compact-list">{pmixItems.map((item) => <div key={item.item}><strong>{item.item}</strong><p>{item.category} - {item.count} sold</p></div>)}</div>
        </article>
        <article className="demo-panel">
          <div className="demo-panel-heading"><h2><ClipboardList size={18} /> Shift Notes</h2><span>Generated from source files</span></div>
          <div className="demo-list">{notes.map((note) => <div key={`${note.source}-${note.type}`}><strong>{note.source} - {note.type}</strong><p>{note.text}</p></div>)}</div>
        </article>
      </section>

      <section className="demo-grid">
        <article className="demo-panel">
          <div className="demo-panel-heading"><h2><Bell size={18} /> Operational Alerts</h2><span>Fork & Ale tester</span></div>
          <div className="demo-list">{alerts.map((alert) => <div key={`${alert.source}-${alert.text}`}><strong>{alert.severity} - {alert.source}</strong><p>{alert.text}</p></div>)}</div>
        </article>
        <article className="demo-panel">
          <div className="demo-panel-heading"><h2><FileText size={18} /> Source Systems</h2><span>What the dashboard can ingest</span></div>
          <div className="source-chip-grid">{sourceFiles.map((file) => <span key={file}>{file}</span>)}</div>
          <a className="menu-link" href="/demo-assets/fork-ale-menu.pdf" target="_blank" rel="noreferrer">Open copied Fork & Ale menu PDF</a>
        </article>
      </section>

      <section className="demo-panel demo-wide-note">
        <div className="demo-panel-heading"><h2><MessageSquare size={18} /> What this proves</h2><span>Restaurant Intelligence use case</span></div>
        <p>Fork & Ale has the same operational footprint Restaurant Intelligence is designed for: sales reports, payroll, schedules, product mix, training docs, management AORs, menus, and daily notes spread across files. The dashboard does not replace those files or systems. It organizes their signals into one operating view.</p>
      </section>
    </main>
  );
}

function Metric({ icon: Icon, label, value, detail, alert = false }) {
  return (
    <article className={alert ? "demo-metric alert" : "demo-metric"}>
      <Icon size={20} />
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </article>
  );
}
