import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

const ADSENSE_CLIENT_ID = "ca-pub-3050823753585928";

export const metadata: Metadata = {
  title: "Todo App with Google AdSense",
  description: "A todo app demonstrating Google AdSense integration in Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/*
         * Google AdSense — load once in <head>
         * Replace ca-pub-… via NEXT_PUBLIC_ADSENSE_CLIENT_ID or the fallback below.
         * Get your ID from: AdSense → Account → Account information → Publisher ID
         */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3050823753585928"
     crossorigin="anonymous"></script>
      </head>
      <body className="bg-amber-50 min-h-screen font-sans">
        {children}
      </body>
    </html>
  );
}
