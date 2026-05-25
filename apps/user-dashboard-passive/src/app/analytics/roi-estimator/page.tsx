"use client";

import { useState } from "react";
import { Card, CardContent, Button, Input, Label } from "@zerotheft/shared-ui";
import {
  TrendingDown,
  Percent,
  DollarSign,
  Calculator,
  Download,
  FileText,
  RotateCcw,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function ROIEstimatorPage() {
  const [investment, setInvestment] = useState("100000");
  const [duration, setDuration] = useState("12");
  const [efficiencyGain, setEfficiencyGain] = useState("25");
  const [costReduction, setCostReduction] = useState("15");
  const [calculated, setCalculated] = useState(true);

  const inv = parseFloat(investment) || 0;
  const dur = parseFloat(duration) || 0;
  const eff = parseFloat(efficiencyGain) || 0;
  const costRed = parseFloat(costReduction) || 0;

  // Simple ROI calc
  const totalSavings = inv * (eff / 100) + inv * (costRed / 100);
  const roi = inv > 0 ? (((totalSavings - inv) / inv) * 100) : 0;
  const efficiencyImprovement = eff;
  const costSavings = totalSavings;

  // Chart data
  const roiGrowthData = Array.from({ length: dur + 1 }, (_, i) => {
    const month = i;
    const savingsAtMonth = (totalSavings / dur) * month;
    const roiAtMonth = inv > 0 ? ((savingsAtMonth - (inv / dur) * month) / inv) * 100 : 0;
    return {
      month: `M${month}`,
      roi: Number(roiAtMonth.toFixed(2)),
      savings: Math.round(savingsAtMonth),
    };
  });

  const donutData = [
    { name: "Total Savings", value: Math.round(totalSavings), color: "#22c55e" },
    { name: "System Cost", value: 2000, color: "#ff6b47" },
  ];

  const handleCalculate = () => {
    setCalculated(true);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span>Analytics</span>
        <span className="text-gray-300">&gt;</span>
        <span className="text-gray-900 font-medium">ROI Estimator</span>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">ROI Estimator & Cost Savings</h1>
        <p className="text-gray-500 mt-1">Calculate your return on investment and projected cost savings</p>
      </div>

      {/* Input Variables */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-900 mb-6">Input Variables</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Label className="text-sm text-gray-600">Investment Amount ($)</Label>
              <Input
                type="number"
                value={investment}
                onChange={(e) => setInvestment(e.target.value)}
                className="border-gray-200"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-gray-600">Duration (Months)</Label>
              <Input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="border-gray-200"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-gray-600">Efficiency Gain (%)</Label>
              <Input
                type="number"
                value={efficiencyGain}
                onChange={(e) => setEfficiencyGain(e.target.value)}
                className="border-gray-200"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-gray-600">Cost Reduction (%)</Label>
              <Input
                type="number"
                value={costReduction}
                onChange={(e) => setCostReduction(e.target.value)}
                className="border-gray-200"
              />
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <Button
              onClick={handleCalculate}
              className="bg-[#ff6b47] hover:bg-[#e55a3a] text-white px-6"
            >
              <RotateCcw className="w-4 h-4 mr-2" /> Re-calculate ROI
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Result Cards */}
      {calculated && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Total ROI */}
          <div className="rounded-xl p-5 text-white" style={{ background: "linear-gradient(135deg, #ff7a5c, #ff6b47)" }}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white/80 text-sm">Total ROI</p>
                <p className="text-3xl font-bold mt-1">{roi.toFixed(2)}%</p>
                <p className="text-white/70 text-sm mt-1">Over {dur} months</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          {/* Efficiency Improvement */}
          <div className="rounded-xl p-5 text-white" style={{ background: "linear-gradient(135deg, #3b82f6, #2563eb)" }}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white/80 text-sm">Efficiency Improvement</p>
                <p className="text-3xl font-bold mt-1">+{efficiencyImprovement.toFixed(1)}%</p>
                <p className="text-white/70 text-sm mt-1">Operational efficiency</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                <Percent className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          {/* Cost Savings */}
          <div className="rounded-xl p-5 text-white" style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)" }}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white/80 text-sm">Cost Savings</p>
                <p className="text-3xl font-bold mt-1">${costSavings.toLocaleString()}</p>
                <p className="text-white/70 text-sm mt-1">Projected total savings</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Charts Row */}
      {calculated && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* ROI Growth Over Time */}
          <Card className="xl:col-span-2 border-0 shadow-sm">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">ROI Growth Over Time</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={roiGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                  <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="roi" stroke="#ff6b47" strokeWidth={2} dot={{ r: 3, fill: "#ff6b47" }} name="ROI (%)" />
                  <Line type="monotone" dataKey="savings" stroke="#22c55e" strokeWidth={2} dot={{ r: 3, fill: "#22c55e" }} name="Savings ($)" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Cost vs Savings */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Cost vs Savings</h3>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={donutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {donutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`$${Number(value).toLocaleString()}`, name]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-col gap-2 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-sm text-gray-600">Total Savings: ${totalSavings.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff6b47]" />
                  <span className="text-sm text-gray-600">System Cost: $2,000</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Export Buttons */}
      {calculated && (
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" className="border-[#ff6b47] text-[#ff6b47] hover:bg-[#ff6b47]/5">
            <FileText className="w-4 h-4 mr-2" /> Export as PDF
          </Button>
          <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
            <Download className="w-4 h-4 mr-2" /> Export as CSV
          </Button>
        </div>
      )}
    </div>
  );
}
