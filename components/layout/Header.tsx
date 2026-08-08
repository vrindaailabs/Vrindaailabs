// import Link from "next/link";

// import { COMPANY } from "@/constants/company";
// import { navigation } from "@/constants/navigation";

// export default function Header() {
//   return (
//     <header className="border-b bg-white">
//       <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">

//         <div>
//           <Link href="/">
//             <h1 className="cursor-pointer text-2xl font-bold">
//               {COMPANY.name}
//             </h1>
//           </Link>

//           <p className="text-sm text-gray-500">
//             {COMPANY.tagline}
//           </p>
//         </div>

//         <nav className="flex gap-8 text-sm font-medium">

//           {navigation.map((item) => (

//             <Link
//               key={item.href}
//               href={item.href}
//             >
//               {item.label}
//             </Link>

//           ))}

//         </nav>

//       </div>
//     </header>
//   );
// }

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";

import { navigation } from "@/constants/navigation";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md shadow-sm">
      <Container>
        <div className="flex h-20 items-center justify-between">
          <Logo />

          {/* Desktop Navigation */}
          <nav
            className="hidden items-center gap-8 lg:flex"
            aria-label="Primary Navigation"
          >
            {navigation.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

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

          {/* Desktop Button */}
          <div className="hidden lg:block">
            <Link href="/contact">
              <Button size="sm">Contact Us</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-md p-2 text-slate-700 hover:bg-slate-100 lg:hidden"
            aria-label="Toggle navigation menu"
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
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
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
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button className="w-full">Contact Us</Button>
              </Link>
            </div>
          </nav>
        )}
      </Container>
    </header>
  );
}