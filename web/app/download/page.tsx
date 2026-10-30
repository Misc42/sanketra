import type { Metadata } from "next";
import Link from "next/link";
import QRCode from "@/components/QRCode";
import { ISSUES_URL, MAC_ARCH_SHORT, MAC_DMG_LABEL, MAC_DMG_URL, PLAY_LISTING_LIVE, PLAY_STORE_URL } from "@/lib/facts";

export const metadata: Metadata = {
  title: "Download — Phone",
  description: PLAY_LISTING_LIVE
    ? "Pair your phone with Sanketra in two minutes: scan the QR your PC shows and the browser client opens on Android Chrome or iPhone Safari, or install the Android app from Play."
    : "Pair your phone with Sanketra in two minutes: install Sanketra on your PC, scan the QR it shows, and the browser client opens on Android Chrome or iPhone Safari. No app to install."
};

// Live deploy host (GitHub Pages project sub-path) — the apex sanketra.app is
// not attached yet, so the QR must point at the host that actually serves the
// page. Flip back to https://sanketra.app/download at apex cutover.
//
// The browser client's mic is broken in v0.5.1 (CSP script-src lacks blob:)
// and works from v0.5.2. This page leads with that client, so it went live
// only once v0.5.2 was the latest release. The Mac download stays v0.5.1 until
// its arm64 dmg is uploaded, and lib/facts.ts says so on the Mac rows.
//
// The PC server's Android pairing page links here with #android as the intent
// fallback when the Android app is not installed (src/server_async.py:7781,
// fallback_https = ".../sanketra/download#android"), so the Android app card
// below carries id="android" in BOTH of its states. Keep that id.
//
// This QR only opens THIS page on a phone (for someone reading it on the PC).
// The pairing QR is the one the PC app draws; the copy next to the code says so.
const pageUrl = "https://misc42.github.io/sanketra/download";

const RELEASES_BASE = "https://github.com/Misc42/sanketra/releases/latest/download";

const pcInstallers = [
  ["Windows", `${RELEASES_BASE}/Sanketra-Desktop-Setup-x64.exe`, "Setup-x64.exe", null],
  ["macOS", MAC_DMG_URL, MAC_DMG_LABEL, MAC_ARCH_SHORT],
  ["Linux", `${RELEASES_BASE}/Sanketra-Desktop-x86_64.AppImage`, "x86_64.AppImage", null]
] as const;

