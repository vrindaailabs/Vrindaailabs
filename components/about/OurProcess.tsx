import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";

const process = [
  {
    step: "01",
    title: "Discovery",
    description:
      "Understand business goals, challenges and project requirements.",
  },
  {
    step: "02",
    title: "Planning",
    description:
      "Design the solution architecture, roadmap and implementation strategy.",
  },
  {
    step: "03",
    title: "Development",
    description:
      "Build scalable, secure and maintainable software using modern technologies.",
  },
  {
    step: "04",
    title: "Testing",
    description:
      "Validate quality, security and performance before deployment.",
  },
  {
    step: "05",
    title: "Deployment",
    description:
      "Launch the solution with monitoring and production best practices.",
  },
  {
    step: "06",
    title: "Support",
    description:
      "Provide continuous improvements, maintenance and long-term partnership.",
  },
];

export default function OurProcess() {
  return (
    <section className="bg-white py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-blue-700">
            Our Process
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900">
            A Simple Process for Successful Projects
          </h2>

          <p className="mt-6 leading-8 text-gray-600">
            Every engagement follows a structured process that ensures
            transparency, quality and measurable business outcomes.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {process.map((item) => (
            <Card
              key={item.step}
              className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <span className="text-5xl font-extrabold text-blue-600">
                  {item.step}
                </span>

                <h3 className="text-2xl font-bold text-slate-900">
                  {item.title}
                </h3>
              </div>

              <p className="mt-6 leading-7 text-gray-600">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}