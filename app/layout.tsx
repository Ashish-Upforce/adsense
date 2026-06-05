/* eslint-disable @next/next/no-sync-scripts */
import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import React from "react";

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
  {/* <Script
    async
    src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
    crossOrigin="anonymous"
    strategy="afterInteractive"
  />
  <Script id="al5sm-script" strategy="afterInteractive">
  {`
    (function(s){
      s.dataset.zone='11103924';
      s.src='https://al5sm.com/tag.min.js';
    })([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')));
  `}
</Script> */}
  {/* <Script src="https://quge5.com/88/tag.min.js" data-zone="246394" async data-cfasync="false"></Script> */}
{/* <Script
  id="nap5k-script"
  strategy="afterInteractive"
>
  {`
    (function(s){
      s.dataset.zone='11103860';
      s.src='https://nap5k.com/tag.min.js';
    })(
      [document.documentElement, document.body]
        .filter(Boolean)
        .pop()
        .appendChild(document.createElement('script'))
    );
  `}
</Script> */}
   <script src="https://pl29646044.effectivecpmnetwork.com/09/14/f8/0914f8083d6fb18493b05fc81dd8c5b4.js"></script>

  <meta
    name="google-adsense-account"
    content={ADSENSE_CLIENT_ID}
  />
     <meta name="google-adsense-account" content="ca-pub-3050823753585928"></meta>
      </head>
      <body className="bg-amber-50 min-h-screen font-sans">
        {children}
      </body>
    </html>
  );
}
