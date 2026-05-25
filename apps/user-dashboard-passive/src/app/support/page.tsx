"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  Button,
  Input,
  Label,
  Textarea,
  Badge,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@zerotheft/shared-ui";
import { Search, ChevronDown, Eye } from "lucide-react";

const faqs = [
  {
    question: "How do I add a new camera?",
    answer:
      "Navigate to the Cameras section and click the 'Add Camera' button. Follow the on-screen instructions to connect your device.",
  },
  {
    question: "What happens when my camera goes offline?",
    answer:
      "You will receive an immediate alert if Camera Offline Alerts are enabled. Check your network connection and power supply, then review the device status in the Cameras section.",
  },
  {
    question: "How do I upgrade my subscription?",
    answer:
      "Go to the Subscription page and select the plan you want to upgrade to. Click 'Upgrade Plan' and complete the payment process.",
  },
  {
    question: "How to download video evidence?",
    answer:
      "Open the Alerts or Cameras section, select the relevant camera and time range, then click the download icon to save the video clip to your device.",
  },
];

const tickets = [
  {
    id: "#T-1024",
    subject: "Camera not connecting",
    status: "Open",
    created: "May 20, 2026",
  },
  {
    id: "#T-1023",
    subject: "Billing inquiry",
    status: "Resolved",
    created: "May 18, 2026",
  },
  {
    id: "#T-1022",
    subject: "False alert settings",
    status: "In Progress",
    created: "May 15, 2026",
  },
  {
    id: "#T-1021",
    subject: "Request for API access",
    status: "Open",
    created: "May 12, 2026",
  },
];

const statusBadgeStyles: Record<string, string> = {
  Open: "bg-[#ff6b47]/10 text-[#ff6b47]",
  Resolved: "bg-emerald-100 text-emerald-700",
  "In Progress": "bg-blue-100 text-blue-700",
};

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const filteredFaqs = faqs.filter((f) =>
    f.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Support Center</h1>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search for help..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* FAQ Accordion */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4 space-y-2">
          <h3 className="font-semibold text-gray-900 mb-4">
            Frequently Asked Questions
          </h3>
          {filteredFaqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-gray-100 rounded-lg overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 transition-colors"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <span className="text-sm font-medium text-gray-900">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-500 transition-transform ${
                    openFaq === idx ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-3 pb-3 text-sm text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
          {filteredFaqs.length === 0 && (
            <p className="text-sm text-gray-500">No results found.</p>
          )}
        </CardContent>
      </Card>

      {/* Contact Support + Recent Tickets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Form */}
        <Card className="lg:col-span-1 border-0 shadow-sm">
          <CardContent className="p-4 space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900">Contact Support</h3>
              <p className="text-sm text-gray-500 mt-1">
                Send us a message and we will get back to you.
              </p>
            </div>
            <div className="space-y-2">
              <Label>Subject</Label>
              <Input placeholder="Enter subject" />
            </div>
            <div className="space-y-2">
              <Label>Message</Label>
              <Textarea placeholder="Describe your issue..." rows={5} />
            </div>
            <Button className="w-full bg-[#ff6b47] hover:bg-[#e55a3a] text-white">
              Create Ticket
            </Button>
          </CardContent>
        </Card>

        {/* Recent Tickets */}
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">
              Recent Tickets
            </h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket ID</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-medium text-gray-900">
                      {ticket.id}
                    </TableCell>
                    <TableCell>{ticket.subject}</TableCell>
                    <TableCell>
                      <Badge className={statusBadgeStyles[ticket.status]}>
                        {ticket.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-500">
                      {ticket.created}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-500 hover:text-gray-900"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
