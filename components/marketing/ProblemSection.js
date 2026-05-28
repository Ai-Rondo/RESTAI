const systems = ["POS", "Scheduling/Labor", "Shift Notes", "Guest Feedback", "Reviews", "Inventory", "Accounting", "Email Reports", "P&Ls"];

export default function ProblemSection() {
  return (
    <section className="section-shell split-section">
      <div>
        <p className="eyebrow">The operator problem</p>
        <h2>The data exists. It is just scattered.</h2>
      </div>
      <div className="section-copy">
        <p>
          Restaurant operators already use specialized systems for sales, staffing, manager notes, reviews, inventory,
          accounting, and daily reporting. The challenge is not a lack of information. The challenge is finding the
          signals that need attention before they turn into operational problems.
        </p>
        <div className="system-grid">
          {systems.map((system) => <span key={system}>{system}</span>)}
        </div>
      </div>
    </section>
  );
}
