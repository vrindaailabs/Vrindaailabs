import type { Metadata } from "next";

import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Products from "@/components/home/Products";
import Industries from "@/components/home/Industries";
import CTA from "@/components/home/CTA";

import { getSiteSettings } from "@/lib/settings";
import { serviceService } from "@/services/service.service";

import type { Service } from "@/types/service";

export const metadata: Metadata = {
  title: "Vrinda AI Labs",
  description:
    "Vrinda AI Labs delivers AI-powered software, automation, enterprise solutions, and digital transformation services to help businesses innovate and grow.",
};

export default async function HomePage() {
  const settings =
    await getSiteSettings();

  let services: Service[] = [];

  try {
    const response =
      await serviceService.getAll();

    services = response.data.filter(
      (service) => service.active
    );
  } catch (error) {
    console.error(
      "Failed to load homepage services:",
      error
    );
  }

  return (
    <>
      <Hero settings={settings} />

      <Services
        services={services}
      />

      <WhyChooseUs />

      <Products />

      <Industries />

      <CTA />
    </>
  );
}