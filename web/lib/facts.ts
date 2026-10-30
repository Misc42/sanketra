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
//
// The arm64 dmg is built on a Mac by hand and reaches the release after the
// Windows and Linux builds. Until it is on the LATEST release, every Mac
// download points at v0.5.1's dmg (an Intel build Apple Silicon runs through
// Rosetta), so the Mac button never 404s on `latest`. Flip this in the push
// that follows the arm64 upload, and measure MAC_DMG_SIZE off that file.
export const MAC_ARM64_ON_LATEST = true;
export const MAC_INTEL_URL =
  "https://github.com/Misc42/sanketra/releases/download/v0.5.1/Sanketra-Desktop-universal.dmg";
const MAC_ARM64_URL =
  "https://github.com/Misc42/sanketra/releases/latest/download/Sanketra-Desktop-arm64.dmg";
export const MAC_DMG_URL = MAC_ARM64_ON_LATEST ? MAC_ARM64_URL : MAC_INTEL_URL;
export const MAC_DMG_FILE = MAC_ARM64_ON_LATEST
  ? "Sanketra-Desktop-arm64.dmg"
  : "Sanketra-Desktop-universal.dmg";
export const MAC_DMG_LABEL = MAC_ARM64_ON_LATEST ? "arm64.dmg" : "v0.5.1 .dmg";
// v0.5.2's arm64 dmg is 125,825,802 bytes (v0.5.1's universal one: 164,835,727).
export const MAC_DMG_SIZE = MAC_ARM64_ON_LATEST ? "about 126 MB" : "about 165 MB";
export const MAC_MIN_VERSION = "macOS 11 or newer";
export const MAC_ARCH_SHORT = MAC_ARM64_ON_LATEST
  ? "Apple Silicon (M1 or newer)"
  : "v0.5.1 · Intel and Apple Silicon";
// v0.5.1 serves a phone page whose microphone cannot start (its security
// policy blocks the audio worklet; fixed in v0.5.2), so say so rather than
// let a Mac user find out on the phone.
export const MAC_ARCH_NOTE = MAC_ARM64_ON_LATEST
  ? "Built for Apple Silicon Macs (M1 and newer). On an Intel Mac, use the last Intel build, v0.5.1."
  : "The Mac download is still v0.5.1 while the v0.5.2 Apple Silicon build is finished. It is an Intel build; Apple Silicon Macs run it through Rosetta, which macOS offers to install the first time. In v0.5.1 a phone's browser cannot be used as the microphone; that is fixed in v0.5.2.";

// ─── Contact ────────────────────────────────────────────────────────────────
// support@sanketra.app does not resolve (NXDOMAIN, docs/LAUNCH_READINESS_2026-10-21.md
// in the source repo), so the only channel that works today is GitHub issues,
// which are public. TODO: replace with a private mailbox once one exists, and
// update the refund, privacy and terms copy that points here.
export const ISSUES_URL = "https://github.com/Misc42/sanketra/issues/new";
