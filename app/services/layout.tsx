import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Vrinda AI Labs",
  description:
    "Explore AI, automation and software development services from Vrinda AI Labs.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}