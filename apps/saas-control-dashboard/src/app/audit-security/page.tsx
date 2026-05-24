"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Badge,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@zerotheft/shared-ui";
import {
  Shield,
  Lock,
  AlertTriangle,
  Eye,
  Search,
  Filter,
} from "lucide-react";
import { useState } from "react";

const stats = [
  {
    label: "Total Events",
    value: "24,592",
    change: "+1,204 today",
    icon: Shield,
    color: "bg-blue-100 text-blue-600",
  },
  {
    label: "Failed Logins",
    value: "18",
    change: "-4 from yesterday",
    icon: Lock,
    color: "bg-red-100 text-red-600",
  },
  {
    label: "Sensitive Actions",
    value: "342",
    change: "+12 today",
    icon: Eye,
    color: "bg-violet-100 text-violet-600",
  },
  {
    label: "Anomalies",
    value: "7",
    change: "2 critical",
    icon: AlertTriangle,
    color: "bg-amber-100 text-amber-600",
  },
];

const auditLogs = [
  {
    timestamp: "2024-06-12 14:32:05",
    user: "admin@company.com",
    action: "User Role Updated",
    resource: "user/4821",
    ip: "192.168.1.42",
    status: "Success",
  },
  {
    timestamp: "2024-06-12 14:28:11",
    user: "john.doe@company.com",
    action: "API Key Generated",
    resource: "api/key/9912",
    ip: "203.0.113.45",
    status: "Success",
  },
  {
    timestamp: "2024-06-12 14:15:33",
    user: "unknown",
    action: "Failed Login Attempt",
    resource: "auth/login",
    ip: "198.51.100.22",
    status: "Failed",
  },
  {
    timestamp: "2024-06-12 13:58:47",
    user: "sarah.smith@company.com",
    action: "Database Export",
    resource: "db/customers",
    ip: "192.168.1.15",
    status: "Success",
  },
  {
    timestamp: "2024-06-12 13:42:19",
    user: "admin@company.com",
    action: "Policy Changed",
    resource: "policy/mfa",
    ip: "192.168.1.42",
    status: "Success",
  },
  {
    timestamp: "2024-06-12 13:20:05",
    user: "mike.jones@company.com",
    action: "Password Reset",
    resource: "user/8823",
    ip: "203.0.113.78",
    status: "Warning",
  },
  {
    timestamp: "2024-06-12 12:55:12",
    user: "unknown",
    action: "Failed Login Attempt",
    resource: "auth/login",
    ip: "198.51.100.88",
    status: "Failed",
  },
  {
    timestamp: "2024-06-12 12:30:00",
    user: "admin@company.com",
    action: "Tenant Config Updated",
    resource: "tenant/120",
    ip: "192.168.1.42",
    status: "Success",
  },
];

function getStatusBadge(status: string) {
  switch (status) {
    case "Success":
      return (
        <Badge className="bg-emerald-100 text-emerald-600 border-0 hover:bg-emerald-100">
          Success
        </Badge>
      );
    case "Failed":
      return (
        <Badge className="bg-red-100 text-red-600 border-0 hover:bg-red-100">
          Failed
        </Badge>
      );
    case "Warning":
      return (
        <Badge className="bg-amber-100 text-amber-600 border-0 hover:bg-amber-100">
          Warning
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}

export default function AuditSecurityPage() {
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState("");

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      search === "" ||
      log.user.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.resource.toLowerCase().includes(search.toLowerCase());

    const matchesAction =
      actionFilter === "" ||
      actionFilter === "all" ||
      log.action.toLowerCase().includes(actionFilter.toLowerCase());

    return matchesSearch && matchesAction;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Audit & Security</h1>
        <p className="text-sm text-gray-500 mt-1">
          Track security events, audit logs, and anomalous activities
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {stat.value}
                  </p>
                  <p
                    className={`text-xs mt-1 ${
                      stat.label === "Failed Logins"
                        ? "text-emerald-600"
                        : stat.label === "Anomalies"
                        ? "text-amber-600"
                        : "text-emerald-600"
                    }`}
                  >
                    {stat.change}
                  </p>
                </div>
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}
                >
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by user, action, or resource..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-3">
              <Select value={actionFilter} onValueChange={(val) => setActionFilter(val ?? "")}>
                <SelectTrigger className="w-44">
                  <Filter className="w-4 h-4 mr-1 text-gray-400" />
                  <SelectValue placeholder="Action Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="login">Login</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="api">API Key</SelectItem>
                  <SelectItem value="policy">Policy</SelectItem>
                  <SelectItem value="database">Database</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearch("");
                  setActionFilter("");
                }}
              >
                Clear
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Audit Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log, idx) => (
                <TableRow key={idx}>
                  <TableCell className="text-gray-500 font-mono text-xs">
                    {log.timestamp}
                  </TableCell>
                  <TableCell className="text-gray-900">{log.user}</TableCell>
                  <TableCell className="text-gray-700">{log.action}</TableCell>
                  <TableCell className="text-gray-500 font-mono text-xs">
                    {log.resource}
                  </TableCell>
                  <TableCell className="text-gray-500 font-mono text-xs">
                    {log.ip}
                  </TableCell>
                  <TableCell>{getStatusBadge(log.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
