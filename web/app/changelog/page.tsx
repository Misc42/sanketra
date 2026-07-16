import type { Metadata } from "next";

// Curated customer-facing entries. The full engineering changelog is a
// bug-by-bug audit trail kept private in the source repo — never shipped on
// the marketing site; this page carries only plain-language release notes.
export const metadata: Metadata = {
  title: "Changelog",
  description: "Sanketra release notes."
};

const entries = [
  {
    version: "Desktop v0.5.1",
    date: "Jul 16, 2026",
    title: "Installers no longer carry the source, and Mac pairing works again",
    body: "The Windows, Mac, and Linux installers had been shipping the app's own code in readable form inside the download — they now ship compiled only. And on Mac, pairing a phone had quietly stopped working (a library mismatch inside the packaged app); that's fixed. Dictation itself was never affected, and no licence was ever at risk. A new automated check now launches the packaged server on every build so this kind of break can't ship again."
  },
  {
    version: "Desktop v0.5.0",
    date: "Jul 15, 2026",
    title: "Hindi transcribes right, and words you teach it now stick",
    body: "Dictation no longer mis-hears Hindi as Urdu, and Devanagari finally comes through on the phone — the app now uses the languages you picked in setup instead of guessing. Custom words you teach Sanketra reach desktop dictation too, not just the phone. Setup is simpler (two tiles — Hindi, English, or both for Hinglish), the whole app moves to the new light look, and the window reflows instead of clipping when you shrink it."
  },
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
