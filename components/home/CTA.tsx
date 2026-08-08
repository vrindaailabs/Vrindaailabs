import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { CONTENT } from "@/constants/content";

export default function CTA() {
  return (
    <section className="bg-blue-600 py-24 text-white">
      <Container>
        <div className="text-center">
          <h2 className="text-5xl font-bold">
            {CONTENT.cta.title}
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-xl">
            {CONTENT.cta.subtitle}
          </p>

          <div className="mt-12 flex justify-center gap-6">
            <Button
              variant="secondary"
              size="lg"
            >
              {CONTENT.cta.primaryButton}
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              {CONTENT.cta.secondaryButton}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}