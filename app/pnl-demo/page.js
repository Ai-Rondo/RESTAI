"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  BarChart3,
  Building2,
  CircleDollarSign,
  FileSpreadsheet,
  LineChart,
  PieChart,
  TrendingDown,
  TrendingUp,
  WalletCards
} from "lucide-react";

const stores = [
  { id: "all", name: "All Stores", code: "Group", baseSales: 0, cogs: 25.9, labor: 28.7, packaging: 4.4, controllables: 14.8, ebitda: 9.8 },
  { id: "spdw", name: "Speedway", code: "SPDWY", baseSales: 211000, cogs: 25.3, labor: 27.4, packaging: 4.7, controllables: 14.1, ebitda: 10.7 },
  { id: "gw", name: "Greenwood", code: "GW1273", baseSales: 219000, cogs: 25.1, labor: 28.1, packaging: 4.2, controllables: 13.9, ebitda: 11.4 },
  { id: "pm", name: "Park Meridian", code: "PM 1275", baseSales: 123000, cogs: 25.6, labor: 30.8, packaging: 4.0, controllables: 16.4, ebitda: 6.7 },
  { id: "cc", name: "Cool Creek", code: "CC 1364", baseSales: 188000, cogs: 26.2, labor: 29.4, packaging: 3.6, controllables: 15.1, ebitda: 8.5 },
  { id: "htc", name: "Hamilton TC", code: "HTC1304", baseSales: 199000, cogs: 27.1, labor: 30.1, packaging: 3.7, controllables: 15.8, ebitda: 7.2 }
];

const periods = ["Full Year 2024", "Q1 2024", "Q2 2024", "Q3 2024", "Q4 2024"];
const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const seasonality = [0.82, 0.87, 0.97, 1.04, 1.1, 1.15, 1.19, 1.16, 1.08, 1.12, 1.06, 1.24];

const sourceFiles = [
  "SPDWY: PD 1, 2, 3, 10, 11, 12, 13 workbooks",
  "GW1273: late 2021 + 2022 P&Ls",
  "PM 1275: 2022 P&Ls and trial balance PDFs",
  "CC 1364: 2018 P&Ls",
  "HTC1304: 2017-2018 P&Ls and profit review"
];

