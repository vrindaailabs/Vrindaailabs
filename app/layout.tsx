import type { Metadata } from "next";

import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";

import { getSiteSettings } from "@/lib/settings";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  const companyName =
    settings?.companyName?.trim() ||
    "Vrinda AI Labs";

  const title =
    settings?.seoTitle?.trim() ||
    companyName;

  const description =
    settings?.seoDescription?.trim() ||
    "Vrinda AI Labs helps businesses accelerate growth through AI, automation, software development, and digital transformation solutions.";

  const keywords =
    settings?.seoKeywords
      ?.split(",")
      .map((keyword) => keyword.trim())
      .filter(Boolean);

  const finalKeywords =
    keywords && keywords.length > 0
      ? keywords
      : [
          "AI",
          "Artificial Intelligence",
          "Automation",
          "Software Development",
          "Digital Transformation",
          "AI Solutions",
          "Enterprise Software",
          "Cloud Solutions",
          "Vrinda AI Labs",
        ];

  const logoUrl =
    settings?.logoUrl?.trim() ||
    "/images/logo.png";

  const faviconUrl =
    settings?.faviconUrl?.trim() ||
    "/favicon.ico";

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

  return {
    metadataBase: new URL(siteUrl),

    title: {
      default: companyName,
      template: `%s | ${companyName}`,
    },

    description,

    keywords: finalKeywords,

    authors: [
      {
        name: companyName,
      },
    ],

    creator: companyName,

    publisher: companyName,

    robots: {
      index: true,
      follow: true,
    },

    icons: {
      icon: faviconUrl,
      apple: "/apple-touch-icon.png",
    },

    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteUrl,
      siteName: companyName,

      title,

      description,

      images: [
        {
          url: logoUrl,
          width: 1200,
          height: 630,
          alt: companyName,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title,

      description,

      images: [logoUrl],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html lang="en">

      <body className="min-h-screen bg-white text-slate-900 antialiased">

        <Header settings={settings} />

        <main>
          {children}
        </main>

        <Footer settings={settings} />

        <ScrollToTop />

      </body>

    </html>
  );
}