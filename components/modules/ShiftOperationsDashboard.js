"use client";

import Link from "next/link";
import { AlertTriangle, CalendarDays, CheckCircle2, ClipboardList, Download, Flame, Plus, Search, ShieldCheck, Thermometer, WalletCards } from "lucide-react";
import { useMemo, useState } from "react";
import {
  cashCloseout,
  checklists,
  dailyShiftReports,
  handoff,
  issues,
  managerOptions,
  shiftCharts,
  shiftInsights,
  shiftKpis,
  shiftOptions,
  shiftRanges,
  shiftSyncSources,
  staffingNotes,
  staffingSummary,
  tempLogs,
  timelineItems
} from "@/data/shiftOperationsMockData";

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const exactMoney = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 });

function cls(text) {
  return String(text).toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function MiniTrend({ values }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const points = values.map((value, index) => `${(index / (values.length - 1)) * 100},${82 - ((value - min) / Math.max(1, max - min)) * 64}`).join(" ");
  return (
    <svg className="shift-mini-trend" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <polyline points={points} fill="none" stroke="currentColor" strokeWidth="4" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function ShiftOpsKpiCard({ kpi }) {
  return (
    <article className={`shift-kpi ${cls(kpi.status)}`}>
      <div>
        <span>{kpi.label}</span>
        <strong>{kpi.value}</strong>
      </div>
      <MiniTrend values={kpi.trend} />
      <footer>
        <small>{kpi.change}</small>
        <b>{kpi.status}</b>
      </footer>
    </article>
  );
}

function ShiftTimeline() {
  return (
    <article className="shift-panel shift-span-7">
      <div className="shift-panel-heading">
        <div>
          <h2>Shift timeline / handoff feed</h2>
          <p>Chronological operating record from open to close.</p>
        </div>
      </div>
      <div className="shift-timeline">
        {timelineItems.map((item) => (
          <div className={`timeline-item ${cls(item.priority)}`} key={`${item.time}-${item.note}`}>
            <time>{item.time}</time>
            <div>
              <header>
                <span>{item.shift}</span>
                <b>{item.category}</b>
                <em>{item.status}</em>
              </header>
              <p>{item.note}</p>
              <footer>
                <small>{item.person} · Priority: {item.priority}</small>
                <small>{item.attachments ? `${item.attachments} attachment${item.attachments > 1 ? "s" : ""}` : "No attachments"}</small>
                <small>Owner: {item.owner}</small>
              </footer>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

function ManagerHandoffPanel() {
  const sections = [
    ["What went well", handoff.wentWell],
    ["What went wrong", handoff.wentWrong],
    ["Staffing notes", handoff.staffing],
    ["Guest/service notes", handoff.guest],
    ["Food/product notes", handoff.product],
    ["Equipment/maintenance", handoff.equipment],
    ["Cash/deposit notes", handoff.cash],
    ["Tomorrow's follow-ups", handoff.tomorrow]
  ];
  return (
    <article className="shift-panel shift-span-5">
      <div className="shift-panel-heading">
        <div>
          <h2>Manager handoff summary</h2>
          <p>Closing manager recap for GM and ownership.</p>
        </div>
      </div>
      <div className="handoff-list">
        {sections.map(([title, text]) => <div key={title}><strong>{title}</strong><p>{text}</p></div>)}
      </div>
      <button className="send-recap" type="button">Send Daily Recap</button>
    </article>
  );
}

function ChecklistCompletionPanel() {
  const [selected, setSelected] = useState(checklists[0]);
  return (
    <article className="shift-panel shift-wide">
      <div className="shift-panel-heading">
        <div>
          <h2>Checklist completion dashboard</h2>
          <p>Tap a checklist to inspect tasks, photos, failures, and manager signature.</p>
        </div>
      </div>
      <div className="checklist-layout">
        <div className="checklist-grid">
          {checklists.map((list) => (
            <button className={selected.name === list.name ? "active" : ""} type="button" key={list.name} onClick={() => setSelected(list)}>
              <strong>{list.name}</strong>
              <span>{list.completion}% complete</span>
              <i><b style={{ width: `${list.completion}%` }} /></i>
              <small>{list.completed}/{list.total} done · {list.late} late · {list.failed} failed · {list.photos} photos</small>
            </button>
          ))}
        </div>
        <div className="checklist-detail">
          <h3>{selected.name}</h3>
          <p>Signed by {selected.signedBy} · Completed {selected.time}</p>
          <div className="task-list">
            {selected.tasks.map((task, index) => (
              <span key={task}><CheckCircle2 size={15} /> {task}{index === selected.tasks.length - 1 && selected.failed ? " · needs review" : ""}</span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function TemperatureLogPanel() {
  return (
    <article className="shift-panel shift-span-7">
      <div className="shift-panel-heading"><div><h2><Thermometer size={19} /> Temperature and food safety logs</h2><p>94% compliance with corrective action tracking.</p></div></div>
      <div className="shift-table-wrap">
        <table className="shift-table">
          <thead><tr><th>Item/Equipment</th><th>Required Range</th><th>Logged Temp</th><th>Time</th><th>Logged By</th><th>Status</th><th>Corrective Action</th></tr></thead>
          <tbody>{tempLogs.map((log) => (
            <tr key={log.item} className={cls(log.status)}>
              <td><strong>{log.item}</strong></td><td>{log.range}</td><td>{log.temp}</td><td>{log.time}</td><td>{log.by}</td><td><span>{log.status}</span></td><td>{log.action}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </article>
  );
}

function CashCloseoutPanel() {
  const items = [
    ["Starting bank", exactMoney.format(cashCloseout.startingBank)],
    ["Expected cash", exactMoney.format(cashCloseout.expectedCash)],
    ["Counted cash", exactMoney.format(cashCloseout.countedCash)],
    ["Cash variance", exactMoney.format(cashCloseout.variance)],
    ["Paid outs", exactMoney.format(cashCloseout.paidOuts)],
    ["Tips declared", exactMoney.format(cashCloseout.tipsDeclared)],
    ["Deposit amount", exactMoney.format(cashCloseout.deposit)],
    ["Safe count", exactMoney.format(cashCloseout.safeCount)]
  ];
  return (
    <article className="shift-panel shift-span-5">
      <div className="shift-panel-heading"><div><h2><WalletCards size={19} /> Cash handling / closeout</h2><p>Deposit bag {cashCloseout.bag}</p></div><span className="status-good">{cashCloseout.drawerStatus}</span></div>
      <div className="cash-grid">{items.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
      <div className="drawer-list">{cashCloseout.drawers.map((drawer) => <span key={drawer.drawer}>{drawer.drawer}<b>{exactMoney.format(drawer.variance)}</b></span>)}</div>
      <p className="shift-note-card">Verified by {cashCloseout.verifiedBy}. Drawer 1 was $3.25 short, Drawer 2 was $10.50 over, net variance $7.25 over.</p>
    </article>
  );
}

function StaffingNotesPanel() {
  return (
    <article className="shift-panel shift-span-5">
      <div className="shift-panel-heading"><div><h2>Staffing and labor notes</h2><p>Coverage, callouts, breaks, and coaching notes.</p></div></div>
      <div className="staffing-grid">{staffingSummary.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
      <div className="staffing-notes">{staffingNotes.map((note) => <p key={note}>{note}</p>)}</div>
    </article>
  );
}

function IssueTracker() {
  return (
    <article className="shift-panel shift-span-7">
      <div className="shift-panel-heading"><div><h2><AlertTriangle size={19} /> Incident / issue tracker</h2><p>Open, resolved, and follow-up items by category.</p></div></div>
      <div className="shift-table-wrap">
        <table className="shift-table">
          <thead><tr><th>Time</th><th>Issue</th><th>Category</th><th>Severity</th><th>Owner</th><th>Status</th><th>Follow-up Date</th><th>Notes</th></tr></thead>
          <tbody>{issues.map((issue) => (
            <tr key={issue.issue} className={cls(issue.severity)}>
              <td>{issue.time}</td><td><strong>{issue.issue}</strong></td><td>{issue.category}</td><td><span>{issue.severity}</span></td><td>{issue.owner}</td><td>{issue.status}</td><td>{issue.followUp}</td><td>{issue.notes}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </article>
  );
}

function ShiftOpsDailyTable() {
  const [query, setQuery] = useState("");
  const rows = dailyShiftReports.filter((row) => `${row.date} ${row.day} ${row.mod} ${row.closingStatus}`.toLowerCase().includes(query.toLowerCase()));
  return (
    <article className="shift-panel shift-wide">
      <div className="shift-panel-heading">
        <div><h2>Daily report list by date</h2><p>Fourteen-day scan of store operations, issues, and closeout quality.</p></div>
        <label className="shift-search"><Search size={15} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Filter date, manager, status" /></label>
      </div>
      <div className="shift-table-wrap">
        <table className="shift-table daily">
          <thead><tr><th>Date</th><th>Day</th><th>Sales</th><th>Guest Count</th><th>Shift Score</th><th>Checklist %</th><th>Temp %</th><th>Open Issues</th><th>Resolved</th><th>Callouts</th><th>Cash Var.</th><th>Complaints</th><th>MOD</th><th>Closing Status</th><th>Follow-Ups</th></tr></thead>
          <tbody>{rows.map((row) => (
            <tr key={row.date} className={row.score < 80 ? "critical" : row.score < 88 ? "high" : "good"}>
              <td>{row.date.slice(5)}</td><td>{row.day}</td><td>{money.format(row.sales)}</td><td>{row.guests}</td><td>{row.score}</td><td>{row.checklist}%</td><td>{row.temp}%</td><td>{row.openIssues}</td><td>{row.resolvedIssues}</td><td>{row.callouts}</td><td>{exactMoney.format(row.cashVariance)}</td><td>{row.complaints}</td><td>{row.mod}</td><td>{row.closingStatus}</td><td>{row.followUps}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </article>
  );
}

function ChartPanel({ metric }) {
  const map = { score: "score", checklist: "checklist", issues: "openIssues", temp: "temp", cash: "cashVariance", complaints: "complaints", coverage: "guests" };
  const key = map[metric] || "score";
  const values = dailyShiftReports.map((row) => Math.abs(row[key]));
  const max = Math.max(...values);
  if (metric === "heatmap") {
    const parts = ["Open", "Lunch", "Dinner", "Close"];
    return <div className="shift-heatmap">{dailyShiftReports.slice(-7).map((row) => <div key={row.date}><small>{row.day.slice(0, 3)}</small>{parts.map((part, i) => <span key={part} style={{ opacity: 0.25 + Math.min(0.75, ((row.openIssues + row.complaints + i) / 16)) }} />)}</div>)}</div>;
  }
  return <div className="shift-bar-chart">{dailyShiftReports.map((row) => <div key={row.date}><span style={{ height: `${Math.max(8, (Math.abs(row[key]) / max) * 100)}%` }} /><small>{row.day.slice(0, 3)}</small></div>)}</div>;
}

export default function ShiftOperationsDashboard() {
  const [range, setRange] = useState("Last 14 Days");
  const [shift, setShift] = useState("Full Day");
  const [manager, setManager] = useState("All Managers");
  const [chart, setChart] = useState("score");

  return (
    <main className="shift-ops-shell">
      <header className="shift-hero">
        <div>
          <Link href="/modules" className="shift-back">Modules / Shift Operations</Link>
          <div className="ember-brand"><span><Flame size={22} /><b /></span><div><strong>Ember Street Bowls</strong><small>Fast casual bowls, wraps, salads, and house drinks</small></div></div>
          <h1>Shift Operations — Ember Street Bowls</h1>
          <p>Open-to-close visibility across manager notes, checklists, temps, cash closeout, staffing, delivery tablets, guest issues, and tomorrow&apos;s follow-ups.</p>
        </div>
        <section className="shift-controls">
          <label><CalendarDays size={15} /> Date<select value={range} onChange={(event) => setRange(event.target.value)}>{shiftRanges.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Shift<select value={shift} onChange={(event) => setShift(event.target.value)}>{shiftOptions.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Manager on Duty<select value={manager} onChange={(event) => setManager(event.target.value)}>{managerOptions.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Location<select><option>Ember Street Bowls - Main Street</option></select></label>
          <div>
            <button type="button"><Plus size={15} /> New Shift Note</button>
            <button type="button"><ClipboardList size={15} /> Start Checklist</button>
            <button type="button"><Thermometer size={15} /> Log Temperature</button>
            <button type="button"><AlertTriangle size={15} /> Record Incident</button>
            <button type="button"><Download size={15} /> Export Daily Report</button>
          </div>
        </section>
      </header>

      <section className="shift-command-center">
        <article className="shift-clipboard-card">
          <span>MOD clipboard</span>
          <strong>86</strong>
          <p>Current shift score with three owner attention items and one critical follow-up due tomorrow.</p>
          <div>
            {shiftKpis.slice(1, 5).map((kpi) => <small key={kpi.label}>{kpi.label}: <b>{kpi.value}</b></small>)}
          </div>
        </article>
        <div className="shift-sync-column">
          {shiftSyncSources.map(([label, time]) => <div key={label}><span>{label}</span><strong>{time}</strong></div>)}
        </div>
        <div className="shift-ops-ticket-board">
          {shiftKpis.map((kpi) => (
            <button className={cls(kpi.status)} type="button" key={kpi.label}>
              <span>{kpi.label}</span>
              <strong>{kpi.value}</strong>
              <small>{kpi.change}</small>
            </button>
          ))}
        </div>
      </section>

      <section className="shift-grid">
        <article className="shift-panel shift-wide">
          <div className="shift-panel-heading"><div><h2>Operations chart center</h2><p>Switch between scores, checklists, issues, temperature compliance, cash, complaints, and daypart pressure.</p></div><select value={chart} onChange={(event) => setChart(event.target.value)}>{shiftCharts.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}</select></div>
          <div className="shift-chart-buttons">{shiftCharts.map((item) => <button className={chart === item.key ? "active" : ""} key={item.key} type="button" onClick={() => setChart(item.key)}>{item.label}</button>)}</div>
          <ChartPanel metric={chart} />
        </article>
        <ShiftTimeline />
        <ManagerHandoffPanel />
        <ChecklistCompletionPanel />
        <TemperatureLogPanel />
        <CashCloseoutPanel />
        <StaffingNotesPanel />
        <IssueTracker />
        <ShiftOpsDailyTable />
        <article className="shift-panel shift-wide">
          <div className="shift-panel-heading"><div><h2><ShieldCheck size={19} /> Practical operational insights</h2><p>Signals a GM, district manager, or owner can act on tomorrow.</p></div></div>
          <div className="shift-insights">{shiftInsights.map((insight) => <p key={insight}>{insight}</p>)}</div>
        </article>
      </section>
    </main>
  );
}
