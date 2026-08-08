import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function OfficeLocation() {
  return (
    <section className="bg-slate-50 py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-blue-700">
            Office Location
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900">
            Visit Our Office
          </h2>

          <p className="mt-6 leading-8 text-gray-600">
            We are based in Bengaluru, India, and work with businesses across
            the globe. Schedule an appointment before visiting our office.
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          <Card>
            <h3 className="text-2xl font-bold text-slate-900">
              Vrinda AI Labs
            </h3>

            <div className="mt-8 space-y-5 text-gray-700">
              <p>
                <strong>Address</strong>
                <br />
                Bengaluru, Karnataka
                <br />
                India
              </p>

              <p>
                <strong>Email</strong>
                <br />
                contact@vrindaailabs.com
              </p>

              <p>
                <strong>Phone</strong>
                <br />
                +91 98765 43210
              </p>
            </div>

            <div className="mt-10">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg">
                  Open in Google Maps
                </Button>
              </a>
            </div>
          </Card>

          <div className="overflow-hidden rounded-3xl border border-gray-200 shadow-lg">
            <iframe
              title="Vrinda AI Labs Location"
              src="https://www.google.com/maps?q=Bengaluru,+Karnataka&output=embed"
              width="100%"
              height="500"
              loading="lazy"
              className="border-0"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}