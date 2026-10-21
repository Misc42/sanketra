// Facts that several pages repeat, kept in one place so they cannot drift apart.
// Each block says where the fact comes from; when the source changes, change it here.

// ─── Google Play ────────────────────────────────────────────────────────────
// The Play listing for the Android app returns 404 and no APK is published
// anywhere, so there is nothing to install. Every Play call-to-action on the
// site reads this flag. Flip it to true only when the listing answers 200 AND
// the app is installable from it; until then the phone path is the browser
// client reached through the pairing QR on the PC.
export const PLAY_LISTING_LIVE = false;
export const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.miconterm.app";

// ─── macOS disk image ───────────────────────────────────────────────────────
// From v0.5.2 the Mac build is made natively on Apple Silicon and named after
// its real architecture (build-dmg.sh reads it with lipo). v0.5.1's
// "Sanketra-Desktop-universal.dmg" was in fact a thin x86_64 build (its Mach-O
// header, read 2026-10-21) — Intel Macs keep that one: no Intel build of v0.5.2
// is made (founder's call, 2026-10-21).
export const MAC_DMG_FILE = "Sanketra-Desktop-arm64.dmg";
export const MAC_DMG_SIZE = "about 165 MB"; // TODO(release): measure the v0.5.2 arm64 dmg
export const MAC_MIN_VERSION = "macOS 11 or newer";
export const MAC_ARCH_SHORT = "Apple Silicon (M1 or newer)";
export const MAC_ARCH_NOTE =
  "Built for Apple Silicon Macs (M1 and newer). On an Intel Mac, use the last Intel build, v0.5.1.";
export const MAC_INTEL_URL =
  "https://github.com/Misc42/sanketra/releases/download/v0.5.1/Sanketra-Desktop-universal.dmg";

// ─── Contact ────────────────────────────────────────────────────────────────
// support@sanketra.app does not resolve (NXDOMAIN, docs/LAUNCH_READINESS_2026-10-21.md
// in the source repo), so the only channel that works today is GitHub issues,
// which are public. TODO: replace with a private mailbox once one exists, and
// update the refund, privacy and terms copy that points here.
export const ISSUES_URL = "https://github.com/Misc42/sanketra/issues/new";
