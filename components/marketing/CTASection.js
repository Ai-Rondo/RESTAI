import { CalendarCheck } from "lucide-react";

export default function CTASection() {
  return (
    <section className="cta-section">
      <div className="section-shell cta-card">
        <div>
          <p className="eyebrow">Pilot conversations open</p>
          <h2>Want to See What This Could Look Like For Your Restaurant Group?</h2>
        </div>
        <a className="button primary light" href="#contact">
          Book a Discovery Call <CalendarCheck size={18} />
        </a>
      </div>
    </section>
  );
}
