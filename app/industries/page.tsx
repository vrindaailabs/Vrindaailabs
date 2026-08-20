import type { Metadata } from "next";

import IndustryGrid from "@/components/industries/IndustryGrid";
import { industryService } from "@/services/industry.service";

import type { Industry } from "@/types/industry";

export const metadata: Metadata = {
  title: "Industries | Vrinda AI Labs",
  description:
    "AI-powered solutions designed for businesses across multiple industries.",
};

export default async function IndustriesPage() {
  let industries: Industry[] = [];

  try {
    const response =
      await industryService.getAll();

    industries = response.data.filter(
      (industry: Industry) =>
        industry.active
    );
  } catch (error) {
    console.error(
      "Failed to load industries:",
      error
    );
  }

  return (
    <main className="bg-white">

      {/* Hero Section */}

      <section className="bg-slate-50">

        <div className="mx-auto max-w-7xl px-6 py-20">

          <h1 className="text-5xl font-bold tracking-tight text-slate-900">
            Industries
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
            We deliver AI-powered solutions across
            multiple industries, helping organizations
            automate operations, improve productivity,
            and accelerate digital transformation.
          </p>

        </div>

      </section>

      {/* Industries Section */}

      <section className="mx-auto max-w-7xl px-6 py-20">

        <div className="mb-10">

          <h2 className="text-3xl font-bold text-slate-900">
            Industries We Serve
          </h2>

          <p className="mt-3 max-w-2xl text-gray-600">
            Explore how Vrinda AI Labs helps businesses
            use AI, automation, and intelligent software
            solutions across different industries.
          </p>

        </div>

        <IndustryGrid
          industries={industries}
        />

      </section>

      {/* CTA Section */}

      <section className="bg-slate-900">

        <div className="mx-auto max-w-7xl px-6 py-16 text-center">

          <h2 className="text-3xl font-bold text-white">
            Ready to transform your industry?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-300">
            Talk to us about your business challenges
            and discover how AI, automation, and
            software can help your organization grow.
          </p>

          <a
            href="/contact"
            className="mt-8 inline-flex rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Talk to Us
          </a>

        </div>

      </section>

    </main>
  );
}