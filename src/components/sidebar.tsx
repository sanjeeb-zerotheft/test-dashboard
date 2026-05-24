"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Video,
  ScanLine,
  AlertTriangle,
  ClipboardList,
  Film,
  Terminal,
  Menu,
  Shield,
  BarChart3,
  Camera,
  FileText,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Live Monitoring", href: "/live-monitoring", icon: Video },
  { name: "Live Detection", href: "/live-detection", icon: ScanLine },
  { name: "Escalation", href: "/escalation", icon: AlertTriangle },
  { name: "Tasks & Field Ops", href: "/tasks", icon: ClipboardList },
  { name: "Video Evidence", href: "/video-evidence", icon: Film },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Camera Health", href: "/camera-health", icon: Camera },
  { name: "Incidents", href: "/incidents", icon: FileText },
  { name: "Rules & Policies", href: "/rules", icon: ShieldCheck },
  { name: "Operator Console", href: "/operator-console", icon: Terminal },
];

function SidebarContent() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-[#1e2330] text-gray-300 w-64">
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-700/50">
        <div className="w-8 h-8 bg-[#ff6b47] rounded-lg flex items-center justify-center">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <span className="text-lg font-bold text-white tracking-tight">ZeroTheft</span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#ff6b47]/10 text-[#ff6b47]"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? "text-[#ff6b47]" : ""}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-gray-700/50">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-xs font-bold text-white">
            AD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Admin User</p>
            <p className="text-xs text-gray-500 truncate">Security Admin</p>
          </div>
          <div className="w-2 h-2 bg-emerald-500 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen z-40">
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-[#1e2330] border-b border-gray-700/50 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#ff6b47] rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white">ZeroTheft</span>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="inline-flex items-center justify-center w-10 h-10 rounded-md text-white hover:bg-white/10 transition-colors">
            <Menu className="w-6 h-6" />
          </SheetTrigger>
          <SheetContent side="left" className="p-0 bg-[#1e2330] border-r-0 w-64">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
