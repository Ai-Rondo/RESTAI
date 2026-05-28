const steps = [
  "Identify your current systems",
  "Configure dashboard views",
  "Connect reports, emails, uploads, or APIs where available",
  "Monitor operations from one place"
];

export default function HowItWorks() {
  return (
    <section className="section-shell how-section">
      <div className="section-heading">
        <p className="eyebrow">How it works</p>
        <h2>Start with what you already have.</h2>
      </div>
      <div className="step-grid">
        {steps.map((step, index) => (
          <article className="step-card" key={step}>
            <span>{index + 1}</span>
            <h3>{step}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}
