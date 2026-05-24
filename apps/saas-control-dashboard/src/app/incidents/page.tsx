"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@zerotheft/shared-ui";
import { Badge } from "@zerotheft/shared-ui";
import { Button } from "@zerotheft/shared-ui";
import { Input } from "@zerotheft/shared-ui";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@zerotheft/shared-ui";
import { AlertTriangle, AlertOctagon, Clock, CheckCircle2, Search, Eye, Edit, Trash2, Plus } from "lucide-react";

const stats = [
  { label: "Total Incidents", value: "15", change: "-12% from last month", icon: AlertTriangle, color: "bg-blue-100 text-blue-600" },
  { label: "Critical", value: "3", change: "+3 new", icon: AlertOctagon, color: "bg-red-100 text-red-600" },
  { label: "In Progress", value: "5", change: "Active now", icon: Clock, color: "bg-amber-100 text-amber-600" },
  { label: "Resolved Today", value: "3", change: "Great work", icon: CheckCircle2, color: "bg-emerald-100 text-emerald-600" },
];

const incidents = [
  { id: "INC-2024-001", title: "Database Connection Timeout", severity: "Critical", status: "In Progress", created: "2024-05-21 09:15" },
  { id: "INC-2024-002", title: "API Gateway 504 Errors", severity: "High", status: "Open", created: "2024-05-21 08:42" },
  { id: "INC-2024-003", title: "Memory Leak in Worker Pool", severity: "High", status: "In Progress", created: "2024-05-20 16:30" },
  { id: "INC-2024-004", title: "SSL Certificate Expiring", severity: "Medium", status: "Open", created: "2024-05-20 14:10" },
  { id: "INC-2024-005", title: "CDN Cache Invalidation Failure", severity: "Medium", status: "Resolved", created: "2024-05-19 11:25" },
  { id: "INC-2024-006", title: "Login Service Degradation", severity: "Critical", status: "Resolved", created: "2024-05-19 07:50" },
  { id: "INC-2024-007", title: "Disk Space Warning on DB-03", severity: "Low", status: "Open", created: "2024-05-18 22:05" },
  { id: "INC-2024-008", title: "Third-party API Latency Spike", severity: "High", status: "In Progress", created: "2024-05-18 13:40" },
  { id: "INC-2024-009", title: "Backup Job Failure", severity: "Medium", status: "Resolved", created: "2024-05-17 03:00" },
  { id: "INC-2024-010", title: "Unauthorized Access Attempt", severity: "Critical", status: "Resolved", created: "2024-05-16 19:15" },
];

function getSeverityBadge(severity: string) {
  switch (severity) {
    case "Critical":
      return <Badge className="bg-red-500 text-white text-[10px]">Critical</Badge>;
    case "High":
      return <Badge className="bg-orange-500 text-white text-[10px]">High</Badge>;
    case "Medium":
      return <Badge className="bg-amber-500 text-white text-[10px]">Medium</Badge>;
    case "Low":
      return <Badge className="bg-emerald-500 text-white text-[10px]">Low</Badge>;
    default:
      return <Badge className="bg-gray-500 text-white text-[10px]">{severity}</Badge>;
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case "Resolved":
      return <Badge className="bg-emerald-500 text-white text-[10px]">Resolved</Badge>;
    case "In Progress":
      return <Badge className="bg-[#ff6b47] text-white text-[10px]">In Progress</Badge>;
    case "Open":
      return <Badge className="bg-blue-500 text-white text-[10px]">Open</Badge>;
    default:
      return <Badge className="bg-gray-500 text-white text-[10px]">{status}</Badge>;
  }
}

export default function IncidentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Incident Management</h1>
        <p className="text-gray-500 mt-1">Track, manage, and resolve incidents</p>
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

      {/* Incident History */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3 flex flex-row items-center justify-between gap-4">
          <CardTitle className="text-base font-semibold">Incident History</CardTitle>
          <div className="flex items-center gap-3">
            <div className="relative w-56">
              <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400" />
              <Input placeholder="Search incidents..." className="pl-9 h-9" />
            </div>
            <Button size="sm" className="bg-[#ff6b47] hover:bg-[#e55a3a] text-white h-9 text-xs gap-1">
              <Plus className="w-4 h-4" />
              Add Incident
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">INCIDENT ID</TableHead>
                  <TableHead className="text-xs">TITLE</TableHead>
                  <TableHead className="text-xs">SEVERITY</TableHead>
                  <TableHead className="text-xs">STATUS</TableHead>
                  <TableHead className="text-xs">CREATED</TableHead>
                  <TableHead className="text-xs">ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {incidents.map((incident) => (
                  <TableRow key={incident.id}>
                    <TableCell>
                      <span className="text-sm font-mono text-gray-700">{incident.id}</span>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm font-medium text-gray-900">{incident.title}</p>
                    </TableCell>
                    <TableCell>{getSeverityBadge(incident.severity)}</TableCell>
                    <TableCell>{getStatusBadge(incident.status)}</TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-700">{incident.created}</span>
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
