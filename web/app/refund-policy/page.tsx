import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Sanketra refund and cancellation policy."
};

const sections = [
  {
    h: "After the 7-day window",
    p: (
      <>
        Refunds are then issued only for: <span className="font-semibold text-ink">technical defects we can&rsquo;t fix within 14 days</span>{" "}
        (e.g. a license that fails to verify on your OS, reproducible bugs in paid features),{" "}
        <span className="font-semibold text-ink">permanent discontinuation</span> (active licenses get a
        pro-rated refund), or <span className="font-semibold text-ink">duplicate payments</span> (returned
        immediately).
      </>
    )
  },
  {
    h: "Not refundable",
    p: "Shared, resold, or leaked license keys; attempts to bypass or reverse-engineer license verification; change of mind after the window — that's exactly what the 7 days are for."
  }
] as const;

export default function RefundPolicyPage() {
  return (
    <main className="narrow py-20">
      <p className="masthead mb-3">Refund Policy · last updated 28 April 2026</p>
      <h1 className="text-[clamp(2.25rem,4.2vw,3.25rem)] font-bold leading-[1.06] tracking-[-0.03em]">
        Fair, fast, no fine print.
      </h1>

      <div className="callout mt-8 p-7">
        <p className="text-[16.5px] leading-relaxed text-ink">
          <span className="font-bold">The short version:</span> first purchase, 7 days, full refund, no questions.
          Email{" "}
          <a href="mailto:hello@misc42.com" className="font-semibold text-accent">
            hello@misc42.com
          </a>{" "}
          with your Razorpay payment ID (<span className="font-mono text-sm">pay_XXXXX</span> on the receipt).
          Money lands back in 5–7 working days.
        </p>
      </div>

      <div className="mt-9 grid gap-7">
        {sections.map((section) => (
          <div key={section.h} className="border-t border-rule pt-5">
            <h2 className="text-[19px] font-bold tracking-[-0.01em]">{section.h}</h2>
            <p className="mt-2 text-base leading-[1.7] text-[#3C3C42]">{section.p}</p>
          </div>
        ))}

        <div className="border-t border-rule pt-5">
          <h2 className="text-[19px] font-bold tracking-[-0.01em]">How to request</h2>
          <ol className="mt-2.5 grid gap-2.5 text-base leading-relaxed text-[#3C3C42]">
            <li className="flex gap-3">
              <span className="font-bold text-accent">1</span>Email with subject{" "}
              <span className="font-mono text-sm">Refund Request — [payment ID]</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-accent">2</span>Include payment ID, purchase date, amount, reason
              (optional)
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-accent">3</span>Reply within 24–48 h; refund initiated within 3
              working days
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-accent">4</span>Razorpay returns it to your original payment method
              in 5–7 working days
            </li>
          </ol>
        </div>

        <div className="border-t border-rule pt-5">
          <h2 className="text-[19px] font-bold tracking-[-0.01em]">Good to know</h2>
          <p className="mt-2 text-base leading-[1.7] text-[#3C3C42]">
            Once a refund is initiated the license moves to the denylist — paid features stop unlocking
            immediately. Bank statements identify the merchant as Misc42 Labs (sole proprietorship, India).
          </p>
        </div>
      </div>
    </main>
  );
}
