"use client";

import Link from "next/link";
import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  CalendarDays,
  Download,
  FileText,
  Filter,
  RefreshCw,
  Search,
  TrendingUp,
  Users
} from "lucide-react";
import { useMemo, useState } from "react";
import { chartOptions, forkAlehouseRanges, forkAlehouseSalesLabor } from "@/data/forkAlehouseSalesLabor";

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const number = new Intl.NumberFormat("en-US");

const kpiConfig = [
  ["Net Sales", "netSales", "money", "positive"],
  ["Gross Sales", "grossSales", "money", "positive"],
  ["Labor Cost", "laborCost", "money", "negative"],
  ["Labor %", "laborPct", "percent", "negative"],
  ["Guest Count", "guestCount", "number", "positive"],
  ["Average Check", "avgCheck", "money", "positive"],
  ["Online Ordering Sales", "onlineSales", "money", "positive"],
  ["Dine-In Sales", "dineInSales", "money", "positive"],
  ["Walk-In / Counter Sales", "walkInSales", "money", "positive"],
  ["Delivery Sales", "deliverySales", "money", "positive"],
  ["Takeout Sales", "takeoutSales", "money", "positive"],
  ["Bar Sales", "barSales", "money", "positive"],
  ["Discounts / Comps", "discountComp", "money", "negative"],
  ["Voids / Refunds", "voidRefund", "money", "negative"],
  ["Sales per Labor Hour", "salesPerLaborHour", "money", "positive"],
  ["Covers per Labor Hour", "coversPerLaborHour", "decimal", "positive"]
];

const columns = [
  ["date", "Date"],
  ["day", "Day"],
  ["grossSales", "Gross Sales"],
  ["netSales", "Net Sales"],
  ["guestCount", "Guests"],
  ["avgCheck", "Avg Check"],
  ["dineInSales", "Dine-In"],
  ["walkInSales", "Counter"],
  ["onlineSales", "Online"],
  ["takeoutSales", "Takeout"],
  ["deliverySales", "Delivery"],
  ["barSales", "Bar"],
  ["laborHours", "Labor Hrs"],
  ["laborCost", "Labor Cost"],
  ["laborPct", "Labor %"],
  ["salesPerLaborHour", "Sales/LH"],
  ["discounts", "Discounts"],
  ["comps", "Comps"],
  ["voids", "Voids"],
  ["refunds", "Refunds"],
  ["note", "Notes / Flag"]
];

function enrich(row) {
  return {
    ...row,
    laborPct: row.laborCost / row.netSales,
    avgCheck: row.netSales / row.guestCount,
    salesPerLaborHour: row.netSales / row.laborHours,
    coversPerLaborHour: row.guestCount / row.laborHours,
    discountComp: row.discounts + row.comps,
    voidRefund: row.voids + row.refunds
  };
}

function formatValue(value, type) {
  if (type === "money") return money.format(value);
  if (type === "percent") return `${(value * 100).toFixed(1)}%`;
  if (type === "decimal") return value.toFixed(1);
  return number.format(Math.round(value));
}

function rowsForRange(range) {
  const rows = forkAlehouseSalesLabor.map(enrich);
  if (range === "Today") return rows.filter((row) => row.date === "2026-05-20");
  if (range === "Yesterday") return rows.filter((row) => row.date === "2026-05-19");
  if (range === "This Week") return rows.filter((row) => row.date >= "2026-05-18");
  if (range === "Last Week") return rows.filter((row) => row.date >= "2026-05-11" && row.date <= "2026-05-17");
  return rows;
}

