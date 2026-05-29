"use client";

import Link from "next/link";
import {
  Anchor,
  ArrowDown,
  ArrowUp,
  ClipboardCheck,
  Download,
  FileText,
  Flame,
  PackagePlus,
  Search,
  ShoppingCart,
  Waves
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  categoryBreakdown,
  foodCostTrend,
  ingredients,
  inventoryAudits,
  inventoryInsights,
  inventoryKpis,
  inventoryRanges,
  menuItems,
  purchaseRecommendations,
  syncSources,
  topWasteItems,
  vendorPriceChanges,
  wasteReasons
} from "@/data/inventoryFoodCostMockData";

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const decimalMoney = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });

function statusClass(status) {
  return String(status).toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function Sparkline({ values }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const points = values
    .map((value, index) => {
      const x = values.length === 1 ? 50 : (index / (values.length - 1)) * 100;
      const y = 86 - ((value - min) / Math.max(1, max - min)) * 68;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg className="inv-spark" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <polyline points={points} fill="none" stroke="currentColor" strokeWidth="4" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function InventoryKpiCard({ kpi }) {
  const positive = !kpi.change.startsWith("+") || kpi.status === "Good" || kpi.status === "Improving";
  return (
    <article className={`inv-kpi ${statusClass(kpi.status)}`}>
      <div>
        <span>{kpi.label}</span>
        <strong>{kpi.value}</strong>
      </div>
      <Sparkline values={kpi.trend} />
      <footer>
        <small className={positive ? "good-change" : "bad-change"}>
          {positive ? <ArrowDown size={13} /> : <ArrowUp size={13} />}
          {kpi.change}
        </small>
        <b>{kpi.status}</b>
      </footer>
    </article>
  );
}

function FoodCostChart() {
  const max = 38;
  return (
    <div className="food-cost-chart">
      {foodCostTrend.map((day) => (
        <div key={day.date} className="food-cost-day">
          <div>
            <span className="actual" style={{ height: `${(day.actual / max) * 100}%` }} />
            <span className="theoretical" style={{ height: `${(day.theoretical / max) * 100}%` }} />
            <span className="target" style={{ height: `${(day.target / max) * 100}%` }} />
          </div>
          <small>{day.date.replace("May ", "5/")}</small>
        </div>
      ))}
    </div>
  );
}

function InventoryTable() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState({ key: "item", direction: "asc" });
  const rows = useMemo(() => {
    return [...ingredients]
      .filter((item) => `${item.item} ${item.category} ${item.vendor} ${item.status}`.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => {
        const aValue = a[sort.key];
        const bValue = b[sort.key];
        const result = typeof aValue === "string" ? aValue.localeCompare(String(bValue)) : aValue - bValue;
        return sort.direction === "asc" ? result : -result;
      });
  }, [query, sort]);

  const columns = [
    ["item", "Item"], ["category", "Category"], ["vendor", "Vendor"], ["unit", "Unit"], ["onHand", "On Hand"],
    ["par", "Par"], ["reorderPoint", "Reorder Point"], ["unitCost", "Unit Cost"], ["inventoryValue", "Inventory Value"],
    ["usage7", "7-Day Usage"], ["theoreticalUsage", "Theoretical Usage"], ["actualUsage", "Actual Usage"],
    ["variance", "Variance"], ["waste", "Waste"], ["priceChange", "Price Change"], ["status", "Status"]
  ];

  const setSortKey = (key) => setSort((current) => ({ key, direction: current.key === key && current.direction === "asc" ? "desc" : "asc" }));

  return (
    <article className="inv-panel inv-wide">
      <div className="inv-panel-heading">
        <div>
          <h2>Ingredient-level inventory</h2>
          <p>Searchable, sortable item detail from inventory counts, invoices, recipe usage, and waste logs.</p>
        </div>
        <label className="inv-search">
          <Search size={15} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search item, vendor, status" />
        </label>
      </div>
      <div className="inv-table-wrap">
        <table className="inv-table">
          <thead>
            <tr>{columns.map(([key, label]) => <th key={key}><button type="button" onClick={() => setSortKey(key)}>{label}</button></th>)}</tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.item} className={statusClass(row.status)}>
                <td><strong>{row.item}</strong></td>
                <td>{row.category}</td>
                <td>{row.vendor}</td>
                <td>{row.unit}</td>
                <td>{row.onHand}</td>
                <td>{row.par}</td>
                <td>{row.reorderPoint}</td>
                <td>{decimalMoney.format(row.unitCost)}</td>
                <td>{money.format(row.inventoryValue)}</td>
                <td>{row.usage7}</td>
                <td>{row.theoreticalUsage}</td>
                <td>{row.actualUsage}</td>
                <td>{row.variance.toFixed(1)}%</td>
                <td>{money.format(row.waste)}</td>
                <td>{row.priceChange > 0 ? "+" : ""}{row.priceChange.toFixed(1)}%</td>
                <td><span className={`inv-badge ${statusClass(row.status)}`}>{row.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}

function VendorPriceWatch() {
  return (
    <article className="inv-panel">
      <div className="inv-panel-heading">
        <div>
          <h2>Vendor price watch</h2>
          <p>Invoice movement and estimated margin impact.</p>
        </div>
      </div>
      <div className="price-watch-list">
        {vendorPriceChanges.map((change) => (
          <div key={change.item}>
            <span>{change.vendor}</span>
            <strong>{change.item}</strong>
            <p>{decimalMoney.format(change.oldPrice)} → {decimalMoney.format(change.newPrice)} · {change.change > 0 ? "+" : ""}{change.change}%</p>
            <small>{money.format(change.impact)} estimated impact · {change.action}</small>
          </div>
        ))}
      </div>
      <p className="inv-insight-callout">
        Switching salmon feature pricing or portioning this week could protect approximately $420 in gross margin.
      </p>
    </article>
  );
}

function WasteTracker() {
  const maxReason = Math.max(...wasteReasons.map((reason) => reason.amount));
  const maxWaste = Math.max(...foodCostTrend.map((day) => day.waste));
  return (
    <article className="inv-panel">
      <div className="inv-panel-heading">
        <div>
          <h2>Waste and spoilage tracker</h2>
          <p>Waste by reason, day, category, and top items.</p>
        </div>
      </div>
      <div className="waste-layout">
        <div className="waste-bars">
          {wasteReasons.map((reason) => (
            <div key={reason.reason}>
              <span>{reason.reason}</span>
              <i><b style={{ width: `${(reason.amount / maxReason) * 100}%` }} /></i>
              <small>{money.format(reason.amount)}</small>
            </div>
          ))}
        </div>
        <div className="waste-by-day">
          {foodCostTrend.map((day) => (
            <span key={day.date} style={{ height: `${Math.max(12, (day.waste / maxWaste) * 100)}%` }} title={`${day.date}: ${money.format(day.waste)}`} />
          ))}
        </div>
      </div>
      <table className="mini-inv-table">
        <tbody>
          {topWasteItems.map((item) => (
            <tr key={item.item}>
              <td><strong>{item.item}</strong><small>{item.category}</small></td>
              <td>{item.reason}</td>
              <td>{item.day}</td>
              <td>{money.format(item.cost)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}

function MenuProfitabilityTable() {
  return (
    <article className="inv-panel inv-wide">
      <div className="inv-panel-heading">
        <div>
          <h2>Menu profitability</h2>
          <p>Menu engineering view combining POS sales and recipe costing.</p>
        </div>
      </div>
      <div className="menu-profit-layout">
        <div className="quadrant">
          <div><strong>High popularity / high profit</strong><span>Stars</span></div>
          <div><strong>High popularity / low profit</strong><span>Workhorses</span></div>
          <div><strong>Low popularity / high profit</strong><span>Puzzles</span></div>
          <div><strong>Low popularity / low profit</strong><span>Dogs / review</span></div>
        </div>
        <div className="inv-table-wrap compact">
          <table className="inv-table">
            <thead>
              <tr><th>Menu Item</th><th>Category</th><th>Menu Price</th><th>Recipe Cost</th><th>Food Cost %</th><th>Gross Profit</th><th>Units Sold</th><th>Rank</th><th>Status</th></tr>
            </thead>
            <tbody>
              {menuItems.map((item) => (
                <tr key={item.item}>
                  <td><strong>{item.item}</strong></td>
                  <td>{item.category}</td>
                  <td>{money.format(item.price)}</td>
                  <td>{decimalMoney.format(item.recipeCost)}</td>
                  <td>{item.foodCost.toFixed(1)}%</td>
                  <td>{decimalMoney.format(item.grossProfit)}</td>
                  <td>{item.units}</td>
                  <td>#{item.rank}</td>
                  <td><span className={`inv-badge ${statusClass(item.status)}`}>{item.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </article>
  );
}

function PurchasePlanner() {
  return (
    <article className="inv-panel">
      <div className="inv-panel-heading">
        <div>
          <h2>Purchase order planner</h2>
          <p>Recommended orders from par levels, usage, and vendor pricing.</p>
        </div>
      </div>
      <div className="po-list">
        {purchaseRecommendations.map((item) => (
          <div key={item.item}>
            <strong>{item.item}</strong>
            <span>{item.vendor}</span>
            <p>{item.onHand} on hand · Par {item.par} · Order {item.order}</p>
            <footer>
              <b className={statusClass(item.urgency)}>{item.urgency}</b>
              <small>{money.format(item.cost)} · {item.reason}</small>
            </footer>
          </div>
        ))}
      </div>
      <div className="po-actions">
        <button type="button">Create PO</button>
        <button type="button">Mark reviewed</button>
        <button type="button">Snooze item</button>
      </div>
    </article>
  );
}

export default function InventoryFoodCostDashboard() {
  const [range, setRange] = useState("Last 14 Days");
  const categoryMax = Math.max(...categoryBreakdown.map((category) => category.value));

  return (
    <main className="inventory-demo-shell">
      <header className="inventory-hero">
        <div className="hh-brand-block">
          <Link href="/modules" className="hh-back">Modules / Inventory & Food Cost</Link>
          <div className="hh-brand">
            <span className="hh-logo"><Waves size={21} /><Flame size={18} /></span>
            <div>
              <strong>Hearth & Harbor Kitchen</strong>
              <small>Upscale casual coastal comfort</small>
            </div>
          </div>
          <h1>Inventory & Food Cost — Hearth & Harbor Kitchen</h1>
          <p>
            A clean kitchen operations control center for inventory counts, invoice pricing, recipe cost, waste logs,
            purchase planning, and menu profitability.
          </p>
        </div>
        <div className="inventory-actions">
          <label>Date range<select value={range} onChange={(event) => setRange(event.target.value)}>{inventoryRanges.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Location<select><option>Hearth & Harbor Kitchen</option></select></label>
          <div>
            <button type="button"><Download size={15} /> Export CSV</button>
            <button type="button"><FileText size={15} /> Export PDF</button>
            <button type="button"><ClipboardCheck size={15} /> Start Inventory Count</button>
            <button type="button"><PackagePlus size={15} /> Create Purchase Order</button>
          </div>
        </div>
      </header>

      <section className="sync-strip">
        {syncSources.map(([label, time]) => <div key={label}><span>{label}</span><strong>{time}</strong></div>)}
      </section>

      <section className="inv-kpi-grid">
        {inventoryKpis.map((kpi) => <InventoryKpiCard key={kpi.label} kpi={kpi} />)}
      </section>

      <section className="inventory-grid">
        <article className="inv-panel inv-span-7">
          <div className="inv-panel-heading">
            <div>
              <h2>Actual vs theoretical food cost</h2>
              <p>Actual food cost is running 3.4 points above theoretical, suggesting possible waste, over-portioning, invoice price increases, or untracked comps.</p>
            </div>
          </div>
          <div className="food-cost-summary">
            <div><span>Actual</span><strong>33.0%</strong></div>
            <div><span>Theoretical</span><strong>29.6%</strong></div>
            <div><span>Variance</span><strong>3.4 pts</strong></div>
            <div><span>Variance dollars</span><strong>$2,840</strong></div>
            <div><span>Target</span><strong>28.5%</strong></div>
            <div><span>Prior period</span><strong>31.2%</strong></div>
          </div>
          <FoodCostChart />
          <div className="inv-legend"><span className="actual" />Actual <span className="theoretical" />Theoretical <span className="target" />Target</div>
        </article>

        <article className="inv-panel inv-span-5">
          <div className="inv-panel-heading">
            <div>
              <h2>Inventory category breakdown</h2>
              <p>Risk and value by food, beverage, and supply category.</p>
            </div>
          </div>
          <div className="category-stack">
            {categoryBreakdown.map((category) => (
              <div key={category.category} className={statusClass(category.risk)}>
                <header><strong>{category.category}</strong><span>{category.risk}</span></header>
                <i><b style={{ width: `${(category.value / categoryMax) * 100}%` }} /></i>
                <footer>
                  <span>{money.format(category.value)} value</span>
                  <span>{money.format(category.purchases)} purchases</span>
                  <span>{category.belowPar} below par</span>
                </footer>
              </div>
            ))}
          </div>
        </article>

        <InventoryTable />
        <VendorPriceWatch />
        <WasteTracker />
        <MenuProfitabilityTable />
        <PurchasePlanner />

        <article className="inv-panel">
          <div className="inv-panel-heading">
            <div>
              <h2>Count variance / audit</h2>
              <p>Recent count differences and biggest discrepancies.</p>
            </div>
          </div>
          <table className="mini-inv-table audit-table">
            <tbody>
              {inventoryAudits.map((audit) => (
                <tr key={`${audit.date}-${audit.category}`}>
                  <td><strong>{audit.category}</strong><small>{audit.date} · {audit.countedBy}</small></td>
                  <td>{money.format(audit.expected)}</td>
                  <td>{money.format(audit.counted)}</td>
                  <td>{money.format(audit.difference)}</td>
                  <td><span className={`inv-badge ${statusClass(audit.status)}`}>{audit.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="inv-insight-callout">Biggest discrepancy: Produce counted $410 below expected, driven by avocado and romaine spoilage.</p>
        </article>

        <article className="inv-panel inv-wide">
          <div className="inv-panel-heading">
            <div>
              <h2>Operational insights</h2>
              <p>Practical flags a chef, GM, or owner can act on this week.</p>
            </div>
          </div>
          <div className="inventory-insights">
            {inventoryInsights.map((insight) => <p key={insight}>{insight}</p>)}
          </div>
        </article>
      </section>
    </main>
  );
}
