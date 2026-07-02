import Link from "next/link";

const links = [
  ["Misc42 Labs", "https://misc42.github.io/misc42labs/"],
  ["Privacy", "/privacy"],
  ["Terms", "/terms"],
  ["Refunds", "/refund-policy"],
  ["Changelog", "/changelog"],
  ["Blog", "/blog"]
] as const;

export default function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="wrap flex flex-wrap items-center justify-between gap-3 py-6 text-[13.5px] text-faint">
        <nav className="flex flex-wrap gap-5">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
              className="transition hover:text-ink"
            >
              {label}
            </Link>
          ))}
        </nav>
        <span>© 2026 Misc42 Labs</span>
      </div>
    </footer>
  );
}
