import Link from "next/link";
import HubDiagram from "./HubDiagram";
import ModuleCard from "./ModuleCard";
import { mainModules, secondaryModules } from "./modulesData";

const intelligenceSteps = ["Connect", "Visualize", "Correlate", "Alert", "Recommend"];

const signalExamples = [
  "Sales down while guest complaints rise",
  "Labor high while guest count is flat",
  "Tuesday night shift has worsening trends",
  "Negative reviews line up with staffing gaps",
  "Food cost increases while sales stay flat"
];

export default function ModulesOverviewPage() {
  return (
    <main className="modules-page">
      <section className="modules-hero">
        <div>
          <p className="eyebrow">Modules overview</p>
          <h1>Build Your Restaurant Operations Hub</h1>
          <p>
            Choose the systems you want connected. We turn scattered restaurant data into one clear operational view.
          </p>
          <div className="hero-actions">
            <Link className="button primary light" href="/#contact">
              Book a Discovery Call
            </Link>
            <Link className="button secondary" href="/dashboard">
              View Dashboard Concept
            </Link>
          </div>
        </div>
        <div className="modules-hero-panel">
          <span>Connection layer</span>
          <strong>Systems stay in place.</strong>
          <p>Restaurant Intelligence organizes the signals operators already have into one monitoring hub.</p>
        </div>
      </section>

      <section className="section-shell modules-hub-section">
        <div className="section-heading left">
          <p className="eyebrow">Central operating view</p>
          <h2>Restaurants already use many systems. The missing piece is the body that connects them.</h2>
          <p>
            POS, scheduling, shift logs, guest feedback, reviews, inventory, financials, online ordering, health
            audits, and email reports can all become part of one operational view.
          </p>
        </div>
        <HubDiagram />
      </section>

      <section className="section-shell">
        <div className="section-heading">
          <p className="eyebrow">Main modules</p>
          <h2>The operating areas most restaurant groups need to see first.</h2>
        </div>
        <div className="modules-card-grid">
          {mainModules.map((module) => (
            <ModuleCard key={module.title} {...module} />
          ))}
        </div>
      </section>

      <section className="section-shell secondary-modules-section">
        <div className="section-heading left">
          <p className="eyebrow">Secondary modules</p>
          <h2>Additional restaurant signals can plug into the same hub over time.</h2>
        </div>
        <div className="secondary-module-grid">
          {secondaryModules.map((module) => (
            <ModuleCard key={module.title} compact {...module} />
          ))}
        </div>
      </section>

      <section className="intelligence-section">
        <div className="section-shell intelligence-layout">
          <div>
            <p className="eyebrow">Intelligence layer</p>
            <h2>Once systems are connected, the dashboard can compare signals across systems.</h2>
            <p>
              Restaurant Intelligence starts as visibility, then grows into smarter operational monitoring as the same
              store, date, and performance signals line up across sources.
            </p>
          </div>
          <div>
            <div className="intelligence-flow">
              {intelligenceSteps.map((step) => (
                <span key={step}>{step}</span>
              ))}
            </div>
            <div className="signal-grid">
              {signalExamples.map((example) => (
                <span key={example}>{example}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell modules-cta">
        <div className="cta-card">
          <h2>Not sure which modules your restaurant group needs?</h2>
          <Link className="button primary light" href="/#contact">
            Book a Discovery Call
          </Link>
        </div>
      </section>
    </main>
  );
}
