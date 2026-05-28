import { ArrowRight, MonitorCheck } from "lucide-react";
import DashboardPreview from "./DashboardPreview";

export default function Hero() {
  return (
    <section className="hero section-shell" id="top">
      <div className="hero-copy">
        <p className="eyebrow">Restaurant operations visibility</p>
        <h1>Restaurant Operations, Finally In One Place.</h1>
        <p className="hero-subhead">
          Restaurant Intelligence gives owners, admins, and managers a centralized monitoring dashboard for sales,
          labor, shift notes, guest feedback, P&Ls, alerts, and multi-location performance.
        </p>
        <div className="hero-actions">
          <a className="button primary" href="/dashboard">
            See the Demo <ArrowRight size={18} />
          </a>
          <a className="button secondary" href="#dashboard-preview">
            View Dashboard Concept <MonitorCheck size={18} />
          </a>
        </div>
        <p className="hero-line">Keep your existing systems. See everything that matters in one dashboard.</p>
      </div>
      <DashboardPreview compact />
    </section>
  );
}