function currency(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

function compactCurrency(value) {
  return new Intl.NumberFormat("en-US", { notation: "compact", style: "currency", currency: "USD", maximumFractionDigits: 1 }).format(value);
}

function pct(value) {
  return `${value.toFixed(1)}%`;
}

function makeStoreMonths(store) {
  return monthLabels.map((month, index) => {
    const sales = Math.round(store.baseSales * seasonality[index] * (1 + Math.sin((index + store.baseSales / 10000) * 0.77) * 0.025));
    const budget = Math.round(sales * (index % 4 === 0 ? 1.025 : index % 3 === 0 ? 0.985 : 1.01));
    const prior = Math.round(sales * (index < 3 ? 0.94 : index < 8 ? 0.965 : 0.985));
    const cogsPercent = store.cogs + Math.sin(index * 0.9) * 0.7 + (index === 10 ? 0.9 : 0);
    const laborPercent = store.labor + Math.cos(index * 0.8) * 0.9 + (index === 0 || index === 1 ? 1.1 : 0);
    const packagingPercent = store.packaging + Math.sin(index * 0.6) * 0.25;
    const controllablesPercent = store.controllables + Math.cos(index * 0.5) * 0.55;
    const ebitdaPercent = 100 - cogsPercent - laborPercent - packagingPercent - controllablesPercent - 19.6;

    return {
      month,
      sales,
      budget,
      prior,
      cogs: Math.round(sales * cogsPercent / 100),
      labor: Math.round(sales * laborPercent / 100),
      packaging: Math.round(sales * packagingPercent / 100),
      controllables: Math.round(sales * controllablesPercent / 100),
      ebitda: Math.round(sales * ebitdaPercent / 100),
      cogsPercent,
      laborPercent,
      packagingPercent,
      controllablesPercent,
      ebitdaPercent
    };
  });
}

const storeMonths = Object.fromEntries(stores.filter((store) => store.id !== "all").map((store) => [store.id, makeStoreMonths(store)]));

function filterMonths(months, period) {
  if (period === "Q1 2024") return months.slice(0, 3);
  if (period === "Q2 2024") return months.slice(3, 6);
  if (period === "Q3 2024") return months.slice(6, 9);
  if (period === "Q4 2024") return months.slice(9, 12);
  return months;
}

function sumRows(rows) {
  const totals = rows.reduce((acc, row) => ({
    sales: acc.sales + row.sales,
    budget: acc.budget + row.budget,
    prior: acc.prior + row.prior,
    cogs: acc.cogs + row.cogs,
    labor: acc.labor + row.labor,
    packaging: acc.packaging + row.packaging,
    controllables: acc.controllables + row.controllables,
    ebitda: acc.ebitda + row.ebitda
  }), { sales: 0, budget: 0, prior: 0, cogs: 0, labor: 0, packaging: 0, controllables: 0, ebitda: 0 });

  return {
    ...totals,
    cogsPercent: totals.sales ? totals.cogs / totals.sales * 100 : 0,
    laborPercent: totals.sales ? totals.labor / totals.sales * 100 : 0,
    packagingPercent: totals.sales ? totals.packaging / totals.sales * 100 : 0,
    controllablesPercent: totals.sales ? totals.controllables / totals.sales * 100 : 0,
    ebitdaPercent: totals.sales ? totals.ebitda / totals.sales * 100 : 0,
    primeCostPercent: totals.sales ? (totals.cogs + totals.labor) / totals.sales * 100 : 0,
    budgetVariance: totals.sales - totals.budget,
    priorVariance: totals.sales - totals.prior
  };
}

export default function PnlDemo() {
  const [selectedStore, setSelectedStore] = useState("all");
  const [period, setPeriod] = useState("Full Year 2024");

  const visibleStores = selectedStore === "all" ? stores.filter((store) => store.id !== "all") : stores.filter((store) => store.id === selectedStore);
  const monthlyRows = useMemo(() => {
    if (selectedStore !== "all") return filterMonths(storeMonths[selectedStore], period);
    return filterMonths(monthLabels.map((month, index) => {
      const storeRows = Object.values(storeMonths).map((months) => months[index]);
      return { month, ...sumRows(storeRows) };
    }), period);
  }, [selectedStore, period]);

  const totals = sumRows(monthlyRows);
  const storeComparisons = visibleStores.map((store) => {
    const rows = filterMonths(storeMonths[store.id], period);
    return { ...store, ...sumRows(rows) };
  }).sort((a, b) => b.ebitdaPercent - a.ebitdaPercent);

  const maxSales = Math.max(...monthlyRows.map((row) => row.sales));
  const selectedName = selectedStore === "all" ? "McAlister's Multi-Store Group" : stores.find((store) => store.id === selectedStore)?.name;

  return (
    <main className="pnl-shell">
      <header className="pnl-hero">
        <div>
          <Link className="pnl-back" href="/"><ArrowLeft size={16} /> Restaurant Intelligence</Link>
          <p className="pnl-eyebrow">P&L visibility module concept</p>
          <h1>Restaurant Financial Performance Dashboard</h1>
          <p>Modeled 2024 calendar-year view for five McAlister&apos;s stores, anchored to historical P&L files with missing periods reasonably modeled for demo continuity.</p>
        </div>
        <div className="pnl-controls">
          <label>Store<select value={selectedStore} onChange={(event) => setSelectedStore(event.target.value)}>{stores.map((store) => <option value={store.id} key={store.id}>{store.name}</option>)}</select></label>
          <label>Period<select value={period} onChange={(event) => setPeriod(event.target.value)}>{periods.map((item) => <option key={item}>{item}</option>)}</select></label>
        </div>
      </header>

      <section className="pnl-context">
        <div><Building2 size={18} /><strong>{selectedName}</strong><span>{period}</span></div>
        <p>Modeled data, built from P&L anchors. Not accounting output.</p>
      </section>

      <section className="pnl-kpis">
        <Kpi icon={CircleDollarSign} label="Net Sales" value={currency(totals.sales)} detail={`${currency(totals.budgetVariance)} vs budget`} positive={totals.budgetVariance >= 0} />
        <Kpi icon={PieChart} label="Prime Cost" value={pct(totals.primeCostPercent)} detail={`${pct(totals.cogsPercent)} COGS + ${pct(totals.laborPercent)} labor`} warning={totals.primeCostPercent > 56} />
        <Kpi icon={WalletCards} label="EBITDA" value={currency(totals.ebitda)} detail={`${pct(totals.ebitdaPercent)} margin`} positive={totals.ebitdaPercent >= 9} />
        <Kpi icon={TrendingUp} label="Prior Year" value={currency(totals.priorVariance)} detail={`${pct(totals.prior ? totals.priorVariance / totals.prior * 100 : 0)} sales growth`} positive={totals.priorVariance >= 0} />
      </section>

      <section className="pnl-grid">
        <article className="pnl-panel span-8">
          <PanelHeader icon={LineChart} title="Sales, Budget, Prior Year" meta="Monthly 2024 model" />
          <div className="pnl-combo-chart">
            {monthlyRows.map((row) => (
              <div className="combo-month" key={row.month}>
                <div className="combo-bars">
                  <span className="budget" style={{ height: `${Math.max((row.budget / maxSales) * 100, 8)}%` }} />
                  <span className="actual" style={{ height: `${Math.max((row.sales / maxSales) * 100, 8)}%` }} />
                  <span className="prior" style={{ height: `${Math.max((row.prior / maxSales) * 100, 8)}%` }} />
                </div>
                <small>{row.month}</small>
              </div>
            ))}
          </div>
          <div className="chart-legend"><span className="actual-dot">Actual/model</span><span className="budget-dot">Budget</span><span className="prior-dot">Prior year</span></div>
        </article>

        <article className="pnl-panel span-4">
          <PanelHeader icon={PieChart} title="Cost Structure" meta="Percent of sales" />
          <div className="cost-stack">
            <CostLine label="COGS" value={totals.cogsPercent} />
            <CostLine label="Labor" value={totals.laborPercent} />
            <CostLine label="Packaging" value={totals.packagingPercent} />
            <CostLine label="Controllables" value={totals.controllablesPercent} />
            <CostLine label="EBITDA" value={totals.ebitdaPercent} positive />
          </div>
        </article>
      </section>

      <section className="pnl-grid">
        <article className="pnl-panel span-7">
          <PanelHeader icon={BarChart3} title="Store Ranking" meta="Sorted by EBITDA margin" />
          <div className="store-rank-table">
            <div className="rank-head"><span>Store</span><span>Sales</span><span>Prime</span><span>EBITDA</span><span>Vs Budget</span></div>
            {storeComparisons.map((store) => (
              <div className="rank-row" key={store.id}>
                <span><strong>{store.name}</strong><small>{store.code}</small></span>
                <span>{compactCurrency(store.sales)}</span>
                <span>{pct(store.primeCostPercent)}</span>
                <span className={store.ebitdaPercent >= 9 ? "good-text" : "warn-text"}>{pct(store.ebitdaPercent)}</span>
                <span className={store.budgetVariance >= 0 ? "good-text" : "bad-text"}>{compactCurrency(store.budgetVariance)}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="pnl-panel span-5">
          <PanelHeader icon={TrendingDown} title="Attention Signals" meta="P&L exceptions" />
          <div className="pnl-alerts">
            <div><strong>Prime cost watch</strong><p>Park Meridian and Hamilton TC trend above the group target, mostly from labor pressure.</p></div>
            <div><strong>COGS variance</strong><p>Hamilton TC modeled COGS runs above the group average, matching older P&L pressure patterns.</p></div>
            <div><strong>Budget discipline</strong><p>Speedway and Greenwood remain the strongest stores for budget comparison and margin.</p></div>
          </div>
        </article>
      </section>

      <section className="pnl-grid">
        <article className="pnl-panel span-6">
          <PanelHeader icon={FileSpreadsheet} title="Source Coverage" meta="Historical files used as anchors" />
          <div className="pnl-source-list">{sourceFiles.map((file) => <span key={file}>{file}</span>)}</div>
        </article>
        <article className="pnl-panel span-6">
          <PanelHeader icon={FileSpreadsheet} title="Modeling Notes" meta="2024 demo construction" />
          <div className="pnl-notes">
            <p>Store-level 2024 values were modeled from observed P&L line structure: total sales, food and beverage mix, COGS, packaging, labor, controllables, budget columns, and prior-year columns.</p>
            <p>Stores with partial or older files were normalized into a full calendar-year demo so the module can show trends and multi-store comparison.</p>
          </div>
        </article>
      </section>
    </main>
  );
}

function Kpi({ icon: Icon, label, value, detail, positive = false, warning = false }) {
  return (
    <article className={warning ? "pnl-kpi warning" : positive ? "pnl-kpi positive" : "pnl-kpi"}>
      <Icon size={21} />
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </article>
  );
}

function PanelHeader({ icon: Icon, title, meta }) {
  return (
    <div className="pnl-panel-heading">
      <h2><Icon size={18} /> {title}</h2>
      <span>{meta}</span>
    </div>
  );
}

function CostLine({ label, value, positive = false }) {
  return (
    <div className="cost-line">
      <div><span>{label}</span><strong className={positive ? "good-text" : ""}>{pct(value)}</strong></div>
      <i><b className={positive ? "positive-bar" : ""} style={{ width: `${Math.min(value * 2.5, 100)}%` }} /></i>
    </div>
  );
}
