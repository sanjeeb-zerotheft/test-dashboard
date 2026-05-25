"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Button,
  Badge,
  Switch,
} from "@zerotheft/shared-ui";
import {
  ShieldCheck,
  CreditCard,
  ChevronRight,
  Calendar,
  CircleCheck,
} from "lucide-react";

const addOns = [
  {
    name: "Priority Support",
    price: "$29/mo",
    nextBilling: "March 1st",
    status: "Active",
    statusVariant: "default" as const,
    enabled: true,
  },
  {
    name: "SSO Integration",
    price: "$15/mo",
    nextBilling: "April 15th",
    status: "Trialing",
    statusVariant: "secondary" as const,
    enabled: true,
  },
  {
    name: "Audit Logs",
    price: "$12/mo",
    nextBilling: "March 1st",
    status: "Active",
    statusVariant: "default" as const,
    enabled: true,
  },
];

const paymentMethods = [
  {
    type: "Visa",
    last4: "4242",
    expiry: "12/28",
    default: true,
    icon: CreditCard,
  },
  {
    type: "Mastercard",
    last4: "8888",
    expiry: "09/27",
    default: false,
    icon: CreditCard,
  },
];

export default function BillingPage() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Billing & Payments</h1>
        <p className="text-gray-500 mt-1">
          Manage your plan, payment methods, and add-ons.
        </p>
      </div>

      {/* Current Plan Card */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Current Plan</p>
              <h2 className="text-xl font-bold text-gray-900 mt-1">Business Pro</h2>
              <p className="text-2xl font-bold text-gray-900 mt-2">$299<span className="text-sm font-normal text-gray-500">/mo</span></p>
            </div>
            <Button
              variant="outline"
              className="border-gray-300 text-sm"
            >
              Change Plan
            </Button>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-3">
            <Calendar className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Next Payment</p>
              <p className="text-sm font-medium text-gray-900">March 1, 2026</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">Visa ending in 4242</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Safe & Secure Banner */}
      <div className="rounded-xl border border-[#ff6b47]/30 bg-[#ff6b47]/5 p-4 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-[#ff6b47] shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-gray-900">Safe & Secure</p>
          <p className="text-sm text-gray-600 mt-0.5">
            All transactions are encrypted and SOC2 compliant.
          </p>
        </div>
      </div>

      {/* Active Add-Ons */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-0">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold text-gray-900">Your Active Add-Ons</CardTitle>
              <CardDescription>Manage additional features for your account</CardDescription>
            </div>
            <button className="text-[#ff6b47] text-sm font-medium hover:underline flex items-center gap-0.5">
              Manage All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-3">
            {addOns.map((addon) => (
              <div
                key={addon.name}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-900">{addon.name}</p>
                    <Badge variant={addon.statusVariant} className="text-xs">
                      {addon.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {addon.price} · Next billing {addon.nextBilling}
                  </p>
                </div>
                <Switch defaultChecked={addon.enabled} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-0">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold text-gray-900">Payment Methods</CardTitle>
              <CardDescription>Cards and wallets on file</CardDescription>
            </div>
            <Button
              variant="outline"
              className="border-gray-300 text-sm"
            >
              <CreditCard className="w-4 h-4 mr-2" /> Add Method
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <div
                key={method.last4}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                    <method.icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {method.type} ending in {method.last4}
                    </p>
                    <p className="text-xs text-gray-500">Expires {method.expiry}</p>
                  </div>
                </div>
                {method.default ? (
                  <Badge variant="secondary" className="text-xs">Default</Badge>
                ) : (
                  <Button variant="ghost" className="text-sm h-auto py-1 px-2">
                    Set Default
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Money Back Guarantee Footer */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 flex items-start gap-3 shadow-sm">
        <CircleCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-gray-900">15-Day Money Back Guarantee</p>
          <p className="text-sm text-gray-500 mt-0.5">
            Not satisfied? Cancel within 15 days for a full refund. No questions asked.
          </p>
        </div>
      </div>
    </div>
  );
}
