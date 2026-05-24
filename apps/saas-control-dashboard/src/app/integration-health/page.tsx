"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
} from "@zerotheft/shared-ui";
import {
  Cloud,
  Mail,
  HardDrive,
  Phone,
  MessageSquare,
  Bell,
  CreditCard,
  Clock,
  Activity,
} from "lucide-react";

const integrations = [
  {
    name: "Stripe",
    category: "Payments",
    status: "Healthy",
    uptime: "99.99%",
    lastSync: "2 minutes ago",
    icon: CreditCard,
    color: "bg-purple-100 text-purple-600",
  },
  {
    name: "SendGrid",
    category: "Email",
    status: "Healthy",
    uptime: "99.95%",
    lastSync: "5 minutes ago",
    icon: Mail,
    color: "bg-blue-100 text-blue-600",
  },
  {
    name: "AWS S3",
    category: "Storage",
    status: "Degraded",
    uptime: "98.72%",
    lastSync: "12 minutes ago",
    icon: HardDrive,
    color: "bg-amber-100 text-amber-600",
  },
  {
    name: "Twilio",
    category: "SMS / Voice",
    status: "Healthy",
    uptime: "99.91%",
    lastSync: "3 minutes ago",
    icon: Phone,
    color: "bg-red-100 text-red-600",
  },
  {
    name: "Slack",
    category: "Messaging",
    status: "Healthy",
    uptime: "99.88%",
    lastSync: "1 minute ago",
    icon: MessageSquare,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    name: "PagerDuty",
    category: "Incident Management",
    status: "Down",
    uptime: "94.30%",
    lastSync: "2 hours ago",
    icon: Bell,
    color: "bg-orange-100 text-orange-600",
  },
  {
    name: "Cloudflare",
    category: "CDN / DNS",
    status: "Healthy",
    uptime: "99.97%",
    lastSync: "30 seconds ago",
    icon: Cloud,
    color: "bg-orange-100 text-orange-600",
  },
  {
    name: "Datadog",
    category: "Monitoring",
    status: "Degraded",
    uptime: "97.50%",
    lastSync: "18 minutes ago",
    icon: Activity,
    color: "bg-violet-100 text-violet-600",
  },
];

function getStatusBadge(status: string) {
  switch (status) {
    case "Healthy":
      return (
        <Badge className="bg-emerald-100 text-emerald-600 border-0 hover:bg-emerald-100">
          Healthy
        </Badge>
      );
    case "Degraded":
      return (
        <Badge className="bg-amber-100 text-amber-600 border-0 hover:bg-amber-100">
          Degraded
        </Badge>
      );
    case "Down":
      return (
        <Badge className="bg-red-100 text-red-600 border-0 hover:bg-red-100">
          Down
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}

export default function IntegrationHealthPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Integration Health</h1>
        <p className="text-sm text-gray-500 mt-1">
          Monitor the status and uptime of all third-party integrations
        </p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Healthy</p>
              <p className="text-2xl font-bold text-gray-900">5</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Degraded</p>
              <p className="text-2xl font-bold text-gray-900">2</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Down</p>
              <p className="text-2xl font-bold text-gray-900">1</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Integration Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {integrations.map((integration) => (
          <Card key={integration.name} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${integration.color}`}
                >
                  <integration.icon className="w-5 h-5" />
                </div>
                {getStatusBadge(integration.status)}
              </div>
              <div className="mt-3">
                <p className="text-sm font-semibold text-gray-900">
                  {integration.name}
                </p>
                <p className="text-xs text-gray-500">{integration.category}</p>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs">
                <div>
                  <p className="text-gray-400">Uptime</p>
                  <p className="font-medium text-gray-700">
                    {integration.uptime}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400">Last Sync</p>
                  <p className="font-medium text-gray-700">
                    {integration.lastSync}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
