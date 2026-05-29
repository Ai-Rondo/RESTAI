"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  BarChart3,
  Building2,
  CircleDollarSign,
  FileSpreadsheet,
  Layers,
  LineChart,
  PieChart,
  Table2,
  TrendingDown,
  TrendingUp,
  WalletCards
} from "lucide-react";

const stores = [
  { id: "all", name: "All Stores", code: "Group", baseSales: 0, cogs: 25.9, labor: 28.7, packaging: 4.4, controllables: 14.8, ebitda: 9.8 },
  { id: "spdw", name: "Speedway", code: "SPDWY", baseSales: 208333, cogs: 25.9, labor: 29.2, packaging: 4.7, controllables: 14.9, ebitda: 8.6 },
  { id: "gw", name: "Greenwood", code: "GW1273", baseSales: 250000, cogs: 24.8, labor: 27.6, packaging: 4.1, controllables: 13.4, ebitda: 12.4 },
  { id: "pm", name: "Park Meridian", code: "PM 1275", baseSales: 166667, cogs: 26.7, labor: 31.4, packaging: 4.3, controllables: 16.4, ebitda: 5.8 },
  { id: "cc", name: "Cool Creek", code: "CC 1364", baseSales: 225000, cogs: 25.2, labor: 29.0, packaging: 4.0, controllables: 14.6, ebitda: 9.5 },
  { id: "htc", name: "Hamilton TC", code: "HTC1304", baseSales: 291667, cogs: 27.3, labor: 30.3, packaging: 4.2, controllables: 15.4, ebitda: 8.4 }
];

const periods = ["Full Year 2024", "Q1 2024", "Q2 2024", "Q3 2024", "Q4 2024"];
const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const explorerTabs = ["Line Graph", "Rankings", "Heatmap", "Category Drilldown", "Full P&L"];

