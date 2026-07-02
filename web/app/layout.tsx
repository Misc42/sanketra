import type { Metadata } from "next";
import { Anek_Devanagari, Geist_Mono, Schibsted_Grotesk } from "next/font/google";
import "../styles/globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { withBase } from "@/lib/basePath";

const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap"
});

const anekDevanagari = Anek_Devanagari({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-deva",
  display: "swap"
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap"
});

export const metadata: Metadata = {
  // Live deploy is the GitHub Pages project sub-path misc42.github.io/sanketra/
  // (next.config.js basePath: '/sanketra', no CNAME). The /sanketra path segment
  // MUST stay in metadataBase: Next does NOT add basePath to metadata URLs, it
  // joins them against metadataBase.pathname — so a bare misc42.github.io would
  // 404 the og-image. Relative og:url / images below track this automatically.
  // When the apex domain attaches and basePath drops to "", switch this back to
  // "https://sanketra.app" in the same change.
  metadataBase: new URL("https://misc42.github.io/sanketra"),
  title: {
    default: "Sanketra — speak, and your PC types",
    template: "%s — Sanketra"
  },
  description: "Voice as a universal input layer for your PC. Hindi-first, LAN-only, zero cloud speech-to-text.",
  openGraph: {
    title: "Sanketra — speak, and your PC types",
    description: "Voice as a universal input layer for your PC.",
    url: "/",
    siteName: "Sanketra",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Sanketra — speak, and your PC types",
    description: "Voice as a universal input layer for your PC.",
    images: ["/og-image.png"]
  },
  icons: {
    icon: withBase("/icon.svg")
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      className={`${schibstedGrotesk.variable} ${anekDevanagari.variable} ${geistMono.variable}`}
    >
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
