import { connectedSystems } from "./modulesData";

export default function HubDiagram() {
  return (
    <div className="hub-diagram" aria-label="Restaurant systems connected into Restaurant Technology Solutions">
      <div className="hub-core">
        <span>Central hub</span>
        <strong>Restaurant Technology Solutions</strong>
        <p>The product is the connection layer. The dashboard is how restaurant operators finally see the whole picture.</p>
      </div>
      <div className="hub-system-grid">
        {connectedSystems.map((system) => (
          <span key={system}>{system}</span>
        ))}
      </div>
    </div>
  );
}
