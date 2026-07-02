"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  ["Features", "/#features"],
  ["Pricing", "/pricing"],
  ["Phone", "/download"],
  ["Desktop", "/desktop"],
  ["Demo", "/demo"]
] as const;

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-rule bg-paper/88 backdrop-blur-md">
      <div className="wrap flex h-[68px] items-center justify-between">
        <Link href="/" className="flex items-baseline gap-2.5 text-ink">
          <span className="text-[17px] font-bold tracking-[-0.02em]">Sanketra</span>
          <span lang="hi" className="deva text-[15px] font-medium text-faint">
            संकेत्रा
          </span>
        </Link>
        <nav className="hidden items-center gap-[30px] text-sm font-medium text-muted md:flex">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="transition hover:text-ink">
              {label}
            </Link>
          ))}
        </nav>
        <Link
          href="/download"
          className="hidden rounded-lg bg-accent px-[18px] py-[9px] text-[13.5px] font-semibold text-paper transition hover:bg-accent-hover md:inline-block"
        >
          Download free
        </Link>
        <button
          type="button"
          className="rounded-md border border-rule px-3 py-2 text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Open navigation</span>
          ☰
        </button>
      </div>
      <div
        id="mobile-nav"
        className={`absolute left-[var(--pad)] right-[var(--pad)] top-[68px] z-20 grid gap-4 rounded-xl border border-rule bg-surface p-5 shadow-lg transition md:hidden ${
          open ? "visible translate-y-0 opacity-100" : "invisible pointer-events-none -translate-y-3 opacity-0"
        }`}
      >
        {links.map(([label, href]) => (
          <Link key={href} href={href} className="py-1 text-ink" onClick={() => setOpen(false)}>
            {label}
          </Link>
        ))}
        <Link href="/download" className="py-1 font-semibold text-accent" onClick={() => setOpen(false)}>
          Download free
        </Link>
      </div>
    </header>
  );
}
