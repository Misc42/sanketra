import type { Metadata } from "next";
import Link from "next/link";

// Fallback landing for QR-pair scans when the phone can't reach the Sanketra
// server (different WiFi, server offline, captive portal). Reached at
// misc42.github.io/sanketra/pair when the browser fails to hit the LAN URL
// embedded in the QR. Pure static server component — matches
// Sanketra Pair.dc.html's plain two-card recovery layout (no per-platform
// branching; the design treats iOS and everyone else the same way here).

export const metadata: Metadata = {
  title: "Pairing help",
  description:
    "QR scanned but Sanketra Desktop is unreachable? Make sure your phone and PC share a WiFi network and the desktop app is running."
};

const checks = [
  ["CHECK 1", "Same Wi-Fi network", "Phone and PC must share one network. Mobile data, guest networks, and 2.4/5 GHz split SSIDs are the usual culprits."],
  ["CHECK 2", "Desktop is running", "Look for the स in the tray (Win/Linux) or menu bar (Mac). Launch it, then regenerate the QR."],
  ["CHECK 3", "Port 8765 isn't blocked", "Firewalls and corporate VPNs silently drop LAN traffic. Allow-list Sanketra, or pause the VPN to test."]
] as const;

export default function PairPage() {
  return (
    <main>
      <section className="wrap pb-12 pt-20">
        <p className="text-[13.5px] font-semibold text-[#C2410C]">Pairing · troubleshooting</p>
        <h1 className="mt-3.5 max-w-[800px] text-[clamp(2.375rem,4.4vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.03em]">
          QR scanned, but the PC didn&rsquo;t answer.
        </h1>
        <p className="mt-[18px] max-w-[620px] text-[17px] leading-relaxed text-muted">
          The QR points at a local address on your Wi-Fi (like{" "}
          <span className="font-mono text-[14.5px] text-ink">192.168.x.x:8765</span>). If it didn&rsquo;t respond,
          one of three things is usually wrong.
        </p>
      </section>

      <section className="wrap pb-14">
        <div className="grid gap-5 md:grid-cols-3">
          {checks.map(([eyebrow, title, body]) => (
            <article key={eyebrow} className="rounded-2xl border border-rule bg-surface p-6">
              <p className="text-[13px] font-bold text-accent">{eyebrow}</p>
              <h2 className="mt-2.5 text-[19px] font-bold tracking-[-0.01em]">{title}</h2>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-rule bg-surface">
        <div className="wrap grid gap-5 py-16 md:grid-cols-2">
          <article className="rounded-2xl border border-rule bg-paper p-[30px]">
            <h2 className="text-[22px] font-bold tracking-[-0.015em]">Haven&rsquo;t installed Desktop yet?</h2>
            <p className="mt-2.5 text-[15px] leading-relaxed text-muted">
              The QR only works after the PC side is installed. Mac, Windows, Linux — one download each, free
              during beta.
            </p>
            <Link
              href="/desktop"
              className="mt-5 inline-block rounded-[10px] bg-accent px-6 py-[11px] text-[14.5px] font-semibold text-paper transition hover:bg-accent-hover"
            >
              Get Sanketra Desktop
            </Link>
          </article>
          <article className="rounded-2xl border border-rule bg-paper p-[30px]">
            <h2 className="text-[22px] font-bold tracking-[-0.015em]">Still stuck?</h2>
            <p className="mt-2.5 text-[15px] leading-relaxed text-muted">
              The QR lives 90 seconds — if it expired mid-scan, click{" "}
              <span className="font-semibold text-ink">Regenerate</span> on the PC. The 4-digit code (Phone →
              Manual setup) is the always-works fallback.
            </p>
            <p className="mt-3.5 text-sm text-faint">
              iPhone? Safari opens the mic client from the same QR — the PC must be on the same Wi-Fi.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
