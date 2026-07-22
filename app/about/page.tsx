import type { Metadata } from "next";

import CTA from "@/components/home/CTA";

import AboutHero from "@/components/about/AboutHero";
import OurStory from "@/components/about/OurStory";
import MissionVision from "@/components/about/MissionVision";
import CoreValues from "@/components/about/CoreValues";
import WhyChooseUs from "@/components/about/WhyChooseUs";
import OurProcess from "@/components/about/OurProcess";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Vrinda AI Labs, our mission, vision, values, and how we help businesses grow through AI, automation, enterprise software, and digital transformation.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />

      <OurStory />

      <MissionVision />

      <CoreValues />

      <WhyChooseUs />

      <OurProcess />

      <CTA />
    </>
  );
}