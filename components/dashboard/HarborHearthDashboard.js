"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Building2, ExternalLink, Flame, Triangle } from "lucide-react";
import {
  actionItems,
  deliveryRows,
  executiveModules,
  foodCostRows,
  foodDrillRows,
  harborStores,
  laborRows,
  pnlRows,
  proteinRows,
  reviewFeed,
  reviewRows,
  salesRows,
  safetyCategoryRows,
  safetyHistory,
  weeklyTrend
} from "@/data/harborHearthExecutiveData";

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const number = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });

const navItems = [
  { id: "executive", label: "Executive Scorecard", href: "/dashboard" },
  { id: "sales", label: "Sales", href: "/sales" },
  { id: "foodCost", label: "Food Cost", href: "/food-cost" },
  { id: "labor", label: "Labor", href: "/labor" },
  { id: "reviews", label: "Reviews", href: "/reviews" },
  { id: "safety", label: "Safety", href: "/safety" },
  { id: "delivery", label: "Delivery", href: "/delivery" },
  { id: "pnl", label: "P&L", href: "/profitability" },
  { id: "actions", label: "Action Items", href: "/action-items" }
];

const scorecardColumns = [
  { id: "sales", label: "Weekly Sales", key: "weeklySales", unit: "money", better: "high", href: "/sales", sort: "Weekly Sales" },
  { id: "labor", label: "Labor %", key: "labor", unit: "percent", better: "low", href: "/labor", sort: "Labor %" },
  { id: "foodCost", label: "Food Cost %", key: "foodCost", unit: "percent", better: "low", href: "/food-cost", sort: "Food" },
  { id: "reviews", label: "Guest Review Score", key: "reviewScore", unit: "rating", better: "high", href: "/reviews", sort: "Review Score" },
  { id: "ebitda", label: "EBITDA %", key: "ebitda", unit: "percent", better: "high", href: "/profitability", sort: "EBITDA %" },
  { id: "safety", label: "Safety / Last Audits", key: "safety", unit: "score", better: "high", href: "/safety", sort: "Current Safety Score" },
  { id: "delivery", label: "Delivery", key: "delivery", unit: "score", better: "high", href: "/delivery", sort: "Delivery Score" }
];

function formatValue(value, unit) {
  if (unit === "money") return money.format(value);
  if (unit === "percent") return `${number.format(value)}%`;
  if (unit === "rating") return value.toFixed(1);
  return number.format(value);
}

function rowBetter(label, fallback = "high") {
  const lower = ["Food Cost", "Total COGS", "Food", "Beverage", "Packaging", "Waste", "Comps", "Variance", "Labor", "OT", "Turnover", "Open Positions", "Negative", "Refund", "Prime Cost", "COGS", "Average Delivery Time", "Open Issues", "Critical Violations", "Days Since"];
  const higher = ["Training", "Sales", "Guest Count", "Average Check", "Review Score", "Review Count", "Positive", "Speed", "Food Quality", "Cleanliness", "Staff", "Accuracy", "Order Volume", "EBITDA", "Profit", "Safety", "Delivery Score", "Delivery Rating"];
  if (higher.some((text) => label.includes(text))) return "high";
  if (lower.some((text) => label.includes(text))) return "low";
  return fallback;
}

function rowUnit(label) {
  if (label.includes("Sales") || label.includes("EBITDA $") || label.includes("Labor $") || label.includes("Controllable")) return "money";
  if (label.includes("Rating") || label === "Review Score") return "rating";
  if (label.includes("Count") || label.includes("Volume") || label.includes("Hours") || label.includes("Positions") || label.includes("Time") || label.includes("Days") || label.includes("Violations")) return "number";
  return "percent";
}

function ranksFor(values, better = "high") {
  const sorted = [...values].sort((a, b) => better === "low" ? a - b : b - a);
  return values.map((value) => sorted.indexOf(value) + 1);
}

function rankClass(rank, total) {
  if (rank <= 2) return "best";
  if (rank >= total - 1) return "worst";
  return "middle";
}

function sortIndexes(values, better) {
  const ranks = ranksFor(values, better);
  return values.map((_, index) => index).sort((a, b) => ranks[a] - ranks[b]);
}

