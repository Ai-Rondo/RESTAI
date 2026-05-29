import Footer from "@/components/marketing/Footer";
import ModulesOverviewPage from "@/components/marketing/ModulesOverviewPage";
import Navbar from "@/components/marketing/Navbar";

export const metadata = {
  title: "Modules Overview | Restaurant Intelligence",
  description: "Build a restaurant operations hub by connecting sales, labor, shift notes, feedback, P&L, and more."
};

export default function ModulesPage() {
  return (
    <>
      <Navbar />
      <ModulesOverviewPage />
      <Footer />
    </>
  );
}
