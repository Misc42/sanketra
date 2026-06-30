"use client";

// Install-guide screenshot <img>. Two jobs the plain element can't do:
//   1. basePath — root-absolute src (e.g. "/screenshots/mac/step-01.png")
//      isn't auto-prefixed by Next, so it 404s under /sanketra/. withBase()
//      fixes it.
//   2. graceful 404 — guide PNGs are captured post-launch; until then (or if
//      one is renamed) the asset is missing. On error we remove the <img> so
//      the "screenshot pending capture" placeholder beneath stays visible
//      instead of a broken-image glyph.
import { useState } from "react";
import { withBase } from "@/lib/basePath";

export function GuideImage({ src, alt }: { src: string; alt: string }) {
  const [broken, setBroken] = useState(false);
  if (broken) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src.startsWith("/") ? withBase(src) : src}
      alt={alt}
      loading="lazy"
      onError={() => setBroken(true)}
      className="absolute inset-0 block h-full w-full object-contain"
    />
  );
}
