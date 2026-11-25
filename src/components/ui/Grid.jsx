import React from "react";

export default function Grid({ children, className = "" }) {
  return <div className={`card-grid ${className}`.trim()}>{children}</div>;
}

export { Grid };
