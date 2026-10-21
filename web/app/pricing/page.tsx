import type { Metadata } from "next";
import { withBase } from "@/lib/basePath";
import { ISSUES_URL, PLAY_LISTING_LIVE } from "@/lib/facts";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Lifetime licenses for Sanketra. The free tier has models up to small and 200 minutes a month; Phone Pro ₹999, Desktop Pro ₹999 or the Bundle ₹1,499 lift both limits for their track. Pay once."
};

// What a license changes, and nothing else, is read from src/server_async.py in
// the source repo: FREE_TIER_MODELS = {tiny, base, small}, FREE_TIER_MONTHLY_MINUTES
// = 200 (one counter per client kind, resets each UTC month), and the two gates
// that read them (/api/model/load -> 403 model_requires_pro; the audio WebSocket
// -> close 4402). History, vocabulary, accent calibration, trackpad, gyro,
// screen mirror, PC audio and the hotkey have no license check anywhere, so they
// are free for everyone. Keep this list in step with that code, not with
// MONETIZATION.md.
//
// TODO(founder, launch readiness PL-4): the "desktop" gate only runs when the
// native app routes dictation through its embedded server (SANKETRA_UNIFY=1,
// default off), so today Desktop Pro unlocks nothing the app enforces. The
// "Beta note" under the cards says so; delete it when the desktop path is gated
// (or pull the SKU).
// TODO(eng, PL-2): there is no license-entry screen yet (the key email points at
// a Settings -> License screen and a CLI flag that do not exist), so no copy on
// this site tells a buyer where to paste the key. Add that line when one ships.
// TODO(contact): no private support mailbox exists; refunds, upgrades and
// license questions point at public GitHub issues. Replace when one does.

// Checkout stays closed until the license issuer is deployed and one test
// purchase has minted a key that a real install accepted. The payment links
// below are live-mode: with no issuer, a buyer is charged and gets nothing.
const SALES_OPEN = false;

type Sku = {
  id: "phone" | "desktop" | "bundle";
  recommended: boolean;
  eyebrow: string;
  deva: string;
  price: number;
  priceNote: string;
  tagline: string;
  features: readonly string[];
  buyUrl: string;
  ctaLabel: string;
};

const skus: readonly Sku[] = [
  {
    id: "phone",
    recommended: false,
    eyebrow: "Phone Pro",
    deva: "फ़ोन प्रो",
    price: 999,
    priceNote: "one-time · lifetime",
    tagline: "For the Android app: larger models, no monthly cap.",
    features: [
      "Models medium, large-v3-turbo, distil-large-v3 and large-v3 for the Android app",
      "No 200-minute monthly cap for the Android app",
      "Installed once on your PC; browser clients stay on the free tier"
    ],
    buyUrl: "https://rzp.io/rzp/6UkS3s2N",
    ctaLabel: "Buy Phone Pro"
  },
  {
    id: "bundle",
    recommended: true,
    eyebrow: "Bundle",
    deva: "बंडल",
    price: 1499,
    priceNote: "save ₹499",
    tagline: "Phone Pro + Desktop Pro on one license key.",
    features: [
      "Everything in Phone Pro",
      "Everything in Desktop Pro",
      "One key covers both tracks",
      "Browser clients stay on the free tier"
    ],
    buyUrl: "https://rzp.io/rzp/6r3tm3x",
    ctaLabel: "Buy Bundle"
  },
  {
    id: "desktop",
    recommended: false,
    eyebrow: "Desktop Pro",
    deva: "डेस्कटॉप प्रो",
    price: 999,
    priceNote: "one-time · lifetime",
    tagline: "For the native desktop app: larger models, no monthly cap.",
    features: [
      "Models medium, large-v3-turbo, distil-large-v3 and large-v3 for the native desktop app (macOS · Windows · Linux)",
      "No 200-minute monthly cap for the native desktop app",
      "Phone and browser clients stay on the free tier"
    ],
    buyUrl: "https://rzp.io/rzp/QazIhoT",
    ctaLabel: "Buy Desktop Pro"
  }
] as const;

const finePrint = [
  ["What does Pro change?", "Two things, both enforced by your PC’s server: it lets the larger models load (free stops at small), and it removes the 200-minute monthly cap. Nothing else sits behind a license."],
  ["What stays free?", "Everything in the free list above. A license only lifts those two limits, for the track you bought."],
  ["Browser clients?", "Android Chrome and iPhone Safari always use the free tier, whichever license is installed. A license applies to the Android app (Phone Pro) or the native desktop app (Desktop Pro)."],
  ["Refunds?", <>7 days, no questions asked. Open a GitHub issue with your purchase date and amount, but leave your payment ID out of it. <a href={withBase("/refund-policy/")} className="text-accent underline decoration-rule underline-offset-[3px]">Full policy</a>.</>],
  ["Invoice?", "Razorpay emails you a payment receipt when you pay. We do not generate a separate GST invoice."],
  ["Multi-device?", "One license per buyer, for every PC you personally use. The key is not tied to a device, so nothing locks you out — we trust you."],
  ["Upgrade Phone → Bundle?", <>Pay the ₹500 difference. There is no automated upgrade yet, so <a href={ISSUES_URL} target="_blank" rel="noopener noreferrer" className="text-accent underline decoration-rule underline-offset-[3px]">open a GitHub issue</a> before you buy.</>],
  ["Updates?", "The key has no expiry date and no version limit, so it keeps unlocking on newer releases."],
  ["Does the license call home?", "No. Your PC checks the key’s signature offline. The only time anything reaches our server is when you buy."]
] as const;

