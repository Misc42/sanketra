import Link from "next/link";

const tracks = [
  {
    id: "couch",
    eyebrow: "01 · FROM YOUR COUCH",
    icon: "📱",
    title: "Phone as your mic, trackpad, pointer.",
    body: "Sanketra on Android pairs with your PC over Wi-Fi. Hold-to-speak for Hindi dictation, trackpad gestures for cursor control, gyro for pointer, screen mirror for watching from across the room.",
    footer: "Live on Play Store · Closed testing",
    href: "/download#android",
    cta: "Download for Android",
  },
  {
    id: "desk",
    eyebrow: "02 · AT YOUR DESK",
    icon: "💻",
    title: "Global hotkey, PC mic, anywhere you type.",
    body: "Native Qt app for macOS, Windows and Linux — Ctrl + Alt in any text field dictates Hindi with your PC's mic. Transcript history, language-first setup that auto-picks the model for your hardware, full offline-first stack. Click Pair Phone for the cross-device flow.",
    footer: "v0.4.2 LIVE · .dmg / .exe / .AppImage on GitHub Releases",
    href: "/desktop/",
    cta: "Get Sanketra Desktop",
  },
] as const;

const bridge = {
  eyebrow: "03 · BRIDGE · दोनों एक-दूसरे को ढूंढ़ लेंगे",
  icon: "⚏",
  title: "Start anywhere — the other app is one-tap away.",
  body: "Install Desktop first? Click Pair Phone — its QR deep-links into the Play Store install + auto-pairs once Android lands. Install Phone first? Settings → Install on a new PC → tap Send on WhatsApp — text yourself the smart-install link, click on your PC, the right Mac/Win/Linux installer downloads automatically. No manual IP entry. Each product self-discloses the other at the moment it actually matters.",
  footer: "Both directions live in v1.2.3 Phone + v0.4.2 Desktop",
  href: "/pricing/",
  cta: "See the Bundle SKU",
} as const;

export default function Hero() {
  return (
    <section className="wrap grid gap-10 border-b border-rule pb-16 pt-12">
      <div className="relative flex flex-col items-center text-center">
        <img
          src="/sanketra/hero-soundwave.png"
          alt=""
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 w-[min(100%,54rem)] -translate-x-1/2 -translate-y-1/2 opacity-45 [mask-image:radial-gradient(closest-side,black,transparent_85%)]"
        />
        <p className="masthead mb-4">Sanketra · संकेतरा</p>
        <h1 className="deva serif-italic text-[clamp(2.4rem,6vw,4.2rem)] leading-[1.05] text-ink">
          बोलो, टाइप होगा।
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Hindi-first voice input for your PC. Local Whisper, no cloud, no account.
          Pick the flow that matches where you are right now.
        </p>
      </div>
      {/* one-stage Romanized (Hinglish) engine + language-first — the headline feature */}
      <article className="card card-accent flex flex-col gap-4 p-7">
        <div className="flex items-start justify-between gap-4">
          <p className="masthead text-saffron">NEW · हिंदी → Hinglish, सीधे</p>
          <span aria-hidden className="text-4xl leading-none">
            ⚡
          </span>
        </div>
        <p className="deva serif-italic text-[clamp(1.6rem,4vw,2.6rem)] leading-tight text-ink">
          बोलो हिंदी में, टाइप हो Hinglish में।
        </p>
        <p className="text-muted">
          Pick <span className="text-ink">Romanized</span> output and Sanketra transcribes Hindi speech
          straight to Latin “Hinglish” with a single on-device engine — and real English loanwords land as
          real English (<span className="text-ink">coffee, station, software</span>), not clumsy
          transliteration. Setup is language-first: choose the languages you speak and the app auto-picks the
          right model for your hardware — no model names to wade through, just a Quick ↔ Quality slider.
          Fully offline, no cloud, no account, same privacy promise.
        </p>
      </article>

      <div className="grid gap-6 md:grid-cols-2">
        {tracks.map((track) => (
          <article
            key={track.id}
            className="card flex flex-col gap-5 p-7 transition hover:border-saffron"
          >
            <div className="flex items-start justify-between">
              <p className="masthead text-saffron">{track.eyebrow}</p>
              <span aria-hidden className="text-4xl leading-none">
                {track.icon}
              </span>
            </div>
            <h2 className="text-2xl font-semibold leading-tight text-ink">
              {track.title}
            </h2>
            <p className="text-muted">{track.body}</p>
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-faint">
              {track.footer}
            </p>
            <Link
              href={track.href}
              className="mt-auto inline-flex items-center gap-2 border-b border-rule pb-2 text-sm font-semibold uppercase tracking-[0.12em] text-ink transition hover:border-saffron hover:text-saffron"
            >
              {track.cta}
              <span aria-hidden>→</span>
            </Link>
          </article>
        ))}
      </div>

      {/* Bridge card — bidirectional acquisition story */}
      <article className="card card-accent flex flex-col gap-4 p-7">
        <div className="flex items-start justify-between">
          <p className="masthead text-saffron">{bridge.eyebrow}</p>
          <span aria-hidden className="text-4xl leading-none">
            {bridge.icon}
          </span>
        </div>
        <h2 className="text-2xl font-semibold leading-tight text-ink">
          {bridge.title}
        </h2>
        <p className="text-muted">{bridge.body}</p>
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-faint">
          {bridge.footer}
        </p>
        <Link
          href={bridge.href}
          className="mt-auto inline-flex items-center gap-2 self-start border-b border-rule pb-2 text-sm font-semibold uppercase tracking-[0.12em] text-ink transition hover:border-saffron hover:text-saffron"
        >
          {bridge.cta}
          <span aria-hidden>→</span>
        </Link>
      </article>
    </section>
  );
}