const storeProfiles = {
  htc: {
    annualSales: 3500000,
    occupancy: 19000,
    salesShape: [0.78, 0.84, 0.95, 1.04, 1.12, 1.2, 1.24, 1.17, 1.08, 1.1, 1.03, 1.45],
    cogs: [28.2, 28.1, 27.9, 27.7, 27.6, 27.4, 27.8, 27.5, 27.1, 27.0, 27.2, 27.6],
    labor: [31.9, 31.5, 31.0, 30.6, 30.2, 29.8, 30.1, 29.9, 29.6, 29.8, 30.4, 30.7],
    repairs: [3200, 2800, 3600, 4200, 3100, 3900, 4500, 4100, 3300, 3700, 5200, 4600],
    controllables: [15.9, 15.8, 15.6, 15.4, 15.2, 15.0, 15.4, 15.3, 15.0, 15.1, 15.5, 15.7],
    packaging: 4.2
  },
  pm: {
    annualSales: 2000000,
    occupancy: 12000,
    salesShape: [0.86, 0.82, 0.94, 0.98, 1.05, 1.08, 1.12, 1.04, 0.98, 1.02, 0.96, 1.15],
    cogs: [27.6, 27.8, 28.0, 28.4, 28.2, 27.9, 27.7, 27.6, 27.3, 27.2, 27.1, 27.4],
    labor: [32.3, 32.1, 31.8, 31.6, 31.9, 32.4, 32.8, 33.1, 33.4, 33.8, 34.1, 34.4],
    repairs: [1800, 2100, 2600, 11800, 2400, 2300, 3100, 2200, 1900, 2500, 2800, 2300],
    controllables: [16.8, 17.0, 16.7, 17.4, 16.6, 16.2, 16.4, 16.9, 16.5, 16.8, 17.1, 16.7],
    packaging: 4.25
  },
  gw: {
    annualSales: 3000000,
    occupancy: 7500,
    salesShape: [0.83, 0.9, 0.99, 1.05, 1.1, 1.15, 1.18, 1.13, 1.07, 1.09, 1.02, 1.28],
    cogs: [24.9, 24.8, 24.7, 24.6, 24.5, 24.4, 24.5, 24.6, 24.5, 24.4, 24.6, 24.7],
    labor: [27.9, 27.8, 27.7, 27.5, 27.6, 27.8, 27.9, 27.8, 27.6, 27.7, 27.8, 27.9],
    repairs: [1500, 1300, 1800, 1700, 1600, 1900, 2100, 1800, 1500, 1700, 1600, 2200],
    controllables: [13.6, 13.4, 13.3, 13.2, 13.0, 13.1, 13.2, 13.3, 13.1, 13.0, 13.2, 13.4],
    packaging: 4.05
  },
  cc: {
    annualSales: 2700000,
    occupancy: 10000,
    salesShape: [0.81, 0.88, 0.96, 1.02, 1.08, 1.21, 1.22, 1.14, 1.03, 1.07, 1.0, 1.32],
    cogs: [25.5, 25.3, 25.1, 25.0, 24.8, 25.2, 25.6, 25.0, 24.9, 25.1, 25.4, 25.2],
    labor: [28.4, 28.6, 28.8, 29.1, 29.6, 31.2, 31.4, 30.7, 29.2, 28.9, 29.0, 29.6],
    repairs: [2200, 2000, 2400, 6100, 2700, 2500, 3300, 2900, 2200, 2600, 2800, 3100],
    controllables: [14.4, 14.5, 14.7, 14.8, 14.6, 14.9, 15.0, 14.8, 14.5, 14.6, 14.7, 14.8],
    packaging: 4.0
  },
  spdw: {
    annualSales: 2500000,
    occupancy: 15000,
    salesShape: [0.84, 0.86, 0.93, 1.0, 1.07, 1.14, 1.18, 1.09, 1.01, 1.04, 0.98, 1.25],
    cogs: [25.8, 26.0, 26.4, 27.5, 26.8, 26.1, 25.9, 25.7, 25.8, 26.0, 26.2, 26.0],
    labor: [31.6, 30.9, 30.1, 29.5, 28.9, 28.5, 28.2, 28.4, 28.6, 28.8, 29.2, 29.0],
    repairs: [2300, 2500, 2900, 3400, 14500, 3600, 3100, 12800, 3300, 2800, 3000, 4100],
    controllables: [15.0, 15.2, 15.1, 15.4, 16.1, 15.2, 15.0, 16.0, 15.1, 15.0, 15.3, 15.4],
    packaging: 4.65
  }
};

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
  const profile = storeProfiles[store.id];
  const shapeTotal = profile.salesShape.reduce((sum, value) => sum + value, 0);
  return monthLabels.map((month, index) => {
    const sales = Math.round(profile.annualSales * profile.salesShape[index] / shapeTotal);
    const budget = Math.round(profile.annualSales / 12 * (0.96 + index * 0.006) * (index === 11 ? 1.08 : index >= 5 && index <= 7 ? 1.04 : 1));
    const prior = Math.round(sales * (index < 3 ? 0.93 : index < 8 ? 0.965 : 0.985));
    const cogsPercent = profile.cogs[index];
    const laborPercent = profile.labor[index];
    const packagingPercent = profile.packaging + (index % 3 - 1) * 0.08;
    const occupancy = profile.occupancy + (index === 0 ? 300 : index === 6 ? 250 : 0);
    const occupancyPercent = occupancy / sales * 100;
    const repairs = profile.repairs[index];
    const repairsPercent = repairs / sales * 100;
    const utilitiesPercent = 2.0 + (index >= 5 && index <= 8 ? 0.42 : index <= 1 ? 0.18 : 0) + (store.id === "pm" ? 0.16 : 0);
    const marketingPercent = 1.05 + (index === 10 || index === 11 ? 0.45 : 0) + (store.id === "gw" ? -0.12 : store.id === "pm" ? 0.18 : 0);
    const merchantFeesPercent = 2.65 + (index >= 5 && index <= 7 ? 0.1 : 0) + (store.id === "htc" ? 0.06 : 0);
    const controllablesPercent = profile.controllables[index];
    const adminPercent = 3.2 + (store.id === "pm" ? 0.7 : store.id === "gw" ? -0.25 : 0);
    const cogs = Math.round(sales * cogsPercent / 100);
    const labor = Math.round(sales * laborPercent / 100);
    const packaging = Math.round(sales * packagingPercent / 100);
    const controllables = Math.round(sales * controllablesPercent / 100);
    const utilities = Math.round(sales * utilitiesPercent / 100);
    const marketing = Math.round(sales * marketingPercent / 100);
    const merchantFees = Math.round(sales * merchantFeesPercent / 100);
    const admin = Math.round(sales * adminPercent / 100);
    const ebitda = sales - cogs - labor - packaging - controllables - occupancy - repairs - utilities - marketing - merchantFees - admin;
    const ebitdaPercent = ebitda / sales * 100;
    const netIncome = ebitda - Math.round(sales * 2.4 / 100);
    const netIncomePercent = netIncome / sales * 100;

    return {
      month,
      sales,
      budget,
      prior,
      cogs,
      labor,
      packaging,
      controllables,
      occupancy,
      repairs,
      utilities,
      marketing,
      merchantFees,
      ebitda,
      netIncome,
      cogsPercent,
      laborPercent,
      packagingPercent,
      controllablesPercent,
      occupancyPercent,
      repairsPercent,
      utilitiesPercent,
      marketingPercent,
      merchantFeesPercent,
      ebitdaPercent,
      netIncomePercent
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
    occupancy: acc.occupancy + row.occupancy,
    repairs: acc.repairs + row.repairs,
    utilities: acc.utilities + row.utilities,
    marketing: acc.marketing + row.marketing,
    merchantFees: acc.merchantFees + row.merchantFees,
    ebitda: acc.ebitda + row.ebitda,
    netIncome: acc.netIncome + row.netIncome
  }), { sales: 0, budget: 0, prior: 0, cogs: 0, labor: 0, packaging: 0, controllables: 0, occupancy: 0, repairs: 0, utilities: 0, marketing: 0, merchantFees: 0, ebitda: 0, netIncome: 0 });

  return {
    ...totals,
    cogsPercent: totals.sales ? totals.cogs / totals.sales * 100 : 0,
    laborPercent: totals.sales ? totals.labor / totals.sales * 100 : 0,
    packagingPercent: totals.sales ? totals.packaging / totals.sales * 100 : 0,
    controllablesPercent: totals.sales ? totals.controllables / totals.sales * 100 : 0,
    occupancyPercent: totals.sales ? totals.occupancy / totals.sales * 100 : 0,
    repairsPercent: totals.sales ? totals.repairs / totals.sales * 100 : 0,
    utilitiesPercent: totals.sales ? totals.utilities / totals.sales * 100 : 0,
    marketingPercent: totals.sales ? totals.marketing / totals.sales * 100 : 0,
    merchantFeesPercent: totals.sales ? totals.merchantFees / totals.sales * 100 : 0,
    ebitdaPercent: totals.sales ? totals.ebitda / totals.sales * 100 : 0,
    netIncomePercent: totals.sales ? totals.netIncome / totals.sales * 100 : 0,
    primeCostPercent: totals.sales ? (totals.cogs + totals.labor) / totals.sales * 100 : 0,
    primeCost: totals.cogs + totals.labor,
    budgetVariance: totals.sales - totals.budget,
    priorVariance: totals.sales - totals.prior
  };
}

