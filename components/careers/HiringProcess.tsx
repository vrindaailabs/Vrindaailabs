import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";

const hiringSteps = [
  {
    step: "01",
    title: "Application",
    description:
      "Submit your application with your resume and relevant details through our careers portal or HR contact.",
  },
  {
    step: "02",
    title: "Resume Review",
    description:
      "Our recruitment team carefully reviews your profile to match your skills and experience with the role.",
  },
  {
    step: "03",
    title: "Technical Interview",
    description:
      "Meet our technical team to discuss your expertise, problem-solving skills and project experience.",
  },
  {
    step: "04",
    title: "HR Discussion",
    description:
      "Discuss company culture, career goals, compensation and answer any questions about joining Vrinda AI Labs.",
  },
  {
    step: "05",
    title: "Offer & Onboarding",
    description:
      "Successful candidates receive an offer and begin a structured onboarding process with the team.",
  },
];

export default function HiringProcess() {
  return (
    <section className="bg-slate-50 py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-blue-700">
            Hiring Process
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900">
            Our Recruitment Journey
          </h2>

          <p className="mt-6 leading-8 text-gray-600">
            We believe in a transparent, fair and efficient hiring process that
            helps both candidates and our team find the right fit.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-5">
          {hiringSteps.map((step) => (
            <Card
              key={step.step}
              className="relative text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
                {step.step}
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                {step.title}
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                {step.description}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}