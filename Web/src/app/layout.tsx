import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "短網址生成器",
  description: "上傳圖片或影片並生成短網址",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body className="min-h-screen flex flex-col ${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 text-gray-100">
        <header className="bg-gray-800 p-4 shadow-md">
          <div className="header-container mx-auto">
            <Link href="/" className="text-2xl font-bold">
              短網址生成器
            </Link>
          </div>
        </header>
        <main className="flex-grow container mx-auto p-6">{children}</main>
        <footer className="bg-gray-800 p-4 mt-6">
          <div className="container mx-auto text-center text-gray-400">
            <Link
              href="/privacy-policy"
              className="text-blue-500 hover:underline pr-4"
            >
              隱私政策
            </Link>
            <Link
              href="/terms-of-service"
              className="text-blue-500 hover:underline pl-4"
            >
              服務條款
            </Link>
            <p className="mt-4">
              &copy; 2025 短網址生成器. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
