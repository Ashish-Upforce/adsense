"use client";

import { useEffect, useRef, type CSSProperties } from "react";

const AD_CLIENT = "ca-pub-3050823753585928";

interface AdSenseAdProps {
  /** Ad unit slot ID from Google AdSense → Ads → By ad unit */
  adSlot: string;
  className?: string;
  label?: string;
  /** e.g. "auto", "rectangle", "horizontal", "vertical" */
  adFormat?: string;
  fullWidthResponsive?: boolean;
  style?: CSSProperties;
}

/**
 * AdSenseAd Component
 * -------------------
 * 1. Create ad units in Google AdSense (Ads → By ad unit → Display ads).
 * 2. Copy each unit's `data-ad-slot` value and pass it as `adSlot`.
 * 3. Set NEXT_PUBLIC_ADSENSE_CLIENT_ID to your publisher ID (ca-pub-…).
 * 4. The global AdSense script in layout.tsx loads once; each instance pushes its slot.
 */
export default function AdSenseAd({
  adSlot,
  className = "",
  label,
  adFormat = "auto",
  fullWidthResponsive = true,
  style,
}: AdSenseAdProps) {
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    pushed.current = true;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Script not loaded yet or slot already filled
    }
  }, []);

  return (
    <div className={`adsense-ad-wrapper ${className}`}>
      {process.env.NODE_ENV === "development" && (
        <div className="text-xs text-center text-amber-600 font-mono bg-amber-100 border border-dashed border-amber-400 px-2 py-1 mb-1 rounded">
          📢 AdSense Slot {adSlot} {label ? `— ${label}` : ""}
        </div>
      )}
      <ins className="adsbygoogle"
     style={{display:"block"}}
     data-ad-client="ca-pub-3050823753585928"
     data-ad-slot="4173872271"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
    </div>
  );
}
