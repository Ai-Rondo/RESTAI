"use client";

import Link from "next/link";
import { Citrus, HeartHandshake, Search, Sparkles, TrendingUp } from "lucide-react";
import { useMemo, useState } from "react";
import {
  dailyGuestExperience,
  dayparts,
  districtMock,
  guestComments,
  guestInsights,
  guestKpis,
  guestRanges,
  managerComparison,
  operationalDrivers,
  recoveryCases,
  surveyQuestions
} from "@/data/guestExperienceMockData";

function cls(text) {
  return String(text).toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function Trend({ values }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const points = values.map((v, i) => `${(i / (values.length - 1)) * 100},${82 - ((v - min) / Math.max(1, max - min)) * 64}`).join(" ");
  return <svg className="guest-spark" viewBox="0 0 100 100" preserveAspectRatio="none"><polyline points={points} fill="none" stroke="currentColor" strokeWidth="4" vectorEffect="non-scaling-stroke" /></svg>;
}

function KpiCard({ kpi }) {
  return (
    <article className={`guest-kpi ${cls(kpi.status)}`}>
      <span>{kpi.label}</span>
      <strong>{kpi.value}</strong>
      <Trend values={kpi.trend} />
      <footer><small>{kpi.change}</small><b>{kpi.status}</b></footer>
    </article>
  );
}

function BarTrend({ metric }) {
  const max = Math.max(...dailyGuestExperience.map((d) => d[metric]));
  return (
    <div className="guest-bar-trend">
      {dailyGuestExperience.map((day) => (
        <div key={day.date}>
          <span style={{ height: `${Math.max(10, (day[metric] / max) * 100)}%` }} />
          <small>{day.day.slice(0, 3)}</small>
        </div>
      ))}
    </div>
  );
}

function DayOfWeekHeatmap() {
  const byDay = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => {
    const rows = dailyGuestExperience.filter((row) => row.day === day);
    return {
      day,
      score: Math.round(rows.reduce((s, r) => s + r.guestScore, 0) / rows.length),
      nps: Math.round(rows.reduce((s, r) => s + r.nps, 0) / rows.length),
      volume: rows.reduce((s, r) => s + r.surveyCount, 0),
      complaint: rows[rows.length - 1].topComplaint,
      compliment: rows[rows.length - 1].topCompliment
    };
  });
  return (
    <div className="guest-heatmap">
      {byDay.map((day) => (
        <div key={day.day} style={{ "--heat": day.score / 100 }}>
          <strong>{day.day}</strong>
          <span>{day.score}</span>
          <small>NPS {day.nps} · {day.volume} surveys</small>
          <p><b>Complaint:</b> {day.complaint}</p>
          <p><b>Compliment:</b> {day.compliment}</p>
        </div>
      ))}
    </div>
  );
}

function DailyTable() {
  const [query, setQuery] = useState("");
  const rows = useMemo(() => dailyGuestExperience.filter((row) => `${row.date} ${row.day} ${row.topComplaint} ${row.topCompliment} ${row.manager}`.toLowerCase().includes(query.toLowerCase())), [query]);
  return (
    <article className="guest-panel guest-wide">
      <div className="guest-panel-heading">
        <div><h2>Daily guest experience table</h2><p>Scan internal guest satisfaction by day, manager, complaint, compliment, and recovery load.</p></div>
        <label className="guest-search"><Search size={15} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Filter manager, complaint, day" /></label>
      </div>
      <div className="guest-table-wrap">
        <table className="guest-table">
          <thead><tr><th>Date</th><th>Day</th><th>Guest Score</th><th>NPS</th><th>Survey Count</th><th>Would Return</th><th>Would Recommend</th><th>Top Complaint</th><th>Top Compliment</th><th>Open Recoveries</th><th>Recovered Guests</th><th>Manager On Duty</th></tr></thead>
          <tbody>{rows.map((row) => <tr key={row.date} className={row.guestScore < 84 ? "risk" : row.guestScore > 91 ? "strong" : ""}><td>{row.date.slice(5)}</td><td>{row.day}</td><td>{row.guestScore}</td><td>{row.nps}</td><td>{row.surveyCount}</td><td>{row.wouldReturn}%</td><td>{row.wouldRecommend}%</td><td>{row.topComplaint}</td><td>{row.topCompliment}</td><td>{row.openRecoveries}</td><td>{row.recoveredGuests}</td><td>{row.manager}</td></tr>)}</tbody>
        </table>
      </div>
    </article>
  );
}

