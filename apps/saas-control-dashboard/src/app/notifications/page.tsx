"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  Button,
  Badge,
} from "@zerotheft/shared-ui";
import {
  Bell,
  CreditCard,
  ShieldAlert,
  AlertTriangle,
  Check,
  Settings,
} from "lucide-react";

type NotificationCategory = "System" | "Billing" | "Security" | "Alerts";

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  category: NotificationCategory;
  read: boolean;
}

const categoryConfig: Record<NotificationCategory, { icon: typeof Bell; color: string; badgeColor: string }> = {
  System: { icon: Settings, color: "bg-blue-100 text-blue-600", badgeColor: "bg-blue-100 text-blue-700 hover:bg-blue-100 border-0" },
  Billing: { icon: CreditCard, color: "bg-violet-100 text-violet-600", badgeColor: "bg-violet-100 text-violet-700 hover:bg-violet-100 border-0" },
  Security: { icon: ShieldAlert, color: "bg-red-100 text-red-600", badgeColor: "bg-red-100 text-red-700 hover:bg-red-100 border-0" },
  Alerts: { icon: AlertTriangle, color: "bg-amber-100 text-amber-600", badgeColor: "bg-amber-100 text-amber-700 hover:bg-amber-100 border-0" },
};

const initialNotifications: Notification[] = [
  {
    id: 1,
    title: "System Maintenance Scheduled",
    message: "The platform will undergo scheduled maintenance on May 28, 2025 at 02:00 UTC. Expected downtime: 30 minutes.",
    time: "5 minutes ago",
    category: "System",
    read: false,
  },
  {
    id: 2,
    title: "Invoice Payment Failed",
    message: "The automatic payment for invoice #INV-2025-0042 has failed. Please update your payment method.",
    time: "1 hour ago",
    category: "Billing",
    read: false,
  },
  {
    id: 3,
    title: "Suspicious Login Attempt",
    message: "We detected a login attempt from an unrecognized IP address (203.0.113.45). Please review your account security.",
    time: "2 hours ago",
    category: "Security",
    read: false,
  },
  {
    id: 4,
    title: "API Rate Limit Exceeded",
    message: "Tenant 'Acme Corp' has exceeded the API rate limit threshold (10,000 req/min). Consider upgrading the plan.",
    time: "3 hours ago",
    category: "Alerts",
    read: true,
  },
  {
    id: 5,
    title: "New Team Member Added",
    message: "A new team member (john.doe@example.com) has been added to the 'Engineering' team.",
    time: "5 hours ago",
    category: "System",
    read: true,
  },
  {
    id: 6,
    title: "Storage Quota Warning",
    message: "Your account has reached 85% of the storage quota. Clean up old backups or upgrade your plan.",
    time: "8 hours ago",
    category: "Alerts",
    read: false,
  },
  {
    id: 7,
    title: "Two-Factor Authentication Disabled",
    message: "2FA was disabled for user admin@company.com. If this was not you, contact support immediately.",
    time: "12 hours ago",
    category: "Security",
    read: true,
  },
  {
    id: 8,
    title: "Subscription Renewed",
    message: "Your Enterprise subscription has been automatically renewed for the next billing cycle.",
    time: "1 day ago",
    category: "Billing",
    read: true,
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const toggleRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        <Button
          variant="outline"
          className="border-gray-200 text-gray-700 hover:bg-gray-50"
          onClick={markAllRead}
        >
          <Check className="w-4 h-4 mr-1.5" />
          Mark All Read
        </Button>
      </div>

      <div className="space-y-3">
        {notifications.map((notification) => {
          const config = categoryConfig[notification.category];
          const Icon = config.icon;
          return (
            <Card
              key={notification.id}
              className={`border-0 shadow-sm transition-colors ${
                notification.read ? "bg-white" : "bg-white"
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${config.color}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p
                        className={`text-sm font-semibold ${
                          notification.read ? "text-gray-700" : "text-gray-900"
                        }`}
                      >
                        {notification.title}
                      </p>
                      {!notification.read && (
                        <span className="w-2 h-2 rounded-full bg-[#ff6b47]" />
                      )}
                      <Badge className={config.badgeColor}>
                        {notification.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      {notification.time}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-gray-700 shrink-0"
                    onClick={() => toggleRead(notification.id)}
                  >
                    {notification.read ? "Mark Unread" : "Mark Read"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
