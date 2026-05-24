"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Shield,
  CreditCard,
  DollarSign,
  Activity,
  Bell,
  Brain,
  Database,
  Plug,
  FileText,
  Cpu,
  Mail,
  Flag,
  Key,
  Code,
  CheckCircle,
  Eye,
  Clock,
  ClipboardCheck,
  UserPlus,
  Lock,
  AlertTriangle,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@zerotheft/shared-ui";

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  children?: { name: string; href: string }[];
}

const navItems: NavItem[] = [
  { name: "Super Admin Home", href: "/", icon: LayoutDashboard },
  {
    name: "User & Tenant",
    href: "#",
    icon: Users,
    children: [
      { name: "User Management", href: "/users" },
      { name: "Tenant Management", href: "/tenants" },
    ],
  },
  { name: "Role & Permission", href: "/roles", icon: Shield },
  { name: "Subscription Mgmt", href: "/subscriptions", icon: CreditCard },
  { name: "Payment & Refunds", href: "/payments", icon: DollarSign },
  { name: "Microservice Health", href: "/microservices", icon: Activity },
  { name: "Alert Configuration", href: "/alerts", icon: Bell },
  { name: "Model Training", href: "/model-training", icon: Brain },
  { name: "Data Pipeline", href: "/data-pipeline", icon: Database },
  { name: "Integration Health", href: "/integration-health", icon: Plug },
  { name: "Audit & Security", href: "/audit-security", icon: FileText },
  { name: "AI Performance", href: "/ai-performance", icon: Cpu },
  { name: "Content Mgmt", href: "/content", icon: Mail },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Feature Flags", href: "/feature-flags", icon: Flag },
  { name: "Secret Management", href: "/secret-management", icon: Key },
  { name: "Developer Portal", href: "/developer-portal", icon: Code },
  { name: "Compliance", href: "/compliance", icon: CheckCircle },
  { name: "Data Governance", href: "/data-governance", icon: Eye },
  { name: "Queue Monitor", href: "/queue-monitor", icon: Clock },
  { name: "SOP Enforcement", href: "/sop-enforcement", icon: ClipboardCheck },
  { name: "Hiring Agent", href: "/hiring-agent", icon: UserPlus },
  { name: "IP Defense", href: "/ip-defense", icon: Lock },
  { name: "Incidents", href: "/incidents", icon: AlertTriangle },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<string[]>(["User & Tenant"]);

  const toggleExpand = (name: string) => {
    setExpanded((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const isActive = (href: string) => pathname === href;
  const isParentActive = (item: NavItem) => {
    if (item.children) {
      return item.children.some((child) => pathname === child.href);
    }
    return false;
  };

  return (
    <div className="flex flex-col h-full bg-[#1e2330] text-gray-300 w-64">
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-700/50">
        <div className="w-8 h-8 bg-[#ff6b47] rounded-lg flex items-center justify-center">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <div>
          <span className="text-lg font-bold text-white tracking-tight">ZeroTheft</span>
          <p className="text-[10px] text-gray-500 -mt-0.5">Super Admin Portal</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const hasChildren = !!item.children;
          const active = isActive(item.href) || isParentActive(item);
          const isExpanded = expanded.includes(item.name);

          if (hasChildren) {
            return (
              <div key={item.name}>
                <button
                  onClick={() => toggleExpand(item.name)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? "text-[#ff6b47]"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={`w-5 h-5 ${active ? "text-[#ff6b47]" : ""}`} />
                    {item.name}
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                  />
                </button>
                {isExpanded && item.children && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        onClick={onNavigate}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isActive(child.href)
                            ? "bg-[#ff6b47]/10 text-[#ff6b47]"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {child.name}
                      </Link>
                    ))}
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
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-[#ff6b47]/10 text-[#ff6b47]"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon className={`w-5 h-5 ${active ? "text-[#ff6b47]" : ""}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>
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
            <SidebarContent onNavigate={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
