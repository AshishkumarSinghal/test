import React from "react";

export default function Heading({ level = 2, children, className = "" }) {
  const Tag = level === 1 ? "h1" : "h2";
  return <Tag className={`ui-heading ${className}`.trim()}>{children}</Tag>;
}

export { Heading };
