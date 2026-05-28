const rows = [
  ["Downtown", "$18.4k", "27.2%", "4.6", "On track"],
  ["Riverside", "$15.1k", "32.6%", "4.1", "Watch"],
  ["College", "$10.2k", "36.3%", "3.9", "Needs action"]
];

export default function DashboardPreview({ compact = false }) {
  return (
    <section className={compact ? "dashboard-preview compact" : "dashboard-preview"} id="dashboard-preview">
      <div className="preview-top">
        <div>
          <span>Store</span>
          <strong>All Stores</strong>
        </div>
        <div>
          <span>Date Range</span>
          <strong>Today</strong>
        </div>
      </div>
      <div className="preview-metrics">
        <PreviewMetric label="Net Sales" value="$77.1k" />
        <PreviewMetric label="Labor %" value="29.7%" />
        <PreviewMetric label="Feedback" value="4.4" />
        <PreviewMetric label="Open Issues" value="17" alert />
      </div>
      <div className="preview-alerts">
        <span>Shift note alert</span>
        <p>Store 5 has unresolved staffing and maintenance follow-up.</p>
      </div>
      <div className="preview-table">
        <div className="table-head">
          <span>Store</span>
          <span>Sales</span>
          <span>Labor</span>
          <span>Score</span>
          <span>Status</span>
        </div>
        {rows.map((row) => (
          <div className="table-row" key={row[0]}>
            {row.map((cell) => <span key={cell}>{cell}</span>)}
          </div>
        ))}
      </div>
    </section>
  );
}

function PreviewMetric({ label, value, alert = false }) {
  return (
    <article className={alert ? "preview-metric alert" : "preview-metric"}>
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}
