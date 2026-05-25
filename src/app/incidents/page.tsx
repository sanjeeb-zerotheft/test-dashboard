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
import { Input } from "@zerotheft/shared-ui";
import { Label } from "@zerotheft/shared-ui";
import { Textarea } from "@zerotheft/shared-ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@zerotheft/shared-ui";
import { FileText, Plus, Calendar, MapPin, User, Eye } from "lucide-react";

const incidents = [
  {
    id: "INC-2024-0015",
    title: "Unauthorized Access Attempt",
    location: "Server Room",
    date: "2024-05-24 14:30",
    severity: "CRITICAL",
    status: "Open",
    assigned: "John Doe",
    description: "Multiple failed access attempts detected at server room entrance.",
  },
  {
    id: "INC-2024-0014",
    title: "Loitering Detected",
    location: "Parking Lot 3",
    date: "2024-05-24 12:15",
    severity: "MEDIUM",
    status: "In Progress",
    assigned: "Jane Smith",
    description: "Individual observed loitering near restricted area for extended period.",
  },
  {
    id: "INC-2024-0013",
    title: "Motion Alert - After Hours",
    location: "Warehouse A",
    date: "2024-05-23 22:45",
    severity: "HIGH",
    status: "Resolved",
    assigned: "Mike Johnson",
    description: "Motion detected in warehouse after business hours. Investigation completed.",
  },
  {
    id: "INC-2024-0012",
    title: "Camera Tampering",
    location: "Loading Dock",
    date: "2024-05-23 18:20",
    severity: "HIGH",
    status: "In Progress",
    assigned: "Sarah Williams",
    description: "Camera feed interrupted. Possible tampering detected.",
  },
  {
    id: "INC-2024-0011",
    title: "False Alarm - Test",
    location: "Main Entrance",
    date: "2024-05-23 10:00",
    severity: "LOW",
    status: "Closed",
    assigned: "John Doe",
    description: "Scheduled system test triggered alarm. Verified as false positive.",
  },
];

function getSeverityBadge(severity: string) {
  switch (severity) {
    case "CRITICAL":
      return <Badge className="bg-red-500 text-white text-[10px]">CRITICAL</Badge>;
    case "HIGH":
      return <Badge className="bg-orange-500 text-white text-[10px]">HIGH</Badge>;
    case "MEDIUM":
      return <Badge className="bg-amber-500 text-white text-[10px]">MEDIUM</Badge>;
    case "LOW":
      return <Badge className="bg-blue-500 text-white text-[10px]">LOW</Badge>;
    default:
      return <Badge className="bg-gray-500 text-white text-[10px]">{severity}</Badge>;
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case "Open":
      return <Badge className="bg-red-500 text-white text-[10px]">OPEN</Badge>;
    case "In Progress":
      return <Badge className="bg-[#ff6b47] text-white text-[10px]">IN PROGRESS</Badge>;
    case "Resolved":
      return <Badge className="bg-emerald-500 text-white text-[10px]">RESOLVED</Badge>;
    case "Closed":
      return <Badge className="bg-gray-500 text-white text-[10px]">CLOSED</Badge>;
    default:
      return <Badge className="bg-gray-500 text-white text-[10px]">{status}</Badge>;
  }
}

export default function IncidentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Incident Report</h1>
          <p className="text-gray-500 mt-1">Manage and track security incidents</p>
        </div>
        <Dialog>
          <DialogTrigger className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff6b47] hover:bg-[#e55a3a] text-white text-sm font-medium rounded-md transition-colors">
            <Plus className="w-4 h-4" />
            New Incident
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Incident</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label className="text-xs">Title</Label>
                <Input placeholder="Incident title" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs">Location</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select location" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="parking">Parking Lot 3</SelectItem>
                      <SelectItem value="entrance">Main Entrance</SelectItem>
                      <SelectItem value="server">Server Room</SelectItem>
                      <SelectItem value="warehouse">Warehouse A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Severity</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select severity" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Description</Label>
                <Textarea placeholder="Describe the incident..." rows={4} />
              </div>
              <Button className="w-full bg-[#ff6b47] hover:bg-[#e55a3a] text-white">Create Incident</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Incident List */}
        <div className="lg:col-span-2 space-y-4">
          {incidents.map((incident) => (
            <Card key={incident.id} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-gray-400">{incident.id}</span>
                    {getSeverityBadge(incident.severity)}
                    {getStatusBadge(incident.status)}
                  </div>
                  <Button size="sm" variant="outline" className="h-7 text-xs">
                    <Eye className="w-3 h-3 mr-1" />
                    View
                  </Button>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{incident.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{incident.description}</p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {incident.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {incident.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {incident.assigned}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary */}
        <div className="space-y-4">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Incident Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "Total Incidents", value: 156, color: "bg-blue-500" },
                { label: "Open", value: 12, color: "bg-red-500" },
                { label: "In Progress", value: 8, color: "bg-[#ff6b47]" },
                { label: "Resolved Today", value: 5, color: "bg-emerald-500" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 ${item.color} rounded-full`} />
                    <span className="text-sm text-gray-700">{item.label}</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900">{item.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Severity Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "Critical", count: 8, total: 156 },
                { label: "High", count: 23, total: 156 },
                { label: "Medium", count: 67, total: 156 },
                { label: "Low", count: 58, total: 156 },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-700">{item.label}</span>
                    <span className="text-sm font-medium text-gray-900">{item.count}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#ff6b47] rounded-full"
                      style={{ width: `${(item.count / item.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
