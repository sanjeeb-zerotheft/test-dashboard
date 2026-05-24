"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@zerotheft/shared-ui";
import { Badge } from "@zerotheft/shared-ui";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@zerotheft/shared-ui";
import { Database, FileText, Shield, AlertTriangle, Eye, Globe, Lock, User } from "lucide-react";

const stats = [
  { label: "Data Sources", value: "42", change: "+3 this week", icon: Database, color: "bg-blue-100 text-blue-600" },
  { label: "Classified Records", value: "1.2M", change: "+85K this month", icon: FileText, color: "bg-emerald-100 text-emerald-600" },
  { label: "Policies", value: "18", change: "+2 this month", icon: Shield, color: "bg-amber-100 text-amber-600" },
  { label: "Violations", value: "7", change: "-2 from last week", icon: AlertTriangle, color: "bg-red-100 text-red-600" },
];

const classifications = [
  { label: "Public", count: 320_450, percent: 26, icon: Globe, color: "bg-emerald-500" },
  { label: "Internal", count: 480_120, percent: 39, icon: User, color: "bg-blue-500" },
  { label: "Confidential", count: 310_230, percent: 25, icon: Eye, color: "bg-amber-500" },
  { label: "Restricted", count: 124_200, percent: 10, icon: Lock, color: "bg-red-500" },
];

const policies = [
  { name: "GDPR Data Retention", scope: "Global", status: "Active", updated: "2024-05-15", compliance: "98%" },
  { name: "PCI-DSS Payment Data", scope: "Finance", status: "Active", updated: "2024-04-22", compliance: "96%" },
  { name: "HIPAA Health Records", scope: "Healthcare", status: "Review", updated: "2024-03-10", compliance: "92%" },
  { name: "SOC 2 Access Control", scope: "Engineering", status: "Active", updated: "2024-05-01", compliance: "99%" },
  { name: "CCPA Consumer Privacy", scope: "Global", status: "Active", updated: "2024-05-20", compliance: "97%" },
  { name: "ISO 27001 Asset Mgmt", scope: "IT", status: "Draft", updated: "2024-05-18", compliance: "85%" },
];

function getStatusBadge(status: string) {
  switch (status) {
    case "Active":
      return <Badge className="bg-emerald-500 text-white text-[10px]">Active</Badge>;
    case "Review":
      return <Badge className="bg-amber-500 text-white text-[10px]">Review</Badge>;
    case "Draft":
      return <Badge className="bg-gray-500 text-white text-[10px]">Draft</Badge>;
    default:
      return <Badge className="bg-gray-500 text-white text-[10px]">{status}</Badge>;
  }
}

export default function DataGovernancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Data Governance</h1>
        <p className="text-gray-500 mt-1">Manage data classification, policies, and compliance</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  {stat.change && (
                    <p className="text-xs text-emerald-600 mt-1">{stat.change}</p>
                  )}
                </div>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Data Classification */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {classifications.map((cls) => (
          <Card key={cls.label} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-white ${cls.color}`}>
                  <cls.icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{cls.label}</p>
                  <p className="text-xs text-gray-500">{cls.percent}% of total</p>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{cls.count.toLocaleString()}</p>
              <div className="mt-2 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${cls.color}`}
                  style={{ width: `${cls.percent}%` }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Policies Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Policies & Compliance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">POLICY NAME</TableHead>
                  <TableHead className="text-xs">SCOPE</TableHead>
                  <TableHead className="text-xs">STATUS</TableHead>
                  <TableHead className="text-xs">LAST UPDATED</TableHead>
                  <TableHead className="text-xs">COMPLIANCE</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {policies.map((policy, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <p className="text-sm font-medium text-gray-900">{policy.name}</p>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-700">{policy.scope}</span>
                    </TableCell>
                    <TableCell>{getStatusBadge(policy.status)}</TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-700">{policy.updated}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#ff6b47] rounded-full"
                            style={{ width: policy.compliance }}
                          />
                        </div>
                        <span className="text-xs text-gray-700 font-medium">{policy.compliance}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
