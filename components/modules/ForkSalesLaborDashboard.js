"use client";

import Link from "next/link";
import { ChevronRight, Download, ReceiptText } from "lucide-react";
import { useMemo, useState } from "react";
import { forkAlehouseSalesLabor } from "@/data/forkAlehouseSalesLabor";

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const exactMoney = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 });
const number = new Intl.NumberFormat("en-US");

const compareOptions = ["Yesterday", "Same Day Last Week", "Budget", "Prior Year"];
const dayparts = ["Breakfast", "Lunch", "Happy Hour", "Dinner", "Late Night", "Full Day"];
const metricTabs = [
  ["Net Sales", "netSales", "money"],
  ["Labor Cost", "laborCost", "money"],
  ["Labor %", "laborPct", "percent"],
  ["Guest Count", "guestCount", "number"],
  ["Average Check", "avgCheck", "money"],
  ["Orders", "orders", "number"],
  ["Discounts", "discounts", "money"],
  ["Refunds", "refunds", "money"],
  ["Voids", "voids", "money"],
  ["Tips", "tips", "money"]
];

const hourlyShape = [
  ["6 AM", 0.01, 0.03], ["7 AM", 0.018, 0.04], ["8 AM", 0.026, 0.045], ["9 AM", 0.032, 0.05],
  ["10 AM", 0.044, 0.055], ["11 AM", 0.085, 0.075], ["12 PM", 0.13, 0.09], ["1 PM", 0.112, 0.08],
  ["2 PM", 0.058, 0.065], ["3 PM", 0.036, 0.055], ["4 PM", 0.044, 0.06], ["5 PM", 0.08, 0.075],
  ["6 PM", 0.13, 0.09], ["7 PM", 0.125, 0.09], ["8 PM", 0.075, 0.07], ["9 PM", 0.04, 0.055],
  ["10 PM", 0.025, 0.04], ["11 PM", 0.014, 0.025]
];

const employees = [
  ["Maddie R.", "Server", "10:46 AM", 5.7, 118],
  ["Chris M.", "Bartender", "3:52 PM", 4.1, 96],
  ["Tara S.", "Line Cook", "9:20 AM", 7.2, 151],
  ["Ben K.", "Expo", "11:15 AM", 5.1, 84],
  ["Luis V.", "Manager", "8:05 AM", 8.3, 205],
  ["Jenna P.", "Host", "4:10 PM", 3.9, 58],
  ["Owen D.", "Dish", "5:00 PM", 3.2, 52]
];

function enrich(row) {
  const orders = Math.round(row.guestCount * 0.82);
  const patioSales = row.revenueCenters?.Patio || 0;
  const tips = Math.round((row.dineInSales + row.barSales + patioSales) * 0.18);
  return {
    ...row,
    laborPct: row.laborCost / row.netSales,
    avgCheck: row.netSales / row.guestCount,
    avgOrder: row.netSales / orders,
    orders,
    tips,
    openChecks: Math.max(4, Math.round(row.guestCount * 0.06)),
    teamIn: Math.max(9, Math.round(row.laborHours / 15))
  };
}

function rowsForMode(mode) {
  const rows = forkAlehouseSalesLabor.map(enrich);
  if (mode === "Today") return rows.filter((row) => row.date === "2026-05-20");
  if (mode === "Yesterday") return rows.filter((row) => row.date === "2026-05-19");
  if (mode === "This Week") return rows.filter((row) => row.date >= "2026-05-18");
  if (mode === "Last Week") return rows.filter((row) => row.date >= "2026-05-11" && row.date <= "2026-05-17");
  return rows;
}

function summarize(rows) {
  const total = rows.reduce((sum, row) => {
    ["grossSales", "netSales", "laborCost", "guestCount", "orders", "discounts", "comps", "voids", "refunds", "tips", "dineInSales", "walkInSales", "onlineSales", "takeoutSales", "deliverySales", "barSales", "laborHours", "scheduledHours", "fohLabor", "bohLabor", "barLabor", "managementLabor", "overtime", "openChecks", "teamIn"].forEach((key) => {
      sum[key] = (sum[key] || 0) + (row[key] || 0);
    });
    return sum;
  }, {});
  return {
    ...total,
    laborPct: total.laborCost / total.netSales,
    avgCheck: total.netSales / total.guestCount,
    avgOrder: total.netSales / total.orders,
    salesPerLaborHour: total.netSales / total.laborHours,
    guestsPerLaborHour: total.guestCount / total.laborHours
  };
}

