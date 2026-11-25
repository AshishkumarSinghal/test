import React from "react";

export default function Button({ href, children, variant = "primary", className = "" }) {
  const cls = `btn btn-${variant} ${className}`.trim();
  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return <button type="button" className={cls}>{children}</button>;
}

export { Button };
