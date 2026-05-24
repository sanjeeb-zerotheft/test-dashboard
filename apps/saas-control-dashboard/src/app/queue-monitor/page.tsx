"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@zerotheft/shared-ui";
import { Badge } from "@zerotheft/shared-ui";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Clock, Users, AlertTriangle, Mail, Database, FileBarChart, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

const queueLagData = [
  { time: "10:00", latency: 180 },
  { time: "10:15", latency: 165 },
  { time: "10:30", latency: 140 },
  { time: "10:45", latency: 155 },
  { time: "11:00", latency: 130 },
  { time: "11:15", latency: 110 },
  { time: "11:30", latency: 125 },
  { time: "11:45", latency: 115 },
  { time: "12:00", latency: 95 },
  { time: "12:15", latency: 105 },
  { time: "12:30", latency: 85 },
  { time: "12:45", latency: 90 },
  { time: "13:00", latency: 75 },
  { time: "13:15", latency: 80 },
  { time: "13:30", latency: 70 },
  { time: "13:45", latency: 65 },
  { time: "14:00", latency: 55 },
  { time: "14:15", latency: 60 },
  { time: "14:30", latency: 50 },
  { time: "14:45", latency: 45 },
  { time: "15:00", latency: 40 },
  { time: "15:15", latency: 42 },
  { time: "15:30", latency: 38 },
  { time: "15:45", latency: 35 },
  { time: "16:00", latency: 32 },
  { time: "16:15", latency: 30 },
  { time: "16:30", latency: 28 },
];

const workers = [
  {
    name: "Email Worker Pool",
    status: "Healthy",
    statusColor: "bg-emerald-500",
    active: 8,
    idle: 2,
    rate: "1,240/min",
    icon: Mail,
  },
  {
    name: "Data Processing",
    status: "Degraded",
    statusColor: "bg-amber-500",
    active: 4,
    idle: 6,
    rate: "320/min",
    icon: Database,
  },
  {
    name: "Report Generation",
    status: "Healthy",
    statusColor: "bg-emerald-500",
    active: 6,
    idle: 1,
    rate: "85/min",
    icon: FileBarChart,
  },
];

const dlqItems = [
  { id: "DLQ-001", queue: "Email Worker Pool", error: "SMTP timeout", time: "5 min ago", status: "Failed" },
  { id: "DLQ-002", queue: "Data Processing", error: "DB connection lost", time: "12 min ago", status: "Failed" },
];

export default function QueueMonitorPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Queue Latency & Automation Monitor</h1>
        <p className="text-gray-500 mt-1">Monitor queue performance and worker health</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg Queue Latency</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">125ms</p>
                <p className="text-xs text-emerald-600 mt-1">-35ms from last hour</p>
              </div>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-100 text-blue-600">
                <Clock className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Workers</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">25</p>
                <p className="text-xs text-gray-400 mt-1">Across 3 pools</p>
              </div>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-emerald-100 text-emerald-600">
                <Users className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">DLQ Messages</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">2</p>
                <p className="text-xs text-red-600 mt-1">Requires attention</p>
              </div>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-red-100 text-red-600">
                <AlertTriangle className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Queue Lag Chart */}
        <Card className="xl:col-span-2 border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Queue Lag (Last 90 min)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={queueLagData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="time" tick={{ fontSize: 11 }} stroke="#9ca3af" interval={4} />
                <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" unit="ms" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="latency"
                  stroke="#ff6b47"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "#ff6b47" }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Worker Health */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-900">Worker Health</h2>
          {workers.map((worker) => (
            <Card key={worker.name} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <worker.icon className="w-4 h-4 text-gray-600" />
                    <p className="text-sm font-medium text-gray-900">{worker.name}</p>
                  </div>
                  <Badge className={`${worker.statusColor} text-white text-[10px]`}>{worker.status}</Badge>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-xs text-gray-500">Active</p>
                    <p className="text-lg font-bold text-gray-900">{worker.active}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-xs text-gray-500">Idle</p>
                    <p className="text-lg font-bold text-gray-900">{worker.idle}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-xs text-gray-500">Rate</p>
                    <p className="text-sm font-bold text-gray-900 mt-1">{worker.rate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Dead Letter Queue */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle className="text-base font-semibold">Dead Letter Queue</CardTitle>
          <Badge className="bg-red-500 text-white text-[10px]">{dlqItems.length} Failed</Badge>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {dlqItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-lg border border-red-100 bg-red-50/50"
              >
                <div className="flex items-center gap-3">
                  <XCircle className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {item.id} — {item.queue}
                    </p>
                    <p className="text-xs text-gray-500">{item.error}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400">{item.time}</span>
                  <Badge className="bg-red-500 text-white text-[10px]">{item.status}</Badge>
                </div>
              </div>
            ))}
            {dlqItems.length === 0 && (
              <div className="flex items-center justify-center gap-2 py-6 text-gray-400">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span className="text-sm">No failed items in DLQ</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
