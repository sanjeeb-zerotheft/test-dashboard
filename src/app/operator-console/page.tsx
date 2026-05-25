"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@zerotheft/shared-ui";
import { Badge } from "@zerotheft/shared-ui";
import { Button } from "@zerotheft/shared-ui";
import { Input } from "@zerotheft/shared-ui";
import {
  Lock,
  Megaphone,
  Video,
  BellOff,
  Phone,
  CheckCircle2,
  Zap,
  Keyboard,
  Play,
} from "lucide-react";

const quickActions = [
  { name: "Emergency Lockdown", shortcut: "Ctrl+Shift+L", icon: Lock, color: "border-red-200 hover:border-red-300" },
  { name: "Alert All Security", shortcut: "Ctrl+Shift+A", icon: Megaphone, color: "border-orange-200 hover:border-orange-300" },
  { name: "Record All Cameras", shortcut: "Ctrl+R", icon: Video, color: "border-blue-200 hover:border-blue-300" },
  { name: "Silence Alarms", shortcut: "Ctrl+S", icon: BellOff, color: "border-gray-200 hover:border-gray-300" },
  { name: "Call Emergency", shortcut: "Ctrl+E", icon: Phone, color: "border-red-200 hover:border-red-300" },
  { name: "Acknowledge All", shortcut: "Ctrl+Shift+K", icon: CheckCircle2, color: "border-emerald-200 hover:border-emerald-300" },
];

const suggestedCommands = [
  "acknowledge alert [id]",
  "record camera [name]",
  "notify team [name]",
  "escalate alert [id]",
  "show cameras",
  "export evidence [id]",
];

const recentCommands = [
  { command: "Acknowledge Alert #ALT-2024-0015", time: "2 min ago" },
  { command: 'Record Camera "Parking Lot 3"', time: "5 min ago" },
  { command: "Alert Security Team", time: "12 min ago" },
  { command: "Export Evidence", time: "18 min ago" },
];

const keyboardShortcuts = [
  { section: "NAVIGATION", items: [
    { action: "Live Monitoring", key: "Ctrl+1" },
    { action: "Alerts", key: "Ctrl+2" },
    { action: "Cameras", key: "Ctrl+3" },
  ]},
  { section: "ALERT ACTIONS", items: [
    { action: "Acknowledge Alert", key: "A" },
    { action: "Escalate Alert", key: "E" },
    { action: "Resolve Alert", key: "R" },
    { action: "Dismiss Alert", key: "D" },
  ]},
  { section: "VIDEO CONTROLS", items: [
    { action: "Play/Pause", key: "Space" },
    { action: "Skip 5 seconds", key: "←/→" },
    { action: "Fullscreen", key: "F" },
  ]},
  { section: "SYSTEM", items: [
    { action: "Show shortcuts", key: "Ctrl+/" },
    { action: "Close dialog", key: "Esc" },
  ]},
];

export default function OperatorConsolePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Operator Console</h1>
        <p className="text-gray-500 mt-1">Quick actions, macros and keyboard shortcuts</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-4">
          {/* Quick Action Macros */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Quick Action Macros</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {quickActions.map((action) => (
                  <button
                    key={action.name}
                    className={`p-4 rounded-lg border-2 ${action.color} bg-white hover:bg-gray-50 transition-colors text-left`}
                  >
                    <action.icon className="w-6 h-6 text-gray-700 mb-2" />
                    <p className="text-sm font-medium text-gray-900">{action.name}</p>
                    <p className="text-xs text-gray-400 mt-1">{action.shortcut}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Fast Command Panel */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Fast Command Panel</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-[#1e2330] rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-[#ff6b47]" />
                  <span className="text-sm text-gray-300">Command Mode</span>
                </div>
                <Input
                  placeholder="Type command... (e.g., 'acknowledge alert 123', 'record camera 5')"
                  className="bg-[#2a3341] border-0 text-white placeholder:text-gray-500"
                />
              </div>

              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Suggested Commands</p>
                <div className="grid grid-cols-2 gap-2">
                  {suggestedCommands.map((cmd) => (
                    <Badge
                      key={cmd}
                      variant="outline"
                      className="justify-start font-mono text-xs py-1.5 cursor-pointer hover:bg-gray-50"
                    >
                      {cmd}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Recent Commands</p>
                <div className="space-y-2">
                  {recentCommands.map((cmd) => (
                    <div key={cmd.command} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span className="text-sm text-gray-700">{cmd.command}</span>
                      </div>
                      <span className="text-xs text-gray-400">{cmd.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Keyboard Shortcuts */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3 flex flex-row items-center gap-2">
            <Keyboard className="w-5 h-5 text-gray-700" />
            <CardTitle className="text-base font-semibold">Keyboard Shortcuts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {keyboardShortcuts.map((section) => (
              <div key={section.section}>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">{section.section}</p>
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <div key={item.action} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                      <span className="text-sm text-gray-700">{item.action}</span>
                      <Badge variant="outline" className="font-mono text-xs">
                        {item.key}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <Button className="w-full bg-[#3b4a5e] hover:bg-[#2d3a4d] text-white gap-2">
              <Play className="w-4 h-4" />
              Practice Mode
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
