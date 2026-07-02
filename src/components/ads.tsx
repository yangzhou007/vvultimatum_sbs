"use client";

import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { AD_CONFIG, type AdSlot, isLikelyAdsterraKey } from "@/config/ads";

const SLOT_SIZES: Record<AdSlot, { width: number; height: number }> = {
  mobile320x50: { width: 320, height: 50 },
  banner728x90: { width: 728, height: 90 },
  banner300x250: { width: 300, height: 250 },
  banner468x60: { width: 468, height: 60 },
  sidebar160x600: { width: 160, height: 600 },
  sidebar160x300: { width: 160, height: 300 },
};

const SLOT_CLASSNAMES: Record<AdSlot, string> = {
  mobile320x50: "max-w-[320px]",
  banner728x90: "max-w-[728px]",
  banner300x250: "max-w-[300px]",
  banner468x60: "max-w-[468px]",
  sidebar160x600: "max-w-[160px]",
  sidebar160x300: "max-w-[160px]",
};

function makeAdSrcDoc(key: string, width: number, height: number) {
  const jsKey = JSON.stringify(key);
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      html, body { margin: 0; padding: 0; width: ${width}px; min-height: ${height}px; overflow: hidden; background: transparent; }
    </style>
  </head>
  <body>
    <script>
      window.atOptions = {
        key: ${jsKey},
        format: "iframe",
        height: ${height},
        width: ${width},
        params: {}
      };
    </script>
    <script src="https://www.highperformanceformat.com/${key}/invoke.js"></script>
  </body>
</html>`;
}

export function AdBanner({ slot, className = "" }: { slot: AdSlot; className?: string }) {
  const key = AD_CONFIG[slot];
  const size = SLOT_SIZES[slot];
  const srcDoc = useMemo(() => {
    if (!isLikelyAdsterraKey(key)) return "";
    return makeAdSrcDoc(key, size.width, size.height);
  }, [key, size.height, size.width]);

  if (!srcDoc) return null;

  return (
    <div className={`mx-auto overflow-hidden ${SLOT_CLASSNAMES[slot]} ${className}`} aria-label="Advertisement">
      <iframe
        className="block w-full border-0"
        height={size.height}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"
        scrolling="no"
        srcDoc={srcDoc}
        title={`Advertisement ${size.width}x${size.height}`}
        width={size.width}
      />
    </div>
  );
}

export function StickyAdBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || !isLikelyAdsterraKey(AD_CONFIG.mobile320x50)) return null;

  return (
    <div className="sticky top-[64px] z-40 bg-background/95 py-2 backdrop-blur">
      <div className="relative mx-auto max-w-4xl px-4">
        <AdBanner slot="mobile320x50" />
        <button
          type="button"
          aria-label="Close advertisement"
          className="absolute right-2 top-1 rounded-full border border-border bg-background p-1 text-muted-foreground shadow-sm transition hover:text-foreground"
          onClick={() => setDismissed(true)}
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export function SidebarAds() {
  if (!isLikelyAdsterraKey(AD_CONFIG.sidebar160x600) && !isLikelyAdsterraKey(AD_CONFIG.sidebar160x300)) return null;

  return (
    <section className="hidden justify-center space-y-4 xl:block" aria-label="Sidebar advertisements">
      <AdBanner slot="sidebar160x600" />
      <AdBanner slot="sidebar160x300" />
    </section>
  );
}
