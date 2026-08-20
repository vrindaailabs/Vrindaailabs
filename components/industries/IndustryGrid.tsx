"use client";

import type { Industry } from "@/types/industry";

import IndustryCard from "./IndustryCard";

interface IndustryGridProps {
  industries: Industry[];
}

export default function IndustryGrid({
  industries,
}: IndustryGridProps) {
  if (industries.length === 0) {
    return (
      <div className="rounded-2xl border bg-gray-50 p-12 text-center">
        <h2 className="text-2xl font-semibold text-slate-900">
          No Industries Available
        </h2>

        <p className="mt-3 text-gray-500">
          We are currently updating our industry solutions.
          Please check back soon.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {industries.map((industry) => (
        <IndustryCard
          key={industry.id}
          industry={industry}
        />
      ))}
    </div>
  );
}