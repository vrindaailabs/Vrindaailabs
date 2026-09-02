import type { Metadata } from "next";
import Link from "next/link";

import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";

import { industryService } from "@/services/industry.service";

import type { Industry } from "@/types/industry";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Explore the industries served by Vrinda AI Labs through AI, automation, software development, and digital transformation solutions.",
};

export default async function IndustriesPage() {
  let industries: Industry[] = [];

  try {
    const response =
      await industryService.getAll();

    industries = response.data.filter(
      (industry) => industry.active
    );
  } catch (error) {
    console.error(
      "Failed to load industries:",
      error
    );
  }

  return (
    <main className="bg-white">

      {/* Hero */}

      <section className="bg-slate-50 py-20">

        <Container>

          <div className="mx-auto max-w-3xl text-center">

            <p className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-blue-600">
              Industries
            </p>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Technology for Every Industry
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              We help organizations solve industry-specific
              challenges with AI, automation, modern software,
              and digital transformation.
            </p>

          </div>

        </Container>

      </section>

      {/* Industries */}

      <section className="py-24">

        <Container>

          <SectionTitle
            title="Industries We Serve"
            subtitle="Discover how technology can create measurable business impact in your industry."
            align="center"
          />

          {industries.length > 0 ? (

            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

              {industries.map((industry) => (

                <Card
                  key={industry.id}
                  className="group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                >

                  {industry.imageUrl && (

                    <div className="mb-6 overflow-hidden rounded-xl">

                      <img
                        src={industry.imageUrl}
                        alt={industry.name}
                        className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />

                    </div>

                  )}

                  <div className="flex flex-1 flex-col">

                    <h2 className="text-2xl font-bold text-slate-900">
                      {industry.name}
                    </h2>

                    <p className="mt-4 flex-grow leading-7 text-gray-600">
                      {industry.shortDescription}
                    </p>

                    <Link
                      href={`/industries/${industry.id}`}
                      className="mt-8 inline-flex font-semibold text-blue-600 transition hover:text-blue-700"
                    >
                      Explore Industry →
                    </Link>

                  </div>

                </Card>

              ))}

            </div>

          ) : (

            <div className="mt-16 rounded-2xl border border-slate-200 bg-slate-50 p-12 text-center">

              <h2 className="text-2xl font-semibold text-slate-900">
                Industries Coming Soon
              </h2>

              <p className="mt-4 text-gray-600">
                We are preparing industry-specific solutions.
              </p>

            </div>

          )}

        </Container>

      </section>

    </main>
  );
}