// Windows install walkthrough. 8 steps. The SmartScreen warning is the big
// confusion point — non-technical users see "Windows protected your PC" and
// reflexively cancel. The reassurance copy treats this head-on.

import {
  EdgeDownloadBarMockup,
  InnoFinishMockup,
  InnoSetupWizardMockup,
  InstallProgressMockup,
  MainWindowMockup,
  SmartScreenExpandedMockup,
  TrayMenuMockup,
  WarningDialogMockup,
  WinMicToastMockup
} from "./Mockups";
import { StepBlock } from "./StepBlock";

const TOTAL = 8;

export function WindowsGuide() {
  return (
    <div className="grid gap-12">
      <header>
        <p className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-saffron">
          Windows · 8 steps · 3 min
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-ink md:text-4xl">
          Click <em className="serif-italic text-saffron">More info → Run anyway</em>, then{" "}
          <span className="deva text-saffron">आगे बढ़ो</span> through the wizard.
        </h2>
        <p className="mt-4 max-w-3xl text-muted">
          Windows SmartScreen will flag Sanketra Desktop because we&rsquo;re unsigned during the
          free beta. The escape hatch is intentional and one click deep. No UAC prompt, no admin
          rights — Sanketra installs to your user folder. Eight steps; everything you&rsquo;ll see
          is documented below.
        </p>
      </header>

      <StepBlock
        index={1}
        total={TOTAL}
        title="Download the installer .exe"
        visual={{
          kind: "mockup",
          node: <EdgeDownloadBarMockup />
        }}
      >
        <p>
          Click the <em className="serif-italic text-ink">Download for Windows</em> button above.
          Your browser saves{" "}
          <code className="font-mono text-saffron">Sanketra-Desktop-Setup-x64.exe</code> to{" "}
          <code className="font-mono text-saffron">C:\Users\you\Downloads\</code>.
        </p>
        <p>
          The .exe is about 98 MB. Edge may add an extra &ldquo;this file isn&rsquo;t commonly
          downloaded&rdquo; nudge on the download itself — click the three dots → Keep. We address
          why in the next step.
        </p>
      </StepBlock>

      <StepBlock
        index={2}
        total={TOTAL}
        title="Double-click the installer and meet SmartScreen"
        visual={{
          kind: "mockup",
          node: (
            <WarningDialogMockup
              title="Windows protected your PC"
              body="Microsoft Defender SmartScreen prevented an unrecognized app from starting. Running this app might put your PC at risk."
              rejectLabel="Don't run"
              hintLabel="More info"
            />
          )
        }}
        reassurance={
          <>
            The big blue dialog says &ldquo;Windows protected your PC.&rdquo; This is{" "}
            <strong className="text-ink">SmartScreen</strong>, Microsoft&rsquo;s reputation engine.
            Any installer signed by a publisher Windows hasn&rsquo;t seen before triggers it. Even
            apps from well-known developers see this on their first release of a new version.
          </>
        }
        branch={{
          title: "you only see Don't run, no More info link",
          body: (
            <>
              The <strong className="text-ink">More info</strong> text is small and easy to miss —
              it sits below the headline, above the Don&rsquo;t run button. If you genuinely
              can&rsquo;t see it, your Windows version may have hidden it behind a group policy
              (corporate-managed laptops). In that case, ask your IT admin to whitelist{" "}
              <code className="font-mono text-saffron">Sanketra-Desktop-Setup-x64.exe</code>.
            </>
          )
        }}
      >
        <p>
          Double-click <code className="font-mono text-saffron">Sanketra-Desktop-Setup-x64.exe</code>{" "}
          in your Downloads folder. A big blue dialog appears.
        </p>
      </StepBlock>

      <StepBlock
        index={3}
        total={TOTAL}
        title="Click More info → Run anyway"
        visual={{
          kind: "mockup",
          node: <SmartScreenExpandedMockup />
        }}
        reassurance={
          <>
            Clicking <strong className="text-ink">Run anyway</strong> is not bypassing security —
            it&rsquo;s telling Windows &ldquo;I downloaded this from a source I trust.&rdquo;
            That&rsquo;s exactly what the dialog is for. After enough users install Sanketra,
            Microsoft&rsquo;s reputation engine learns to trust the publisher and the warning
            stops appearing.
          </>
        }
      >
        <p>
          Click <strong className="text-ink">More info</strong>. The dialog expands to show the
          publisher (currently listed as <em className="serif-italic">Unknown publisher</em>, will
          change to <em className="serif-italic">Misc42 Labs</em> once we&rsquo;ve bought a code-
          signing certificate).
        </p>
        <p>
          A new button appears: <strong className="text-ink">Run anyway</strong>. Click it. The
          Inno Setup installer wizard opens.
        </p>
      </StepBlock>

      <StepBlock
        index={4}
        total={TOTAL}
        title="Click through the install wizard"
        visual={{
          kind: "mockup",
          node: <InnoSetupWizardMockup />
        }}
        reassurance={
          <>
            The wizard installs to{" "}
            <code className="font-mono text-saffron">%LOCALAPPDATA%\SanketraDesktop\</code> by
            default — your personal user folder. No UAC prompt because no admin rights are needed.
            Pick a different folder if you like; default is fine for everyone.
          </>
        }
      >
        <p>The wizard walks you through four pages:</p>
        <ol className="ml-4 grid gap-2 text-sm">
          <li>
            <strong className="text-ink">Welcome</strong> — click Next.
          </li>
          <li>
            <strong className="text-ink">License Agreement</strong> — short EULA, choose{" "}
            <em className="serif-italic">I accept the agreement</em> → Next.
          </li>
          <li>
            <strong className="text-ink">Select Destination Location</strong> — default is fine →
            Next.
          </li>
          <li>
            <strong className="text-ink">Select Additional Tasks</strong> — leave{" "}
            <em className="serif-italic">Launch at startup</em> checked if you want Sanketra in the
            tray on boot. <em className="serif-italic">Create desktop icon</em> is your call →
            Next.
          </li>
        </ol>
      </StepBlock>

      <StepBlock
        index={5}
        total={TOTAL}
        title="Click Install and wait ~30 seconds"
        visual={{
          kind: "mockup",
          node: <InstallProgressMockup />
        }}
      >
        <p>
          The wizard copies Sanketra into{" "}
          <code className="font-mono text-saffron">%LOCALAPPDATA%\SanketraDesktop\</code>, registers
          Start menu shortcuts, and (if you ticked it) adds the run-at-login entry. Total time on a
          modern PC: under 30 seconds.
        </p>
      </StepBlock>

      <StepBlock
        index={6}
        total={TOTAL}
        title="Finish → Launch Sanketra Desktop"
        visual={{
          kind: "mockup",
          node: <InnoFinishMockup />
        }}
      >
        <p>
          The final wizard page has a <em className="serif-italic">Launch Sanketra Desktop</em>{" "}
          checkbox — leave it ticked, click <strong className="text-ink">Finish</strong>. Sanketra
          appears: a small window with the headline you saw on the homepage, plus a stylized स icon
          in your system tray (bottom-right of your taskbar).
        </p>
      </StepBlock>

      <StepBlock
        index={7}
        total={TOTAL}
        title="Grant microphone permission"
        visual={{
          kind: "mockup",
          node: <WinMicToastMockup />
        }}
        reassurance={
          <>
            Windows 11 shows a toast in the bottom-right corner of your screen the first time
            Sanketra opens the mic:{" "}
            <em className="serif-italic">Allow Sanketra Desktop to access your microphone?</em>{" "}
            Click <strong className="text-ink">Yes</strong>. Windows 10 behaves the same but may
            silently grant access without a prompt depending on your privacy settings.
          </>
        }
        branch={{
          title: "you accidentally clicked No",
          body: (
            <>
              Open <strong className="text-ink">Settings → Privacy & Security → Microphone</strong>,
              find Sanketra Desktop in the &ldquo;Let apps access your microphone&rdquo; list,
              toggle it ON. Quit Sanketra (right-click tray icon → Quit) and relaunch from Start
              Menu.
            </>
          )
        }}
      >
        <p>
          On Windows 11 and 10, the first hotkey press triggers a system microphone-permission
          prompt. Allow it; this is the only OS prompt Sanketra needs on Windows. (No accessibility
          equivalent — pynput&rsquo;s Win32 keyboard hooks need no extra permission.)
        </p>
      </StepBlock>

      <StepBlock
        index={8}
        total={TOTAL}
        title="Hold Ctrl + Alt, speak, release"
        visual={{ kind: "mockup", node: <MainWindowMockup /> }}
        branch={{
          title: "the hotkey doesn't fire when a game/IDE is focused",
          body: (
            <>
              Some apps run elevated (administrator privileges) and Windows blocks key injection
              from non-elevated processes into elevated windows. Either right-click Sanketra
              Desktop → Run as administrator, or stop running the target app elevated. Most users
              never need to do this.
            </>
          )
        }}
      >
        <p>
          Focus any text field. Hold{" "}
          <kbd className="font-mono text-saffron">Ctrl + Alt</kbd>, speak a sentence,
          release. The transcript types into the focused field within ~1.5 seconds.
        </p>
        <div className="rounded-md border border-rule bg-surface/40 px-4 py-3">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-faint">
            Tray menu
          </p>
          <p className="mt-1 text-sm text-muted">
            Right-click the स icon in your system tray (you may need to expand the hidden-icons
            chevron near the clock) to see all controls. Closing the main window hides Sanketra to
            the tray — it keeps the engine warm so the next hotkey is instant.
          </p>
          <div className="mt-3">
            <TrayMenuMockup className="mx-auto max-w-[300px]" />
          </div>
        </div>
      </StepBlock>
    </div>
  );
}
