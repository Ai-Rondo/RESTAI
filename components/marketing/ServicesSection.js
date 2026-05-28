const services = [
  "Operations dashboard",
  "Restaurant website builds",
  "Employee app concepts",
  "Guest feedback system",
  "Manager communication tools",
  "Custom restaurant reporting",
  "Integration setup",
  "Admin/GM/manager permission layers"
];

export default function ServicesSection() {
  return (
    <section className="section-shell services-section" id="services">
      <div className="section-heading left">
        <p className="eyebrow">Services and modules</p>
        <h2>Optional modules for the way your group operates.</h2>
      </div>
      <div className="service-grid">
        {services.map((service) => <article key={service}>{service}</article>)}
      </div>
    </section>
  );
}
