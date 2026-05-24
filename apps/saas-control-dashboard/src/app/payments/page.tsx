"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Badge,
} from "@zerotheft/shared-ui";
import { ArrowLeftRight } from "lucide-react";

const transactions = [
  {
    id: "TXN-001234",
    tenant: "Acme Corp",
    amount: 4500,
    type: "Payment",
    status: "Success",
    date: "2025-05-20",
    method: "Credit Card",
  },
  {
    id: "TXN-001235",
    tenant: "Beta Inc",
    amount: 1200,
    type: "Payment",
    status: "Success",
    date: "2025-05-19",
    method: "ACH",
  },
  {
    id: "TXN-001236",
    tenant: "Gamma LLC",
    amount: -299,
    type: "Refund",
    status: "Pending",
    date: "2025-05-18",
    method: "Credit Card",
  },
  {
    id: "TXN-001237",
    tenant: "Delta Co",
    amount: 6000,
    type: "Payment",
    status: "Error",
    date: "2025-05-17",
    method: "Wire",
  },
  {
    id: "TXN-001238",
    tenant: "Epsilon Ltd",
    amount: 1100,
    type: "Payment",
    status: "Success",
    date: "2025-05-16",
    method: "Credit Card",
  },
  {
    id: "TXN-001239",
    tenant: "Zeta Group",
    amount: -1200,
    type: "Refund",
    status: "Success",
    date: "2025-05-15",
    method: "ACH",
  },
];

const disputes = [
  {
    id: "DSP-001",
    transaction: "TXN-001234",
    tenant: "Acme Corp",
    amount: 4500,
    reason: "Product not received",
    status: "Open",
  },
  {
    id: "DSP-002",
    transaction: "TXN-001237",
    tenant: "Delta Co",
    amount: 6000,
    reason: "Duplicate charge",
    status: "Under Review",
  },
  {
    id: "DSP-003",
    transaction: "TXN-001235",
    tenant: "Beta Inc",
    amount: 1200,
    reason: "Unauthorized transaction",
    status: "Resolved",
  },
];

function statusBadge(status: string) {
  if (status === "Success") {
    return (
      <Badge className="bg-emerald-100 text-emerald-600 hover:bg-emerald-100">
        {status}
      </Badge>
    );
  }
  if (status === "Pending") {
    return (
      <Badge className="bg-amber-100 text-amber-600 hover:bg-amber-100">
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

function disputeStatusBadge(status: string) {
  if (status === "Open") {
    return (
      <Badge className="bg-red-100 text-red-600 hover:bg-red-100">
        {status}
      </Badge>
    );
  }
  if (status === "Under Review") {
    return (
      <Badge className="bg-amber-100 text-amber-600 hover:bg-amber-100">
        {status}
      </Badge>
    );
  }
  return (
    <Badge className="bg-emerald-100 text-emerald-600 hover:bg-emerald-100">
      {status}
    </Badge>
  );
}

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Payment Reconciliation & Refunds
        </h1>
      </div>

      {/* Transaction History */}
      <Card className="border-0 shadow-sm ring-0">
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle className="text-base font-semibold">
            Transaction History
          </CardTitle>
          <Button
            size="sm"
            className="bg-[#ff6b47] hover:bg-[#ff6b47]/90 text-white"
          >
            <ArrowLeftRight className="w-4 h-4 mr-1.5" />
            Issue Refund
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Tenant</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Method</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((txn) => (
                <TableRow key={txn.id}>
                  <TableCell className="font-medium text-gray-900">
                    {txn.id}
                  </TableCell>
                  <TableCell>{txn.tenant}</TableCell>
                  <TableCell>
                    <span
                      className={
                        txn.amount >= 0
                          ? "text-emerald-600 font-medium"
                          : "text-red-600 font-medium"
                      }
                    >
                      {txn.amount >= 0
                        ? `$${txn.amount.toLocaleString()}`
                        : `-$${Math.abs(txn.amount).toLocaleString()}`}
                    </span>
                  </TableCell>
                  <TableCell>{txn.type}</TableCell>
                  <TableCell>{statusBadge(txn.status)}</TableCell>
                  <TableCell className="text-gray-500">{txn.date}</TableCell>
                  <TableCell>{txn.method}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Active Disputes */}
      <Card className="border-0 shadow-sm ring-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            Active Disputes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dispute ID</TableHead>
                <TableHead>Transaction</TableHead>
                <TableHead>Tenant</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {disputes.map((dsp) => (
                <TableRow key={dsp.id}>
                  <TableCell className="font-medium text-gray-900">
                    {dsp.id}
                  </TableCell>
                  <TableCell>
                    <button className="text-blue-600 hover:underline font-medium">
                      {dsp.transaction}
                    </button>
                  </TableCell>
                  <TableCell>{dsp.tenant}</TableCell>
                  <TableCell>
                    ${dsp.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>{dsp.reason}</TableCell>
                  <TableCell>{disputeStatusBadge(dsp.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
