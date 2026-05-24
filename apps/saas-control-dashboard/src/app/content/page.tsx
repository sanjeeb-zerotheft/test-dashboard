"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Badge,
  Input,
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@zerotheft/shared-ui";
import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  FileText,
  Video,
  Image,
  Mic,
} from "lucide-react";
import { useState } from "react";

const contentItems = [
  {
    title: "Getting Started Guide",
    type: "Article",
    author: "Sarah Chen",
    status: "Published",
    published: "Jun 10, 2024",
    views: "12.4K",
  },
  {
    title: "API Tutorial Series - Part 1",
    type: "Video",
    author: "Mike Johnson",
    status: "Published",
    published: "Jun 8, 2024",
    views: "8.2K",
  },
  {
    title: "Product Roadmap Q3 2024",
    type: "Article",
    author: "Emily Davis",
    status: "Draft",
    published: "—",
    views: "—",
  },
  {
    title: "Customer Onboarding Flow",
    type: "Image",
    author: "Alex Kim",
    status: "Published",
    published: "Jun 5, 2024",
    views: "5.1K",
  },
  {
    title: "Security Best Practices",
    type: "Article",
    author: "David Park",
    status: "Archived",
    published: "May 20, 2024",
    views: "3.8K",
  },
  {
    title: "Webhook Integration Guide",
    type: "Article",
    author: "Sarah Chen",
    status: "Draft",
    published: "—",
    views: "—",
  },
  {
    title: "Team Training Recording",
    type: "Audio",
    author: "Lisa Wang",
    status: "Published",
    published: "Jun 1, 2024",
    views: "1.9K",
  },
  {
    title: "Dashboard Overview",
    type: "Video",
    author: "Mike Johnson",
    status: "Published",
    published: "May 28, 2024",
    views: "6.7K",
  },
];

function getStatusBadge(status: string) {
  switch (status) {
    case "Published":
      return (
        <Badge className="bg-emerald-100 text-emerald-600 border-0 hover:bg-emerald-100">
          Published
        </Badge>
      );
    case "Draft":
      return (
        <Badge className="bg-gray-100 text-gray-600 border-0 hover:bg-gray-100">
          Draft
        </Badge>
      );
    case "Archived":
      return (
        <Badge className="bg-red-100 text-red-600 border-0 hover:bg-red-100">
          Archived
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}

function getTypeIcon(type: string) {
  switch (type) {
    case "Article":
      return <FileText className="w-4 h-4 text-blue-500" />;
    case "Video":
      return <Video className="w-4 h-4 text-red-500" />;
    case "Image":
      return <Image className="w-4 h-4 text-purple-500" />;
    case "Audio":
      return <Mic className="w-4 h-4 text-amber-500" />;
    default:
      return <FileText className="w-4 h-4 text-gray-500" />;
  }
}

export default function ContentManagementPage() {
  const [search, setSearch] = useState("");

  const filtered = contentItems.filter(
    (item) =>
      search === "" ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.author.toLowerCase().includes(search.toLowerCase()) ||
      item.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage articles, videos, images, and other content assets
        </p>
      </div>

      {/* Search + Add */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by title, author, or type..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button className="bg-[#ff6b47] hover:bg-[#ff6b47]/90 text-white">
              <Plus className="w-4 h-4 mr-1" />
              Add Content
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Content Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">All Content</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Published</TableHead>
                <TableHead>Views</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((item) => (
                <TableRow key={item.title}>
                  <TableCell className="font-medium text-gray-900">
                    {item.title}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-gray-700">
                      {getTypeIcon(item.type)}
                      <span className="text-sm">{item.type}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-700">{item.author}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell className="text-gray-500">
                    {item.published}
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {item.views}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon-xs">
                        <Eye className="w-3.5 h-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon-xs">
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon-xs">
                        <Trash2 className="w-3.5 h-3.5" />
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
