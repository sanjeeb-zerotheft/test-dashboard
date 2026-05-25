"use client";

import { useState } from "react";
import { Card, CardContent, Badge, Input } from "@zerotheft/shared-ui";
import {
  Search,
  Filter,
  RefreshCw,
  AlertTriangle,
  Info,
  XCircle,
  Clock,
  Camera,
  MapPin,
} from "lucide-react";

interface Alert {
  id: string;
  cameraName: string;
  location: string;
  severity: "critical" | "warning" | "info";
  description: string;
  time: string;
  status: "active" | "resolved";
}

const alertsData: Alert[] = [
  {
    id: "1",
    cameraName: "Camera A-101",
    location: "North Entrance",
    severity: "critical",
    description: "Motion detected in restricted area",
    time: "2 min ago",
    status: "active",
  },
  {
    id: "2",
    cameraName: "Camera B-203",
    location: "Parking Lot B",
    severity: "warning",
    description: "Low battery warning",
    time: "15 min ago",
    status: "active",
  },
  {
    id: "3",
    cameraName: "Camera C-305",
    location: "South Wing",
    severity: "info",
    description: "Connection restored",
    time: "1 hour ago",
    status: "resolved",
  },
  {
    id: "4",
    cameraName: "Camera D-407",
    location: "Main Lobby",
    severity: "critical",
    description: "Camera offline - no signal",
    time: "2 hours ago",
    status: "active",
  },
  {
    id: "5",
    cameraName: "Camera E-509",
    location: "East Corridor",
    severity: "warning",
    description: "Unusual activity pattern detected",
    time: "3 hours ago",
    status: "active",
  },
  {
    id: "6",
    cameraName: "Camera F-612",
    location: "West Stairwell",
    severity: "info",
    description: "Firmware update completed",
    time: "5 hours ago",
    status: "resolved",
  },
  {
    id: "7",
    cameraName: "Camera A-101",
    location: "North Entrance",
    severity: "warning",
    description: "Poor signal strength",
    time: "8 hours ago",
    status: "resolved",
  },
];

const severityConfig = {
  critical: {
    borderColor: "border-l-red-500",
    badgeBg: "bg-red-100 text-red-700 hover:bg-red-100",
    badgeVariant: "destructive" as const,
    icon: XCircle,
    iconColor: "text-red-500",
  },
  warning: {
    borderColor: "border-l-amber-500",
    badgeBg: "bg-amber-100 text-amber-700 hover:bg-amber-100",
    badgeVariant: "secondary" as const,
    icon: AlertTriangle,
    iconColor: "text-amber-500",
  },
  info: {
    borderColor: "border-l-blue-500",
    badgeBg: "bg-blue-100 text-blue-700 hover:bg-blue-100",
    badgeVariant: "secondary" as const,
    icon: Info,
    iconColor: "text-blue-500",
  },
};

export default function AlertsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const activeCount = alertsData.filter((a) => a.status === "active").length;

  const filteredAlerts = alertsData.filter(
    (alert) =>
      alert.cameraName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-gray-900">Alerts</h1>
        <p className="text-gray-500 text-sm">{activeCount} active alerts</p>
      </div>

      {/* Search + Actions */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search alerts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-white border-gray-200"
          />
        </div>
        <button
          onClick={handleRefresh}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white shrink-0"
        >
          <RefreshCw
            className={`w-4 h-4 text-gray-500 ${
              isRefreshing ? "animate-spin" : ""
            }`}
          />
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white shrink-0">
          <Filter className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Alert Cards */}
      <div className="flex flex-col gap-3">
        {filteredAlerts.map((alert) => {
          const config = severityConfig[alert.severity];
          const SeverityIcon = config.icon;

          return (
            <Card
              key={alert.id}
              className={`border-0 shadow-sm bg-white overflow-hidden border-l-4 ${config.borderColor}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <SeverityIcon className={`w-5 h-5 ${config.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    {/* Top Row: Camera + Severity + Status */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2 min-w-0">
                        <Camera className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span className="text-sm font-semibold text-gray-900 truncate">
                          {alert.cameraName}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Badge
                          variant={config.badgeVariant}
                          className={`text-xs capitalize ${config.badgeBg}`}
                        >
                          {alert.severity}
                        </Badge>
                        <span
                          className={`w-2 h-2 rounded-full ${
                            alert.status === "active"
                              ? "bg-emerald-500"
                              : "bg-gray-300"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-1.5 mt-1">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500">
                        {alert.location}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-700 mt-2">
                      {alert.description}
                    </p>

                    {/* Time */}
                    <div className="flex items-center gap-1.5 mt-2">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-400">{alert.time}</span>
                      <span className="text-xs text-gray-300">•</span>
                      <span
                        className={`text-xs font-medium ${
                          alert.status === "active"
                            ? "text-emerald-600"
                            : "text-gray-500"
                        }`}
                      >
                        {alert.status === "active" ? "Active" : "Resolved"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredAlerts.length === 0 && (
        <div className="text-center py-12">
          <Info className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No alerts found</p>
        </div>
      )}
    </div>
  );
}
