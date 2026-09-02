import type { Metadata } from "next";
import Link from "next/link";

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
      await industryService.getById(
        Number(id)
      );

    const industry =
      response.data;

    return {
      title:
        `${industry.name} | Vrinda AI Labs`,

      description:
        industry.shortDescription,
    };

  } catch {

    return {
      title:
        "Industry | Vrinda AI Labs",

      description:
        "Explore industries served by Vrinda AI Labs.",
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
      await industryService.getById(
        Number(id)
      );

    industry =
      response.data;

  } catch {

    return (

      <main className="bg-white">

        <section className="mx-auto max-w-7xl px-6 py-24">

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-12 text-center">

            <h1 className="text-3xl font-bold text-slate-900">
              Industry Not Found
            </h1>

            <p className="mt-4 text-gray-600">
              The industry you are looking for
              does not exist.
            </p>

            <Link
              href="/industries"
              className="mt-8 inline-flex rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Back to Industries
            </Link>

          </div>

        </section>

      </main>
    );
  }

  return (

    <main className="bg-white">

      {/* Hero */}

      <section className="bg-slate-50">

        <div className="mx-auto max-w-7xl px-6 py-20">

          <div className="grid items-center gap-12 lg:grid-cols-2">

            <div>

              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                Industry
              </p>

              <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                {industry.name}
              </h1>

              <p className="mt-6 text-xl leading-8 text-gray-600">
                {industry.shortDescription}
              </p>

            </div>

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

      {/* Description */}

      <section className="mx-auto max-w-4xl px-6 py-20">

        <h2 className="text-3xl font-bold text-slate-900">
          About {industry.name}
        </h2>

        <div className="mt-8 whitespace-pre-line text-lg leading-8 text-gray-600">
          {industry.description}
        </div>

        <div className="mt-12 flex flex-wrap gap-4">

          <Link
            href="/contact"
            className="inline-flex rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Talk to Us
          </Link>

          <Link
            href="/industries"
            className="inline-flex rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            All Industries
          </Link>

        </div>

      </section>

    </main>
  );
}