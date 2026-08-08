import Link from "next/link";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 py-28 text-white">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-block rounded-full bg-blue-500/20 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-blue-300">
            Contact Us
          </span>

          <h1 className="mt-6 text-5xl font-extrabold leading-tight lg:text-6xl">
            Let&apos;s Build Something
            <br />
            Extraordinary Together
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-300">
            Whether You&apos;re exploring AI, automation, enterprise software, or
            digital transformation, our team is ready to understand your goals
            and help turn your ideas into reliable, scalable solutions.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-5">
            <Link href="/services">
              <Button variant="primary" size="lg">
                Explore Services
              </Button>
            </Link>

            <Link href="/about">
              <Button variant="outline" size="lg">
                Learn About Us
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