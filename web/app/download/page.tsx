import type { Metadata } from "next";
import Link from "next/link";
import QRCode from "@/components/QRCode";

export const metadata: Metadata = {
  title: "Download — Phone",
  description: "Get Sanketra Phone on Android (Play Store) or scan into the Safari web client on iPhone — paired in two minutes."
};

const playStoreUrl = "https://play.google.com/store/apps/details?id=com.tanay.miconterm";
// Live deploy host (GitHub Pages project sub-path) — the apex sanketra.app is
// not attached yet, so the QR + iOS card must point at the host that
// actually serves the page. Flip back to https://sanketra.app/download at
// apex cutover.
const iosDownloadUrl = "https://misc42.github.io/sanketra/download";

const RELEASES_BASE = "https://github.com/Misc42/sanketra/releases/latest/download";

const pcInstallers = [
  ["Windows", `${RELEASES_BASE}/Sanketra-Desktop-Setup-x64.exe`, "Setup-x64.exe"],
  ["macOS", `${RELEASES_BASE}/Sanketra-Desktop-universal.dmg`, "universal.dmg"],
  ["Linux", `${RELEASES_BASE}/Sanketra-Desktop-x86_64.AppImage`, "x86_64.AppImage"]
] as const;

export default function DownloadPage() {
  return (
    <main>
      <section className="wrap pb-12 pt-20">
        <h1 className="max-w-[760px] text-[clamp(2.5rem,4.6vw,3.75rem)] font-bold leading-[1.04] tracking-[-0.03em]">
          Phone in hand?
          <br />
          <span className="text-faint">Two minutes to paired.</span>
        </h1>
        <p className="mt-[18px] max-w-[560px] text-lg leading-relaxed text-muted">
          Install the PC side first, then scan one QR with your phone. Same flow everywhere: install → QR shows →
          scan → paired.
        </p>
      </section>

      <section className="wrap pb-10">
        <div className="grid gap-5 md:grid-cols-2">
          <article className="grid grid-cols-[1fr_128px] gap-6 rounded-2xl border border-rule bg-surface p-[30px]">
            <div>
              <p className="text-[13px] font-semibold text-accent">Android · free on Play Store</p>
              <h2 className="mt-2.5 text-[26px] font-bold tracking-[-0.02em]">Sanketra Phone</h2>
              <ol className="mt-3.5 grid gap-2 text-[14.5px] text-muted">
                <li className="flex gap-2.5">
                  <span className="font-semibold text-accent">1</span>Install from Play Store
                </li>
                <li className="flex gap-2.5">
                  <span className="font-semibold text-accent">2</span>On the PC: click{" "}
                  <span className="font-semibold text-ink">Pair Phone</span>
                </li>
                <li className="flex gap-2.5">
                  <span className="font-semibold text-accent">3</span>Scan the QR — pairs in ~2 seconds
                </li>
              </ol>
              <a
                href={playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4.5 inline-block rounded-[10px] bg-accent px-[22px] py-[11px] text-[14.5px] font-semibold text-paper transition hover:bg-accent-hover"
              >
                Open Play Store
              </a>
            </div>
            <div className="self-center">
              <QRCode value={playStoreUrl} title="QR code linking to the Sanketra Play Store listing" />
            </div>
          </article>

          <article className="grid grid-cols-[1fr_128px] gap-6 rounded-2xl border border-rule bg-surface p-[30px]">
            <div>
              <p className="text-[13px] font-semibold text-muted">iPhone · iPad — no app needed</p>
              <h2 className="mt-2.5 text-[26px] font-bold tracking-[-0.02em]">Safari mic client</h2>
              <ol className="mt-3.5 grid gap-2 text-[14.5px] text-muted">
                <li className="flex gap-2.5">
                  <span className="font-semibold text-accent">1</span>Install Sanketra Desktop on your PC
                </li>
                <li className="flex gap-2.5">
                  <span className="font-semibold text-accent">2</span>Open the{" "}
                  <span className="font-semibold text-ink">Pair Phone</span> QR on the PC
                </li>
                <li className="flex gap-2.5">
                  <span className="font-semibold text-accent">3</span>Scan with the iPhone camera — Safari
                  auto-loads
                </li>
              </ol>
              <Link
                href="/desktop"
                className="mt-4.5 inline-block rounded-[10px] border border-[color:var(--input-border)] px-[22px] py-[11px] text-[14.5px] font-semibold text-ink transition hover:border-ink"
              >
                Get the PC side first
              </Link>
            </div>
            <div className="self-center">
              <QRCode value={iosDownloadUrl} title="QR code linking to the Sanketra iOS download page" />
            </div>
          </article>
        </div>
      </section>

      <section className="border-t border-rule bg-surface">
        <div className="wrap py-16">
          <div className="mb-7 flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-[28px] font-bold tracking-[-0.02em]">And the PC side.</h2>
            <Link href="/desktop" className="text-[14.5px] font-semibold text-accent hover:underline">
              Full install guide →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {pcInstallers.map(([os, href, file]) => (
              <a
                key={os}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-rule bg-paper p-6 transition hover:border-ink"
              >
                <p className="text-[17px] font-bold">{os}</p>
                <p className="mt-1.5 font-mono text-[13.5px] text-faint">{file}</p>
              </a>
            ))}
          </div>
          <p className="mt-5 text-[13.5px] text-faint">
            QR won&rsquo;t scan? The PC also shows a 4-digit code — type it on the phone. Scan landed you on an
            error page?{" "}
            <Link href="/pair" className="text-accent">
              Pairing help
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
