"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Bell, Video, User } from "lucide-react";

const navItems = [
  { name: "Home", href: "/", icon: LayoutDashboard },
  { name: "Alerts", href: "/alerts", icon: Bell },
  { name: "Cameras", href: "/cameras", icon: Video },
  { name: "Settings", href: "/settings", icon: User },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#1e2330] border-t border-gray-700/50 h-16 flex items-center justify-around">
      {navItems.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center justify-center gap-1 py-2 px-4 ${
              active ? "text-[#ff6b47]" : "text-gray-400"
            }`}
          >
            <item.icon className={`w-5 h-5 ${active ? "text-[#ff6b47]" : ""}`} />
            <span className="text-[10px]">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
