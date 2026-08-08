import Container from "@/components/ui/Container";

export default function OurStory() {
  return (
    <section className="bg-white py-24">
      <Container>
        <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
          {/* Left */}
          <div>
            <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-blue-700">
              Our Story
            </span>

            <h2 className="mt-6 text-4xl font-bold leading-tight text-slate-900">
              Technology Should Empower
              <br />
              People, Not Replace Them.
            </h2>

            <p className="mt-8 leading-8 text-gray-600">
              Every business spends valuable time on repetitive tasks,
              disconnected systems and inefficient workflows.
              These challenges slow innovation, reduce productivity,
              and limit growth.
            </p>

            <p className="mt-6 leading-8 text-gray-600">
              Vrinda AI Labs was founded with a simple mission:
              build intelligent software that automates routine work,
              connects business processes, and helps organizations
              make faster, smarter decisions.
            </p>

            <p className="mt-6 leading-8 text-gray-600">
              We combine Artificial Intelligence, Automation,
              Cloud Technologies and Enterprise Software
              to create solutions that deliver measurable business value.
            </p>
          </div>

          {/* Right */}
          <div className="rounded-3xl bg-gradient-to-br from-slate-50 to-blue-50 p-10 shadow-lg">
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-blue-600">
                  Our Purpose
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  Simplify complex business operations through intelligent
                  software and automation.
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-blue-600">
                  Our Vision
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  Become a globally trusted technology company delivering
                  AI-powered solutions that improve the way businesses work.
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-blue-600">
                  Our Commitment
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  Build reliable, scalable and secure software that creates
                  measurable impact for every client.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}