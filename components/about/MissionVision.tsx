import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";

export default function MissionVision() {
  return (
    <section className="bg-slate-50 py-24">
      <Container>
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-blue-700">
              Mission & Vision
            </span>

            <h2 className="mt-6 text-4xl font-bold text-slate-900">
              Building Technology That Helps Businesses Grow
            </h2>

            <p className="mx-auto mt-6 max-w-3xl leading-8 text-gray-600">
              Every solution we build is guided by a clear mission and a
              long-term vision focused on innovation, business value,
              and customer success.
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            {/* Mission */}
            <Card className="transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="mb-6 text-5xl">🎯</div>

              <h3 className="text-3xl font-bold text-slate-900">
                Our Mission
              </h3>

              <p className="mt-6 leading-8 text-gray-600">
                To empower organizations with intelligent software,
                AI, automation and cloud technologies that simplify
                operations, improve productivity and accelerate
                sustainable business growth.
              </p>
            </Card>

            {/* Vision */}
            <Card className="transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="mb-6 text-5xl">🚀</div>

              <h3 className="text-3xl font-bold text-slate-900">
                Our Vision
              </h3>

              <p className="mt-6 leading-8 text-gray-600">
                To become a globally trusted technology partner,
                delivering innovative AI-powered platforms that
                transform the way businesses operate and compete
                in the digital world.
              </p>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}