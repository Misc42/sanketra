// Power-user fallback + per-OS troubleshooting matrix. Server component.
// Lives below the visual install guide so the casual reader never has to
// scroll through it. Users who actually hit an obscure failure mode reach
// for ctrl-F and find their error here.

type TerminalEntry = {
  os: string;
  deva: string;
  title: string;
  body: string;
  command: string;
};

const TERMINAL_PATHS: TerminalEntry[] = [
  {
    os: "macOS",
    deva: "मैक",
    title: "Bypass Gatekeeper from Terminal",
    body:
      "Strips the quarantine xattr that triggers Gatekeeper. Run after dragging the .app to Applications. Replaces the right-click → Open dance with one command. Re-applies if you reinstall.",
    command: 'xattr -dr com.apple.quarantine "/Applications/Sanketra Desktop.app"'
  },
  {
    os: "Windows",
    deva: "विंडोज़",
    title: "Install with silent flags (admin or automation)",
    body:
      "Inno Setup honors /SILENT (progress bar only, no prompts) and /VERYSILENT (no UI at all). Useful for IT-managed deployments or scripted installs. The .exe must already be in your working directory.",
    command: "Sanketra-Desktop-Setup-x64.exe /SILENT /CLOSEAPPLICATIONS"
  }
];

type TroubleEntry = {
  os: "macOS" | "Windows" | "Linux";
  symptom: string;
  fix: string;
};

const TROUBLE: TroubleEntry[] = [
  // macOS
  {
    os: "macOS",
    symptom: "Right-clicked → Open, still see no Open button",
    fix: "Reboot the Mac once. macOS Sequoia 15+ caches a stricter unsigned-app block; a fresh login resets the heuristic. If still blocked, run the xattr command above from Terminal."
  },
  {
    os: "macOS",
    symptom: "App opens then immediately dies — Console shows Killed: 9",
    fix: "Hardened-runtime denial. Reboot, then xattr-strip the quarantine bit (see Terminal paths above). If persistent across reboots, file an issue on GitHub with the contents of ~/Library/Logs/Sanketra Desktop/last-crash.log."
  },
  {
    os: "macOS",
    symptom: "Hotkey works in Notes but not in Terminal or 1Password",
    fix: "Those apps use macOS Secure Input mode, which blocks key injection from any other app — by design. Restart focus to a non-secure app to test the hotkey. Not a Sanketra bug; a system-level security boundary."
  },
  {
    os: "macOS",
    symptom: "Sanketra Desktop doesn't appear in Accessibility list",
    fix: "Click the + button at the bottom of the list → navigate to /Applications → choose Sanketra Desktop → Open. Then toggle it ON. macOS doesn't auto-list apps that haven't been launched yet."
  },
  // Windows
  {
    os: "Windows",
    symptom: "Defender / Bitdefender / Kaspersky deletes sanketra-desktop.exe",
    fix: "False-positive on pynput's global keyboard hook (the anti-keylogger heuristic). Restore the file from the AV quarantine, then add %LOCALAPPDATA%\\SanketraDesktop\\ as an exclusion. Until we have a code-signing cert, this happens to ~5% of installs."
  },
  {
    os: "Windows",
    symptom: "Hotkey works in Chrome but not Notepad++ or VS Code (run as admin)",
    fix: "Windows blocks low-privilege processes from injecting input into high-privilege ones. Either run Sanketra Desktop as administrator (right-click .exe → Run as administrator) OR run the target app without admin. Most users never hit this."
  },
  {
    os: "Windows",
    symptom: '"Side-by-side configuration is incorrect" on launch',
    fix: "Missing Visual C++ Redistributable. Install the latest x64 redist from microsoft.com/download. The Inno Setup wizard bundles a check for this but older Windows 10 systems sometimes need the redist re-applied after major OS updates."
  },
  {
    os: "Windows",
    symptom: "Tray icon doesn't appear after launch",
    fix: "Click the chevron (^) near the clock to expand hidden tray icons. Drag the Sanketra icon onto the always-visible strip. Windows hides new tray icons by default; this is a one-time setup."
  },
  // Linux
  {
    os: "Linux",
    symptom: "Could not load Qt platform plugin xcb",
    fix: "Install libxcb-cursor0: apt → 'sudo apt install libxcb-cursor0'; dnf → 'sudo dnf install xcb-util-cursor'; pacman → 'sudo pacman -S xcb-util-cursor'. PySide6 6.5+ depends on it; most distros need an explicit install."
  },
  {
    os: "Linux",
    symptom: "Hotkey doesn't fire on GNOME 45+ / KDE Plasma 6",
    fix: "You're on Wayland; it blocks global keyboard hooks. Two paths: (A) log out, choose an X11/Xorg session at the login screen, log back in — hotkey works. (B) Use the tray menu's Start dictation item instead — works on Wayland."
  },
  {
    os: "Linux",
    symptom: "No audio captured — Whisper transcribes silence",
    fix: "Open pavucontrol → Recording tab → find Sanketra Desktop's stream → ensure it's pointed at your real mic, not the 'Monitor of …' loopback. PipeWire users: use Helvum or pw-link to inspect routing."
  },
  {
    os: "Linux",
    symptom: "AppImage refuses to run — 'cannot execute binary file'",
    fix: "Either chmod +x is missing (see step 2 of the Linux guide) OR you're on a 32-bit/ARM system (AppImage is x86_64-only currently). Check 'uname -m'; if it's not x86_64, a build for your architecture isn't available yet — please open an issue at https://github.com/Misc42/sanketra/issues so we can track demand."
  }
];

