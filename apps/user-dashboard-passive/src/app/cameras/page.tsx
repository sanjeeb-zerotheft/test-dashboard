"use client";

import { useState } from "react";
import { Card, CardContent, Button, Badge, Input } from "@zerotheft/shared-ui";
import {
  Search,
  Filter,
  Grid3X3,
  List,
  Video,
  CheckCircle2,
  XCircle,
  Settings,
  Eye,
  Plus,
  ChevronDown,
  ChevronUp,
  Clock,
  Activity,
} from "lucide-react";

interface Camera {
  id: string;
  name: string;
  location: string;
  status: "active" | "offline";
  lastSeen: string;
  uptime: string;
}

const camerasData: Camera[] = [
  {
    id: "A-101",
    name: "Camera A-101",
    location: "North Entrance",
    status: "active",
    lastSeen: "30 sec ago",
    uptime: "99.8%",
  },
  {
    id: "C-305",
    name: "Camera C-305",
    location: "South Wing",
    status: "active",
    lastSeen: "1 min ago",
    uptime: "100%",
  },
  {
    id: "D-407",
    name: "Camera D-407",
    location: "Main Lobby",
    status: "offline",
    lastSeen: "2 hours ago",
    uptime: "85.5%",
  },
  {
    id: "E-509",
    name: "Camera E-509",
    location: "East Corridor",
    status: "active",
    lastSeen: "45 sec ago",
    uptime: "98.9%",
  },
  {
    id: "B-203",
    name: "Camera B-203",
    location: "Parking Lot B",
    status: "active",
    lastSeen: "2 min ago",
    uptime: "97.4%",
  },
  {
    id: "F-612",
    name: "Camera F-612",
    location: "West Stairwell",
    status: "active",
    lastSeen: "10 sec ago",
    uptime: "99.2%",
  },
  {
    id: "G-718",
    name: "Camera G-718",
    location: "Loading Dock",
    status: "offline",
    lastSeen: "5 hours ago",
    uptime: "72.3%",
  },
  {
    id: "H-824",
    name: "Camera H-824",
    location: "Rooftop Access",
    status: "active",
    lastSeen: "1 min ago",
    uptime: "96.7%",
  },
];

export default function CamerasPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  const onlineCount = camerasData.filter((c) => c.status === "active").length;

  const filteredCameras = camerasData.filter(
    (camera) =>
      camera.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      camera.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleExpanded = (id: string) => {
    setExpandedCards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="space-y-4 md:space-y-6 relative pb-20">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-gray-900">Cameras</h1>
        <p className="text-gray-500 text-sm">
          {onlineCount} of {camerasData.length} cameras online
        </p>
      </div>

      {/* Search + View Toggle */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search cameras..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-white border-gray-200"
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          className="border-gray-200 bg-white shrink-0"
        >
          <Filter className="w-4 h-4 text-gray-500" />
        </Button>
        <div className="hidden sm:flex items-center bg-white rounded-lg border border-gray-200 p-0.5 shrink-0">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setViewMode("grid")}
            className={viewMode === "grid" ? "bg-gray-100" : ""}
          >
            <Grid3X3 className="w-4 h-4 text-gray-500" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setViewMode("list")}
            className={viewMode === "list" ? "bg-gray-100" : ""}
          >
            <List className="w-4 h-4 text-gray-500" />
          </Button>
        </div>
      </div>

      {/* Camera Cards */}
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            : "flex flex-col gap-3"
        }
      >
        {filteredCameras.map((camera) => {
          const isExpanded = expandedCards.has(camera.id);
          return (
            <Card
              key={camera.id}
              className="border-0 shadow-sm bg-white overflow-hidden"
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                      camera.status === "active"
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    <Video className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-semibold text-gray-900 text-sm truncate">
                        {camera.name}
                      </h3>
                      {camera.status === "active" ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {camera.location}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge
                        variant={
                          camera.status === "active"
                            ? "secondary"
                            : "destructive"
                        }
                        className={
                          camera.status === "active"
                            ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                            : "bg-red-100 text-red-700 hover:bg-red-100"
                        }
                      >
                        {camera.status === "active" ? "Active" : "Offline"}
                      </Badge>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {camera.lastSeen}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Expandable Details */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-gray-100 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5" />
                        Uptime
                      </span>
                      <span className="font-medium text-gray-900">
                        {camera.uptime}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Camera ID</span>
                      <span className="font-medium text-gray-900">
                        {camera.id}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Stream Quality</span>
                      <span className="font-medium text-gray-900">
                        1080p HD
                      </span>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2 mt-3">
                  <Button
                    size="sm"
                    className="flex-1 bg-[#ff6b47] hover:bg-[#e55a3a] text-white h-8 text-xs"
                  >
                    <Eye className="w-3.5 h-3.5 mr-1" />
                    View Feed
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-gray-200 h-8 text-xs"
                  >
                    <Settings className="w-3.5 h-3.5 mr-1" />
                    Settings
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => toggleExpanded(camera.id)}
                    className="shrink-0 h-8 w-8"
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredCameras.length === 0 && (
        <div className="text-center py-12">
          <Video className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No cameras found</p>
        </div>
      )}

      {/* FAB */}
      <Button
        size="icon-lg"
        className="fixed bottom-20 right-4 md:bottom-8 md:right-8 bg-[#ff6b47] hover:bg-[#e55a3a] text-white rounded-full shadow-lg w-14 h-14 z-50"
      >
        <Plus className="w-6 h-6" />
      </Button>
    </div>
  );
}
