import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        muted: "var(--ink-muted)",
        faint: "var(--ink-faint)",
        paper: "var(--paper)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        rule: "var(--rule)",
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)"
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
        deva: ["var(--font-deva)"]
      }
    }
  },
  plugins: [typography]
};

export default config;
