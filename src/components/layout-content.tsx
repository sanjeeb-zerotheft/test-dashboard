"use client";

import { useState } from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import { TooltipProvider } from "@zerotheft/shared-ui";

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  const handleToggle = () => setSidebarExpanded(!sidebarExpanded);

  return (
    <TooltipProvider>
      <Sidebar expanded={sidebarExpanded} />
      <div
        className={`hidden lg:block pt-0 min-h-screen transition-all duration-300 ${
          sidebarExpanded ? "pl-64" : "pl-16"
        }`}
      >
        <Header sidebarExpanded={sidebarExpanded} onToggle={handleToggle} />
        <main className="pt-16 min-h-screen">
          <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>
      <div className="lg:hidden pt-14 min-h-screen">
        <main className="min-h-screen">
          <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
}
