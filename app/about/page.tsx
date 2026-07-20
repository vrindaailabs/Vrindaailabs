import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import CTA from "@/components/home/CTA";

import AboutHero from "@/components/about/AboutHero";
import OurStory from "@/components/about/OurStory";
import MissionVision from "@/components/about/MissionVision";
import CoreValues from "@/components/about/CoreValues";
import WhyChooseUs from "@/components/about/WhyChooseUs";
import OurProcess from "@/components/about/OurProcess";

export default function AboutPage() {
  return (
    <>
      <Header />

      <AboutHero />

      <OurStory />

      <MissionVision />

      <CoreValues />

      <WhyChooseUs />

      <OurProcess />

      <CTA />

      <Footer />
    </>
  );
}