function normalizeStore(value) {
  return String(value || "").toLowerCase().replace(/\s+/g, "-");
}

function queryFor(href, storeId, sort) {
  return `${href}?store=${encodeURIComponent(storeId)}&sort=${encodeURIComponent(sort)}`;
}

function urlParam(name) {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get(name) || "";
}

function scorecardSortId(value) {
  const normalized = String(value || "").toLowerCase();
  return scorecardColumns.find((column) => column.id === normalized || column.sort.toLowerCase() === normalized || column.label.toLowerCase() === normalized)?.id;
}

export default function HarborHearthDashboard({ view = "executive" }) {
  const [selectedStore, setSelectedStore] = useState("carmel");
  const [moduleSort, setModuleSort] = useState("");
  const [sortKey, setSortKey] = useState("sales");
  const [sourceModal, setSourceModal] = useState(null);
  const salesTotal = harborStores.reduce((sum, store) => sum + store.weeklySales, 0);

  useEffect(() => {
    const nextStore = normalizeStore(urlParam("store"));
    const nextSort = urlParam("sort");
    if (nextStore) setSelectedStore(nextStore);
    if (nextSort) {
      setModuleSort(nextSort);
      const scorecardSort = scorecardSortId(nextSort);
      if (scorecardSort) setSortKey(scorecardSort);
    }
  }, [view]);

  return (
    <main className="exec-shell command-style">
      <header className="exec-hero compact">
        <div>
          <Link href="/" className="exec-back">Restaurant Technology Solutions</Link>
          <div className="hhg-brand">
            <span className="hhg-logo"><Flame size={18} /><b>H&H</b></span>
            <div><strong>Harbor & Hearth Restaurant Group</strong><small>Eight-location restaurant intelligence demo</small></div>
          </div>
          <h1>{navItems.find((item) => item.id === view)?.label || "Executive Scorecard"}</h1>
          <p>{view === "executive" ? "High-level operating table for every location. Click a metric to open the related module page." : "Module detail page. Store comparison remains visible while charts and drill-downs explain the numbers."}</p>
        </div>
        <aside className="exec-positioning compact">
          <strong>Connection layer, not a replacement system</strong>
          <p>Toast, 7shifts, DoorDash, Google Reviews, MarginEdge, Restaurant365, and audit systems stay in place. This layer organizes the operating view.</p>
        </aside>
      </header>

      <section className="exec-summary-bar">
        <span><b>{harborStores.length}</b> locations</span>
        <span><b>{money.format(salesTotal)}</b> weekly sales</span>
        <span><b>{harborStores.find((store) => store.id === selectedStore)?.name || "Carmel"}</b> selected</span>
        <span><b>FY demo</b> static data</span>
      </section>

      <nav className="client-module-tabs" aria-label="Client modules">
        {navItems.map((item) => <Link className={view === item.id ? "active" : ""} key={item.id} href={item.href}>{item.label}</Link>)}
      </nav>

      {view === "executive" ? <ExecutiveScorecard selectedStore={selectedStore} setSelectedStore={setSelectedStore} sortKey={sortKey} setSortKey={setSortKey} /> : null}
      {view === "sales" ? <ModulePage selectedStore={selectedStore} setSelectedStore={setSelectedStore} initialSort={moduleSort || "Weekly Sales"} title="Sales" description="Weekly sales, guest counts, average ticket, daypart mix, and sales trend by location." rows={salesRowsForModule()} charts={<SalesCharts />} onOpenSource={setSourceModal} /> : null}
      {view === "foodCost" ? <ModulePage selectedStore={selectedStore} setSelectedStore={setSelectedStore} initialSort={moduleSort || "Food"} title="Food Cost" description="COGS, food, beverage, packaging, waste, comps, variance, and food-category drill-downs." rows={foodCostRows.map((row) => ({ ...row, unit: "percent", better: rowBetter(row.label, "low") }))} charts={<FoodCharts />} below={<FoodDrilldowns selectedStore={selectedStore} setSelectedStore={setSelectedStore} onOpenSource={setSourceModal} />} onOpenSource={setSourceModal} /> : null}
      {view === "labor" ? <ModulePage selectedStore={selectedStore} setSelectedStore={setSelectedStore} initialSort={moduleSort || "Labor %"} title="Labor" description="Labor %, overtime, management hours, training completion, turnover, and open positions." rows={laborRows.map((row) => ({ ...row, unit: rowUnit(row.label), better: rowBetter(row.label, "low") }))} charts={<LaborCharts />} onOpenSource={setSourceModal} /> : null}
      {view === "reviews" ? <ModulePage selectedStore={selectedStore} setSelectedStore={setSelectedStore} initialSort={moduleSort || "Review Score"} title="Reviews" description="Guest review score, volume, sentiment, service, food quality, cleanliness, and speed." rows={reviewRows.map((row) => ({ ...row, unit: rowUnit(row.label), better: rowBetter(row.label, "high") }))} charts={<ReviewCharts />} below={<ReviewFeed />} onOpenSource={setSourceModal} /> : null}
      {view === "safety" ? <ModulePage selectedStore={selectedStore} setSelectedStore={setSelectedStore} initialSort={moduleSort || "Current Safety Score"} title="Safety Audits" description="Current safety score, audit history, violations, training, and repeat issue categories." rows={safetyRows()} charts={<SafetyCharts />} below={<SafetyAuditTable selectedStore={selectedStore} />} onOpenSource={setSourceModal} /> : null}
      {view === "delivery" ? <ModulePage selectedStore={selectedStore} setSelectedStore={setSelectedStore} initialSort={moduleSort || "Delivery Score"} title="Delivery" description="Delivery ratings, timing, accuracy, refund rate, order volume, and third-party channel performance." rows={deliveryRows.map((row) => ({ ...row, unit: rowUnit(row.label), better: rowBetter(row.label, "high") }))} charts={<DeliveryCharts />} onOpenSource={setSourceModal} /> : null}
      {view === "pnl" ? <ModulePage selectedStore={selectedStore} setSelectedStore={setSelectedStore} initialSort={moduleSort || "EBITDA %"} title="P&L" description="Executive profitability comparison across sales, COGS, labor, prime cost, controllables, and EBITDA." rows={pnlRowsForModule()} charts={<PnlCharts />} below={<ExpenseBreakdown />} onOpenSource={setSourceModal} /> : null}
      {view === "actions" ? <ActionItemsPage selectedStore={selectedStore} setSelectedStore={setSelectedStore} onOpenSource={setSourceModal} /> : null}

      {sourceModal ? <SourceModal source={sourceModal} onClose={() => setSourceModal(null)} /> : null}
    </main>
  );
}

