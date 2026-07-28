# Screenshot assets for `/desktop` install guide

Captured at native resolution (no scaling). Save as PNG (lossless — the install
flows are text-heavy and JPEG artifacts make small UI text unreadable).

**Recommended size:** 1600×1000 max, cropped tight to the relevant dialog or
window. The page lazy-loads + scales them with `object-contain` so anything
bigger is wasted bandwidth.

**Naming convention:** `step-NN-short-slug.png`. The page references these
paths verbatim. If you rename, update the matching `visual.src` in the
guide component.

**Until captured:** the page shows a labelled placeholder ("screenshot pending
capture — …") that matches the alt text. Layout stays stable; only the visual
slot is missing. Safe to ship.

---

## macOS — `mac/`

11 screenshots, captured on an Apple Silicon Mac running macOS Sonoma 14.x
(latest as of v0.3.0 ship).

| Filename | What to capture |
|----------|-----------------|
| `mac/step-01-downloads-folder.png` | Finder Downloads folder showing the freshly-downloaded `Sanketra-Desktop-universal.dmg`. |
| `mac/step-02-dmg-mounted.png` | Mounted DMG window — `Sanketra Desktop.app` on the left, arrow + `Applications` shortcut on the right. The classic Mac install layout. |
| `mac/step-03-drag-to-applications.png` | Drag gesture mid-action — cursor hovering between `.app` and `Applications`. Pause the drag and screenshot. |
| `mac/step-04-right-click-open.png` | Context menu after right-clicking Sanketra Desktop in `/Applications`. **Open** highlighted at the top. |
| `mac/step-05-gatekeeper-dialog.png` | The "macOS cannot verify the developer of Sanketra Desktop" dialog with Cancel + Open buttons. |
| `mac/step-07-accessibility-prompt.png` | Sanketra's own in-app dialog asking the user to open Accessibility settings. (We control this UI — capture from the running app.) |
| `mac/step-08-accessibility-toggle.png` | System Settings → Privacy & Security → Accessibility panel, Sanketra Desktop in the list with toggle in the ON position. |
| `mac/step-09-quit-relaunch.png` | Dock right-click menu showing Sanketra Desktop → Quit, plus the app re-launching from Applications. Two-panel composite preferred. |
| `mac/step-10-input-monitoring.png` | System Settings → Privacy & Security → Input Monitoring with Sanketra Desktop toggle ON. Only relevant if step 9's relaunch didn't activate the hotkey. |

Steps 6 (mic permission) and 11 (main window) use the inline SVG mockups
in `components/install/Mockups.tsx`, not screenshots — no PNG needed.

---

## Windows — `win/`

8 screenshots, captured on Windows 11 23H2 (latest as of v0.3.0 ship). Use
Windows 11 light-mode visuals — SmartScreen renders identically on 10 and 11
so the screenshots are cross-version safe.

| Filename | What to capture |
|----------|-----------------|
| `win/step-01-download.png` | Edge or Chrome's download bar / tray showing `Sanketra-Desktop-Setup-x64.exe` finishing. |
| `win/step-03-run-anyway.png` | The SmartScreen dialog expanded after clicking "More info" — shows Publisher: Unknown publisher + the **Run anyway** button now visible. |
| `win/step-04-wizard-pages.png` | Composite of all four Inno Setup wizard pages: Welcome / License / Destination / Tasks. 2×2 grid in one PNG. |
| `win/step-05-installing.png` | Inno Setup wizard mid-install with the progress bar partway through. |
| `win/step-06-finish.png` | Final Inno Setup page with the "Launch Sanketra Desktop" checkbox visible. |
| `win/step-07-mic-permission.png` | Windows 11 toast in the bottom-right: "Let Sanketra Desktop access your microphone?" with Yes / No buttons. |

Step 2 (SmartScreen initial dialog) and step 8 (main window + tray menu) use
inline SVG mockups — no PNG needed.

---

## Linux — `linux/`

5 screenshots, captured on Ubuntu 24.04 LTS + GNOME 46. Use a clean GNOME
default theme (Adwaita); avoid third-party themes that wouldn't match the
visual the average reader expects.

| Filename | What to capture |
|----------|-----------------|
| `linux/step-01-download.png` | Firefox / Chromium download manager showing `Sanketra-Desktop-x86_64.AppImage` ready. |
| `linux/step-02-files-permissions.png` | GNOME Files (Nautilus) right-click → Properties → Permissions tab, with "Allow executing file as program" checkbox visible (ideally checked). |
| `linux/step-04-hotkey-test.png` | gedit or another text editor with the cursor focused; Sanketra's notification toast in the corner showing a transcript just typed in. Two-panel composite OK. |

Steps 3 (main window) and 5 (Wayland fallback) use inline SVG mockups — no
PNG needed.

---

## Capture conventions

- **Clean desktop.** Empty wallpaper, no random open apps in the dock/taskbar,
  no notification clutter.
- **High contrast.** Default light or dark mode per OS — match what most users
  see out of the box.
- **Annotations:** none in the PNG itself. The page wraps each screenshot in
  its own frame with caption + arrow if needed. Keep the asset raw.
- **Crop tight.** The dialog or window in question fills most of the frame.
  Don't capture the whole monitor — wasted bytes, harder to read at thumbnail
  size.
- **Hindi-locale rendering:** if your OS has Hindi installed, fine. If not,
  fine too — Sanketra's own UI is English by default; the Devanagari accents
  in our copy are stylistic, not localization.

---

## Provenance

These captures need a real installation on each OS. The Linux v0.2.0 build
runs on the maintainer's dev box; macOS + Windows need the v0.3.0 native
installers (which are in CI as of May 18, 2026 — see `TODO.md` task M1+).

Once captured, drop the PNGs into the matching `mac/`, `win/`, `linux/`
subdirectories. The placeholders auto-disappear; nothing in the page code
changes.
