"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  BadgeCheck,
  Building2,
  ChevronRight,
  CircleDollarSign,
  ExternalLink,
  Flame,
  ForkKnife,
  HeartPulse,
  LineChart,
  ShieldCheck,
  Truck,
  Users
} from "lucide-react";
import {
  actionItems,
  calculateStoreHealth,
  deliveryRows,
  executiveModules,
  foodCostRows,
  foodDrillRows,
  harborStores,
  laborRows,
  pnlRows,
  proteinRows,
  reviewRows,
  salesRows,
  safetyHistory
} from "@/data/harborHearthExecutiveData";

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const number = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });

const metricConfig = {
  score: { label: "Store Health Score", icon: HeartPulse, key: "healthScore", better: "high", unit: "score", route: "Executive" },
  sales: { label: "Weekly Sales", icon: LineChart, key: "weeklySales", trend: "salesTrend", better: "high", unit: "money", route: "Sales" },
  foodCost: { label: "Food Cost %", icon: ForkKnife, key: "foodCost", trend: "foodTrend", better: "low", unit: "percent", route: "Food Cost" },
  labor: { label: "Labor %", icon: Users, key: "labor", trend: "laborTrend", better: "low", unit: "percent", route: "Labor" },
  reviews: { label: "Guest Review Score", icon: BadgeCheck, key: "reviewScore", trend: "reviewTrend", better: "high", unit: "rating", route: "Reviews" },
  ebitda: { label: "EBITDA %", icon: CircleDollarSign, key: "ebitda", trend: "ebitdaTrend", better: "high", unit: "percent", route: "P&L" },
  safety: { label: "Safety Score", icon: ShieldCheck, key: "safety", trend: "safetyTrend", better: "high", unit: "score", route: "Safety" },
  delivery: { label: "Delivery Performance", icon: Truck, key: "delivery", trend: "deliveryTrend", better: "high", unit: "score", route: "Delivery" },
  alerts: { label: "Manager Alerts", icon: AlertTriangle, key: "managerAlerts", better: "low", unit: "number", route: "Action Center" },
  actions: { label: "Open Action Items", icon: AlertTriangle, key: "openActions", better: "low", unit: "number", route: "Action Center" }
};

const moduleRows = {
  sales: salesRows,
  foodCost: foodCostRows,
  reviews: reviewRows,
  delivery: deliveryRows,
  labor: laborRows,
  ebitda: pnlRows
};

const moduleTrail = {
  sales: ["Sales"],
  foodCost: ["Food Cost"],
  food: ["Food Cost", "Food"],
  protein: ["Food Cost", "Food", "Protein"],
  reviews: ["Reviews"],
  delivery: ["Delivery"],
  labor: ["Labor"],
  ebitda: ["P&L"],
  safety: ["Safety"],
  actions: ["Action Center"]
};

function formatValue(value, unit) {
  if (unit === "money") return money.format(value);
  if (unit === "percent") return `${number.format(value)}%`;
  if (unit === "rating") return value.toFixed(1);
  return number.format(value);
}

function trendClass(value, better = "high") {
  if (!value) return "flat";
  const good = better === "high" ? value > 0 : value < 0;
  return good ? "good" : "bad";
}

function statusFor(score) {
  if (score >= 90) return "Excellent";
  if (score >= 84) return "Stable";
  if (score >= 78) return "Watch";
  return "Needs Attention";
}

function rankStores(stores, config) {
  return [...stores].sort((a, b) => {
    const direction = config.better === "low" ? 1 : -1;
    return (a[config.key] - b[config.key]) * direction;
  });
}

