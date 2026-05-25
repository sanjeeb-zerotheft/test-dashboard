"use client";

import { Bell, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header({
  sidebarExpanded,
  onToggle,
}: {
  sidebarExpanded: boolean;
  onToggle?: () => void;
}) {
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
    <header
      className={`fixed top-0 right-0 z-30 bg-[#1e2330] border-b border-gray-700/50 h-16 flex items-center justify-between px-6 transition-all duration-300 ${
        sidebarExpanded ? "left-64" : "left-16"
      }`}
    >
      <nav className="flex items-center gap-3 text-sm">
        <button
          onClick={onToggle}
          className="w-8 h-8 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors flex items-center justify-center shrink-0"
          title={sidebarExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {sidebarExpanded ? (
            <PanelLeftClose className="w-4 h-4" />
          ) : (
            <PanelLeftOpen className="w-4 h-4" />
          )}
        </button>
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
