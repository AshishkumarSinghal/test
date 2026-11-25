import React from "react";
import { GALLERY_IMAGES } from "@/constants/visualAssets.js";
import site from "@/content/site-content.json";

export default function GalleryGrid() {
  const { gallery } = site;
  return (
    <section id="gallery" className="section">
      <h2>{gallery.title}</h2>
      <div className="gallery-grid">
        {gallery.items.map((item, index) => {
          const img =
            GALLERY_IMAGES[item.imageIndex % GALLERY_IMAGES.length] ??
            GALLERY_IMAGES[0];
          return (
            <figure className="gallery-tile" key={`${item.title}-${index}`}>
              <img src={img.src} alt={img.alt || item.title} loading="lazy" />
              <figcaption>
                <strong>{item.title}</strong>
                <span>{item.caption}</span>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}

export { GalleryGrid };
