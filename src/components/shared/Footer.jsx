import React from "react";
import site from "@/content/site-content.json";

export default function Footer() {
  const { footer, brand } = site;
  return (
    <footer id="contact" className="site-footer">
      <div className="site-footer-grid">
        <div>
          <h3>{brand.name}</h3>
          <p>{footer.blurb}</p>
        </div>
        <div>
          <h4>Visit</h4>
          <p>{footer.address}</p>
          <p>{footer.hours}</p>
          <p>
            <a href={footer.phoneTel || `tel:${footer.phone}`}>{footer.phone}</a>
          </p>
        </div>
        <div>
          <h4>Links</h4>
          <ul className="site-footer-links">
            {footer.links.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="site-footer-copy">
        © {new Date().getFullYear()} {brand.name}. All rights reserved.
      </p>
    </footer>
  );
}

export { Footer };