function format(value, type) {
  if (type === "percent") return `${(value * 100).toFixed(1)}%`;
  if (type === "money") return money.format(value);
  return number.format(Math.round(value));
}

function makeHourly(activeDay) {
  const salesTotal = hourlyShape.reduce((s, h) => s + h[1], 0);
  const laborTotal = hourlyShape.reduce((s, h) => s + h[2], 0);
  return hourlyShape.map(([hour, salesWeight, laborWeight], index) => {
    const netSales = Math.round(activeDay.netSales * salesWeight / salesTotal);
    const laborCost = Math.round(activeDay.laborCost * laborWeight / laborTotal);
    const orders = Math.max(1, Math.round(activeDay.orders * salesWeight / salesTotal));
    const guests = Math.max(1, Math.round(activeDay.guestCount * salesWeight / salesTotal));
    return { hour, netSales, laborCost, laborPct: laborCost / Math.max(netSales, 1), orders, guests, avgCheck: netSales / guests, index };
  });
}

function barWidth(value, max) {
  return `${Math.max(4, (value / max) * 100)}%`;
}

function ReportTile({ label, value, detail, active, onClick }) {
  return (
    <button className={`pos-tile ${active ? "active" : ""}`} type="button" onClick={onClick}>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
      <ChevronRight size={16} />
    </button>
  );
}

function HorizontalBars({ rows, total }) {
  return (
    <div className="pos-bars-list">
      {rows.map((row) => (
        <div key={row.label}>
          <header><strong>{row.label}</strong><span>{money.format(row.sales)}</span></header>
          <i><b style={{ width: barWidth(row.sales, total) }} /></i>
          <footer><span>{row.orders} orders</span><span>{row.guests} guests</span><span>{money.format(row.avg)} avg</span><span>{((row.sales / total) * 100).toFixed(1)}%</span></footer>
        </div>
      ))}
    </div>
  );
}

