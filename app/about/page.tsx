import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import CTA from "@/components/home/CTA";

import AboutHero from "@/components/about/AboutHero";
import MissionVision from "@/components/about/MissionVision";
import CoreValues from "@/components/about/CoreValues";
import Journey from "@/components/about/Journey";
import Leadership from "@/components/about/Leadership";

export default function AboutPage() {
  return (
    <>
      <Header />

      <AboutHero />

      <MissionVision />

      <CoreValues />

      <Journey />

      <Leadership />

      <CTA />

      <Footer />
    </>
  );
}