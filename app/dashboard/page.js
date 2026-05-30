"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { Building2, ChevronRight, ExternalLink, Flame, Triangle } from "lucide-react";
import {
  actionItems,
  executiveModules,
  foodCostRows,
  foodDrillRows,
  harborStores,
  laborRoleMix,
  laborRows,
  pnlRows,
  proteinRows,
  reviewFeed,
  reviewRows,
  salesMix,
  salesRows,
  safetyCategoryRows,
  safetyHistory,
  weeklyTrend
} from "@/data/harborHearthExecutiveData";

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const number = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });

const modules = [
  { id: "executive", label: "Executive Scorecard" },
  { id: "salesLabor", label: "Sales & Labor" },
  { id: "foodCost", label: "Food Cost" },
  { id: "reviews", label: "Guest Reviews" },
  { id: "pnl", label: "P&L" },
  { id: "safety", label: "Safety Audits" }
];

const scorecardColumns = [
  { id: "sales", label: "Weekly Sales", key: "weeklySales", unit: "money", better: "high", module: "salesLabor", drillLabel: "Weekly Sales" },
  { id: "labor", label: "Labor %", key: "labor", unit: "percent", better: "low", module: "salesLabor", drillLabel: "Labor %" },
  { id: "foodCost", label: "Food Cost %", key: "foodCost", unit: "percent", better: "low", module: "foodCost", drillLabel: "Food" },
  { id: "reviews", label: "Guest Review Score", key: "reviewScore", unit: "rating", better: "high", module: "reviews", drillLabel: "Review Score" },
  { id: "ebitda", label: "EBITDA %", key: "ebitda", unit: "percent", better: "high", module: "pnl", drillLabel: "EBITDA" },
  { id: "safety", label: "Safety / Last Audits", key: "safety", unit: "score", better: "high", module: "safety", drillLabel: "Safety Score" }
];

const moduleRows = {
  salesLabor: salesRows.concat(laborRows.slice(0, 2)),
  foodCost: foodCostRows,
  food: foodDrillRows,
  protein: proteinRows,
  reviews: reviewRows,
  pnl: pnlRows,
  safety: safetyCategoryRows
};

function formatValue(value, unit) {
  if (unit === "money") return money.format(value);
  if (unit === "percent") return `${number.format(value)}%`;
  if (unit === "rating") return value.toFixed(1);
  return number.format(value);
}

function rowUnit(label) {
  if (label.includes("Sales") || label === "EBITDA" || label === "Controllable Expenses") return label === "EBITDA" ? "percent" : "money";
  if (label.includes("Rating") || label === "Guest Rating" || label === "Review Score") return "rating";
  if (label.includes("Count") || label.includes("Volume") || label.includes("Hours") || label.includes("Positions") || label.includes("Time")) return "number";
  return "percent";
}

