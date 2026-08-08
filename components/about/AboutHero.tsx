import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";

export default function AboutHero() {
  return (
    <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50 py-28">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <Badge text="About Vrinda AI Labs" />

          <h1 className="mt-6 text-5xl font-extrabold leading-tight text-slate-900 lg:text-6xl">
            Building Intelligent Software
            <br />
            That Creates Real Business Value
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-gray-600">
            Vrinda AI Labs helps businesses automate repetitive work,
            improve productivity, and accelerate growth through
            Artificial Intelligence, Automation, Cloud Technologies,
            and Enterprise Software Solutions.
          </p>
        </div>
      </Container>
    </section>
  );
}