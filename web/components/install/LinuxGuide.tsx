// Linux install walkthrough. 5 steps. Cleanest path — no Gatekeeper, no
// SmartScreen, no permission prompts. The one trap: Wayland blocks global
// keyboard hooks, so power users on GNOME 45+ need the X11 escape hatch.

import {
  FilesPermissionsMockup,
  HotkeyDemoMockup,
  LinuxDownloadMockup,
  MainWindowMockup,
  TrayMenuMockup
} from "./Mockups";
import { StepBlock } from "./StepBlock";

const TOTAL = 5;

export function LinuxGuide() {
  return (
    <div className="grid gap-12">
      <header>
        <p className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-accent">
          Linux · 5 steps · 2 min
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-ink md:text-4xl">
          Make it executable, run it.{" "}
          <span className="deva text-accent">Linux वालों ke liye sabse seedha hai.</span>
        </h2>
        <p className="mt-4 max-w-3xl text-muted">
          The .AppImage runs on any distro — Ubuntu, Fedora, Arch, Debian, Mint. No package
          manager, no root, no install location to choose. PulseAudio / PipeWire grants
          microphone access automatically. The only sharp edge is{" "}
          <strong className="text-ink">Wayland</strong> sessions blocking global hotkeys —
          step 5 covers the workaround.
        </p>
      </header>

      <StepBlock
        index={1}
        total={TOTAL}
        title="Download the .AppImage"
        visual={{
          kind: "mockup",
          node: <LinuxDownloadMockup />
        }}
      >
        <p>
          Click <em className="serif-italic text-ink">Download for Linux</em> above. Your browser
          saves <code className="font-mono text-accent">Sanketra-Desktop-x86_64.AppImage</code> to{" "}
          <code className="font-mono text-accent">~/Downloads/</code> (about 104 MB).
        </p>
      </StepBlock>

      <StepBlock
        index={2}
        total={TOTAL}
        title="Mark it executable"
        visual={{
          kind: "mockup",
          node: <FilesPermissionsMockup />
        }}
      >
        <p>
          AppImages ship without the executable bit set, for security. You have two paths:
        </p>
        <div className="rounded-md border border-rule bg-surface/40 px-4 py-3">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-faint">
            Option A · Files manager (no terminal)
          </p>
          <p className="mt-1 text-sm text-muted">
            Right-click the .AppImage in your file manager →{" "}
            <strong className="text-ink">Properties</strong> →{" "}
            <strong className="text-ink">Permissions</strong> tab → tick{" "}
            <em className="serif-italic">Allow executing file as program</em> → close. Then
            double-click the .AppImage to launch.
          </p>
        </div>
        <div className="mt-3 rounded-md border border-rule bg-surface/40 px-4 py-3">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-faint">
            Option B · Terminal (one line)
          </p>
          <pre className="mt-2 overflow-x-auto rounded-sm bg-paper p-3 font-mono text-xs text-ink">
{`chmod +x ~/Downloads/Sanketra-Desktop-*.AppImage
~/Downloads/Sanketra-Desktop-*.AppImage`}
          </pre>
        </div>
      </StepBlock>

      <StepBlock
        index={3}
        total={TOTAL}
        title="The main window opens — no prompts"
        visual={{ kind: "mockup", node: <MainWindowMockup /> }}
        reassurance={
          <>
            Linux has no equivalent of Gatekeeper or SmartScreen for portable executables.
            PulseAudio / PipeWire grants microphone access transparently. X11 sessions allow global
            keyboard hooks without a permission prompt. You should see Sanketra&rsquo;s main window
            within ~3 seconds of launch.
          </>
        }
        branch={{
          title: "you see “Could not load Qt platform plugin xcb”",
          body: (
            <>
              PySide6 6.5+ needs the libxcb-cursor0 shared library. Install it for your distro:
              <pre className="mt-2 overflow-x-auto rounded-sm border border-rule bg-paper p-3 font-mono text-xs text-ink">
{`# Ubuntu / Debian / Mint
sudo apt install libxcb-cursor0

# Fedora / RHEL / CentOS Stream
sudo dnf install xcb-util-cursor

# Arch / Manjaro
sudo pacman -S xcb-util-cursor`}
              </pre>
              Then re-run the AppImage.
            </>
          )
        }}
      >
        <p>
          Sanketra launches and shows you the main window — eyebrow tag, headline, mode strip, mic
          card. The system tray gets a स icon (look in your top bar on GNOME, or system tray on
          KDE / XFCE / others).
        </p>
      </StepBlock>

      <StepBlock
        index={4}
        total={TOTAL}
        title="Hold Ctrl + Alt, speak, release"
        visual={{
          kind: "mockup",
          node: <HotkeyDemoMockup />
        }}
      >
        <p>
          Focus any text field. Hold{" "}
          <kbd className="font-mono text-accent">Ctrl + Alt</kbd>, say something,
          release. Transcript types in within ~1.5 seconds on the model auto-selected for your
          hardware.
        </p>
      </StepBlock>

      <StepBlock
        index={5}
        total={TOTAL}
        title="If you're on Wayland and the hotkey doesn't fire"
        visual={{ kind: "mockup", node: <TrayMenuMockup /> }}
        reassurance={
          <>
            Wayland deliberately blocks global keyboard hooks as a security feature — any process
            grabbing every keystroke is, by design, a keylogger. Sanketra&rsquo;s hotkey is a
            global keyboard hook. The blocking is correct; the workarounds are explicit.
          </>
        }
        branch={{
          title: "you'd rather keep Wayland",
          body: (
            <>
              Use the in-app <em className="serif-italic">Start dictation</em> button (or the tray
              menu&rsquo;s same item) instead of the hotkey. Same engine, same transcription —
              just an extra click vs. holding the chord. Future Sanketra versions may use the
              <code className="font-mono text-accent"> XDG Portals GlobalShortcuts</code> API once
              GNOME ships it stable.
            </>
          )
        }}
      >
        <p>
          GNOME 45+, KDE Plasma 6 default sessions, Fedora Workstation defaults — these all run on
          Wayland, which prevents Sanketra&rsquo;s global hotkey from working from inside other
          apps. Two ways out:
        </p>
        <ol className="ml-4 grid gap-2 text-sm">
          <li>
            <strong className="text-ink">Switch to an X11 session</strong> — log out, click the
            gear icon on the login screen, choose <em className="serif-italic">Ubuntu on Xorg</em>{" "}
            (or <em className="serif-italic">GNOME on Xorg</em>, <em className="serif-italic">Plasma X11</em>),
            log back in. Hotkey works.
          </li>
          <li>
            <strong className="text-ink">Use the tray menu</strong> — click the स icon → Start
            dictation. Same engine, same speed. Works on Wayland because no global hook is needed.
          </li>
        </ol>
      </StepBlock>
    </div>
  );
}
