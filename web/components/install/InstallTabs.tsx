"use client";

// Client component because we need:
//   1. detectOS via navigator.userAgent (browser-only)
//   2. tab switching state
//   3. scroll preservation when switching
//
// We accept the three guides as React children (NOT React.lazy'd) so they
// render server-side first paint. After hydration the user can click between
// tabs without re-rendering. This keeps Largest Contentful Paint fast for
// users with their detected OS already correct (the common case).

import { type ReactNode, useEffect, useState } from "react";

type OsId = "mac" | "windows" | "linux";

const TABS: { id: OsId; label: string; deva: string; chord: string }[] = [
  { id: "mac", label: "macOS", deva: "मैक", chord: "11 steps" },
  { id: "windows", label: "Windows", deva: "विंडोज़", chord: "8 steps" },
  { id: "linux", label: "Linux", deva: "लिनक्स", chord: "5 steps" }
];

function detectOS(userAgent: string): OsId {
  const ua = userAgent.toLowerCase();
  if (ua.includes("mac")) return "mac";
  if (ua.includes("win")) return "windows";
  if (ua.includes("linux")) return "linux";
  return "linux";
}

export function InstallTabs({
  mac,
  windows,
  linux,
  defaultOs = "linux"
}: {
  mac: ReactNode;
  windows: ReactNode;
  linux: ReactNode;
  defaultOs?: OsId;
}) {
  const [active, setActive] = useState<OsId>(defaultOs);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setActive(detectOS(navigator.userAgent));
    }
  }, []);

  return (
    <div>
      {/* Tab strip — sticky so users can switch mid-scroll without losing context.
          top-20 + z-30 sits the strip *below* the now-sticky Nav (top-0 z-20 in
          components/Nav.tsx) with no overlap. The 80px offset matches Nav's
          py-7 + line-height rendered height — measured visually, not magic. */}
      <div
        role="tablist"
        aria-label="Choose your operating system"
        className="sticky top-20 z-30 -mx-4 mb-10 flex gap-1 overflow-x-auto bg-paper/95 px-4 py-3 backdrop-blur-md md:mx-0 md:px-0"
      >
        {TABS.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              onClick={() => setActive(tab.id)}
              className={`group flex flex-shrink-0 items-baseline gap-3 rounded-md px-5 py-3 font-mono text-[0.78rem] uppercase tracking-[0.14em] transition ${
                isActive
                  ? "bg-saffron text-paper"
                  : "border border-rule text-muted hover:border-saffron hover:text-saffron"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`deva text-base normal-case tracking-normal ${
                  isActive ? "text-paper/80" : "text-faint group-hover:text-saffron"
                }`}
              >
                {tab.deva}
              </span>
              <span className={`text-[0.62rem] ${isActive ? "text-paper/70" : "text-faint"}`}>
                · {tab.chord}
              </span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id="panel-mac"
        aria-labelledby="tab-mac"
        hidden={active !== "mac"}
      >
        {mac}
      </div>
      <div
        role="tabpanel"
        id="panel-windows"
        aria-labelledby="tab-windows"
        hidden={active !== "windows"}
      >
        {windows}
      </div>
      <div
        role="tabpanel"
        id="panel-linux"
        aria-labelledby="tab-linux"
        hidden={active !== "linux"}
      >
        {linux}
      </div>
    </div>
  );
}
