import Link from "next/link";

import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

import { industryService } from "@/services/industry.service";

import type { Industry } from "@/types/industry";

export default async function Industries() {
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
    <section className="bg-slate-50 py-24">
      <Container>

        <SectionTitle
          title="Industries We Serve"
          subtitle="Technology solutions designed for the unique needs of different industries."
          align="center"
        />

        {industries.length > 0 ? (

          <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

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

                <h3 className="mb-4 text-2xl font-bold text-slate-900">
                  {industry.name}
                </h3>

                <p className="flex-grow leading-7 text-gray-600">
                  {industry.shortDescription}
                </p>

                <Link
                  href={`/industries/${industry.id}`}
                  className="mt-8 inline-flex font-semibold text-blue-600 transition hover:text-blue-700"
                >
                  Explore Industry →
                </Link>

              </Card>

            ))}

          </div>

        ) : (

          <div className="mt-16 rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">

            <h3 className="text-xl font-semibold text-slate-900">
              Industries Coming Soon
            </h3>

            <p className="mt-3 text-gray-600">
              We are preparing solutions for multiple industries.
            </p>

          </div>

        )}

      </Container>
    </section>
  );
}