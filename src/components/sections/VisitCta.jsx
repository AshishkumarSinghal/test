import React from "react";
import site from "@/content/site-content.json";

export default function VisitCta() {
  const { visit } = site;
  return (
    <section id="visit" className="section visit-cta">
      <h2>{visit.title}</h2>
      <p className="section-lead">{visit.body}</p>
      <div className="cta-row">
        <a className="btn btn-primary" href={visit.primaryCta.href}>
          {visit.primaryCta.label}
        </a>
        {visit.secondaryCta ? (
          <a className="btn btn-secondary" href={visit.secondaryCta.href}>
            {visit.secondaryCta.label}
          </a>
        ) : null}
      </div>
    </section>
  );
}

export { VisitCta };
