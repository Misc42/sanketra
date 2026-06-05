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
    body: "Native Qt app for macOS, Windows and Linux — Ctrl+Shift+Space in any text field dictates Hindi with your PC's mic. Transcript history, hardware-aware model picker, full offline-first stack. Click Pair Phone for the cross-device flow.",
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
      <div className="flex flex-col items-center text-center">
        <p className="masthead mb-4">Sanketra · संकेतरा</p>
        <p className="deva serif-italic text-[clamp(2.4rem,6vw,4.2rem)] leading-[1.05] text-ink">
          बोलो, टाइप होगा।
        </p>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Hindi-first voice input for your PC. Local Whisper, no cloud, no account.
          Pick the flow that matches where you are right now.
        </p>
      </div>
      {/* combo-engine ribbon — the headline feature, optional + on-device */}
      <article className="card card-accent flex flex-col gap-4 p-7">
        <div className="flex items-start justify-between gap-4">
          <p className="masthead text-saffron">NEW · v0.4.2 · हिंदी + इंग्लिश कॉम्बो</p>
          <span aria-hidden className="text-4xl leading-none">
            ⚡
          </span>
        </div>
        <p className="deva serif-italic text-[clamp(1.6rem,4vw,2.6rem)] leading-tight text-ink">
          हिंदी और इंग्लिश, साथ में — तेज़ और शार्प।
        </p>
        <p className="text-muted">
          Optional combo engine: pick it under <span className="text-ink">Settings → STT Engine</span> and
          each utterance routes to a dedicated model — Hindi to IndicConformer, English to Parakeet — instead
          of one model for everything. Cleaner Hindi, properly punctuated and capitalised English, running
          10–20× faster than real-time on plain CPU. Downloads ~1.6&nbsp;GB once, then fully on-device — no
          cloud, no account, same privacy promise. Faster aur sharper chahiye? On karo. Whisper still ships
          as the default.
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
