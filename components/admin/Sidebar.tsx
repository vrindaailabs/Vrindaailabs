"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menus = [
  {
    title: "Dashboard",
    href: "/admin",
  },
  {
    title: "Careers",
    href: "/admin/careers",
  },
  {
    title: "Contacts",
    href: "/admin/contacts",
  },
  {
    title: "Newsletter",
    href: "/admin/newsletter",
  },
  {
    title: "Blogs",
    href: "/admin/blogs",
  },
  {
    title: "Services",
    href: "/admin/services",
  },
  {
    title: "Products",
    href: "/admin/products",
  },
  {
    title: "Industries",
    href: "/admin/industries",
  },
  {
    title: "Media Library",
    href: "/admin/media",
  },
  {
    title: "Users",
    href: "/admin/users",
  },
  {
    title: "Audit Logs",
    href: "/admin/audit",
  },
  {
    title: "Settings",
    href: "/admin/settings",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="min-h-screen w-64 bg-slate-900 text-white">

      {/* Header */}
      <div className="border-b border-slate-700 p-6">
        <h2 className="text-2xl font-bold">
          Vrinda Admin
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Administration Panel
        </p>
      </div>

      {/* Navigation */}
      <nav
        className="space-y-2 p-4"
        aria-label="Admin navigation"
      >

        {menus.map((menu) => {

          const isActive =
            pathname === menu.href ||
            (
              menu.href !== "/admin" &&
              pathname.startsWith(
                `${menu.href}/`
              )
            );

          return (
            <Link
              key={menu.href}
              href={menu.href}
              aria-current={
                isActive
                  ? "page"
                  : undefined
              }
              className={`block rounded-lg px-4 py-3 font-medium transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-700 hover:text-white"
              }`}
            >
              {menu.title}
            </Link>
          );
        })}

      </nav>

    </aside>
  );
}