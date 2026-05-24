"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Badge,
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@zerotheft/shared-ui";
import {
  Workflow,
  TrendingUp,
  Clock,
  Database,
  Play,
  RotateCcw,
  MoreHorizontal,
} from "lucide-react";

const stats = [
  {
    label: "Active Pipelines",
    value: "24",
    change: "+3 this week",
    icon: Workflow,
    color: "bg-blue-100 text-blue-600",
  },
  {
    label: "Success Rate",
    value: "98.4%",
    change: "+0.6% from last week",
    icon: TrendingUp,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    label: "Avg Runtime",
    value: "4m 32s",
    change: "-12s improvement",
    icon: Clock,
    color: "bg-amber-100 text-amber-600",
  },
  {
    label: "Data Processed",
    value: "1.2 TB",
    change: "+180 GB today",
    icon: Database,
    color: "bg-violet-100 text-violet-600",
  },
];

const pipelines = [
  {
    name: "User Analytics ETL",
    status: "Success",
    lastRun: "2 minutes ago",
    duration: "3m 12s",
    records: "1.2M",
  },
  {
    name: "Payment Reconciliation",
    status: "Success",
    lastRun: "15 minutes ago",
    duration: "5m 45s",
    records: "856K",
  },
  {
    name: "Inventory Sync",
    status: "Running",
    lastRun: "In progress",
    duration: "2m 10s",
    records: "430K",
  },
  {
    name: "Marketing Attribution",
    status: "Failed",
    lastRun: "1 hour ago",
    duration: "1m 30s",
    records: "—",
  },
  {
    name: "Fraud Detection",
    status: "Success",
    lastRun: "3 hours ago",
    duration: "8m 20s",
    records: "2.1M",
  },
  {
    name: "Customer 360",
    status: "Warning",
    lastRun: "5 hours ago",
    duration: "12m 05s",
    records: "980K",
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
    case "Running":
      return (
        <Badge className="bg-blue-100 text-blue-600 border-0 hover:bg-blue-100">
          Running
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

export default function DataPipelinePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Data Pipeline</h1>
        <p className="text-sm text-gray-500 mt-1">
          Monitor and manage your data pipeline executions
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
                  <p className="text-xs text-emerald-600 mt-1">{stat.change}</p>
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

      {/* Pipeline Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">
              Pipeline Executions
            </CardTitle>
            <Button size="sm" className="bg-[#ff6b47] hover:bg-[#ff6b47]/90 text-white">
              <Play className="w-4 h-4 mr-1" />
              Run All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pipeline Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Run</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Records</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pipelines.map((pipeline) => (
                <TableRow key={pipeline.name}>
                  <TableCell className="font-medium text-gray-900">
                    {pipeline.name}
                  </TableCell>
                  <TableCell>{getStatusBadge(pipeline.status)}</TableCell>
                  <TableCell className="text-gray-500">
                    {pipeline.lastRun}
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {pipeline.duration}
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {pipeline.records}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon-xs">
                        <Play className="w-3.5 h-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon-xs">
                        <RotateCcw className="w-3.5 h-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon-xs">
                        <MoreHorizontal className="w-3.5 h-3.5" />
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