const metricDefinitions = [
  { key: "sales", label: "Revenue / Net Sales", amountKey: "sales", percentKey: null, higherGood: true, target: null },
  { key: "traffic", label: "Traffic", amountKey: "traffic", percentKey: null, higherGood: true, target: null },
  { key: "averageCheck", label: "Average Check", amountKey: "averageCheck", percentKey: null, higherGood: true, target: null },
  { key: "cogs", label: "Food Cost / COGS", amountKey: "cogs", percentKey: "cogsPercent", higherGood: false, target: 26 },
  { key: "labor", label: "Labor", amountKey: "labor", percentKey: "laborPercent", higherGood: false, target: 29 },
  { key: "primeCost", label: "Prime Cost", amountKey: "primeCost", percentKey: "primeCostPercent", higherGood: false, target: 56 },
  { key: "occupancy", label: "Occupancy", amountKey: "occupancy", percentKey: "occupancyPercent", higherGood: false, target: 8 },
  { key: "repairs", label: "Repairs & Maintenance", amountKey: "repairs", percentKey: "repairsPercent", higherGood: false, target: 1.8 },
  { key: "utilities", label: "Utilities", amountKey: "utilities", percentKey: "utilitiesPercent", higherGood: false, target: 2.3 },
  { key: "marketing", label: "Marketing", amountKey: "marketing", percentKey: "marketingPercent", higherGood: false, target: 1.5 },
  { key: "packaging", label: "Packaging", amountKey: "packaging", percentKey: "packagingPercent", higherGood: false, target: 4.2 },
  { key: "merchantFees", label: "Merchant Fees", amountKey: "merchantFees", percentKey: "merchantFeesPercent", higherGood: false, target: 2.8 },
  { key: "controllables", label: "Controllables", amountKey: "controllables", percentKey: "controllablesPercent", higherGood: false, target: 15 },
  { key: "ebitda", label: "Store EBITDA", amountKey: "ebitda", percentKey: "ebitdaPercent", higherGood: true, target: 9 },
  { key: "netIncome", label: "Net Income", amountKey: "netIncome", percentKey: "netIncomePercent", higherGood: true, target: 6.5 }
];

function enrichRows(rows, storeId = "") {
  return rows.map((row, index) => {
    const traffic = Math.round(row.sales / (storeId === "pm" ? 18.7 : storeId === "gw" ? 20.6 : 19.4));
    return { ...row, traffic, averageCheck: row.sales / traffic, primeCost: row.cogs + row.labor, primeCostPercent: row.sales ? (row.cogs + row.labor) / row.sales * 100 : 0, monthIndex: index };
  });
}

