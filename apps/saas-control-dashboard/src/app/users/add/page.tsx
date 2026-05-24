"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Label,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@zerotheft/shared-ui";
import { Home, ChevronRight } from "lucide-react";

export default function AddUserPage() {
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");

  const handleRoleChange = (value: string | null) => {
    if (value !== null) setRole(value);
  };

  const handleStatusChange = (value: string | null) => {
    if (value !== null) setStatus(value);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-gray-500">
        <Link href="/" className="flex items-center gap-1 hover:text-gray-700">
          <Home className="w-4 h-4" />
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span>Users & Tenants</span>
        <ChevronRight className="w-4 h-4" />
        <Link href="/users" className="hover:text-gray-700">
          User
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">Add</span>
      </nav>

      <h1 className="text-2xl font-bold text-gray-900">User Management</h1>

      <Card className="border-0 shadow-sm max-w-2xl">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Add New User</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">User Name</Label>
            <Input id="name" placeholder="Enter user name" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">User Email</Label>
            <Input id="email" type="email" placeholder="Enter user email" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={role} onValueChange={handleRoleChange}>
              <SelectTrigger id="role" className="w-full">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="super-admin">Super Admin</SelectItem>
                <SelectItem value="tenant-admin">Tenant Admin</SelectItem>
                <SelectItem value="user-manager">User Manager</SelectItem>
                <SelectItem value="billing-manager">Billing Manager</SelectItem>
                <SelectItem value="developer">Developer</SelectItem>
                <SelectItem value="support-agent">Support Agent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={handleStatusChange}>
              <SelectTrigger id="status" className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end pt-2">
            <Button className="bg-[#ff6b47] hover:bg-[#ff6b47]/90 text-white">
              Add User
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
