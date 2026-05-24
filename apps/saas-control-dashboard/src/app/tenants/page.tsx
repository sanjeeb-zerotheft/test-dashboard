"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Badge,
} from "@zerotheft/shared-ui";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";

const tenantsData = [
  {
    id: 1,
    name: "Acme Corp",
    adminEmail: "admin@acme.com",
    users: 24,
    plan: "Enterprise",
    status: "Active",
    created: "Jan 10, 2025",
  },
  {
    id: 2,
    name: "TechStart Inc",
    adminEmail: "admin@techstart.io",
    users: 12,
    plan: "Pro",
    status: "Active",
    created: "Feb 22, 2025",
  },
  {
    id: 3,
    name: "DataFlow Systems",
    adminEmail: "admin@dataflow.net",
    users: 8,
    plan: "Starter",
    status: "Pending",
    created: "Mar 05, 2025",
  },
  {
    id: 4,
    name: "CloudBiz Ltd",
    adminEmail: "admin@cloudbiz.co",
    users: 45,
    plan: "Enterprise",
    status: "Active",
    created: "Apr 18, 2025",
  },
  {
    id: 5,
    name: "AI Ventures",
    adminEmail: "admin@aiventures.ai",
    users: 6,
    plan: "Pro",
    status: "Pending",
    created: "May 02, 2025",
  },
];

export default function TenantsPage() {
  const [search, setSearch] = useState("");

  const filteredTenants = tenantsData.filter(
    (tenant) =>
      tenant.name.toLowerCase().includes(search.toLowerCase()) ||
      tenant.adminEmail.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Tenant Management</h1>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search tenants..."
                className="pl-9 w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Link href="/tenants/add">
              <Button className="bg-[#ff6b47] hover:bg-[#ff6b47]/90 text-white w-full sm:w-auto">
                <Plus className="w-4 h-4" />
                Add Tenant
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tenant Name</TableHead>
                <TableHead>Admin Email</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTenants.map((tenant) => (
                <TableRow key={tenant.id}>
                  <TableCell className="font-medium text-gray-900">
                    {tenant.name}
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {tenant.adminEmail}
                  </TableCell>
                  <TableCell className="text-gray-500">{tenant.users}</TableCell>
                  <TableCell className="text-gray-500">{tenant.plan}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        tenant.status === "Active"
                          ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0"
                          : "bg-amber-100 text-amber-700 hover:bg-amber-100 border-0"
                      }
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full mr-1 ${
                          tenant.status === "Active"
                            ? "bg-emerald-500"
                            : "bg-amber-500"
                        }`}
                      />
                      {tenant.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-500">{tenant.created}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon-sm" className="text-gray-500 hover:text-gray-900">
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon-sm" className="text-gray-500 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
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