function getMetric(row, metric, viewMode) {
  if (metric.key === "traffic" || metric.key === "averageCheck") return row[metric.amountKey] || 0;
  if (viewMode === "percent" && metric.percentKey) return row[metric.percentKey] || 0;
  return row[metric.amountKey] || 0;
}

function formatMetric(value, metric, viewMode) {
  if (metric.key === "traffic") return new Intl.NumberFormat("en-US").format(Math.round(value));
  if (metric.key === "averageCheck") return currency(value);
  if (viewMode === "percent" && metric.percentKey) return pct(value);
  return currency(value);
}

function statusFor(value, metric, viewMode) {
  if (!metric.target || viewMode !== "percent") return "Neutral";
  const spread = value - metric.target;
  if (metric.higherGood) return value >= metric.target ? "Strong" : spread > -1.5 ? "Watch" : "Off Target";
  return value <= metric.target ? "Strong" : spread < 1.5 ? "Watch" : "High";
}

function niceStep(range, viewMode) {
  if (viewMode === "percent") {
    if (range <= 4) return 1;
    if (range <= 10) return 2;
    if (range <= 25) return 5;
    return 10;
  }
  if (range <= 10000) return 2500;
  if (range <= 50000) return 10000;
  if (range <= 150000) return 25000;
  if (range <= 400000) return 50000;
  return 100000;
}

function axisTicks(values, metric, viewMode) {
  const relevant = [...values, viewMode === "percent" && metric.target ? metric.target : null].filter((value) => Number.isFinite(value));
  const rawMin = Math.min(...relevant);
  const rawMax = Math.max(...relevant);
  const padding = Math.max((rawMax - rawMin) * 0.12, viewMode === "percent" ? 1 : 2500);
  const step = niceStep(rawMax - rawMin + padding * 2, viewMode);
  const min = Math.max(0, Math.floor((rawMin - padding) / step) * step);
  const max = Math.ceil((rawMax + padding) / step) * step;
  const ticks = [];
  for (let value = min; value <= max + step / 2; value += step) ticks.push(value);
  return { min, max, ticks };
}

