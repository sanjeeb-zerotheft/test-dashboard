import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZeroTheft - Security Dashboard",
  description: "AI-powered security monitoring and detection system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#f3f4f6]">
        <TooltipProvider>
          <Sidebar />
          <main className="lg:pl-64 pt-14 lg:pt-0 min-h-screen">
            <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto">
              {children}
            </div>
          </main>
        </TooltipProvider>
      </body>
    </html>
  );
}