export default function ExecutiveScorecardPage() {
  const [sortMetric, setSortMetric] = useState("score");
  const [module, setModule] = useState("foodCost");
  const [selectedStore, setSelectedStore] = useState("greenwood");
  const [sourceModal, setSourceModal] = useState(null);

  const stores = useMemo(() => harborStores.map((store) => ({ ...store, healthScore: calculateStoreHealth(store) })), []);
  const sortedStores = useMemo(() => rankStores(stores, metricConfig[sortMetric]), [stores, sortMetric]);
  const selected = stores.find((store) => store.id === selectedStore) || stores[0];
  const portfolio = useMemo(() => ({
    sales: stores.reduce((sum, store) => sum + store.weeklySales, 0),
    health: Math.round(stores.reduce((sum, store) => sum + store.healthScore, 0) / stores.length),
    actions: stores.reduce((sum, store) => sum + store.openActions, 0),
    alerts: stores.reduce((sum, store) => sum + store.managerAlerts, 0)
  }), [stores]);

  const currentRows = module === "food" ? foodDrillRows : module === "protein" ? proteinRows : moduleRows[module] || [];

  return (
    <main className="exec-shell">
      <header className="exec-hero">
        <div>
          <Link href="/" className="exec-back">Restaurant Technology Solutions</Link>
          <div className="hhg-brand">
            <span className="hhg-logo"><Flame size={20} /><b>H&H</b></span>
            <div>
              <strong>Harbor & Hearth Restaurant Group</strong>
              <small>Eight-location fictional demo group</small>
            </div>
          </div>
          <h1>Executive Scorecard</h1>
          <p>Compare every location across sales, food cost, labor, reviews, safety, delivery, profitability, alerts, and action items from one command center.</p>
        </div>
        <aside className="exec-positioning">
          <strong>Unified intelligence layer</strong>
          <p>Connect the systems you already use. Compare every location in one place. Turn restaurant data into action.</p>
          <div>
            <span>Toast</span><span>7shifts</span><span>DoorDash</span><span>Google Reviews</span><span>MarginEdge</span><span>Restaurant365</span>
          </div>
        </aside>
      </header>

      <section className="exec-rollup">
        <div><span>Portfolio Sales</span><strong>{money.format(portfolio.sales)}</strong><small>This week across 8 stores</small></div>
        <div><span>Avg Health Score</span><strong>{portfolio.health}</strong><small>{statusFor(portfolio.health)}</small></div>
        <div><span>Manager Alerts</span><strong>{portfolio.alerts}</strong><small>{portfolio.alerts > 20 ? "Needs attention" : "Controlled"}</small></div>
        <div><span>Open Action Items</span><strong>{portfolio.actions}</strong><small>Centralized action center</small></div>
      </section>

      <section className="exec-command-grid">
        <article className="exec-panel exec-rankings">
          <div className="exec-panel-head">
            <div>
              <h2>Which stores need attention right now?</h2>
              <p>Sortable portfolio ranking. Store comparison stays visible as you drill down.</p>
            </div>
            <select value={sortMetric} onChange={(event) => setSortMetric(event.target.value)}>
              {Object.entries(metricConfig).map(([key, metric]) => <option key={key} value={key}>{metric.label}</option>)}
            </select>
          </div>
          <div className="exec-sort-pills">
            {Object.entries(metricConfig).map(([key, metric]) => {
              const Icon = metric.icon;
              return <button className={sortMetric === key ? "active" : ""} key={key} type="button" onClick={() => setSortMetric(key)}><Icon size={14} />{metric.label}</button>;
            })}
          </div>
          <ComparisonTable stores={sortedStores} metric={metricConfig[sortMetric]} onSelectStore={setSelectedStore} selectedStore={selectedStore} onMetricClick={setModule} />
        </article>

        <aside className="exec-panel exec-store-focus">
          <span>Selected store</span>
          <h2>{selected.name}</h2>
          <p>{selected.profile}</p>
          <div className={`exec-health-ring ${statusFor(selected.healthScore).toLowerCase().replace(" ", "-")}`} style={{ "--score": selected.healthScore }}>
            <strong>{selected.healthScore}</strong>
            <small>{statusFor(selected.healthScore)}</small>
          </div>
          <div className="exec-store-mini">
            <div><span>Manager</span><b>{selected.manager}</b></div>
            <div><span>Sales</span><b>{money.format(selected.weeklySales)}</b></div>
            <div><span>Food</span><b>{selected.foodCost}%</b></div>
            <div><span>Labor</span><b>{selected.labor}%</b></div>
          </div>
        </aside>
      </section>

      <section className="exec-command-grid lower">
        <article className="exec-panel exec-drilldown">
          <div className="exec-panel-head">
            <div>
              <h2>Comparison Drill-Down</h2>
              <p>{executiveModules[module]?.description || "Drill into the selected operating area while keeping every store visible."}</p>
            </div>
            <div className="exec-breadcrumbs">
              {(moduleTrail[module] || ["Food Cost"]).map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>
          <div className="exec-module-tabs">
            <button className={module === "foodCost" ? "active" : ""} type="button" onClick={() => setModule("foodCost")}>Food Cost</button>
            <button className={module === "sales" ? "active" : ""} type="button" onClick={() => setModule("sales")}>Sales</button>
            <button className={module === "reviews" ? "active" : ""} type="button" onClick={() => setModule("reviews")}>Reviews</button>
            <button className={module === "delivery" ? "active" : ""} type="button" onClick={() => setModule("delivery")}>Delivery</button>
            <button className={module === "labor" ? "active" : ""} type="button" onClick={() => setModule("labor")}>Labor</button>
            <button className={module === "ebitda" ? "active" : ""} type="button" onClick={() => setModule("ebitda")}>P&L</button>
            <button className={module === "safety" ? "active" : ""} type="button" onClick={() => setModule("safety")}>Safety</button>
            <button className={module === "actions" ? "active" : ""} type="button" onClick={() => setModule("actions")}>Action Center</button>
          </div>
          {module === "safety" ? (
            <SafetyModule stores={stores} />
          ) : module === "actions" ? (
            <ActionCenter onOpenSource={setSourceModal} />
          ) : (
            <DrilldownMatrix stores={stores} rows={currentRows} module={module} onModuleChange={setModule} onOpenSource={setSourceModal} />
          )}
        </article>

        <aside className="exec-panel exec-insights">
          <h2>Executive Signals</h2>
          <div>
            <strong>Broad Ripple needs the first call.</strong>
            <p>Health score is down because sales softened while food cost, reviews, delivery, and safety all moved in the wrong direction.</p>
          </div>
          <div>
            <strong>Greenwood is the current playbook.</strong>
            <p>Best blend of profitability, safety, cost control, and guest sentiment. Capture routines for training.</p>
          </div>
          <div>
            <strong>Downtown sales are hiding cost leakage.</strong>
            <p>Highest weekly sales, but food cost and delivery refunds are pressuring EBITDA.</p>
          </div>
          <div>
            <strong>Fishers is a labor coaching opportunity.</strong>
            <p>Guest scores are excellent, but labor is trending high despite stable sales volume.</p>
          </div>
        </aside>
      </section>

      {sourceModal ? <SourceModal source={sourceModal} onClose={() => setSourceModal(null)} /> : null}
    </main>
  );
}

function ComparisonTable({ stores, metric, onSelectStore, selectedStore, onMetricClick }) {
  return (
    <div className="exec-table-wrap">
      <table className="exec-table">
        <thead>
          <tr>
            <th>Rank</th><th>Store</th><th>Health</th><th>Weekly Sales</th><th>Food Cost</th><th>Labor</th><th>Reviews</th><th>EBITDA</th><th>Safety</th><th>Delivery</th><th>Alerts</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((store, index) => (
            <tr className={selectedStore === store.id ? "selected" : ""} key={store.id} onClick={() => onSelectStore(store.id)}>
              <td>#{index + 1}</td>
              <td><strong>{store.name}</strong><small>{store.manager}</small></td>
              <td><ScoreBadge score={store.healthScore} /></td>
              <td><MetricButton value={store.weeklySales} unit="money" trend={store.salesTrend} better="high" onClick={() => onMetricClick("sales")} /></td>
              <td><MetricButton value={store.foodCost} unit="percent" trend={store.foodTrend} better="low" onClick={() => onMetricClick("foodCost")} /></td>
              <td><MetricButton value={store.labor} unit="percent" trend={store.laborTrend} better="low" onClick={() => onMetricClick("labor")} /></td>
              <td><MetricButton value={store.reviewScore} unit="rating" trend={store.reviewTrend} better="high" onClick={() => onMetricClick("reviews")} /></td>
              <td><MetricButton value={store.ebitda} unit="percent" trend={store.ebitdaTrend} better="high" onClick={() => onMetricClick("ebitda")} /></td>
              <td><MetricButton value={store.safety} unit="score" trend={store.safetyTrend} better="high" onClick={() => onMetricClick("safety")} /></td>
              <td><MetricButton value={store.delivery} unit="score" trend={store.deliveryTrend} better="high" onClick={() => onMetricClick("delivery")} /></td>
              <td><MetricButton value={store.managerAlerts} unit="number" better="low" onClick={() => onMetricClick("actions")} /></td>
              <td><MetricButton value={store.openActions} unit="number" better="low" onClick={() => onMetricClick("actions")} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="exec-table-note">Currently sorted by {metric.label}. Click any metric cell to open the related comparison module.</p>
    </div>
  );
}

function MetricButton({ value, unit, trend = 0, better, onClick }) {
  return (
    <button className="exec-metric-button" type="button" onClick={(event) => { event.stopPropagation(); onClick(); }}>
      <strong>{formatValue(value, unit)}</strong>
      {trend ? <small className={trendClass(trend, better)}>{trend > 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}{Math.abs(trend)}{unit === "rating" ? "" : unit === "money" ? "%" : unit === "score" ? "" : ""}</small> : <small>View</small>}
    </button>
  );
}

function ScoreBadge({ score }) {
  return <span className={`score-badge ${statusFor(score).toLowerCase().replace(" ", "-")}`}>{score}</span>;
}

function DrilldownMatrix({ stores, rows, module, onModuleChange, onOpenSource }) {
  return (
    <div className="matrix-wrap">
      <div className="matrix-grid" style={{ "--store-count": stores.length }}>
        <div className="matrix-head label">Metric</div>
        {stores.map((store) => <div className="matrix-head" key={store.id}>{store.name}</div>)}
        {rows.map((row) => (
          <RowCells key={row.label} row={row} stores={stores} module={module} onModuleChange={onModuleChange} onOpenSource={onOpenSource} />
        ))}
      </div>
    </div>
  );
}

function RowCells({ row, stores, module, onModuleChange, onOpenSource }) {
  const max = Math.max(...row.values);
  const min = Math.min(...row.values);
  return (
    <>
      <button className="matrix-label" type="button" onClick={() => {
        if (module === "foodCost" && row.label === "Food") onModuleChange("food");
        else if (module === "food" && row.label === "Protein") onModuleChange("protein");
        else onOpenSource({ source: row.source || executiveModules[module]?.source || "Connected Source System", metric: row.label });
      }}>
        <span>{row.label}</span>
        <ChevronRight size={14} />
      </button>
      {stores.map((store, index) => {
        const value = row.values[index];
        const highRisk = row.target === 0 ? value > 1 : value > row.target * 1.08;
        const good = row.target === 0 ? value <= 0 : value <= row.target;
        const intensity = (value - min) / Math.max(1, max - min);
        return (
          <button className={`matrix-cell ${good ? "good" : highRisk ? "risk" : "watch"}`} style={{ "--intensity": intensity }} type="button" key={`${row.label}-${store.id}`} onClick={() => onOpenSource({ source: row.source || executiveModules[module]?.source || "Connected Source System", metric: `${store.name} / ${row.label}` })}>
            <strong>{formatValue(value, row.label.includes("Sales") || row.label === "Sales" ? "money" : row.label.includes("Rating") || row.label === "Guest Rating" ? "rating" : row.label.includes("Count") || row.label.includes("Volume") || row.label.includes("Hours") || row.label.includes("Positions") || row.label.includes("Time") ? "number" : "percent")}</strong>
            <span>{good ? "Good" : highRisk ? "High" : "Watch"}</span>
          </button>
        );
      })}
    </>
  );
}

function SafetyModule({ stores }) {
  return (
    <div className="safety-module">
      {stores.map((store) => (
        <div key={store.id}>
          <strong>{store.name}</strong>
          <div>{safetyHistory[store.name].map((status, index) => <span className={status} key={`${store.name}-${index}`}>{status}</span>)}</div>
          <small>Current score {store.safety} / trend {store.safetyTrend >= 0 ? "+" : ""}{store.safetyTrend}</small>
        </div>
      ))}
    </div>
  );
}

function ActionCenter({ onOpenSource }) {
  return (
    <div className="action-center">
      {actionItems.map((item) => (
        <button className={item.severity.toLowerCase()} key={`${item.store}-${item.issue}`} type="button" onClick={() => onOpenSource({ source: item.source, metric: item.issue })}>
          <span>{item.severity}</span>
          <strong>{item.store}</strong>
          <p>{item.issue}</p>
          <small>{item.owner} / due {item.due}</small>
          <ExternalLink size={14} />
        </button>
      ))}
    </div>
  );
}

function SourceModal({ source, onClose }) {
  return (
    <div className="source-modal-backdrop" role="presentation" onClick={onClose}>
      <section className="source-modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
        <span>External source system placeholder</span>
        <h2>{source.metric}</h2>
        <p>This would open the connected source system in a live deployment.</p>
        <div>
          <Building2 size={18} />
          <strong>{source.source}</strong>
        </div>
        <p>Restaurant Technology Solutions does not replace the source system. It keeps comparison visible, then sends the operator to the record of truth when deeper action is required.</p>
        <button type="button" onClick={onClose}>Close</button>
      </section>
    </div>
  );
}
