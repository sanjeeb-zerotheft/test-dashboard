"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Camera, Wifi, HardDrive, AlertTriangle, CheckCircle2 } from "lucide-react";

const cameras = [
  { name: "Parking Lot 3", status: "online", uptime: 99.9, storage: 78, health: 95 },
  { name: "Main Entrance", status: "online", uptime: 99.5, storage: 65, health: 92 },
  { name: "Server Room", status: "online", uptime: 99.8, storage: 82, health: 98 },
  { name: "Warehouse A", status: "warning", uptime: 97.2, storage: 45, health: 78 },
  { name: "Warehouse B", status: "online", uptime: 99.6, storage: 70, health: 94 },
  { name: "Reception Area", status: "online", uptime: 99.4, storage: 55, health: 90 },
  { name: "Loading Dock", status: "offline", uptime: 85.3, storage: 30, health: 45 },
  { name: "Employee Entrance", status: "online", uptime: 99.7, storage: 60, health: 93 },
  { name: "Cafeteria", status: "online", uptime: 99.3, storage: 50, health: 88 },
];

const healthStats = [
  { label: "Total Cameras", value: 24, icon: Camera, color: "bg-blue-500" },
  { label: "Online", value: 22, icon: CheckCircle2, color: "bg-emerald-500" },
  { label: "Warnings", value: 1, icon: AlertTriangle, color: "bg-amber-500" },
  { label: "Offline", value: 1, icon: Wifi, color: "bg-red-500" },
];

function getStatusBadge(status: string) {
  switch (status) {
    case "online":
      return <Badge className="bg-emerald-500 text-white text-[10px]">ONLINE</Badge>;
    case "warning":
      return <Badge className="bg-amber-500 text-white text-[10px]">WARNING</Badge>;
    case "offline":
      return <Badge className="bg-red-500 text-white text-[10px]">OFFLINE</Badge>;
    default:
      return <Badge className="bg-gray-500 text-white text-[10px]">{status}</Badge>;
  }
}

function getHealthColor(health: number) {
  if (health >= 90) return "bg-emerald-500";
  if (health >= 70) return "bg-amber-500";
  return "bg-red-500";
}

export default function CameraHealthPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Camera Health</h1>
          <p className="text-gray-500 mt-1">Monitor camera status and performance</p>
        </div>
        <Button className="bg-[#ff6b47] hover:bg-[#e55a3a] text-white gap-2">
          <Camera className="w-4 h-4" />
          Run Diagnostics
        </Button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {healthStats.map((stat) => (
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

      {/* Camera Health Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cameras.map((camera) => (
          <Card key={camera.name} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-gray-500" />
                  <span className="font-medium text-gray-900 text-sm">{camera.name}</span>
                </div>
                {getStatusBadge(camera.status)}
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">Health Score</span>
                    <span className="text-xs font-medium text-gray-900">{camera.health}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${getHealthColor(camera.health)} rounded-full transition-all`} style={{ width: `${camera.health}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">Uptime</span>
                    <span className="text-xs font-medium text-gray-900">{camera.uptime}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${camera.uptime}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">Storage Used</span>
                    <span className="text-xs font-medium text-gray-900">{camera.storage}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full transition-all" style={{ width: `${camera.storage}%` }} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
