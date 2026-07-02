"use client";

// English/हिंदी segmented pill toggle for Sanketra's legal doc pages
// (Privacy, Terms). Client-side only — swaps content and body font, no
// routing, no persistence. Shared here because Privacy and Terms both need
// the identical switcher; Refunds doesn't use it (single English doc per
// Sanketra Refunds.dc.html).

import { useState, type ReactNode } from "react";

export function LangToggle({ en, hi }: { en: ReactNode; hi: ReactNode }) {
  const [lang, setLang] = useState<"en" | "hi">("en");

  return (
    <>
      <div className="mt-7 inline-flex gap-0.5 rounded-full border border-rule p-[3px]">
        <button
          type="button"
          onClick={() => setLang("en")}
          className={`rounded-full px-[18px] py-[7px] text-[13.5px] font-semibold transition ${
            lang === "en" ? "bg-ink text-paper" : "text-muted"
          }`}
        >
          English
        </button>
        <button
          type="button"
          onClick={() => setLang("hi")}
          className={`rounded-full px-[18px] py-[7px] text-[13.5px] font-semibold transition ${
            lang === "hi" ? "bg-ink text-paper" : "text-muted"
          }`}
        >
          हिंदी
        </button>
      </div>
      <div className={lang === "hi" ? "deva" : ""}>{lang === "en" ? en : hi}</div>
    </>
  );
}
