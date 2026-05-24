"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@zerotheft/shared-ui";
import { Badge } from "@zerotheft/shared-ui";
import { Button } from "@zerotheft/shared-ui";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@zerotheft/shared-ui";
import { ClipboardCheck, CheckCircle2, AlertTriangle, Clock, Eye, Edit, Trash2 } from "lucide-react";

const stats = [
  { label: "Total SOPs", value: "48", change: "+4 this month", icon: ClipboardCheck, color: "bg-blue-100 text-blue-600" },
  { label: "Compliant", value: "41", change: "85% compliance rate", icon: CheckCircle2, color: "bg-emerald-100 text-emerald-600" },
  { label: "Violations", value: "5", change: "-2 from last week", icon: AlertTriangle, color: "bg-red-100 text-red-600" },
  { label: "Pending Review", value: "2", change: "Needs attention", icon: Clock, color: "bg-amber-100 text-amber-600" },
];

const sops = [
  { id: "SOP-001", name: "Employee Onboarding", department: "HR", status: "Active", score: 98, checked: "2024-05-20" },
  { id: "SOP-002", name: "Data Backup Procedure", department: "IT", status: "Active", score: 96, checked: "2024-05-19" },
  { id: "SOP-003", name: "Incident Response", department: "Security", status: "Active", score: 92, checked: "2024-05-18" },
  { id: "SOP-004", name: "Access Control Review", department: "IT", status: "Warning", score: 78, checked: "2024-05-15" },
  { id: "SOP-005", name: "Vendor Assessment", department: "Procurement", status: "Active", score: 95, checked: "2024-05-17" },
  { id: "SOP-006", name: "Financial Reconciliation", department: "Finance", status: "Critical", score: 64, checked: "2024-05-10" },
  { id: "SOP-007", name: "Customer Data Handling", department: "Support", status: "Active", score: 99, checked: "2024-05-21" },
];

function getStatusBadge(status: string) {
  switch (status) {
    case "Active":
      return <Badge className="bg-emerald-500 text-white text-[10px]">Active</Badge>;
    case "Warning":
      return <Badge className="bg-amber-500 text-white text-[10px]">Warning</Badge>;
    case "Critical":
      return <Badge className="bg-red-500 text-white text-[10px]">Critical</Badge>;
    default:
      return <Badge className="bg-gray-500 text-white text-[10px]">{status}</Badge>;
  }
}

function getScoreColor(score: number) {
  if (score >= 90) return "bg-emerald-500";
  if (score >= 75) return "bg-amber-500";
  return "bg-red-500";
}

export default function SOPEnforcementPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">SOP Enforcement</h1>
        <p className="text-gray-500 mt-1">Monitor and enforce standard operating procedures</p>
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

      {/* SOP Rules Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle className="text-base font-semibold">SOP Rules</CardTitle>
          <Button size="sm" className="bg-[#ff6b47] hover:bg-[#e55a3a] text-white h-8 text-xs">
            Add SOP
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">SOP ID</TableHead>
                  <TableHead className="text-xs">NAME</TableHead>
                  <TableHead className="text-xs">DEPARTMENT</TableHead>
                  <TableHead className="text-xs">STATUS</TableHead>
                  <TableHead className="text-xs">COMPLIANCE SCORE</TableHead>
                  <TableHead className="text-xs">LAST CHECKED</TableHead>
                  <TableHead className="text-xs">ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sops.map((sop) => (
                  <TableRow key={sop.id}>
                    <TableCell>
                      <span className="text-sm font-mono text-gray-700">{sop.id}</span>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm font-medium text-gray-900">{sop.name}</p>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-700">{sop.department}</span>
                    </TableCell>
                    <TableCell>{getStatusBadge(sop.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${getScoreColor(sop.score)}`}
                            style={{ width: `${sop.score}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-700 font-medium">{sop.score}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-700">{sop.checked}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                          <Eye className="w-3.5 h-3.5 text-gray-500" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                          <Edit className="w-3.5 h-3.5 text-gray-500" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                          <Trash2 className="w-3.5 h-3.5 text-gray-500" />
                        </Button>
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
