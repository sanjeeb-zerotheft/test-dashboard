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
import { Checkbox } from "@zerotheft/shared-ui";
import {
  Plus,
  ChevronRight,
  Users,
  Play,
  Clock,
  X,
} from "lucide-react";
import { useState } from "react";

const escalationRules = [
  {
    name: "Critical Intrusion Protocol",
    status: "ACTIVE",
    trigger: "Intrusion + Critical Severity",
    tiers: ["Tier 1: Security Team", "Tier 2: Security Manager", "Tier 3: Operations Director"],
    logic: "IF Intrusion + Critical Severity THEN Escalate to Security Team",
  },
  {
    name: "After Hours Alert",
    status: "ACTIVE",
    trigger: "Any Alert + Outside Business Hours",
    tiers: ["Tier 1: On-Call Team", "Tier 2: Duty Manager"],
    logic: "IF Any Alert + Outside Business Hours THEN Escalate to On-Call Team",
  },
  {
    name: "Server Room Access",
    status: "INACTIVE",
    trigger: "Unauthorized Access + Server Room",
    tiers: ["Tier 1: IT Security", "Tier 2: IT Manager", "Tier 3: CTO"],
    logic: "IF Unauthorized Access + Server Room THEN Escalate to IT Security",
  },
];

const contacts = [
  { name: "Security Team", type: "Group", members: "8 members" },
  { name: "Security Manager", type: "Individual", members: "1 member" },
  { name: "Operations Director", type: "Individual", members: "1 member" },
  { name: "On-Call Team", type: "Group", members: "4 members" },
];

const recentEscalations = [
  { name: "Critical Intrusion Protocol", time: "15 min ago", status: "resolved" },
  { name: "After Hours Alert", time: "2 hours ago", status: "active" },
  { name: "System Performance Degradation", time: "5 minutes ago", status: "investigating" },
];

function getStatusBadge(status: string) {
  switch (status) {
    case "resolved":
      return <Badge className="bg-emerald-500 text-white text-[10px]">resolved</Badge>;
    case "active":
      return <Badge className="bg-[#ff6b47] text-white text-[10px]">active</Badge>;
    case "investigating":
      return <Badge className="bg-blue-500 text-white text-[10px]">investigating</Badge>;
    default:
      return <Badge className="bg-gray-500 text-white text-[10px]">{status}</Badge>;
  }
}

export default function EscalationPage() {
  const [addOpen, setAddOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Escalation Manager</h1>
          <p className="text-gray-500 mt-1">Configure alert escalation rules and protocols</p>
        </div>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff6b47] hover:bg-[#e55a3a] text-white text-sm font-medium rounded-md transition-colors">
            <Plus className="w-4 h-4" />
            Add Rule
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add Escalation Rules</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="p-4 rounded-lg bg-gray-50 space-y-3">
                <h3 className="font-semibold text-sm">IF Condition</h3>
                <div className="space-y-2">
                  <Label className="text-xs">Alert Severity</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select alert severity" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Alert Type</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select alert type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="intrusion">Intrusion</SelectItem>
                      <SelectItem value="unauthorized">Unauthorized Access</SelectItem>
                      <SelectItem value="motion">Motion</SelectItem>
                      <SelectItem value="loitering">Loitering</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Time Window (no response)</Label>
                  <Input type="number" defaultValue="5" />
                </div>
              </div>

              <div className="p-4 rounded-lg bg-gray-50 space-y-3">
                <h3 className="font-semibold text-sm">THEN Action</h3>
                <div className="space-y-2">
                  <Label className="text-xs">Escalate to Tier</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select tier" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tier1">Tier 1</SelectItem>
                      <SelectItem value="tier2">Tier 2</SelectItem>
                      <SelectItem value="tier3">Tier 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Notification Method</Label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox id="sms" defaultChecked />
                      <Label htmlFor="sms" className="text-sm">SMS</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="email" />
                      <Label htmlFor="email" className="text-sm">Email</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="phone" />
                      <Label htmlFor="phone" className="text-sm">Phone Call</Label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 bg-[#ff6b47] hover:bg-[#e55a3a] text-white">Save Rule</Button>
                <Button variant="outline" className="flex-1">Test Simulation</Button>
              </div>

              <div className="p-4 rounded-lg bg-gray-50 space-y-2">
                <h3 className="font-semibold text-sm">Simulation Preview</h3>
                <div className="space-y-1.5 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5" />
                    <span>Critical alert detected at 14:00</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5" />
                    <span>Tier 1 notified (SMS + Email)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5" />
                    <span>Wait 5 minutes...</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ff6b47] mt-1.5" />
                    <span>No response - Escalate to Tier 2</span>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Escalation Rules */}
        <div className="xl:col-span-2 space-y-4">
          {escalationRules.map((rule) => (
            <Card key={rule.name} className="border-0 shadow-sm">
              <CardContent className="p-5">
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
                <p className="text-sm text-gray-500 mb-4">Trigger: {rule.trigger}</p>

                <div className="mb-4">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Escalation Tiers</p>
                  <div className="flex flex-wrap items-center gap-2">
                    {rule.tiers.map((tier, i) => (
                      <div key={tier} className="flex items-center gap-2">
                        <Badge className="bg-[#3b82f6] text-white text-xs font-normal">{tier}</Badge>
                        {i < rule.tiers.length - 1 && <ChevronRight className="w-4 h-4 text-gray-400" />}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Rule Logic</p>
                  <div className="flex items-center gap-2 text-sm">
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-xs">IF</Badge>
                    <span className="text-gray-700">{rule.logic.split("THEN")[0].replace("IF ", "")}</span>
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-xs">THEN</Badge>
                    <span className="text-gray-700">{rule.logic.split("THEN")[1]?.trim()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4">
          {/* Contact List */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-base font-semibold">Contact List</CardTitle>
              <Button size="icon" variant="outline" className="w-7 h-7">
                <Plus className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-2">
              {contacts.map((contact) => (
                <div key={contact.name} className="flex items-center gap-3 p-2.5 rounded-lg bg-gray-50">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{contact.name}</p>
                    <p className="text-xs text-gray-500">
                      {contact.type} &bull; {contact.members}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Simulation Preview */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Simulation Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-500">Test how an alert would escalate through the system</p>
              <Select defaultValue="high">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="critical">Priority: Critical</SelectItem>
                  <SelectItem value="high">Priority: High</SelectItem>
                  <SelectItem value="medium">Priority: Medium</SelectItem>
                  <SelectItem value="low">Priority: Low</SelectItem>
                </SelectContent>
              </Select>
              <Button className="w-full bg-[#ff6b47] hover:bg-[#e55a3a] text-white gap-2">
                <Play className="w-4 h-4" />
                Run Simulation
              </Button>
            </CardContent>
          </Card>

          {/* Recent Escalations */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Recent Escalations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentEscalations.map((esc) => (
                <div key={esc.name} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{esc.name}</p>
                    <p className="text-xs text-gray-500">{esc.time}</p>
                  </div>
                  {getStatusBadge(esc.status)}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