function ExecutiveScorecard({ selectedStore, setSelectedStore, sortKey, setSortKey }) {
  const sortedStores = useMemo(() => {
    const column = scorecardColumns.find((item) => item.id === sortKey) || scorecardColumns[0];
    const direction = column.better === "low" ? 1 : -1;
    return [...harborStores].sort((a, b) => (a[column.key] - b[column.key]) * direction || a.name.localeCompare(b.name));
  }, [sortKey]);
  const rankLookup = useMemo(() => Object.fromEntries(scorecardColumns.map((column) => [column.id, ranksFor(harborStores.map((store) => store[column.key]), column.better)])), []);

  return (
    <section className="exec-operating-layout">
      <article className="exec-panel table-first wide-only">
        <div className="exec-panel-head compact"><div><h2>Executive Scorecard</h2><p>Which store should I look at first? Sort columns or click a metric to open its module page.</p></div></div>
        <div className="exec-table-wrap">
          <table className="exec-table operating-table">
            <thead><tr><th>Store</th>{scorecardColumns.map((column) => <th key={column.id}><SortButton active={sortKey === column.id} onClick={() => setSortKey(column.id)}>{column.label}</SortButton></th>)}</tr></thead>
            <tbody>
              {sortedStores.map((store) => {
                const originalIndex = harborStores.findIndex((item) => item.id === store.id);
                return (
                  <tr className={selectedStore === store.id ? "selected" : ""} key={store.id} onClick={() => setSelectedStore(store.id)}>
                    <td><strong>{store.name}</strong><small>{store.manager}</small></td>
                    {scorecardColumns.map((column) => (
                      <td key={column.id}>
                        <Link className="metric-with-rank" href={queryFor(column.href, store.id, column.sort)} onClick={(event) => event.stopPropagation()}>
                          <span>{formatValue(store[column.key], column.unit)}</span>
                          <RankBadge rank={rankLookup[column.id][originalIndex]} total={harborStores.length} />
                        </Link>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </article>
      <NotesPanel selectedStore={selectedStore} context="executive" />
    </section>
  );
}

function ModulePage({ title, description, rows, charts, below, selectedStore, setSelectedStore, initialSort, onOpenSource }) {
  const [sortLabel, setSortLabel] = useState(initialSort);
  useEffect(() => {
    setSortLabel(initialSort);
  }, [initialSort]);
  return (
    <section className="exec-operating-layout lower">
      <article className="exec-panel table-first wide-only">
        <div className="exec-panel-head compact"><div><h2>{title}</h2><p>{description}</p></div></div>
        <ModuleTable rows={rows} selectedStore={selectedStore} setSelectedStore={setSelectedStore} sortLabel={sortLabel} setSortLabel={setSortLabel} onOpenSource={onOpenSource} />
        {charts}
        {below}
      </article>
      <NotesPanel selectedStore={selectedStore} context={title} />
    </section>
  );
}

function ModuleTable({ rows, selectedStore, setSelectedStore, sortLabel, setSortLabel, onOpenSource }) {
  const sortRow = rows.find((row) => row.label === sortLabel) || rows[0];
  const sortedIndexes = sortIndexes(sortRow.values, sortRow.better || rowBetter(sortRow.label));
  return (
    <div className="exec-table-wrap">
      <table className="exec-table drill-table">
        <thead><tr><th>Store</th>{rows.map((row) => <th key={row.label}><SortButton active={sortLabel === row.label} onClick={() => setSortLabel(row.label)}>{row.label}</SortButton></th>)}</tr></thead>
        <tbody>
          {sortedIndexes.map((storeIndex) => {
            const store = harborStores[storeIndex];
            return (
              <tr className={selectedStore === store.id ? "selected highlight" : ""} key={store.id} onClick={() => setSelectedStore(store.id)}>
                <td><strong>{store.name}</strong><small>{store.manager}</small></td>
                {rows.map((row) => {
                  const ranks = ranksFor(row.values, row.better || rowBetter(row.label));
                  return (
                    <td key={`${store.id}-${row.label}`}>
                      <button className="metric-with-rank" type="button" onClick={(event) => { event.stopPropagation(); onOpenSource({ source: row.source || "Connected Source System", metric: `${store.name} / ${row.label}` }); }}>
                        <span>{formatValue(row.values[storeIndex], row.unit || rowUnit(row.label))}</span>
                        <RankBadge rank={ranks[storeIndex]} total={harborStores.length} />
                      </button>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function salesRowsForModule() {
  return [
    { label: "Weekly Sales", unit: "money", better: "high", values: harborStores.map((s) => s.weeklySales), source: "POS sales report" },
    { label: "Guest Count", unit: "number", better: "high", values: [1510, 1348, 1288, 1640, 1322, 1114, 1268, 984], source: "POS guest counts" },
    { label: "Average Ticket", unit: "money", better: "high", values: [39, 39.6, 36.6, 38, 38.8, 39.4, 38.8, 40.4], source: "POS check detail" },
    { label: "Lunch %", unit: "percent", better: "high", values: [38, 41, 34, 36, 42, 39, 40, 44], source: "POS daypart report" },
    { label: "Dinner %", unit: "percent", better: "high", values: [62, 59, 66, 64, 58, 61, 60, 56], source: "POS daypart report" }
  ];
}

function pnlRowsForModule() {
  return [
    { label: "Sales", unit: "money", better: "high", values: harborStores.map((s) => s.weeklySales), source: "Accounting export" },
    { label: "COGS %", unit: "percent", better: "low", values: harborStores.map((s) => s.foodCost + 2.4), source: "P&L upload" },
    { label: "Labor %", unit: "percent", better: "low", values: harborStores.map((s) => s.labor), source: "P&L upload" },
    { label: "Prime Cost", unit: "percent", better: "low", values: pnlRows.find((row) => row.label === "Prime Cost").values, source: "P&L upload" },
    { label: "Controllable Expenses", unit: "money", better: "low", values: [7800, 9100, 10400, 11300, 6900, 8200, 7600, 6100], source: "P&L upload" },
    { label: "EBITDA $", unit: "money", better: "high", values: harborStores.map((s) => Math.round(s.weeklySales * s.ebitda / 100)), source: "P&L upload" },
    { label: "EBITDA %", unit: "percent", better: "high", values: harborStores.map((s) => s.ebitda), source: "P&L upload" }
  ];
}

function safetyRows() {
  return [
    { label: "Current Safety Score", unit: "score", better: "high", values: harborStores.map((s) => s.safety), source: "Audit system" },
    { label: "Critical Violations", unit: "number", better: "low", values: [0, 1, 4, 1, 0, 1, 0, 0], source: "Audit system" },
    { label: "Training Completion", unit: "percent", better: "high", values: [90, 84, 81, 88, 96, 87, 92, 98], source: "Training records" },
    { label: "Days Since Last Audit", unit: "number", better: "low", values: [18, 37, 62, 29, 14, 33, 21, 11], source: "Audit system" }
  ];
}

function actionRows() {
  return actionItems.map((item) => ({ ...item, status: item.severity === "High" ? "Open" : "In Progress" }));
}

function FoodDrilldowns({ selectedStore, setSelectedStore, onOpenSource }) {
  const [level, setLevel] = useState("food");
  const rows = level === "protein" ? proteinRows : foodDrillRows;
  return <section className="module-subsection"><div className="exec-module-tabs compact"><button className={level === "food" ? "active" : ""} type="button" onClick={() => setLevel("food")}>Food Categories</button><button className={level === "protein" ? "active" : ""} type="button" onClick={() => setLevel("protein")}>Protein Detail</button></div><ModuleTable rows={rows.map((row) => ({ ...row, unit: "percent", better: rowBetter(row.label, "low") }))} selectedStore={selectedStore} setSelectedStore={setSelectedStore} sortLabel={rows[0].label} setSortLabel={() => {}} onOpenSource={onOpenSource} /></section>;
}

function ActionItemsPage({ selectedStore, setSelectedStore, onOpenSource }) {
  return (
    <section className="exec-operating-layout lower">
      <article className="exec-panel table-first wide-only">
        <div className="exec-panel-head compact"><div><h2>Action Items</h2><p>Centralized follow-up queue by store, source module, owner, due date, and status.</p></div></div>
        <div className="exec-table-wrap"><table className="exec-table drill-table"><thead><tr><th>Store</th><th>Issue</th><th>Severity</th><th>Module / Source</th><th>Owner</th><th>Due</th><th>Status</th></tr></thead><tbody>{actionRows().map((item) => <tr className={normalizeStore(item.store) === selectedStore ? "selected highlight" : ""} key={`${item.store}-${item.issue}`} onClick={() => setSelectedStore(normalizeStore(item.store))}><td><strong>{item.store}</strong></td><td><button className="metric-with-rank" type="button" onClick={(event) => { event.stopPropagation(); onOpenSource({ source: item.source, metric: item.issue }); }}><span>{item.issue}</span><ExternalLink size={13} /></button></td><td>{item.severity}</td><td>{item.source}</td><td>{item.owner}</td><td>{item.due}</td><td>{item.status}</td></tr>)}</tbody></table></div>
      </article>
      <NotesPanel selectedStore={selectedStore} context="Action Items" />
    </section>
  );
}

function SortButton({ active, onClick, children }) {
  return <button className={active ? "active-sort" : ""} type="button" onClick={onClick}>{children}{active ? <Triangle size={10} /> : null}</button>;
}

function RankBadge({ rank, total }) {
  return <b className={`rank-badge ${rankClass(rank, total)}`}>{rank}</b>;
}

function BarChart({ title, rows, unit = "number", better = "high" }) {
  const max = Math.max(...rows.map((row) => row.value));
  const ranks = ranksFor(rows.map((row) => row.value), better);
  return <article className="report-chart"><h3>{title}</h3><div className="horizontal-bars">{rows.map((row, index) => <div key={row.label}><span>{row.label}</span><i><b style={{ width: `${Math.max(4, (row.value / max) * 100)}%` }} /></i><strong>{formatValue(row.value, unit)} <RankBadge rank={ranks[index]} total={rows.length} /></strong></div>)}</div></article>;
}

function LineChart({ title, labels, series, unit = "number" }) {
  const max = Math.max(...series);
  const min = Math.min(...series);
  const points = series.map((value, index) => `${(index / (series.length - 1)) * 100},${88 - ((value - min) / Math.max(1, max - min)) * 72}`).join(" ");
  return <article className="report-chart"><h3>{title}</h3><svg className="simple-line" viewBox="0 0 100 100" preserveAspectRatio="none"><polyline points={points} fill="none" stroke="currentColor" strokeWidth="3" vectorEffect="non-scaling-stroke" /></svg><div className="line-labels">{labels.map((label, index) => <span key={`${label}-${index}`}>{label}</span>)}</div><small>{formatValue(series[series.length - 1], unit)} latest</small></article>;
}

function StackedBars({ title, rows }) {
  return <article className="report-chart"><h3>{title}</h3><div className="stacked-bars">{harborStores.map((store, storeIndex) => <div key={store.id}><span>{store.name}</span><i>{rows.map((row) => <b key={row.label} style={{ width: `${row.values[storeIndex]}%` }} title={`${row.label}: ${row.values[storeIndex]}%`} />)}</i></div>)}</div></article>;
}

function ChartGrid({ children }) {
  return <div className="report-chart-grid">{children}</div>;
}

function SalesCharts() {
  return <ChartGrid><BarChart title="Weekly Sales by Store" rows={harborStores.map((s) => ({ label: s.name, value: s.weeklySales }))} unit="money" /><LineChart title="Sales by Day" labels={weeklyTrend.labels} series={weeklyTrend.sales} unit="money" /><StackedBars title="Lunch / Dinner Proxy Mix" rows={[{ label: "Lunch", values: [38, 41, 34, 36, 42, 39, 40, 44] }, { label: "Dinner", values: [62, 59, 66, 64, 58, 61, 60, 56] }]} /></ChartGrid>;
}

function FoodCharts() {
  return <ChartGrid><BarChart title="Food Cost % by Store" rows={harborStores.map((s) => ({ label: s.name, value: s.foodCost }))} unit="percent" better="low" /><StackedBars title="Cost Mix" rows={foodCostRows.slice(1, 4)} /><BarChart title="Waste % by Store" rows={foodCostRows.find((row) => row.label === "Waste").values.map((value, index) => ({ label: harborStores[index].name, value }))} unit="percent" better="low" /><LineChart title="Food Cost Trend by Week" labels={["W1", "W2", "W3", "W4", "W5", "W6"]} series={[28.6, 29.1, 29.8, 30.2, 29.7, 30.4]} unit="percent" /></ChartGrid>;
}

function LaborCharts() {
  return <ChartGrid><BarChart title="Labor % by Store" rows={harborStores.map((s) => ({ label: s.name, value: s.labor }))} unit="percent" better="low" /><LineChart title="Labor Trend by Day" labels={weeklyTrend.labels} series={weeklyTrend.labor} unit="percent" /><BarChart title="Overtime % by Store" rows={laborRows.find((row) => row.label === "OT %").values.map((value, index) => ({ label: harborStores[index].name, value }))} unit="percent" better="low" /></ChartGrid>;
}

function ReviewCharts() {
  return <ChartGrid><BarChart title="Review Rating by Store" rows={harborStores.map((s) => ({ label: s.name, value: s.reviewScore }))} unit="rating" /><LineChart title="Review Score Trend" labels={weeklyTrend.labels} series={weeklyTrend.reviews} unit="rating" /><StackedBars title="Sentiment Breakdown" rows={reviewRows.slice(2, 4)} /></ChartGrid>;
}

function SafetyCharts() {
  return <ChartGrid><BarChart title="Safety Score by Store" rows={harborStores.map((s) => ({ label: s.name, value: s.safety }))} unit="score" /><BarChart title="Critical Violations by Store" rows={[0, 1, 4, 1, 0, 1, 0, 0].map((value, index) => ({ label: harborStores[index].name, value }))} unit="number" better="low" /><LineChart title="Audit Trend Over Time" labels={weeklyTrend.labels} series={weeklyTrend.safety} unit="score" /></ChartGrid>;
}

function DeliveryCharts() {
  return <ChartGrid><BarChart title="Delivery Score by Store" rows={harborStores.map((s) => ({ label: s.name, value: s.delivery }))} unit="score" /><BarChart title="Delivery Time by Store" rows={deliveryRows.find((row) => row.label === "Average Delivery Time").values.map((value, index) => ({ label: harborStores[index].name, value }))} unit="number" better="low" /><BarChart title="Refund % by Store" rows={deliveryRows.find((row) => row.label === "Refund %").values.map((value, index) => ({ label: harborStores[index].name, value }))} unit="percent" better="low" /></ChartGrid>;
}

function PnlCharts() {
  return <ChartGrid><BarChart title="EBITDA % by Store" rows={harborStores.map((s) => ({ label: s.name, value: s.ebitda }))} unit="percent" /><LineChart title="Profit Trend" labels={weeklyTrend.labels} series={weeklyTrend.ebitda} unit="percent" /><BarChart title="Prime Cost by Store" rows={pnlRows.find((row) => row.label === "Prime Cost").values.map((value, index) => ({ label: harborStores[index].name, value }))} unit="percent" better="low" /></ChartGrid>;
}

function ReviewFeed() {
  return <section className="module-subsection"><h3>Aggregated Review Feed</h3><div className="review-feed-compact">{reviewFeed.map((review) => <article key={`${review.store}-${review.comment}`}><strong>{review.store} / {review.rating}.0</strong><span>{review.source} / {review.tag}</span><p>{review.comment}</p></article>)}</div></section>;
}

function SafetyAuditTable({ selectedStore }) {
  return <section className="module-subsection"><h3>Audit History</h3><div className="exec-table-wrap"><table className="exec-table safety-table"><thead><tr><th>Store</th><th>Last Three Audits</th><th>Current Risk</th></tr></thead><tbody>{harborStores.map((store) => <tr className={selectedStore === store.id ? "selected highlight" : ""} key={store.id}><td><strong>{store.name}</strong></td><td><div className="audit-badges">{safetyHistory[store.name].slice(1).map((status, index) => <span className={status} key={index}>{status}</span>)}</div></td><td>{store.safety >= 94 ? "Clean" : store.safety >= 88 ? "Watch" : "Needs Review"}</td></tr>)}</tbody></table></div></section>;
}

function ExpenseBreakdown() {
  return <section className="module-subsection"><h3>Executive P&L Breakdown</h3><div className="breakdown-grid">{["Sales", "COGS", "Labor", "Rent/Occupancy", "Utilities", "Marketing", "Repairs/Maintenance", "Other Controllables"].map((row) => <span key={row}>{row}</span>)}</div></section>;
}

function NotesPanel({ selectedStore, context }) {
  const store = harborStores.find((item) => item.id === selectedStore) || harborStores[0];
  return <aside className="exec-panel exec-insights command-notes"><h2>Operator Notes</h2><div><strong>{store.name}</strong><p>{store.profile}</p></div><div><strong>{context}</strong><p>{context === "executive" ? "Use the scorecard to pick the first store and metric to investigate." : "This module explains why a store is performing the way it is while keeping comparison visible."}</p></div><div><strong>Follow-up</strong><p>{actionItems.find((item) => item.store === store.name)?.issue || "No urgent action item in the current demo queue."}</p></div></aside>;
}

function SourceModal({ source, onClose }) {
  return <div className="source-modal-backdrop" role="presentation" onClick={onClose}><section className="source-modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}><span>External source system placeholder</span><h2>{source.metric}</h2><p>This would open the connected source system in a live deployment.</p><div><Building2 size={18} /><strong>{source.source}</strong></div><p>Restaurant Technology Solutions does not replace the source system. It keeps the cross-store comparison visible, then sends the operator to the record of truth when deeper action is required.</p><button type="button" onClick={onClose}>Close</button></section></div>;
}

export const dashboardRoutes = navItems;