export default function PnlDemo() {
  const [selectedStore, setSelectedStore] = useState("all");
  const [period, setPeriod] = useState("Full Year 2024");
  const [selectedMetric, setSelectedMetric] = useState("labor");
  const [viewMode, setViewMode] = useState("percent");
  const [explorerTab, setExplorerTab] = useState("Line Graph");
  const [rankMode, setRankMode] = useState("top");
  const [detailStore, setDetailStore] = useState("pm");
  const [visibleLineStores, setVisibleLineStores] = useState(stores.filter((store) => store.id !== "all").map((store) => store.id));

  const visibleStores = selectedStore === "all" ? stores.filter((store) => store.id !== "all") : stores.filter((store) => store.id === selectedStore);
  const monthlyRows = useMemo(() => {
    if (selectedStore !== "all") return filterMonths(enrichRows(storeMonths[selectedStore], selectedStore), period);
    return filterMonths(monthLabels.map((month, index) => {
      const storeRows = stores.filter((store) => store.id !== "all").map((store) => enrichRows(storeMonths[store.id], store.id)[index]);
      return { month, ...sumRows(storeRows) };
    }), period);
  }, [selectedStore, period]);

  const totals = sumRows(monthlyRows);
  const storeComparisons = visibleStores.map((store) => {
    const rows = filterMonths(enrichRows(storeMonths[store.id], store.id), period);
    return { ...store, ...sumRows(rows) };
  }).sort((a, b) => b.ebitdaPercent - a.ebitdaPercent);

  const maxSales = Math.max(...monthlyRows.map((row) => row.sales));
  const selectedName = selectedStore === "all" ? "McAlister's Multi-Store Group" : stores.find((store) => store.id === selectedStore)?.name;
  const selectedMetricDef = metricDefinitions.find((metric) => metric.key === selectedMetric) || metricDefinitions[0];
  const explorerStores = stores.filter((store) => store.id !== "all");
  const allStoreExplorerRows = Object.fromEntries(explorerStores.map((store) => [store.id, enrichRows(storeMonths[store.id], store.id)]));
  const detailStoreInfo = stores.find((store) => store.id === detailStore) || explorerStores[0];

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

      <section className="portfolio-explorer">
        <div className="portfolio-explorer-head">
          <div>
            <p className="pnl-eyebrow">Portfolio Analytics Explorer</p>
            <h2>Compare stores, categories, trends, outliers, and full P&Ls without opening spreadsheets.</h2>
            <p>Uses the existing modeled store P&L data already loaded into this dashboard.</p>
          </div>
          <div className="explorer-controls">
            <label>Category<select value={selectedMetric} onChange={(event) => setSelectedMetric(event.target.value)}>{metricDefinitions.map((metric) => <option value={metric.key} key={metric.key}>{metric.label}</option>)}</select></label>
            <label>View Mode<select value={viewMode} onChange={(event) => setViewMode(event.target.value)} disabled={!selectedMetricDef.percentKey}><option value="dollar">Dollar Amount</option><option value="percent">Percent of Sales</option></select></label>
            <label>Full P&L Store<select value={detailStore} onChange={(event) => setDetailStore(event.target.value)}>{explorerStores.map((store) => <option value={store.id} key={store.id}>{store.name}</option>)}</select></label>
          </div>
        </div>

        <PortfolioRollup rows={Object.values(allStoreExplorerRows).flat()} stores={explorerStores} />

        <div className="explorer-tabs">{explorerTabs.map((tab) => <button className={explorerTab === tab ? "active" : ""} type="button" onClick={() => setExplorerTab(tab)} key={tab}>{tab}</button>)}</div>

        {explorerTab === "Line Graph" && (
          <MultiStoreLineGraph stores={explorerStores} rowsByStore={allStoreExplorerRows} metric={selectedMetricDef} viewMode={viewMode} visibleStores={visibleLineStores} setVisibleStores={setVisibleLineStores} />
        )}
        {explorerTab === "Rankings" && (
          <RankingsExplorer stores={explorerStores} rowsByStore={allStoreExplorerRows} metric={selectedMetricDef} viewMode={viewMode} rankMode={rankMode} setRankMode={setRankMode} />
        )}
        {explorerTab === "Heatmap" && (
          <MetricHeatmap stores={explorerStores} rowsByStore={allStoreExplorerRows} metric={selectedMetricDef} viewMode={viewMode} />
        )}
        {explorerTab === "Category Drilldown" && (
          <CategoryDrilldown stores={explorerStores} rowsByStore={allStoreExplorerRows} metric={selectedMetricDef} viewMode={viewMode} />
        )}
        {explorerTab === "Full P&L" && (
          <FullPnlDetail store={detailStoreInfo} rows={allStoreExplorerRows[detailStoreInfo.id]} />
        )}

        <div className="explorer-lower-grid">
          <VarianceExplainer store={detailStoreInfo} rows={allStoreExplorerRows[detailStoreInfo.id]} />
          <ExecutiveInsights rowsByStore={allStoreExplorerRows} stores={explorerStores} />
        </div>
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

function PortfolioRollup({ rows, stores }) {
  const total = sumRows(rows);
  return (
    <div className="portfolio-rollup">
      <article><span>Total Sales</span><strong>{currency(total.sales)}</strong><small>Entire portfolio · {stores.length} stores</small></article>
      <article><span>Total EBITDA</span><strong>{currency(total.ebitda)}</strong><small>{pct(total.ebitdaPercent)} margin</small></article>
      <article><span>Average Labor %</span><strong>{pct(total.laborPercent)}</strong><small>Weighted by sales</small></article>
      <article><span>Average Food Cost %</span><strong>{pct(total.cogsPercent)}</strong><small>COGS / sales</small></article>
      <article><span>Prime Cost %</span><strong>{pct(total.primeCostPercent)}</strong><small>COGS + labor</small></article>
      <article><span>Average Net Income</span><strong>{currency(total.netIncome)}</strong><small>{pct(total.netIncomePercent)} margin</small></article>
    </div>
  );
}

function MultiStoreLineGraph({ stores, rowsByStore, metric, viewMode, visibleStores, setVisibleStores }) {
  const colors = ["#67d0b3", "#d8a84f", "#ff8d5a", "#8bb9ff", "#c59cff"];
  const visibleRows = stores.filter((store) => visibleStores.includes(store.id));
  const allValues = visibleRows.flatMap((store) => rowsByStore[store.id].map((row) => getMetric(row, metric, viewMode)));
  const safeValues = allValues.length ? allValues : stores.flatMap((store) => rowsByStore[store.id].map((row) => getMetric(row, metric, viewMode)));
  const axis = axisTicks(safeValues, metric, viewMode);
  const avgPoints = monthLabels.map((month, index) => {
    const values = stores.map((store) => getMetric(rowsByStore[store.id][index], metric, viewMode));
    return values.reduce((sum, value) => sum + value, 0) / values.length;
  });
  const yFor = (value) => 88 - ((value - axis.min) / Math.max(1, axis.max - axis.min)) * 76;
  const makePoints = (values) => values.map((value, index) => `${(index / 11) * 100},${yFor(value)}`).join(" ");

  return (
    <article className="explorer-card">
      <div className="explorer-card-head">
        <div><h3>{metric.label} multi-store trend</h3><p>Hover-ready executive comparison with store toggles, company average, and target benchmark.</p></div>
        <div className="line-actions"><button type="button" onClick={() => setVisibleStores(stores.map((store) => store.id))}>Show All Stores</button><button type="button" onClick={() => setVisibleStores([])}>Hide All Stores</button></div>
      </div>
      <div className="line-legend">{stores.map((store, index) => <button className={visibleStores.includes(store.id) ? "active" : ""} type="button" key={store.id} onClick={() => setVisibleStores((current) => current.includes(store.id) ? current.filter((id) => id !== store.id) : [...current, store.id])}><i style={{ background: colors[index] }} />{store.name}</button>)}</div>
      <div className="portfolio-line-chart">
        <div className="line-chart-grid">
          <div className="line-y-axis">{axis.ticks.slice().reverse().map((tick) => <span key={tick}>{formatMetric(tick, metric, viewMode)}</span>)}</div>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-label={`${metric.label} line chart`}>
            {axis.ticks.map((tick) => <line className="axis-gridline" key={tick} x1="0" x2="100" y1={yFor(tick)} y2={yFor(tick)} vectorEffect="non-scaling-stroke" />)}
            {visibleRows.map((store) => <polyline key={store.id} points={makePoints(rowsByStore[store.id].map((row) => getMetric(row, metric, viewMode)))} fill="none" stroke={colors[stores.findIndex((item) => item.id === store.id)]} strokeWidth="2.8" vectorEffect="non-scaling-stroke" />)}
            {visibleRows.flatMap((store) => rowsByStore[store.id].map((row, index) => {
              const value = getMetric(row, metric, viewMode);
              return <circle className="line-data-point" key={`${store.id}-${row.month}`} cx={(index / 11) * 100} cy={yFor(value)} r="1.15" fill={colors[stores.findIndex((item) => item.id === store.id)]}><title>{store.name} {row.month}: {formatMetric(value, metric, viewMode)}</title></circle>;
            }))}
            <polyline className="benchmark-line" points={makePoints(avgPoints)} fill="none" stroke="#ffffff" strokeWidth="2.2" vectorEffect="non-scaling-stroke" />
            {metric.target && viewMode === "percent" && <polyline className="target-line" points={makePoints(monthLabels.map(() => metric.target))} fill="none" stroke="#f2c66f" strokeWidth="2" vectorEffect="non-scaling-stroke" />}
          </svg>
        </div>
        <div className="line-months"><span />{monthLabels.map((month) => <span key={month}>{month}</span>)}</div>
      </div>
      <div className="line-tooltip-row">{visibleRows.map((store) => {
        const latest = rowsByStore[store.id][11];
        const high = Math.max(...rowsByStore[store.id].map((row) => getMetric(row, metric, viewMode)));
        const low = Math.min(...rowsByStore[store.id].map((row) => getMetric(row, metric, viewMode)));
        return <span key={store.id}><strong>{store.name}</strong>{formatMetric(getMetric(latest, metric, viewMode), metric, viewMode)}<small>Range {formatMetric(low, metric, viewMode)} - {formatMetric(high, metric, viewMode)}</small></span>;
      })}</div>
    </article>
  );
}

function RankingsExplorer({ stores, rowsByStore, metric, viewMode, rankMode, setRankMode }) {
  const rows = stores.map((store) => {
    const months = rowsByStore[store.id];
    const current = getMetric(months[11], metric, viewMode);
    const previous = getMetric(months[10], metric, viewMode);
    const avg3 = months.slice(9).reduce((sum, row) => sum + getMetric(row, metric, viewMode), 0) / 3;
    const avg12 = months.reduce((sum, row) => sum + getMetric(row, metric, viewMode), 0) / 12;
    return { store, current, previous, avg3, avg12, variance: current - previous, status: statusFor(current, metric, viewMode) };
  }).sort((a, b) => {
    const sort = metric.higherGood ? b.current - a.current : a.current - b.current;
    return rankMode === "top" ? sort : -sort;
  });
  return (
    <article className="explorer-card">
      <div className="explorer-card-head"><div><h3>Rankings mode</h3><p>Current month, previous month, 3-month average, 12-month average, variance, percentile, and status.</p></div><div className="line-actions"><button className={rankMode === "top" ? "active" : ""} type="button" onClick={() => setRankMode("top")}>Top View</button><button className={rankMode === "bottom" ? "active" : ""} type="button" onClick={() => setRankMode("bottom")}>Bottom View</button></div></div>
      <div className="explorer-table-wrap"><table className="explorer-table"><thead><tr><th>Rank</th><th>Store</th><th>Current Month</th><th>Previous Month</th><th>3 Month Avg</th><th>12 Month Avg</th><th>Variance</th><th>Percentile</th><th>Status</th></tr></thead><tbody>{rows.map((row, index) => <tr key={row.store.id}><td>#{index + 1}</td><td><strong>{row.store.name}</strong><small>{row.store.code}</small></td><td>{formatMetric(row.current, metric, viewMode)}</td><td>{formatMetric(row.previous, metric, viewMode)}</td><td>{formatMetric(row.avg3, metric, viewMode)}</td><td>{formatMetric(row.avg12, metric, viewMode)}</td><td className={row.variance >= 0 ? "good-text" : "bad-text"}>{row.variance >= 0 ? "▲ " : "▼ "}{formatMetric(Math.abs(row.variance), metric, viewMode)}</td><td>{Math.round(((rows.length - index) / rows.length) * 100)}th</td><td><span className={`explorer-status ${row.status.toLowerCase().replace(" ", "-")}`}>{row.status}</span></td></tr>)}</tbody></table></div>
    </article>
  );
}

function MetricHeatmap({ stores, rowsByStore, metric, viewMode }) {
  const allValues = stores.flatMap((store) => rowsByStore[store.id].map((row) => getMetric(row, metric, viewMode)));
  const min = Math.min(...allValues);
  const max = Math.max(...allValues);
  return (
    <article className="explorer-card">
      <div className="explorer-card-head"><div><h3>Heatmap mode</h3><p>Stores by month for the selected metric. Green is strong, yellow is watch, red is high risk.</p></div></div>
      <div className="pnl-heatmap">
        <div className="heat-head"><span>Store</span>{monthLabels.map((month) => <span key={month}>{month}</span>)}</div>
        {stores.map((store) => <div className="heat-row-pnl" key={store.id}><strong>{store.name}</strong>{rowsByStore[store.id].map((row) => {
          const value = getMetric(row, metric, viewMode);
          const normalized = (value - min) / Math.max(1, max - min);
          const good = metric.higherGood ? normalized : 1 - normalized;
          return <span key={row.month} style={{ "--score": good }} title={`${store.name} ${row.month}: ${formatMetric(value, metric, viewMode)}`}>{formatMetric(value, metric, viewMode)}</span>;
        })}</div>)}
      </div>
    </article>
  );
}

function CategoryDrilldown({ stores, rowsByStore, metric, viewMode }) {
  const movers = stores.map((store) => {
    const rows = rowsByStore[store.id];
    const change = getMetric(rows[11], metric, viewMode) - getMetric(rows[7], metric, viewMode);
    const avg = rows.reduce((sum, row) => sum + getMetric(row, metric, viewMode), 0) / rows.length;
    return { store, change, avg };
  }).sort((a, b) => Math.abs(b.change) - Math.abs(a.change));
  return (
    <article className="explorer-card drilldown-card">
      <div className="explorer-card-head"><div><h3>{metric.label} category drilldown</h3><p>Trend, ranking, month-to-month changes, benchmark, biggest movers, and insights.</p></div></div>
      <div className="drilldown-grid">
        {movers.map((item) => <div key={item.store.id}><strong>{item.store.name}</strong><span>{formatMetric(item.avg, metric, viewMode)} avg</span><p className={item.change >= 0 ? "good-text" : "bad-text"}>{item.change >= 0 ? "Increased" : "Decreased"} {formatMetric(Math.abs(item.change), metric, viewMode)} over the last 4 months.</p></div>)}
      </div>
      <div className="pnl-insight-grid">
        <p>{movers[0].store.name} is the biggest mover for {metric.label.toLowerCase()} over the last four months.</p>
        <p>{movers[movers.length - 1].store.name} remains closest to the group average.</p>
        <p>{metric.target ? `Benchmark target: ${pct(metric.target)}. Stores outside target are highlighted in rankings and heatmap views.` : "Use this view to compare store movement against the portfolio average."}</p>
      </div>
    </article>
  );
}

function FullPnlDetail({ store, rows }) {
  const current = rows[11];
  const ytd = sumRows(rows);
  const lines = [
    ["Revenue", "sales"], ["Food Cost", "cogs"], ["Labor", "labor"], ["Prime Cost", "primeCost"], ["Occupancy", "occupancy"],
    ["Utilities", "utilities"], ["Repairs", "repairs"], ["Marketing", "marketing"], ["Merchant Fees", "merchantFees"], ["Packaging", "packaging"],
    ["Controllables", "controllables"], ["EBITDA", "ebitda"], ["Net Income", "netIncome"]
  ];
  return (
    <article className="explorer-card full-pnl-card">
      <div className="explorer-card-head"><div><h3>Full P&L detail: {store.name}</h3><p>Actual P&L layout with current month, YTD, budget, prior year, variance, and percent of sales.</p></div><div className="line-actions"><button type="button">Export</button><button type="button">Print</button></div></div>
      <details open><summary>Operating P&L</summary><div className="explorer-table-wrap"><table className="explorer-table"><thead><tr><th>Line Item</th><th>Current Month</th><th>YTD</th><th>Budget</th><th>Prior Year</th><th>Variance $</th><th>Variance %</th><th>% of Sales</th></tr></thead><tbody>{lines.map(([label, key]) => {
        const currentValue = current[key] || 0;
        const ytdValue = ytd[key] || 0;
        const budget = key === "sales" ? current.budget : currentValue * 1.025;
        const prior = key === "sales" ? current.prior : currentValue * 0.96;
        const variance = currentValue - budget;
        return <tr key={key}><td><strong>{label}</strong></td><td>{currency(currentValue)}</td><td>{currency(ytdValue)}</td><td>{currency(budget)}</td><td>{currency(prior)}</td><td className={variance >= 0 ? "good-text" : "bad-text"}>{currency(variance)}</td><td>{pct(budget ? variance / budget * 100 : 0)}</td><td>{pct(current.sales ? currentValue / current.sales * 100 : 0)}</td></tr>;
      })}</tbody></table></div></details>
    </article>
  );
}

function VarianceExplainer({ store, rows }) {
  const current = rows[11];
  const previous = rows[10];
  const drivers = [
    ["Sales", current.sales - previous.sales, true],
    ["Labor", -(current.labor - previous.labor), false],
    ["Repairs", -(current.repairs - previous.repairs), false],
    ["Utilities", -(current.utilities - previous.utilities), false],
    ["Marketing", -(current.marketing - previous.marketing), false]
  ];
  const netChange = current.ebitda - previous.ebitda;
  const max = Math.max(...drivers.map((driver) => Math.abs(driver[1])), Math.abs(netChange));
  return (
    <article className="explorer-card variance-card">
      <div className="explorer-card-head"><div><h3>Variance explainer</h3><p>{store.name} EBITDA {netChange >= 0 ? "up" : "down"} {currency(Math.abs(netChange))} vs prior month.</p></div></div>
      <div className="waterfall">{drivers.map(([label, value]) => <div key={label}><span>{label}</span><i className={value >= 0 ? "positive" : "negative"} style={{ width: `${Math.max(12, Math.abs(value) / max * 100)}%` }} /><strong>{value >= 0 ? "+" : "-"}{currency(Math.abs(value))}</strong></div>)}</div>
      <footer className={netChange >= 0 ? "good-text" : "bad-text"}>Net change: {netChange >= 0 ? "+" : "-"}{currency(Math.abs(netChange))}</footer>
    </article>
  );
}

function ExecutiveInsights({ rowsByStore, stores }) {
  const latest = stores.map((store) => ({ store, row: rowsByStore[store.id][11], q4: sumRows(rowsByStore[store.id].slice(9)) }));
  const strongestEbitda = [...latest].sort((a, b) => b.q4.ebitdaPercent - a.q4.ebitdaPercent)[0];
  const lowestControllables = [...latest].sort((a, b) => a.q4.controllablesPercent - b.q4.controllablesPercent)[0];
  const laborPressure = [...latest].sort((a, b) => b.q4.laborPercent - a.q4.laborPercent)[0];
  return (
    <article className="explorer-card executive-insights">
      <div className="explorer-card-head"><div><h3>Executive insights</h3><p>Automatically generated from existing portfolio trends.</p></div></div>
      <div className="pnl-insight-grid">
        <p>{laborPressure.store.name} has exceeded group labor targets across the recent quarter.</p>
        <p>{strongestEbitda.store.name} has the strongest EBITDA trend over the last quarter.</p>
        <p>{lowestControllables.store.name} maintains the lowest controllable expenses in the portfolio.</p>
        <p>Repairs increased significantly in March and April across Park Meridian and Cool Creek.</p>
        <p>Food cost variance has narrowed over the last six months as COGS stabilized in most locations.</p>
      </div>
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
