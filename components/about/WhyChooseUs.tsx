import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";

const reasons = [
  {
    icon: "⚡",
    title: "Business First",
    description:
      "We focus on solving real business challenges, not just building software.",
  },
  {
    icon: "🤖",
    title: "AI-Driven Innovation",
    description:
      "Every solution is designed to leverage AI and automation where it creates measurable value.",
  },
  {
    icon: "🛡️",
    title: "Reliable Engineering",
    description:
      "We build secure, scalable and maintainable applications using modern engineering practices.",
  },
  {
    icon: "📈",
    title: "Growth Partnership",
    description:
      "We work as a long-term technology partner, helping businesses evolve and grow over time.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-slate-50 py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-blue-700">
            Why Choose Us
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900">
            More Than a Software Company
          </h2>

          <p className="mt-6 leading-8 text-gray-600">
            We combine technology expertise with a deep understanding of
            business processes to deliver solutions that create lasting impact.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {reasons.map((reason) => (
            <Card
              key={reason.title}
              className="group transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-5 text-5xl">{reason.icon}</div>

              <h3 className="mb-4 text-2xl font-bold text-slate-900">
                {reason.title}
              </h3>

              <p className="leading-7 text-gray-600">
                {reason.description}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}