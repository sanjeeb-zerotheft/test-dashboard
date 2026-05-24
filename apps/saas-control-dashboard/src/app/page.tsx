"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@zerotheft/shared-ui";
import { Users, DollarSign, AlertTriangle, Activity } from "lucide-react";
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
  { label: "Active Tenants", value: "1,247", change: "+12% from last month", icon: Users, color: "bg-blue-100 text-blue-600" },
  { label: "Monthly Revenue", value: "$284K", change: "+8.2% from last month", icon: DollarSign, color: "bg-emerald-100 text-emerald-600" },
  { label: "Active Alerts", value: "7", change: "-3 from yesterday", icon: AlertTriangle, color: "bg-amber-100 text-amber-600" },
  { label: "System Uptime", value: "99.92%", change: "", icon: Activity, color: "bg-emerald-100 text-emerald-600" },
];

const healthData = [
  { time: "00:00", value: 99.8 },
  { time: "04:00", value: 99.9 },
  { time: "08:00", value: 99.65 },
  { time: "12:00", value: 99.95 },
  { time: "16:00", value: 99.85 },
  { time: "20:00", value: 99.9 },
  { time: "24:00", value: 99.92 },
];

const incidents = [
  { title: "API Gateway Timeout", time: "2 hours ago", status: "Error", statusColor: "bg-red-100 text-red-600" },
  { title: "Database Connection Pool Exhausted", time: "5 hours ago", status: "Warning", statusColor: "bg-amber-100 text-amber-600", detail: "investigating" },
  { title: "CDN Cache Miss Rate High", time: "1 day ago", status: "Warning", statusColor: "bg-amber-100 text-amber-600", detail: "resolved" },
];

const activities = [
  { title: "New tenant registered", by: "System", time: "5 minutes ago" },
  { title: "Feature flag updated", by: "admin@company.com", time: "1 hour ago" },
  { title: "Payment processed", by: "Stripe Webhook", time: "2 hours ago" },
  { title: "Security audit completed", by: "System", time: "3 hours ago" },
];

export default function SuperAdminHomePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Super Admin Home</h1>
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

      {/* Charts + Incidents */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2 border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">System Health (24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={healthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="time" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <YAxis domain={[99.5, 100]} tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={{ r: 4, fill: "#10b981" }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Recent Incidents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {incidents.map((incident, idx) => (
              <div key={idx} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">{incident.title}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${incident.statusColor}`}>
                    {incident.status}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{incident.time}</p>
                {incident.detail && (
                  <p className="text-xs text-gray-500 mt-1">{incident.detail}</p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Activity Timeline */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Activity Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {activities.map((activity, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff6b47]" />
                  {idx < activities.length - 1 && (
                    <div className="w-px h-full bg-gray-200 mt-1" />
                  )}
                </div>
                <div className="pb-6">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    by {activity.by} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
