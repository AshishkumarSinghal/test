import React from "react";

export default function Section({ id, children, className = "" }) {
  return (
    <section id={id} className={`ui-section section ${className}`.trim()}>
      {children}
    </section>
  );
}

export { Section };
