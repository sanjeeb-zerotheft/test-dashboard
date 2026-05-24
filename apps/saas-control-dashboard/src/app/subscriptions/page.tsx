"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Badge,
} from "@zerotheft/shared-ui";
import { DollarSign, Users, TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const stats = [
  {
    label: "Total MRR",
    value: "$284K",
    change: "+15.3% from last month",
    icon: DollarSign,
    color: "bg-blue-100 text-blue-600",
  },
  {
    label: "Active Subscriptions",
    value: "1,247",
    change: "+12 from last month",
    icon: Users,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    label: "Growth Rate",
    value: "15.3%",
    change: "+2.1% from last month",
    icon: TrendingUp,
    color: "bg-amber-100 text-amber-600",
  },
];

const revenueData = [
  { month: "Jan", value: 210 },
  { month: "Feb", value: 232 },
  { month: "Mar", value: 245 },
  { month: "Apr", value: 260 },
  { month: "May", value: 272 },
  { month: "Jun", value: 284 },
];

const planData = [
  { name: "Enterprise", value: 45 },
  { name: "Professional", value: 32 },
  { name: "Starter", value: 23 },
];

const PLAN_COLORS = ["#3b82f6", "#10b981", "#f59e0b"];

const subscriptions = [
  {
    tenant: "Acme Corp",
    plan: "Enterprise",
    mrr: "$4,500",
    status: "Active",
    renewal: "Aug 15, 2025",
  },
  {
    tenant: "Beta Inc",
    plan: "Professional",
    mrr: "$1,200",
    status: "Active",
    renewal: "Sep 02, 2025",
  },
  {
    tenant: "Gamma LLC",
    plan: "Starter",
    mrr: "$299",
    status: "Active",
    renewal: "Jul 30, 2025",
  },
  {
    tenant: "Delta Co",
    plan: "Enterprise",
    mrr: "$6,000",
    status: "Trial",
    renewal: "Aug 01, 2025",
  },
  {
    tenant: "Epsilon Ltd",
    plan: "Professional",
    mrr: "$1,100",
    status: "Active",
    renewal: "Oct 12, 2025",
  },
];

export default function SubscriptionsPage() {
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Subscription Management
        </h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-0 shadow-sm ring-0">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {stat.value}
                  </p>
                  {stat.change && (
                    <p className="text-xs text-emerald-600 mt-1">
                      {stat.change}
                    </p>
                  )}
                </div>
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}
                >
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm ring-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">
              Revenue Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                  stroke="#9ca3af"
                />
                <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <Tooltip />
                <Bar
                  dataKey="value"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm ring-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">
              Plan Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={planData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                  onMouseEnter={(_, index) => setHoveredPlan(index)}
                  onMouseLeave={() => setHoveredPlan(null)}
                >
                  {planData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PLAN_COLORS[index % PLAN_COLORS.length]}
                      opacity={
                        hoveredPlan === null || hoveredPlan === index
                          ? 1
                          : 0.6
                      }
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-4 mt-2">
              {planData.map((entry, index) => (
                <div
                  key={entry.name}
                  className="flex items-center gap-1.5 text-xs text-gray-600"
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{
                      backgroundColor: PLAN_COLORS[index],
                      opacity:
                        hoveredPlan === null || hoveredPlan === index
                          ? 1
                          : 0.5,
                    }}
                  />
                  {entry.name} {entry.value}%
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card className="border-0 shadow-sm ring-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            Active Subscriptions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tenant</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>MRR</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Next Renewal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptions.map((sub) => (
                <TableRow key={sub.tenant}>
                  <TableCell className="font-medium text-gray-900">
                    {sub.tenant}
                  </TableCell>
                  <TableCell>{sub.plan}</TableCell>
                  <TableCell>{sub.mrr}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        sub.status === "Active"
                          ? "bg-emerald-100 text-emerald-600 hover:bg-emerald-100"
                          : "bg-amber-100 text-amber-600 hover:bg-amber-100"
                      }
                    >
                      {sub.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-500">{sub.renewal}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
