"use client";

import React from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Button,
} from "@zerotheft/shared-ui";
import {
  Check,
  X,
  ArrowRight,
  Video,
  HardDrive,
} from "lucide-react";

const plans = [
  {
    name: "Basic Protection",
    price: "$59",
    period: "/mo",
    quote: "Essential monitoring for small sites",
    current: false,
    features: [
      { label: "Live Feeds", included: true },
      { label: "Storage Retention 3 Days", included: true },
      { label: "Video Quality 1080p HD", included: true },
      { label: "Frame Rate 10 FPS", included: true },
      { label: "Evidence Integrity Basic", included: true },
      { label: "Theft Detection", included: true },
      { label: "Support Level Email", included: true },
      { label: "Violence Detection", included: false },
      { label: "Guarantees", included: false },
    ],
  },
  {
    name: "Premium Protection",
    price: "$79",
    period: "/mo",
    quote: "Advanced AI for growing businesses",
    current: true,
    features: [
      { label: "Live Feeds", included: true },
      { label: "Storage Retention 7 Days", included: true },
      { label: "Video Quality 1080p HD", included: true },
      { label: "Frame Rate 15 FPS", included: true },
      { label: "Evidence Integrity Advanced", included: true },
      { label: "Theft Detection", included: true },
      { label: "Support Level Priority", included: true },
      { label: "Violence Detection", included: true },
      { label: "Guarantees", included: false },
    ],
  },
  {
    name: "Full Protection",
    price: "$99",
    period: "/mo",
    quote: "Enterprise-grade security & SLA",
    current: false,
    features: [
      { label: "Live Feeds", included: true },
      { label: "Storage Retention 30 Days", included: true },
      { label: "Video Quality 4K UHD", included: true },
      { label: "Frame Rate 30 FPS", included: true },
      { label: "Evidence Integrity Enterprise", included: true },
      { label: "Theft Detection", included: true },
      { label: "Support Level SLA-backed", included: true },
      { label: "Violence Detection", included: true },
      { label: "Guarantees", included: true },
    ],
  },
];

const comparisonSections = [
  {
    title: "AI COVERAGE",
    rows: [
      { label: "Theft Detection", basic: true, premium: true, full: true },
      { label: "Violence Detection", basic: false, premium: true, full: true },
      { label: "Person Detection", basic: true, premium: true, full: true },
      { label: "Face Blur (Privacy)", basic: false, premium: true, full: true },
    ],
  },
  {
    title: "SECURITY & RISK",
    rows: [
      { label: "Evidence Integrity", basic: "Basic", premium: "Advanced", full: "Enterprise" },
      { label: "Chain of Custody", basic: false, premium: true, full: true },
      { label: "Tamper Alerts", basic: false, premium: true, full: true },
      { label: "Guarantees", basic: false, premium: false, full: true },
    ],
  },
  {
    title: "INTELLIGENCE & ANALYTICS",
    rows: [
      { label: "Heatmaps", basic: false, premium: true, full: true },
      { label: "Trend Reports", basic: false, premium: true, full: true },
      { label: "ROI Calculator", basic: false, premium: false, full: true },
      { label: "Custom Dashboards", basic: false, premium: false, full: true },
    ],
  },
  {
    title: "STORAGE & COMPLIANCE",
    rows: [
      { label: "Retention", basic: "3 Days", premium: "7 Days", full: "30 Days" },
      { label: "Video Quality", basic: "1080p HD", premium: "1080p HD", full: "4K UHD" },
      { label: "Frame Rate", basic: "10 FPS", premium: "15 FPS", full: "30 FPS" },
      { label: "SOC2 Compliant", basic: false, premium: true, full: true },
    ],
  },
];

export default function SubscriptionPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Subscription & Plans</h1>
          <p className="text-gray-500 mt-1">Choose the plan that fits your security needs.</p>
        </div>
        <button className="text-[#ff6b47] text-sm font-medium hover:underline flex items-center gap-1 mt-2 sm:mt-0">
          View all Plans <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Usage This Month */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4 sm:p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Usage This Month</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700">Cameras</span>
                </div>
                <span className="text-sm font-medium text-gray-900">36 / 50</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: "72%" }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700">Storage</span>
                </div>
                <span className="text-sm font-medium text-gray-900">375 GB / 500 GB</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-orange-400 rounded-full" style={{ width: "75%" }} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`border-0 shadow-sm flex flex-col ${plan.current ? "ring-2 ring-[#ff6b47]" : ""}`}
          >
            <CardHeader className="pb-0">
              <CardTitle className="text-base font-semibold text-gray-900">{plan.name}</CardTitle>
              <CardDescription>{plan.quote}</CardDescription>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-2xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-sm text-gray-500">{plan.period}</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <div className="space-y-2.5 mt-2 flex-1">
                {plan.features.map((feature) => (
                  <div key={feature.label} className="flex items-start gap-2">
                    {feature.included ? (
                      <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    ) : (
                      <X className="w-4 h-4 text-gray-300 mt-0.5 shrink-0" />
                    )}
                    <span
                      className={`text-sm ${feature.included ? "text-gray-700" : "text-gray-400"}`}
                    >
                      {feature.label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                {plan.current ? (
                  <Button
                    disabled
                    className="w-full bg-gray-200 text-gray-500 cursor-default hover:bg-gray-200"
                  >
                    Current Plan
                  </Button>
                ) : (
                  <Button className="w-full bg-[#ff6b47] hover:bg-[#e55a3a] text-white">
                    Upgrade Plan
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Feature Comparison Table */}
      <Card className="border-0 shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="p-4 sm:p-6 border-b">
            <h3 className="font-semibold text-gray-900">Feature Comparison</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left font-medium text-gray-500 px-4 sm:px-6 py-3 w-1/3">Feature</th>
                  <th className="text-center font-medium text-gray-500 px-4 py-3">Basic</th>
                  <th className="text-center font-medium text-gray-500 px-4 py-3">Premium</th>
                  <th className="text-center font-medium text-gray-500 px-4 py-3">Full</th>
                </tr>
              </thead>
              <tbody>
                {comparisonSections.map((section) => (
                  <React.Fragment key={section.title}>
                    <tr>
                      <td
                        colSpan={4}
                        className="px-4 sm:px-6 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50/50"
                      >
                        {section.title}
                      </td>
                    </tr>
                    {section.rows.map((row) => (
                      <tr key={row.label} className="border-b last:border-b-0">
                        <td className="px-4 sm:px-6 py-3 text-gray-700">{row.label}</td>
                        <td className="px-4 py-3 text-center">
                          {typeof row.basic === "boolean" ? (
                            row.basic ? (
                              <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                            ) : (
                              <X className="w-4 h-4 text-gray-300 mx-auto" />
                            )
                          ) : (
                            <span className="text-gray-600">{row.basic}</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {typeof row.premium === "boolean" ? (
                            row.premium ? (
                              <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                            ) : (
                              <X className="w-4 h-4 text-gray-300 mx-auto" />
                            )
                          ) : (
                            <span className="text-gray-600">{row.premium}</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {typeof row.full === "boolean" ? (
                            row.full ? (
                              <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                            ) : (
                              <X className="w-4 h-4 text-gray-300 mx-auto" />
                            )
                          ) : (
                            <span className="text-gray-600">{row.full}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
