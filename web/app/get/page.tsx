// Smart-redirect landing for Sanketra Phone→Desktop install handoff.
// Phone-side users share https://misc42.github.io/sanketra/get?ref=phone
// with themselves on WhatsApp, open it on a PC, and the right OS artifact
// downloads automatically. Contract: docs/PHONE_TO_DESKTOP_INSTALL_PROTOCOL.md.
//
// The page is a server component — pure static HTML on GH Pages. A tiny
// inline <script> runs before paint, sniffs navigator.userAgent, and
// window.location.replace()'s to the right artifact. The visible body is
// the NO-JS / redirect-blocked / Back-button fallback — three direct
// download buttons + a link to /desktop/ for the full walkthrough. Whole
// file stays in one place to keep the route weight near zero.

import type { Metadata } from "next";
import { withBase } from "@/lib/basePath";
import { MAC_ARCH_SHORT, MAC_DMG_FILE, MAC_DMG_URL, MAC_INTEL_URL, PLAY_LISTING_LIVE, PLAY_STORE_URL } from "@/lib/facts";

export const metadata: Metadata = {
  title: "Install · Sanketra",
  description:
    "Auto-detects your OS and starts the right Sanketra Desktop download. Click here if it didn't start automatically."
};

const RELEASE_BASE =
  "https://github.com/Misc42/sanketra/releases/latest/download";

const ARTIFACTS = {
  mac: MAC_DMG_URL,
  macIntel: MAC_INTEL_URL,
  windows: `${RELEASE_BASE}/Sanketra-Desktop-Setup-x64.exe`,
  linux: `${RELEASE_BASE}/Sanketra-Desktop-x86_64.AppImage`
} as const;

// Inline UA-sniff + redirect. Mirrors detectOS() in components/Hero.tsx,
// components/DownloadCTA.tsx and download/page.tsx — kept in sync
// intentionally. iPad on iPadOS 13+
// reports "Macintosh" in UA, so iphone|ipad|ipod must be checked BEFORE
// the mac branch; the additional ontouchend hint catches the iPad-on-Mac
// disguise. location.replace() (not assign) so Back doesn't return here.
//
// Android: while the Play listing is not live (PLAY_LISTING_LIVE in lib/facts.ts)
// there is nothing to install, so an Android visitor goes to /download, whose
// lead path is the browser client reached through the QR on the PC. iOS goes to
// the same page. Both flags are interpolated into the script below.
//
// Side-effect: also parses ?ref=phone and stamps data-ref="phone" on
// <html>. We can't await searchParams in a statically-exported page
// (Next 15 requires force-dynamic for that, which GH Pages doesn't
// support), so the attribution line is revealed by a matching CSS rule
// rather than rendered conditionally on the server.
const REDIRECT_SCRIPT = `(function(){
  try {
    var ref = "";
    try {
      var q = (location.search || "").replace(/^\\?/, "").split("&");
      for (var i = 0; i < q.length; i++) {
        var kv = q[i].split("=");
        if (kv[0] === "ref") { ref = decodeURIComponent(kv[1] || ""); break; }
      }
    } catch (e) {}
    if (ref) { document.documentElement.dataset.ref = ref; }

    var ua = (navigator.userAgent || "").toLowerCase();
    var base = "https://github.com/Misc42/sanketra/releases/latest/download";
    var playLive = ${JSON.stringify(PLAY_LISTING_LIVE)};
    var playUrl = ${JSON.stringify(PLAY_STORE_URL)};
    var phonePage = "/sanketra/download/";
    var target;
    if (ua.indexOf("iphone") !== -1 || ua.indexOf("ipad") !== -1 || ua.indexOf("ipod") !== -1) {
      target = phonePage;
    } else if (ua.indexOf("android") !== -1) {
      target = playLive ? playUrl : phonePage;
    } else if (ua.indexOf("win") !== -1) {
      target = base + "/Sanketra-Desktop-Setup-x64.exe";
    } else if (ua.indexOf("mac") !== -1) {
      if ("ontouchend" in document) { target = phonePage; }
      else {
        // Safari says "Intel Mac OS X" on every Mac, so the UA cannot tell
        // Apple Silicon from Intel, and the arm64 dmg does not open on an
        // Intel Mac. Chromium's client hints can tell; anything else stays
        // here and picks one of the two Mac buttons. A wrong "x86" answer on
        // Apple Silicon is still safe: the Intel build runs under Rosetta.
        document.documentElement.dataset.macPick = "1";
        var uad = navigator.userAgentData;
        if (uad && uad.getHighEntropyValues) {
          uad.getHighEntropyValues(["architecture"]).then(function (v) {
            var arch = ((v && v.architecture) || "").toLowerCase();
            if (arch === "arm") { window.location.replace("${MAC_DMG_URL}"); }
            else if (arch === "x86") { window.location.replace("${MAC_INTEL_URL}"); }
          }).catch(function () {});
        }
      }
    } else if (ua.indexOf("linux") !== -1) {
      target = base + "/Sanketra-Desktop-x86_64.AppImage";
    } else {
      target = "/sanketra/desktop/";
    }
    if (target) { window.location.replace(target); }
  } catch (e) {}
})();`;

