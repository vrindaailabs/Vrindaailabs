import CareersHero from "@/components/careers/CareersHero";
import WhyJoinUs from "@/components/careers/WhyJoinUs";
import CompanyBenefits from "@/components/careers/CompanyBenefits";
import OpenPositions from "@/components/careers/OpenPositions";
import HiringProcess from "@/components/careers/HiringProcess";
import CareersFAQ from "@/components/careers/CareersFAQ";
import CareersCTA from "@/components/careers/CareersCTA";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Explore career opportunities at Vrinda AI Labs and join our team building AI-powered software and automation solutions.",
};


export default function CareersPage() {
  return (
    <>
      <CareersHero />
      <WhyJoinUs />
      <CompanyBenefits />
      <OpenPositions />
      <HiringProcess />
      <CareersFAQ />
      <CareersCTA />
    </>
  );
}