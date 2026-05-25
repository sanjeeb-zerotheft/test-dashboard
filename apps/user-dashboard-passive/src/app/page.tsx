"use client";

import { Card, CardContent } from "@zerotheft/shared-ui";
import { Button } from "@zerotheft/shared-ui";
import { Video, Activity, VideoOff, CreditCard, Plus, ArrowUpRight, FileText, Eye } from "lucide-react";
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
  { label: "Total Cameras", value: "24", change: "+2 this month", icon: Video, color: "bg-blue-100 text-blue-600" },
  { label: "Active Cameras", value: "23", change: "", icon: Activity, color: "bg-emerald-100 text-emerald-600" },
  { label: "Offline Cameras", value: "1", change: "", icon: VideoOff, color: "bg-red-100 text-red-600" },
  { label: "Current Plan", value: "Gold", change: "", icon: CreditCard, color: "bg-amber-100 text-amber-600" },
];

const chartData = [
  { time: "00:00", value: 12 },
  { time: "04:00", value: 8 },
  { time: "08:00", value: 15 },
  { time: "12:00", value: 22 },
  { time: "16:00", value: 28 },
  { time: "20:00", value: 18 },
  { time: "23:59", value: 14 },
];

const recentAlerts = [
  { title: "Entrance Cam 01", desc: "Motion Detected", time: "2 mins ago", color: "bg-amber-500" },
  { title: "Parking Lot 03", desc: "Unusual Activity", time: "15 mins ago", color: "bg-red-500" },
  { title: "Lobby Cam 02", desc: "Person Detected", time: "32 mins ago", color: "bg-emerald-500" },
  { title: "Back Exit 04", desc: "Door Open", time: "1 hour ago", color: "bg-amber-500" },
];

const recentActivity = [
  { title: "Camera 12 - Building A went offline", time: "5 minutes ago", color: "bg-red-500" },
  { title: "Camera 8 - Main Entrance reconnected", time: "2 hours ago", color: "bg-emerald-500" },
  { title: "New camera added: Camera 24", time: "3 hours ago", color: "bg-blue-500" },
  { title: "Subscription upgraded to Gold plan", time: "1 day ago", color: "bg-blue-500" },
  { title: "Payment successful - $299.00", time: "2 days ago", color: "bg-emerald-500" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:hidden">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
      </div>
      <div className="hidden md:flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500 mt-1">Welcome back! Here&apos;s what&apos;s happening with your security cameras.</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-[#ff6b47] hover:bg-[#e55a3a] text-white">
            <Plus className="w-4 h-4 mr-2" /> Add Camera
          </Button>
          <Button variant="outline" className="border-gray-300">
            <ArrowUpRight className="w-4 h-4 mr-2" /> Upgrade Plan
          </Button>
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

      {/* Chart + Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2 border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Camera Uptime Trend (Last 7 Days)</h3>
              <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="time" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={{ r: 4, fill: "#10b981" }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className={`w-2 h-2 rounded-full ${item.color} mt-1.5 shrink-0`} />
                  <div>
                    <p className="text-sm text-gray-900">{item.title}</p>
                    <p className="text-xs text-gray-400">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4 bg-[#1e2330] hover:bg-[#2a3040] text-white">
              <Eye className="w-4 h-4 mr-2" /> View All Alerts
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Alerts + Quick Actions */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2 border-0 shadow-sm">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Recent Alerts</h3>
            <div className="space-y-3">
              {recentAlerts.map((alert, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                  <div className={`w-2 h-2 rounded-full ${alert.color}`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{alert.title}</p>
                    <p className="text-xs text-gray-500">{alert.desc} • {alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button className="w-full bg-[#ff6b47] hover:bg-[#e55a3a] text-white">
                <Plus className="w-4 h-4 mr-2" /> Add New Camera
              </Button>
              <Button variant="outline" className="w-full border-gray-300">
                <ArrowUpRight className="w-4 h-4 mr-2" /> Upgrade Plan
              </Button>
              <Button variant="outline" className="w-full border-gray-300">
                <FileText className="w-4 h-4 mr-2" /> Generate Report
              </Button>
              <Button variant="outline" className="w-full border-gray-300">
                <Eye className="w-4 h-4 mr-2" /> View All Cameras
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alert Summary */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Alert Summary (Last 30 Days)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-gray-50">
              <p className="text-sm text-gray-500">Total Alerts</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">127</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-50">
              <p className="text-sm text-gray-500">Critical Alerts</p>
              <p className="text-2xl font-bold text-red-600 mt-1">8</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-50">
              <p className="text-sm text-gray-500">Resolved</p>
              <p className="text-2xl font-bold text-emerald-600 mt-1">119</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
