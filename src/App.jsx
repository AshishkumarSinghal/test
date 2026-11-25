import React from "react";
import Header from "@/components/shared/Header.jsx";
import Hero from "@/components/sections/Hero.jsx";
import MenuPreview from "@/components/sections/MenuPreview.jsx";
import StorySection from "@/components/sections/StorySection.jsx";
import GalleryGrid from "@/components/sections/GalleryGrid.jsx";
import VisitCta from "@/components/sections/VisitCta.jsx";
import WhatsAppCTA from "@/components/sections/WhatsAppCTA.jsx";
import Footer from "@/components/shared/Footer.jsx";

export default function App() {
  return (
    <div className="app-shell">
      <Header />
      <Hero />
      <MenuPreview />
      <StorySection />
      <GalleryGrid />
      <VisitCta />
      <WhatsAppCTA />
      <Footer />
    </div>
  );
}

export { App };
