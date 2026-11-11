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

// ─── macOS disk images ──────────────────────────────────────────────────────
// v0.5.3 ships two Mac builds, each on the LATEST release under a stable name:
// Apple Silicon (arm64, needs macOS 12.3: scipy's arm64 binaries are built for
// 12.3) and Intel (x86_64, needs macOS 11). Both were checked binary by binary
// for the macOS they claim (source repo F-Nov12-02: the v0.5.2 dmg needed
// macOS 26 while claiming 11). A browser cannot tell the two kinds of Mac
// apart (Apple Silicon Safari reports "Intel" too), so the default button is
// Apple Silicon and the Intel build sits next to it.
const RELEASES_LATEST = "https://github.com/Misc42/sanketra/releases/latest/download";
export const MAC_INTEL_URL = `${RELEASES_LATEST}/Sanketra-Desktop-x86_64.dmg`;
const MAC_ARM64_URL = `${RELEASES_LATEST}/Sanketra-Desktop-arm64.dmg`;
export const MAC_DMG_URL = MAC_ARM64_URL;
export const MAC_DMG_FILE = "Sanketra-Desktop-arm64.dmg";
export const MAC_DMG_LABEL = "arm64.dmg";
// v0.5.3 dmgs: arm64 140,488,208 bytes, x86_64 181,233,072 bytes (2026-11-12).
export const MAC_DMG_MB = "141 MB";
export const MAC_INTEL_DMG_MB = "182 MB";
export const MAC_DMG_SIZE = `about ${MAC_DMG_MB}`;
// Measured off the v0.5.3 release assets (2026-11-12): the Windows installer is
// 570,001,402 bytes (it carries NVIDIA's GPU libraries, used only when an NVIDIA
// card is present), the AppImage 255,521,984. Re-measure on every release.
export const WIN_EXE_MB = "570 MB";
export const LINUX_APPIMAGE_MB = "256 MB";
export const MAC_MIN_VERSION = "Apple Silicon Macs need macOS 12.3 or newer, Intel Macs macOS 11 or newer";
export const MAC_ARCH_SHORT = "Apple Silicon (M1 or newer)";
export const MAC_ARCH_NOTE =
  "The main download is for Apple Silicon Macs (M1 and newer). For an Intel Mac, use the Intel build.";

// ─── Contact ────────────────────────────────────────────────────────────────
// support@sanketra.app does not resolve (NXDOMAIN, docs/LAUNCH_READINESS_2026-10-21.md
// in the source repo), so the only channel that works today is GitHub issues,
// which are public. TODO: replace with a private mailbox once one exists, and
// update the refund, privacy and terms copy that points here.
export const ISSUES_URL = "https://github.com/Misc42/sanketra/issues/new";
