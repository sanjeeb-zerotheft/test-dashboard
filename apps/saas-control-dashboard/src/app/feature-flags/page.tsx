"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  Switch,
  Tabs,
  TabsList,
  TabsTrigger,
  Badge,
} from "@zerotheft/shared-ui";
import { LayoutDashboard, BrainCircuit, BarChart3, Code2 } from "lucide-react";

const environments = ["Development", "Staging", "Production"] as const;
type Environment = (typeof environments)[number];

interface FeatureFlag {
  id: string;
  name: string;
  key: string;
  description: string;
  icon: typeof LayoutDashboard;
  envState: Record<Environment, boolean>;
}

const featureFlags: FeatureFlag[] = [
  {
    id: "new-dashboard-ui",
    name: "New Dashboard UI",
    key: "feature.new_dashboard_ui",
    description: "Modernized dashboard layout with improved navigation and widgets.",
    icon: LayoutDashboard,
    envState: { Development: true, Staging: true, Production: true },
  },
  {
    id: "ai-powered-insights",
    name: "AI-Powered Insights",
    key: "feature.ai_insights",
    description: "Enable AI-generated anomaly detection and recommendation engine.",
    icon: BrainCircuit,
    envState: { Development: true, Staging: true, Production: true },
  },
  {
    id: "advanced-analytics",
    name: "Advanced Analytics",
    key: "feature.advanced_analytics",
    description: "Deep-dive analytics with cohort analysis and funnel tracking.",
    icon: BarChart3,
    envState: { Development: true, Staging: true, Production: true },
  },
  {
    id: "beta-api-v3",
    name: "Beta API v3",
    key: "feature.beta_api_v3",
    description: "Next-generation REST API with GraphQL support and webhooks.",
    icon: Code2,
    envState: { Development: true, Staging: true, Production: false },
  },
];

export default function FeatureFlagsPage() {
  const [activeEnv, setActiveEnv] = useState<Environment>("Development");
  const [flags, setFlags] = useState<FeatureFlag[]>(featureFlags);

  const toggleFlag = (flagId: string, env: Environment) => {
    setFlags((prev) =>
      prev.map((f) =>
        f.id === flagId
          ? { ...f, envState: { ...f.envState, [env]: !f.envState[env] } }
          : f
      )
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Feature Flags & Release Orchestration
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage feature rollout across environments
        </p>
      </div>

      <Tabs value={activeEnv} onValueChange={(v) => setActiveEnv(v as Environment)}>
        <TabsList className="bg-white border border-gray-200 shadow-sm">
          {environments.map((env) => (
            <TabsTrigger
              key={env}
              value={env}
              className="data-active:bg-[#ff6b47] data-active:text-white px-4"
            >
              {env}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="space-y-4">
        {flags.map((flag) => {
          const Icon = flag.icon;
          const isOn = flag.envState[activeEnv];
          return (
            <Card key={flag.id} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-gray-900">
                          {flag.name}
                        </p>
                        <Badge
                          className={
                            isOn
                              ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-100 border-0"
                          }
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full mr-1 ${
                              isOn ? "bg-emerald-500" : "bg-gray-400"
                            }`}
                          />
                          {isOn ? "On" : "Off"}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-400 font-mono mt-0.5">
                        {flag.key}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {flag.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        {environments.map((env) => (
                          <Badge
                            key={env}
                            className={
                              flag.envState[env]
                                ? "bg-blue-100 text-blue-700 hover:bg-blue-100 border-0"
                                : "bg-gray-100 text-gray-500 hover:bg-gray-100 border-0"
                            }
                          >
                            {env}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Switch
                    checked={isOn}
                    onCheckedChange={() => toggleFlag(flag.id, activeEnv)}
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
