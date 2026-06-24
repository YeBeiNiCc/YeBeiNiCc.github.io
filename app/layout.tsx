import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YeBeiNiCc's Blog",
  description: "A personal blog about technology and life",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-gray-200 dark:border-gray-800 py-8 text-center text-sm text-gray-500">
          <div className="max-w-4xl mx-auto px-4">
            <p>&copy; {new Date().getFullYear()} YeBeiNiCc. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
