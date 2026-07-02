// macOS install walkthrough. 11 steps from .dmg download to first hotkey
// fire. Tone: reassuring, explicit about every Gatekeeper warning the user
// will hit, never says "easy" or "just" — those words gaslight non-technical
// users when they hit friction. Every "this is normal" callout exists because
// Apple's security UX is correctly aggressive about unsigned apps.

import {
  AccessibilityListMockup,
  DmgMountedMockup,
  DragToAppsMockup,
  FinderDownloadsMockup,
  InputMonitoringMockup,
  MainWindowMockup,
  PermissionPromptMockup,
  QuitRelaunchMockup,
  RightClickMenuMockup,
  TrayMenuMockup,
  WarningDialogMockup
} from "./Mockups";
import { StepBlock } from "./StepBlock";

const TOTAL = 11;

export function MacGuide() {
  return (
    <div className="grid gap-12">
      <header>
        <p className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-accent">
          macOS · 11 steps · 5 min
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-ink md:text-4xl">
          Drag, right-click Open,{" "}
          <span className="deva text-accent">अनुमति दो</span>, done.
        </h2>
        <p className="mt-4 max-w-3xl text-muted">
          macOS will show you <strong className="text-ink">one warning</strong> the first time
          you launch Sanketra — because we are unsigned during the free beta. The bypass is
          built into macOS: right-click the app and choose Open. After that, double-click works
          like any other app. Below is every step, every warning, every prompt — with what to do
          and what you will see.
        </p>
      </header>

      <StepBlock
        index={1}
        total={TOTAL}
        title="Download the .dmg"
        visual={{
          kind: "mockup",
          node: <FinderDownloadsMockup />
        }}
      >
        <p>
          Click the <em className="serif-italic text-ink">Download for macOS</em> button above. Your
          browser saves <code className="font-mono text-accent">Sanketra-Desktop-universal.dmg</code> to
          your <code className="font-mono text-accent">~/Downloads/</code> folder. The file is about
          112 MB; on a normal connection it lands in under a minute.
        </p>
      </StepBlock>

      <StepBlock
        index={2}
        total={TOTAL}
        title="Open the .dmg in Finder"
        visual={{
          kind: "mockup",
          node: <DmgMountedMockup />
        }}
        reassurance={
          <>
            A new Finder window pops up showing the Sanketra Desktop app on the left and an arrow
            pointing to your Applications folder on the right. This is the standard Mac install
            window — same layout as Chrome, Firefox, Slack.
          </>
        }
      >
        <p>
          Double-click the downloaded .dmg in Finder (or click the file in your browser&rsquo;s
          download bar). macOS mounts it as a temporary disk and opens a window.
        </p>
      </StepBlock>

      <StepBlock
        index={3}
        total={TOTAL}
        title="Drag Sanketra Desktop to Applications"
        visual={{
          kind: "mockup",
          node: <DragToAppsMockup />
        }}
      >
        <p>
          <strong className="text-ink">Drag</strong> the Sanketra Desktop icon onto the Applications
          shortcut. Don&rsquo;t double-click the app from inside the .dmg — apps run from{" "}
          <code className="font-mono text-accent">/Applications</code>, not from the mounted disk.
          Dragging is the standard Mac install gesture.
        </p>
        <p>
          Once the drag completes, you can close the .dmg window and eject the disk (drag the
          Sanketra Desktop disk in Finder&rsquo;s sidebar to the Trash, or right-click → Eject).
        </p>
      </StepBlock>

      <StepBlock
        index={4}
        total={TOTAL}
        title="Open Applications → right-click Sanketra Desktop → Open"
        visual={{
          kind: "mockup",
          node: <RightClickMenuMockup />
        }}
        reassurance={
          <>
            <strong className="text-ink">Right-click</strong>, not double-click. This is critical
            the first time. Double-clicking an unsigned app on a fresh Mac triggers Gatekeeper&rsquo;s
            hard-block dialog with no Open button. Right-click → Open is Apple&rsquo;s own documented
            workaround.
          </>
        }
      >
        <p>
          Open the Applications folder (Finder → sidebar → Applications). Find{" "}
          <strong className="text-ink">Sanketra Desktop</strong>. Right-click (or Control-click) it
          and choose <strong className="text-ink">Open</strong> from the context menu.
        </p>
        <p>
          You only need this dance once. After macOS records your approval, double-click works
          like every other app on your Mac.
        </p>
      </StepBlock>

      <StepBlock
        index={5}
        total={TOTAL}
        title="Approve the Gatekeeper warning"
        visual={{
          kind: "mockup",
          node: (
            <WarningDialogMockup
              title="macOS cannot verify the developer of Sanketra Desktop"
              body="This app is from an unidentified developer. By choosing Open, you are confirming you trust the source."
              rejectLabel="Cancel"
              hintLabel="Open"
            />
          )
        }}
        reassurance={
          <>
            This warning fires for every unsigned Mac app — Sanketra is in this category during the
            free beta because Apple Developer Program signing costs ₹8,000/year, which we&rsquo;ll
            spend once paying users justify it. The warning is macOS doing its job, not a sign of
            something wrong.
          </>
        }
        branch={{
          title: "you see “cannot be opened” with no Open button",
          body: (
            <>
              You probably double-clicked instead of right-clicking. Close the dialog, go back to
              Applications, <strong className="text-ink">right-click</strong> Sanketra Desktop →
              Open. The Open button appears only in the right-click flow on first launch.
            </>
          )
        }}
      >
        <p>
          A dialog appears: <em className="serif-italic">&ldquo;macOS cannot verify the developer
          of Sanketra Desktop. Are you sure you want to open it?&rdquo;</em>
        </p>
        <p>
          Click <strong className="text-ink">Open</strong>. Sanketra launches. macOS remembers your
          decision and won&rsquo;t ask again unless you reinstall a different version.
        </p>
      </StepBlock>

      <StepBlock
        index={6}
        total={TOTAL}
        title="Grant microphone access when prompted"
        visual={{ kind: "mockup", node: <PermissionPromptMockup /> }}
        reassurance={
          <>
            macOS shows this prompt the first time Sanketra reads the mic. Audio is processed
            entirely on your Mac — Whisper runs locally on CPU, nothing crosses your network. The
            permission is reversible from System Settings → Privacy & Security → Microphone any
            time.
          </>
        }
      >
        <p>
          The first time Sanketra opens the mic, macOS shows a system dialog asking{" "}
          <em className="serif-italic">&ldquo;Sanketra would like to access the
          microphone.&rdquo;</em> Click <strong className="text-ink">Allow</strong>.
        </p>
        <p>
          Sanketra needs the mic for the obvious reason — that&rsquo;s how dictation works. The
          dialog text is exactly what you&rsquo;ll see, sourced from Sanketra&rsquo;s own bundle
          metadata.
        </p>
      </StepBlock>

      <StepBlock
        index={7}
        total={TOTAL}
        title="Sanketra asks for Accessibility access"
        visual={{
          kind: "mockup",
          node: (
            <WarningDialogMockup
              title="Sanketra needs Accessibility access"
              body="So the global hotkey works from any app and recognized text can be typed at your cursor. Toggle it on in System Settings → Privacy & Security → Accessibility."
              rejectLabel="Not now"
              hintLabel="Open Accessibility"
            />
          )
        }}
        reassurance={
          <>
            Accessibility access on macOS is what lets the global hotkey work from any app and
            lets Sanketra type the recognized text at your cursor. Without it, the hotkey is
            silent. This is a one-time grant.
          </>
        }
      >
        <p>
          Immediately after the mic prompt, Sanketra shows its own dialog:{" "}
          <em className="serif-italic">&ldquo;Sanketra needs Accessibility access to listen for your
          dictation hotkey from anywhere and type the recognized text into the focused app.&rdquo;</em>
        </p>
        <p>
          Click <strong className="text-ink">Open Accessibility</strong>. macOS&rsquo;s System
          Settings app launches and jumps straight to the right panel.
        </p>
      </StepBlock>

      <StepBlock
        index={8}
        total={TOTAL}
        title="Toggle Sanketra Desktop ON in Accessibility"
        visual={{
          kind: "mockup",
          node: <AccessibilityListMockup />
        }}
        branch={{
          title: "Sanketra Desktop is not in the Accessibility list yet",
          body: (
            <>
              Click the <strong className="text-ink">+</strong> button at the bottom of the
              Accessibility list, navigate to Applications, choose Sanketra Desktop, click{" "}
              <strong className="text-ink">Open</strong>. The toggle appears, switch it on. macOS
              sometimes requires this manual add on older versions.
            </>
          )
        }}
      >
        <p>
          You&rsquo;ll see a list of apps that have requested Accessibility access. Find{" "}
          <strong className="text-ink">Sanketra Desktop</strong> in the list and click the toggle
          to switch it ON. macOS asks for your account password (or Touch ID) to confirm.
        </p>
      </StepBlock>

      <StepBlock
        index={9}
        total={TOTAL}
        title="Quit Sanketra and relaunch"
        visual={{
          kind: "mockup",
          node: <QuitRelaunchMockup />
        }}
        reassurance={
          <>
            macOS only registers a freshly-granted Accessibility permission for the next launch —
            not the running process. This is a system-wide quirk that affects every app needing
            Accessibility, not just Sanketra.
          </>
        }
      >
        <p>
          Press <kbd className="font-mono text-accent">⌘ Q</kbd> to quit Sanketra (or right-click
          its Dock icon → Quit). Then relaunch it from Applications — this time a normal
          double-click works.
        </p>
      </StepBlock>

      <StepBlock
        index={10}
        total={TOTAL}
        title="If the hotkey still doesn't fire, also enable Input Monitoring"
        visual={{
          kind: "mockup",
          node: <InputMonitoringMockup />
        }}
        branch={{
          title: "you don't see a second prompt",
          body: (
            <>
              On some macOS versions (Sonoma 14+ in particular), Accessibility alone is sufficient
              and no Input Monitoring prompt appears. If your hotkey works after step 9, skip this
              step entirely.
            </>
          )
        }}
      >
        <p>
          On macOS 10.15 Catalina and newer, keyboard event monitoring is split out into a separate{" "}
          <strong className="text-ink">Input Monitoring</strong> permission. If your hotkey
          doesn&rsquo;t fire after step 9, Sanketra shows a second dialog asking you to grant Input
          Monitoring.
        </p>
        <p>
          Click <strong className="text-ink">Open Input Monitoring</strong>, find Sanketra Desktop
          in the list, toggle it ON, then quit + relaunch Sanketra one more time.
        </p>
      </StepBlock>

      <StepBlock
        index={11}
        total={TOTAL}
        title="Hold ⌃ ⌥ (Ctrl + Option), say something, release"
        visual={{ kind: "mockup", node: <MainWindowMockup /> }}
        reassurance={
          <>
            Sanketra also lives in your menu bar — look for the स glyph near the clock. Click it
            to open the tray menu (mockup below). The main window can be closed; the menu-bar icon
            keeps the engine warm.
          </>
        }
      >
        <p>
          Focus any text field — a note app, a chat window, your browser&rsquo;s address bar.
          Hold <kbd className="font-mono text-accent">Ctrl + Option</kbd> (yes, Ctrl, not
          Cmd — Option is the Mac name for Alt; same physical keys as Ctrl + Alt on Linux + Windows).
          Say a sentence. Release the keys. The transcript
          types into the focused field within ~1.5 seconds.
        </p>
        <div className="rounded-md border border-rule bg-surface/40 px-4 py-3">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-faint">
            Tray menu
          </p>
          <p className="mt-1 text-sm text-muted">
            Click the स icon in your menu bar to see all of Sanketra&rsquo;s controls. Open the
            main window, switch modes, view history, quit — everything is one click away.
          </p>
          <div className="mt-3">
            <TrayMenuMockup className="mx-auto max-w-[300px]" />
          </div>
        </div>
      </StepBlock>
    </div>
  );
}
