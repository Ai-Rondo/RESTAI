import { Bell, Building2, ClipboardList, Mail, MessageSquare, PieChart, ReceiptText, SlidersHorizontal } from "lucide-react";
import FeatureCard from "./FeatureCard";

const features = [
  { icon: Building2, title: "Multi-Location Dashboard", text: "See combined performance and store-level exceptions from one operating view." },
  { icon: PieChart, title: "Sales & Labor Visibility", text: "Monitor sales, labor percentage, hours, comps, discounts, and store comparisons." },
  { icon: ClipboardList, title: "Shift Note Monitoring", text: "Surface manager notes, 86'd items, maintenance, staffing, and follow-up themes." },
  { icon: MessageSquare, title: "Guest Feedback & Reviews", text: "Track ratings, comments, issue categories, and recent guest signals by store." },
  { icon: ReceiptText, title: "P&L Upload / Financial Snapshot", text: "Organize monthly financial summaries without replacing accounting systems." },
  { icon: Bell, title: "Operational Alerts", text: "Flag high labor, low sales, unresolved maintenance, feedback spikes, and missing reports." },
  { icon: Mail, title: "Email Report Ingestion", text: "Prepare for daily recaps, vendor emails, exports, and uploaded reports." },
  { icon: SlidersHorizontal, title: "Custom Restaurant Modules", text: "Shape the dashboard around the workflows your ownership team actually reviews." }
];

export default function FeaturesSection() {
  return (
    <section className="section-shell" id="features">
      <div className="section-heading left">
        <p className="eyebrow">Platform features</p>
        <h2>Built around the questions operators ask every day.</h2>
      </div>
      <div className="feature-grid">
        {features.map((feature) => <FeatureCard key={feature.title} {...feature} />)}
      </div>
    </section>
  );
}
