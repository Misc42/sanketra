import type { Metadata } from "next";
import { ISSUES_URL } from "@/lib/facts";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Sanketra refund policy: 7 days, full refund, no questions, on a first purchase of a lifetime license."
};

// TODO(contact): there is no private support mailbox (support@sanketra.app does
// not resolve) and the claim that replying to the Razorpay receipt reaches us
// could not be verified, so requests go through a public GitHub issue and the
// payment ID is NOT to be posted there. Replace with a private address when one
// works.
// No denylist or revocation promise on this page: the issuer ignores refund
// events (license/issuer.py: only payment.captured is acted on) and the
// verifier's denylist is a file bundled with the install that nothing updates.

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
      <p className="masthead mb-3">Refund Policy · last updated 21 October 2026</p>
      <h1 className="text-[clamp(2.25rem,4.2vw,3.25rem)] font-bold leading-[1.06] tracking-[-0.03em]">
        Fair, fast, no fine print.
      </h1>

      <div className="callout mt-8 p-7">
        <p className="text-[16.5px] leading-relaxed text-ink">
          <span className="font-bold">The short version:</span> first purchase, 7 days, full refund, no questions.
          Open an issue titled &ldquo;Refund request&rdquo; at{" "}
          <a href={ISSUES_URL} target="_blank" rel="noopener noreferrer" className="text-accent underline decoration-rule underline-offset-[3px]">
            github.com/Misc42/sanketra/issues
          </a>{" "}
          with your purchase date and amount. Issues are public, so do <em>not</em> post your payment ID or email;
          we will reply there with how to send them privately. Your payment ID (
          <span className="font-mono text-sm">pay_XXXXX</span>) is on the Razorpay receipt emailed to you at
          checkout. Money lands back in 5&ndash;7 working days.
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
              <span className="font-bold text-accent">1</span>Open a GitHub issue titled{" "}
              <span className="font-mono text-sm">Refund request</span>, without your payment ID or email
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-accent">2</span>Include the purchase date, the amount and, if you
              like, the reason; we reply on the issue with how to send the payment ID privately
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
            A license key is checked on your own PC, offline, and nothing on our side switches it off when a
            refund is paid, so please uninstall a key once it is refunded. Bank statements identify the
            merchant as Misc42 Labs (sole proprietorship, India).
          </p>
        </div>
      </div>
    </main>
  );
}
