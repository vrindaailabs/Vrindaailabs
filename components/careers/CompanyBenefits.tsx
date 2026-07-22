import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";

const benefits = [
  {
    icon: "💰",
    title: "Competitive Compensation",
    description:
      "We offer competitive salaries, performance-based rewards and recognition for outstanding contributions.",
  },
  {
    icon: "🏡",
    title: "Flexible Work Environment",
    description:
      "Enjoy a healthy work-life balance with flexible work arrangements based on project requirements.",
  },
  {
    icon: "📚",
    title: "Learning & Development",
    description:
      "Access continuous learning opportunities through certifications, workshops and mentorship programs.",
  },
  {
    icon: "🚀",
    title: "Career Advancement",
    description:
      "Grow into technical and leadership roles with clear career development opportunities.",
  },
  {
    icon: "🤝",
    title: "Collaborative Team",
    description:
      "Work alongside talented professionals in an open, inclusive and knowledge-sharing environment.",
  },
  {
    icon: "💡",
    title: "Innovation Culture",
    description:
      "Experiment with new technologies, AI solutions and creative ideas that make a real business impact.",
  },
];

export default function CompanyBenefits() {
  return (
    <section className="bg-slate-50 py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-blue-700">
            Employee Benefits
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900">
            Why You&apos;ll Love Working Here
          </h2>

            <p className="mt-6 leading-8 text-gray-600">
                We believe that great people build great products. That&apos;s why we
                invest in creating an environment where our team can learn, grow and
                succeed together.
           </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {benefits.map((benefit) => (
            <Card
              key={benefit.title}
              className="transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-6 text-5xl">{benefit.icon}</div>

              <h3 className="text-2xl font-bold text-slate-900">
                {benefit.title}
              </h3>

              <p className="mt-5 leading-7 text-gray-600">
                {benefit.description}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}