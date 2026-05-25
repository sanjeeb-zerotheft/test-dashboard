"use client";

import { Card, CardContent, Button } from "@zerotheft/shared-ui";
import {
  FileText,
  Download,
  Eye,
  Calendar,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const reports = [
  { title: "Weekly Security Report", date: "Feb 24, 2026", status: "Generated", type: "PDF" },
  { title: "Incident Analysis Q1", date: "Feb 20, 2026", status: "Generated", type: "PDF" },
  { title: "Camera Performance Review", date: "Feb 15, 2026", status: "Generated", type: "CSV" },
  { title: "ROI Summary Report", date: "Feb 10, 2026", status: "Generated", type: "PDF" },
  { title: "Risk Assessment Report", date: "Feb 05, 2026", status: "Generated", type: "PDF" },
];

const monthlyData = [
  { month: "Jan", incidents: 42, resolved: 38 },
  { month: "Feb", incidents: 35, resolved: 32 },
  { month: "Mar", incidents: 28, resolved: 26 },
  { month: "Apr", incidents: 45, resolved: 40 },
  { month: "May", incidents: 38, resolved: 35 },
  { month: "Jun", incidents: 52, resolved: 48 },
];

const severityData = [
  { name: "Critical", value: 12, color: "#ef4444" },
  { name: "High", value: 28, color: "#f97316" },
  { name: "Medium", value: 45, color: "#eab308" },
  { name: "Low", value: 35, color: "#22c55e" },
];

const insights = [
  {
    icon: TrendingUp,
    title: "Incident Trend Down 15%",
    desc: "Compared to last month, total incidents have decreased by 15%.",
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    icon: AlertTriangle,
    title: "High Risk Zone Detected",
    desc: "Zone C12 has shown consistent high-risk activity over the past week.",
    color: "text-red-600",
    bg: "bg-red-100",
  },
  {
    icon: CheckCircle2,
    title: "Camera Uptime at 99.2%",
    desc: "All critical cameras maintained excellent uptime this month.",
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    icon: Clock,
    title: "Avg Response Time: 2.3m",
    desc: "Response time improved by 18% compared to previous quarter.",
    color: "text-amber-600",
    bg: "bg-amber-100",
  },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span>Analytics</span>
        <span className="text-gray-300">&gt;</span>
        <span className="text-gray-900 font-medium">Report & Insights</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Report & Insights</h1>
          <p className="text-gray-500 mt-1">View generated reports and AI-powered insights</p>
        </div>
        <Button className="bg-[#ff6b47] hover:bg-[#e55a3a] text-white">
          <FileText className="w-4 h-4 mr-2" /> Generate New Report
        </Button>
      </div>

      {/* Insights Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {insights.map((item) => (
          <Card key={item.title} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg ${item.bg} flex items-center justify-center shrink-0`}>
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">{item.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Monthly Incident Overview</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <Tooltip />
                <Bar dataKey="incidents" fill="#ff6b47" radius={[6, 6, 0, 0]} name="Incidents" />
                <Bar dataKey="resolved" fill="#22c55e" radius={[6, 6, 0, 0]} name="Resolved" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Alert Severity Distribution</h3>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={severityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [value, name]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-4 mt-2">
              {severityData.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reports Table */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Generated Reports</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase py-3 px-2">Report Name</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase py-3 px-2">Date</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase py-3 px-2">Type</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase py-3 px-2">Status</th>
                  <th className="text-right text-xs font-medium text-gray-500 uppercase py-3 px-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.title} className="border-b border-gray-50 last:border-0">
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{report.title}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-500">{report.date}</td>
                    <td className="py-3 px-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
                        {report.type}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> {report.status}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
