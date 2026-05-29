import Navbar from "@/components/marketing/Navbar";
import ShiftOperationsDashboard from "@/components/modules/ShiftOperationsDashboard";

export const metadata = {
  title: "Shift Operations — Ember Street Bowls | Restaurant Intelligence",
  description:
    "A fast casual shift operations demo for manager notes, checklists, food safety, cash, staffing, issues, and daily handoffs."
};

export default function ShiftOperationsPage() {
  return (
    <>
      <Navbar />
      <ShiftOperationsDashboard />
    </>
  );
}
