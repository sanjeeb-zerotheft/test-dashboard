"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Badge,
  Switch,
} from "@zerotheft/shared-ui";
import { Plus, Mail, MessageSquare, Bell, Smartphone } from "lucide-react";

const initialRules = [
  { id: "cpu", name: "CPU Usage High", description: "Trigger when CPU > 80% for 5 min", enabled: true },
  { id: "api", name: "API Error Rate", description: "Trigger when 5xx rate > 1%", enabled: true },
  { id: "payment", name: "Payment Failures", description: "Trigger when payment failure rate > 5%", enabled: false },
  { id: "disk", name: "Low Disk Space", description: "Trigger when disk usage > 90%", enabled: true },
];

const channels = [
  { name: "Email", icon: Mail, configured: true },
  { name: "Slack", icon: MessageSquare, configured: true },
  { name: "PagerDuty", icon: Bell, configured: true },
  { name: "SMS", icon: Smartphone, configured: false },
];

export default function AlertsPage() {
  const [rules, setRules] = useState(initialRules);

  const toggleRule = (id: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Alert System Configuration
        </h1>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Alert Rules */}
        <Card className="border-0 shadow-sm ring-0">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold">
              Alert Rules
            </CardTitle>
            <Button
              size="sm"
              className="bg-[#ff6b47] hover:bg-[#ff6b47]/90 text-white"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              Create Rule
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {rules.map((rule) => (
              <div
                key={rule.id}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50/50"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {rule.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {rule.description}
                  </p>
                </div>
                <Switch
                  checked={rule.enabled}
                  onCheckedChange={() => toggleRule(rule.id)}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Notification Channels */}
        <Card className="border-0 shadow-sm ring-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">
              Notification Channels
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {channels.map((ch) => (
              <div
                key={ch.name}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50/50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
                    <ch.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {ch.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {ch.configured ? "Configured" : "Not Configured"}
                    </p>
                  </div>
                </div>
                {ch.configured ? (
                  <Badge className="bg-emerald-100 text-emerald-600 hover:bg-emerald-100">
                    Configured
                  </Badge>
                ) : (
                  <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-100">
                    Not Configured
                  </Badge>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
