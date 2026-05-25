"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@zerotheft/shared-ui";
import { Badge } from "@zerotheft/shared-ui";
import { Button } from "@zerotheft/shared-ui";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import { Download, TrendingUp, TrendingDown, Minus } from "lucide-react";

const alertTypeData = [
  { name: "Intrusion", value: 45 },
  { name: "Loitering", value: 32 },
  { name: "Vehicle", value: 28 },
  { name: "Unauthorized", value: 18 },
  { name: "Crowd", value: 12 },
  { name: "Other", value: 15 },
];

const trendData = [
  { time: "00:00", alerts: 12, resolved: 8 },
  { time: "04:00", alerts: 8, resolved: 6 },
  { time: "08:00", alerts: 25, resolved: 18 },
  { time: "12:00", alerts: 35, resolved: 28 },
  { time: "16:00", alerts: 42, resolved: 35 },
  { time: "20:00", alerts: 30, resolved: 25 },
  { time: "23:59", alerts: 18, resolved: 15 },
];

const accuracyData = [
  { day: "Mon", accuracy: 92 },
  { day: "Tue", accuracy: 94 },
  { day: "Wed", accuracy: 91 },
  { day: "Thu", accuracy: 95 },
  { day: "Fri", accuracy: 93 },
  { day: "Sat", accuracy: 96 },
  { day: "Sun", accuracy: 94 },
];

const stats = [
  { label: "Total Alerts", value: "1,247", change: "+12%", trend: "up" },
  { label: "Critical", value: "87", change: "+8%", trend: "up" },
  { label: "Avg Response", value: "3.2m", change: "-15%", trend: "down" },
  { label: "Resolution Rate", value: "94%", change: "+5%", trend: "up" },
  { label: "False Positive", value: "7.3%", change: "-3%", trend: "down" },
];

function TrendIcon({ trend }: { trend: string }) {
  if (trend === "up") return <TrendingUp className="w-3 h-3 text-emerald-500" />;
  if (trend === "down") return <TrendingDown className="w-3 h-3 text-red-500" />;
  return <Minus className="w-3 h-3 text-gray-400" />;
}

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Alert Analytics & Trends</h1>
          <p className="text-gray-500 mt-1">Analyze alert patterns and system performance</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Export Report
        </Button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <p className="text-xs text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendIcon trend={stat.trend} />
                <span className={`text-xs font-medium ${stat.change.startsWith("+") ? "text-emerald-500" : "text-red-500"}`}>
                  {stat.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Alert Trend (24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorAlerts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff6b47" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#ff6b47" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <Tooltip />
                <Area type="monotone" dataKey="alerts" stroke="#ff6b47" fillOpacity={1} fill="url(#colorAlerts)" strokeWidth={2} />
                <Area type="monotone" dataKey="resolved" stroke="#3b82f6" fillOpacity={0} fill="transparent" strokeWidth={2} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Alert Types Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={alertTypeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <Tooltip />
                <Bar dataKey="value" fill="#ff6b47" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Detection Accuracy Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={accuracyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <YAxis domain={[85, 100]} tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <Tooltip />
                <Line type="monotone" dataKey="accuracy" stroke="#10b981" strokeWidth={2} dot={{ fill: "#10b981", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Top Alert Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { location: "Parking Lot 3", count: 45, percent: 90 },
                { location: "Main Entrance", count: 32, percent: 64 },
                { location: "Warehouse A", count: 28, percent: 56 },
                { location: "Server Room", count: 18, percent: 36 },
                { location: "Loading Dock", count: 12, percent: 24 },
              ].map((loc) => (
                <div key={loc.location}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-700">{loc.location}</span>
                    <span className="text-sm font-medium text-gray-900">{loc.count}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#ff6b47] rounded-full" style={{ width: `${loc.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
