"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  Button,
  Checkbox,
} from "@zerotheft/shared-ui";
import { Plus, Shield, Users, Building, CreditCard, Settings, FileText } from "lucide-react";

const roles = [
  { id: "super-admin", name: "Super Admin" },
  { id: "tenant-admin", name: "Tenant Admin" },
  { id: "user-manager", name: "User Manager" },
  { id: "billing-manager", name: "Billing Manager" },
  { id: "developer", name: "Developer" },
  { id: "support-agent", name: "Support Agent" },
];

const permissionCategories = [
  {
    id: "users",
    name: "Users",
    icon: Users,
    permissions: [
      { id: "users-view", label: "View Users", checked: true },
      { id: "users-create", label: "Create Users", checked: true },
      { id: "users-edit", label: "Edit Users", checked: true },
      { id: "users-delete", label: "Delete Users", checked: true },
      { id: "users-export", label: "Export Users", checked: false },
    ],
  },
  {
    id: "tenants",
    name: "Tenants",
    icon: Building,
    permissions: [
      { id: "tenants-view", label: "View Tenants", checked: true },
      { id: "tenants-create", label: "Create Tenants", checked: true },
      { id: "tenants-edit", label: "Edit Tenants", checked: false },
      { id: "tenants-delete", label: "Delete Tenants", checked: false },
    ],
  },
  {
    id: "billing",
    name: "Billing",
    icon: CreditCard,
    permissions: [
      { id: "billing-view", label: "View Invoices", checked: true },
      { id: "billing-create", label: "Create Invoices", checked: false },
      { id: "billing-edit", label: "Edit Plans", checked: false },
      { id: "billing-refund", label: "Process Refunds", checked: false },
      { id: "billing-export", label: "Export Reports", checked: true },
    ],
  },
  {
    id: "system",
    name: "System",
    icon: Settings,
    permissions: [
      { id: "system-view", label: "View Logs", checked: true },
      { id: "system-config", label: "System Config", checked: true },
      { id: "system-alerts", label: "Manage Alerts", checked: false },
      { id: "system-backup", label: "Run Backups", checked: false },
    ],
  },
  {
    id: "content",
    name: "Content",
    icon: FileText,
    permissions: [
      { id: "content-view", label: "View Content", checked: true },
      { id: "content-create", label: "Create Content", checked: false },
      { id: "content-edit", label: "Edit Content", checked: false },
      { id: "content-delete", label: "Delete Content", checked: false },
      { id: "content-publish", label: "Publish Content", checked: false },
    ],
  },
];

const defaultPermissions: Record<string, boolean> = {};
permissionCategories.forEach((cat) => {
  cat.permissions.forEach((perm) => {
    defaultPermissions[perm.id] = perm.checked;
  });
});

export default function RolesPage() {
  const [selectedRole, setSelectedRole] = useState("super-admin");
  const [permissions, setPermissions] = useState(defaultPermissions);

  const togglePermission = (permId: string) => {
    setPermissions((prev) => ({
      ...prev,
      [permId]: !prev[permId],
    }));
  };

  const selectedRoleName = roles.find((r) => r.id === selectedRole)?.name || "";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Role & Permission Engine</h1>
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <div className="flex flex-col lg:flex-row">
            {/* Left: Roles List */}
            <div className="w-full lg:w-72 border-b lg:border-b-0 lg:border-r border-gray-100 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-gray-700" />
                <h2 className="text-base font-semibold text-gray-900">Roles</h2>
              </div>
              <div className="space-y-1">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedRole === role.id
                        ? "bg-[#ff6b47]/10 text-[#ff6b47]"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {role.name}
                  </button>
                ))}
              </div>
              <Button
                variant="outline"
                className="mt-4 w-full text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                <Plus className="w-4 h-4" />
                Add New Role
              </Button>
            </div>

            {/* Right: Permissions */}
            <div className="flex-1 p-5">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-base font-semibold text-gray-900">
                  Permissions for: {selectedRoleName}
                </h2>
                <Button className="bg-[#ff6b47] hover:bg-[#ff6b47]/90 text-white">
                  Save Changes
                </Button>
              </div>

              <div className="space-y-6">
                {permissionCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <div
                      key={category.id}
                      className="border border-gray-100 rounded-lg p-4"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Icon className="w-4 h-4 text-gray-500" />
                        <h3 className="text-sm font-semibold text-gray-900">
                          {category.name}
                        </h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {category.permissions.map((perm) => (
                          <label
                            key={perm.id}
                            className="flex items-center gap-2.5 cursor-pointer group"
                          >
                            <Checkbox
                              checked={permissions[perm.id] || false}
                              onCheckedChange={() => togglePermission(perm.id)}
                            />
                            <span className="text-sm text-gray-600 group-hover:text-gray-900">
                              {perm.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
