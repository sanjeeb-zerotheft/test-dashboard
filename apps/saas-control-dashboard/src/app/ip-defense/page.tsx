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
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  Server,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const stats = [
  { label: "Threats Blocked", value: "12,847", change: "+342 today", icon: Shield, color: "bg-emerald-100 text-emerald-600" },
  { label: "Active Threats", value: "3", change: "Requires attention", icon: ShieldAlert, color: "bg-red-100 text-red-600" },
  { label: "False Positives", value: "18", change: "-4 this week", icon: ShieldCheck, color: "bg-blue-100 text-blue-600" },
  { label: "Protected Assets", value: "156", change: "+3 this month", icon: Server, color: "bg-purple-100 text-purple-600" },
];

const threatData = [
  { time: "00:00", blocked: 12, active: 0 },
  { time: "04:00", blocked: 8, active: 1 },
  { time: "08:00", blocked: 45, active: 2 },
  { time: "12:00", blocked: 62, active: 1 },
  { time: "16:00", blocked: 38, active: 3 },
  { time: "20:00", blocked: 28, active: 1 },
  { time: "23:59", blocked: 15, active: 0 },
];

const incidents = [
  { id: "THR-2024-001", type: "DDoS Attack", severity: "Critical", source: "103.21.45.x", target: "API Gateway", status: "Blocked", detected: "2024-05-21 14:32" },
  { id: "THR-2024-002", type: "SQL Injection", severity: "High", source: "45.67.89.x", target: "User DB", status: "Blocked", detected: "2024-05-21 13:15" },
  { id: "THR-2024-003", type: "Brute Force", severity: "High", source: "88.12.34.x", target: "Admin Portal", status: "Mitigating", detected: "2024-05-21 12:48" },
  { id: "THR-2024-004", type: "XSS Attempt", severity: "Medium", source: "192.168.1.x", target: "Web App", status: "Blocked", detected: "2024-05-21 11:22" },
  { id: "THR-2024-005", type: "Port Scan", severity: "Low", source: "10.0.0.x", target: "Firewall", status: "Blocked", detected: "2024-05-21 09:05" },
  { id: "THR-2024-006", type: "Malware Upload", severity: "Critical", source: "77.44.22.x", target: "File Server", status: "Investigating", detected: "2024-05-21 08:17" },
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
    case "Blocked":
      return <Badge className="bg-emerald-500 text-white text-[10px]">Blocked</Badge>;
    case "Mitigating":
      return <Badge className="bg-amber-500 text-white text-[10px]">Mitigating</Badge>;
    case "Investigating":
      return <Badge className="bg-blue-500 text-white text-[10px]">Investigating</Badge>;
    default:
      return <Badge className="bg-gray-500 text-white text-[10px]">{status}</Badge>;
  }
}

export default function IPDefensePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">IP Defense</h1>
        <p className="text-gray-500 mt-1">Monitor and respond to security threats</p>
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

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Threat Timeline */}
        <Card className="xl:col-span-2 border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Threat Timeline (24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={threatData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="time" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="blocked"
                  stroke="#ff6b47"
                  fill="#ff6b47"
                  fillOpacity={0.15}
                  strokeWidth={2}
                  name="Blocked"
                />
                <Area
                  type="monotone"
                  dataKey="active"
                  stroke="#ef4444"
                  fill="#ef4444"
                  fillOpacity={0.1}
                  strokeWidth={2}
                  name="Active"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Threat Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: "DDoS", count: 3, color: "bg-red-500" },
              { label: "Injection", count: 12, color: "bg-orange-500" },
              { label: "Brute Force", count: 8, color: "bg-amber-500" },
              { label: "XSS", count: 5, color: "bg-blue-500" },
              { label: "Port Scan", count: 14, color: "bg-gray-500" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${item.color}`} />
                  <span className="text-sm text-gray-700">{item.label}</span>
                </div>
                <span className="text-sm font-bold text-gray-900">{item.count}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Incidents Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle className="text-base font-semibold">Security Incidents</CardTitle>
          <Button size="sm" className="bg-[#ff6b47] hover:bg-[#e55a3a] text-white h-8 text-xs">
            Create Alert
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">ID</TableHead>
                  <TableHead className="text-xs">TYPE</TableHead>
                  <TableHead className="text-xs">SEVERITY</TableHead>
                  <TableHead className="text-xs">SOURCE</TableHead>
                  <TableHead className="text-xs">TARGET</TableHead>
                  <TableHead className="text-xs">STATUS</TableHead>
                  <TableHead className="text-xs">DETECTED</TableHead>
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
                      <span className="text-sm text-gray-700">{incident.type}</span>
                    </TableCell>
                    <TableCell>{getSeverityBadge(incident.severity)}</TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-700">{incident.source}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-700">{incident.target}</span>
                    </TableCell>
                    <TableCell>{getStatusBadge(incident.status)}</TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-700">{incident.detected}</span>
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
