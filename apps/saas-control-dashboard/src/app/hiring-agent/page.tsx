"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@zerotheft/shared-ui";
import { Badge } from "@zerotheft/shared-ui";
import { Button } from "@zerotheft/shared-ui";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@zerotheft/shared-ui";
import { Briefcase, Users, Calendar, Award, Star, Eye, MessageSquare, CheckCircle2 } from "lucide-react";

const stats = [
  { label: "Open Positions", value: "12", change: "+2 this week", icon: Briefcase, color: "bg-blue-100 text-blue-600" },
  { label: "Candidates", value: "186", change: "+24 this week", icon: Users, color: "bg-emerald-100 text-emerald-600" },
  { label: "Interviews Scheduled", value: "34", change: "Next: Tomorrow", icon: Calendar, color: "bg-amber-100 text-amber-600" },
  { label: "Offers Extended", value: "5", change: "3 accepted", icon: Award, color: "bg-purple-100 text-purple-600" },
];

const pipeline = [
  { stage: "Applied", count: 186, color: "bg-blue-500" },
  { stage: "Screening", count: 64, color: "bg-cyan-500" },
  { stage: "Interview", count: 34, color: "bg-amber-500" },
  { stage: "Offer", count: 12, color: "bg-purple-500" },
  { stage: "Hired", count: 5, color: "bg-emerald-500" },
];

const candidates = [
  { name: "Alice Johnson", position: "Senior Backend Engineer", stage: "Interview", applied: "2024-05-10", rating: 4.8 },
  { name: "Bob Smith", position: "Product Designer", stage: "Offer", applied: "2024-05-08", rating: 4.5 },
  { name: "Carol White", position: "DevOps Engineer", stage: "Screening", applied: "2024-05-12", rating: 4.2 },
  { name: "David Lee", position: "Frontend Developer", stage: "Interview", applied: "2024-05-09", rating: 4.6 },
  { name: "Emma Brown", position: "Data Analyst", stage: "Applied", applied: "2024-05-14", rating: 3.9 },
  { name: "Frank Miller", position: "Security Engineer", stage: "Hired", applied: "2024-04-28", rating: 4.9 },
];

function getStageBadge(stage: string) {
  switch (stage) {
    case "Applied":
      return <Badge className="bg-blue-500 text-white text-[10px]">Applied</Badge>;
    case "Screening":
      return <Badge className="bg-cyan-500 text-white text-[10px]">Screening</Badge>;
    case "Interview":
      return <Badge className="bg-amber-500 text-white text-[10px]">Interview</Badge>;
    case "Offer":
      return <Badge className="bg-purple-500 text-white text-[10px]">Offer</Badge>;
    case "Hired":
      return <Badge className="bg-emerald-500 text-white text-[10px]">Hired</Badge>;
    default:
      return <Badge className="bg-gray-500 text-white text-[10px]">{stage}</Badge>;
  }
}

function renderStars(rating: number) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i < fullStars
              ? "text-amber-400 fill-amber-400"
              : i === fullStars && hasHalf
              ? "text-amber-400 fill-amber-400/50"
              : "text-gray-300"
          }`}
        />
      ))}
      <span className="text-xs text-gray-600 ml-1">{rating}</span>
    </div>
  );
}

export default function HiringAgentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Hiring Agent</h1>
        <p className="text-gray-500 mt-1">Track recruitment pipeline and candidate progress</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  {stat.change && (
                    <p className="text-xs text-emerald-600 mt-1">{stat.change}</p>
                  )}
                </div>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pipeline */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Recruitment Pipeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            {pipeline.map((stage, idx) => (
              <div key={stage.stage} className="flex-1 flex items-center gap-2">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium text-gray-700">{stage.stage}</span>
                    <span className="text-xs font-bold text-gray-900">{stage.count}</span>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${stage.color}`}
                      style={{ width: `${Math.min(100, (stage.count / 186) * 100)}%` }}
                    />
                  </div>
                </div>
                {idx < pipeline.length - 1 && (
                  <div className="w-4 h-px bg-gray-300 shrink-0" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Candidates Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle className="text-base font-semibold">Candidates</CardTitle>
          <Button size="sm" className="bg-[#ff6b47] hover:bg-[#e55a3a] text-white h-8 text-xs">
            Add Candidate
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">NAME</TableHead>
                  <TableHead className="text-xs">POSITION</TableHead>
                  <TableHead className="text-xs">STAGE</TableHead>
                  <TableHead className="text-xs">APPLIED DATE</TableHead>
                  <TableHead className="text-xs">RATING</TableHead>
                  <TableHead className="text-xs">ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {candidates.map((candidate, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-600">
                          {candidate.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <span className="text-sm font-medium text-gray-900">{candidate.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-700">{candidate.position}</span>
                    </TableCell>
                    <TableCell>{getStageBadge(candidate.stage)}</TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-700">{candidate.applied}</span>
                    </TableCell>
                    <TableCell>{renderStars(candidate.rating)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                          <Eye className="w-3.5 h-3.5 text-gray-500" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                          <MessageSquare className="w-3.5 h-3.5 text-gray-500" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                          <CheckCircle2 className="w-3.5 h-3.5 text-gray-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