export default function GuestExperienceDashboard() {
  const [range, setRange] = useState("Last 30 Days");
  const [metric, setMetric] = useState("guestScore");
  const metrics = [
    ["guestScore", "Overall Satisfaction by Day"],
    ["nps", "NPS by Day"],
    ["wouldReturn", "Would Return %"],
    ["wouldRecommend", "Would Recommend %"],
    ["surveyCount", "Survey Volume"],
    ["responseRate", "Response Rate"]
  ];

  return (
    <main className="guest-demo-shell">
      <header className="guest-hero">
        <div>
          <Link href="/modules" className="guest-back">Modules / Guest Experience Intelligence</Link>
          <div className="citrus-brand"><span><Citrus size={27} /></span><div><strong>Citrus Kitchen</strong><small>Fresh bowls, wraps, salads, grilled proteins, and smoothies</small></div></div>
          <h1>Guest Experience Intelligence</h1>
          <p>Internal guest satisfaction intelligence from receipt surveys, QR surveys, email surveys, table touches, and guest recovery programs.</p>
        </div>
        <section className="guest-program-card">
          <strong>Citrus Kitchen</strong>
          <span>Annual sales: ~$3M</span>
          <label>Date range<select value={range} onChange={(e) => setRange(e.target.value)}>{guestRanges.map((item) => <option key={item}>{item}</option>)}</select></label>
          <p>Mock program: receipt survey + QR table touch + email follow-up recovery workflow.</p>
        </section>
      </header>

      <section className="guest-kpi-grid">{guestKpis.map((kpi) => <KpiCard kpi={kpi} key={kpi.label} />)}</section>

      <section className="guest-grid">
        <article className="guest-panel guest-wide">
          <div className="guest-panel-heading"><div><h2>Guest satisfaction trend dashboard</h2><p>Track satisfaction, NPS, return intent, recommendation intent, volume, and response rate.</p></div><select value={metric} onChange={(e) => setMetric(e.target.value)}>{metrics.map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></div>
          <div className="guest-chart-tabs">{metrics.map(([key, label]) => <button className={metric === key ? "active" : ""} type="button" key={key} onClick={() => setMetric(key)}>{label}</button>)}</div>
          <BarTrend metric={metric} />
        </article>

        <article className="guest-panel guest-span-5">
          <div className="guest-panel-heading"><div><h2>Daypart analysis</h2><p>Dinner scores are 12 points lower than lunch scores during the selected period.</p></div></div>
          <div className="daypart-guest-list">{dayparts.map((part) => <div key={part.name}><strong>{part.name}</strong><span>{part.score}</span><p>NPS {part.nps} · {part.count} surveys · {part.trend}</p><small>Complaint: {part.complaint}</small><small>Compliment: {part.compliment}</small></div>)}</div>
        </article>

        <article className="guest-panel guest-span-7">
          <div className="guest-panel-heading"><div><h2>Day of week heatmap</h2><p>Sunday has highest traffic but lowest guest satisfaction.</p></div></div>
          <DayOfWeekHeatmap />
        </article>

        <article className="guest-panel guest-wide">
          <div className="guest-panel-heading"><div><h2>Survey question dashboard</h2><p>Internal question scores with benchmark, sentiment, and comment volume.</p></div></div>
          <div className="guest-table-wrap"><table className="guest-table compact"><thead><tr><th>Question</th><th>Avg Score</th><th>Trend</th><th>Benchmark</th><th>Positive %</th><th>Negative %</th><th>Comment Count</th></tr></thead><tbody>{surveyQuestions.map((q) => <tr key={q.question}><td><strong>{q.question}</strong></td><td>{q.average.toFixed(1)}</td><td>{q.trend}</td><td>{q.benchmark.toFixed(1)}</td><td>{q.positive}%</td><td>{q.negative}%</td><td>{q.comments}</td></tr>)}</tbody></table></div>
        </article>

        <article className="guest-panel guest-span-7">
          <div className="guest-panel-heading"><div><h2>Operational driver analysis</h2><p>Operational factors most correlated with lower guest scores.</p></div></div>
          <div className="driver-list">{operationalDrivers.map((driver) => <div key={driver.issue}><header><strong>{driver.issue}</strong><span>{driver.impact} pts</span></header><p>{driver.occurrences} negative surveys · {driver.effect}</p><small>{driver.comments.join(" ")}</small></div>)}</div>
        </article>

        <article className="guest-panel guest-span-5">
          <div className="guest-panel-heading"><div><h2>Guest verbatim feed</h2><p>Internal comments tagged by operation category.</p></div></div>
          <div className="comment-feed">{guestComments.map((item) => <div className={cls(item.sentiment)} key={item.comment}><header><strong>{item.score}</strong><span>{item.sentiment}</span></header><p>&ldquo;{item.comment}&rdquo;</p><small>{item.date} · {item.shift} · {item.daypart} · {item.manager} · {item.category}</small><footer>{item.tags.map((tag) => <b key={tag}>{tag}</b>)}</footer></div>)}</div>
        </article>

        <article className="guest-panel guest-span-6">
          <div className="guest-panel-heading"><div><h2><HeartHandshake size={19} /> Service recovery center</h2><p>Guests needing follow-up and recovery tracking.</p></div></div>
          <div className="guest-table-wrap"><table className="guest-table recovery"><thead><tr><th>Guest</th><th>Issue</th><th>Severity</th><th>Store Impact</th><th>Assigned To</th><th>Status</th><th>Resolution</th><th>Recovery</th></tr></thead><tbody>{recoveryCases.map((item) => <tr key={item.guest}><td>{item.guest}</td><td>{item.issue}</td><td>{item.severity}</td><td>{item.impact}</td><td>{item.assignedTo}</td><td>{item.status}</td><td>{item.resolution}</td><td>{item.recovery}</td></tr>)}</tbody></table></div>
        </article>

        <article className="guest-panel guest-span-6">
          <div className="guest-panel-heading"><div><h2>Manager comparison</h2><p>Rank managers by guest score, NPS, and recovery success.</p></div></div>
          <div className="manager-rank-list">{managerComparison.map((m, i) => <div key={m.manager}><span>#{i + 1}</span><strong>{m.manager}</strong><p>Score {m.score} · NPS {m.nps} · {m.responses} responses</p><small>Recovery {m.recovery}% · Accuracy {m.accuracy} · Service {m.service}</small></div>)}</div>
        </article>

        <article className="guest-panel guest-span-5">
          <div className="guest-panel-heading"><div><h2>District view mockup</h2><p>How this scales beyond one Citrus Kitchen location.</p></div></div>
          <div className="district-list">{districtMock.map((store) => <div key={store.store}><strong>{store.store}</strong><span>Rank #{store.rank}</span><p>Guest score {store.score} · {store.region} region · {store.status}</p></div>)}</div>
          <div className="district-average"><span>District avg 88</span><span>Company avg 86</span><span>Region rank 2/7</span></div>
        </article>

        <article className="guest-panel guest-span-7">
          <div className="guest-panel-heading"><div><h2><Sparkles size={19} /> Operational insights</h2><p>Practical signals from internal guest experience data.</p></div></div>
          <div className="guest-insights">{guestInsights.map((insight) => <p key={insight}>{insight}</p>)}</div>
        </article>

        <DailyTable />
      </section>
    </main>
  );
}
