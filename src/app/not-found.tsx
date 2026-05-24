import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f4f6]">
      <div className="text-center space-y-6 p-8">
        <div className="w-20 h-20 bg-[#1e2330] rounded-2xl flex items-center justify-center mx-auto">
          <Shield className="w-10 h-10 text-[#ff6b47]" />
        </div>
        <div>
          <h1 className="text-6xl font-bold text-gray-900">404</h1>
          <p className="text-xl text-gray-500 mt-2">Page not found</p>
        </div>
        <p className="text-gray-400 max-w-sm mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link href="/">
          <Button className="bg-[#ff6b47] hover:bg-[#e55a3a] text-white gap-2 mt-4">
            <Home className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
