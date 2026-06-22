import type { Metadata } from "next";

import { DownloadHero } from "@/components/install/DownloadHero";
import { InstallTabs } from "@/components/install/InstallTabs";
import { LinuxGuide } from "@/components/install/LinuxGuide";
import { MacGuide } from "@/components/install/MacGuide";
import { Troubleshooting } from "@/components/install/Troubleshooting";
import { WindowsGuide } from "@/components/install/WindowsGuide";

export const metadata: Metadata = {
  title: "Desktop — Sanketra",
  description:
    "Step-by-step install guide for Sanketra Desktop on Mac, Windows, Linux. Every screen, every warning, every prompt explained — so non-technical users never get stuck."
};

export default function DesktopPage() {
  return (
    <main className="wrap py-16">
      {/* ─── Zone 1 · Hero + download cards ─────────────────────────── */}
      <p className="masthead mb-4">Sanketra Desktop</p>
      <h1 className="section-title max-w-4xl">
        Bole. Type ho jaye.{" "}
        <span className="deva text-saffron">डेस्कटॉप</span> par,{" "}
        <span className="text-muted">native.</span>
      </h1>
      <p className="mt-6 max-w-3xl text-lg text-muted">
        Local PC dictation — Whisper-based, Hindi + English, no cloud, no phone.{" "}
        <strong className="text-ink">Free during beta.</strong>
      </p>

      <DownloadHero />

      {/* ─── Inter-zone bridge — what to expect ──────────────────────── */}
      <section className="mt-20 rule-top pt-12">
        <p className="masthead mb-4">
          <span className="deva normal-case tracking-normal text-saffron">क्या उम्मीद रखें</span> ·
          What you&rsquo;ll see, step by step
        </p>
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-saffron">
              One warning
            </p>
            <h3 className="mt-2 text-lg font-semibold text-ink">
              macOS Gatekeeper · Windows SmartScreen
            </h3>
            <p className="mt-2 text-sm text-muted">
              Sanketra is unsigned during the free beta. Both OSes will warn you once. The
              right-click → Open (Mac) and More info → Run anyway (Win) bypasses are documented
              with screenshots below. Linux has no equivalent warning — it just runs.
            </p>
          </div>
          <div>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-saffron">
              Two prompts on Mac
            </p>
            <h3 className="mt-2 text-lg font-semibold text-ink">
              Microphone · Accessibility
            </h3>
            <p className="mt-2 text-sm text-muted">
              macOS asks twice — once for your mic (so we can hear you) and once for Accessibility
              (so we can type at your cursor). Both prompts are reversible from System Settings.
              Windows asks once, for the mic. Linux asks zero times.
            </p>
          </div>
          <div>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-saffron">
              One hotkey, everywhere
            </p>
            <h3 className="mt-2 text-lg font-semibold text-ink">
              Ctrl + Alt
            </h3>
            <p className="mt-2 text-sm text-muted">
              Same chord on every OS (macOS shows it as Ctrl + Option). Hold to start, release to
              transcribe. The text appears wherever your cursor is — chat, code editor, browser,
              anywhere a keyboard would work. Customizable in Settings.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Zone 2 · Tabbed install guide ──────────────────────────── */}
      <section id="guide" className="mt-20 rule-top scroll-mt-24 pt-12">
        <p className="masthead mb-4">Install · चरण-दर-चरण · step by step</p>
        <h2 className="section-title max-w-4xl">
          Pick your OS.{" "}
          <span className="deva text-saffron">हर screen दिखाया</span> hai.
        </h2>
        <p className="mt-6 max-w-3xl text-lg text-muted">
          We auto-select the tab matching your computer. Every step has a screenshot or a mockup
          of what you&rsquo;ll see, plus a callout for what to do if something looks different —
          so you never have to guess.
        </p>

        <div className="mt-12">
          <InstallTabs
            mac={<MacGuide />}
            windows={<WindowsGuide />}
            linux={<LinuxGuide />}
          />
        </div>
      </section>

      {/* ─── New section · QR Pair bridge to Sanketra Phone ─────────── */}
      <section className="mt-20 rule-top pt-12">
        <p className="masthead mb-4">
          <span className="deva normal-case tracking-normal text-saffron">फोन भी जोड़ो</span> ·
          Pair your phone in one scan
        </p>
        <h2 className="section-title max-w-4xl">
          One QR. <span className="deva text-saffron">दो device</span>, ek setup.
        </h2>
        <p className="mt-6 max-w-3xl text-lg text-muted">
          Same server powers{" "}
          <a
            href="/download/"
            className="text-ink underline decoration-rule underline-offset-4 hover:text-saffron transition"
          >
            Sanketra Phone
          </a>{" "}
          (Android Play Store, free). Click <strong className="text-ink">Pair Phone</strong> in
          the Desktop tray — a QR shows up. Point your phone&rsquo;s camera at it. The app
          deep-links, auto-pairs in two seconds. No IP, no 4-digit code typing. Phone becomes
          a mic; transcripts type at your PC&rsquo;s cursor.
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-saffron">
              90-second window
            </p>
            <h3 className="mt-2 text-lg font-semibold text-ink">Single-use token</h3>
            <p className="mt-2 text-sm text-muted">
              Each QR carries a one-time pair token that expires in 90 seconds and burns on first
              use. Screenshot leaks have a tiny attack window; the dialog auto-mints a fresh
              token if you don&rsquo;t scan in time.
            </p>
          </div>
          <div>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-saffron">
              LAN-only
            </p>
            <h3 className="mt-2 text-lg font-semibold text-ink">No cloud relay</h3>
            <p className="mt-2 text-sm text-muted">
              Phone and PC pair over your WiFi. No traffic leaves the network. If the QR scan
              shows{" "}
              <a
                href="/pair/"
                className="text-ink underline decoration-rule underline-offset-4 hover:text-saffron transition"
              >
                a recovery page
              </a>
              , the phone is on a different network — switch WiFi and re-scan.
            </p>
          </div>
          <div>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-saffron">
              iPhone too
            </p>
            <h3 className="mt-2 text-lg font-semibold text-ink">No native iOS app needed</h3>
            <p className="mt-2 text-sm text-muted">
              iOS users scan the same QR — Safari opens the web phone-mic client with auto-pair
              already done. No App Store install. Works on iPad. The Sanketra Desktop server is
              the only piece you install on a PC.
            </p>
          </div>
        </div>

        <p className="mt-10 max-w-3xl serif-italic text-muted">
          &ldquo;4-digit code as fallback — कोई QR scan nahi कर पाए toh PC उस par भी एक code दिखाता
          है, phone पर manually type kar do.&rdquo;
        </p>

        <div className="mt-12 rounded-md border-l-2 border-saffron bg-surface/60 p-6">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-saffron">
            Reverse direction · फ़ोन पहले installed है तो
          </p>
          <p className="mt-3 text-base text-muted">
            Already running Sanketra Phone but need Desktop on a new PC? Open Settings →{" "}
            <strong className="text-ink">Install on a new PC</strong> → tap{" "}
            <strong className="text-ink">Send on WhatsApp</strong>. Text the smart-install link to
            yourself, open it on your PC&rsquo;s browser, and{" "}
            <a
              href="/get/"
              className="text-ink underline decoration-rule underline-offset-4 hover:text-saffron transition"
            >
              /get
            </a>{" "}
            auto-detects your OS + starts the right Mac/Win/Linux download. Zero typing on the PC.
          </p>
        </div>
      </section>

      {/* ─── Zone 3 · Power-user + troubleshooting ──────────────────── */}
      <Troubleshooting />

      {/* ─── Footer — what is Sanketra Desktop ──────────────────────── */}
      <section className="mt-20 rule-top pt-12">
        <p className="masthead mb-4">
          What is <span className="deva normal-case tracking-normal text-saffron">संकेतरा</span>{" "}
          Desktop, anyway?
        </p>
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold text-ink">Local. Always.</h3>
            <p className="mt-2 text-sm text-muted">
              Audio never leaves your machine. Whisper runs on your CPU or GPU; the model lives in{" "}
              <code className="font-mono text-ink">~/.cache/whisper/</code>. No call-home, no
              account, no telemetry.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-ink">Hindi + English.</h3>
            <p className="mt-2 text-sm text-muted">
              Code-switch mid-sentence — Whisper handles both.{" "}
              <span className="serif-italic">Aaj ka meeting note likh raha tha</span> flows the
              same as pure English. Prefer Latin script? Romanized output writes Hindi speech
              straight to Hinglish — and real English loanwords land as real English (coffee,
              station, software). Higher-accuracy quality tiers unlock with Pro.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-ink">Free during beta.</h3>
            <p className="mt-2 text-sm text-muted">
              All three builds are free while we shake bugs out. Pro features (long sessions,
              transcript history, higher-quality recognition) become a paid SKU later — see{" "}
              <a
                href="/pricing/"
                className="text-ink underline decoration-rule underline-offset-4 hover:text-saffron transition"
              >
                pricing
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
