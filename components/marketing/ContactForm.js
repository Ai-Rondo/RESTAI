export default function ContactForm() {
  return (
    <section className="section-shell contact-section" id="contact">
      <div className="contact-copy">
        <p className="eyebrow">Contact</p>
        <h2>Tell us what systems your restaurant group already uses.</h2>
        <p>
          No payment processing, authentication, or live API connections are included in this prototype. This form is a
          placeholder for demo and discovery requests.
        </p>
      </div>
      <form className="contact-form">
        <label>Name<input type="text" placeholder="Your name" /></label>
        <label>Restaurant/group name<input type="text" placeholder="Restaurant group" /></label>
        <label>Email<input type="email" placeholder="you@example.com" /></label>
        <label>Number of locations<input type="text" placeholder="Example: 5" /></label>
        <label className="full">Message<textarea placeholder="What would you want to see in one dashboard?" /></label>
        <button type="button">Send Message</button>
      </form>
    </section>
  );
}