export default function DownloadPage() {
  return (
    <main>
      <section className="wrap pb-12 pt-20">
        <h1 className="max-w-[760px] text-[clamp(2.5rem,4.6vw,3.75rem)] font-bold leading-[1.04] tracking-[-0.03em]">
          Phone in hand?
          <br />
          <span className="text-faint">Two minutes to paired.</span>
        </h1>
        <p className="mt-[18px] max-w-[600px] text-lg leading-relaxed text-muted">
          Your phone needs no install. Put Sanketra on your PC, scan the QR it shows, and the browser client opens
          on your phone, already paired.
        </p>
      </section>

      <section className="wrap pb-10">
        <div className="grid gap-5 md:grid-cols-2">
          <article className="grid grid-cols-[1fr_auto] gap-6 rounded-2xl border border-rule bg-surface p-[30px]">
            <div>
              <p className="text-[13px] font-semibold text-accent">Android Chrome · iPhone Safari — no app needed</p>
              <h2 className="mt-2.5 text-[26px] font-bold tracking-[-0.02em]">Browser client</h2>
              <ol className="mt-3.5 grid gap-2.5 text-[14.5px] text-muted">
                <li className="flex gap-2.5">
                  <span className="font-semibold text-accent">1</span>
                  <span>Install Sanketra Desktop on your PC and open it</span>
                </li>
                <li className="flex gap-2.5">
                  <span className="font-semibold text-accent">2</span>
                  <span>
                    Click the QR icon (<span className="font-semibold text-ink">Pair Phone</span>) at the top of the
                    window, or choose <span className="font-semibold text-ink">Pair Phone…</span> from the tray
                    menu. A QR appears.
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <span className="font-semibold text-accent">3</span>
                  <span>
                    Scan it with the phone&rsquo;s camera, on the same Wi-Fi. iPhone opens Safari by itself; on
                    Android tap <span className="font-semibold text-ink">Use in browser</span>.
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <span className="font-semibold text-accent">4</span>
                  <span>
                    The browser warns that the connection isn&rsquo;t private. That is your PC&rsquo;s own
                    certificate on your own network; continue past it.
                  </span>
                </li>
              </ol>
              <Link
                href="/desktop"
                className="mt-5 inline-block rounded-[10px] bg-accent px-[22px] py-[11px] text-[14.5px] font-semibold text-paper transition hover:bg-accent-hover"
              >
                Get the PC side first
              </Link>
            </div>
            <div className="self-center">
              <QRCode value={pageUrl} title="QR code that opens this download page on your phone" />
              <p className="mt-2 max-w-[160px] text-[11.5px] leading-snug text-faint">
                Opens this page on your phone. The pairing QR appears on your PC.
              </p>
            </div>
          </article>

          {PLAY_LISTING_LIVE ? (
            <article
              id="android"
              className="grid scroll-mt-24 grid-cols-[1fr_auto] gap-6 rounded-2xl border border-rule bg-surface p-[30px]"
            >
              <div>
                <p className="text-[13px] font-semibold text-muted">Android app · free on Play Store</p>
                <h2 className="mt-2.5 text-[26px] font-bold tracking-[-0.02em]">Sanketra Phone</h2>
                <ol className="mt-3.5 grid gap-2 text-[14.5px] text-muted">
                  <li className="flex gap-2.5">
                    <span className="font-semibold text-accent">1</span>Install from Play Store
                  </li>
                  <li className="flex gap-2.5">
                    <span className="font-semibold text-accent">2</span>On the PC: click{" "}
                    <span className="font-semibold text-ink">Pair Phone</span>
                  </li>
                  <li className="flex gap-2.5">
                    <span className="font-semibold text-accent">3</span>Scan the QR and tap{" "}
                    <span className="font-semibold text-ink">Open in Sanketra app</span>
                  </li>
                </ol>
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-block rounded-[10px] border border-[color:var(--input-border)] px-[22px] py-[11px] text-[14.5px] font-semibold text-ink transition hover:border-ink"
                >
                  Open Play Store
                </a>
              </div>
              <div className="self-center">
                <QRCode value={PLAY_STORE_URL} title="QR code linking to the Sanketra Play Store listing" />
              </div>
            </article>
          ) : (
            <article id="android" className="scroll-mt-24 rounded-2xl border border-dashed border-rule bg-surface p-[30px]">
              <p className="text-[13px] font-semibold text-muted">Android app · not on Google Play yet</p>
              <h2 className="mt-2.5 text-[26px] font-bold tracking-[-0.02em]">Sanketra Phone</h2>
              <p className="mt-3.5 text-[14.5px] leading-relaxed text-muted">
                The Play Store listing isn&rsquo;t live and there is no APK to download, so there is no Android app
                to install today. The browser client already does dictation, the trackpad, the gyro
                pointer, screen mirror and the PC&rsquo;s audio.
              </p>
              <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
                Sent here from the PC&rsquo;s pairing page after tapping the app button? Go back and tap{" "}
                <span className="font-semibold text-ink">Use in browser</span> instead.
              </p>
              <p className="mt-3 text-[13.5px] leading-relaxed text-faint">
                iPhone has no native app at all; Safari is the iPhone client.
              </p>
            </article>
          )}
        </div>
      </section>

      <section className="border-t border-rule bg-surface">
        <div className="wrap py-16">
          <div className="mb-7 flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-[28px] font-bold tracking-[-0.02em]">And the PC side.</h2>
            <Link href="/desktop" className="text-[14.5px] font-semibold text-accent hover:underline">
              Full install guide →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {pcInstallers.map(([os, href, file, note]) => (
              <a
                key={os}
                href={href}
                className="rounded-2xl border border-rule bg-paper p-6 transition hover:border-ink"
              >
                <p className="text-[17px] font-bold">{os}</p>
                <p className="mt-1.5 font-mono text-[13.5px] text-faint">{file}</p>
                {note ? <p className="mt-1.5 text-[12.5px] leading-snug text-muted">{note}</p> : null}
              </a>
            ))}
          </div>
          <p className="mt-5 text-[13.5px] leading-relaxed text-faint">
            QR won&rsquo;t scan, or it expired? A pairing QR works once and lives five minutes: click{" "}
            <span className="font-semibold text-ink">Regenerate</span> in the pairing window and scan again. Scan
            landed you on an error page?{" "}
            <Link href="/pair" className="text-accent">
              Pairing help
            </Link>
            . Still stuck?{" "}
            {/* TODO: no private support mailbox works (support@sanketra.app does not resolve); issues are public. */}
            <a href={ISSUES_URL} target="_blank" rel="noopener noreferrer" className="text-accent">
              Open a GitHub issue
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
