"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MapPin, User, Clock, Eye, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const tasks = [
  {
    task: "Investigate Parking Lot Alert",
    assignee: "John Doe",
    location: "Parking Lot 3",
    priority: "URGENT",
    status: "IN PROGRESS",
    due: "30 min",
    time: "10 min ago",
  },
  {
    task: "Check Server Room Access",
    assignee: "Jane Smith",
    location: "Server Room",
    priority: "HIGH",
    status: "PENDING",
    due: "1 hour",
    time: "25 min ago",
  },
  {
    task: "Review Main Entrance Footage",
    assignee: "Mike Johnson",
    location: "Main Entrance",
    priority: "MEDIUM",
    status: "IN PROGRESS",
    due: "2 hours",
    time: "45 min ago",
  },
  {
    task: "Replace Camera Battery",
    assignee: "Sarah Williams",
    location: "Warehouse B",
    priority: "LOW",
    status: "PENDING",
    due: "4 hours",
    time: "1 hour ago",
  },
  {
    task: "Verify False Alarm",
    assignee: "John Doe",
    location: "Reception Area",
    priority: "MEDIUM",
    status: "COMPLETED",
    due: "Completed",
    time: "2 hours ago",
  },
];

const taskStats = [
  { label: "Total Tasks", value: 24, color: "bg-blue-500" },
  { label: "In Progress", value: 8, color: "bg-amber-500" },
  { label: "Completed Today", value: 12, color: "bg-emerald-500" },
  { label: "Overdue", value: 2, color: "bg-red-500" },
];

function getPriorityBadge(priority: string) {
  switch (priority) {
    case "URGENT":
      return <Badge className="bg-red-500 text-white text-[10px]">URGENT</Badge>;
    case "HIGH":
      return <Badge className="bg-orange-500 text-white text-[10px]">HIGH</Badge>;
    case "MEDIUM":
      return <Badge className="bg-blue-500 text-white text-[10px]">MEDIUM</Badge>;
    case "LOW":
      return <Badge className="bg-gray-500 text-white text-[10px]">LOW</Badge>;
    default:
      return <Badge className="bg-gray-500 text-white text-[10px]">{priority}</Badge>;
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case "IN PROGRESS":
      return <Badge className="bg-[#ff6b47] text-white text-[10px]">IN PROGRESS</Badge>;
    case "PENDING":
      return <Badge className="bg-gray-500 text-white text-[10px]">PENDING</Badge>;
    case "COMPLETED":
      return <Badge className="bg-emerald-500 text-white text-[10px]">COMPLETED</Badge>;
    default:
      return <Badge className="bg-gray-500 text-white text-[10px]">{status}</Badge>;
  }
}

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Task & Field Operations</h1>
        <p className="text-gray-500 mt-1">Manage security tasks and field operations</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Active Tasks */}
        <Card className="xl:col-span-2 border-0 shadow-sm">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold">Active Tasks</CardTitle>
            <div className="relative w-48">
              <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400" />
              <Input placeholder="Search tasks..." className="pl-9 h-9" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">TASK</TableHead>
                    <TableHead className="text-xs">ASSIGNEE</TableHead>
                    <TableHead className="text-xs">LOCATION</TableHead>
                    <TableHead className="text-xs">PRIORITY</TableHead>
                    <TableHead className="text-xs">STATUS</TableHead>
                    <TableHead className="text-xs">DUE</TableHead>
                    <TableHead className="text-xs">ACTION</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tasks.map((task, idx) => (
                    <TableRow key={idx}>
                      <TableCell>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{task.task}</p>
                          <p className="text-xs text-gray-400">{task.time}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-600">
                            {task.assignee.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <span className="text-sm text-gray-700">{task.assignee}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          <span className="text-sm text-gray-700">{task.location}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                      <TableCell>{getStatusBadge(task.status)}</TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-700">{task.due}</span>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" className="h-7 text-xs">
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Right Sidebar */}
        <div className="space-y-4">
          {/* Location Map */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Location Map</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-8 h-8 text-gray-400" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    <span className="text-sm text-gray-700">Parking Lot 3</span>
                  </div>
                  <Badge variant="outline" className="text-xs">2 tasks</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    <span className="text-sm text-gray-700">Server Room</span>
                  </div>
                  <Badge variant="outline" className="text-xs">1 tasks</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-sm text-gray-700">Main Entrance</span>
                  </div>
                  <Badge variant="outline" className="text-xs">1 tasks</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Task Statistics */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Task Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {taskStats.map((stat) => (
                <div key={stat.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-1 h-5 ${stat.color} rounded-full`} />
                    <span className="text-sm text-gray-700">{stat.label}</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900">{stat.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full bg-[#ff6b47] hover:bg-[#e55a3a] text-white gap-2">
                <User className="w-4 h-4" />
                Assign Task
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <Clock className="w-4 h-4" />
                View Schedule
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <MapPin className="w-4 h-4" />
                Field View
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
