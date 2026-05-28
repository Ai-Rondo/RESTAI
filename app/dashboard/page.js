"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Bell, CalendarDays, ClipboardList, MessageSquare, Store, TrendingUp, Users } from "lucide-react";

const stores = ["All Stores", "Store 1", "Store 2", "Store 3", "Store 4", "Store 5"];
const ranges = ["Today", "Yesterday", "This Week", "Last Week", "This Month", "Custom Range"];
const rows = [
  { store: "Store 1", sales: 18420, labor: 27.2, rating: 4.6, issues: 2, status: "On track" },
  { store: "Store 2", sales: 15110, labor: 32.6, rating: 4.1, issues: 5, status: "Watch" },
  { store: "Store 3", sales: 12980, labor: 28.7, rating: 4.4, issues: 1, status: "On track" },
  { store: "Store 4", sales: 20440, labor: 27.0, rating: 4.7, issues: 2, status: "On track" },
  { store: "Store 5", sales: 10220, labor: 36.3, rating: 3.9, issues: 7, status: "Needs action" }
];

const notes = [
  { store: "Store 1", type: "86'd Items", text: "Short rib sold out during dinner. Prep extra for Friday." },
  { store: "Store 2", type: "Maintenance", text: "Walk-in door gasket needs vendor follow-up." },
  { store: "Store 5", type: "Staffing", text: "Two new servers need shadow shifts before weekend volume." }
];

const alerts = [
  { store: "Store 5", severity: "High", source: "Labor", text: "Labor is running above target at 36.3%." },
  { store: "Store 2", severity: "Medium", source: "Guest Feedback", text: "Negative service comments increased today." },
  { store: "Store 5", severity: "High", source: "Email Reports", text: "Morning report has not been received." }
];

function money(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

export default function DashboardDemo() {
  const [selectedStore, setSelectedStore] = useState("All Stores");
  const [dateRange, setDateRange] = useState("Today");
  const visibleRows = selectedStore === "All Stores" ? rows : rows.filter((row) => row.store === selectedStore);
  const totals = visibleRows.reduce((acc, row) => ({
    sales: acc.sales + row.sales,
    laborDollars: acc.laborDollars + row.sales * (row.labor / 100),
    ratingTotal: acc.ratingTotal + row.rating,
    issues: acc.issues + row.issues
  }), { sales: 0, laborDollars: 0, ratingTotal: 0, issues: 0 });
  const laborPercent = totals.sales ? (totals.laborDollars / totals.sales) * 100 : 0;
  const averageRating = visibleRows.length ? totals.ratingTotal / visibleRows.length : 0;
  const visibleNotes = selectedStore === "All Stores" ? notes : notes.filter((note) => note.store === selectedStore);
  const visibleAlerts = selectedStore === "All Stores" ? alerts : alerts.filter((alert) => alert.store === selectedStore);

  return (
    <main className="demo-shell">
      <header className="demo-header">
        <div>
          <Link className="back-link" href="/"><ArrowLeft size={16} /> Restaurant Intelligence</Link>
          <h1>Operations Dashboard Demo</h1>
          <p>Placeholder monitoring view for sales, labor, shift notes, guest feedback, P&Ls, alerts, and store performance.</p>
        </div>
        <div className="demo-controls">
          <label><Store size={15} /> Store<select value={selectedStore} onChange={(event) => setSelectedStore(event.target.value)}>{stores.map((store) => <option key={store}>{store}</option>)}</select></label>
          <label><CalendarDays size={15} /> Range<select value={dateRange} onChange={(event) => setDateRange(event.target.value)}>{ranges.map((range) => <option key={range}>{range}</option>)}</select></label>
        </div>
      </header>
      <section className="demo-context"><strong>{selectedStore}</strong><span>{dateRange} · demo data only · no live integrations yet</span></section>
      <section className="demo-metrics">
        <Metric icon={TrendingUp} label="Net Sales" value={money(totals.sales)} detail="POS placeholder" />
        <Metric icon={Users} label="Labor %" value={`${laborPercent.toFixed(1)}%`} detail="Scheduling placeholder" />
        <Metric icon={MessageSquare} label="Feedback Score" value={averageRating.toFixed(1)} detail="Reviews placeholder" />
        <Metric icon={Bell} label="Open Issues" value={totals.issues} detail="Operational alerts" alert />
      </section>
      <section className="demo-grid">
        <article className="demo-panel wide">
          <div className="demo-panel-heading"><h2>Store Comparison</h2><span>Monitoring layer</span></div>
          <div className="demo-table">
            <div className="demo-table-head"><span>Store</span><span>Net Sales</span><span>Labor %</span><span>Rating</span><span>Issues</span><span>Status</span></div>
            {visibleRows.map((row) => (
              <div className="demo-table-row" key={row.store}>
                <span>{row.store}</span><span>{money(row.sales)}</span><span>{row.labor.toFixed(1)}%</span><span>{row.rating.toFixed(1)}</span><span>{row.issues}</span><span>{row.status}</span>
              </div>
            ))}
          </div>
        </article>
        <article className="demo-panel">
          <div className="demo-panel-heading"><h2>Sales Trend</h2><span>Placeholder chart</span></div>
          <div className="demo-bars">{[38, 42, 51, 57, 74, 92, 68].map((height, index) => <span key={index} style={{ height: `${height}%` }} />)}</div>
        </article>
      </section>
      <section className="demo-grid">
        <article className="demo-panel">
          <div className="demo-panel-heading"><h2><ClipboardList size={18} /> Shift Notes</h2><span>Source: ShiftNote placeholder</span></div>
          <div className="demo-list">{visibleNotes.map((note) => <div key={`${note.store}-${note.type}`}><strong>{note.store} · {note.type}</strong><p>{note.text}</p></div>)}</div>
        </article>
        <article className="demo-panel">
          <div className="demo-panel-heading"><h2><Bell size={18} /> Alerts</h2><span>Needs attention</span></div>
          <div className="demo-list">{visibleAlerts.map((alert) => <div key={`${alert.store}-${alert.source}`}><strong>{alert.severity} · {alert.store}</strong><p>{alert.text}</p><small>{alert.source}</small></div>)}</div>
        </article>
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
