"use client";

import { useEffect, useMemo, useState } from "react";
import QRCode from "@/components/QRCode";

const playStoreUrl = "https://play.google.com/store/apps/details?id=com.tanay.miconterm";

const RELEASES_BASE = "https://github.com/Misc42/sanketra/releases/latest/download";

const installers = [
  {
    id: "windows",
    os: "Windows",
    title: "Windows installer",
    kind: "download",
    downloadUrl: `${RELEASES_BASE}/Sanketra-Desktop-Setup-x64.exe`,
    fileName: "Sanketra-Desktop-Setup-x64.exe",
    ctaLabel: "Download for Windows",
    steps: ["Run the installer", "PC shows a QR (4-digit code as fallback)", "Scan with your phone's camera — app deep-links & auto-pairs"]
  },
  {
    id: "mac",
    os: "Mac",
    title: "macOS disk image",
    kind: "download",
    downloadUrl: `${RELEASES_BASE}/Sanketra-Desktop-universal.dmg`,
    fileName: "Sanketra-Desktop-universal.dmg",
    ctaLabel: "Download for macOS",
    steps: ["Open the .dmg, drag to Applications, run it", "PC shows a QR (4-digit code as fallback)", "Scan with your phone's camera — app deep-links & auto-pairs"]
  },
  {
    id: "linux",
    os: "Linux",
    title: "Linux AppImage",
    kind: "download",
    downloadUrl: `${RELEASES_BASE}/Sanketra-Desktop-x86_64.AppImage`,
    fileName: "Sanketra-Desktop-x86_64.AppImage",
    ctaLabel: "Download for Linux",
    steps: ["chmod +x the AppImage, then run it", "PC shows a QR (4-digit code as fallback)", "Scan with your phone's camera — app deep-links & auto-pairs"]
  },
  {
    id: "android",
    os: "Android",
    title: "Android Play Store",
    kind: "copy",
    command: playStoreUrl,
    steps: ["Install Sanketra from Play Store", "Open Sanketra Desktop on your PC → click Pair Phone", "Scan PC's QR with your phone's camera — auto-pairs in ~2 sec"]
  },
  {
    id: "ios",
    os: "iPhone / iPad",
    title: "iOS — scan PC's QR in Safari",
    kind: "copy",
    command: "https://sanketra.app/download",
    steps: [
      "No native iOS app yet — dictation runs in Safari",
      "Install Sanketra Desktop on a Mac / Win / Linux PC on the same WiFi",
      "Open the Pair Phone QR on PC → iPhone camera scans → Safari auto-loads the mic client"
    ]
  }
] as const;

type InstallerId = (typeof installers)[number]["id"];

function detectOS(userAgent: string): InstallerId {
  const ua = userAgent.toLowerCase();
  // iOS detect before "mac" — iPad on iPadOS 13+ reports "Macintosh" too,
  // so the Touch/Mobile hints are the reliable discriminator.
  if (ua.includes("iphone") || ua.includes("ipad") || (ua.includes("mac") && "ontouchend" in document)) return "ios";
  if (ua.includes("android")) return "android";
  if (ua.includes("win")) return "windows";
  if (ua.includes("mac")) return "mac";
  if (ua.includes("linux")) return "linux";
  return "windows";
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="rounded-sm border border-rule px-3 py-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink transition hover:border-saffron hover:text-saffron"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export default function DownloadPage() {
  const [detected, setDetected] = useState<InstallerId>("windows");

  useEffect(() => {
    setDetected(detectOS(navigator.userAgent));
  }, []);

  const ordered = useMemo(() => {
    const primary = installers.find((item) => item.id === detected);
    const rest = installers.filter((item) => item.id !== detected);
    return primary ? [primary, ...rest] : installers;
  }, [detected]);

  return (
    <main className="wrap py-16">
      <p className="masthead mb-4">Download</p>
      <h1 className="section-title max-w-4xl">Install the PC side, then pair your phone.</h1>
      <p className="mt-6 max-w-3xl text-lg text-muted">
        We show your detected OS first. The pairing flow stays the same everywhere:
        install runs, PC shows a 4-digit code, phone par daalo.
      </p>
      <div className="mt-12 grid gap-6">
        {ordered.map((item) => (
          <section key={item.id} id={item.id} className="card scroll-mt-24 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="masthead mb-2">
                  {item.id === detected ? "Detected first" : item.os}
                </p>
                <h2 className="text-3xl font-semibold tracking-normal">{item.title}</h2>
              </div>
              {item.id === "android" ? <QRCode value={playStoreUrl} /> : null}
              {item.id === "ios" ? <QRCode value="https://sanketra.app/download" /> : null}
            </div>
            {item.kind === "download" ? (
              <div className="mt-6 flex flex-col gap-2">
                <a
                  href={item.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-sm bg-saffron px-5 py-3 text-center font-mono text-[0.78rem] uppercase tracking-[0.14em] text-paper transition hover:bg-saffron/90"
                >
                  {item.ctaLabel}
                </a>
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-faint">
                  {item.fileName}
                </p>
              </div>
            ) : (
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <pre className="command flex-1 p-4"><code>{item.command}</code></pre>
                <CopyButton text={item.command} />
              </div>
            )}
            <div className="mt-6">
              <p className="masthead mb-3">What happens next</p>
              <ol className="grid gap-2 text-muted md:grid-cols-3">
                {item.steps.map((step, index) => (
                  <li key={step} className="border-l border-rule pl-4">
                    <span className="font-mono text-xs text-saffron">0{index + 1}</span>
                    <span className="ml-3">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
