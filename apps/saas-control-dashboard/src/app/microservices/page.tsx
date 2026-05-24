"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
} from "@zerotheft/shared-ui";

const services = [
  {
    name: "API Gateway",
    status: "Healthy",
    statusColor: "bg-emerald-100 text-emerald-600",
    uptime: "99.99%",
    requests: "1.2M/min",
    latency: "12ms",
  },
  {
    name: "Auth Service",
    status: "Healthy",
    statusColor: "bg-emerald-100 text-emerald-600",
    uptime: "99.95%",
    requests: "450K/min",
    latency: "8ms",
  },
  {
    name: "Payment Service",
    status: "Degraded",
    statusColor: "bg-amber-100 text-amber-600",
    uptime: "98.40%",
    requests: "120K/min",
    latency: "180ms",
  },
  {
    name: "Notification Service",
    status: "Healthy",
    statusColor: "bg-emerald-100 text-emerald-600",
    uptime: "99.92%",
    requests: "800K/min",
    latency: "22ms",
  },
  {
    name: "Analytics Engine",
    status: "Healthy",
    statusColor: "bg-emerald-100 text-emerald-600",
    uptime: "99.88%",
    requests: "60K/min",
    latency: "45ms",
  },
  {
    name: "ML Inference",
    status: "Down",
    statusColor: "bg-red-100 text-red-600",
    uptime: "0.00%",
    requests: "0/min",
    latency: "—",
  },
];

export default function MicroservicesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Microservice Health & Topology
        </h1>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Service Topology */}
        <Card className="border-0 shadow-sm ring-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">
              Service Topology
            </CardTitle>
          </CardHeader>
          <CardContent>
            <svg
              viewBox="0 0 320 260"
              className="w-full h-auto max-w-sm mx-auto"
            >
              {/* Lines */}
              <line
                x1="160"
                y1="60"
                x2="60"
                y2="60"
                stroke="#e5e7eb"
                strokeWidth="2"
              />
              <line
                x1="160"
                y1="60"
                x2="260"
                y2="60"
                stroke="#e5e7eb"
                strokeWidth="2"
              />
              <line
                x1="160"
                y1="60"
                x2="160"
                y2="160"
                stroke="#e5e7eb"
                strokeWidth="2"
              />
              <line
                x1="160"
                y1="160"
                x2="80"
                y2="220"
                stroke="#e5e7eb"
                strokeWidth="2"
              />
              <line
                x1="160"
                y1="160"
                x2="240"
                y2="220"
                stroke="#e5e7eb"
                strokeWidth="2"
              />

              {/* Gateway */}
              <circle cx="160" cy="60" r="32" fill="#3b82f6" />
              <text
                x="160"
                y="64"
                textAnchor="middle"
                fill="white"
                fontSize="11"
                fontWeight="600"
                fontFamily="sans-serif"
              >
                Gateway
              </text>

              {/* Auth */}
              <circle cx="60" cy="60" r="28" fill="#10b981" />
              <text
                x="60"
                y="64"
                textAnchor="middle"
                fill="white"
                fontSize="11"
                fontWeight="600"
                fontFamily="sans-serif"
              >
                Auth
              </text>

              {/* Notify */}
              <circle cx="260" cy="60" r="28" fill="#10b981" />
              <text
                x="260"
                y="64"
                textAnchor="middle"
                fill="white"
                fontSize="11"
                fontWeight="600"
                fontFamily="sans-serif"
              >
                Notify
              </text>

              {/* Payment */}
              <circle cx="160" cy="160" r="28" fill="#f59e0b" />
              <text
                x="160"
                y="164"
                textAnchor="middle"
                fill="white"
                fontSize="11"
                fontWeight="600"
                fontFamily="sans-serif"
              >
                Payment
              </text>

              {/* Analytics */}
              <circle cx="80" cy="220" r="28" fill="#10b981" />
              <text
                x="80"
                y="224"
                textAnchor="middle"
                fill="white"
                fontSize="11"
                fontWeight="600"
                fontFamily="sans-serif"
              >
                Analytics
              </text>

              {/* ML */}
              <circle cx="240" cy="220" r="28" fill="#ef4444" />
              <text
                x="240"
                y="224"
                textAnchor="middle"
                fill="white"
                fontSize="11"
                fontWeight="600"
                fontFamily="sans-serif"
              >
                ML
              </text>
            </svg>
          </CardContent>
        </Card>

        {/* Service Health */}
        <Card className="border-0 shadow-sm ring-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">
              Service Health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {services.map((svc) => (
              <div
                key={svc.name}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50/50"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-gray-900">
                      {svc.name}
                    </p>
                    <Badge
                      className={`${svc.statusColor} hover:${svc.statusColor}`}
                    >
                      {svc.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span>
                      Uptime: <span className="font-medium text-gray-700">{svc.uptime}</span>
                    </span>
                    <span>
                      Requests: <span className="font-medium text-gray-700">{svc.requests}</span>
                    </span>
                    <span>
                      Latency: <span className="font-medium text-gray-700">{svc.latency}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
