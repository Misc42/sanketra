"use client";

import { QRCodeSVG } from "qrcode.react";

// qrcode.react renders the SVG with role="img" unconditionally, so it needs an
// accessible name or screen readers announce a bare "image". Callers pass a
// `title` describing where the code leads (the encoded URL is also shown as
// adjacent copyable text, so this is the text alternative for the graphic).
export default function QRCode({ value, title }: { value: string; title: string }) {
  return (
    <div className="inline-flex rounded-lg border border-rule bg-surface p-4">
      <QRCodeSVG value={value} title={title} size={128} bgColor="#FFFFFF" fgColor="#131315" level="M" />
    </div>
  );
}
