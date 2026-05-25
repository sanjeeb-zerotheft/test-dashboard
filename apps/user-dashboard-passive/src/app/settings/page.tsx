"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  Button,
  Input,
  Label,
  Switch,
  Avatar,
  AvatarFallback,
} from "@zerotheft/shared-ui";
import { Shield } from "lucide-react";

const notificationItems = [
  { id: "critical", label: "Critical Alerts", defaultChecked: true },
  { id: "cameraOffline", label: "Camera Offline Alerts", defaultChecked: true },
  { id: "systemUpdates", label: "System Updates", defaultChecked: true },
  { id: "billing", label: "Billing Notifications", defaultChecked: false },
  { id: "dailyReports", label: "Daily Reports", defaultChecked: true },
  { id: "marketing", label: "Marketing Emails", defaultChecked: false },
];

export default function SettingsPage() {
  const [notifications, setNotifications] = useState<Record<string, boolean>>({
    critical: true,
    cameraOffline: true,
    systemUpdates: true,
    billing: false,
    dailyReports: true,
    marketing: false,
  });

  const toggleNotification = (id: string) => {
    setNotifications((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings & Profile</h1>
        <p className="text-gray-500 mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Card */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 space-y-6">
            <div className="flex items-center gap-4">
              <Avatar size="lg">
                <AvatarFallback className="bg-[#ff6b47] text-white">
                  PR
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-gray-900">Pabitra Rokka</p>
                <p className="text-sm text-gray-500">System Administrator</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input defaultValue="Pabitra Rokka" />
              </div>
              <div className="space-y-2">
                <Label>Email Address</Label>
                <Input type="email" defaultValue="pabitra.rokka@example.com" />
              </div>
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input type="tel" defaultValue="+1 (555) 123-4567" />
              </div>
              <div className="space-y-2">
                <Label>Company</Label>
                <Input defaultValue="ZeroTheft Inc." />
              </div>
              <Button className="bg-[#ff6b47] hover:bg-[#e55a3a] text-white">
                Save Profile Changes
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Security Card */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900">Security</h3>
              <p className="text-sm text-gray-500 mt-1">
                Manage your security settings
              </p>
            </div>

            <Button
              variant="outline"
              className="border-[#ff6b47] text-[#ff6b47] hover:bg-[#ff6b47]/10"
            >
              <Shield className="w-4 h-4 mr-2" />
              Change Password
            </Button>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div>
                <p className="font-medium text-gray-900">
                  Two-Factor Authentication
                </p>
                <p className="text-sm text-gray-500">
                  Add an extra layer of security
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notification Preferences */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4 space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900">
              Notification Preferences
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Choose what notifications you want to receive
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notificationItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
              >
                <p className="text-sm font-medium text-gray-900">
                  {item.label}
                </p>
                <Switch
                  checked={notifications[item.id]}
                  onCheckedChange={() => toggleNotification(item.id)}
                />
              </div>
            ))}
          </div>

          <Button className="bg-[#ff6b47] hover:bg-[#e55a3a] text-white">
            Save Notification Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
