import { ArrowRight } from "lucide-react";

export default function ModuleCard({ title, description, id, compact = false }) {
  return (
    <article className={`module-card ${compact ? "compact" : ""}`} id={id}>
      <div>
        <span className="module-chip">{compact ? "Future module" : "Core module"}</span>
        <h3>{title}</h3>
      </div>
      <p>{description}</p>
      {!compact && (
        <span className="module-status">
          Connection-ready concept
          <ArrowRight size={15} aria-hidden="true" />
        </span>
      )}
    </article>
  );
}
