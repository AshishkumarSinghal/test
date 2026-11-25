import React from "react";
import { HERO_IMAGE } from "@/constants/visualAssets.js";
import site from "@/content/site-content.json";

export default function Hero() {
  const { hero, footer } = site;
  return (
    <section
      id="hero"
      className="hero"
      style={{ backgroundImage: `url(${HERO_IMAGE})` }}
    >
      <h1>{hero.headline}</h1>
      <p>{hero.subheadline}</p>
      <div className="cta-row">
        <a className="btn btn-primary" href={footer.phoneTel || hero.primaryCta.href}>
          {hero.primaryCta.label}
        </a>
        {hero.secondaryCta ? (
          <a className="btn btn-secondary" href={hero.secondaryCta.href}>
            {hero.secondaryCta.label}
          </a>
        ) : null}
      </div>
    </section>
  );
}

export { Hero };
