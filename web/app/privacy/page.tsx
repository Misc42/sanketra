import type { Metadata } from "next";
import { LangToggle } from "@/components/LangToggle";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Sanketra privacy and DPDP statement."
};

export default function PrivacyPage() {
  return (
    <main className="narrow py-20">
      <p className="masthead mb-3">Privacy / DPDP</p>
      <h1 className="text-[clamp(2.25rem,4.2vw,3.25rem)] font-bold leading-[1.06] tracking-[-0.03em]">
        Zero data. Local by design.
      </h1>

      <LangToggle
        en={
          <div className="mt-9 grid gap-5 text-[16.5px] leading-[1.7] text-[#3C3C42]">
            <h2 className="text-[22px] font-bold tracking-[-0.015em] text-ink">We collect ZERO user data.</h2>
            <p>
              Sanketra runs entirely on your PC and your phone, on your local Wi-Fi network. We have no servers.
              Your voice never leaves your Wi-Fi. We do not receive, store, sell, rent, or analyze your audio,
              transcripts, device identifiers, pairing codes, or usage patterns.
            </p>
            <p>
              There are no analytics scripts, tracking pixels, third-party session recorders, accounts, cloud
              speech-to-text calls, or advertising identifiers on this website or in the product. Payment providers
              may process payment details only when you choose to buy a paid plan.
            </p>
          </div>
        }
        hi={
          <div className="mt-9 grid gap-5 text-[17px] leading-[1.8] text-[#3C3C42]">
            <h2 className="text-2xl font-bold text-ink">हम कोई डेटा collect नहीं करते।</h2>
            <p>
              Sanketra पूरी तरह आपके PC और phone पर, आपके local Wi-Fi network पर चलता है। आपकी आवाज़, transcripts,
              pairing code, server address, और settings हमारे पास नहीं आते। हमारे पास कोई server नहीं है जो user
              data receive करे।
            </p>
            <p>
              DPDP के हिसाब से हमारा stance simple है: हम personal data process नहीं करते, इसलिए बेचने, share
              करने, profile बनाने, ads चलाने, या analytics track करने का सवाल ही नहीं आता। अगर आप local transcript
              history enable करते हैं, वह आपके PC पर रहती है और आप उसे delete/export कर सकते हैं।
            </p>
          </div>
        }
      />

      <p className="mt-11 border-t border-rule pt-5 text-[13.5px] text-faint">
        A Misc42 Labs product · sole proprietorship, India ·{" "}
        <a
          href="https://github.com/Misc42/sanketra/issues/new"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent"
        >
          contact us on GitHub
        </a>
      </p>
    </main>
  );
}