export default function ForkSalesLaborDashboard() {
  const [dateMode, setDateMode] = useState("Today");
  const [compareTo, setCompareTo] = useState("Same Day Last Week");
  const [daypart, setDaypart] = useState("Full Day");
  const [metricKey, setMetricKey] = useState("netSales");
  const [viewMode, setViewMode] = useState("Report");
  const [showLaborOverlay, setShowLaborOverlay] = useState(true);
  const [selectedTile, setSelectedTile] = useState("Net Sales");

  const rows = useMemo(() => rowsForMode(dateMode), [dateMode]);
  const rangeRows = useMemo(() => rowsForMode("This Month"), []);
  const activeDay = rows[rows.length - 1] || forkAlehouseSalesLabor.map(enrich).at(-1);
  const summary = useMemo(() => summarize(rows), [rows]);
  const compareBase = enrich(forkAlehouseSalesLabor.find((row) => row.date === "2026-05-13") || forkAlehouseSalesLabor[0]);
  const hourly = useMemo(() => makeHourly(activeDay), [activeDay]);
  const metric = metricTabs.find((item) => item[1] === metricKey) || metricTabs[0];
  const metricValue = summary[metric[1]];
  const comparisonValue = compareBase[metric[1]] || 1;
  const change = ((metricValue - comparisonValue) / comparisonValue) * 100;
  const dollarChange = metric[2] === "money" ? metricValue - comparisonValue : summary.netSales - compareBase.netSales;
  const maxHourlySales = Math.max(...hourly.map((row) => row.netSales));
  const maxHourlyLabor = Math.max(...hourly.map((row) => row.laborCost));
  const maxCombo = Math.max(maxHourlySales, maxHourlyLabor * 3.6);

  const revenueCenters = [
    ["Dining Room", activeDay.dineInSales, Math.round(activeDay.orders * 0.32), Math.round(activeDay.guestCount * 0.34)],
    ["Bar", activeDay.barSales, Math.round(activeDay.orders * 0.12), Math.round(activeDay.guestCount * 0.1)],
    ["Patio", activeDay.revenueCenters?.Patio || 595, Math.round(activeDay.orders * 0.08), Math.round(activeDay.guestCount * 0.09)],
    ["Online Ordering", activeDay.onlineSales, Math.round(activeDay.orders * 0.18), Math.round(activeDay.guestCount * 0.15)],
    ["Takeout", activeDay.takeoutSales, Math.round(activeDay.orders * 0.1), Math.round(activeDay.guestCount * 0.08)],
    ["Delivery", activeDay.deliverySales, Math.round(activeDay.orders * 0.09), Math.round(activeDay.guestCount * 0.07)],
    ["Catering", activeDay.revenueCenters?.Catering || 940, Math.round(activeDay.orders * 0.04), Math.round(activeDay.guestCount * 0.04)]
  ].map(([label, sales, orders, guests]) => ({ label, sales, orders, guests, avg: sales / Math.max(guests, 1) }));

  const orderChannels = [
    ["Walk-in", activeDay.walkInSales], ["Dine-in", activeDay.dineInSales], ["Online", activeDay.onlineSales],
    ["Phone", 310], ["DoorDash", Math.round(activeDay.deliverySales * 0.58)], ["Uber Eats", Math.round(activeDay.deliverySales * 0.42)], ["Catering", activeDay.revenueCenters?.Catering || 940]
  ].map(([label, sales], index) => ({ label, sales, orders: Math.round(activeDay.orders * (0.2 - index * 0.015)), guests: Math.round(activeDay.guestCount * (0.18 - index * 0.012)), avg: sales / Math.max(1, Math.round(activeDay.guestCount * (0.18 - index * 0.012))) }));

  const productMix = Object.entries(activeDay.categories || {}).concat([["Wine", 330], ["Kids", 210], ["Non-Alcoholic", 285]]).map(([label, sales]) => ({
    label,
    sales,
    qty: Math.max(6, Math.round(sales / 14)),
    pct: sales / activeDay.netSales
  })).sort((a, b) => b.sales - a.sales);

  const laborRoles = [
    ["FOH", activeDay.fohLabor, 52], ["BOH", activeDay.bohLabor, 61], ["Bar", activeDay.barLabor, 18],
    ["Management", activeDay.managementLabor, 10], ["Host/Expo", 365, 24], ["Delivery/To-go", 205, 14]
  ].map(([label, cost, hours]) => ({ label, cost, hours, pct: cost / activeDay.netSales }));

  const tiles = [
    ["Net Sales", money.format(summary.netSales), `${change >= 0 ? "+" : ""}${change.toFixed(1)}% vs ${compareTo}`],
    ["Labor Cost", money.format(summary.laborCost), `${format(summary.laborPct, "percent")} of sales`],
    ["Team Members Clocked In", number.format(Math.round(summary.teamIn / rows.length || activeDay.teamIn)), "Current estimate"],
    ["Open Checks", number.format(activeDay.openChecks), "Live POS placeholder"],
    ["Guest Count", number.format(summary.guestCount), `${format(summary.avgCheck, "money")} avg guest`],
    ["Average Guest", format(summary.avgCheck, "money"), "Per cover"],
    ["Average Order", format(summary.avgOrder, "money"), "Per order"],
    ["Discounts", money.format(summary.discounts), "Promo and manager discounts"],
    ["Refunds", money.format(summary.refunds), "Refunded checks"],
    ["Voids", money.format(summary.voids), "Voided items/checks"],
    ["Tips", money.format(summary.tips), "Declared + charged"],
    ["Product Mix", `${productMix.length} cats`, "Top category: " + productMix[0].label],
    ["Order Channels", `${orderChannels.length} channels`, "Dine-in + off-premise"]
  ];

  return (
    <main className="pos-report-shell">
      <header className="pos-report-header">
        <div>
          <Link href="/modules" className="pos-back">Modules / Sales & Labor</Link>
          <h1>Sales & Labor Report</h1>
          <p>Fork Alehouse · POS-style operating report</p>
        </div>
        <div className="pos-controls">
          <label>Date<select value={dateMode} onChange={(event) => setDateMode(event.target.value)}><option>Today</option><option>Yesterday</option><option>This Week</option><option>Last Week</option><option>This Month</option></select></label>
          <label>Compare to<select value={compareTo} onChange={(event) => setCompareTo(event.target.value)}>{compareOptions.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Shift / daypart<select value={daypart} onChange={(event) => setDaypart(event.target.value)}>{dayparts.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Location<select><option>Fork Alehouse</option></select></label>
          <button type="button"><Download size={15} /> Export</button>
        </div>
      </header>

      <nav className="pos-mode-tabs">
        {["Report", "Daily Sheet", "Range View"].map((item) => <button className={viewMode === item ? "active" : ""} type="button" key={item} onClick={() => setViewMode(item)}>{item}</button>)}
      </nav>

      {viewMode === "Report" && (
        <>
          <section className="pos-live-strip">
            <div>
              <span>Live report</span>
              <strong>{activeDay.day} {activeDay.date.slice(5)}</strong>
            </div>
            <div>
              <span>Last POS sync</span>
              <strong>Today 4:12 AM</strong>
            </div>
            <div>
              <span>Labor posture</span>
              <strong className={summary.laborPct > 0.32 ? "pos-bad" : "pos-good"}>{format(summary.laborPct, "percent")}</strong>
            </div>
            <div>
              <span>Open checks</span>
              <strong>{activeDay.openChecks}</strong>
            </div>
            <div>
              <span>Clocked in</span>
              <strong>{employees.length} people</strong>
            </div>
          </section>

          <section className="pos-primary-panel">
            <div className="pos-primary-top">
              <div>
                <span className="pos-eyebrow">{metric[0]}</span>
                <strong>{format(metricValue, metric[2])}</strong>
                <p><b className={change >= 0 ? "pos-good" : "pos-bad"}>{change >= 0 ? "+" : ""}{change.toFixed(1)}%</b> · {dollarChange >= 0 ? "+" : ""}{money.format(dollarChange)} vs {compareTo}</p>
              </div>
              <label className="pos-toggle"><input type="checkbox" checked={showLaborOverlay} onChange={(event) => setShowLaborOverlay(event.target.checked)} /> Overlay labor cost</label>
            </div>
            <div className="pos-intraday-bars">
              {hourly.map((row) => <div key={row.hour}><span className="sales" style={{ height: barWidth(row.netSales, maxCombo) }} title={`${row.hour}: ${money.format(row.netSales)}`} />{showLaborOverlay && <span className="labor" style={{ height: barWidth(row.laborCost, maxCombo) }} title={`${row.hour}: ${money.format(row.laborCost)} labor`} />}<small>{row.hour.replace(" ", "")}</small></div>)}
            </div>
            <div className="metric-tabs">{metricTabs.map(([label, key]) => <button className={metricKey === key ? "active" : ""} type="button" key={key} onClick={() => setMetricKey(key)}>{label}</button>)}</div>
          </section>

          <section className="pos-report-grid">
            <article className="pos-card pos-span-7">
              <div className="pos-card-head"><h2>Hourly sales and labor</h2><span>{activeDay.day}, {activeDay.date}</span></div>
              <div className="pos-hour-chart">
                {hourly.map((row) => <div key={row.hour}><span className="sales" style={{ height: barWidth(row.netSales, maxCombo) }} title={`${row.hour} net sales ${money.format(row.netSales)}`} /><span className="labor" style={{ height: barWidth(row.laborCost * 3.6, maxCombo) }} title={`${row.hour} labor ${money.format(row.laborCost)}`} /><small>{row.hour}</small></div>)}
              </div>
              <div className="pos-legend"><span className="sales-dot">Net sales</span><span className="labor-dot">Labor cost</span><span>Labor % shown in table</span></div>
              <div className="pos-table-wrap"><table className="pos-table"><thead><tr><th>Hour</th><th>Net Sales</th><th>Labor Cost</th><th>Labor %</th><th>Orders</th><th>Guests</th><th>Average Check</th></tr></thead><tbody>{hourly.map((row) => <tr key={row.hour}><td>{row.hour}</td><td>{money.format(row.netSales)}</td><td>{money.format(row.laborCost)}</td><td>{format(row.laborPct, "percent")}</td><td>{row.orders}</td><td>{row.guests}</td><td>{exactMoney.format(row.avgCheck)}</td></tr>)}</tbody></table></div>
            </article>

            <article className="pos-card pos-span-5">
              <div className="pos-card-head"><h2>Report tiles</h2><span>Tap to drill down</span></div>
              <div className="pos-tile-grid">{tiles.map(([label, value, detail]) => <ReportTile key={label} label={label} value={value} detail={detail} active={selectedTile === label} onClick={() => setSelectedTile(label)} />)}</div>
              <div className="pos-drill-card"><strong>{selectedTile}</strong><p>Detail view is ready for POS drilldowns, employee/check-level detail, or connected Toast/Square/Clover report exports.</p></div>
            </article>

            <article className="pos-card pos-span-6">
              <div className="pos-card-head"><h2>Sales breakdown</h2><span>Revenue centers</span></div>
              <HorizontalBars rows={revenueCenters} total={activeDay.netSales} />
            </article>

            <article className="pos-card pos-span-6">
              <div className="pos-card-head"><h2>Order channels</h2><span>Walk-in, dine-in, online, delivery</span></div>
              <HorizontalBars rows={orderChannels} total={activeDay.netSales} />
            </article>

            <article className="pos-card pos-span-7">
              <div className="pos-card-head"><h2>Labor detail</h2><span>{format(activeDay.laborCost / activeDay.netSales, "percent")} labor</span></div>
              <div className="pos-labor-summary">
                <div><span>Total labor cost</span><strong>{money.format(activeDay.laborCost)}</strong></div>
                <div><span>Scheduled labor</span><strong>{activeDay.scheduledHours} hrs</strong></div>
                <div><span>Actual labor</span><strong>{activeDay.laborHours} hrs</strong></div>
                <div><span>Variance</span><strong>{activeDay.laborHours - activeDay.scheduledHours} hrs</strong></div>
                <div><span>Overtime</span><strong>{activeDay.overtime} hrs</strong></div>
                <div><span>Sales / labor hr</span><strong>{money.format(activeDay.netSales / activeDay.laborHours)}</strong></div>
                <div><span>Guests / labor hr</span><strong>{(activeDay.guestCount / activeDay.laborHours).toFixed(1)}</strong></div>
              </div>
              <div className="pos-bars-list compact">{laborRoles.map((role) => <div key={role.label}><header><strong>{role.label}</strong><span>{money.format(role.cost)}</span></header><i><b style={{ width: barWidth(role.cost, activeDay.laborCost) }} /></i><footer><span>{role.hours} hrs</span><span>{format(role.pct, "percent")} sales</span></footer></div>)}</div>
            </article>

            <article className="pos-card pos-span-5">
              <div className="pos-card-head"><h2>Clocked in now</h2><span>{employees.length} team members</span></div>
              <div className="employee-list">{employees.map(([name, role, clock, hours, cost]) => <div key={name}><span><b>{name}</b><small>{role}</small></span><span>{clock}</span><span>{hours} hrs</span><strong>{money.format(cost)}</strong></div>)}</div>
            </article>

            <article className="pos-card pos-span-12">
              <div className="pos-card-head"><h2>Product mix / item sales</h2><span>Top categories and items</span></div>
              <div className="product-mix-layout">
                <div className="pos-bars-list compact">{productMix.map((item) => <div key={item.label}><header><strong>{item.label}</strong><span>{money.format(item.sales)}</span></header><i><b style={{ width: barWidth(item.sales, productMix[0].sales) }} /></i><footer><span>{item.qty} qty</span><span>{(item.pct * 100).toFixed(1)}% sales</span></footer></div>)}</div>
                <div className="pos-donut" style={{ "--a": "32%", "--b": "56%" }}><span>Product Mix</span><strong>{productMix[0].label}</strong><small>Top category</small></div>
              </div>
            </article>
          </section>
        </>
      )}

      {viewMode === "Daily Sheet" && <DailySheet activeDay={activeDay} summary={summary} revenueCenters={revenueCenters} daypart={daypart} />}
      {viewMode === "Range View" && <RangeView rows={rangeRows} />}
    </main>
  );
}

function DailySheet({ activeDay, revenueCenters, daypart }) {
  return (
    <section className="daily-sheet">
      <div className="sheet-head"><div><ReceiptText size={19} /><h2>Daily Sales Sheet</h2></div><button type="button"><Download size={15} /> Export / Print</button></div>
      <div className="sheet-grid">
        <SheetBlock title="Sales Summary" rows={[["Gross sales", money.format(activeDay.grossSales)], ["Net sales", money.format(activeDay.netSales)], ["Guest count", number.format(activeDay.guestCount)], ["Average check", exactMoney.format(activeDay.avgCheck)], ["Daypart", daypart]]} />
        <SheetBlock title="Labor Summary" rows={[["Labor cost", money.format(activeDay.laborCost)], ["Labor %", format(activeDay.laborPct, "percent")], ["Scheduled", `${activeDay.scheduledHours} hrs`], ["Actual", `${activeDay.laborHours} hrs`], ["Overtime", `${activeDay.overtime} hrs`]]} />
        <SheetBlock title="Cash Summary" rows={[["Tips", money.format(activeDay.tips)], ["Open checks", activeDay.openChecks], ["Estimated cash", money.format(activeDay.netSales * 0.21)], ["Card sales", money.format(activeDay.netSales * 0.79)]]} />
        <SheetBlock title="Discounts / Comps / Voids" rows={[["Discounts", money.format(activeDay.discounts)], ["Comps", money.format(activeDay.comps)], ["Voids", money.format(activeDay.voids)], ["Refunds", money.format(activeDay.refunds)]]} />
        <SheetBlock title="Order Channel Summary" rows={revenueCenters.slice(0, 6).map((row) => [row.label, money.format(row.sales)])} />
        <SheetBlock title="Daypart Summary" rows={Object.entries(activeDay.dayparts).map(([key, value]) => [key, money.format(value)])} />
        <div className="sheet-block wide"><h3>Manager Notes</h3><p>{activeDay.managerNote}</p><p>{activeDay.note}</p></div>
      </div>
    </section>
  );
}

function SheetBlock({ title, rows }) {
  return <div className="sheet-block"><h3>{title}</h3>{rows.map(([label, value]) => <p key={label}><span>{label}</span><strong>{value}</strong></p>)}</div>;
}

function RangeView({ rows }) {
  return (
    <section className="pos-card range-view-card">
      <div className="pos-card-head"><h2>Range View · May 5-May 20</h2><span>Compact daily report rows</span></div>
      <div className="pos-table-wrap"><table className="pos-table range"><thead><tr><th>Date</th><th>Day</th><th>Net Sales</th><th>Labor Cost</th><th>Labor %</th><th>Guests</th><th>Orders</th><th>Average Check</th><th>Online Sales</th><th>Dine-In Sales</th><th>Bar Sales</th><th>Discounts</th><th>Voids</th><th>Refunds</th><th>Tips</th><th>Notes</th></tr></thead><tbody>{rows.map((row) => <tr key={row.date}><td>{row.date.slice(5)}</td><td>{row.day}</td><td>{money.format(row.netSales)}</td><td>{money.format(row.laborCost)}</td><td>{format(row.laborPct, "percent")}</td><td>{row.guestCount}</td><td>{row.orders}</td><td>{exactMoney.format(row.avgCheck)}</td><td>{money.format(row.onlineSales)}</td><td>{money.format(row.dineInSales)}</td><td>{money.format(row.barSales)}</td><td>{money.format(row.discounts)}</td><td>{money.format(row.voids)}</td><td>{money.format(row.refunds)}</td><td>{money.format(row.tips)}</td><td>{row.flags[0]}</td></tr>)}</tbody></table></div>
    </section>
  );
}
