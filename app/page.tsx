import type { Metadata } from "next";

import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Products from "@/components/home/Products";
import CTA from "@/components/home/CTA";

export const metadata: Metadata = {
  title: "Vrinda AI Labs",
  description:
    "Vrinda AI Labs delivers AI-powered software, automation, enterprise solutions, and digital transformation services to help businesses innovate and grow.",
};

export default function HomePage() {
  return (
    <>
      <Hero />

      <Services />

      <WhyChooseUs />

      <Products />

      <CTA />
    </>
  );
}