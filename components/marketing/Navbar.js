import Link from "next/link";
import { BarChart3 } from "lucide-react";
import ModulesDropdown from "./ModulesDropdown";

export default function Navbar() {
  return (
    <header className="navbar">
      <Link className="nav-brand" href="/" aria-label="Restaurant Technology Solutions home">
        <span className="brand-mark"><BarChart3 size={22} /></span>
        <span>Restaurant Technology Solutions</span>
      </Link>
      <nav className="nav-links" aria-label="Main navigation">
        <Link href="/#solution">Solution</Link>
        <Link href="/#features">Features</Link>
        <ModulesDropdown />
        <Link href="/#contact">Contact</Link>
      </nav>
      <Link className="nav-cta" href="/dashboard">See the Demo</Link>
    </header>
  );
}
