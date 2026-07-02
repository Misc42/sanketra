import type { Metadata } from "next";
import { withBase } from "@/lib/basePath";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Lifetime licenses for Sanketra. Phone Pro ₹999, Desktop Pro ₹999, or the Bundle ₹1,499. Pay once, yours forever."
};

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
    tagline: "From your couch — phone as mic, trackpad, gyro pointer.",
    features: [
      "Dictation from any room",
      "Air-trackpad · gyro · screen mirror",
      "Top accuracy tier unlocked",
      "Custom vocabulary + accent calibration"
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
    tagline: "Phone Pro + Desktop Pro. Couch and desk, one license file.",
    features: [
      "Everything in Phone Pro",
      "Everything in Desktop Pro",
      "One license, both tracks",
      "Future track SKUs auto-unlock"
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
    tagline: "At your desk — global hotkey, native app, transcript history.",
    features: [
      "macOS · Windows · Linux",
      "Ctrl + Alt in any app",
      "History with search + export",
      "Top accuracy tier unlocked"
    ],
    buyUrl: "https://rzp.io/rzp/QazIhoT",
    ctaLabel: "Buy Desktop Pro"
  }
] as const;

const finePrint = [
  ["Refunds?", <>7 days, no questions asked. Email your payment ID. <a href={withBase("/refund-policy/")} className="text-accent underline decoration-rule underline-offset-[3px]">Full policy</a>.</>],
  ["Multi-device?", "One license per buyer, every PC you personally use. No DRM lockouts — we trust you."],
  ["Upgrade Phone → Bundle?", "Pay the ₹500 difference — email support with your payment ID."],
  ["Updates?", "All v1.x and v2.x updates included — same license, new features."],
  ["Does the license call home?", "No. Verification runs on your PC — no servers checking up on you."],
  ["What stays free?", "Core dictation, forever. Pro adds accuracy tiers, history, vocabulary."]
] as const;

export default function PricingPage() {
  return (
    <main>
      <section className="wrap flex flex-col items-center pb-14 pt-20 text-center">
        <h1 className="mx-auto max-w-[720px] text-[clamp(2.5rem,4.6vw,3.75rem)] font-bold leading-[1.04] tracking-[-0.03em]">
          Pay once. <span className="text-faint">Yours forever.</span>
        </h1>
        <p className="mx-auto mt-[18px] max-w-[520px] text-lg leading-relaxed text-muted">
          No subscription, no usage cap. The free tier stays free — Pro unlocks the conveniences worth paying for.
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
            </article>
          ))}
        </div>
        <p className="mt-6 text-center text-[13.5px] text-faint">
          UPI · card · netbanking via Razorpay — GST invoice by email, license file within seconds.
        </p>
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
