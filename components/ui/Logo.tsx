import Image from "next/image";
import Link from "next/link";

import { COMPANY } from "@/constants/company";

import type { SiteSettings } from "@/types/site-settings";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  settings?: SiteSettings | null;
}

export default function Logo({
  size = "md",
  showText = true,
  settings,
}: LogoProps) {

  const logoSize = {
    sm: {
      width: 120,
      height: 44,
    },

    md: {
      width: 160,
      height: 58,
    },

    lg: {
      width: 220,
      height: 80,
    },
  };

  const currentSize =
    logoSize[size];

  const companyName =
    settings?.companyName?.trim() ||
    COMPANY.name ||
    "Vrinda AI Labs";

  const tagline =
    settings?.tagline?.trim() ||
    COMPANY.tagline ||
    "Intelligence that Works";

  const logoUrl =
    settings?.logoUrl?.trim() ||
    "/images/logo.png";

  return (
    <Link
      href="/"
      className="flex items-center gap-3"
    >

      <Image
        src={logoUrl}
        alt={companyName}
        width={currentSize.width}
        height={currentSize.height}
        priority
        unoptimized={logoUrl.startsWith("http")}
        style={{
          width: "auto",
          height: `${currentSize.height}px`,
        }}
      />

      {showText && (

        <div>

          <h1 className="text-xl font-bold text-slate-900">
            {companyName}
          </h1>

          <p className="text-xs text-slate-500">
            {tagline}
          </p>

        </div>

      )}

    </Link>
  );
}