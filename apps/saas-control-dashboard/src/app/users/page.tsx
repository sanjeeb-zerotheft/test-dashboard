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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Badge,
} from "@zerotheft/shared-ui";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";

const usersData = [
  {
    id: 1,
    name: "Sushan Adhikari",
    email: "sushan.adhikari2060@gmail.com",
    role: "Developer",
    status: "Active",
    created: "Jan 15, 2025",
  },
  {
    id: 2,
    name: "Pramila Sharma",
    email: "pramila.sharma@example.com",
    role: "Manager",
    status: "Active",
    created: "Feb 03, 2025",
  },
  {
    id: 3,
    name: "Rajan Karki",
    email: "rajan.karki@techstart.io",
    role: "Developer",
    status: "Inactive",
    created: "Mar 12, 2025",
  },
  {
    id: 4,
    name: "Anita Gurung",
    email: "anita.gurung@acme.com",
    role: "Manager",
    status: "Active",
    created: "Apr 08, 2025",
  },
  {
    id: 5,
    name: "Bikash Thapa",
    email: "bikash.thapa@dataflow.net",
    role: "Developer",
    status: "Inactive",
    created: "May 01, 2025",
  },
];

export default function UsersPage() {
  const [search, setSearch] = useState("");

  const filteredUsers = usersData.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search users..."
                className="pl-9 w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Link href="/users/add">
              <Button className="bg-[#ff6b47] hover:bg-[#ff6b47]/90 text-white w-full sm:w-auto">
                <Plus className="w-4 h-4" />
                Add User
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User Name</TableHead>
                <TableHead>User Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium text-gray-900">
                    {user.name}
                  </TableCell>
                  <TableCell className="text-gray-500">{user.email}</TableCell>
                  <TableCell className="text-gray-500">{user.role}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        user.status === "Active"
                          ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-100 border-0"
                      }
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full mr-1 ${
                          user.status === "Active"
                            ? "bg-emerald-500"
                            : "bg-gray-400"
                        }`}
                      />
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-500">{user.created}</TableCell>
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
