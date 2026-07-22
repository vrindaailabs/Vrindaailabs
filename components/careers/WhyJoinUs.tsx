import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";

const reasons = [
  {
    icon: "🚀",
    title: "Innovative Projects",
    description:
      "Work on AI, automation, enterprise platforms and next-generation software that solve real business challenges.",
  },
  {
    icon: "📚",
    title: "Continuous Learning",
    description:
      "We encourage continuous learning through mentorship, certifications, technical workshops and real-world experience.",
  },
  {
    icon: "🤝",
    title: "Collaborative Culture",
    description:
      "Be part of a supportive team where ideas are valued, knowledge is shared and success is celebrated together.",
  },
  {
    icon: "📈",
    title: "Career Growth",
    description:
      "Take ownership of your work, build leadership skills and grow alongside the company's journey.",
  },
];

export default function WhyJoinUs() {
  return (
    <section className="bg-white py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-blue-700">
            Why Join Us
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900">
            Build Your Career with Purpose
          </h2>

          <p className="mt-6 leading-8 text-gray-600">
            At Vrinda AI Labs, we believe that great products are built by
            passionate people. We foster an environment where innovation,
            collaboration and continuous growth are part of everyday work.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {reasons.map((reason) => (
            <Card
              key={reason.title}
              className="transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-6 text-5xl">{reason.icon}</div>

              <h3 className="text-2xl font-bold text-slate-900">
                {reason.title}
              </h3>

              <p className="mt-5 leading-7 text-gray-600">
                {reason.description}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}