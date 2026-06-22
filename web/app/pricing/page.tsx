import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Lifetime licenses for Sanketra. Phone Pro ₹999, Desktop Pro ₹999, or the Bundle ₹1,499. Pay once, yours forever."
};

type Sku = {
  id: "phone" | "desktop" | "bundle";
  badge: string | null;
  eyebrow: string;
  deva: string;
  title: string;
  tagline: string;
  price: number;
  priceNote: string;
  features: readonly string[];
  buyUrl: string;
  ctaLabel: string;
};

const skus: readonly Sku[] = [
  {
    id: "phone",
    badge: null,
    eyebrow: "Phone Pro",
    deva: "फ़ोन प्रो",
    title: "Phone as mic, trackpad, gyro.",
    tagline: "From your couch.",
    price: 999,
    priceNote: "One-time. Lifetime.",
    features: [
      "Dictation from any room — phone-as-mic beats laptop mics in noisy spaces",
      "Air-trackpad, gyro pointer, screen-mirror for couch / kitchen / treadmill use",
      "Higher-accuracy recognition tiers unlocked (the top of the Quality slider)",
      "Custom vocabulary + accent calibration",
      "Free Android app stays free — Pro unlocks server-side features"
    ],
    buyUrl: "https://rzp.io/rzp/6UkS3s2N",
    ctaLabel: "Buy Phone Pro · ₹999"
  },
  {
    id: "bundle",
    badge: "Recommended",
    eyebrow: "Bundle",
    deva: "बंडल",
    title: "Phone Pro + Desktop Pro, one price.",
    tagline: "Couch and desk. Sanketra everywhere.",
    price: 1499,
    priceNote: "Save ₹499 vs buying separately.",
    features: [
      "Everything in Phone Pro",
      "Everything in Desktop Pro",
      "One license file works for both tracks",
      "Future SKUs that join either track auto-unlock at no extra cost",
      "Recommended for users who already have Sanketra on phone and desk"
    ],
    buyUrl: "https://rzp.io/rzp/6r3tm3x",
    ctaLabel: "Buy Bundle · ₹1,499"
  },
  {
    id: "desktop",
    badge: null,
    eyebrow: "Desktop Pro",
    deva: "डेस्कटॉप प्रो",
    title: "Global hotkey. Transcript history. At your desk.",
    tagline: "At your desk.",
    price: 999,
    priceNote: "One-time. Lifetime.",
    features: [
      "Native menubar app — macOS, Windows, Linux",
      "Ctrl + Alt global hotkey from any focused app (Ctrl + Option on Mac, customizable)",
      "Transcript history with search, export, vocab inline-edit",
      "Top-quality recognition tier unlocked (the top of the Quality slider)",
      "Free tier stays free — Pro unlocks long sessions + the highest-accuracy tier"
    ],
    buyUrl: "https://rzp.io/rzp/QazIhoT",
    ctaLabel: "Buy Desktop Pro · ₹999"
  }
] as const;

const trustPoints = [
  {
    label: "Offline-first",
    body: "License verification runs on your PC. No call-home, no servers checking up on you, no DRM that breaks when our infra dies."
  },
  {
    label: "Indian rupee, Razorpay",
    body: "Pay via UPI / card / netbanking / wallet. GST invoice on email. No foreign currency, no FX surprises."
  },
  {
    label: "Instant license email",
    body: "Webhook mints an Ed25519-signed license file and emails it within seconds of payment capture. Drop it in the server, done."
  }
];

export default function PricingPage() {
  return (
    <main className="wrap py-16">
      <p className="masthead mb-4">Pricing</p>
      <h1 className="section-title max-w-4xl">
        Lifetime license, <span className="deva text-saffron">एक baar paid — hamesha tumhara.</span>
      </h1>
      <p className="mt-6 max-w-3xl text-lg text-muted">
        Three SKUs, no subscription, no usage cap. Free tier stays free forever — Pro unlocks higher-accuracy
        recognition, vocabulary, history, and the conveniences worth paying for.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {skus.map((sku) => {
          const isHero = sku.badge !== null;
          return (
            <section
              key={sku.id}
              className={`card flex flex-col p-7 ${isHero ? "ring-1 ring-saffron/40" : ""}`}
            >
              <div className="flex items-baseline justify-between">
                <p className="masthead">{sku.eyebrow}</p>
                {sku.badge ? (
                  <span className="rounded-sm border border-saffron/50 px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-saffron">
                    {sku.badge}
                  </span>
                ) : null}
              </div>
              <p className="deva mt-2 text-xl text-muted">{sku.deva}</p>
              <h2 className="mt-3 text-2xl font-semibold leading-tight text-ink">{sku.title}</h2>
              <p className="mt-2 serif-italic text-muted">{sku.tagline}</p>

              <div className="mt-8 flex items-baseline gap-2">
                <span className="font-mono text-4xl font-semibold text-saffron">
                  ₹{sku.price.toLocaleString("en-IN")}
                </span>
              </div>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-faint">{sku.priceNote}</p>

              <ul className="mt-6 grid gap-3 text-sm text-muted">
                {sku.features.map((feature) => (
                  <li key={feature} className="border-l border-rule pl-3">
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href={sku.buyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-8 inline-flex items-center justify-center rounded-sm px-5 py-3 font-mono text-[0.78rem] uppercase tracking-[0.14em] transition ${
                  isHero
                    ? "bg-saffron text-paper hover:bg-saffron/90"
                    : "border border-rule text-ink hover:border-saffron hover:text-saffron"
                }`}
              >
                {sku.ctaLabel}
              </a>
            </section>
          );
        })}
      </div>

      <section className="mt-20 rule-top pt-12">
        <p className="masthead mb-4">Fine print, plainly</p>
        <div className="grid gap-8 md:grid-cols-3">
          {trustPoints.map((point) => (
            <div key={point.label}>
              <h3 className="text-lg font-semibold text-ink">{point.label}</h3>
              <p className="mt-2 text-sm text-muted">{point.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 rule-top pt-12">
        <p className="masthead mb-4">FAQ</p>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold text-ink">Refunds?</h3>
            <p className="mt-2 text-sm text-muted">
              7-day no-questions-asked refund. Email <span className="font-mono text-saffron">refunds@sanketra.app</span> with
              your payment ID. See the{" "}
              <a href="/refund-policy/" className="text-saffron underline decoration-rule">
                refund policy
              </a>{" "}
              for the longer version.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-ink">Multi-device?</h3>
            <p className="mt-2 text-sm text-muted">
              One license file per buyer. Use it on every PC you personally run Sanketra on. Sharing with other
              people is not licensed — but we trust you, no DRM lockouts.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-ink">Upgrade Phone → Bundle?</h3>
            <p className="mt-2 text-sm text-muted">
              Yes, pay the difference. Email <span className="font-mono text-saffron">support@sanketra.app</span> with your
              existing payment ID; we send a one-time razorpay.me link for the ₹500 delta.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-ink">Updates?</h3>
            <p className="mt-2 text-sm text-muted">
              All v1.x and v2.x updates included — same SKU, same license, new features. Major version bumps
              (v3 someday, far away) get their own pricing decision.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