function summarize(rows) {
  const totals = rows.reduce(
    (sum, row) => {
      Object.keys(sum).forEach((key) => {
        sum[key] += row[key] || 0;
      });
      return sum;
    },
    {
      grossSales: 0,
      netSales: 0,
      laborCost: 0,
      guestCount: 0,
      onlineSales: 0,
      dineInSales: 0,
      walkInSales: 0,
      deliverySales: 0,
      takeoutSales: 0,
      barSales: 0,
      discounts: 0,
      comps: 0,
      voids: 0,
      refunds: 0,
      laborHours: 0
    }
  );

  return {
    ...totals,
    laborPct: totals.laborCost / totals.netSales,
    avgCheck: totals.netSales / totals.guestCount,
    discountComp: totals.discounts + totals.comps,
    voidRefund: totals.voids + totals.refunds,
    salesPerLaborHour: totals.netSales / totals.laborHours,
    coversPerLaborHour: totals.guestCount / totals.laborHours
  };
}

function priorSummary(rows) {
  const priorRows = forkAlehouseSalesLabor
    .map((row, index) => ({ ...enrich(row), index }))
    .filter((row) => row.index < Math.max(0, forkAlehouseSalesLabor.length - rows.length))
    .slice(-rows.length);
  return summarize(priorRows.length ? priorRows : forkAlehouseSalesLabor.slice(0, rows.length).map(enrich));
}

function trendClass(kpi, change) {
  const directionGood = kpi[3] === "positive" ? change >= 0 : change <= 0;
  return directionGood ? "good" : "bad";
}

function dayStatus(row) {
  if (row.flags.includes("Strong sales")) return "strong";
  if (row.laborPct > 0.34 || row.flags.includes("High comps") || row.flags.includes("High refunds")) return "warning";
  if (row.netSales < 5200) return "low";
  return "steady";
}

