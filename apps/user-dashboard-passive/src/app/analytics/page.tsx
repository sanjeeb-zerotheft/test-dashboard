"use client";

import { Card, CardContent } from "@zerotheft/shared-ui";
import {
  AlertTriangle,
  XCircle,
  Clock,
  Target,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const stats = [
  { label: "Total Incidents", value: "342", change: "+12%", trend: "up", icon: AlertTriangle, color: "bg-red-100 text-red-600" },
  { label: "False Positives", value: "48", change: "-5%", trend: "down", icon: XCircle, color: "bg-amber-100 text-amber-600" },
  { label: "Avg Response Time", value: "2.4m", change: "0%", trend: "neutral", icon: Clock, color: "bg-blue-100 text-blue-600" },
  { label: "Detection Accuracy", value: "97.2%", change: "+1.2%", trend: "up", icon: Target, color: "bg-emerald-100 text-emerald-600" },
];

const lineData = [
  { date: "Mon", incidents: 45, resolved: 38 },
  { date: "Tue", incidents: 52, resolved: 48 },
  { date: "Wed", incidents: 38, resolved: 35 },
  { date: "Thu", incidents: 65, resolved: 58 },
  { date: "Fri", incidents: 48, resolved: 44 },
  { date: "Sat", incidents: 28, resolved: 26 },
  { date: "Sun", incidents: 22, resolved: 20 },
];

const barData = [
  { camera: "Entrance 01", alerts: 42 },
  { camera: "Parking 03", alerts: 35 },
  { camera: "Lobby 02", alerts: 28 },
  { camera: "Back Exit 04", alerts: 24 },
  { camera: "Warehouse 05", alerts: 19 },
  { camera: "Loading 06", alerts: 15 },
];

const pieData = [
  { name: "Critical", value: 12, color: "#ef4444" },
  { name: "High", value: 28, color: "#f97316" },
  { name: "Medium", value: 45, color: "#eab308" },
  { name: "Low", value: 35, color: "#10b981" },
];

const topCameras = [
  { name: "Entrance Cam 01", detections: 142, accuracy: "98.5%", status: "Active" },
  { name: "Parking Lot 03", detections: 118, accuracy: "96.2%", status: "Active" },
  { name: "Lobby Cam 02", detections: 95, accuracy: "99.1%", status: "Active" },
  { name: "Back Exit 04", detections: 87, accuracy: "94.8%", status: "Active" },
  { name: "Warehouse 05", detections: 72, accuracy: "97.5%", status: "Offline" },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:hidden">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
      </div>
      <div className="hidden md:flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-500 mt-1">Detailed insights into your security monitoring performance.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {stat.trend === "up" && <TrendingUp className="w-3 h-3 text-emerald-600" />}
                    {stat.trend === "down" && <TrendingDown className="w-3 h-3 text-red-500" />}
                    {stat.trend === "neutral" && <Minus className="w-3 h-3 text-gray-400" />}
                    <p className={`text-xs ${stat.trend === "neutral" ? "text-gray-400" : stat.trend === "down" ? "text-red-500" : "text-emerald-600"}`}>
                      {stat.change} vs last week
                    </p>
                  </div>
                </div>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Line Chart */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Incident Trend (Last 7 Days)</h3>
              <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="incidents" stroke="#ef4444" strokeWidth={2} dot={{ r: 3, fill: "#ef4444" }} name="Incidents" />
                <Line type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={2} dot={{ r: 3, fill: "#10b981" }} name="Resolved" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Alerts by Camera</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="camera" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <Tooltip />
                <Bar dataKey="alerts" fill="#ff6b47" radius={[6, 6, 0, 0]} name="Alerts" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 + Table */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Pie Chart */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Alert Severity Distribution</h3>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [value, name]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Cameras Table */}
        <Card className="xl:col-span-2 border-0 shadow-sm">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Top Cameras by Activity</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-xs font-medium text-gray-500 uppercase py-3 px-2">Camera</th>
                    <th className="text-right text-xs font-medium text-gray-500 uppercase py-3 px-2">Detections</th>
                    <th className="text-right text-xs font-medium text-gray-500 uppercase py-3 px-2">Accuracy</th>
                    <th className="text-right text-xs font-medium text-gray-500 uppercase py-3 px-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {topCameras.map((cam) => (
                    <tr key={cam.name} className="border-b border-gray-50 last:border-0">
                      <td className="py-3 px-2 text-sm text-gray-900">{cam.name}</td>
                      <td className="py-3 px-2 text-sm text-gray-900 text-right font-medium">{cam.detections}</td>
                      <td className="py-3 px-2 text-sm text-gray-900 text-right">{cam.accuracy}</td>
                      <td className="py-3 px-2 text-right">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          cam.status === "Active"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-gray-100 text-gray-600"
                        }`}>
                          {cam.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
