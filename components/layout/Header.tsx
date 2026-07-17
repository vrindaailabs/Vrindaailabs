import Link from "next/link";

import { COMPANY } from "@/constants/company";
import { navigation } from "@/constants/navigation";

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">

        <div>
          <Link href="/">
            <h1 className="cursor-pointer text-2xl font-bold">
              {COMPANY.name}
            </h1>
          </Link>

          <p className="text-sm text-gray-500">
            {COMPANY.tagline}
          </p>
        </div>

        <nav className="flex gap-8 text-sm font-medium">

          {navigation.map((item) => (

            <Link
              key={item.href}
              href={item.href}
            >
              {item.label}
            </Link>

          ))}

        </nav>

      </div>
    </header>
  );
}