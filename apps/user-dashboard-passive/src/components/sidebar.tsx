"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Video,
  Bell,
  CreditCard,
  DollarSign,
  BarChart3,
  Building2,
  User,
  Menu,
  ChevronRight,
  ChevronDown,
  FileText,
  Calculator,
  Flame,
} from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@zerotheft/shared-ui";

type NavItem = {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: { name: string; href: string; icon: React.ComponentType<{ className?: string }> }[];
};

const navItems: NavItem[] = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Cameras", href: "/cameras", icon: Video },
  { name: "Alerts", href: "/alerts", icon: Bell },
  { name: "Subscription", href: "/subscription", icon: CreditCard },
  { name: "Billing", href: "/billing", icon: DollarSign },
  {
    name: "Analytics",
    href: "/analytics",
    icon: BarChart3,
    children: [
      { name: "Report & Insights", href: "/analytics/reports", icon: FileText },
      { name: "ROI Estimator", href: "/analytics/roi-estimator", icon: Calculator },
      { name: "Risk Heatmap", href: "/analytics/risk-heatmap", icon: Flame },
    ],
  },
  { name: "Organizations", href: "/organizations", icon: Building2 },
  { name: "Profile", href: "/settings", icon: User },
];

export function useSidebar() {
  const [expanded, setExpanded] = useState(true);
  return { expanded, setExpanded };
}

export type SidebarState = ReturnType<typeof useSidebar>;

export default function Sidebar({
  expanded,
}: {
  expanded: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [analyticsOpen, setAnalyticsOpen] = useState(true);
  const pathname = usePathname();

  const isAnalyticsActive = pathname.startsWith("/analytics");

  const SidebarContent = ({
    onNavigate,
    isExpanded,
  }: {
    onNavigate?: () => void;
    isExpanded: boolean;
  }) => (
    <div
      className={`flex flex-col h-full bg-[#1e2330] text-gray-300 transition-all duration-300 ${
        isExpanded ? "w-64" : "w-16"
      }`}
    >
      {/* Logo */}
      <div
        className={`flex items-center border-b border-gray-700/50 transition-all duration-300 ${
          isExpanded ? "px-4 py-5 gap-3" : "justify-center py-5"
        }`}
      >
        <div className="w-8 h-8 bg-[#ff6b47] rounded-lg flex items-center justify-center shrink-0">
          <Video className="w-4 h-4 text-white" />
        </div>
        {isExpanded && (
          <span className="text-lg font-bold text-white tracking-tight whitespace-nowrap">
            ZeroTheft
          </span>
        )}
      </div>

      <nav className="flex-1 py-4 space-y-1 overflow-y-auto overflow-x-hidden no-scrollbar">
        {navItems.map((item) => {
          const active = pathname === item.href;
          const hasChildren = item.children && item.children.length > 0;

          if (hasChildren) {
            const childActive = item.children!.some((c) => pathname === c.href);
            const menuOpen = isExpanded ? analyticsOpen : false;

            return (
              <div key={item.name}>
                <button
                  onClick={() => {
                    if (isExpanded) {
                      setAnalyticsOpen(!analyticsOpen);
                    } else {
                      onNavigate?.();
                    }
                  }}
                  className={`w-full flex items-center transition-colors relative ${
                    isExpanded
                      ? "px-4 py-2.5 gap-3"
                      : "flex-col items-center justify-center py-3 px-2"
                  } ${
                    active || childActive
                      ? "text-[#ff6b47] bg-[#ff6b47]/10"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                  title={item.name}
                >
                  {(active || childActive) && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#ff6b47] rounded-r-full" />
                  )}
                  <item.icon
                    className={`w-5 h-5 shrink-0 ${active || childActive ? "text-[#ff6b47]" : ""}`}
                  />
                  {isExpanded ? (
                    <>
                      <span className="text-sm font-medium whitespace-nowrap flex-1 text-left">
                        {item.name}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-500 transition-transform ${
                          menuOpen ? "rotate-180" : ""
                        }`}
                      />
                    </>
                  ) : null}
                </button>

                {/* Submenu */}
                {isExpanded && menuOpen && (
                  <div className="space-y-0.5 py-1">
                    {item.children!.map((child) => {
                      const childIsActive = pathname === child.href;
                      return (
                        <Link
                          key={child.name}
                          href={child.href}
                          onClick={onNavigate}
                          className={`flex items-center gap-3 px-4 py-2 pl-11 text-sm transition-colors ${
                            childIsActive
                              ? "text-[#ff6b47] bg-[#ff6b47]/10"
                              : "text-gray-400 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          <child.icon className="w-4 h-4 shrink-0" />
                          <span className="whitespace-nowrap">{child.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center transition-colors relative ${
                isExpanded
                  ? "px-4 py-2.5 gap-3"
                  : "flex-col items-center justify-center py-3 px-2"
              } ${
                active
                  ? "text-[#ff6b47] bg-[#ff6b47]/10"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
              title={item.name}
            >
              {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#ff6b47] rounded-r-full" />
              )}
              <item.icon
                className={`w-5 h-5 shrink-0 ${active ? "text-[#ff6b47]" : ""}`}
              />
              {isExpanded && (
                <span className="text-sm font-medium whitespace-nowrap flex-1">
                  {item.name}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen z-40">
        <SidebarContent isExpanded={expanded} />
      </aside>

      {/* Mobile Header with Menu */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-[#1e2330] h-14 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="inline-flex items-center justify-center w-10 h-10 rounded-md text-white hover:bg-white/10 transition-colors">
              <Menu className="w-6 h-6" />
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-[#1e2330] border-r-0 w-64">
              <SidebarContent onNavigate={() => setOpen(false)} isExpanded />
            </SheetContent>
          </Sheet>
          <div className="w-8 h-8 bg-[#ff6b47] rounded-lg flex items-center justify-center">
            <Video className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold text-white">ZeroTheft</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ff6b47] rounded-full" />
          </button>
          <div className="w-8 h-8 rounded-full bg-[#ff6b47] flex items-center justify-center text-xs font-bold text-white">
            A
          </div>
        </div>
      </div>
    </>
  );
}
