"use client";

import { Bell } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const label = segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
    return { href, label };
  });

  return (
    <header className="fixed top-0 left-0 right-0 lg:left-64 z-30 bg-[#1e2330] border-b border-gray-700/50 h-16 flex items-center justify-between px-6">
      <nav className="flex items-center gap-2 text-sm">
        <Link href="/" className="text-gray-400 hover:text-white transition-colors">
          Home
        </Link>
        {breadcrumbs.map((crumb, i) => (
          <span key={crumb.href} className="flex items-center gap-2 text-gray-400">
            <span className="text-gray-600">/</span>
            {i === breadcrumbs.length - 1 ? (
              <span className="text-white">{crumb.label}</span>
            ) : (
              <Link href={crumb.href} className="hover:text-white transition-colors">
                {crumb.label}
              </Link>
            )}
          </span>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ff6b47] rounded-full" />
        </button>
        <div className="w-8 h-8 rounded-full bg-[#ff6b47] flex items-center justify-center text-xs font-bold text-white">
          SA
        </div>
      </div>
    </header>
  );
}
