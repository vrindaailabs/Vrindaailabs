import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";

const values = [
  {
    icon: "💡",
    title: "Innovation",
    description:
      "We embrace emerging technologies to build smarter, future-ready solutions for our clients.",
  },
  {
    icon: "🤝",
    title: "Integrity",
    description:
      "We build long-term relationships through transparency, honesty and accountability.",
  },
  {
    icon: "⭐",
    title: "Quality",
    description:
      "We focus on delivering reliable, scalable and maintainable software with high engineering standards.",
  },
  {
    icon: "🎯",
    title: "Customer Success",
    description:
      "Our success is measured by the measurable business value we create for every customer.",
  },
];

export default function CoreValues() {
  return (
    <section className="bg-white py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-blue-700">
            Core Values
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900">
            Principles That Guide Everything We Build
          </h2>

          <p className="mt-6 leading-8 text-gray-600">
            Our values shape every decision we make—from product design to
            customer relationships and engineering excellence.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {values.map((value) => (
            <Card
              key={value.title}
              className="group text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-6 text-5xl">{value.icon}</div>

              <h3 className="text-2xl font-bold text-slate-900">
                {value.title}
              </h3>

              <p className="mt-5 leading-7 text-gray-600">
                {value.description}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}