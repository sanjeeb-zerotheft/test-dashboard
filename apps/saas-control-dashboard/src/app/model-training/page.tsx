"use client";

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
  Button,
} from "@zerotheft/shared-ui";
import { Brain, Activity, Gauge, Rocket } from "lucide-react";

const stats = [
  {
    label: "Active Models",
    value: "24",
    icon: Brain,
    color: "bg-blue-100 text-blue-600",
  },
  {
    label: "Training Jobs",
    value: "7",
    icon: Activity,
    color: "bg-amber-100 text-amber-600",
  },
  {
    label: "Avg Accuracy",
    value: "94.2%",
    icon: Gauge,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    label: "Deployed",
    value: "18",
    icon: Rocket,
    color: "bg-purple-100 text-purple-600",
  },
];

const models = [
  {
    name: "Fraud Detector v3",
    type: "XGBoost",
    status: "Deployed",
    accuracy: "96.4%",
    lastTrained: "2025-05-18",
  },
  {
    name: "Anomaly Scout",
    type: "Isolation Forest",
    status: "Training",
    accuracy: "—",
    lastTrained: "In progress",
  },
  {
    name: "Risk Classifier",
    type: "Random Forest",
    status: "Deployed",
    accuracy: "92.1%",
    lastTrained: "2025-05-10",
  },
  {
    name: "Entity Resolver",
    type: "Neural Network",
    status: "Idle",
    accuracy: "89.7%",
    lastTrained: "2025-04-22",
  },
  {
    name: "Pattern Miner",
    type: "LSTM",
    status: "Deployed",
    accuracy: "94.8%",
    lastTrained: "2025-05-15",
  },
  {
    name: "Sentiment Probe",
    type: "Transformer",
    status: "Failed",
    accuracy: "—",
    lastTrained: "2025-05-12",
  },
];

function statusBadge(status: string) {
  if (status === "Deployed") {
    return (
      <Badge className="bg-emerald-100 text-emerald-600 hover:bg-emerald-100">
        {status}
      </Badge>
    );
  }
  if (status === "Training") {
    return (
      <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-100">
        {status}
      </Badge>
    );
  }
  if (status === "Idle") {
    return (
      <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-100">
        {status}
      </Badge>
    );
  }
  return (
    <Badge className="bg-red-100 text-red-600 hover:bg-red-100">
      {status}
    </Badge>
  );
}

export default function ModelTrainingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Model Training</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-0 shadow-sm ring-0">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {stat.value}
                  </p>
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

      {/* Models Table */}
      <Card className="border-0 shadow-sm ring-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            Model Registry
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Model Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Accuracy</TableHead>
                <TableHead>Last Trained</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {models.map((model) => (
                <TableRow key={model.name}>
                  <TableCell className="font-medium text-gray-900">
                    {model.name}
                  </TableCell>
                  <TableCell>{model.type}</TableCell>
                  <TableCell>{statusBadge(model.status)}</TableCell>
                  <TableCell className="text-gray-700">
                    {model.accuracy}
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {model.lastTrained}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {model.status !== "Deployed" && (
                        <Button
                          size="xs"
                          variant="outline"
                          className="h-6 text-xs"
                        >
                          Deploy
                        </Button>
                      )}
                      <Button
                        size="xs"
                        variant="ghost"
                        className="h-6 text-xs text-[#ff6b47] hover:text-[#ff6b47]/80"
                      >
                        Retrain
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
