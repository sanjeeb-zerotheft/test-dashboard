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
} from "@zerotheft/shared-ui";
import {
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  FileText,
  Lock,
  Activity,
  Eye,
  Download,
} from "lucide-react";

const complianceCards = [
  {
    framework: "SOC 2",
    status: "Compliant",
    icon: ShieldCheck,
    iconColor: "bg-emerald-100 text-emerald-600",
    lastAudit: "Mar 15, 2025",
    nextAudit: "Mar 15, 2026",
    score: 98,
  },
  {
    framework: "GDPR",
    status: "Compliant",
    icon: Lock,
    iconColor: "bg-emerald-100 text-emerald-600",
    lastAudit: "Jan 20, 2025",
    nextAudit: "Jul 20, 2025",
    score: 96,
  },
  {
    framework: "HIPAA",
    status: "Non-Compliant",
    icon: Activity,
    iconColor: "bg-red-100 text-red-600",
    lastAudit: "Nov 10, 2024",
    nextAudit: "May 10, 2025",
    score: 72,
  },
  {
    framework: "ISO 27001",
    status: "Compliant",
    icon: FileText,
    iconColor: "bg-emerald-100 text-emerald-600",
    lastAudit: "Feb 05, 2025",
    nextAudit: "Feb 05, 2026",
    score: 94,
  },
];

const frameworks = [
  {
    framework: "SOC 2 Type II",
    status: "Compliant",
    lastAudit: "Mar 15, 2025",
    nextAudit: "Mar 15, 2026",
    score: 98,
  },
  {
    framework: "GDPR",
    status: "Compliant",
    lastAudit: "Jan 20, 2025",
    nextAudit: "Jul 20, 2025",
    score: 96,
  },
  {
    framework: "HIPAA",
    status: "Non-Compliant",
    lastAudit: "Nov 10, 2024",
    nextAudit: "May 10, 2025",
    score: 72,
  },
  {
    framework: "ISO 27001",
    status: "Compliant",
    lastAudit: "Feb 05, 2025",
    nextAudit: "Feb 05, 2026",
    score: 94,
  },
  {
    framework: "PCI DSS",
    status: "Compliant",
    lastAudit: "Dec 12, 2024",
    nextAudit: "Dec 12, 2025",
    score: 91,
  },
];

function getStatusBadge(status: string) {
  if (status === "Compliant") {
    return (
      <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0">
        <CheckCircle2 className="w-3 h-3 mr-1" />
        Compliant
      </Badge>
    );
  }
  return (
    <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-0">
      <AlertTriangle className="w-3 h-3 mr-1" />
      Non-Compliant
    </Badge>
  );
}

export default function CompliancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Compliance</h1>
        <p className="text-sm text-gray-500 mt-1">
          Monitor compliance status across frameworks
        </p>
      </div>

      {/* Compliance Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {complianceCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.framework} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{card.framework}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      {card.status === "Compliant" ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                      )}
                      <p
                        className={`text-sm font-semibold ${
                          card.status === "Compliant"
                            ? "text-emerald-700"
                            : "text-red-700"
                        }`}
                      >
                        {card.status}
                      </p>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      Last: {card.lastAudit}
                    </p>
                    <p className="text-xs text-gray-400">
                      Next: {card.nextAudit}
                    </p>
                  </div>
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${card.iconColor}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>Compliance Score</span>
                    <span className="font-medium text-gray-900">
                      {card.score}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        card.status === "Compliant"
                          ? "bg-emerald-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${card.score}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Frameworks Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            Compliance Frameworks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Framework</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Audit</TableHead>
                <TableHead>Next Audit</TableHead>
                <TableHead>Score</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {frameworks.map((fw) => (
                <TableRow key={fw.framework}>
                  <TableCell className="font-medium text-gray-900">
                    {fw.framework}
                  </TableCell>
                  <TableCell>{getStatusBadge(fw.status)}</TableCell>
                  <TableCell className="text-gray-500">{fw.lastAudit}</TableCell>
                  <TableCell className="text-gray-500">{fw.nextAudit}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            fw.status === "Compliant"
                              ? "bg-emerald-500"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${fw.score}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-700 font-medium">
                        {fw.score}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="text-gray-500 hover:text-gray-900"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="text-gray-500 hover:text-gray-900"
                      >
                        <Download className="w-4 h-4" />
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
