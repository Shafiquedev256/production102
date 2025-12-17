"use client";

import { useState, useEffect } from "react";
import HeroSection from "./components/layout/herosection";
import HowItWorksSection from "./components/layout/howItWorks";
import Navbar from "./components/layout/navbar";
import MarketplacePreview from "./components/layout/marketplacePreview";
import SellWithUsSection from "./components/layout/whysellwithus";
import AffiliateProgramSection from "./components/layout/AffiliateProgramSection";
import SupportSection from "./components/layout/supportsection";
import Footer from "./components/layout/footer";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20); // triggers navbar shadow after scrolling 20px
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navbar scrolled={scrolled} />
      <HeroSection />
      <HowItWorksSection />
      <MarketplacePreview />
      <SellWithUsSection />
      <AffiliateProgramSection />
      <SupportSection />
      <Footer />
    </>
  );
}
