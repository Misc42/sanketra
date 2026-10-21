import type { Metadata } from "next";
import { LangToggle } from "@/components/LangToggle";
import { ISSUES_URL } from "@/lib/facts";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Sanketra privacy and DPDP statement: the app and this website collect no user data; what the license issuer keeps when you buy."
};

// The Purchases section is written from license/issuer.py and
// docs/RAZORPAY_DEPLOY.md in the source repo, not from intent:
//   * the webhook reads the payment entity's id, email, order_id and notes (the
//     plan comes from notes.sku), nothing else (issuer.py razorpay_webhook);
//   * the SQLite tables `issued` and `licenses_by_payment` hold payment_id,
//     event_id, license_id, license_blob (the signed key, which embeds the email),
//     track, email and issued_at (issuer.py _open_db);
//   * issuance is logged with email and payment_id (issuer.py, "issued license_id=...");
//   * the key is sent with smtplib through whatever SMTP_HOST is configured;
//   * nothing in the code deletes or expires rows;
//   * verification on the PC is offline (src/license_core.py).
//
// TODO(founder): the issuer is not deployed yet, so the host and the mail
// provider are not chosen. RAZORPAY_DEPLOY.md recommends Render and its example
// SMTP_HOST is smtp.zoho.com, but neither is a decision. Name both here, as
// sub-processors, the day they are.
// TODO(contact): no private mailbox exists (support@sanketra.app does not
// resolve), so deletion requests go through public GitHub issues for now.
// Replace with a private address when one works.

const linkClass = "text-accent underline decoration-rule underline-offset-[3px]";

