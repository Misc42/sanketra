import Link from "next/link";
import Hero from "@/components/Hero";
import { withBase } from "@/lib/basePath";

const features = [
  ["From the couch", "Your phone is the mic", "Pair over Wi-Fi. Hold to speak; the PC types. Trackpad, pointer, and screen mirror ride along."],
  ["At the desk", "One hotkey, any app", "Ctrl + Alt in any text field and dictate with the PC mic. Native app for macOS, Windows, Linux."],
  ["New", "Hindi in, Hinglish out", "Speak Hindi, get Latin-script Hinglish — loanwords land as real English. One on-device engine."]
] as const;

const privacyPoints = [
  ["Speech-to-text runs on your PC.", "No cloud STT bill, no audio uploads."],
  ["No account, no tracking.", "Install and speak. That's the whole onboarding."],
  ["Pay once, later.", "₹0 during beta; a one-time ₹999 license after. No subscription."]
] as const;

export default function HomePage() {
  return (
    <main>
      <Hero />

      <section id="features" className="border-t border-rule bg-surface">
        <div className="wrap py-20">
          <h2 className="max-w-xl text-[38px] font-bold leading-tight tracking-[-0.025em]">
            Three ways in. One engine, on your machines.
          </h2>
          <div className="mt-11 grid gap-5 md:grid-cols-3">
            {features.map(([eyebrow, title, body]) => (
              <article key={title} className="rounded-2xl border border-rule bg-paper p-7">
                <p className="mb-2.5 text-[13px] font-semibold text-accent">{eyebrow}</p>
                <h3 className="text-[21px] font-bold tracking-[-0.015em]">{title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-rule">
        <div className="wrap grid gap-14 py-[72px] md:grid-cols-2 md:items-center">
          <h2 className="text-[38px] font-bold leading-[1.15] tracking-[-0.025em]">
            <span lang="hi" className="deva">
              आपकी आवाज़,
              <br />
              आपका कंप्यूटर।
            </span>
            <span className="mt-2.5 block text-[17px] font-medium tracking-normal text-faint">
              Your voice, your computer.
            </span>
          </h2>
          <div>
            {privacyPoints.map(([lead, rest]) => (
              <div key={lead} className="flex gap-3.5 border-b border-rule py-4 last:border-b-0">
                <span className="font-bold text-accent">✓</span>
                <p className="text-base text-muted">
                  <span className="font-semibold text-ink">{lead}</span> {rest}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-rule bg-surface">
        <div className="wrap py-[72px]">
          <div className="mb-7 flex items-baseline justify-between">
            <h2 className="text-[38px] font-bold tracking-[-0.025em]">Watch it type.</h2>
            <span className="text-sm text-faint">45 seconds, no narration</span>
          </div>
          <div className="aspect-video overflow-hidden rounded-2xl border border-rule bg-[#0F0E14]">
            <video
              src={withBase("/demo.mp4")}
              aria-hidden
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-rule">
        <div className="wrap flex flex-col items-center py-[84px] text-center">
          <p lang="hi" className="deva text-[34px] font-semibold text-ink">
            आज से typing बंद।
          </p>
          <div className="mt-[26px] flex flex-wrap justify-center gap-3">
            <a
              href={withBase("/download/")}
              className="rounded-[10px] bg-accent px-7 py-[13px] text-[15px] font-semibold text-paper transition hover:bg-accent-hover"
            >
              Download free
            </a>
            <Link
              href="/pricing"
              className="rounded-[10px] border border-[color:var(--input-border)] px-7 py-[13px] text-[15px] font-semibold text-ink transition hover:border-ink"
            >
              Pricing
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
