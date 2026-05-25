"use client";

import { useState } from "react";
import { Card, CardContent } from "@zerotheft/shared-ui";
import {
  AlertTriangle,
  Info,
  MapPin,
  Maximize2,
  Minus,
  Plus,
  Search,
  Filter,
  ChevronDown,
} from "lucide-react";

const riskZones = [
  { id: "A1", risk: "low" }, { id: "A2", risk: "medium" }, { id: "A3", risk: "high" },
  { id: "A4", risk: "low" }, { id: "A5", risk: "medium" }, { id: "A6", risk: "high" },
  { id: "A7", risk: "low" }, { id: "A8", risk: "low" }, { id: "A9", risk: "medium" },
  { id: "A10", risk: "high" }, { id: "A11", risk: "low" }, { id: "A12", risk: "medium" },
  { id: "B1", risk: "high" }, { id: "B2", risk: "low" }, { id: "B3", risk: "medium" },
  { id: "B4", risk: "low" }, { id: "B5", risk: "high" }, { id: "B6", risk: "medium" },
  { id: "B7", risk: "low" }, { id: "B8", risk: "high" }, { id: "B9", risk: "medium" },
  { id: "B10", risk: "low" }, { id: "B11", risk: "high" }, { id: "B12", risk: "low" },
  { id: "C1", risk: "medium" }, { id: "C2", risk: "high" }, { id: "C3", risk: "high" },
  { id: "C4", risk: "medium" }, { id: "C5", risk: "low" }, { id: "C6", risk: "high" },
  { id: "C7", risk: "medium" }, { id: "C8", risk: "high" }, { id: "C9", risk: "low" },
  { id: "C10", risk: "medium" }, { id: "C11", risk: "high" }, { id: "C12", risk: "high" },
  { id: "D1", risk: "low" }, { id: "D2", risk: "medium" }, { id: "D3", risk: "low" },
  { id: "D4", risk: "high" }, { id: "D5", risk: "medium" }, { id: "D6", risk: "low" },
  { id: "D7", risk: "high" }, { id: "D8", risk: "medium" }, { id: "D9", risk: "low" },
  { id: "D10", risk: "high" }, { id: "D11", risk: "medium" }, { id: "D12", risk: "low" },
  { id: "E1", risk: "low" }, { id: "E2", risk: "low" }, { id: "E3", risk: "medium" },
  { id: "E4", risk: "high" }, { id: "E5", risk: "low" }, { id: "E6", risk: "medium" },
  { id: "E7", risk: "high" }, { id: "E8", risk: "low" }, { id: "E9", risk: "medium" },
  { id: "E10", risk: "low" }, { id: "E11", risk: "high" }, { id: "E12", risk: "medium" },
  { id: "F1", risk: "high" }, { id: "F2", risk: "medium" }, { id: "F3", risk: "low" },
  { id: "F4", risk: "high" }, { id: "F5", risk: "medium" }, { id: "F6", risk: "low" },
  { id: "F7", risk: "low" }, { id: "F8", risk: "medium" }, { id: "F9", risk: "high" },
  { id: "F10", risk: "low" }, { id: "F11", risk: "medium" }, { id: "F12", risk: "high" },
  { id: "G1", risk: "medium" }, { id: "G2", risk: "low" }, { id: "G3", risk: "high" },
  { id: "G4", risk: "medium" }, { id: "G5", risk: "low" }, { id: "G6", risk: "high" },
  { id: "G7", risk: "low" }, { id: "G8", risk: "medium" }, { id: "G9", risk: "high" },
  { id: "G10", risk: "low" }, { id: "G11", risk: "medium" }, { id: "G12", risk: "low" },
  { id: "H1", risk: "low" }, { id: "H2", risk: "medium" }, { id: "H3", risk: "low" },
  { id: "H4", risk: "high" }, { id: "H5", risk: "medium" }, { id: "H6", risk: "low" },
  { id: "H7", risk: "low" }, { id: "H8", risk: "high" }, { id: "H9", risk: "medium" },
  { id: "H10", risk: "low" }, { id: "H11", risk: "high" }, { id: "H12", risk: "medium" },
];

const riskColors: Record<string, string> = {
  low: "bg-green-500",
  medium: "bg-orange-400",
  high: "bg-red-500",
};

const riskLabels: Record<string, string> = {
  low: "Low Risk",
  medium: "Medium Risk",
  high: "High Risk",
};

const zoneList = [
  { name: "Parking Structure - Level 3", risk: "high", incidents: 87 },
  { name: "Back Exit Area", risk: "high", incidents: 65 },
  { name: "Loading Dock", risk: "medium", incidents: 42 },
  { name: "Side Entrance", risk: "medium", incidents: 38 },
  { name: "Front Lobby", risk: "low", incidents: 12 },
];

