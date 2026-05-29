import Navbar from "@/components/marketing/Navbar";
import GuestExperienceDashboard from "@/components/modules/GuestExperienceDashboard";

export const metadata = {
  title: "Guest Experience Intelligence — Citrus Kitchen | Restaurant Intelligence",
  description:
    "Internal guest satisfaction intelligence for Citrus Kitchen, including survey trends, operational drivers, recovery, dayparts, managers, and daily guest experience reporting."
};

export default function GuestExperiencePage() {
  return (
    <>
      <Navbar />
      <GuestExperienceDashboard />
    </>
  );
}
