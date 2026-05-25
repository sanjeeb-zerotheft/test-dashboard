"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@zerotheft/shared-ui";
import { Badge } from "@zerotheft/shared-ui";
import { Button } from "@zerotheft/shared-ui";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@zerotheft/shared-ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@zerotheft/shared-ui";
import { Input } from "@zerotheft/shared-ui";
import { Label } from "@zerotheft/shared-ui";
import { Plus, Save, Play, FileText, Clock } from "lucide-react";
import { useState } from "react";

const rules = [
  {
    name: "After-Hours Detection",
    status: "ACTIVE",
    priority: "High",
    conditions: 3,
    actions: 2,
    lastTriggered: "2 hours ago",
  },
  {
    name: "Loitering Detection",
    status: "ACTIVE",
    priority: "Medium",
    conditions: 2,
    actions: 1,
    lastTriggered: "5 min ago",
  },
  {
    name: "Crowd Detection",
    status: "ACTIVE",
    priority: "Medium",
    conditions: 2,
    actions: 2,
    lastTriggered: "1 hour ago",
  },
  {
    name: "Vehicle Tracking",
    status: "INACTIVE",
    priority: "Low",
    conditions: 1,
    actions: 1,
    lastTriggered: "3 days ago",
  },
];

const ruleTemplates = [
  "After-Hours Detection",
  "Loitering Detection",
  "Crowd Detection",
  "Vehicle Tracking",
  "Unauthorized Access",
  "Perimeter Breach",
];

export default function RulesPage() {
  const [builderOpen, setBuilderOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rules & Policies</h1>
          <p className="text-gray-500 mt-1">Configure detection rules and automation policies</p>
        </div>
        <Dialog open={builderOpen} onOpenChange={setBuilderOpen}>
          <DialogTrigger className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff6b47] hover:bg-[#e55a3a] text-white text-sm font-medium rounded-md transition-colors">
            <Plus className="w-4 h-4" />
            New Rule
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Rule Builder</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label className="text-xs">Rule Name</Label>
                <Input placeholder="Enter rule name..." />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Priority</Label>
                <Select defaultValue="critical">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* IF Conditions */}
              <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 space-y-3">
                <h3 className="font-semibold text-sm text-amber-700">IF</h3>
                <div className="space-y-2">
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select condition type..." /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="motion">Motion Detected</SelectItem>
                      <SelectItem value="person">Person Detected</SelectItem>
                      <SelectItem value="vehicle">Vehicle Detected</SelectItem>
                      <SelectItem value="time">Time Condition</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="outline" className="w-full gap-2 bg-[#3b4a5e] text-white border-0 hover:bg-[#2d3a4d]">
                  <Plus className="w-4 h-4" />
                  Add Condition
                </Button>
              </div>

              {/* THEN Actions */}
              <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 space-y-3">
                <h3 className="font-semibold text-sm text-blue-700">THEN</h3>
                <div className="space-y-2">
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select action..." /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alert">Send Alert</SelectItem>
                      <SelectItem value="record">Start Recording</SelectItem>
                      <SelectItem value="notify">Notify Team</SelectItem>
                      <SelectItem value="escalate">Escalate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="outline" className="w-full gap-2 bg-[#3b4a5e] text-white border-0 hover:bg-[#2d3a4d]">
                  <Plus className="w-4 h-4" />
                  Add Action
                </Button>
              </div>

              <Button className="w-full bg-[#ff6b47] hover:bg-[#e55a3a] text-white gap-2">
                <Save className="w-4 h-4" />
                Save Rule
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Rules List */}
        <div className="xl:col-span-2 space-y-4">
          {rules.map((rule) => (
            <Card key={rule.name} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{rule.name}</h3>
                    <Badge
                      className={
                        rule.status === "ACTIVE"
                          ? "bg-emerald-500 text-white text-[10px]"
                          : "bg-gray-500 text-white text-[10px]"
                      }
                    >
                      {rule.status}
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm" className="h-7 text-xs">
                    Edit
                  </Button>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <span>Priority: <span className="font-medium text-gray-700">{rule.priority}</span></span>
                  <span>Conditions: <span className="font-medium text-gray-700">{rule.conditions}</span></span>
                  <span>Actions: <span className="font-medium text-gray-700">{rule.actions}</span></span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{rule.lastTriggered}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Rule Templates */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Rule Templates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {ruleTemplates.map((template) => (
              <div
                key={template}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <FileText className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-700">{template}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
