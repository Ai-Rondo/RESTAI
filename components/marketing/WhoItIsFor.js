const audiences = [
  "Independent restaurant groups",
  "Bars and grill concepts",
  "Multi-unit operators",
  "Franchise operators",
  "Owners who already use multiple systems",
  "GMs and area managers"
];

export default function WhoItIsFor() {
  return (
    <section className="audience-section">
      <div className="section-shell audience-layout">
        <div>
          <p className="eyebrow">Who it is for</p>
          <h2>Made for restaurant leaders who need sharper visibility.</h2>
        </div>
        <div className="audience-list">
          {audiences.map((audience) => <span key={audience}>{audience}</span>)}
        </div>
      </div>
    </section>
  );
}
