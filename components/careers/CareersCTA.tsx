import Link from "next/link";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function CareersCTA() {
  return (
    <section className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 py-24 text-white">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-block rounded-full bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-blue-200">
            Join Vrinda AI Labs
          </span>

          <h2 className="mt-6 text-4xl font-extrabold lg:text-5xl">
            Ready to Build the Future With Us?
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            We are always looking for passionate engineers, designers,
            innovators and problem solvers who want to create technology that
            delivers real business value.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="#open-positions">
              <Button variant="primary" size="lg">
                Explore Opportunities
              </Button>
            </Link>

            <Link href="/contact">
              <Button variant="outline" size="lg">
                Contact Our HR Team
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}