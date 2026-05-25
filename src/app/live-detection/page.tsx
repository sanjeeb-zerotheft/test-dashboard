"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@zerotheft/shared-ui";
import { Badge } from "@zerotheft/shared-ui";
import { Switch } from "@zerotheft/shared-ui";
import { Button } from "@zerotheft/shared-ui";
import { RefreshCw } from "lucide-react";
import { useState } from "react";

const detectionStats = [
  { label: "Total Detections", value: "1,247" },
  { label: "True Positives", value: "1,156" },
  { label: "False Positives", value: "91" },
  { label: "Accuracy Rate", value: "92.7%" },
  { label: "Avg Response Time", value: "143ms" },
  { label: "Active Cameras", value: "24" },
];

const detectionModels = [
  {
    name: "Person Detection",
    description: "Detect human presence in frame",
    threshold: 85,
    accuracy: 94,
    active: true,
  },
  {
    name: "Vehicle Detection",
    description: "Identify vehicles and license plates",
    threshold: 80,
    accuracy: 91,
    active: true,
  },
  {
    name: "Face Recognition",
    description: "Match faces against database",
    threshold: 90,
    accuracy: 88,
    active: false,
  },
  {
    name: "Weapon Detection",
    description: "Identify potential weapons",
    threshold: 95,
    accuracy: 96,
    active: true,
  },
  {
    name: "Loitering Detection",
    description: "Detect prolonged presence",
    threshold: 75,
    accuracy: 87,
    active: true,
  },
  {
    name: "Crowd Analysis",
    description: "Analyze crowd density and behavior",
    threshold: 70,
    accuracy: 85,
    active: false,
  },
];

export default function LiveDetectionPage() {
  const [models, setModels] = useState(detectionModels);

  const toggleModel = (index: number) => {
    setModels((prev) =>
      prev.map((m, i) => (i === index ? { ...m, active: !m.active } : m))
    );
  };

  const updateThreshold = (index: number, value: number) => {
    setModels((prev) =>
      prev.map((m, i) => (i === index ? { ...m, threshold: value } : m))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Live Detection Control Panel</h1>
          <p className="text-gray-500 mt-1">Manage AI models and detection parameters</p>
        </div>
        <Button className="bg-[#ff6b47] hover:bg-[#e55a3a] text-white gap-2">
          <RefreshCw className="w-4 h-4" />
          Reload All Models
        </Button>
      </div>

      {/* Detection Statistics */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Detection Statistics (Last 24 Hours)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {detectionStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-xs text-gray-500">{stat.label}</p>
                <p className="text-xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detection Models Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {models.map((model, idx) => (
          <Card key={model.name} className="border-0 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900">{model.name}</h3>
                  <Badge
                    className={
                      model.active
                        ? "bg-emerald-500 text-white text-[10px]"
                        : "bg-gray-500 text-white text-[10px]"
                    }
                  >
                    {model.active ? "ACTIVE" : "INACTIVE"}
                  </Badge>
                </div>
                <Switch
                  checked={model.active}
                  onCheckedChange={() => toggleModel(idx)}
                  className="data-[state=checked]:bg-emerald-500"
                />
              </div>
              <p className="text-sm text-gray-500 mb-4">{model.description}</p>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">Detection Threshold</span>
                    <span className="text-sm font-medium text-gray-900">{model.threshold}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={model.threshold}
                    onChange={(e) => updateThreshold(idx, Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div>
                    <span className="text-xs text-gray-500">Model Accuracy</span>
                    <p className="text-lg font-bold text-gray-900">{model.accuracy}%</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500">Status</span>
                    <div className="flex items-center gap-1.5 mt-1">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          model.active ? "bg-emerald-500" : "bg-gray-400"
                        }`}
                      />
                      <span className="text-sm text-gray-700">
                        {model.active ? "Running" : "Stopped"}
                      </span>
                    </div>
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
