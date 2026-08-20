// import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Services",
// };

// export default function ServicesPage() {
//   return (
//     <main className="mx-auto max-w-7xl px-6 py-20">
//       <h1 className="text-5xl font-bold">
//         Our Services
//       </h1>

//       <p className="mt-6 text-lg text-gray-600">
//         Explore our AI, Automation and Software Development services.
//       </p>
//     </main>
//   );
// }



"use client";

import { useEffect, useState } from "react";
// import type { Metadata } from "next";

import { serviceService } from "@/services/service.service";

import type {
  Service,
} from "@/types/service";

import ServiceGrid from "@/components/services/ServiceGrid";

/*
 * NOTE:
 * Metadata cannot be exported from a Client Component.
 *
 * If you need metadata, move it to a server wrapper later.
 */

export default function ServicesPage() {

  const [services, setServices] =
    useState<Service[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {

    let cancelled = false;

    async function loadServices() {

      try {

        setLoading(true);
        setError("");

        const response =
          await serviceService.getAll();

        if (cancelled) {
          return;
        }

        /*
         * Public website should only
         * display active services.
         */
        const activeServices =
          response.data.filter(
            (service) =>
              service.active === true
          );

        setServices(activeServices);

      } catch (err) {

        console.error(
          "Failed to load services:",
          err
        );

        if (!cancelled) {

          setError(
            "Unable to load services. Please try again later."
          );

        }

      } finally {

        if (!cancelled) {
          setLoading(false);
        }

      }
    }

    void loadServices();

    return () => {
      cancelled = true;
    };

  }, []);

  /*
   * Loading
   */
  if (loading) {

    return (
      <main className="mx-auto max-w-7xl px-6 py-20">

        <div className="flex min-h-[300px] items-center justify-center">

          <div className="text-center">

            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

            <p className="mt-4 text-gray-500">
              Loading services...
            </p>

          </div>

        </div>

      </main>
    );
  }

  /*
   * Error
   */
  if (error) {

    return (
      <main className="mx-auto max-w-7xl px-6 py-20">

        <div className="rounded-2xl border border-red-200 bg-red-50 p-10 text-center">

          <h1 className="text-2xl font-bold text-red-700">
            Unable to Load Services
          </h1>

          <p className="mt-3 text-red-600">
            {error}
          </p>

        </div>

      </main>
    );
  }

  /*
   * Main page
   */
  return (
    <main className="bg-white">

      {/* Hero */}

      <section className="border-b bg-gradient-to-b from-blue-50 via-white to-white">

        <div className="mx-auto max-w-7xl px-6 py-20 text-center">

          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            What We Do
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Our Services
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
            Explore our AI, automation and software
            development services designed to help
            businesses work smarter and grow faster.
          </p>

        </div>

      </section>

      {/* Services */}

      <section className="mx-auto max-w-7xl px-6 py-20">

        <ServiceGrid
          services={services}
        />

      </section>

      {/* CTA */}

      <section className="border-t bg-slate-50">

        <div className="mx-auto max-w-7xl px-6 py-16 text-center">

          <h2 className="text-3xl font-bold text-slate-900">
            Ready to transform your business?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Talk to us about your business challenges
            and discover how AI, automation and software
            can help.
          </p>

          <a
            href="/contact"
            className="mt-8 inline-flex rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Contact Us
          </a>

        </div>

      </section>

    </main>
  );
}