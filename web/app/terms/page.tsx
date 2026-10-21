import type { Metadata } from "next";
import { LangToggle } from "@/components/LangToggle";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Sanketra terms of use: lifetime licenses, what a paid license unlocks, refunds and liability."
};

// Licenses are lifetime: the issuer mints expires_at = 0 for every SKU
// (license/issuer.py _TRACK_DURATION_SECONDS) and the verifier treats 0 as
// perpetual (src/license_core.py _check_expiry). A paid license lifts exactly two
// free-tier limits, models above small and the 200-minute monthly cap
// (src/server_async.py FREE_TIER_MODELS / FREE_TIER_MONTHLY_MINUTES). There is
// no revocation promise here: the verifier reads a denylist file bundled with
// the install, nothing updates it, and the issuer ignores refund events.
// The key is pasted under Settings -> License (desktop app or history dashboard) or
// with `sanketra-server --install-license`; the pricing page says where. The two
// limits are built in but switched off until purchases open
// (src/license_core.py FREE_TIER_ENFORCED = False), so section 1 says so.
// TODO(contact): GitHub issues are public; replace with a private mailbox when
// one works.

const EN = [
  { h: "1. The service", p: "Sanketra is a Hindi-first voice-to-text input layer that runs on your PC. It is free for basic use. Paid SKUs (Phone Pro, Desktop Pro, Bundle) lift two limits of the free tier for the track you buy: they let the larger Whisper models load (medium, large-v3-turbo, distil-large-v3, large-v3) and they remove the 200-minute monthly cap. Those limits are built in but switched off until purchases open. Everything else is free for everyone." },
  { h: "2. License", p: "Purchasing a paid SKU gets you a signed license key, delivered by email. It is a lifetime license: the key carries no expiry date. It is tied to your purchase email, your own Sanketra server checks it offline, and it is not bound to a single device. Use it on your own devices for personal use; do not publicly share or resell the key." },
  { h: "3. Acceptable use", p: "Use Sanketra for lawful purposes — content creation, accessibility, productivity, education. Do not share, resell, or illegally redistribute license keys. Reverse-engineering, bypassing license verification, or any malicious use breaches these terms and is not eligible for a refund." },
  { h: "4. Refund & cancellation", p: "See the refund policy page for the full version. In short: first-time purchases qualify for a no-questions refund within 7 days; after that, only confirmed technical defects we cannot fix qualify." },
  { h: "5. Privacy", p: "The app and this website collect no user data, and your audio never leaves your Wi-Fi. When you buy, Razorpay processes the payment under its own privacy notice, and our license issuer receives your email, payment ID and plan to mint and email your key. The privacy page has the details." },
  { h: "6. Liability", p: "Sanketra is provided as-is. We do not guarantee 100% transcription accuracy across every hardware combination — speech recognition has inherent limits. For any indirect, consequential, or incidental loss, our maximum liability is limited to the amount you paid in the preceding 12 months." },
  { h: "7. Governing law", p: "These terms are governed by the laws of India. Any disputes will be resolved in Indian courts." },
  { h: "8. Changes", p: "We may update these terms occasionally. Material changes will be announced to license owners by email and noticed on the changelog page. Continued use after a change implies acceptance." },
  { h: "9. Contact", p: "Sanketra is a Misc42 Labs product, operated as a sole proprietorship in India. Questions? Open an issue at github.com/Misc42/sanketra/issues." }
] as const;

const HI = [
  { h: "1. क्या service है", p: "Sanketra एक Hindi-first voice-to-text input layer है जो आपके PC पर चलती है। यह free है (basic use)। Paid SKUs (Phone Pro, Desktop Pro, Bundle) आपके खरीदे हुए track के लिए free tier की दो limits हटाते हैं: बड़े Whisper models (medium, large-v3-turbo, distil-large-v3, large-v3) load होने देते हैं और 200-minute monthly cap हटा देते हैं। ये limits software में हैं, पर purchases खुलने तक बंद हैं। बाकी सब कुछ सबके लिए free है।" },
  { h: "2. License", p: "Paid SKU खरीदने पर आपको एक signed license key मिलती है (email से)। यह lifetime license है: key पर कोई expiry date नहीं होती। यह आपके purchase email से जुड़ी होती है, आपका अपना Sanketra server इसे offline check करता है, और यह किसी एक device से bound नहीं है। अपने personal devices पर इस्तेमाल करें; key को publicly share / resell न करें।" },
  { h: "3. Acceptable use", p: "Sanketra को कानूनी कामों के लिए use करें — content creation, accessibility, productivity, education। License key को share / re-sell / illegally distribute नहीं करना। Reverse-engineer करना, license verification को bypass करना, या malicious purposes के लिए use करना terms का उल्लंघन है और उस पर refund नहीं मिलेगा।" },
  { h: "4. Refund & cancellation", p: "Detailed terms refund policy page पर हैं। Short version: पहली purchase पर 7-day no-questions refund। उसके बाद केवल technical defect (हम fix नहीं कर पा रहे) पर refund।" },
  { h: "5. Privacy", p: "App और यह website कोई user data collect नहीं करते, और आपकी audio आपके Wi-Fi से बाहर नहीं जाती। खरीदारी पर Razorpay payment को अपनी privacy policy के तहत process करता है, और हमारा license issuer key बनाने और email करने के लिए आपका email, payment ID और plan receive करता है। Details privacy page पर हैं।" },
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
      <p className="masthead mb-3">Terms of Service · last updated 21 October 2026</p>
      <h1 className="text-[clamp(2.25rem,4.2vw,3.25rem)] font-bold leading-[1.06] tracking-[-0.03em]">
        Plain language. No traps.
      </h1>

      <LangToggle en={<Sections items={EN} />} hi={<Sections items={HI} />} />
    </main>
  );
}
