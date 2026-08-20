"use client";

import type { Industry } from "@/types/industry";

interface IndustryCardProps {
  industry: Industry;
}

export default function IndustryCard({
  industry,
}: IndustryCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Image */}

      {industry.imageUrl ? (
        <div className="aspect-[16/9] overflow-hidden bg-gray-100">
          <img
            src={industry.imageUrl}
            alt={industry.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
          <span className="text-5xl font-bold text-blue-600">
            {industry.name
              .charAt(0)
              .toUpperCase()}
          </span>
        </div>
      )}

      {/* Content */}

      <div className="p-6">

        <h2 className="text-2xl font-bold text-slate-900">
          {industry.name}
        </h2>

        <p className="mt-3 text-base leading-7 text-gray-600">
          {industry.shortDescription}
        </p>

        {industry.description && (
          <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-500">
            {industry.description}
          </p>
        )}

        {/* Learn More */}

        <div className="mt-5">
          <a
            href={`/industries/${industry.id}`}
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
  );
}