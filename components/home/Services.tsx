import { services } from "@/constants/services";

export default function Services() {
  return (
    <section className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-8">
        <h2 className="text-center text-4xl font-bold">
          Our Services
        </h2>

        <p className="mt-4 text-center text-gray-600">
          Helping businesses transform with software and AI.
        </p>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-lg"
            >
              <h3 className="mb-4 text-xl font-bold">
                {service.title}
              </h3>

              <p className="text-gray-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}