function LineChart({ rows, metric, color = "#67d0b3" }) {
  const values = rows.map((row) => row[metric]);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const points = values
    .map((value, index) => {
      const x = rows.length === 1 ? 50 : (index / (rows.length - 1)) * 100;
      const y = 88 - ((value - min) / Math.max(1, max - min)) * 72;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="fork-chart-svg">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <polyline points={points} fill="none" stroke={color} strokeWidth="3" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="chart-axis">
        {rows.map((row) => (
          <span key={row.date}>{row.day.slice(0, 3)}</span>
        ))}
      </div>
    </div>
  );
}

function BarChart({ rows, metric }) {
  const max = Math.max(...rows.map((row) => row[metric]));
  return (
    <div className="fork-bar-chart">
      {rows.map((row) => (
        <div key={row.date}>
          <span style={{ height: `${Math.max(8, (row[metric] / max) * 100)}%` }} />
          <small>{row.day.slice(0, 3)}</small>
        </div>
      ))}
    </div>
  );
}

function ChannelChart({ rows }) {
  const max = Math.max(...rows.map((row) => row.netSales));
  return (
    <div className="channel-chart">
      {rows.map((row) => (
        <div key={row.date} className="channel-row">
          <small>{row.day.slice(0, 3)} {row.date.slice(5)}</small>
          <div style={{ width: `${(row.netSales / max) * 100}%` }}>
            <span className="dine" style={{ flex: row.dineInSales }} />
            <span className="bar" style={{ flex: row.barSales }} />
            <span className="online" style={{ flex: row.onlineSales }} />
            <span className="delivery" style={{ flex: row.deliverySales + row.takeoutSales + row.walkInSales }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function DaypartChart({ rows }) {
  const totals = rows.reduce((sum, row) => {
    Object.entries(row.dayparts).forEach(([key, value]) => {
      sum[key] = (sum[key] || 0) + value;
    });
    return sum;
  }, {});
  const max = Math.max(...Object.values(totals));
  return (
    <div className="daypart-bars">
      {Object.entries(totals).map(([key, value]) => (
        <div key={key}>
          <strong>{key}</strong>
          <span><b style={{ width: `${(value / max) * 100}%` }} /></span>
          <small>{money.format(value)}</small>
        </div>
      ))}
    </div>
  );
}

function Heatmap({ rows }) {
  const hours = ["11a", "12p", "1p", "2p", "4p", "5p", "6p", "7p", "8p", "9p"];
  return (
    <div className="hourly-heatmap">
      {rows.map((row, rowIndex) => (
        <div key={row.date} className="heat-row">
          <small>{row.day.slice(0, 3)}</small>
          {hours.map((hour, index) => {
            const dinnerLift = index >= 5 && index <= 7 ? 1.25 : 0.72;
            const weekendLift = ["Friday", "Saturday"].includes(row.day) ? 1.22 : 1;
            const intensity = Math.min(1, ((row.netSales / 13000) * dinnerLift * weekendLift * (0.75 + index / 18 + rowIndex / 60)));
            return <span key={hour} title={`${row.day} ${hour}`} style={{ opacity: 0.25 + intensity * 0.75 }} />;
          })}
        </div>
      ))}
      <div className="heat-hours">
        <small />
        {hours.map((hour) => <small key={hour}>{hour}</small>)}
      </div>
    </div>
  );
}

function ChartPanel({ rows, chart }) {
  if (chart === "channels") return <ChannelChart rows={rows} />;
  if (chart === "labor") return <LineChart rows={rows} metric="laborPct" color="#f2b35b" />;
  if (chart === "guests") return <BarChart rows={rows} metric="guestCount" />;
  if (chart === "avgCheck") return <LineChart rows={rows} metric="avgCheck" color="#8bb9ff" />;
  if (chart === "dayparts") return <DaypartChart rows={rows} />;
  if (chart === "heatmap") return <Heatmap rows={rows} />;
  return <LineChart rows={rows} metric="netSales" />;
}

export default function ForkSalesLaborDashboard() {
  const [range, setRange] = useState("This Month");
  const [chart, setChart] = useState("sales");
  const [sort, setSort] = useState({ key: "date", direction: "asc" });
  const [query, setQuery] = useState("");
  const [selectedDay, setSelectedDay] = useState(null);

  const rows = useMemo(() => rowsForRange(range), [range]);
  const summary = useMemo(() => summarize(rows), [rows]);
  const prior = useMemo(() => priorSummary(rows), [rows]);

  const visibleRows = useMemo(() => {
    return [...rows]
      .filter((row) => {
        const text = `${row.date} ${row.day} ${row.note} ${row.flags.join(" ")}`.toLowerCase();
        return text.includes(query.toLowerCase());
      })
      .sort((a, b) => {
        const aValue = a[sort.key];
        const bValue = b[sort.key];
        const result = typeof aValue === "string" ? String(aValue).localeCompare(String(bValue)) : aValue - bValue;
        return sort.direction === "asc" ? result : -result;
      });
  }, [query, rows, sort]);

  const activeDay = selectedDay || visibleRows[visibleRows.length - 1] || rows[0];

  const changeFor = (key) => {
    const base = prior[key] || 1;
    return ((summary[key] - base) / base) * 100;
  };

  const setSortKey = (key) => {
    setSort((current) => ({
      key,
      direction: current.key === key && current.direction === "asc" ? "desc" : "asc"
    }));
  };

  return (
    <main className="fork-module-shell">
      <header className="fork-module-header">
        <div>
          <Link href="/modules" className="fork-back-link">Modules / Sales & Labor</Link>
          <h1>Sales & Labor — Fork Alehouse Operations</h1>
          <p>
            Aggregated sales, labor, guest, and ordering-channel visibility for Fork Alehouse. Built to show what owners
            usually chase across POS, scheduling, online ordering, spreadsheets, and manager notes.
          </p>
        </div>
        <div className="fork-sync-card">
          <RefreshCw size={18} />
          <span>Last synced from POS</span>
          <strong>Today 4:12 AM</strong>
        </div>
      </header>

      <section className="fork-control-bar">
        <label>
          <CalendarDays size={16} /> Date range
          <select value={range} onChange={(event) => setRange(event.target.value)}>
            {forkAlehouseRanges.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <div className="quick-ranges">
          {forkAlehouseRanges.map((item) => (
            <button className={range === item ? "active" : ""} key={item} type="button" onClick={() => setRange(item)}>
              {item}
            </button>
          ))}
        </div>
        <div className="export-actions">
          <button type="button"><Download size={16} /> CSV</button>
          <button type="button"><FileText size={16} /> PDF</button>
        </div>
      </section>

      <section className="fork-kpi-grid">
        {kpiConfig.map((kpi, index) => {
          const [label, key, type] = kpi;
          const change = changeFor(key);
          const tone = trendClass(kpi, change);
          return (
            <article className={`fork-kpi-card ${tone}`} key={label}>
              <span>{label}</span>
              <strong>{formatValue(summary[key], type)}</strong>
              <small>
                {change >= 0 ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                {Math.abs(change).toFixed(1)}% vs prior period
              </small>
              <i style={{ width: `${44 + ((index * 7) % 42)}%` }} />
            </article>
          );
        })}
      </section>

      <section className="fork-dashboard-grid">
        <article className="fork-panel span-8">
          <div className="fork-panel-heading">
            <div>
              <h2><BarChart3 size={20} /> Performance charts</h2>
              <span>{range} · {rows.length} operating days</span>
            </div>
            <select value={chart} onChange={(event) => setChart(event.target.value)} aria-label="Chart metric">
              {chartOptions.map((option) => <option key={option.key} value={option.key}>{option.label}</option>)}
            </select>
          </div>
          <div className="chart-switcher">
            {chartOptions.map((option) => (
              <button className={chart === option.key ? "active" : ""} key={option.key} type="button" onClick={() => setChart(option.key)}>
                {option.label}
              </button>
            ))}
          </div>
          <ChartPanel rows={rows} chart={chart} />
          <div className="chart-legend fork-chart-legend">
            <span className="actual-dot">Dine-in / sales</span>
            <span className="budget-dot">Bar / labor</span>
            <span className="prior-dot">Online / off-premise</span>
          </div>
        </article>

        <article className="fork-panel span-4">
          <div className="fork-panel-heading">
            <div>
              <h2><Users size={20} /> Labor command panel</h2>
              <span>Scheduled vs actual coverage</span>
            </div>
          </div>
          <div className="labor-metrics">
            <div><span>Scheduled hours</span><strong>{number.format(rows.reduce((s, r) => s + r.scheduledHours, 0))}</strong></div>
            <div><span>Actual hours</span><strong>{number.format(summary.laborHours)}</strong></div>
            <div><span>Labor cost</span><strong>{money.format(summary.laborCost)}</strong></div>
            <div><span>Labor %</span><strong>{formatValue(summary.laborPct, "percent")}</strong></div>
            <div><span>FOH labor</span><strong>{money.format(rows.reduce((s, r) => s + r.fohLabor, 0))}</strong></div>
            <div><span>BOH labor</span><strong>{money.format(rows.reduce((s, r) => s + r.bohLabor, 0))}</strong></div>
            <div><span>Bar labor</span><strong>{money.format(rows.reduce((s, r) => s + r.barLabor, 0))}</strong></div>
            <div><span>OT estimate</span><strong>{rows.reduce((s, r) => s + r.overtime, 0).toFixed(1)} hrs</strong></div>
          </div>
          <p className="staffing-note">
            Dinner sales were 18% above forecast while BOH labor stayed flat. Keep the current dinner line structure,
            but watch Tuesday and Wednesday FOH openers when sales forecast below $6.5k.
          </p>
        </article>

        <article className="fork-panel span-12">
          <div className="fork-panel-heading">
            <div>
              <h2><Filter size={20} /> Date-range daily table</h2>
              <span>Click any day for detail drilldown</span>
            </div>
            <label className="table-search">
              <Search size={15} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Filter notes, flags, days" />
            </label>
          </div>
          <div className="fork-table-wrap">
            <table className="fork-daily-table">
              <thead>
                <tr>
                  {columns.map(([key, label]) => (
                    <th key={key}>
                      <button type="button" onClick={() => setSortKey(key)}>{label}</button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visibleRows.map((row) => (
                  <tr className={dayStatus(row)} key={row.date} onClick={() => setSelectedDay(row)}>
                    <td>{row.date.slice(5)}</td>
                    <td>{row.day}</td>
                    <td>{money.format(row.grossSales)}</td>
                    <td>{money.format(row.netSales)}</td>
                    <td>{number.format(row.guestCount)}</td>
                    <td>{money.format(row.avgCheck)}</td>
                    <td>{money.format(row.dineInSales)}</td>
                    <td>{money.format(row.walkInSales)}</td>
                    <td>{money.format(row.onlineSales)}</td>
                    <td>{money.format(row.takeoutSales)}</td>
                    <td>{money.format(row.deliverySales)}</td>
                    <td>{money.format(row.barSales)}</td>
                    <td>{row.laborHours}</td>
                    <td>{money.format(row.laborCost)}</td>
                    <td><span className={row.laborPct > 0.34 ? "warn-pill" : "good-pill"}>{formatValue(row.laborPct, "percent")}</span></td>
                    <td>{money.format(row.salesPerLaborHour)}</td>
                    <td>{money.format(row.discounts)}</td>
                    <td>{money.format(row.comps)}</td>
                    <td>{money.format(row.voids)}</td>
                    <td>{money.format(row.refunds)}</td>
                    <td><span className="note-cell">{row.flags[0]}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="fork-panel span-5">
          <div className="fork-panel-heading">
            <div>
              <h2><TrendingUp size={20} /> Practical insights</h2>
              <span>Operational signals from the selected range</span>
            </div>
          </div>
          <div className="fork-insights">
            <p>Saturday dinner sales outperformed the prior 4-week average by 14%, driven by bar and patio revenue.</p>
            <p>Labor % exceeded target on Tuesday and Wednesday despite below-average guest counts.</p>
            <p>Online ordering increased 22% during the selected range, but average check was lower than dine-in.</p>
            <p>Friday had strong sales but also elevated comps. Review manager notes or server-level detail.</p>
            <p>Lunch daypart appears underutilized compared with dinner staffing levels.</p>
          </div>
        </article>

        <article className="fork-panel span-7">
          <div className="fork-panel-heading">
            <div>
              <h2>Day detail drilldown</h2>
              <span>{activeDay.day}, {activeDay.date}</span>
            </div>
          </div>
          <div className="day-detail-grid">
            <div>
              <h3>Total sales breakdown</h3>
              <p>Net sales {money.format(activeDay.netSales)} from {number.format(activeDay.guestCount)} guests at {money.format(activeDay.avgCheck)} average check.</p>
              <div className="mini-breakdown">
                {Object.entries(activeDay.revenueCenters).map(([key, value]) => (
                  <span key={key}><b>{key}</b>{money.format(value)}</span>
                ))}
              </div>
            </div>
            <div>
              <h3>Labor by department</h3>
              <div className="mini-breakdown">
                <span><b>FOH</b>{money.format(activeDay.fohLabor)}</span>
                <span><b>BOH</b>{money.format(activeDay.bohLabor)}</span>
                <span><b>Bar</b>{money.format(activeDay.barLabor)}</span>
                <span><b>Management</b>{money.format(activeDay.managementLabor)}</span>
              </div>
            </div>
            <div>
              <h3>Top-selling categories</h3>
              <div className="mini-breakdown">
                {Object.entries(activeDay.categories).map(([key, value]) => (
                  <span key={key}><b>{key}</b>{money.format(value)}</span>
                ))}
              </div>
            </div>
            <div>
              <h3>Manager notes & flags</h3>
              <p>{activeDay.managerNote}</p>
              <div className="flag-list">
                {activeDay.flags.map((flag) => <span key={flag}>{flag}</span>)}
              </div>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
