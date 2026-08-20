"use client";

import type { Service } from "@/types/service";

interface ServiceGridProps {
  services: Service[];
}

export default function ServiceGrid({
  services,
}: ServiceGridProps) {
  if (services.length === 0) {
    return (
      <div className="rounded-2xl border bg-gray-50 p-12 text-center">
        <h2 className="text-2xl font-semibold text-slate-900">
          No Services Available
        </h2>

        <p className="mt-3 text-gray-500">
          We are currently updating our services.
          Please check back soon.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <article
          key={service.id}
          className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          {/* Image */}

          {service.imageUrl ? (
            <div className="aspect-video overflow-hidden bg-gray-100">
              <img
                src={service.imageUrl}
                alt={service.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ) : (
            <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100">
              <span className="text-4xl font-bold text-blue-600">
                {service.title.charAt(0).toUpperCase()}
              </span>
            </div>
          )}

          {/* Content */}

          <div className="p-6">

            <h2 className="text-xl font-bold text-slate-900">
              {service.title}
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              {service.shortDescription}
            </p>

            <div className="mt-5">

              <a
                href={`/services/${service.id}`}
                className="inline-flex items-center font-semibold text-blue-600 transition hover:text-blue-800"
              >
                Learn More

                <span className="ml-2 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>

            </div>

          </div>

        </article>
      ))}
    </div>
  );
}