export default function PrivacyPage() {
  return (
    <main className="narrow py-20">
      <p className="masthead mb-3">Privacy / DPDP</p>
      <h1 className="text-[clamp(2.25rem,4.2vw,3.25rem)] font-bold leading-[1.06] tracking-[-0.03em]">
        Your voice stays local.
      </h1>

      <LangToggle
        en={
          <div className="mt-9 grid gap-5 text-[16.5px] leading-[1.7] text-[#3C3C42]">
            <h2 className="text-[22px] font-bold tracking-[-0.015em] text-ink">
              The app and this website collect zero user data.
            </h2>
            <p>
              Sanketra runs on your PC and your phone, over your local Wi-Fi network, and speech-to-text happens on
              your PC. Your voice never leaves your Wi-Fi. We do not receive, store, sell, rent, or analyze your
              audio, transcripts, device identifiers, pairing codes, or usage patterns.
            </p>
            <p>
              There are no analytics scripts, tracking pixels, third-party session recorders, accounts, cloud
              speech-to-text calls, or advertising identifiers on this website or in the product.
            </p>

            <h2 className="mt-4 text-[22px] font-bold tracking-[-0.015em] text-ink">Purchases</h2>
            <p>
              Paid licenses are not on sale yet. This is how the license issuer works, so you know before it
              opens: buying is the one place where data reaches a server of ours.
            </p>
            <ul className="grid list-disc gap-2.5 pl-6">
              <li>
                <span className="font-semibold text-ink">Payment goes to Razorpay.</span> Your card, UPI or
                netbanking details are collected and processed by Razorpay only; they never reach the license
                issuer. Razorpay emails you a payment receipt, and its own privacy notice covers that part.
              </li>
              <li>
                <span className="font-semibold text-ink">What the issuer receives.</span> For each completed
                payment, Razorpay notifies the issuer — a small web service we run. It reads your email address, the
                payment ID, the order ID and which plan you bought (Phone Pro, Desktop Pro or Bundle), and ignores
                the rest of the notification. It asks Razorpay for the order to confirm the plan.
              </li>
              <li>
                <span className="font-semibold text-ink">What it stores.</span> Your email, payment ID, plan, a
                license ID, the signed license key and the time it was issued, in a small database on the
                issuer&rsquo;s own disk. Your email and payment ID also appear in its operating logs. We keep them
                to re-send your key if the email goes missing and to find your payment if you ask for a refund.
                Nothing deletes them automatically.
              </li>
              <li>
                <span className="font-semibold text-ink">How the key reaches you.</span> The issuer sends it to your
                email address through an SMTP email provider. The key itself contains your email address.
              </li>
              <li>
                <span className="font-semibold text-ink">After that.</span> Your PC checks the key offline. Using
                the license sends nothing back to us.
              </li>
            </ul>
            <p>
              <span className="font-semibold text-ink">Deleting your purchase record.</span> Open an issue at{" "}
              <a href={ISSUES_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                github.com/Misc42/sanketra/issues
              </a>{" "}
              saying you want it deleted, and leave your email and payment ID out of it, because issues are public.
              We will reply there. Your key keeps working afterwards, since it is checked on your PC; we just can no
              longer re-send it.
            </p>
          </div>
        }
        hi={
          <div className="mt-9 grid gap-5 text-[17px] leading-[1.8] text-[#3C3C42]">
            <h2 className="text-2xl font-bold text-ink">App और यह website कोई user data collect नहीं करते।</h2>
            <p>
              Sanketra आपके PC और phone पर, आपके local Wi-Fi network पर चलता है, और speech-to-text आपके PC पर होता है।
              आपकी आवाज़, transcripts, pairing code, device identifiers और usage patterns हमारे पास नहीं आते — हम इन्हें
              receive, store, sell या analyze नहीं करते।
            </p>
            <p>
              DPDP के हिसाब से app और website के लिए हमारा stance simple है: हम personal data process नहीं करते, इसलिए
              ads, profiling या analytics का सवाल ही नहीं आता। अगर आप local transcript history enable करते हैं, वह आपके PC
              पर रहती है और आप उसे delete/export कर सकते हैं।
            </p>

            <h2 className="mt-4 text-2xl font-bold text-ink">खरीदारी (Purchases)</h2>
            <p>
              Paid license अभी बिक्री पर नहीं हैं। License issuer कैसे काम करता है, यह पहले ही बता रहे हैं: खरीदारी वो
              अकेली जगह है जहाँ कुछ data हमारे server तक पहुँचता है।
            </p>
            <ul className="grid list-disc gap-2.5 pl-6">
              <li>
                <span className="font-semibold text-ink">Payment Razorpay के पास जाता है।</span> आपके card, UPI या
                netbanking की details सिर्फ़ Razorpay लेता और process करता है; वो license issuer तक नहीं पहुँचतीं।
                Razorpay आपको payment receipt email करता है, और उस हिस्से पर उसकी अपनी privacy policy लागू है।
              </li>
              <li>
                <span className="font-semibold text-ink">Issuer को क्या मिलता है।</span> हर पूरे हुए payment पर
                Razorpay issuer को notify करता है — यह हमारी चलाई एक छोटी web service है। वो आपका email address, payment
                ID, order ID और आपने कौन-सा plan लिया (Phone Pro, Desktop Pro या Bundle) पढ़ती है, बाकी notification
                ignore करती है। Plan confirm करने के लिए वो Razorpay से order माँगती है।
              </li>
              <li>
                <span className="font-semibold text-ink">क्या store होता है।</span> आपका email, payment ID, plan, एक
                license ID, signed license key और issue का समय — issuer की अपनी disk पर एक छोटे database में। आपका email और
                payment ID उसके operating logs में भी दिखते हैं। हम इन्हें इसलिए रखते हैं कि email खो जाए तो key दोबारा
                भेज सकें और refund माँगने पर आपका payment ढूँढ सकें। कुछ भी अपने-आप delete नहीं होता।
              </li>
              <li>
                <span className="font-semibold text-ink">Key आप तक कैसे पहुँचती है।</span> Issuer उसे किसी SMTP email
                provider के ज़रिए आपके email पर भेजता है। Key के अंदर आपका email address होता है।
              </li>
              <li>
                <span className="font-semibold text-ink">उसके बाद।</span> आपका PC key को offline check करता है। License
                इस्तेमाल करने पर हमें कुछ वापस नहीं जाता।
              </li>
            </ul>
            <p>
              <span className="font-semibold text-ink">अपना purchase record delete कराना।</span>{" "}
              <a href={ISSUES_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                github.com/Misc42/sanketra/issues
              </a>{" "}
              पर issue खोलकर लिखें कि record delete करना है, और अपना email व payment ID उसमें न डालें, क्योंकि issues
              public होते हैं। हम वहीं जवाब देंगे। Delete के बाद भी आपकी key काम करती रहेगी, क्योंकि वो आपके PC पर check
              होती है; बस हम उसे दोबारा नहीं भेज पाएँगे।
            </p>
          </div>
        }
      />

      <p className="mt-11 border-t border-rule pt-5 text-[13.5px] text-faint">
        A Misc42 Labs product · sole proprietorship, India ·{" "}
        <a href={ISSUES_URL} target="_blank" rel="noopener noreferrer" className="text-accent">
          contact us on GitHub
        </a>
      </p>
    </main>
  );
}
