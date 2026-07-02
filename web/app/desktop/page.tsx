import type { Metadata } from "next";
import Link from "next/link";
import { InstallTabs } from "@/components/install/InstallTabs";
import { withBase } from "@/lib/basePath";

export const metadata: Metadata = {
  title: "Desktop",
  description:
    "Sanketra Desktop — native, offline, one hotkey. Whisper-based Hindi + English dictation on Mac, Windows, Linux."
};

const RELEASES_BASE = "https://github.com/Misc42/sanketra/releases/latest/download";

const downloadTiles = [
  ["macOS", `${RELEASES_BASE}/Sanketra-Desktop-universal.dmg`, "universal.dmg"],
  ["Windows", `${RELEASES_BASE}/Sanketra-Desktop-Setup-x64.exe`, "Setup-x64.exe"],
  ["Linux", `${RELEASES_BASE}/Sanketra-Desktop-x86_64.AppImage`, "x86_64.AppImage"]
] as const;

type Step = { title: string; body: string };

const STEPS: Record<"mac" | "windows" | "linux", readonly Step[]> = {
  mac: [
    { title: "Open the .dmg, drag to Applications", body: "Double-click Sanketra-Desktop-universal.dmg and drag the app into Applications." },
    { title: "Right-click → Open (once)", body: "The beta is unsigned, so Gatekeeper warns you. Right-click the app → Open → Open. macOS remembers after the first time." },
    { title: "Allow the microphone", body: "macOS asks so Sanketra can hear you. Reversible anytime in System Settings → Privacy." },
    { title: "Allow Accessibility", body: "This lets Sanketra type at your cursor. System Settings → Privacy & Security → Accessibility → enable Sanketra." },
    { title: "Hold Ctrl + Option and speak", body: "In any text field. Release to transcribe — the text lands at your cursor." }
  ],
  windows: [
    { title: "Run the installer", body: "Double-click Sanketra-Desktop-Setup-x64.exe." },
    { title: "SmartScreen: More info → Run anyway", body: "The beta is unsigned, so Windows warns you once. Click More info, then Run anyway." },
    { title: "Allow the microphone", body: "One prompt, so Sanketra can hear you. Reversible in Settings → Privacy." },
    { title: "Find स in the system tray", body: "Sanketra runs in the tray. Right-click it for Settings and Pair Phone." },
    { title: "Hold Ctrl + Alt and speak", body: "In any text field. Release to transcribe — the text lands at your cursor." }
  ],
  linux: [
    { title: "Make it executable", body: "chmod +x Sanketra-Desktop-x86_64.AppImage — or right-click → Properties → allow executing." },
    { title: "Run it", body: "No warnings on Linux — it just runs, and registers itself in your app menu on first launch." },
    { title: "Find स in the system tray", body: "Right-click the tray icon for Settings and Pair Phone." },
    { title: "Hold Ctrl + Alt and speak", body: "In any text field. Release to transcribe — the text lands at your cursor." },
    { title: "Optional: pick your mic", body: "Settings → Microphone lists every input; switching is live, no restart." }
  ]
};

function StepList({ steps }: { steps: readonly Step[] }) {
  return (
    <ol className="mt-6 overflow-hidden rounded-2xl border border-rule bg-paper">
      {steps.map((step, index) => (
        <li key={step.title} className="grid grid-cols-[40px_1fr] gap-4 border-b border-rule px-6 py-5 last:border-b-0 sm:grid-cols-[56px_1fr]">
          <span className="text-[15px] font-bold text-accent">0{index + 1}</span>
          <div>
            <p className="text-base font-semibold">{step.title}</p>
            <p className="mt-1 text-[14.5px] leading-relaxed text-muted">{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function DesktopPage() {
  return (
    <main>
      <section id="downloads" className="wrap pb-14 pt-20">
        <p className="masthead mb-3.5">v0.4.2 · free during beta</p>
        <h1 className="max-w-[800px] text-[clamp(2.5rem,4.6vw,3.75rem)] font-bold leading-[1.04] tracking-[-0.03em]">
          Sanketra Desktop.
          <br />
          <span className="text-faint">Native, offline, one hotkey.</span>
        </h1>
        <p className="mt-[18px] max-w-[560px] text-lg leading-relaxed text-muted">
          Whisper-based Hindi + English dictation, running on your own hardware. Hold Ctrl + Alt anywhere you type.
        </p>
        <div className="mt-8 grid max-w-[820px] gap-4 sm:grid-cols-3">
          {downloadTiles.map(([os, href, file]) => (
            <a
              key={os}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-rule bg-surface p-[22px] transition hover:border-ink"
            >
              <p className="text-[16.5px] font-bold">{os} ↓</p>
              <p className="mt-1 font-mono text-[13px] text-faint">{file}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="border-t border-rule bg-surface">
        <div className="wrap py-16">
          <h2 className="mb-2 text-[28px] font-bold tracking-[-0.02em]">Install, step by step.</h2>
          <p className="mb-6 max-w-[560px] text-[15px] text-muted">
            The beta is unsigned — your OS will warn you exactly once. Here&rsquo;s every screen you&rsquo;ll see.
          </p>
          <InstallTabs
            mac={<StepList steps={STEPS.mac} />}
            windows={<StepList steps={STEPS.windows} />}
            linux={<StepList steps={STEPS.linux} />}
          />
          <p className="mt-[18px] text-[13.5px] text-faint">
            Something looks different? The{" "}
            <a
              href="https://github.com/Misc42/sanketra"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent"
            >
              GitHub README
            </a>{" "}
            has the long-form guide with screenshots for every OS version.
          </p>
        </div>
      </section>

      <section className="border-t border-rule">
        <div className="wrap grid gap-14 py-16 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-[28px] font-bold tracking-[-0.02em]">Then add your phone. One scan.</h2>
            <p className="mt-3.5 text-base leading-relaxed text-muted">
              Click <span className="font-semibold text-ink">Pair Phone</span> in the tray — a QR appears. Point
              your phone&rsquo;s camera at it; it deep-links and pairs in two seconds. iPhone scans the same QR
              into Safari.
            </p>
            <p className="mt-3 text-sm text-faint">
              Single-use token, 90-second life, LAN-only — no cloud relay.{" "}
              <Link href="/pair" className="text-accent">
                Pairing troubleshooting
              </Link>
              .
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              ["90s", "token life, single use"],
              ["LAN", "only — nothing leaves Wi-Fi"],
              ["0", "IPs or codes to type"]
            ].map(([value, label]) => (
              <div key={value} className="rounded-2xl border border-rule bg-surface p-5">
                <p className="text-[22px] font-bold text-accent">{value}</p>
                <p className="mt-1 text-[13px] text-muted">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-rule bg-surface">
        <div className="wrap grid gap-8 py-14 md:grid-cols-3">
          <div>
            <p className="text-[15px] font-semibold">Local. Always.</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">
              Audio never leaves your machine. Whisper runs on your CPU or GPU.
            </p>
          </div>
          <div>
            <p className="text-[15px] font-semibold">Hindi + English, mid-sentence.</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">
              Code-switch freely; Romanized mode writes Hindi speech as Hinglish.
            </p>
          </div>
          <div>
            <p className="text-[15px] font-semibold">Free during beta.</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">
              Pro (history, top accuracy tiers) becomes a one-time SKU —{" "}
              <Link href="/pricing" className="text-accent">
                pricing
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
