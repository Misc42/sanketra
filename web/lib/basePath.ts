// next.config.js sets `basePath: '/sanketra'` for the GitHub Pages sub-path.
// Next auto-prefixes <Link> and next/image, but NOT raw HTML attributes —
// <a href>, <video src>, <img src>, and metadata icon paths keep their
// root-absolute value and 404 under /sanketra/ on Pages. Wrap any internal
// root-absolute path with withBase() so it resolves.
//
// Keep BASE_PATH in sync with next.config.js — that file is the build-time
// source of truth; this mirrors it for runtime attribute values. When the
// apex domain attaches and basePath drops to "", set this to "" too.
export const BASE_PATH = "/sanketra";

/** Prefix an internal root-absolute path (e.g. "/desktop") with the deploy basePath. */
export function withBase(path: string): string {
  return `${BASE_PATH}${path}`;
}
