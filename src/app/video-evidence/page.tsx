"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Play,
  Scissors,
  Eye,
  EyeOff,
  ScissorsIcon,
  Download,
  Link2,
  X,
} from "lucide-react";

const videoClips = [
  { name: "Clip 1", duration: "00:15" },
  { name: "Clip 2", duration: "00:30" },
  { name: "Clip 3", duration: "00:45" },
  { name: "Clip 4", duration: "00:60" },
];

const redactedRegions = [
  { name: "Face", time: "00:15" },
  { name: "License Plate", time: "00:42" },
];

export default function VideoEvidencePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Video Evidence & Forensics</h1>
          <p className="text-gray-500 mt-1">Edit, redact and export video evidence</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Link2 className="w-4 h-4" />
            Share Link
          </Button>
          <Button className="bg-[#ff6b47] hover:bg-[#e55a3a] text-white gap-2">
            <Download className="w-4 h-4" />
            Export to PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Video Player */}
        <div className="xl:col-span-2 space-y-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-0">
              <div className="aspect-video bg-gray-800 rounded-t-lg flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-12 h-12 text-gray-600 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">Video Player</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline Editor */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-base font-semibold">Timeline Editor</CardTitle>
              <Button size="sm" variant="outline" className="h-8 gap-1">
                <Scissors className="w-3.5 h-3.5" />
                Trim
              </Button>
            </CardHeader>
            <CardContent>
              <div className="relative h-12 bg-gray-100 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="flex-1 border-r border-gray-200" />
                  ))}
                </div>
                <div className="absolute top-0 bottom-0 left-[35%] w-0.5 bg-[#ff6b47]" />
              </div>
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>00:00</span>
                <span>00:30</span>
                <span>01:00</span>
                <span>01:30</span>
                <span>02:00</span>
              </div>
            </CardContent>
          </Card>

          {/* Video Clips */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Video Clips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {videoClips.map((clip) => (
                  <div key={clip.name} className="aspect-video bg-gray-800 rounded-lg overflow-hidden relative group">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="w-6 h-6 text-gray-600" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                      <p className="text-xs text-white font-medium">{clip.name}</p>
                      <p className="text-[10px] text-gray-400">{clip.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4">
          {/* Redaction Tools */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Redaction Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start gap-2 h-10 bg-[#3b4a5e] text-white border-0 hover:bg-[#2d3a4d]">
                <Eye className="w-4 h-4" />
                Auto-Detect Faces
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 h-10 bg-[#3b4a5e] text-white border-0 hover:bg-[#2d3a4d]">
                <EyeOff className="w-4 h-4" />
                Manual Redaction
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 h-10 bg-[#3b4a5e] text-white border-0 hover:bg-[#2d3a4d]">
                <ScissorsIcon className="w-4 h-4" />
                Blur Region
              </Button>

              <div className="pt-3">
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Redacted Regions</p>
                <div className="space-y-2">
                  {redactedRegions.map((region) => (
                    <div key={region.name} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm text-gray-900">{region.name}</p>
                        <p className="text-xs text-gray-500">Time: {region.time}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50 h-7 text-xs">
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Export Options */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Export Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <Label className="text-xs">Format</Label>
                <Select defaultValue="mp4">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mp4">MP4 (Video)</SelectItem>
                    <SelectItem value="avi">AVI</SelectItem>
                    <SelectItem value="mov">MOV</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Quality</Label>
                <Select defaultValue="1080">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1080">High (1080p)</SelectItem>
                    <SelectItem value="720">Medium (720p)</SelectItem>
                    <SelectItem value="480">Low (480p)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="watermark" />
                <Label htmlFor="watermark" className="text-sm">Add watermark</Label>
              </div>
            </CardContent>
          </Card>

          {/* Secure Share */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Secure Share</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-500">Generate a secure, time-limited link</p>
              <div className="space-y-2">
                <Input placeholder="Recipient email" />
                <Select defaultValue="24h">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1h">Expires in 1 hour</SelectItem>
                    <SelectItem value="24h">Expires in 24 hours</SelectItem>
                    <SelectItem value="7d">Expires in 7 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white gap-2">
                <Link2 className="w-4 h-4" />
                Generate Link
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
