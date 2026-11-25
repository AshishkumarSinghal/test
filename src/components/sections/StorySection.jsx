import React from "react";
import site from "@/content/site-content.json";

export default function StorySection() {
  const { story } = site;
  return (
    <section id="about" className="section">
      <h2>{story.title}</h2>
      <p className="section-lead">{story.body}</p>
      <div className="stats-row">
        {story.stats.map((stat) => (
          <div className="stat" key={stat.label}>
            <span className="stat-value">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export { StorySection };
