"use client";

import { usePathname } from "next/navigation";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

const routeTitles: Record<string, string> = {
  "/": "Dashboard",
  "/live-monitoring": "Live Monitoring",
  "/live-detection": "Live Detection",
  "/escalation": "Escalation",
  "/tasks": "Tasks & Field Ops",
  "/video-evidence": "Video Evidence",
  "/analytics": "Analytics",
  "/camera-health": "Camera Health",
  "/incidents": "Incidents",
  "/rules": "Rules & Policies",
  "/operator-console": "Operator Console",
};

export default function Header({
  sidebarExpanded,
  onToggle,
}: {
  sidebarExpanded: boolean;
  onToggle?: () => void;
}) {
  const pathname = usePathname();
  const title = routeTitles[pathname] || "Dashboard";

  return (
    <header
      className={`hidden lg:flex fixed top-0 right-0 z-30 bg-[#1e2330] border-b border-gray-700/50 h-16 items-center justify-between px-6 transition-all duration-300 ${
        sidebarExpanded ? "left-64" : "left-16"
      }`}
    >
      <div className="flex items-center gap-3">
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
        <h1 className="text-white font-semibold text-lg">{title}</h1>
      </div>
    </header>
  );
}
