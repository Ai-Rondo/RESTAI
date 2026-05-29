"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { moduleLinks } from "./modulesData";

export default function ModulesDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div className={`modules-nav ${open ? "open" : ""}`}>
      <button
        className="modules-trigger"
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((current) => !current)}
      >
        Modules
        <ChevronDown size={16} aria-hidden="true" />
      </button>
      <div className="modules-menu" role="menu">
        {/* Future module demo pages will replace these placeholder anchors. */}
        {moduleLinks.map((item) => (
          <Link key={item.title} href={item.href} role="menuitem" onClick={() => setOpen(false)}>
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