function rowBetter(label, fallback = "high") {
  const lower = ["Food Cost", "Total COGS", "Food", "Beverage", "Packaging", "Waste", "Comps", "Variance", "Labor", "OT", "Turnover", "Open Positions", "Negative", "Refund", "Prime Cost", "Other Controllables", "COGS"];
  const higher = ["Training", "Sales", "Guest Count", "Average Check", "Review Score", "Review Count", "Positive", "Speed", "Food Quality", "Cleanliness", "Staff", "Accuracy", "Order Volume", "EBITDA", "Profit", "Safety"];
  if (higher.some((text) => label.includes(text))) return "high";
  if (lower.some((text) => label.includes(text))) return "low";
  return fallback;
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

function sortStores(stores, column) {
  return [...stores].sort((a, b) => {
    const direction = column.better === "low" ? 1 : -1;
    return (a[column.key] - b[column.key]) * direction || a.name.localeCompare(b.name);
  });
}

export default function ExecutiveScorecardPage() {
  const [activeModule, setActiveModule] = useState("executive");
  const [sortKey, setSortKey] = useState("sales");
  const [moduleSort, setModuleSort] = useState("Weekly Sales");
  const [selectedStore, setSelectedStore] = useState("carmel");
  const [sourceModal, setSourceModal] = useState(null);
  const moduleRef = useRef(null);

  const sortedStores = useMemo(() => sortStores(harborStores, scorecardColumns.find((column) => column.id === sortKey) || scorecardColumns[0]), [sortKey]);
  const selected = harborStores.find((store) => store.id === selectedStore) || harborStores[0];
  const rankLookup = useMemo(() => Object.fromEntries(scorecardColumns.map((column) => [column.id, ranksFor(harborStores.map((store) => store[column.key]), column.better)])), []);
  const salesTotal = harborStores.reduce((sum, store) => sum + store.weeklySales, 0);

  function navigateToModule(storeId, column) {
    setSelectedStore(storeId);
    setActiveModule(column.module);
    setModuleSort(column.drillLabel);
    window.requestAnimationFrame(() => moduleRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  function switchModule(id) {
    setActiveModule(id);
    if (id === "salesLabor") setModuleSort("Weekly Sales");
    if (id === "foodCost") setModuleSort("Food");
    if (id === "reviews") setModuleSort("Review Score");
    if (id === "pnl") setModuleSort("EBITDA");
    if (id === "safety") setModuleSort("Safety Score");
  }

  return (
    <main className="exec-shell command-style">
      <header className="exec-hero compact">
        <div>
          <Link href="/" className="exec-back">Restaurant Technology Solutions</Link>
          <div className="hhg-brand">
            <span className="hhg-logo"><Flame size={18} /><b>H&H</b></span>
            <div>
              <strong>Harbor & Hearth Restaurant Group</strong>
              <small>Eight-location restaurant intelligence demo</small>
            </div>
          </div>
          <h1>{modules.find((item) => item.id === activeModule)?.label}</h1>
          <p>Dense multi-location comparison across selected modules: Sales & Labor, Food Cost, Guest Reviews, P&L, and Safety Audits.</p>
        </div>
        <aside className="exec-positioning compact">
          <strong>Connection layer, not a replacement system</strong>
          <p>Toast, 7shifts, Google Reviews, MarginEdge, Restaurant365, and audit systems stay in place. This demo shows the operating view above them.</p>
        </aside>
      </header>

      <section className="exec-summary-bar">
        <span><b>{harborStores.length}</b> locations</span>
        <span><b>{money.format(salesTotal)}</b> weekly sales</span>
        <span><b>{selected.name}</b> selected</span>
        <span><b>FY demo</b> static data</span>
      </section>

      <nav className="client-module-tabs" aria-label="Client modules">
        {modules.map((item) => <button className={activeModule === item.id ? "active" : ""} key={item.id} type="button" onClick={() => switchModule(item.id)}>{item.label}</button>)}
      </nav>

      <section ref={moduleRef}>
        {activeModule === "executive" ? (
          <ExecutiveScorecard
            stores={sortedStores}
            allStores={harborStores}
            rankLookup={rankLookup}
            sortKey={sortKey}
            setSortKey={setSortKey}
            selectedStore={selectedStore}
            setSelectedStore={setSelectedStore}
            onMetricClick={navigateToModule}
          />
        ) : null}
        {activeModule === "salesLabor" ? <SalesLaborModule selectedStore={selectedStore} setSelectedStore={setSelectedStore} sortLabel={moduleSort} setSortLabel={setModuleSort} onOpenSource={setSourceModal} /> : null}
        {activeModule === "foodCost" ? <FoodCostModule selectedStore={selectedStore} setSelectedStore={setSelectedStore} sortLabel={moduleSort} setSortLabel={setModuleSort} onOpenSource={setSourceModal} /> : null}
        {activeModule === "reviews" ? <ReviewsModule selectedStore={selectedStore} setSelectedStore={setSelectedStore} sortLabel={moduleSort} setSortLabel={setModuleSort} onOpenSource={setSourceModal} /> : null}
        {activeModule === "pnl" ? <PnlModule selectedStore={selectedStore} setSelectedStore={setSelectedStore} sortLabel={moduleSort} setSortLabel={setModuleSort} onOpenSource={setSourceModal} /> : null}
        {activeModule === "safety" ? <SafetyModule selectedStore={selectedStore} setSelectedStore={setSelectedStore} sortLabel={moduleSort} setSortLabel={setModuleSort} onOpenSource={setSourceModal} /> : null}
      </section>

      {sourceModal ? <SourceModal source={sourceModal} onClose={() => setSourceModal(null)} /> : null}
    </main>
  );
}

function ExecutiveScorecard({ stores, allStores, rankLookup, sortKey, setSortKey, selectedStore, setSelectedStore, onMetricClick }) {
  return (
    <section className="exec-operating-layout">
      <article className="exec-panel table-first wide-only">
        <div className="exec-panel-head compact">
          <div>
            <h2>Executive Scorecard</h2>
            <p>Click headers to sort. Click values to open the connected module while keeping the selected store highlighted.</p>
          </div>
        </div>
        <div className="exec-table-wrap">
          <table className="exec-table operating-table">
            <thead>
              <tr>
                <th>Store</th>
                {scorecardColumns.map((column) => (
                  <th key={column.id}><SortButton active={sortKey === column.id} onClick={() => setSortKey(column.id)}>{column.label}</SortButton></th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stores.map((store) => {
                const originalIndex = allStores.findIndex((item) => item.id === store.id);
                return (
                  <tr className={selectedStore === store.id ? "selected" : ""} key={store.id} onClick={() => setSelectedStore(store.id)}>
                    <td><strong>{store.name}</strong><small>{store.manager}</small></td>
                    {scorecardColumns.map((column) => (
                      <td key={column.id}>
                        <MetricValue
                          value={store[column.key]}
                          unit={column.unit}
                          rank={rankLookup[column.id][originalIndex]}
                          total={allStores.length}
                          onClick={() => onMetricClick(store.id, column)}
                        />
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

function SalesLaborModule(props) {
  const rows = [
    { label: "Weekly Sales", unit: "money", better: "high", values: harborStores.map((s) => s.weeklySales) },
    { label: "Daily Avg Sales", unit: "money", better: "high", values: harborStores.map((s) => Math.round(s.weeklySales / 7)) },
    { label: "Guest Count", unit: "number", better: "high", values: [1510, 1348, 1288, 1640, 1322, 1114, 1268, 984] },
    { label: "Avg Ticket", unit: "money", better: "high", values: [39, 39.6, 36.6, 38, 38.8, 39.4, 38.8, 40.4] },
    { label: "Labor $", unit: "money", better: "low", values: harborStores.map((s) => Math.round(s.weeklySales * s.labor / 100)) },
    { label: "Labor %", unit: "percent", better: "low", values: harborStores.map((s) => s.labor) },
    { label: "Sales Per Labor Hour", unit: "money", better: "high", values: [84, 76, 71, 91, 88, 73, 82, 86] },
    { label: "Overtime %", unit: "percent", better: "low", values: [2.6, 5.8, 4.1, 2.1, 1.6, 3, 2.2, 1.4] }
  ];
  return <ModuleShell title="Sales & Labor" description="Sales and labor stay together so operators can see whether staffing is aligned with revenue." rows={rows} charts={<SalesLaborCharts />} {...props} />;
}

function FoodCostModule(props) {
  return (
    <ModuleShell
      title="Food Cost"
      description="COGS comparison across food, beverage, packaging, waste, comps, and variance to target."
      rows={foodCostRows.map((row) => ({ ...row, unit: "percent", better: rowBetter(row.label, "low") }))}
      charts={<FoodCostCharts />}
      subnav={<FoodCostDrills {...props} />}
      {...props}
    />
  );
}

function ReviewsModule(props) {
  return (
    <ModuleShell
      title="Guest Reviews"
      description="Store comparison for rating, review volume, sentiment, service, food quality, cleanliness, and speed."
      rows={reviewRows.map((row) => ({ ...row, unit: rowUnit(row.label), better: rowBetter(row.label, "high") }))}
      charts={<ReviewCharts />}
      below={<ReviewFeed />}
      {...props}
    />
  );
}

function PnlModule(props) {
  const controllables = [7800, 9100, 10400, 11300, 6900, 8200, 7600, 6100];
  const rows = [
    { label: "Sales", unit: "money", better: "high", values: harborStores.map((s) => s.weeklySales) },
    { label: "COGS %", unit: "percent", better: "low", values: harborStores.map((s) => s.foodCost + 2.4) },
    { label: "Labor %", unit: "percent", better: "low", values: harborStores.map((s) => s.labor) },
    { label: "Prime Cost %", unit: "percent", better: "low", values: pnlRows.find((row) => row.label === "Prime Cost").values },
    { label: "Controllable Expenses", unit: "money", better: "low", values: controllables },
    { label: "EBITDA $", unit: "money", better: "high", values: harborStores.map((s) => Math.round(s.weeklySales * s.ebitda / 100)) },
    { label: "EBITDA %", unit: "percent", better: "high", values: harborStores.map((s) => s.ebitda) }
  ];
  return <ModuleShell title="P&L" description="Executive financial view without accounting overload: sales, prime cost, controllables, and EBITDA." rows={rows} charts={<PnlCharts />} breakdown={<ExpenseBreakdown />} {...props} />;
}

function SafetyModule(props) {
  const rows = [
    { label: "Current Safety Score", unit: "score", better: "high", values: harborStores.map((s) => s.safety) },
    { label: "Critical Violations", unit: "number", better: "low", values: [0, 1, 4, 1, 0, 1, 0, 0] },
    { label: "Training Completion", unit: "percent", better: "high", values: [90, 84, 81, 88, 96, 87, 92, 98] },
    { label: "Days Since Last Audit", unit: "number", better: "low", values: [18, 37, 62, 29, 14, 33, 21, 11] }
  ];
  return <ModuleShell title="Safety Audits" description="Audit performance, safety history, violations, training, and operational risk by location." rows={rows} charts={<SafetyCharts />} below={<SafetyAuditTable selectedStore={props.selectedStore} />} {...props} />;
}

function ModuleShell({ title, description, rows, charts, below, subnav, breakdown, selectedStore, setSelectedStore, sortLabel, setSortLabel, onOpenSource }) {
  return (
    <section className="exec-operating-layout lower">
      <article className="exec-panel table-first wide-only">
        <div className="exec-panel-head compact">
          <div>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        </div>
        <ModuleTable rows={rows} selectedStore={selectedStore} setSelectedStore={setSelectedStore} sortLabel={sortLabel} setSortLabel={setSortLabel} onOpenSource={onOpenSource} />
        {charts}
        {subnav}
        {breakdown}
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
        <thead>
          <tr>
            <th>Store</th>
            {rows.map((row) => <th key={row.label}><SortButton active={sortLabel === row.label} onClick={() => setSortLabel(row.label)}>{row.label}</SortButton></th>)}
          </tr>
        </thead>
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
                      <button className="metric-with-rank" type="button" onClick={(event) => {
                        event.stopPropagation();
                        onOpenSource({ source: row.source || executiveModules.foodCost?.source || "Connected Source System", metric: `${store.name} / ${row.label}` });
                      }}>
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

function SortButton({ active, onClick, children }) {
  return <button className={active ? "active-sort" : ""} type="button" onClick={onClick}>{children}{active ? <Triangle size={10} /> : null}</button>;
}

function MetricValue({ value, unit, rank, total, onClick }) {
  return (
    <button className="metric-with-rank" type="button" onClick={(event) => { event.stopPropagation(); onClick(); }}>
      <span>{formatValue(value, unit)}</span>
      <RankBadge rank={rank} total={total} />
    </button>
  );
}

function RankBadge({ rank, total }) {
  return <b className={`rank-badge ${rankClass(rank, total)}`}>{rank}</b>;
}

function BarChart({ title, rows, unit = "number", better = "high" }) {
  const max = Math.max(...rows.map((row) => row.value));
  const ranks = ranksFor(rows.map((row) => row.value), better);
  return (
    <article className="report-chart">
      <h3>{title}</h3>
      <div className="horizontal-bars">
        {rows.map((row, index) => (
          <div key={row.label}>
            <span>{row.label}</span>
            <i><b style={{ width: `${Math.max(4, (row.value / max) * 100)}%` }} /></i>
            <strong>{formatValue(row.value, unit)} <RankBadge rank={ranks[index]} total={rows.length} /></strong>
          </div>
        ))}
      </div>
    </article>
  );
}

function LineChart({ title, labels, series, unit = "number" }) {
  const max = Math.max(...series);
  const min = Math.min(...series);
  const points = series.map((value, index) => `${(index / (series.length - 1)) * 100},${88 - ((value - min) / Math.max(1, max - min)) * 72}`).join(" ");
  return (
    <article className="report-chart">
      <h3>{title}</h3>
      <svg className="simple-line" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline points={points} fill="none" stroke="currentColor" strokeWidth="3" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="line-labels">{labels.map((label, index) => <span key={`${label}-${index}`}>{label}</span>)}</div>
      <small>{formatValue(series[series.length - 1], unit)} latest</small>
    </article>
  );
}

function StackedBars({ title, rows }) {
  return (
    <article className="report-chart">
      <h3>{title}</h3>
      <div className="stacked-bars">
        {harborStores.map((store, storeIndex) => (
          <div key={store.id}>
            <span>{store.name}</span>
            <i>{rows.map((row) => <b key={row.label} style={{ width: `${row.values[storeIndex]}%` }} title={`${row.label}: ${row.values[storeIndex]}%`} />)}</i>
          </div>
        ))}
      </div>
    </article>
  );
}

function SalesLaborCharts() {
  return <ChartGrid><BarChart title="Weekly Sales by Store" rows={harborStores.map((s) => ({ label: s.name, value: s.weeklySales }))} unit="money" /><LineChart title="Sales Trend by Day" labels={weeklyTrend.labels} series={weeklyTrend.sales} unit="money" /><BarChart title="Labor % by Store" rows={harborStores.map((s) => ({ label: s.name, value: s.labor }))} unit="percent" better="low" /><LineChart title="Sales vs Labor by Day" labels={weeklyTrend.labels} series={weeklyTrend.labor} unit="percent" /><StackedBars title="Dine-In / Takeout / Bar Mix" rows={salesMix} /><StackedBars title="Labor Role Mix" rows={laborRoleMix} /></ChartGrid>;
}

function FoodCostCharts() {
  return <ChartGrid><BarChart title="Food Cost % by Store" rows={harborStores.map((s) => ({ label: s.name, value: s.foodCost }))} unit="percent" better="low" /><StackedBars title="Cost Mix: Food / Beverage / Packaging" rows={foodCostRows.slice(1, 4)} /><BarChart title="Waste % by Store" rows={foodCostRows.find((row) => row.label === "Waste").values.map((value, index) => ({ label: harborStores[index].name, value }))} unit="percent" better="low" /><LineChart title="Food Cost Trend by Week" labels={["W1", "W2", "W3", "W4", "W5", "W6"]} series={[28.6, 29.1, 29.8, 30.2, 29.7, 30.4]} unit="percent" /></ChartGrid>;
}

function ReviewCharts() {
  return <ChartGrid><BarChart title="Review Rating by Store" rows={harborStores.map((s) => ({ label: s.name, value: s.reviewScore }))} unit="rating" /><LineChart title="Review Trend Over Time" labels={weeklyTrend.labels} series={weeklyTrend.reviews} unit="rating" /><StackedBars title="Sentiment Breakdown" rows={reviewRows.slice(2, 4)} /><BarChart title="Speed Complaints by Store" rows={reviewRows.find((row) => row.label === "Speed Of Service").values.map((value, index) => ({ label: harborStores[index].name, value: 100 - value }))} unit="percent" better="low" /></ChartGrid>;
}

function PnlCharts() {
  return <ChartGrid><BarChart title="EBITDA % by Store" rows={harborStores.map((s) => ({ label: s.name, value: s.ebitda }))} unit="percent" /><LineChart title="Profit Trend" labels={weeklyTrend.labels} series={weeklyTrend.ebitda} unit="percent" /><BarChart title="Prime Cost by Store" rows={pnlRows.find((row) => row.label === "Prime Cost").values.map((value, index) => ({ label: harborStores[index].name, value }))} unit="percent" better="low" /><StackedBars title="Expense Mix" rows={pnlRows.slice(4, 7)} /></ChartGrid>;
}

function SafetyCharts() {
  return <ChartGrid><BarChart title="Safety Score by Store" rows={harborStores.map((s) => ({ label: s.name, value: s.safety }))} unit="score" /><BarChart title="Critical Violations by Store" rows={[0, 1, 4, 1, 0, 1, 0, 0].map((value, index) => ({ label: harborStores[index].name, value }))} unit="number" better="low" /><BarChart title="Training Completion by Store" rows={[90, 84, 81, 88, 96, 87, 92, 98].map((value, index) => ({ label: harborStores[index].name, value }))} unit="percent" /><LineChart title="Audit Trend Over Time" labels={weeklyTrend.labels} series={weeklyTrend.safety} unit="score" /></ChartGrid>;
}

function ChartGrid({ children }) {
  return <div className="report-chart-grid">{children}</div>;
}

function FoodCostDrills({ selectedStore, setSelectedStore, onOpenSource }) {
  const [level, setLevel] = useState("food");
  const rows = level === "protein" ? proteinRows : foodDrillRows;
  return (
    <section className="module-subsection">
      <div className="exec-module-tabs compact">
        <button className={level === "food" ? "active" : ""} type="button" onClick={() => setLevel("food")}>Food Categories</button>
        <button className={level === "protein" ? "active" : ""} type="button" onClick={() => setLevel("protein")}>Protein Detail</button>
      </div>
      <ModuleTable rows={rows.map((row) => ({ ...row, unit: "percent", better: rowBetter(row.label, "low") }))} selectedStore={selectedStore} setSelectedStore={setSelectedStore} sortLabel={rows[0].label} setSortLabel={() => {}} onOpenSource={onOpenSource} />
    </section>
  );
}

function ExpenseBreakdown() {
  const rows = ["Sales", "COGS", "Labor", "Rent/Occupancy", "Utilities", "Marketing", "Repairs/Maintenance", "Other Controllables"];
  return <section className="module-subsection"><h3>Executive P&L Breakdown</h3><div className="breakdown-grid">{rows.map((row) => <span key={row}>{row}</span>)}</div></section>;
}

function ReviewFeed() {
  return <section className="module-subsection"><h3>Aggregated Review Feed</h3><div className="review-feed-compact">{reviewFeed.map((review) => <article key={`${review.store}-${review.comment}`}><strong>{review.store} / {review.rating}.0</strong><span>{review.source} / {review.tag}</span><p>{review.comment}</p></article>)}</div></section>;
}

function SafetyAuditTable({ selectedStore }) {
  return (
    <section className="module-subsection">
      <h3>Audit History</h3>
      <div className="exec-table-wrap">
        <table className="exec-table safety-table">
          <thead><tr><th>Store</th><th>Last Three Audits</th><th>Current Risk</th></tr></thead>
          <tbody>{harborStores.map((store) => <tr className={selectedStore === store.id ? "selected highlight" : ""} key={store.id}><td><strong>{store.name}</strong></td><td><div className="audit-badges">{safetyHistory[store.name].slice(1).map((status, index) => <span className={status} key={index}>{status}</span>)}</div></td><td>{store.safety >= 94 ? "Clean" : store.safety >= 88 ? "Watch" : "Needs Review"}</td></tr>)}</tbody>
        </table>
      </div>
    </section>
  );
}

function NotesPanel({ selectedStore, context }) {
  const store = harborStores.find((item) => item.id === selectedStore) || harborStores[0];
  return (
    <aside className="exec-panel exec-insights command-notes">
      <h2>Operator Notes</h2>
      <div><strong>{store.name}</strong><p>{store.profile}</p></div>
      <div><strong>{context}</strong><p>{context === "executive" ? "Use the scorecard to pick a metric, then move into the selected module for deeper comparison." : "This module keeps every location visible and uses rank badges to show relative position."}</p></div>
      <div><strong>Follow-up</strong><p>{actionItems.find((item) => item.store === store.name)?.issue || "No urgent action item in the current demo queue."}</p></div>
    </aside>
  );
}

function SourceModal({ source, onClose }) {
  return (
    <div className="source-modal-backdrop" role="presentation" onClick={onClose}>
      <section className="source-modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
        <span>External source system placeholder</span>
        <h2>{source.metric}</h2>
        <p>This would open the connected source system in a live deployment.</p>
        <div><Building2 size={18} /><strong>{source.source}</strong></div>
        <p>Restaurant Technology Solutions does not replace the source system. It keeps the cross-store comparison visible, then sends the operator to the record of truth when deeper action is required.</p>
        <button type="button" onClick={onClose}>Close</button>
      </section>
    </div>
  );
}
