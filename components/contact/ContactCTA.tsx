import Link from "next/link";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function ContactCTA() {
  return (
    <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900 py-24 text-white">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-blue-300">
            Ready to Get Started?
          </span>

          <h2 className="mt-6 text-4xl font-extrabold leading-tight lg:text-5xl">
            Let&apos;s Build Intelligent Software
            <br />
            That Drives Your Business Forward
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-300">
            Whether You&apos;re planning a new AI solution, automating business
            processes, or modernizing existing applications, We&apos;re here to help
            turn your vision into reality.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-5">
            <Link href="/services">
              <Button variant="primary" size="lg">
                Explore Services
              </Button>
            </Link>

            <Link href="/">
              <Button variant="outline" size="lg">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}