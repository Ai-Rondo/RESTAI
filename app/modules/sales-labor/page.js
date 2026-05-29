import ForkSalesLaborDashboard from "@/components/modules/ForkSalesLaborDashboard";
import Navbar from "@/components/marketing/Navbar";

export const metadata = {
  title: "Sales & Labor — Fork Alehouse Operations | Restaurant Intelligence",
  description:
    "A Fork Alehouse demo showing sales, labor, guest count, ordering channels, dayparts, and operating insights."
};

export default function SalesLaborPage() {
  return (
    <>
      <Navbar />
      <ForkSalesLaborDashboard />
    </>
  );
}
