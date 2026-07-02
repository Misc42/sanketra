import type { Metadata } from "next";

// Curated customer-facing entries — matches Sanketra Changelog.dc.html
// verbatim. The full engineering log lives in content/CHANGELOG.md (still
// read by lib/changelog.ts, kept for internal reference) but that file is a
// bug-by-bug audit trail, not something to ship on the marketing site; this
// page trades it for the 5 plain-language entries the design specifies.
export const metadata: Metadata = {
  title: "Changelog",
  description: "Sanketra release notes."
};

const entries = [
  {
    version: "Desktop v0.4.2",
    date: "Jun 5, 2026",
    title: "Phone pairing fixed",
    body: "The bundled pairing server wasn't starting (a packaging gap), so Pair Phone failed and launch paused ~30 seconds. Both fixed — pairing works, launch is instant. Dictation itself was never affected."
  },
  {
    version: "Desktop v0.4.1",
    date: "Jun 5, 2026",
    title: "Linux app-menu entry + optional auto-submit",
    body: "The AppImage now registers itself in your app launcher on first run. New Settings toggle: press Enter after dictation, so a push-to-talk message sends itself. Off by default."
  },
  {
    version: "Desktop v0.4.0",
    date: "Jun 4, 2026",
    title: "Optional Hindi+English combo engine",
    body: "A second, faster STT engine — Hindi routes to IndicConformer, English to Parakeet. Cleaner Hindi, properly punctuated English, 10–20× real-time on plain CPU. One ~1.6 GB download, fully on-device. Whisper stays the default."
  },
  {
    version: "Desktop v0.3",
    date: "May 18, 2026",
    title: "Cross-platform shim + mic picker",
    body: "One module now owns every OS-divergent primitive, and Settings grows a microphone picker with live-swap — plug in a USB mic, switch, no restart. Ships unsigned on Mac/Windows for now (right-click → Open / Run anyway)."
  },
  {
    version: "Phone v1.2.0",
    date: "Apr 21, 2026",
    title: "Dashboard, Chrome extension, Android polish",
    body: "PC dashboard with searchable transcript history and export, Chrome extension v1, custom vocabulary UI, accent calibration, and OEM battery walkthroughs for Xiaomi / OPPO / Samsung."
  }
] as const;

export default function ChangelogPage() {
  return (
    <main className="narrow py-20">
      <h1 className="text-[clamp(2.375rem,4.4vw,3.375rem)] font-bold leading-[1.05] tracking-[-0.03em]">
        Changelog
      </h1>
      <p className="mt-3.5 text-base text-muted">
        What shipped, in plain words. Full history on{" "}
        <a
          href="https://github.com/Misc42/sanketra"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent"
        >
          GitHub
        </a>
        .
      </p>
      <div className="mt-12">
        {entries.map((entry) => (
          <article key={entry.version} className="grid gap-7 border-t border-rule py-7 sm:grid-cols-[170px_1fr]">
            <div>
              <p className="text-[15px] font-bold text-accent">{entry.version}</p>
              <p className="mt-1 text-[13px] text-faint">{entry.date}</p>
            </div>
            <div>
              <h2 className="text-[19px] font-bold tracking-[-0.01em]">{entry.title}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{entry.body}</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
