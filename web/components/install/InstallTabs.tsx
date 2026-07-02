"use client";

// OS-tab pill switcher for the /desktop install guide. Client component
// because we need (1) detectOS via navigator.userAgent, (2) tab-switch
// state, (3) keyboard-accessible tablist behavior. Guide content is passed
// in as children per OS so this stays a dumb switcher — the actual 5-step
// lists live in app/desktop/page.tsx next to the rest of the design copy.

import { type KeyboardEvent, type ReactNode, useEffect, useRef, useState } from "react";

type OsId = "mac" | "windows" | "linux";

const TABS: { id: OsId; label: string }[] = [
  { id: "mac", label: "macOS" },
  { id: "windows", label: "Windows" },
  { id: "linux", label: "Linux" }
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
  defaultOs = "mac"
}: {
  mac: ReactNode;
  windows: ReactNode;
  linux: ReactNode;
  defaultOs?: OsId;
}) {
  const [active, setActive] = useState<OsId>(defaultOs);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setActive(detectOS(navigator.userAgent));
    }
  }, []);

  // WAI-ARIA tabs keyboard pattern: ArrowLeft/Right wrap around, Home/End jump
  // to the ends, and focus follows selection (roving tabindex below keeps only
  // the active tab in the page Tab order).
  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = TABS.length - 1;
    let next = index;
    switch (event.key) {
      case "ArrowRight":
        next = index === last ? 0 : index + 1;
        break;
      case "ArrowLeft":
        next = index === 0 ? last : index - 1;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = last;
        break;
      default:
        return;
    }
    event.preventDefault();
    setActive(TABS[next].id);
    tabRefs.current[next]?.focus();
  }

  return (
    <div>
      <div role="tablist" aria-label="Choose your operating system" className="flex gap-2">
        {TABS.map((tab, index) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              onKeyDown={(event) => onTabKeyDown(event, index)}
              onClick={() => setActive(tab.id)}
              className={`rounded-full px-5 py-[9px] text-sm font-semibold transition ${
                isActive
                  ? "bg-ink text-paper"
                  : "border border-[color:var(--input-border)] text-muted hover:border-ink"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div role="tabpanel" id="panel-mac" aria-labelledby="tab-mac" hidden={active !== "mac"}>
        {mac}
      </div>
      <div role="tabpanel" id="panel-windows" aria-labelledby="tab-windows" hidden={active !== "windows"}>
        {windows}
      </div>
      <div role="tabpanel" id="panel-linux" aria-labelledby="tab-linux" hidden={active !== "linux"}>
        {linux}
      </div>
    </div>
  );
}
