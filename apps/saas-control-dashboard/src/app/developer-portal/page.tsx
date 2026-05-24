"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Progress,
} from "@zerotheft/shared-ui";
import { Plus, KeyRound, Copy, Trash2 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const apiUsageData = [
  { day: "Mon", requests: 12400 },
  { day: "Tue", requests: 15200 },
  { day: "Wed", requests: 11800 },
  { day: "Thu", requests: 18900 },
  { day: "Fri", requests: 21400 },
  { day: "Sat", requests: 8600 },
  { day: "Sun", requests: 9200 },
];

const apiKeys = [
  {
    id: 1,
    name: "Production API Key",
    key: "zt_live_****************************a3f9",
    usage: 28900,
    quota: 100000,
    created: "Jan 10, 2025",
  },
  {
    id: 2,
    name: "Development Key",
    key: "zt_dev_*****************************b2c1",
    usage: 5600,
    quota: 10000,
    created: "Feb 22, 2025",
  },
  {
    id: 3,
    name: "Mobile App Key",
    key: "zt_mob_*****************************d4e5",
    usage: 12300,
    quota: 50000,
    created: "Mar 15, 2025",
  },
  {
    id: 4,
    name: "Partner Integration",
    key: "zt_prt_*****************************f6a7",
    usage: 3400,
    quota: 20000,
    created: "Apr 02, 2025",
  },
];

export default function DeveloperPortalPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Developer Portal & API Key Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage API keys and monitor usage
          </p>
        </div>
        <Button className="bg-[#ff6b47] hover:bg-[#ff6b47]/90 text-white">
          <Plus className="w-4 h-4" />
          Generate New Key
        </Button>
      </div>

      {/* API Usage Chart */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            API Usage Analytics (Last 7 Days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={apiUsageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <YAxis
                tick={{ fontSize: 12 }}
                stroke="#9ca3af"
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
              />
              <Tooltip
                formatter={(value) => [
                  `${Number(value).toLocaleString()} requests`,
                  "Requests",
                ]}
              />
              <Bar dataKey="requests" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* API Keys Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">API Keys</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>API Key</TableHead>
                <TableHead>Usage / Quota</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiKeys.map((apiKey) => {
                const usagePercent = Math.round(
                  (apiKey.usage / apiKey.quota) * 100
                );
                return (
                  <TableRow key={apiKey.id}>
                    <TableCell className="font-medium text-gray-900">
                      <div className="flex items-center gap-2">
                        <KeyRound className="w-4 h-4 text-gray-400" />
                        {apiKey.name}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-500 font-mono text-xs">
                      <div className="flex items-center gap-2">
                        {apiKey.key}
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="text-gray-400 hover:text-gray-700"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="w-full max-w-xs">
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                          <span>
                            {apiKey.usage.toLocaleString()} /{" "}
                            {apiKey.quota.toLocaleString()}
                          </span>
                          <span>{usagePercent}%</span>
                        </div>
                        <Progress value={usagePercent} className="flex-col gap-1">
                          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#ff6b47] rounded-full transition-all"
                              style={{ width: `${usagePercent}%` }}
                            />
                          </div>
                        </Progress>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-500">
                      {apiKey.created}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-gray-800 text-white hover:bg-gray-700 border-0"
                      >
                        <Trash2 className="w-3.5 h-3.5 mr-1" />
                        Revoke
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