export default function RiskHeatmapPage() {
  const [zoom, setZoom] = useState(100);

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span>Analytics</span>
        <span className="text-gray-300">&gt;</span>
        <span className="text-gray-900 font-medium">Risk Heatmap</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Predicted Heatmap & Risk Zones</h1>
          <p className="text-gray-500 mt-1">Visualize risk intensity across geographic areas</p>
        </div>
        <span className="text-sm text-gray-400">Last updated: 2/26/2026</span>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl p-5 text-white" style={{ background: "linear-gradient(135deg, #ef4444, #dc2626)" }}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-white/80 text-sm">Highest Risk Zone</p>
              <p className="text-2xl font-bold mt-1">Zone C12</p>
              <p className="text-white/70 text-sm mt-1">99.8% risk score</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        <div className="rounded-xl p-5 text-white" style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-white/80 text-sm">Average Risk Score</p>
              <p className="text-2xl font-bold mt-1">52.9%</p>
              <p className="text-white/70 text-sm mt-1">Across all zones</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
              <Info className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        <div className="rounded-xl p-5 text-white" style={{ background: "linear-gradient(135deg, #3b82f6, #2563eb)" }}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-white/80 text-sm">Critical Zones</p>
              <p className="text-2xl font-bold mt-1">22</p>
              <p className="text-white/70 text-sm mt-1">Risk ≥ 80%</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        <div className="rounded-xl p-5 text-white" style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)" }}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-white/80 text-sm">Area Coverage</p>
              <p className="text-2xl font-bold mt-1">96</p>
              <p className="text-white/70 text-sm mt-1">Total zones monitored</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
              <Maximize2 className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filters:</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Risk Type:</span>
              <button className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                All Types <ChevronDown className="w-3 h-3" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Period:</span>
              <button className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                Last 7 days <ChevronDown className="w-3 h-3" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Threshold:</span>
              <button className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                All Levels <ChevronDown className="w-3 h-3" />
              </button>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={() => setZoom(Math.max(50, zoom - 10))}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-sm text-gray-600 w-10 text-center">{zoom}%</span>
              <button
                onClick={() => setZoom(Math.min(150, zoom + 10))}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Heatmap + Sidebar */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Heatmap Grid */}
        <Card className="xl:col-span-3 border-0 shadow-sm">
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Risk Intensity Heatmap</h3>
            <div
              className="overflow-auto"
              style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top left" }}
            >
              <div className="grid grid-cols-12 gap-1 min-w-[600px]">
                {riskZones.map((zone) => (
                  <div
                    key={zone.id}
                    className={`aspect-square rounded-md ${riskColors[zone.risk]} flex items-center justify-center text-white text-xs font-medium cursor-pointer hover:opacity-80 transition-opacity`}
                    title={`${zone.id} - ${riskLabels[zone.risk]}`}
                  >
                    {zone.id}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Sidebar */}
        <div className="space-y-4">
          {/* Risk Legend */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Risk Legend</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded bg-green-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Low</p>
                    <p className="text-xs text-gray-400">0-20%</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded bg-orange-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Medium</p>
                    <p className="text-xs text-gray-400">40-60%</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded bg-red-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">High</p>
                    <p className="text-xs text-gray-400">80-100%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Low Risk:</span>
                  <span className="text-sm font-medium text-green-600">16</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Medium Risk:</span>
                  <span className="text-sm font-medium text-orange-500">14</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">High Risk:</span>
                  <span className="text-sm font-medium text-red-500">22</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Critical Risk:</span>
                  <span className="text-sm font-medium text-red-600">22</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hover tip */}
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-800">Hover over zones</p>
                <p className="text-xs text-blue-600 mt-0.5">
                  Click and hover over any zone to view detailed risk information and incident counts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Zones List */}
      <Card className="border-0 shadow-sm xl:hidden">
        <CardContent className="p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Risk Zones</h3>
          <div className="space-y-3">
            {zoneList.map((zone) => (
              <div key={zone.name} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div>
                  <p className="text-sm font-medium text-gray-900">{zone.name}</p>
                  <p className="text-xs text-gray-400">{zone.incidents} incidents this week</p>
                </div>
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                  zone.risk === "high"
                    ? "bg-red-100 text-red-700"
                    : zone.risk === "medium"
                    ? "bg-orange-100 text-orange-700"
                    : "bg-green-100 text-green-700"
                }`}>
                  {riskLabels[zone.risk]}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card className="border-0 shadow-sm xl:hidden">
        <CardContent className="p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Summary</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">High Risk Zones</span>
              <span className="text-sm font-medium text-red-500">2</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Medium Risk Zones</span>
              <span className="text-sm font-medium text-orange-500">2</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Low Risk Zones</span>
              <span className="text-sm font-medium text-green-500">1</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