export function Troubleshooting() {
  return (
    <section className="rule-top mt-20 pt-12">
      <p className="masthead mb-4">Power users · alternate install paths</p>
      <h2 className="text-3xl font-semibold text-ink md:text-4xl">
        Skip the wizard. Run the command.{" "}
        <span className="deva text-saffron">सीधा रास्ता</span>.
      </h2>
      <p className="mt-4 max-w-3xl text-muted">
        For developers, IT admins, and anyone who prefers a shell. Each command does the same
        thing the visual installer does — just faster and scriptable.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {TERMINAL_PATHS.map((entry) => (
          <article key={entry.os} className="card flex flex-col p-6">
            <p className="masthead">{entry.os}</p>
            <p className="deva mt-1 text-lg text-muted">{entry.deva}</p>
            <h3 className="mt-3 text-lg font-semibold leading-snug text-ink">{entry.title}</h3>
            <p className="mt-2 text-sm text-muted">{entry.body}</p>
            <pre className="command mt-5 overflow-x-auto p-4 text-[0.78rem]">
              <code>{entry.command}</code>
            </pre>
          </article>
        ))}
      </div>

      <div className="rule-top mt-16 pt-12">
        <p className="masthead mb-4">Troubleshooting · the things people email us about</p>
        <h2 className="text-3xl font-semibold text-ink md:text-4xl">
          If something went sideways{" "}
          <span className="deva text-saffron">— यहाँ देखो</span>.
        </h2>
        <p className="mt-4 max-w-3xl text-muted">
          Searchable matrix. Ctrl-F your error message. If your specific symptom isn&rsquo;t
          listed, the fastest path to a fix is the GitHub Issues queue — link at the bottom.
        </p>

        <div className="mt-8 overflow-hidden rounded-lg border border-rule">
          {(["macOS", "Windows", "Linux"] as const).map((os) => (
            <div key={os} className="not-last:border-b not-last:border-rule">
              <div className="bg-surface/60 px-5 py-3">
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-saffron">
                  {os}
                </p>
              </div>
              <div className="divide-y divide-rule">
                {TROUBLE.filter((row) => row.os === os).map((row) => (
                  <div
                    key={row.symptom}
                    className="grid gap-3 px-5 py-5 md:grid-cols-[1fr_2fr] md:items-start md:gap-8"
                  >
                    <p className="font-mono text-sm text-ink">{row.symptom}</p>
                    <p className="text-sm text-muted">{row.fix}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rule-top mt-16 pt-12">
        <p className="masthead mb-4">Still stuck?</p>
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold text-ink">File a GitHub issue</h3>
            <p className="mt-2 text-sm text-muted">
              The fastest path to a fix is{" "}
              <a
                href="https://github.com/Misc42/sanketra/issues/new"
                target="_blank"
                rel="noopener noreferrer"
                className="text-saffron underline decoration-rule"
              >
                Misc42/sanketra/issues
              </a>
              . Include your OS, the error message verbatim, and (if you can) the contents of
              your <code className="font-mono text-saffron">last-crash.log</code> file.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-ink">Email support</h3>
            <p className="mt-2 text-sm text-muted">
              <span className="font-mono text-saffron">support@sanketra.app</span>. Slower than
              GitHub for technical bugs, faster for license / payment questions.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-ink">Read the source</h3>
            <p className="mt-2 text-sm text-muted">
              The desktop client is open source.{" "}
              <a
                href="https://github.com/Misc42/sanketra"
                target="_blank"
                rel="noopener noreferrer"
                className="text-saffron underline decoration-rule"
              >
                Browse it
              </a>{" "}
              if you want to verify what Sanketra does (and doesn&rsquo;t) before installing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
