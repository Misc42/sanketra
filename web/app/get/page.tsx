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

export const metadata: Metadata = {
  title: "Install · Sanketra",
  description:
    "Auto-detects your OS and starts the right Sanketra Desktop download. Click here if it didn't start automatically."
};

const RELEASE_BASE =
  "https://github.com/Misc42/sanketra/releases/latest/download";

const ARTIFACTS = {
  mac: `${RELEASE_BASE}/Sanketra-Desktop-universal.dmg`,
  windows: `${RELEASE_BASE}/Sanketra-Desktop-Setup-x64.exe`,
  linux: `${RELEASE_BASE}/Sanketra-Desktop-x86_64.AppImage`
} as const;

// Inline UA-sniff + redirect. Mirrors detectOS() in DownloadHero.tsx and
// download/page.tsx — kept in sync intentionally. iPad on iPadOS 13+
// reports "Macintosh" in UA, so iphone|ipad|ipod must be checked BEFORE
// the mac branch; the additional ontouchend hint catches the iPad-on-Mac
// disguise. location.replace() (not assign) so Back doesn't return here.
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
    var target;
    if (ua.indexOf("iphone") !== -1 || ua.indexOf("ipad") !== -1 || ua.indexOf("ipod") !== -1) {
      target = "/sanketra/download/#ios";
    } else if (ua.indexOf("android") !== -1) {
      target = "https://play.google.com/store/apps/details?id=com.tanay.miconterm";
    } else if (ua.indexOf("win") !== -1) {
      target = base + "/Sanketra-Desktop-Setup-x64.exe";
    } else if (ua.indexOf("mac") !== -1) {
      if ("ontouchend" in document) { target = "/sanketra/download/#ios"; }
      else { target = base + "/Sanketra-Desktop-universal.dmg"; }
    } else if (ua.indexOf("linux") !== -1) {
      target = base + "/Sanketra-Desktop-x86_64.AppImage";
    } else {
      target = "/sanketra/desktop/";
    }
    window.location.replace(target);
  } catch (e) {}
})();`;

// Attribution line is hidden by default; revealed only when the inline
// script stamps data-ref="phone" on <html>. SSR output is "no attribution"
// so SEO + no-JS users see a clean page without an orphan ref tag.
const REF_STYLE = `
  [data-shared-from-phone] { display: none; }
  html[data-ref="phone"] [data-shared-from-phone] { display: block; }
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
            <a
              href={ARTIFACTS.mac}
              className="card flex flex-col gap-2 p-6 transition hover:border-ink"
            >
              <p className="masthead">macOS · <span className="deva normal-case tracking-normal">मैक</span></p>
              <p className="mt-2 inline-flex items-center justify-center rounded-[10px] bg-accent px-4 py-3 text-[14.5px] font-semibold text-paper transition hover:bg-accent-hover">
                Download .dmg
              </p>
              <p className="mt-2 font-mono text-xs text-faint">Sanketra-Desktop-universal.dmg</p>
            </a>

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
          <p className="mt-4 text-[13px] text-faint">
            Apne PC par auto-install ho jayega — bas correct file ka download finish hone do.
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
            your PC <em className="text-ink">and</em>{" "}
            <strong className="text-ink">Sanketra Phone</strong> on the
            Android side. Both are free during beta.{" "}
            <a
              href={withBase("/pricing/")}
              className="border-b border-rule pb-0.5 text-accent transition hover:border-accent"
            >
              See /pricing for the Bundle SKU
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
