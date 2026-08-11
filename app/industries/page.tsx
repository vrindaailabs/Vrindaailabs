import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries",
};

export default function IndustriesPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-20">

      <h1 className="text-5xl font-bold">

        Industries

      </h1>

      <p className="mt-6 text-lg text-gray-600">

        We deliver AI-powered solutions across multiple industries including Healthcare, Finance, Retail, Manufacturing, Logistics, Education, and more.

      </p>

    </main>
  );
}