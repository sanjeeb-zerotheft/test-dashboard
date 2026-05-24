"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Camera,
  AlertTriangle,
  ShieldAlert,
  Activity,
  Video,
  Eye,
  X,
} from "lucide-react";

const stats = [
  { label: "Active Cameras", value: "24", icon: Camera, color: "bg-blue-500" },
  { label: "Alerts Today", value: "87", icon: AlertTriangle, color: "bg-amber-500" },
  { label: "Critical Alerts", value: "12", icon: ShieldAlert, color: "bg-red-500" },
  { label: "System Status", value: "98%", icon: Activity, color: "bg-emerald-500" },
];

const cameras = [
  { name: "Parking Lot 3", status: "live" },
  { name: "Main Entrance", status: "live" },
  { name: "Server Room", status: "live" },
  { name: "Warehouse A", status: "live" },
  { name: "Warehouse B", status: "live" },
  { name: "Reception Area", status: "live" },
  { name: "Loading Dock", status: "live" },
  { name: "Employee Entrance", status: "live" },
  { name: "Cafeteria", status: "live" },
];

const alerts = [
  {
    severity: "CRITICAL",
    title: "Intrusion Detected",
    location: "Parking Lot 3",
    time: "2 min ago",
  },
  {
    severity: "WARNING",
    title: "Loitering",
    location: "Main Entrance",
    time: "5 min ago",
  },
  {
    severity: "CRITICAL",
    title: "Unauthorized Access",
    location: "Server Room",
    time: "12 min ago",
  },
  {
    severity: "WARNING",
    title: "Motion Detected",
    location: "Warehouse B",
    time: "18 min ago",
  },
  {
    severity: "INFO",
    title: "Face Recognition",
    location: "Reception Area",
    time: "24 min ago",
  },
];

function getSeverityColor(severity: string) {
  switch (severity) {
    case "CRITICAL":
      return "bg-red-500 text-white";
    case "WARNING":
      return "bg-amber-500 text-white";
    case "INFO":
      return "bg-blue-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Real-time security monitoring and analytics</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-0 shadow-sm">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Camera Grid + Alerts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Camera Grid */}
        <Card className="xl:col-span-2 border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Camera Grid</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {cameras.map((camera) => (
                <div
                  key={camera.name}
                  className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden group"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Video className="w-8 h-8 text-gray-600" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white font-medium">{camera.name}</span>
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="icon" variant="ghost" className="w-7 h-7 bg-black/50 text-white hover:bg-black/70">
                      <Eye className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold">Recent Alerts</CardTitle>
            <Button variant="ghost" size="sm" className="text-[#ff6b47] hover:text-[#ff6b47] hover:bg-[#ff6b47]/10">
              View All
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map((alert, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                <div className="flex items-center justify-between mb-1">
                  <Badge className={`${getSeverityColor(alert.severity)} text-[10px] font-bold`}>
                    {alert.severity}
                  </Badge>
                  <span className="text-xs text-gray-400">{alert.time}</span>
                </div>
                <p className="text-sm font-medium text-gray-900">{alert.title}</p>
                <p className="text-xs text-gray-500">{alert.location}</p>
                <div className="flex gap-2 mt-2">
                  <Button size="sm" className="flex-1 h-8 bg-[#ff6b47] hover:bg-[#e55a3a] text-white text-xs">
                    View
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 h-8 text-xs">
                    Dismiss
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
