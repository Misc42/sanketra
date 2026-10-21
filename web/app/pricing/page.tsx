import type { Metadata } from "next";
import { withBase } from "@/lib/basePath";
import { ISSUES_URL, PLAY_LISTING_LIVE } from "@/lib/facts";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Lifetime licenses for Sanketra: Phone Pro ₹999, Desktop Pro ₹999 or the Bundle ₹1,499. Pay once. Purchases are not open yet and nothing is capped today; when they open, the free tier is models up to small and 200 minutes a month, and Pro lifts both for its track."
};

// What a license changes, and nothing else: FREE_TIER_MODELS = {tiny, base, small}
// and FREE_TIER_MONTHLY_MINUTES = 200 (src/license_core.py:107-108; one counter
// per client kind, resets each UTC month), and the gates that read them: the
// server's /api/model/load -> 403 model_requires_pro and the audio WebSocket ->
// close 4402 (src/server_async.py), and the desktop app's own in-process gate
// (desktop/sanketra_engine.py, desktop_gate_active), because the desktop app
// transcribes without going through the server. History, vocabulary, accent
// calibration, trackpad, gyro, screen mirror, PC audio and the hotkey have no
// license check anywhere, so they are free for everyone. Keep this list in step
// with that code, not with MONETIZATION.md.
//
// ONE switch turns every one of those gates on: FREE_TIER_ENFORCED in
// src/license_core.py:103. It is False while checkout is closed, and the comment
// there says to flip it in the same release that flips SALES_OPEN below. The
// copy on this page therefore reads SALES_OPEN: limits "built in, switched off"
// while it is false, "applied" once it is true.
//
// Where a buyer pastes the key: the desktop app's Settings -> License
// (desktop/sanketra_desktop.py _build_license_section), the history dashboard's
// Settings tab -> License (static/dashboard.html #license-block), or
// `sanketra-server --install-license <key>` (src/server_async.py
// _cli_install_license). The key email says the same (license/issuer.py).
//
// TODO(contact): no private support mailbox exists; refunds, upgrades and
// license questions point at public GitHub issues. Replace when one does.

// Checkout stays closed until the license issuer is deployed and one test
// purchase has minted a key that a real install accepted. The payment links
// below are live-mode: with no issuer, a buyer is charged and gets nothing.
const SALES_OPEN = false;

// Phone Pro and the Bundle sell the Android app's Pro features, and that app
// cannot be installed until the Play listing is live (PLAY_LISTING_LIVE in
// lib/facts.ts), so their buy buttons need BOTH flags. Desktop Pro needs only
// SALES_OPEN: the desktop installers are published.
function canBuy(id: Sku["id"]): boolean {
  return id === "desktop" ? SALES_OPEN : SALES_OPEN && PLAY_LISTING_LIVE;
}

// What the disabled button says. A missing Android app is the stronger reason, so
// it wins over "purchases not open" on the cards that depend on it.
function closedLabel(id: Sku["id"]): string {
  return id !== "desktop" && !PLAY_LISTING_LIVE ? "Android app coming soon" : "Opening soon";
}

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

const code = "rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[13px] text-ink";

const finePrint = [
  ["What does Pro change?", "Two limits, once they are switched on: it lets the larger models load (free stops at small), and it removes the 200-minute monthly cap. Your PC’s server applies them to phone and browser clients; the desktop app applies the same rules itself, because it transcribes on its own. Nothing else sits behind a license."],
  ["Are the limits on today?", SALES_OPEN
    ? "Yes. A free install stops at the small model and 200 minutes a month per client kind, until you add a license for that track."
    : "No. They are built into the PC server and the desktop app but switched off until purchases open, so today no model is locked and no minutes are capped. They switch on together, in the release that opens purchases."],
  ["Where does the key go?", <>Paste it under <span className="font-semibold text-ink">Settings → License</span> in the desktop app, or under Settings → License in the history dashboard. On a PC with no screen, run <code className={code}>sanketra-server --install-license &lt;key&gt;</code>.</>],
  ["What stays free?", "Everything in the always-free list above. A license only lifts those two limits, for the track you bought."],
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
          {SALES_OPEN
            ? "No subscription. The free tier has models up to small and 200 minutes a month; Pro lifts both for the track you buy."
            : "No subscription. Purchases are not open yet and nothing is capped today. When they open, the free tier is models up to small and 200 minutes a month, and Pro lifts both for the track you buy."}
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
              {canBuy(sku.id) ? (
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
                  {closedLabel(sku.id)}
                </span>
              )}
            </article>
          ))}
        </div>
        <p className="mt-6 text-center text-[13.5px] text-faint">
          {!SALES_OPEN
            ? "Purchases open soon. Sanketra works today — download it and start dictating."
            : PLAY_LISTING_LIVE
              ? "UPI · card · netbanking via Razorpay. Razorpay emails you a payment receipt; the license key follows by email."
              : "Desktop Pro is on sale: UPI · card · netbanking via Razorpay, receipt and license key by email. Phone Pro and the Bundle open when the Android app is on Google Play."}
        </p>

        <div className="mx-auto mt-10 grid max-w-[820px] gap-3 rounded-2xl border border-rule bg-surface p-6 text-[14.5px] leading-relaxed text-muted">
          {SALES_OPEN ? (
            <p>
              <span className="font-semibold text-ink">Free includes:</span> dictation with the tiny, base and small
              models and 200 minutes a month, counted separately for the browser, the Android app and the desktop
              app.
            </p>
          ) : (
            <p>
              <span className="font-semibold text-ink">Free today:</span> everything, uncapped. The limits are
              built into the PC server and the desktop app but switched off until purchases open, and they switch
              on together. Once they are on, the free tier is dictation with the tiny, base and small models and
              200 minutes a month, counted separately for the browser, the Android app and the desktop app.
            </p>
          )}
          <p>
            <span className="font-semibold text-ink">Always free, with or without a license:</span> the trackpad,
            gyro pointer, screen mirror, the PC’s audio on the phone, the global hotkey, transcript history with
            search and export, custom vocabulary and accent calibration.
          </p>
          {PLAY_LISTING_LIVE ? null : (
            <p>
              <span className="font-semibold text-ink">Phone Pro and the Android app:</span> the app is not on
              Google Play yet, so today’s phone path is the browser client, which is always the free tier. Phone Pro
              and the Bundle go on sale once the app is installable.
            </p>
          )}
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
