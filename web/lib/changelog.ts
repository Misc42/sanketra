import fs from "node:fs";
import path from "node:path";

export type ChangelogSection = {
  version: string;
  date: string;
  bullets: string[];
};

// Originally a Codex Apr21 workaround for ISR runtime regeneration not
// bundling the parent file. Kept on GitHub Pages too: `output: 'export'`
// resolves `../CHANGELOG.md` at BUILD time relative to `web/`, so monorepo
// vs single-repo paths still need probing. Fallback to `content/` baked
// snapshot guarantees /changelog never 500s.
function loadChangelogRaw(): string {
  const candidates = [
    path.resolve(process.cwd(), "../CHANGELOG.md"),       // monorepo dev
    path.resolve(process.cwd(), "CHANGELOG.md"),          // single-repo layout
    path.resolve(process.cwd(), "content/CHANGELOG.md"),  // baked snapshot
  ];
  for (const p of candidates) {
    try {
      return fs.readFileSync(p, "utf8");
    } catch (_) { /* try next */ }
  }
  // Last-resort fallback so /changelog never 500s in production.
  return "## v1.2.0 — Apr 21\nSee github.com/Misc42/mic_on_term for full changelog.";
}

export function getChangelogSections(): ChangelogSection[] {
  const raw = loadChangelogRaw();
  const matches = [...raw.matchAll(/^##\s+(.+)$/gm)];

  return matches.map((match, index) => {
    const title = match[1].trim();
    const start = (match.index ?? 0) + match[0].length;
    const end = matches[index + 1]?.index ?? raw.length;
    const body = raw.slice(start, end).trim();
    const [versionPart, datePart = ""] = title.split(/\s+—\s+/);
    const bulletSource = body
      .split(/\n\s*\n/)
      .map((block) => block.replace(/\n/g, " ").replace(/\*\*/g, "").trim())
      .filter(Boolean);

    return {
      version: versionPart,
      date: datePart,
      bullets: bulletSource.length ? bulletSource : [body.replace(/\n/g, " ").trim()]
    };
  });
}
