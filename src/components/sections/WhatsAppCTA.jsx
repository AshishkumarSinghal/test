import React from "react";
import site from "@/content/site-content.json";

export default function WhatsAppCTA() {
  const { footer } = site;
  const whatsappUrl =
    footer.whatsappUrl || "https://wa.me/";
  return (
    <section id="whatsapp" className="section whatsapp-cta">
      <h2>Questions?</h2>
      <p className="section-lead">
        Message us on WhatsApp or call{" "}
        <a href={footer.phoneTel || `tel:${footer.phone}`}>{footer.phone}</a>.
      </p>
      <a
        className="btn btn-primary"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Chat on WhatsApp
      </a>
    </section>
  );
}

export { WhatsAppCTA };
