import type { Metadata } from "next";
import { LangToggle } from "@/components/LangToggle";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Sanketra terms and conditions of use."
};

const EN = [
  { h: "1. The service", p: "Sanketra is a Hindi-first voice-to-text input layer that runs on your PC. It is free for basic use. Paid SKUs (Phone Pro, Desktop Pro, Bundle) unlock advanced features such as the large Whisper model, accent calibration, and extended local history." },
  { h: "2. License", p: "Purchasing a paid SKU gets you a signed license key (delivered by email) which you paste into your local Sanketra installation. The license is tied to your purchase email and is valid until its expiry (typically one year per purchase). Install it on your own devices for personal use; do not publicly share or resell the key." },
  { h: "3. Acceptable use", p: "Use Sanketra for lawful purposes — content creation, accessibility, productivity, education. Do not share, resell, or illegally redistribute license keys. Reverse-engineering, bypassing license verification, or any malicious use will result in the license being revoked (added to the denylist) without refund." },
  { h: "4. Refund & cancellation", p: "See the refund policy page for the full version. In short: first-time purchases qualify for a no-questions refund within 7 days; after that, only confirmed technical defects we cannot fix qualify." },
  { h: "5. Privacy", p: "We collect no user data — see the privacy page. Razorpay processes payment-rail data when you buy; their own privacy notice applies to that portion of the flow." },
  { h: "6. Liability", p: "Sanketra is provided as-is. We do not guarantee 100% transcription accuracy across every hardware combination — speech recognition has inherent limits. For any indirect, consequential, or incidental loss, our maximum liability is limited to the amount you paid in the preceding 12 months." },
  { h: "7. Governing law", p: "These terms are governed by the laws of India. Any disputes will be resolved in Indian courts." },
  { h: "8. Changes", p: "We may update these terms occasionally. Material changes will be announced to license owners by email and noticed on the changelog page. Continued use after a change implies acceptance." },
  { h: "9. Contact", p: "Sanketra is a Misc42 Labs product, operated as a sole proprietorship in India. Questions? Open an issue at github.com/Misc42/sanketra/issues." }
] as const;

const HI = [
  { h: "1. क्या service है", p: "Sanketra एक Hindi-first voice-to-text input layer है जो आपके PC पर चलती है। यह free है (basic use)। Paid SKUs (Phone Pro, Desktop Pro, Bundle) advanced features unlock करते हैं — जैसे large Whisper model, accent calibration, और extended local history।" },
  { h: "2. License", p: "Paid SKU खरीदने पर आपको एक signed license key मिलती है (email से)। यह key आप अपने PC पर paste करते हैं — license आपके purchase email से जुड़ी होती है, अपनी expiry तक valid रहती है (typically 1 साल per purchase)। अपने personal devices पर install करें; key को publicly share / resell न करें।" },
  { h: "3. Acceptable use", p: "Sanketra को कानूनी कामों के लिए use करें — content creation, accessibility, productivity, education। License key को share / re-sell / illegally distribute नहीं करना। Reverse-engineer करना, license verification को bypass करना, या malicious purposes के लिए use करना prohibited है — ऐसा होने पर license revoke हो जाएगी (denylist में add) बिना refund के।" },
  { h: "4. Refund & cancellation", p: "Detailed terms refund policy page पर हैं। Short version: पहली purchase पर 7-day no-questions refund। उसके बाद केवल technical defect (हम fix नहीं कर पा रहे) पर refund।" },
  { h: "5. Privacy", p: "हम कोई user data collect नहीं करते। Detailed stance privacy page पर है। Razorpay payment process करते समय कुछ payment-rail data देख सकता है — Razorpay की अपनी privacy policy applicable है उस हिस्से पर।" },
  { h: "6. Liability", p: "Sanketra “as-is” provide की जाती है। हम guarantee नहीं देते कि यह हर hardware combination पर 100% accurate transcription करेगी — speech recognition की inherent limits हैं। किसी भी indirect / consequential / incidental loss के लिए हमारी maximum liability उस specific user ने जो amount paid किया है उसी तक limited है (last 12 months में)।" },
  { h: "7. Governing law", p: "ये terms India के laws के under govern होते हैं। कोई dispute हो तो jurisdiction Indian courts ही होगी।" },
  { h: "8. Changes", p: "हम इन terms को कभी-कभी update कर सकते हैं — material changes हों तो आपको email पर inform करेंगे (license owners), और changelog page पर notice रहेगा। Continued use = acceptance।" },
  { h: "9. Contact", p: "Sanketra एक Misc42 Labs product है, operated as a sole proprietorship in India। सवाल? github.com/Misc42/sanketra/issues पर issue खोलें।" }
] as const;

function Sections({ items }: { items: readonly { h: string; p: string }[] }) {
  return (
    <div className="mt-9 grid gap-7">
      {items.map((section) => (
        <div key={section.h} className="border-t border-rule pt-5">
          <h2 className="text-[19px] font-bold tracking-[-0.01em] text-ink">{section.h}</h2>
          <p className="mt-2 text-base leading-[1.7] text-[#3C3C42]">{section.p}</p>
        </div>
      ))}
    </div>
  );
}

export default function TermsPage() {
  return (
    <main className="narrow py-20">
      <p className="masthead mb-3">Terms of Service · last updated 28 April 2026</p>
      <h1 className="text-[clamp(2.25rem,4.2vw,3.25rem)] font-bold leading-[1.06] tracking-[-0.03em]">
        Plain language. No traps.
      </h1>

      <LangToggle en={<Sections items={EN} />} hi={<Sections items={HI} />} />
    </main>
  );
}
