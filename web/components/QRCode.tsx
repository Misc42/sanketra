"use client";

import { QRCodeSVG } from "qrcode.react";

// qrcode.react renders the SVG with role="img" unconditionally, so it needs an
// accessible name or screen readers announce a bare "image". Callers pass a
// `title` describing where the code leads (the encoded URL is also shown as
// adjacent copyable text, so this is the text alternative for the graphic).
export default function QRCode({ value, title }: { value: string; title: string }) {
  return (
    <div className="inline-flex rounded-md bg-[#f4efe6] p-4">
      <QRCodeSVG value={value} title={title} size={196} bgColor="#F4EFE6" fgColor="#0F0E14" level="M" />
    </div>
  );
}
