import type { Metadata } from "next";

import { industryService } from "@/services/industry.service";

interface IndustryDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: IndustryDetailPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const response =
      await industryService.getById(Number(id));

    const industry = response.data;

    return {
      title: `${industry.name} | Vrinda AI Labs`,
      description: industry.shortDescription,
    };
  } catch {
    return {
      title: "Industry | Vrinda AI Labs",
    };
  }
}

export default async function IndustryDetailPage({
  params,
}: IndustryDetailPageProps) {
  const { id } = await params;

  let industry;

  try {
    const response =
      await industryService.getById(Number(id));

    industry = response.data;
  } catch {
    return (
      <main className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-2xl border bg-white p-12 text-center shadow-sm">

          <h1 className="text-3xl font-bold text-slate-900">
            Industry Not Found
          </h1>

          <p className="mt-4 text-gray-600">
            The industry you are looking for does not exist.
          </p>

          <a
            href="/industries"
            className="mt-8 inline-flex rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Back to Industries
          </a>

        </div>
      </main>
    );
  }

  return (
    <main className="bg-white">

      {/* Hero Section */}

      <section className="bg-slate-50">

        <div className="mx-auto max-w-7xl px-6 py-20">

          <div className="grid items-center gap-12 lg:grid-cols-2">

            {/* Content */}

            <div>

              <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                {industry.name}
              </h1>

              <p className="mt-6 text-xl leading-8 text-gray-600">
                {industry.shortDescription}
              </p>

            </div>

            {/* Image */}

            {industry.imageUrl && (
              <div className="overflow-hidden rounded-2xl shadow-lg">

                <img
                  src={industry.imageUrl}
                  alt={industry.name}
                  className="h-full max-h-[450px] w-full object-cover"
                />

              </div>
            )}

          </div>

        </div>

      </section>

      {/* Industry Description */}

      <section className="mx-auto max-w-4xl px-6 py-20">

        <h2 className="text-3xl font-bold text-slate-900">
          About {industry.name}
        </h2>

        <div className="mt-8 whitespace-pre-line text-lg leading-8 text-gray-600">
          {industry.description}
        </div>

        {/* Contact CTA */}

        <div className="mt-12">

          <a
            href="/contact"
            className="inline-flex rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Talk to Us
          </a>

        </div>

      </section>

    </main>
  );
}