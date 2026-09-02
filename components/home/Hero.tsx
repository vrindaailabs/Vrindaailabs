import Link from "next/link";
import Image from "next/image";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

import { CONTENT } from "@/constants/content";

import type { SiteSettings } from "@/types/site-settings";

interface HeroProps {
  settings: SiteSettings | null;
}

export default function Hero({
  settings,
}: HeroProps) {
  /*
   * Database values
   * ↓
   * Admin Settings
   *
   * If database value is empty,
   * existing static CONTENT is used.
   */

  const heroTitle =
    settings?.heroTitle?.trim() ||
    `${CONTENT.hero.titleLine1} ${CONTENT.hero.titleLine2}`;

  const heroSubtitle =
    settings?.heroSubtitle?.trim() ||
    CONTENT.hero.subtitle;

  const primaryButtonText =
    settings?.heroButtonText?.trim() ||
    CONTENT.hero.primaryButton;

  const primaryButtonUrl =
    settings?.heroButtonUrl?.trim() ||
    "/services";

  /*
   * Keep the second CTA static for now.
   * We can make this configurable later.
   */
  const secondaryButtonText =
    CONTENT.hero.secondaryButton;

  const secondaryButtonUrl =
    "/contact";

  /*
   * Split title into two lines.
   *
   * Example:
   *
   * "Work Smarter. Grow Faster."
   *
   * becomes:
   *
   * Work Smarter.
   * Grow Faster.
   */

  const titleParts =
    heroTitle.split(" ");

  const midpoint =
    Math.ceil(titleParts.length / 2);

  const titleLine1 =
    titleParts
      .slice(0, midpoint)
      .join(" ");

  const titleLine2 =
    titleParts
      .slice(midpoint)
      .join(" ");

  return (
    <section className="overflow-hidden bg-white py-24">
      <Container>

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* =========================
              LEFT CONTENT
          ========================== */}

          <div>

            {/* Badge */}

            <p className="mb-6 inline-block rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
              {CONTENT.hero.badge}
            </p>

            {/* Hero Title */}

            <h1 className="text-5xl font-extrabold leading-tight text-slate-900 lg:text-7xl">

              {titleLine1}

              {titleLine2 && (
                <>
                  <br />

                  <span className="text-blue-600">
                    {titleLine2}
                  </span>
                </>
              )}

            </h1>

            {/* Hero Subtitle */}

            <p className="mt-8 max-w-xl text-lg leading-8 text-gray-600">
              {heroSubtitle}
            </p>

            {/* Buttons */}

            <div className="mt-10 flex flex-wrap gap-4">

              {/* Primary */}

              <Link href={primaryButtonUrl}>
                <Button
                  variant="primary"
                  size="lg"
                >
                  {primaryButtonText}
                </Button>
              </Link>

              {/* Secondary */}

              <Link href={secondaryButtonUrl}>
                <Button
                  variant="outline"
                  size="lg"
                >
                  {secondaryButtonText}
                </Button>
              </Link>

            </div>

            {/* Statistics */}

            <div className="mt-12 flex flex-wrap gap-8 text-sm text-gray-600">

              <div>
                <h3 className="text-3xl font-bold text-slate-900">
                  50+
                </h3>

                Projects
              </div>

              <div>
                <h3 className="text-3xl font-bold text-slate-900">
                  100%
                </h3>

                Client Focus
              </div>

              <div>
                <h3 className="text-3xl font-bold text-slate-900">
                  AI
                </h3>

                Driven
              </div>

            </div>

          </div>

          {/* =========================
              RIGHT IMAGE
          ========================== */}

          <div className="relative">

            <div className="rounded-3xl bg-linear-to-br from-blue-50 via-cyan-50 to-white p-10 shadow-xl">

              <Image
                src="/images/hero-ai.png"
                alt="AI Solutions"
                width={700}
                height={600}
                className="mx-auto h-auto w-full"
                priority
              />

            </div>

          </div>

        </div>

      </Container>
    </section>
  );
}