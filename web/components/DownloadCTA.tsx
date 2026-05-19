"use client";

// Home-page conversion CTA. Sits between Hero and Demo Video sections.
//
// SSR-default label is "your OS" so the static export renders cleanly with
// no hydration mismatch. Post-hydration we read navigator.userAgent and
// swap in the detected OS name (macOS / Windows / Linux). Same detect
// ladder as components/install/DownloadHero.tsx — kept inline rather than
// hoisted to a shared lib/ helper because both call sites are five lines
// each and there's no third caller in sight.

import { useEffect, useState } from "react";

type OsId = "mac" | "windows" | "linux" | null;

function detectOS(userAgent: string): OsId {
  const ua = userAgent.toLowerCase();
  if (ua.includes("mac")) return "mac";
  if (ua.includes("win")) return "windows";
  if (ua.includes("linux")) return "linux";
  return "linux";
}

const OS_LABEL: Record<NonNullable<OsId>, string> = {
  mac: "macOS",
  windows: "Windows",
  linux: "Linux"
};

export function DownloadCTA() {
  const [detected, setDetected] = useState<OsId>(null);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setDetected(detectOS(navigator.userAgent));
    }
  }, []);

  const osLabel = detected ? OS_LABEL[detected] : "your OS";

  return (
    <section className="wrap mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
      <a
        href="/desktop"
        className="rounded-full bg-saffron px-6 py-3 font-mono text-sm font-medium uppercase tracking-wider text-paper transition hover:bg-saffron/90"
      >
        Download for {osLabel} · ₹0 free
      </a>
      <a
        href="/pricing"
        className="text-faint underline-offset-4 transition hover:text-ink hover:underline"
      >
        Why ₹999 ↗
      </a>
    </section>
  );
}