// Attribution line is hidden by default; revealed only when the inline
// script stamps data-ref="phone" on <html>. SSR output is "no attribution"
// so SEO + no-JS users see a clean page without an orphan ref tag.
const REF_STYLE = `
  [data-shared-from-phone] { display: none; }
  html[data-ref="phone"] [data-shared-from-phone] { display: block; }
  [data-mac-pick-note] { display: none; }
  html[data-mac-pick="1"] [data-mac-pick-note] { display: block; }
`;

export default function GetPage() {
  return (
    <>
      <script
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: REDIRECT_SCRIPT }}
      />
      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: REF_STYLE }}
      />

      <main className="wrap py-20">
        {/* ─── Eyebrow + direct headline ───────────────────────────────────
            Reading order is OS-picker first (above the fold on 350-414px),
            then the auto-redirect reassurance copy. JS-on users still get
            the silent UA-sniff redirect from REDIRECT_SCRIPT above — by the
            time their eyes land on the cards, the download tab is already
            firing. JS-off / blocked-script users see an unambiguous CTA
            instead of a static "starting…" ellipsis that looks broken. */}
        <p className="masthead mb-4">
          Install · <span className="deva normal-case tracking-normal">इंस्टॉल</span>
        </p>
        <h1 className="section-title max-w-3xl">
          Pick your OS. <span className="text-accent">We&rsquo;ll start the download.</span>
        </h1>
        <p className="deva mt-5 max-w-2xl text-2xl text-muted">
          अपना OS चुनो — बाक़ी हम कर देंगे।
        </p>

        {/* ─── OS picker (primary CTA, above the fold on phone) ────────── */}
        <section className="mt-10">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="card flex flex-col gap-2 p-6">
              <p className="masthead">macOS · <span className="deva normal-case tracking-normal">मैक</span></p>
              <a
                href={ARTIFACTS.mac}
                className="mt-2 inline-flex items-center justify-center rounded-[10px] bg-accent px-4 py-3 text-[14.5px] font-semibold text-paper transition hover:bg-accent-hover"
              >
                Download for Apple Silicon
              </a>
              <p className="font-mono text-xs text-faint">{MAC_DMG_FILE}</p>
              <p className="text-xs leading-snug text-muted">{MAC_ARCH_SHORT}</p>
              <a
                href={ARTIFACTS.macIntel}
                className="mt-2 inline-flex items-center justify-center rounded-[10px] border border-rule px-4 py-3 text-[14.5px] font-semibold text-ink transition hover:border-ink"
              >
                Download for Intel Mac
              </a>
              <p className="font-mono text-xs text-faint">Sanketra-Desktop-x86_64.dmg</p>
              <p className="text-xs leading-snug text-muted">
                Not sure? Apple menu → About This Mac: &ldquo;Chip: Apple M…&rdquo; is Apple Silicon,
                &ldquo;Processor: Intel&rdquo; is Intel.
              </p>
            </div>

            <a
              href={ARTIFACTS.windows}
              className="card flex flex-col gap-2 p-6 transition hover:border-ink"
            >
              <p className="masthead">Windows · <span className="deva normal-case tracking-normal">विंडोज़</span></p>
              <p className="mt-2 inline-flex items-center justify-center rounded-[10px] bg-accent px-4 py-3 text-[14.5px] font-semibold text-paper transition hover:bg-accent-hover">
                Download .exe
              </p>
              <p className="mt-2 font-mono text-xs text-faint">Sanketra-Desktop-Setup-x64.exe</p>
            </a>

            <a
              href={ARTIFACTS.linux}
              className="card flex flex-col gap-2 p-6 transition hover:border-ink"
            >
              <p className="masthead">Linux · <span className="deva normal-case tracking-normal">लिनक्स</span></p>
              <p className="mt-2 inline-flex items-center justify-center rounded-[10px] bg-accent px-4 py-3 text-[14.5px] font-semibold text-paper transition hover:bg-accent-hover">
                Download .AppImage
              </p>
              <p className="mt-2 font-mono text-xs text-faint">Sanketra-Desktop-x86_64.AppImage</p>
            </a>
          </div>
        </section>

        {/* ─── Reassurance (below the fold; JS-on users already redirected) */}
        <section className="mt-14 rule-top pt-10">
          <p className="masthead mb-3">Auto-detect on · <span className="deva normal-case tracking-normal">ऑटो-डिटेक्ट चालू</span></p>
          <p className="max-w-2xl text-lg text-muted">
            If JavaScript is on, we&rsquo;ve already kicked off the right file
            for your OS. The cards above are the manual route — for JS-off,
            popup-blocked, or Back-button arrivals.
          </p>
          <p data-mac-pick-note className="mt-4 max-w-2xl text-lg text-ink">
            On a Mac, pick your chip in the macOS card above: this browser
            does not tell us whether your Mac is Apple Silicon or Intel.
          </p>
          <p className="mt-4 text-[13px] text-faint">
            Download khatam hone ke baad file ko khud kholo aur install karo — wo apne aap install nahi
            hoti. Poora guide neeche &ldquo;step-by-step walkthrough&rdquo; mein hai.
          </p>
        </section>

        {/* ─── Step-by-step walkthrough CTA ────────────────────────────── */}
        <section className="mt-12">
          <p className="text-muted">
            Need the full install guide with screenshots?{" "}
            <a
              href={withBase("/desktop/")}
              className="border-b border-rule pb-0.5 font-semibold text-ink transition hover:border-accent hover:text-accent"
            >
              Open the step-by-step walkthrough &rarr;
            </a>
          </p>
        </section>

        {/* ─── Phone-shared callout ────────────────────────────────────── */}
        <aside className="callout mt-12 p-6">
          <p className="text-[13px] font-semibold text-accent">★ Shared from a phone?</p>
          <p className="mt-3 text-muted">
            You&rsquo;ll want <strong className="text-ink">Sanketra Desktop</strong> on
            your PC. Your phone then pairs to it through the browser, with no
            phone app to install: scan the QR the PC shows.{" "}
            <a
              href={withBase("/download/")}
              className="border-b border-rule pb-0.5 text-accent transition hover:border-accent"
            >
              Phone steps
            </a>{" "}
            ·{" "}
            <a
              href={withBase("/pricing/")}
              className="border-b border-rule pb-0.5 text-accent transition hover:border-accent"
            >
              Pricing
            </a>
            .
          </p>
        </aside>

        {/* Attribution — revealed by inline script when ?ref=phone is in
            the URL. Always present in DOM; CSS hides it otherwise so the
            statically-exported HTML works without server-side query parse. */}
        <p data-shared-from-phone className="mt-16 text-[13px] text-faint">
          Shared from your phone · <span className="deva normal-case tracking-normal">फ़ोन से</span> from phone se
        </p>
      </main>
    </>
  );
}
