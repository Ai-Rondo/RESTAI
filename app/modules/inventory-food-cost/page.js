import Navbar from "@/components/marketing/Navbar";
import InventoryFoodCostDashboard from "@/components/modules/InventoryFoodCostDashboard";

export const metadata = {
  title: "Inventory & Food Cost — Hearth & Harbor Kitchen | Restaurant Technology Solutions",
  description:
    "A Hearth & Harbor Kitchen demo for inventory value, food cost variance, vendor pricing, waste, menu profitability, and purchasing."
};

export default function InventoryFoodCostPage() {
  return (
    <>
      <Navbar />
      <InventoryFoodCostDashboard />
    </>
  );
}
