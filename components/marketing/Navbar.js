import { BarChart3 } from "lucide-react";

export default function Navbar() {
  return (
    <header className="navbar">
      <a className="nav-brand" href="#top" aria-label="Restaurant Intelligence home">
        <span className="brand-mark"><BarChart3 size={22} /></span>
        <span>Restaurant Intelligence</span>
      </a>
      <nav className="nav-links" aria-label="Main navigation">
        <a href="#solution">Solution</a>
        <a href="#features">Features</a>
        <a href="#services">Modules</a>
        <a href="#contact">Contact</a>
      </nav>
      <a className="nav-cta" href="/dashboard">See the Demo</a>
    </header>
  );
}
