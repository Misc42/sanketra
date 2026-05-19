// Static fallback for QR-pair scans when the user's phone can't reach the
// Sanketra server (different WiFi, server offline, cellular fallback,
// captive portal). Reached at misc42.github.io/sanketra/pair when the
// browser fails to hit the LAN URL embedded in the QR.
//
// The whole page is a Next.js server component — pure static HTML on GH
// Pages. The iOS-only CTA visibility is toggled by a tiny inline UA-detect
// script (hydration-free, no React runtime cost) that sets data-platform on
// <html> and a matching display rule below. Keeps route weight minimal and
// stays in one file.

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QR pair — Sanketra unreachable",
  description:
    "QR scanned but Sanketra Desktop is unreachable? Make sure your phone and PC share a WiFi network and the desktop app is running."
};

// Inline UA sniff. Runs before paint so the iOS card never flashes for
// non-iOS users. Mirrors the iPhone|iPad|iPod ladder in DownloadHero +
// download/page.tsx — kept in sync intentionally.
const UA_DETECT_SCRIPT = `(function(){
  try {
    var ua = navigator.userAgent || "";
    var isIOS = /iPhone|iPad|iPod/i.test(ua) || (/Mac/i.test(ua) && "ontouchend" in document);
    document.documentElement.dataset.platform = isIOS ? "ios" : "other";
  } catch (e) {}
})();`;

// Card 2 is hidden by default and revealed only when the inline script sets
// data-platform="ios" on <html>. Server output is "non-iOS first" so SEO +
// no-JS users see the recovery checklist + Desktop CTA, never a half-broken
// iOS card with no context.
const PLATFORM_STYLE = `
  [data-pair-ios-only] { display: none; }
  html[data-platform="ios"] [data-pair-ios-only] { display: block; }
`;

export default function PairFallbackPage() {
  return (
    <>
      <script
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: UA_DETECT_SCRIPT }}
      />
      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: PLATFORM_STYLE }}
      />

      <main className="wrap py-16">
        {/* ─── Eyebrow + hero ──────────────────────────────────────────── */}
        <p className="masthead mb-4">
          Pair · <span className="deva normal-case tracking-normal">पेयरिंग</span>
        </p>
        <h1 className="section-title max-w-4xl">
          QR scanned, but{" "}
          <span className="text-saffron">Sanketra Desktop</span> is unreachable.
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-muted">
          Your phone reached this page because the QR pointed at a local PC
          address (e.g. <span className="font-mono text-saffron">192.168.x.x:8765</span>)
          that didn&rsquo;t respond. Three things usually fix it.
        </p>

        {/* ─── Recovery checklist ──────────────────────────────────────── */}
        <section className="mt-12 rule-top pt-10">
          <p className="masthead mb-4">
            <span className="deva normal-case tracking-normal text-saffron">जाँच करें</span> ·
            Make sure
          </p>
          <ol className="grid gap-5 md:grid-cols-3">
            <li className="card p-6">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-saffron">
                Step 01
              </p>
              <h2 className="mt-2 text-lg font-semibold text-ink">Same WiFi network</h2>
              <p className="mt-2 text-sm text-muted">
                Your phone and your PC need to be on the{" "}
                <strong className="text-ink">same WiFi</strong>. Mobile data,
                guest networks, and 5 GHz/2.4 GHz split SSIDs are common
                culprits — switch the phone to the network your PC is on.
              </p>
            </li>
            <li className="card p-6">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-saffron">
                Step 02
              </p>
              <h2 className="mt-2 text-lg font-semibold text-ink">
                Sanketra Desktop is running
              </h2>
              <p className="mt-2 text-sm text-muted">
                Look for the saffron{" "}
                <span className="deva text-saffron">स</span> in your system
                tray (Windows / Linux) or menu bar (macOS). If it&rsquo;s not
                there, launch{" "}
                <strong className="text-ink">Sanketra Desktop</strong> first,
                then regenerate the QR on the PC.
              </p>
            </li>
            <li className="card p-6">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-saffron">
                Step 03
              </p>
              <h2 className="mt-2 text-lg font-semibold text-ink">
                Port <span className="font-mono text-saffron">8765</span>{" "}
                isn&rsquo;t blocked
              </h2>
              <p className="mt-2 text-sm text-muted">
                Windows Firewall, macOS&rsquo;s built-in filter, or a corporate
                VPN can silently drop the LAN connection. Add Sanketra to the
                firewall&rsquo;s allow-list, or temporarily disable the VPN to
                test.
              </p>
            </li>
          </ol>
          <p className="serif-italic mt-8 text-muted">
            <span className="deva not-italic text-ink">
              PC पर Sanketra Desktop चालू है? उसका{" "}
              <span className="text-saffron">स</span> system tray icon दिख रहा
              है?
            </span>
          </p>
        </section>

        {/* ─── CTA cards ──────────────────────────────────────────────── */}
        <section className="mt-16 rule-top pt-10">
          <p className="masthead mb-4">
            <span className="deva normal-case tracking-normal text-saffron">अगला कदम</span> ·
            Where to next
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Card 1 — always visible. Get Desktop. */}
            <article className="card p-7 ring-1 ring-saffron/40">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-saffron">
                If you haven&rsquo;t installed it yet
              </p>
              <h3 className="mt-3 text-2xl font-semibold leading-tight text-ink">
                Don&rsquo;t have{" "}
                <span className="deva text-saffron">संकेतरा</span> Desktop yet?
              </h3>
              <p className="mt-3 serif-italic text-muted">
                The QR works only after you install the PC side. Mac, Windows,
                Linux — all three are a single download.
              </p>
              <a
                href="/desktop/"
                className="mt-7 inline-flex items-center justify-center rounded-sm bg-saffron px-5 py-3 font-mono text-[0.78rem] uppercase tracking-[0.14em] text-paper transition hover:bg-saffron/90"
              >
                Get Sanketra Desktop &rarr;
              </a>
              <p className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-faint">
                Free during beta · Mac · Win · Linux
              </p>
            </article>

            {/* Card 2 — iOS only. Reveal via inline UA detect. */}
            <article data-pair-ios-only className="card p-7">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-saffron">
                iPhone &middot; iPad
              </p>
              <h3 className="mt-3 text-2xl font-semibold leading-tight text-ink">
                Using an iOS device?
              </h3>
              <p className="mt-3 text-sm text-muted">
                You can still use Sanketra in Safari &mdash; but you&rsquo;ll
                need a PC running the Sanketra server on the{" "}
                <strong className="text-ink">same WiFi</strong>. The web
                client opens at your PC&rsquo;s LAN address (printed on the
                Desktop pair screen), not on this site.
              </p>
              <p className="mt-4 serif-italic text-muted">
                Install Desktop on the PC first, then re-scan the QR your PC
                generates.
              </p>
              <a
                href="/desktop/"
                className="mt-7 inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ink hover:text-saffron"
              >
                <span>How the PC side works</span>
                <span aria-hidden>&rarr;</span>
              </a>
            </article>
          </div>
        </section>

        {/* ─── Closing reassurance ────────────────────────────────────── */}
        <section className="mt-16 rule-top pt-10">
          <p className="masthead mb-4">Still stuck?</p>
          <p className="max-w-3xl text-muted">
            The QR code on the PC has a 90-second life. If it expired between
            scan and connect, click{" "}
            <strong className="text-ink">Regenerate</strong> on the Desktop pair
            window and try again. Otherwise, the 4-digit pair code (Sanketra
            Phone &rarr; Manual setup) is the always-works fallback.
          </p>
        </section>
      </main>
    </>
  );
}
