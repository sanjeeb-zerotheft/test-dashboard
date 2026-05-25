"use client";

import { Card, CardContent, Button, Badge } from "@zerotheft/shared-ui";
import {
  Building2,
  Users,
  CreditCard,
  CheckCircle2,
  ArrowRightLeft,
  Plus,
  Shield,
  Crown,
  Zap,
} from "lucide-react";

const currentOrg = {
  name: "Kyra Works",
  plan: "Gold Plan",
  users: 14,
  cameras: 24,
  role: "Owner",
};

const organizations = [
  {
    name: "Kyra Works",
    role: "Owner",
    plan: "Gold Plan",
    status: "active",
    icon: Building2,
  },
  {
    name: "Acme Corp",
    role: "Admin",
    plan: "Silver Plan",
    status: "inactive",
    icon: Shield,
  },
  {
    name: "TechStart Inc",
    role: "Member",
    plan: "Starter Plan",
    status: "inactive",
    icon: Zap,
  },
];

export default function OrganizationsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:hidden">
        <h1 className="text-2xl font-bold text-gray-900">Organizations</h1>
      </div>
      <div className="hidden md:flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Organizations</h1>
          <p className="text-gray-500 mt-1">Manage and switch between your organizations.</p>
        </div>
      </div>

      {/* Current Org Card */}
      <Card className="border-0 shadow-sm bg-gradient-to-r from-[#1e2330] to-[#2a3040]">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-[#ff6b47] flex items-center justify-center">
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-white">{currentOrg.name}</h2>
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-0">Current</Badge>
                </div>
                <p className="text-gray-400 text-sm mt-0.5">{currentOrg.role} • {currentOrg.plan}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-gray-300">
                <Users className="w-4 h-4" />
                <span className="text-sm">{currentOrg.users} users</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <CreditCard className="w-4 h-4" />
                <span className="text-sm">{currentOrg.cameras} cameras</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Select Organization */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Select Organization</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {organizations.map((org) => (
            <Card
              key={org.name}
              className={`border-0 shadow-sm ${org.status === "active" ? "ring-2 ring-[#ff6b47]/30" : ""}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      org.status === "active" ? "bg-[#ff6b47]/10" : "bg-gray-100"
                    }`}>
                      <org.icon className={`w-5 h-5 ${org.status === "active" ? "text-[#ff6b47]" : "text-gray-500"}`} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{org.name}</p>
                      <p className="text-xs text-gray-500">{org.role}</p>
                    </div>
                  </div>
                  {org.status === "active" ? (
                    <Badge className="bg-emerald-500/10 text-emerald-600 border-0 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Active
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="border-gray-200 text-gray-500">
                      {org.plan}
                    </Badge>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  {org.status === "active" ? (
                    <Button disabled className="w-full bg-gray-100 text-gray-500 hover:bg-gray-100 cursor-default">
                      <CheckCircle2 className="w-4 h-4 mr-2" /> Currently Active
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full border-gray-300 hover:border-[#ff6b47] hover:text-[#ff6b47]">
                      <ArrowRightLeft className="w-4 h-4 mr-2" /> Switch
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Create New */}
      <Card className="border-0 shadow-sm border-dashed border-2 border-gray-200">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                <Plus className="w-6 h-6 text-gray-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Create New Organization</h3>
                <p className="text-sm text-gray-500">Set up a new workspace for your team.</p>
              </div>
            </div>
            <Button className="bg-[#ff6b47] hover:bg-[#e55a3a] text-white">
              <Plus className="w-4 h-4 mr-2" /> Create Organization
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
