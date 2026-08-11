import Image from "next/image";
import Link from "next/link";

import { COMPANY } from "@/constants/company";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export default function Logo({
  size = "md",
  showText = true,
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

  const currentSize = logoSize[size];

  return (

    <Link
      href="/"
      className="flex items-center gap-3"
    >

      <Image
        src="/images/logo.png"
        alt="Vrinda AI Labs"
        width={currentSize.width}
        height={currentSize.height}
        priority
        style={{
          width: "auto",
          height: `${currentSize.height}px`,
        }}
      />

      {showText && (

        <div>

          <h1 className="text-xl font-bold text-slate-900">

            {COMPANY.name}

          </h1>

          <p className="text-xs text-slate-500">

            {COMPANY.tagline}

          </p>

        </div>

      )}

    </Link>

  );

}