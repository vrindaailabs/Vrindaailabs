import Link from "next/link";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function CareersHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 py-28 text-white">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-block rounded-full bg-blue-500/20 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-blue-300">
            Careers
          </span>

          <h1 className="mt-6 text-5xl font-extrabold leading-tight lg:text-6xl">
            Build the Future
            <br />
            With Vrinda AI Labs
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-300">
            Join a passionate team that is building intelligent software,
            enterprise platforms, AI-powered automation and digital solutions
            that create real business impact.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-5">
            <Link href="#open-positions">
              <Button variant="primary" size="lg">
                View Open Positions
              </Button>
            </Link>

            <Link href="/contact">
              <Button variant="outline" size="lg">
                Contact HR
              </Button>
            </Link>
          </div>
        </div>
      </Container>

      <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute -right-20 bottom-20 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
    </section>
  );
}