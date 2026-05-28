import { Eye, Layers, Wrench } from "lucide-react";

const principles = [
  { icon: Wrench, title: "We don't replace your tools.", text: "POS, labor, notes, feedback, accounting, and inventory systems stay where they are." },
  { icon: Layers, title: "We organize the signals.", text: "Restaurant Intelligence becomes the visibility layer above your existing restaurant software." },
  { icon: Eye, title: "We help ownership see what needs attention.", text: "Multi-location leaders get faster reads on stores, exceptions, and follow-up items." }
];

export default function SolutionSection() {
  return (
    <section className="solution-section" id="solution">
      <div className="section-shell">
        <div className="section-heading">
          <p className="eyebrow">The solution</p>
          <h2>An operational visibility layer for restaurant groups.</h2>
          <p>
            Restaurant Intelligence connects to or organizes the information your teams already produce, then presents
            the most important operating signals in one clean monitoring dashboard.
          </p>
        </div>
        <div className="principle-grid">
          {principles.map(({ icon: Icon, title, text }) => (
            <article className="principle-card" key={title}>
              <Icon size={24} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
