import ContactForm from "@/components/marketing/ContactForm";
import CTASection from "@/components/marketing/CTASection";
import DashboardPreview from "@/components/marketing/DashboardPreview";
import FeaturesSection from "@/components/marketing/FeaturesSection";
import Footer from "@/components/marketing/Footer";
import Hero from "@/components/marketing/Hero";
import HowItWorks from "@/components/marketing/HowItWorks";
import Navbar from "@/components/marketing/Navbar";
import ProblemSection from "@/components/marketing/ProblemSection";
import ServicesSection from "@/components/marketing/ServicesSection";
import SolutionSection from "@/components/marketing/SolutionSection";
import WhoItIsFor from "@/components/marketing/WhoItIsFor";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <section className="section-shell dashboard-section">
        <div className="section-heading">
          <p className="eyebrow">Dashboard concept</p>
          <h2>Mission control without replacing the systems your teams already use.</h2>
          <p>
            This static preview shows how store filters, date ranges, operating metrics, shift note alerts, and store
            comparisons could live together in one monitoring layer.
          </p>
        </div>
        <DashboardPreview />
      </section>
      <FeaturesSection />
      <WhoItIsFor />
      <HowItWorks />
      <ServicesSection />
      <section className="philosophy-section">
        <div className="section-shell philosophy-card">
          <p className="eyebrow">Important philosophy</p>
          <h2>Not Another System To Manage</h2>
          <p>
            Restaurant Technology Solutions is designed to reduce duplicate entry. The goal is not to make managers do more
            work. The goal is to surface information they already entered somewhere else.
          </p>
        </div>
      </section>
      <CTASection />
      <ContactForm />
      <Footer />
    </main>
  );
}
