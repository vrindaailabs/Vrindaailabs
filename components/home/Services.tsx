import Link from "next/link";

import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

import type { Service } from "@/types/service";

interface ServicesProps {
  services: Service[];
}

export default function Services({
  services,
}: ServicesProps) {
  return (
    <section className="bg-slate-50 py-24">
      <Container>

        <SectionTitle
          title="Our Services"
          subtitle="Helping businesses transform with AI, automation and modern software solutions."
          align="center"
        />

        {services.length === 0 ? (

          <div className="mt-16 rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">

            <h3 className="text-xl font-semibold text-slate-900">
              Services Coming Soon
            </h3>

            <p className="mt-3 text-gray-600">
              We are currently updating our services.
            </p>

          </div>

        ) : (

          <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

            {services.map((service) => (

              <Card
                key={service.id}
                className="group flex h-full flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >

                {/* Icon */}

                <div className="mb-6 text-5xl">
                  {service.icon || "⚙️"}
                </div>

                {/* Service Title */}

                <h3 className="mb-4 text-2xl font-bold text-slate-900">
                  {service.title}
                </h3>

                {/* Short Description */}

                <p className="flex-grow leading-7 text-gray-600">
                  {service.shortDescription}
                </p>

                {/* Details Link */}

                <Link
                  href={`/services/${service.id}`}
                  className="mt-8 inline-flex font-semibold text-blue-600 transition hover:text-blue-700"
                >
                  Learn More →
                </Link>

              </Card>

            ))}

          </div>

        )}

      </Container>
    </section>
  );
}