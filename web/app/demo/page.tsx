import type { Metadata } from "next";
import Link from "next/link";
import { withBase } from "@/lib/basePath";

export const metadata: Metadata = {
  title: "Demo",
  description: "Watch Sanketra dictation, trackpad, and screen mirror demos."
};

const clips = [
  ["Dictation", "Speak Hindi or Hinglish into your phone; text lands in the active PC field."],
  ["Trackpad", "The phone as a precise LAN trackpad when the laptop is across the room."],
  ["Screen mirror", "See and control the PC from your phone — no internet relay."]
] as const;

export default function DemoPage() {
  return (
    <main>
      <section className="wrap pb-12 pt-20">
        <h1 className="max-w-[760px] text-[clamp(2.5rem,4.6vw,3.75rem)] font-bold leading-[1.04] tracking-[-0.03em]">
          Watch it work.
        </h1>
        <p className="mt-[18px] max-w-[540px] text-lg leading-relaxed text-muted">
          One PC, one phone, one local Wi-Fi loop — dictation, trackpad, and screen mirror.
        </p>
        {/* demo.mp4 exists in public/; a dedicated poster frame is still pending
            from the owner (see README §Assets), so the video itself doubles
            as the hero — muted/autoplay/loop acts like a motion poster. */}
        <div className="mt-9 aspect-video overflow-hidden rounded-2xl border border-rule bg-[#0F0E14]">
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
      </section>

      <section className="border-t border-rule bg-surface">
        <div className="wrap py-16">
          <div className="grid gap-5 md:grid-cols-3">
            {clips.map(([title, caption]) => (
              <article key={title} className="overflow-hidden rounded-2xl border border-rule bg-paper">
                {/* Clip frames (dictation/trackpad/screen-mirror captures) are
                    pending from the owner — see README §Assets. Placeholder
                    keeps the correct 16/9 slot instead of faking an image. */}
                <div className="flex aspect-video items-center justify-center bg-surface-2 text-center">
                  <span className="text-[13px] font-semibold text-faint">Capture pending</span>
                </div>
                <div className="p-6">
                  <h2 className="text-lg font-bold">{title}</h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{caption}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/desktop"
              className="inline-block rounded-[10px] bg-accent px-7 py-[13px] text-[15px] font-semibold text-paper transition hover:bg-accent-hover"
            >
              Try it yourself — free
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