export default function PricingPage() {
  return (
    <main>
      <section className="wrap flex flex-col items-center pb-14 pt-20 text-center">
        <h1 className="mx-auto max-w-[720px] text-[clamp(2.5rem,4.6vw,3.75rem)] font-bold leading-[1.04] tracking-[-0.03em]">
          Pay once. <span className="text-faint">Yours forever.</span>
        </h1>
        <p className="mx-auto mt-[18px] max-w-[520px] text-lg leading-relaxed text-muted">
          No subscription. The free tier has models up to small and 200 minutes a month; Pro lifts both for the
          track you buy.
        </p>
      </section>

      <section className="wrap pb-[72px]">
        <div className="grid items-start gap-5 md:grid-cols-3">
          {skus.map((sku) => (
            <article
              key={sku.id}
              className={`relative flex flex-col rounded-2xl bg-surface p-[30px] ${
                sku.recommended
                  ? "border-2 border-accent shadow-[0_24px_48px_-28px_rgba(21,128,61,0.25)]"
                  : "border border-rule"
              }`}
            >
              {sku.recommended ? (
                <span className="absolute -top-3 left-[30px] rounded-full bg-accent px-3 py-[3px] text-xs font-bold text-paper">
                  Recommended
                </span>
              ) : null}
              <p className={`text-[13.5px] font-semibold ${sku.recommended ? "text-accent" : "text-muted"}`}>
                {sku.eyebrow} <span lang="hi" className="deva text-faint">· {sku.deva}</span>
              </p>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-[40px] font-bold tracking-[-0.02em]">₹{sku.price.toLocaleString("en-IN")}</span>
                <span className="text-[13px] text-faint">{sku.priceNote}</span>
              </div>
              <p className="mt-3.5 text-[15px] leading-relaxed text-muted">{sku.tagline}</p>
              <ul className="mt-5 grid gap-2.5 text-sm text-muted">
                {sku.features.map((feature) => (
                  <li key={feature} className="flex gap-2.5">
                    <span className="font-bold text-accent">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              {SALES_OPEN ? (
                <a
                  href={sku.buyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-[26px] rounded-[10px] py-3 text-center text-[14.5px] font-semibold transition ${
                    sku.recommended
                      ? "bg-accent text-paper hover:bg-accent-hover"
                      : "border border-[color:var(--input-border)] text-ink hover:border-ink"
                  }`}
                >
                  {sku.ctaLabel}
                </a>
              ) : (
                <span
                  aria-disabled="true"
                  className="mt-[26px] cursor-default rounded-[10px] border border-dashed border-rule py-3 text-center text-[14.5px] font-semibold text-faint"
                >
                  Opening soon
                </span>
              )}
            </article>
          ))}
        </div>
        <p className="mt-6 text-center text-[13.5px] text-faint">
          {SALES_OPEN
            ? "UPI · card · netbanking via Razorpay. Razorpay emails you a payment receipt; the license key follows by email."
            : "Purchases open soon. The free tier works today — download it and start dictating."}
        </p>

        <div className="mx-auto mt-10 grid max-w-[820px] gap-3 rounded-2xl border border-rule bg-surface p-6 text-[14.5px] leading-relaxed text-muted">
          <p>
            <span className="font-semibold text-ink">Free includes:</span> dictation with the tiny, base and small
            models, 200 minutes a month (counted separately for the browser and the Android app), the trackpad,
            gyro pointer, screen mirror, the PC’s audio on the phone, the global hotkey, transcript history with
            search and export, custom vocabulary and accent calibration.
          </p>
          {PLAY_LISTING_LIVE ? null : (
            <p>
              <span className="font-semibold text-ink">Phone Pro and the Android app:</span> the app is not on
              Google Play yet, so today’s phone path is the browser client, which is always the free tier.
            </p>
          )}
          <p>
            <span className="font-semibold text-ink">Beta note:</span> the native desktop app runs its own engine
            today and does not apply the free-tier limits itself; the PC server applies them to phone and browser
            clients. Until that changes, Desktop Pro has nothing to lift inside the desktop app.
          </p>
        </div>
      </section>

      <section className="border-t border-rule bg-surface">
        <div className="wrap py-16">
          <h2 className="mb-8 text-[28px] font-bold tracking-[-0.02em]">Fine print, plainly.</h2>
          <div className="grid gap-x-12 gap-y-3 md:grid-cols-2">
            {finePrint.map(([question, answer]) => (
              <div key={question} className="border-t border-rule py-4">
                <p className="text-[15.5px] font-semibold">{question}</p>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
