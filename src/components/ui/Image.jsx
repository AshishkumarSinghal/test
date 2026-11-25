import React from "react";

/** Use visualAssets constants for src — never hardcode external URLs in sections. */
export default function Image({ src, alt = "", className = "" }) {
  return <img src={src} alt={alt} className={className} loading="lazy" />;
}

export { Image };
