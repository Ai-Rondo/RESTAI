"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  Building2,
  ChevronRight,
  ExternalLink,
  Flame,
  Triangle
} from "lucide-react";
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
  reviewRows,
  salesRows,
  safetyHistory
} from "@/data/harborHearthExecutiveData";

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const number = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });

const scorecardColumns = [
  { id: "sales", label: "Weekly Sales", key: "weeklySales", unit: "money", better: "high", module: "sales", drillLabel: "Weekly Sales" },
  { id: "foodCost", label: "Food Cost %", key: "foodCost", unit: "percent", better: "low", module: "foodCost", drillLabel: "Food" },
  { id: "labor", label: "Labor %", key: "labor", unit: "percent", better: "low", module: "labor", drillLabel: "Labor %" },
  { id: "reviews", label: "Guest Review Score", key: "reviewScore", unit: "rating", better: "high", module: "reviews", drillLabel: "Review Score" },
  { id: "ebitda", label: "EBITDA %", key: "ebitda", unit: "percent", better: "high", module: "ebitda", drillLabel: "EBITDA" },
  { id: "safety", label: "Safety", key: "safety", unit: "score", better: "high", module: "safety", drillLabel: "Safety Score" },
  { id: "delivery", label: "Delivery", key: "delivery", unit: "score", better: "high", module: "delivery", drillLabel: "DoorDash" },
  { id: "issues", label: "Open Issues / Notes", key: "openActions", unit: "number", better: "low", module: "actions", drillLabel: "Open Issues" }
];

