import Link from "next/link";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function AboutCTA() {
  return (
    <section className="bg-slate-900 py-24 text-white">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-blue-300">
            Let&apos;s Build Together
          </span>

          <h2 className="mt-6 text-4xl font-extrabold leading-tight lg:text-5xl">
            Ready to Transform Your Business
            <br />
            with AI and Automation?
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-300">
            Whether You&apos;re starting a new digital initiative or modernizing
            existing systems, Vrinda AI Labs is ready to help you build
            scalable, intelligent and future-ready solutions.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-5">
            <Link href="/contact">
              <Button variant="primary" size="lg">
                Contact Us
              </Button>
            </Link>

            <Link href="/services">
              <Button variant="outline" size="lg">
                Explore Services
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}