"use client";

// Home hero. Client component because the primary CTA label swaps to the
// visitor's detected OS post-hydration — same detect ladder as
// components/install/DownloadHero.tsx (kept inline rather than hoisted to a
// shared lib/ helper because both call sites are five lines each). SSR
// renders the design's literal fallback copy ("your OS") so there's no
// hydration mismatch and no flash for JS-off / slow-hydration visitors.

import { useEffect, useState } from "react";
import Link from "next/link";
import { withBase } from "@/lib/basePath";

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

export default function Hero() {
  const [detected, setDetected] = useState<OsId>(null);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setDetected(detectOS(navigator.userAgent));
    }
  }, []);

  const osLabel = detected ? OS_LABEL[detected] : "your OS";

  return (
    <section className="wrap flex flex-col items-center pb-0 pt-[88px] text-center">
      <p className="mb-4 text-[13.5px] font-semibold text-accent">
        <span aria-hidden>●</span> Live · free during beta · a{" "}
        <a
          href="https://misc42.github.io/misc42labs/"
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-[3px]"
        >
          Misc42 Labs
        </a>{" "}
        product
      </p>
      <h1
        lang="hi"
        className="deva mx-auto max-w-[860px] text-[clamp(2.75rem,6.4vw,5.5rem)] font-bold leading-[1.08] tracking-[-0.01em] text-ink"
      >
        बोलो, टाइप होगा।
      </h1>
      <p className="mx-auto mt-5 max-w-[540px] text-[19px] leading-relaxed text-muted">
        Speak Hindi, Hinglish, or English — text lands wherever you type. Your voice never leaves your Wi-Fi.
      </p>
      <div className="mt-[34px] flex flex-wrap justify-center gap-3">
        <a
          href={withBase("/download/")}
          className="rounded-[10px] bg-accent px-7 py-[13px] text-[15px] font-semibold text-paper transition hover:bg-accent-hover"
        >
          Download for {osLabel} — ₹0
        </a>
        <Link
          href="/pricing"
          className="rounded-[10px] border border-[color:var(--input-border)] px-7 py-[13px] text-[15px] font-semibold text-ink transition hover:border-ink"
        >
          Why ₹999 later
        </Link>
      </div>
      <p className="mt-3.5 text-[13px] text-faint">Android · macOS · Windows · Linux</p>
      <div className="mx-auto mt-14 max-w-[980px] overflow-hidden rounded-t-2xl border border-b-0 border-rule bg-[#0F0E14] shadow-[0_32px_64px_-32px_rgba(19,19,21,0.3)]">
        <img
          src={withBase("/hero-soundwave.png")}
          alt="Sanketra waveform"
          className="block aspect-[21/9] w-full object-cover"
        />
      </div>
    </section>
  );
}