const moduleRows = {
  sales: salesRows,
  foodCost: foodCostRows,
  food: foodDrillRows,
  protein: proteinRows,
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

function rowUnit(label) {
  if (label.includes("Sales") || label === "EBITDA") return label === "EBITDA" ? "percent" : "money";
  if (label.includes("Rating") || label === "Guest Rating" || label === "Review Score") return "rating";
  if (label.includes("Count") || label.includes("Volume") || label.includes("Hours") || label.includes("Positions") || label.includes("Time")) return "number";
  return "percent";
}

function rowBetter(label, module) {
  const lowerLabels = ["Food Cost", "Total COGS", "Food", "Beverage", "Packaging", "Waste", "Comps", "Variance", "Labor", "OT", "Turnover", "Open Positions", "Negative", "Average Delivery Time", "Refund", "Prime Cost", "Other Controllables"];
  const higherLabels = ["Training Completion", "Sales", "Guest Count", "Average Check", "Review Score", "Review Count", "Positive", "Speed", "Food Quality", "Cleanliness", "Staff", "DoorDash", "Uber", "Accuracy", "Guest Rating", "Order Volume", "EBITDA", "Profit", "Safety"];
  if (higherLabels.some((text) => label.includes(text))) return "high";
  if (lowerLabels.some((text) => label.includes(text))) return "low";
  return module === "delivery" || module === "reviews" || module === "sales" ? "high" : "low";
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

function sortByMetric(stores, config) {
  return [...stores].sort((a, b) => {
    const direction = config.better === "low" ? 1 : -1;
    return (a[config.key] - b[config.key]) * direction || a.name.localeCompare(b.name);
  });
}

export default function ExecutiveScorecardPage() {
  const [sortKey, setSortKey] = useState("sales");
  const [module, setModule] = useState("foodCost");
  const [drillSort, setDrillSort] = useState("Food");
  const [selectedStore, setSelectedStore] = useState("carmel");
  const [sourceModal, setSourceModal] = useState(null);
  const drilldownRef = useRef(null);

  const stores = harborStores;
  const sortedStores = useMemo(() => sortByMetric(stores, scorecardColumns.find((column) => column.id === sortKey) || scorecardColumns[0]), [stores, sortKey]);
  const selected = stores.find((store) => store.id === selectedStore) || stores[0];
  const rankLookup = useMemo(() => {
    return Object.fromEntries(scorecardColumns.map((column) => [column.id, ranksFor(stores.map((store) => store[column.key]), column.better)]));
  }, [stores]);

  const issueCount = stores.reduce((sum, store) => sum + store.openActions, 0);
  const alertCount = stores.reduce((sum, store) => sum + store.managerAlerts, 0);
  const salesTotal = stores.reduce((sum, store) => sum + store.weeklySales, 0);

  function openDrilldown(storeId, column) {
    setSelectedStore(storeId);
    setModule(column.module);
    setDrillSort(column.drillLabel);
    window.requestAnimationFrame(() => {
      drilldownRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
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
          <h1>Executive Scorecard</h1>
          <p>Operating table for every location. Sort by real metrics, compare rankings, and drill into the source category without losing store comparison.</p>
        </div>
        <aside className="exec-positioning compact">
          <strong>Connection layer, not a replacement system</strong>
          <p>Toast, 7shifts, DoorDash, Google Reviews, MarginEdge, Restaurant365, and accounting reports stay in place. This layer organizes the operating view.</p>
        </aside>
      </header>

      <section className="exec-summary-bar">
        <span><b>{stores.length}</b> locations</span>
        <span><b>{money.format(salesTotal)}</b> weekly sales</span>
        <span><b>{alertCount}</b> manager alerts</span>
        <span><b>{issueCount}</b> open action items</span>
        <span><b>{selected.name}</b> selected</span>
      </section>

      <section className="exec-operating-layout">
        <article className="exec-panel exec-rankings table-first">
          <div className="exec-panel-head compact">
            <div>
              <h2>Multi-Location Operating Table</h2>
              <p>Click a header to sort. Click a value to drill into that module and keep every store visible.</p>
            </div>
          </div>
          <OperatingTable
            stores={sortedStores}
            allStores={stores}
            rankLookup={rankLookup}
            sortKey={sortKey}
            setSortKey={setSortKey}
            selectedStore={selectedStore}
            onSelectStore={setSelectedStore}
            onDrilldown={openDrilldown}
          />
        </article>

        <aside className="exec-panel exec-insights command-notes">
          <h2>Operator Notes</h2>
          <div>
            <strong>{selected.name}</strong>
            <p>{selected.profile}</p>
          </div>
          <div>
            <strong>Current focus</strong>
            <p>{module === "foodCost" || module === "food" || module === "protein" ? "Review cost categories and vendor/product detail before the next order cycle." : executiveModules[module]?.description || "Review open action items and source-system follow-up."}</p>
          </div>
          <div>
            <strong>Action center</strong>
            <p>{actionItems.filter((item) => item.store === selected.name).length || 1} relevant follow-up item for this location in the demo queue.</p>
          </div>
        </aside>
      </section>

      <section className="exec-operating-layout lower" ref={drilldownRef}>
        <article className="exec-panel exec-drilldown table-first">
          <div className="exec-panel-head compact">
            <div>
              <h2>Comparison Drilldown</h2>
              <p>{executiveModules[module]?.description || "Every drill-down keeps store comparison visible. Rank badges show relative position by category."}</p>
            </div>
            <div className="exec-breadcrumbs compact">
              {(moduleTrail[module] || ["Food Cost"]).map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>
          <div className="exec-module-tabs compact">
            <button className={module === "sales" ? "active" : ""} type="button" onClick={() => { setModule("sales"); setDrillSort("Weekly Sales"); }}>Sales</button>
            <button className={module === "foodCost" ? "active" : ""} type="button" onClick={() => { setModule("foodCost"); setDrillSort("Food"); }}>Food Cost</button>
            <button className={module === "labor" ? "active" : ""} type="button" onClick={() => { setModule("labor"); setDrillSort("Labor %"); }}>Labor</button>
            <button className={module === "reviews" ? "active" : ""} type="button" onClick={() => { setModule("reviews"); setDrillSort("Review Score"); }}>Reviews</button>
            <button className={module === "delivery" ? "active" : ""} type="button" onClick={() => { setModule("delivery"); setDrillSort("DoorDash"); }}>Delivery</button>
            <button className={module === "ebitda" ? "active" : ""} type="button" onClick={() => { setModule("ebitda"); setDrillSort("EBITDA"); }}>P&L</button>
            <button className={module === "safety" ? "active" : ""} type="button" onClick={() => { setModule("safety"); setDrillSort("Safety Score"); }}>Safety</button>
            <button className={module === "actions" ? "active" : ""} type="button" onClick={() => { setModule("actions"); setDrillSort("Open Issues"); }}>Action Center</button>
          </div>
          {module === "safety" ? (
            <SafetyModule stores={stores} selectedStore={selectedStore} />
          ) : module === "actions" ? (
            <ActionCenter selectedStore={selectedStore} onOpenSource={setSourceModal} />
          ) : (
            <DrilldownTable
              stores={stores}
              rows={moduleRows[module] || []}
              module={module}
              drillSort={drillSort}
              setDrillSort={setDrillSort}
              selectedStore={selectedStore}
              onModuleChange={(next, sortLabel) => { setModule(next); setDrillSort(sortLabel); }}
              onOpenSource={setSourceModal}
            />
          )}
        </article>

        <aside className="exec-panel exec-insights command-notes">
          <h2>Cross-System Signals</h2>
          <div>
            <strong>Broad Ripple</strong>
            <p>Food cost, review score, delivery, and safety all rank near the bottom. This is a district-manager follow-up candidate.</p>
          </div>
          <div>
            <strong>Downtown Indy</strong>
            <p>Top sales do not equal top performance. Food cost and delivery issues are pressuring profitability.</p>
          </div>
          <div>
            <strong>Fishers</strong>
            <p>Strong reviews and delivery scores, but labor rank shows a scheduling control opportunity.</p>
          </div>
        </aside>
      </section>

      {sourceModal ? <SourceModal source={sourceModal} onClose={() => setSourceModal(null)} /> : null}
    </main>
  );
}

function OperatingTable({ stores, allStores, rankLookup, sortKey, setSortKey, selectedStore, onSelectStore, onDrilldown }) {
  return (
    <div className="exec-table-wrap">
      <table className="exec-table operating-table">
        <thead>
          <tr>
            <th>Store</th>
            {scorecardColumns.map((column) => (
              <th key={column.id}>
                <button className={sortKey === column.id ? "active-sort" : ""} type="button" onClick={() => setSortKey(column.id)}>
                  {column.label}
                  {sortKey === column.id ? <Triangle size={10} /> : null}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {stores.map((store) => {
            const originalIndex = allStores.findIndex((item) => item.id === store.id);
            return (
              <tr className={selectedStore === store.id ? "selected" : ""} key={store.id} onClick={() => onSelectStore(store.id)}>
                <td><strong>{store.name}</strong><small>{store.manager}</small></td>
                {scorecardColumns.map((column) => (
                  <td key={column.id}>
                    <MetricValue
                      value={store[column.key]}
                      unit={column.unit}
                      rank={rankLookup[column.id][originalIndex]}
                      total={allStores.length}
                      onClick={() => onDrilldown(store.id, column)}
                    />
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
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

function DrilldownTable({ stores, rows, module, drillSort, setDrillSort, selectedStore, onModuleChange, onOpenSource }) {
  const sortRow = rows.find((row) => row.label === drillSort) || rows[0];
  const sortRanks = sortRow ? ranksFor(sortRow.values, rowBetter(sortRow.label, module)) : stores.map((_, index) => index + 1);
  const sortedIndexes = stores.map((_, index) => index).sort((a, b) => sortRanks[a] - sortRanks[b]);

  return (
    <div className="exec-table-wrap">
      <table className="exec-table drill-table">
        <thead>
          <tr>
            <th>Store</th>
            {rows.map((row) => (
              <th key={row.label}>
                <button className={drillSort === row.label ? "active-sort" : ""} type="button" onClick={() => {
                  if (module === "foodCost" && row.label === "Food") onModuleChange("food", "Protein");
                  else if (module === "food" && row.label === "Protein") onModuleChange("protein", "Chicken");
                  else setDrillSort(row.label);
                }}>
                  {row.label}
                  {module === "foodCost" && row.label === "Food" ? <ChevronRight size={12} /> : null}
                  {module === "food" && row.label === "Protein" ? <ChevronRight size={12} /> : null}
                  {drillSort === row.label ? <Triangle size={10} /> : null}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedIndexes.map((storeIndex) => {
            const store = stores[storeIndex];
            return (
              <tr className={selectedStore === store.id ? "selected highlight" : ""} key={store.id}>
                <td><strong>{store.name}</strong><small>{store.manager}</small></td>
                {rows.map((row) => {
                  const better = rowBetter(row.label, module);
                  const ranks = ranksFor(row.values, better);
                  const value = row.values[storeIndex];
                  return (
                    <td key={`${store.id}-${row.label}`}>
                      <button className="metric-with-rank" type="button" onClick={() => onOpenSource({ source: row.source || executiveModules[module]?.source || "Connected Source System", metric: `${store.name} / ${row.label}` })}>
                        <span>{formatValue(value, rowUnit(row.label))}</span>
                        <RankBadge rank={ranks[storeIndex]} total={stores.length} />
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

function SafetyModule({ stores, selectedStore }) {
  const ranks = ranksFor(stores.map((store) => store.safety), "high");
  const sorted = stores.map((store, index) => ({ store, index })).sort((a, b) => ranks[a.index] - ranks[b.index]);
  return (
    <div className="exec-table-wrap">
      <table className="exec-table safety-table">
        <thead><tr><th>Store</th><th>Safety Score</th><th>Audit History</th><th>Status</th></tr></thead>
        <tbody>
          {sorted.map(({ store, index }) => (
            <tr className={selectedStore === store.id ? "selected highlight" : ""} key={store.id}>
              <td><strong>{store.name}</strong><small>{store.manager}</small></td>
              <td><span className="metric-with-rank static"><span>{store.safety}</span><RankBadge rank={ranks[index]} total={stores.length} /></span></td>
              <td><div className="audit-badges">{safetyHistory[store.name].map((status, auditIndex) => <span className={status} key={`${store.name}-${auditIndex}`}>{status}</span>)}</div></td>
              <td>{store.safety >= 94 ? "Passing" : store.safety >= 88 ? "Watch" : "Needs Review"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ActionCenter({ selectedStore, onOpenSource }) {
  return (
    <div className="action-center table-like">
      {actionItems.map((item) => (
        <button className={`${item.severity.toLowerCase()} ${selectedStore && item.store === harborStores.find((store) => store.id === selectedStore)?.name ? "selected" : ""}`} key={`${item.store}-${item.issue}`} type="button" onClick={() => onOpenSource({ source: item.source, metric: item.issue })}>
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
        <p>Restaurant Technology Solutions does not replace Toast, 7shifts, DoorDash, Google Reviews, MarginEdge, Restaurant365, or accounting software. It keeps the cross-store comparison visible, then sends the operator to the record of truth when deeper action is required.</p>
        <button type="button" onClick={onClose}>Close</button>
      </section>
    </div>
  );
}
