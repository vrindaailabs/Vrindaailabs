import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
};

export default function ServicesPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      <h1 className="text-5xl font-bold">
        Our Services
      </h1>

      <p className="mt-6 text-lg text-gray-600">
        Explore our AI, Automation and Software Development services.
      </p>
    </main>
  );
}