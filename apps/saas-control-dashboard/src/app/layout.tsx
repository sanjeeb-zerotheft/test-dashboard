import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import { TooltipProvider } from "@zerotheft/shared-ui";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZeroTheft - Super Admin Portal",
  description: "Super admin control dashboard for ZeroTheft platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#f9fafb]">
        <TooltipProvider>
          <Sidebar />
          <div className="lg:pl-64 pt-16 lg:pt-0 min-h-screen">
            <Header />
            <main className="pt-16 min-h-screen">
              <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
                {children}
              </div>
            </main>
          </div>
        </TooltipProvider>
      </body>
    </html>
  );
}
