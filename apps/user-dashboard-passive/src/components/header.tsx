"use client";

import { usePathname } from "next/navigation";
import { Bell, Search, PanelLeftClose, PanelLeftOpen } from "lucide-react";

const routeTitles: Record<string, string> = {
  "/": "Dashboard Overview",
  "/cameras": "Cameras",
  "/alerts": "Alerts",
  "/subscription": "Subscription",
  "/billing": "Billing",
  "/analytics": "Analytics",
  "/analytics/reports": "Report & Insights",
  "/analytics/roi-estimator": "ROI Estimator",
  "/analytics/risk-heatmap": "Risk Heatmap",
  "/organizations": "Organizations",
  "/settings": "Profile",
  "/support": "Support",
};

export default function Header({
  sidebarExpanded,
  onToggle,
}: {
  sidebarExpanded?: boolean;
  onToggle?: () => void;
}) {
  const pathname = usePathname();
  const title = routeTitles[pathname] || "Dashboard Overview";

  return (
    <header
      className={`hidden md:flex fixed top-0 right-0 z-30 bg-[#1e2330] h-16 items-center justify-between px-6 transition-all duration-300 ${
        sidebarExpanded ? "left-64" : "left-16"
      }`}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={onToggle}
          className="w-8 h-8 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors flex items-center justify-center"
          title={sidebarExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {sidebarExpanded ? (
            <PanelLeftClose className="w-4 h-4" />
          ) : (
            <PanelLeftOpen className="w-4 h-4" />
          )}
        </button>
        <h1 className="text-white font-semibold text-lg">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-800/50 text-white text-sm rounded-lg pl-9 pr-4 py-2 w-64 border border-gray-700/50 focus:outline-none focus:border-[#ff6b47]"
          />
        </div>
        <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ff6b47] rounded-full" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#ff6b47] flex items-center justify-center text-xs font-bold text-white">
            A
          </div>
          <span className="text-sm text-white hidden xl:block">Admin</span>
        </div>
      </div>
    </header>
  );
}
