import React, { useState } from "react";
import site from "@/content/site-content.json";

export default function Header() {
  const { brand, nav, footer } = site;
  const [open, setOpen] = useState(false);
  const phoneTel = footer.phoneTel || `tel:${footer.phone}`;

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <a href="#hero" className="site-brand">
          <span className="site-brand-name">{brand.name}</span>
          {brand.locationLine ? (
            <span className="site-brand-tag">{brand.locationLine}</span>
          ) : null}
        </a>
        <button
          type="button"
          className="site-nav-toggle"
          aria-expanded={open}
          aria-controls="site-primary-nav"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "☰"}
        </button>
        <nav
          id="site-primary-nav"
          className={`site-nav${open ? " site-nav-open" : ""}`}
          aria-label="Primary"
        >
          {nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          className="btn btn-primary site-header-cta"
          href={phoneTel}
          onClick={() => setOpen(false)}
        >
          {site.hero.primaryCta.label}
        </a>
      </div>
    </header>
  );
}

export { Header };
