// import type { Metadata } from "next";
// import "./globals.css";

// export const metadata: Metadata = {
//   metadataBase: new URL("http://localhost:3000"),
//   // metadataBase: new URL("https://vrindaailabs.com"),

//   title: "Vrinda AI Labs",
//   description: "Intelligence that Works",

//   icons: {
//     icon: "/favicon.ico",
//     apple: "/apple-touch-icon.png",
//   },

//   openGraph: {
//     title: "Vrinda AI Labs",
//     description: "Intelligence that Works",
//     images: ["/images/og-image.png"],
//   },
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body>{children}</body>
//     </html>
//   );
// }
import type { Metadata } from "next";
import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  // Change before deployment:
  // metadataBase: new URL("https://www.vrindaailabs.com"),

  title: {
    default: "Vrinda AI Labs",
    template: "%s | Vrinda AI Labs",
  },

  description:
    "Vrinda AI Labs helps businesses accelerate growth through AI, automation, software development, and digital transformation solutions.",

  keywords: [
    "AI",
    "Artificial Intelligence",
    "Automation",
    "Software Development",
    "Digital Transformation",
    "AI Solutions",
    "Enterprise Software",
    "Cloud Solutions",
    "Vrinda AI Labs",
  ],

  authors: [
    {
      name: "Vrinda AI Labs",
    },
  ],

  creator: "Vrinda AI Labs",
  publisher: "Vrinda AI Labs",

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Vrinda AI Labs",
    title: "Vrinda AI Labs",
    description:
      "AI-powered software, automation, and digital transformation solutions.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vrinda AI Labs",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Vrinda AI Labs",
    description:
      "AI-powered software, automation, and digital transformation solutions.",
    images: ["/images/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        <Header />

        <main>{children}</main>

        <Footer />

        <ScrollToTop />
      </body>
    </html>
  );
}