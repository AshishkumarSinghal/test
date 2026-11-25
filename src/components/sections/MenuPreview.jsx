import React from "react";
import { GALLERY_IMAGES, MENU_IMAGES } from "@/constants/visualAssets.js";
import site from "@/content/site-content.json";

export default function MenuPreview() {
  const { menu } = site;
  return (
    <section id="menu" className="section">
      {menu.eyebrow ? <p className="section-eyebrow">{menu.eyebrow}</p> : null}
      <h2>{menu.title}</h2>
      <div className="card-grid">
        {menu.items.map((item, index) => {
          const pool =
            MENU_IMAGES?.length > 0 ? MENU_IMAGES : GALLERY_IMAGES;
          const img = pool[item.imageIndex % pool.length] ?? pool[0];
          return (
            <article className="card" key={`${item.name}-${index}`}>
              <img src={img.src} alt={img.alt || item.name} loading="lazy" />
              <div className="card-body">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                {item.price ? (
                  <p className="card-price">{item.price}</p>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export { MenuPreview };
