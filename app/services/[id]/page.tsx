import type { Metadata } from "next";

import { serviceService } from "@/services/service.service";

interface ServiceDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const response =
      await serviceService.getById(Number(id));

    const service = response.data;

    return {
      title: `${service.title} | Vrinda AI Labs`,
      description: service.shortDescription,
    };
  } catch {
    return {
      title: "Service | Vrinda AI Labs",
    };
  }
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { id } = await params;

  let service;

  try {
    const response =
      await serviceService.getById(Number(id));

    service = response.data;
  } catch {
    return (
      <main className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-2xl border bg-white p-12 text-center shadow-sm">
          <h1 className="text-3xl font-bold text-slate-900">
            Service Not Found
          </h1>

          <p className="mt-4 text-gray-600">
            The service you are looking for does not exist.
          </p>

          <a
            href="/services"
            className="mt-8 inline-flex rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Back to Services
          </a>
        </div>
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

              {service.icon && (
                <div className="mb-6 inline-flex rounded-xl bg-blue-50 px-5 py-3 text-3xl">
                  {service.icon}
                </div>
              )}

              <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                {service.title}
              </h1>

              <p className="mt-6 text-xl leading-8 text-gray-600">
                {service.shortDescription}
              </p>

            </div>

            {service.imageUrl && (
              <div className="overflow-hidden rounded-2xl shadow-lg">
                <img
                  src={service.imageUrl}
                  alt={service.title}
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
          About This Service
        </h2>

        <div className="mt-8 whitespace-pre-line text-lg leading-8 text-gray-600">
          {service.description}
        </div>

        <div className="mt-12">

          <a
            href="/contact"
            className="inline-flex rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Talk to Us
          </a>

        </div>

      </section>

    </main>
  );
}