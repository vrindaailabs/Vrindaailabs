"use client";

import type { Service } from "@/types/service";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({
  service,
}: ServiceCardProps) {

  return (
    <article className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Image */}

      {service.imageUrl ? (

        <div className="aspect-[16/9] overflow-hidden bg-gray-100">

          <img
            src={service.imageUrl}
            alt={service.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

        </div>

      ) : (

        <div className="flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">

          <div className="text-center">

            {service.icon && (
              <div className="text-5xl">
                {service.icon}
              </div>
            )}

          </div>

        </div>
      )}

      {/* Content */}

      <div className="p-6">

        {/* Icon */}

        {service.icon && (
          <div className="mb-4 inline-flex rounded-xl bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            {service.icon}
          </div>
        )}

        {/* Title */}

        <h2 className="text-2xl font-bold text-slate-900">
          {service.title}
        </h2>

        {/* Short Description */}

        <p className="mt-3 text-base leading-7 text-gray-600">
          {service.shortDescription}
        </p>

        {/* Description */}

        {service.description && (
          <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-500">
            {service.description}
          </p>
        )}

      </div>

    </article>
  );
}