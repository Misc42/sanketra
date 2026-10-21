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
// Read from the published v0.5.1 asset itself (Sanketra-Desktop-universal.dmg,
// sha256 547e7d02…ecad): its main executable and every bundled .so are thin
// x86_64 Mach-O, LSMinimumSystemVersion is 11.0, and the app is ad-hoc signed
// and not notarized. The "-universal" in the file name is only a stable-URL
// convention, it is NOT a universal binary. (desktop/build/macos/README.md and
// sanketra_mac.spec in the source repo still say "arm64-only"; they describe the
// intended build, not this artifact. Re-check the Mach-O header of the next dmg
// before changing any of the lines below.)
export const MAC_DMG_FILE = "Sanketra-Desktop-universal.dmg";
export const MAC_DMG_SIZE = "about 165 MB";
export const MAC_MIN_VERSION = "macOS 11 or newer";
export const MAC_ARCH_SHORT = "Intel build · runs on Apple Silicon through Rosetta 2";
export const MAC_ARCH_NOTE =
  "This disk image is built for Intel (x86_64) Macs. Apple Silicon Macs run it through Rosetta 2, which macOS offers to install the first time you open the app. The file name says “universal”, but it is not a universal binary.";

// ─── Contact ────────────────────────────────────────────────────────────────
// support@sanketra.app does not resolve (NXDOMAIN, docs/LAUNCH_READINESS_2026-10-21.md
// in the source repo), so the only channel that works today is GitHub issues,
// which are public. TODO: replace with a private mailbox once one exists, and
// update the refund, privacy and terms copy that points here.
export const ISSUES_URL = "https://github.com/Misc42/sanketra/issues/new";
