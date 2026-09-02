"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";

import { navigation } from "@/constants/navigation";

import type { SiteSettings } from "@/types/site-settings";

interface HeaderProps {
  settings: SiteSettings | null;
}

export default function Header({
  settings,
}: HeaderProps) {
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const buttonText =
    settings?.heroButtonText?.trim() ||
    "Contact Us";

  const buttonUrl =
    settings?.heroButtonUrl?.trim() ||
    "/contact";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 shadow-sm backdrop-blur-md">

      <Container>

        <div className="flex h-20 items-center justify-between">

          {/* Logo */}

          <Logo
            settings={settings}
          />

          {/* Desktop Navigation */}

          <nav
            className="hidden items-center gap-8 lg:flex"
            aria-label="Primary Navigation"
          >

            {navigation.map((item) => {

              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(
                      item.href
                    );

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative font-medium transition-colors duration-200 ${
                    active
                      ? "text-blue-600"
                      : "text-slate-700 hover:text-blue-600"
                  }`}
                >

                  {item.label}

                  {active && (
                    <span className="absolute -bottom-2 left-0 h-0.5 w-full rounded bg-blue-600" />
                  )}

                </Link>
              );
            })}

          </nav>

          {/* Desktop Contact Button */}

          <div className="hidden lg:block">

            <Link href={buttonUrl}>

              <Button size="sm">
                {buttonText}
              </Button>

            </Link>

          </div>

          {/* Mobile Menu Button */}

          <button
            type="button"
            onClick={() =>
              setMobileMenuOpen(
                (previous) => !previous
              )
            }
            className="rounded-md p-2 text-slate-700 hover:bg-slate-100 lg:hidden"
            aria-label={
              mobileMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={mobileMenuOpen}
          >

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >

              {mobileMenuOpen ? (

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />

              ) : (

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />

              )}

            </svg>

          </button>

        </div>

        {/* Mobile Navigation */}

        {mobileMenuOpen && (

          <nav className="border-t border-slate-200 py-5 lg:hidden">

            <div className="flex flex-col gap-5">

              {navigation.map((item) => {

                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(
                        item.href
                      );

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() =>
                      setMobileMenuOpen(false)
                    }
                    className={`font-medium ${
                      active
                        ? "text-blue-600"
                        : "text-slate-700 hover:text-blue-600"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <Link
                href={buttonUrl}
                onClick={() =>
                  setMobileMenuOpen(false)
                }
              >

                <Button className="w-full">
                  {buttonText}
                </Button>

              </Link>

            </div>

          </nav>

        )}

      </Container>

    </header>
  );
}