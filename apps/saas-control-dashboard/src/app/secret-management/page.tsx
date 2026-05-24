"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@zerotheft/shared-ui";
import {
  KeyRound,
  RefreshCw,
  Clock,
  AlertTriangle,
  Eye,
  Copy,
  Pencil,
  Trash2,
} from "lucide-react";

const stats = [
  {
    label: "Total Secrets",
    value: "124",
    icon: KeyRound,
    color: "bg-blue-100 text-blue-600",
  },
  {
    label: "Rotated This Month",
    value: "38",
    icon: RefreshCw,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    label: "Expiring Soon",
    value: "12",
    icon: Clock,
    color: "bg-amber-100 text-amber-600",
  },
  {
    label: "Compromised",
    value: "1",
    icon: AlertTriangle,
    color: "bg-red-100 text-red-600",
  },
];

const secrets = [
  {
    id: 1,
    name: "DATABASE_URL",
    type: "Connection String",
    environment: "Production",
    lastRotated: "May 15, 2025",
    expires: "Aug 15, 2025",
    status: "Active",
  },
  {
    id: 2,
    name: "STRIPE_API_KEY",
    type: "API Key",
    environment: "Production",
    lastRotated: "Apr 22, 2025",
    expires: "Jul 22, 2025",
    status: "Active",
  },
  {
    id: 3,
    name: "AWS_SECRET_ACCESS_KEY",
    type: "Access Key",
    environment: "Staging",
    lastRotated: "May 01, 2025",
    expires: "Jun 28, 2025",
    status: "Expiring Soon",
  },
  {
    id: 4,
    name: "SENDGRID_API_KEY",
    type: "API Key",
    environment: "Production",
    lastRotated: "Mar 10, 2025",
    expires: "May 10, 2025",
    status: "Expired",
  },
  {
    id: 5,
    name: "JWT_SIGNING_SECRET",
    type: "Signing Key",
    environment: "Production",
    lastRotated: "May 20, 2025",
    expires: "Nov 20, 2025",
    status: "Active",
  },
  {
    id: 6,
    name: "REDIS_PASSWORD",
    type: "Password",
    environment: "Staging",
    lastRotated: "Feb 14, 2025",
    expires: "May 14, 2025",
    status: "Expired",
  },
  {
    id: 7,
    name: "GITHUB_OAUTH_TOKEN",
    type: "OAuth Token",
    environment: "Development",
    lastRotated: "May 18, 2025",
    expires: "Aug 18, 2025",
    status: "Active",
  },
];

function getStatusBadge(status: string) {
  switch (status) {
    case "Active":
      return (
        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1" />
          Active
        </Badge>
      );
    case "Expiring Soon":
      return (
        <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-0">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1" />
          Expiring Soon
        </Badge>
      );
    case "Expired":
      return (
        <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-0">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1" />
          Expired
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}

export default function SecretManagementPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Secret Management</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage and rotate secrets across environments
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

      {/* Secrets Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Secrets</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Environment</TableHead>
                <TableHead>Last Rotated</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {secrets.map((secret) => (
                <TableRow key={secret.id}>
                  <TableCell className="font-medium text-gray-900">
                    <div className="flex items-center gap-2">
                      <KeyRound className="w-4 h-4 text-gray-400" />
                      {secret.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-500">{secret.type}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        secret.environment === "Production"
                          ? "bg-blue-100 text-blue-700 hover:bg-blue-100 border-0"
                          : secret.environment === "Staging"
                          ? "bg-violet-100 text-violet-700 hover:bg-violet-100 border-0"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-100 border-0"
                      }
                    >
                      {secret.environment}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {secret.lastRotated}
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {secret.expires}
                  </TableCell>
                  <TableCell>{getStatusBadge(secret.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="text-gray-500 hover:text-gray-900"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="text-gray-500 hover:text-gray-900"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="text-gray-500 hover:text-gray-900"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="text-gray-500 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
