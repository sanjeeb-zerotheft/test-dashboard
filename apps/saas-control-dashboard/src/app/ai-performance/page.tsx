"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@zerotheft/shared-ui";
import {
  Zap,
  Gauge,
  Target,
  AlertCircle,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const stats = [
  {
    label: "Avg Latency",
    value: "142ms",
    change: "-18ms from last week",
    icon: Zap,
    color: "bg-blue-100 text-blue-600",
  },
  {
    label: "Throughput",
    value: "4.2K req/s",
    change: "+8.5% increase",
    icon: Gauge,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    label: "Accuracy",
    value: "96.8%",
    change: "+1.2% improvement",
    icon: Target,
    color: "bg-violet-100 text-violet-600",
  },
  {
    label: "Error Rate",
    value: "0.42%",
    change: "-0.15% decrease",
    icon: AlertCircle,
    color: "bg-amber-100 text-amber-600",
  },
];

const latencyData = [
  { time: "00:00", latency: 128 },
  { time: "02:00", latency: 135 },
  { time: "04:00", latency: 122 },
  { time: "06:00", latency: 145 },
  { time: "08:00", latency: 168 },
  { time: "10:00", latency: 182 },
  { time: "12:00", latency: 175 },
  { time: "14:00", latency: 162 },
  { time: "16:00", latency: 155 },
  { time: "18:00", latency: 148 },
  { time: "20:00", latency: 140 },
  { time: "22:00", latency: 132 },
  { time: "24:00", latency: 130 },
];

const models = [
  {
    model: "GPT-4o",
    version: "2024-05-13",
    latency: "142ms",
    accuracy: "96.8%",
    requestsPerDay: "2.1M",
    status: "Active",
  },
  {
    model: "Claude 3.5 Sonnet",
    version: "2024-06-20",
    latency: "118ms",
    accuracy: "97.2%",
    requestsPerDay: "1.4M",
    status: "Active",
  },
  {
    model: "Gemini 1.5 Pro",
    version: "001",
    latency: "165ms",
    accuracy: "95.4%",
    requestsPerDay: "850K",
    status: "Active",
  },
  {
    model: "Llama 3 70B",
    version: "v3.1",
    latency: "210ms",
    accuracy: "94.1%",
    requestsPerDay: "620K",
    status: "Beta",
  },
  {
    model: "Mistral Large",
    version: "2407",
    latency: "155ms",
    accuracy: "95.9%",
    requestsPerDay: "430K",
    status: "Active",
  },
];

function getStatusBadge(status: string) {
  switch (status) {
    case "Active":
      return (
        <Badge className="bg-emerald-100 text-emerald-600 border-0 hover:bg-emerald-100">
          Active
        </Badge>
      );
    case "Beta":
      return (
        <Badge className="bg-blue-100 text-blue-600 border-0 hover:bg-blue-100">
          Beta
        </Badge>
      );
    case "Deprecated":
      return (
        <Badge className="bg-gray-100 text-gray-600 border-0 hover:bg-gray-100">
          Deprecated
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}

export default function AiPerformancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">AI Performance</h1>
        <p className="text-sm text-gray-500 mt-1">
          Monitor latency, throughput, and model-level metrics
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
                      stat.label === "Error Rate"
                        ? "text-emerald-600"
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

      {/* Performance Chart */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            Latency Over Time (24h)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={latencyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 12 }}
                stroke="#9ca3af"
              />
              <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" unit="ms" />
              <Tooltip
                formatter={(value) => [`${value}ms`, "Latency"]}
              />
              <Line
                type="monotone"
                dataKey="latency"
                stroke="#ff6b47"
                strokeWidth={2}
                dot={{ r: 4, fill: "#ff6b47" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Model Comparison Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            Model Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Model</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Latency</TableHead>
                <TableHead>Accuracy</TableHead>
                <TableHead>Requests/day</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {models.map((model) => (
                <TableRow key={model.model}>
                  <TableCell className="font-medium text-gray-900">
                    {model.model}
                  </TableCell>
                  <TableCell className="text-gray-500 font-mono text-xs">
                    {model.version}
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {model.latency}
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {model.accuracy}
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {model.requestsPerDay}
                  </TableCell>
                  <TableCell>{getStatusBadge(model.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
