"use client";

// Zone 1: the three OS download cards. Client component so we can highlight
// the detected OS with a saffron ring and prepend a "Detected" badge.
// Kept tightly scoped — the rest of the page is server-rendered.

import { useEffect, useMemo, useState } from "react";

const RELEASES_BASE = "https://github.com/Misc42/sanketra/releases/latest/download";

type OsId = "linux" | "mac" | "windows";

type DownloadCard = {
  id: OsId;
  os: string;
  deva: string;
  headline: string;
  tagline: string;
  size: string;
  fileName: string;
  ctaLabel: string;
  jumpAnchor: string;
};

const cards: readonly DownloadCard[] = [
  {
    id: "mac",
    os: "macOS",
    deva: "मैक",
    headline: "Universal .dmg for Apple Silicon + Intel.",
    tagline: "Drag, right-click Open, allow mic + accessibility.",
    size: "286",
    fileName: "Sanketra-Desktop-universal.dmg",
    ctaLabel: "Download for macOS — 286 MB",
    jumpAnchor: "#guide"
  },
  {
    id: "windows",
    os: "Windows",
    deva: "विंडोज़",
    headline: "Click-through .exe installer.",
    tagline: "No UAC. No admin. SmartScreen has an opt-through.",
    size: "193",
    fileName: "Sanketra-Desktop-Setup-x64.exe",
    ctaLabel: "Download for Windows — 193 MB",
    jumpAnchor: "#guide"
  },
  {
    id: "linux",
    os: "Linux",
    deva: "लिनक्स",
    headline: "AppImage for every distro.",
    tagline: "One file. chmod +x. Run.",
    size: "418",
    fileName: "Sanketra-Desktop-x86_64.AppImage",
    ctaLabel: "Download for Linux — 418 MB",
    jumpAnchor: "#guide"
  }
] as const;

function detectOS(userAgent: string): OsId {
  const ua = userAgent.toLowerCase();
  if (ua.includes("mac")) return "mac";
  if (ua.includes("win")) return "windows";
  if (ua.includes("linux")) return "linux";
  return "linux";
}

export function DownloadHero() {
  const [detected, setDetected] = useState<OsId | null>(null);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setDetected(detectOS(navigator.userAgent));
    }
  }, []);

  // Stable grid order across SSR + hydration. Detection is communicated via
  // ring + badge, not by reshuffling, so there's no layout flash.
  const ordered = useMemo(() => cards, []);

  return (
    <div className="mt-12 grid gap-6 md:grid-cols-3">
      {ordered.map((card) => {
        const isDetected = card.id === detected;
        const downloadUrl = `${RELEASES_BASE}/${card.fileName}`;
        return (
          <section
            key={card.id}
            id={card.id}
            className={`card flex flex-col p-7 transition ${
              isDetected ? "ring-1 ring-saffron/50" : ""
            }`}
          >
            {/* Mobile-only ribbon: on phone viewports the three cards stack
                identically, so the saffron ring alone gets lost in thumb-scroll.
                A loud "start here" pointer above the detected card breaks the
                tie. Hidden on md+ where the ring + Detected pill are visible. */}
            {isDetected ? (
              <span className="md:hidden mb-3 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.16em] text-saffron">
                <span aria-hidden>↓</span>
                <span>Detected — start here</span>
              </span>
            ) : null}
            <div className="flex items-baseline justify-between">
              <p className="masthead">{card.os}</p>
              {isDetected ? (
                <span className="rounded-sm border border-saffron/50 px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-saffron">
                  Detected
                </span>
              ) : null}
            </div>
            <p className="deva mt-2 text-xl text-muted">{card.deva}</p>
            <h2 className="mt-3 text-2xl font-semibold leading-tight text-ink">
              {card.headline}
            </h2>
            <p className="mt-2 serif-italic text-muted">{card.tagline}</p>

            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center justify-center rounded-sm bg-saffron px-5 py-3 text-center font-mono text-[0.78rem] uppercase tracking-[0.14em] text-paper transition hover:bg-saffron/90"
            >
              {card.ctaLabel}
            </a>
            <p className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-faint">
              {card.fileName}
            </p>

            <a
              href={card.jumpAnchor}
              className="mt-5 inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-muted hover:text-saffron"
            >
              <span aria-hidden>↓</span>
              <span>Walk me through it</span>
            </a>
          </section>
        );
      })}
    </div>
  );
}
