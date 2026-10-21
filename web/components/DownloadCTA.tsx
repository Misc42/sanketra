"use client";

// Home-page conversion CTA. Sits between Hero and Demo Video sections.
//
// SSR-default label is "your OS" so the static export renders cleanly with
// no hydration mismatch. Post-hydration we read navigator.userAgent and
// swap in the detected OS name (macOS / Windows / Linux). Same detect
// ladder as components/Hero.tsx and app/get/page.tsx — kept inline rather
// than hoisted to a shared lib/ helper because each call site is five lines.
// A fourth copy sat in an unrendered component until 2026-09-16, when it was
// deleted rather than kept in sync for nobody.
//
// Phones: an Android UA says Linux and an iPhone UA says Mac OS X, so they would
// be offered a desktop download they cannot use. They get "Use on your phone",
// pointing at the phone page (/download/) instead of the desktop walkthrough.

import { useEffect, useState } from "react";
import { withBase } from "@/lib/basePath";

type OsId = "mac" | "windows" | "linux" | "phone" | null;

// Phone check goes first (see the note above); iPadOS 13+ reports "Macintosh",
// so a Mac UA with touch support counts as a phone.
function detectOS(userAgent: string, hasTouch: boolean): OsId {
  const ua = userAgent.toLowerCase();
  if (/iphone|ipad|ipod|android/.test(ua)) return "phone";
  if (ua.includes("mac") && hasTouch) return "phone";
  if (ua.includes("mac")) return "mac";
  if (ua.includes("win")) return "windows";
  if (ua.includes("linux")) return "linux";
  return "linux";
}

const CTA_LABEL: Record<NonNullable<OsId>, string> = {
  mac: "Download for macOS",
  windows: "Download for Windows",
  linux: "Download for Linux",
  phone: "Use on your phone"
};

export function DownloadCTA() {
  const [detected, setDetected] = useState<OsId>(null);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setDetected(detectOS(navigator.userAgent, "ontouchend" in document));
    }
  }, []);

  const ctaLabel = detected ? CTA_LABEL[detected] : "Download for your OS";

  return (
    <section className="wrap mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
      <a
        href={withBase(detected === "phone" ? "/download/" : "/desktop/")}
        className="rounded-full bg-accent px-6 py-3 font-mono text-sm font-medium uppercase tracking-wider text-paper transition hover:bg-accent/90"
      >
        {ctaLabel} · ₹0 free
      </a>
      <a
        href={withBase("/pricing/")}
        className="text-faint underline-offset-4 transition hover:text-ink hover:underline"
      >
        Why ₹999 ↗
      </a>
    </section>
  );
}
