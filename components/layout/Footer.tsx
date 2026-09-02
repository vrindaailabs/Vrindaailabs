import Link from "next/link";

import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";

import { navigation } from "@/constants/navigation";
import { services } from "@/constants/services";
import { products } from "@/constants/products";

import NewsletterSignup from "@/components/newsletter/NewsletterSignup";

import type { SiteSettings } from "@/types/site-settings";

interface FooterProps {
  settings: SiteSettings | null;
}

export default function Footer({
  settings,
}: FooterProps) {

  const companyName =
    settings?.companyName?.trim() ||
    "Vrinda AI Labs";

  const description =
    settings?.footerDescription?.trim() ||
    settings?.tagline?.trim() ||
    "Intelligence that Works";

  const email =
    settings?.email?.trim() || "";

  const phone =
    settings?.phone?.trim() || "";

  const address =
    settings?.address?.trim() || "";

  const copyright =
    settings?.copyrightText?.trim() ||
    `© ${new Date().getFullYear()} ${companyName}. All Rights Reserved.`;

  const socialLinks = [
    {
      label: "Facebook",
      href: settings?.facebook,
    },
    {
      label: "LinkedIn",
      href: settings?.linkedin,
    },
    {
      label: "Instagram",
      href: settings?.instagram,
    },
    {
      label: "YouTube",
      href: settings?.youtube,
    },
    {
      label: "Twitter",
      href: settings?.twitter,
    },
  ].filter(
    (
      item
    ): item is {
      label: string;
      href: string;
    } =>
      Boolean(item.href?.trim())
  );

  return (
    <footer className="bg-slate-950 text-gray-300">

      <Container>

        <div className="grid gap-12 border-b border-slate-800 py-16 md:grid-cols-2 lg:grid-cols-5">

          {/* Company */}

          <div className="lg:col-span-2">

            <Logo
              size="sm"
              settings={settings}
            />

            <p className="mt-5 max-w-sm leading-7 text-gray-400">
              {description}
            </p>

            {/* Contact */}

            {(email ||
              phone ||
              address) && (

              <div className="mt-6 space-y-2 text-sm text-gray-400">

                {email && (
                  <p>
                    Email:{" "}

                    <a
                      href={`mailto:${email}`}
                      className="transition hover:text-blue-400"
                    >
                      {email}
                    </a>
                  </p>
                )}

                {phone && (
                  <p>
                    Phone:{" "}

                    <a
                      href={`tel:${phone}`}
                      className="transition hover:text-blue-400"
                    >
                      {phone}
                    </a>
                  </p>
                )}

                {address && (
                  <p>
                    Address: {address}
                  </p>
                )}

              </div>

            )}

            {/* Social Media */}

            {socialLinks.length > 0 && (

              <div className="mt-6 flex flex-wrap gap-4">

                {socialLinks.map(
                  (social) => (

                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-gray-400 transition hover:text-blue-400"
                    >
                      {social.label}
                    </a>

                  )
                )}

              </div>

            )}

            <NewsletterSignup />

          </div>

          {/* Company Links */}

          <div>

            <h3 className="text-lg font-semibold text-white">
              Company
            </h3>

            <ul className="mt-5 space-y-3">

              {navigation.map(
                (item) => (

                  <li key={item.href}>

                    <Link
                      href={item.href}
                      className="transition hover:text-blue-400"
                    >
                      {item.label}
                    </Link>

                  </li>

                )
              )}

            </ul>

          </div>

          {/* Services */}

          <div>

            <h3 className="text-lg font-semibold text-white">
              Services
            </h3>

            <ul className="mt-5 space-y-3">

              {services.map(
                (service) => (

                  <li key={service.title}>
                    {service.title}
                  </li>

                )
              )}

            </ul>

          </div>

          {/* Products / Legal */}

          <div>

            <h3 className="text-lg font-semibold text-white">
              Products
            </h3>

            <ul className="mt-5 space-y-3">

              {products.map(
                (product) => (

                  <li key={product.title}>
                    {product.title}
                  </li>

                )
              )}

            </ul>

            <h3 className="mt-8 text-lg font-semibold text-white">
              Legal
            </h3>

            <ul className="mt-5 space-y-3">

              <li>
                <Link
                  href="/privacy-policy"
                  className="transition hover:text-blue-400"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/terms"
                  className="transition hover:text-blue-400"
                >
                  Terms &amp; Conditions
                </Link>
              </li>

            </ul>

          </div>

        </div>

        {/* Bottom */}

        <div className="flex flex-col items-center justify-between gap-4 py-8 text-sm text-gray-500 md:flex-row">

          <p>
            {copyright}
          </p>

          <p>
            Built with ❤️ in India
          </p>

        </div>

      </Container>

    </footer>
  );
}