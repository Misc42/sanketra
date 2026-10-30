// macOS install walkthrough. 12 steps from .dmg download to first hotkey
// fire. Tone: reassuring, explicit about every Gatekeeper warning the user
// will hit, never says "easy" or "just" — those words gaslight non-technical
// users when they hit friction. Every "this is normal" callout exists because
// Apple's security UX is correctly aggressive about unsigned apps.
//
// The Gatekeeper steps (4-6) follow Apple's current documentation
// (support.apple.com/en-us/102445 and /guide/mac-help/mh40617/mac): try to open
// the app once, then System Settings -> Privacy & Security -> Open Anyway, then
// Open and the login password. macOS 15 Sequoia removed the Control-click ->
// Open shortcut (developer.apple.com/news/?id=saqachfa), so this guide must
// never present it as the way in. Build architecture and file size come from
// lib/facts.ts, read off the published v0.5.1 dmg.

import {
  AccessibilityListMockup,
  DmgMountedMockup,
  DragToAppsMockup,
  FinderDownloadsMockup,
  InputMonitoringMockup,
  OpenAnywayMockup,
  PermissionPromptMockup,
  QuitRelaunchMockup,
  TrayMenuMockup,
  WarningDialogMockup
} from "./Mockups";
import { StepBlock } from "./StepBlock";
import { MAC_ARCH_NOTE, MAC_ARM64_ON_LATEST, MAC_DMG_FILE, MAC_DMG_SIZE, MAC_INTEL_URL, MAC_MIN_VERSION } from "@/lib/facts";

const TOTAL = 12;

export function MacGuide() {
  return (
    <div className="grid gap-12">
      <header>
        <p className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-accent">
          macOS · 12 steps · 5 min
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-ink md:text-4xl">
          Drag, Open Anyway,{" "}
          <span className="deva text-accent">अनुमति दो</span>, done.
        </h2>
        <p className="mt-4 max-w-3xl text-muted">
          macOS will stop Sanketra the first time you open it, because the free beta is not
          notarized by Apple. The way past is Apple&rsquo;s own: try to open the app once, then
          allow it under <strong className="text-ink">System Settings → Privacy &amp; Security →
          Open Anyway</strong>. After that, double-click works like any other app. Below is every
          step, every warning, every prompt — with what to do and what you will see.
        </p>
        <div className="callout mt-5 max-w-3xl p-5 text-sm text-muted">
          <p>
            <strong className="text-ink">Which Macs.</strong> {MAC_MIN_VERSION}. {MAC_ARCH_NOTE}{MAC_ARM64_ON_LATEST && (<>{" "}<a href={MAC_INTEL_URL} className="text-accent underline decoration-rule underline-offset-[3px]">Intel build (v0.5.1)</a>.</>)}
          </p>
          <p className="mt-2">
            <strong className="text-ink">Not yet tested on a real Mac.</strong> We have not run
            this disk image on Mac hardware ourselves; the steps follow Apple&rsquo;s
            documentation. If a screen differs from what is described, please tell us.
          </p>
        </div>
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
          browser saves <code className="font-mono text-accent">{MAC_DMG_FILE}</code> to
          your <code className="font-mono text-accent">~/Downloads/</code> folder. The file is{" "}
          {MAC_DMG_SIZE}; on a normal connection it lands in a minute or two.
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
        title="Open Sanketra Desktop from Applications — macOS will refuse"
        visual={{
          kind: "mockup",
          node: (
            <WarningDialogMockup
              title="Apple cannot check “Sanketra Desktop” for malicious software"
              body="This is the expected first-launch block for an app Apple has not notarized. Click Done. Do not click Move to Trash."
              rejectLabel="Move to Trash"
              hintLabel="Done"
            />
          )
        }}
        reassurance={
          <>
            This alert fires for every app that is not notarized by Apple. Sanketra is in that
            group during the free beta: Apple&rsquo;s Developer Program signing costs about
            ₹8,000 a year, which we&rsquo;ll pay for once paying users justify it. The alert is
            macOS doing its job, not a sign of something wrong.
          </>
        }
        branch={{
          title: "you tried Control-click → Open and nothing helped",
          body: (
            <>
              That shortcut worked before macOS 15; Apple removed it in Sequoia, so on macOS 15
              and later the Open choice never lets you through. The steps here work on every
              version, so use them instead.
            </>
          )
        }}
      >
        <p>
          Open the Applications folder (Finder → sidebar → Applications) and{" "}
          <strong className="text-ink">double-click Sanketra Desktop</strong>. macOS shows an
          alert saying Apple cannot check it for malicious software. It offers only{" "}
          <strong className="text-ink">Move to Trash</strong> and{" "}
          <strong className="text-ink">Done</strong>.
        </p>
        <p>
          Click <strong className="text-ink">Done</strong>. That closes the alert and leaves the
          app where it is. This failed attempt is what makes macOS offer the override in the next
          step.
        </p>
      </StepBlock>

      <StepBlock
        index={5}
        total={TOTAL}
        title="Allow it in System Settings → Privacy & Security"
        visual={{
          kind: "mockup",
          node: <OpenAnywayMockup />
        }}
        branch={{
          title: "there is no Open Anyway button",
          body: (
            <>
              macOS offers the button for about an hour after the blocked attempt. If it has
              gone, repeat step 4 and come straight back to this page of System Settings.
            </>
          )
        }}
      >
        <p>
          Choose <strong className="text-ink">Apple menu → System Settings</strong>, click{" "}
          <strong className="text-ink">Privacy &amp; Security</strong> in the sidebar, and scroll
          down to the <strong className="text-ink">Security</strong> section. It says Sanketra
          Desktop was blocked, with an <strong className="text-ink">Open Anyway</strong> button.
          Click it.
        </p>
      </StepBlock>

      <StepBlock
        index={6}
        total={TOTAL}
        title="Confirm with Open, then your password"
        visual={{
          kind: "mockup",
          node: (
            <WarningDialogMockup
              title="Apple cannot check “Sanketra Desktop” for malicious software"
              body="You allowed it in System Settings. Confirm once more with Open, then enter your Mac login password."
              rejectLabel="Move to Trash"
              hintLabel="Open"
            />
          )
        }}
      >
        <p>
          The warning prompt comes back. This time click <strong className="text-ink">Open</strong>,
          then enter your Mac login password and click <strong className="text-ink">OK</strong>.
          Sanketra launches.
        </p>
        <p>
          macOS saves your decision as an exception for this app, so from now on a normal
          double-click works. A different build you download later may need these steps again.
        </p>
      </StepBlock>

      <StepBlock
        index={7}
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
          The first time Sanketra opens the mic, macOS shows its own system dialog asking whether
          Sanketra may access the microphone. Click <strong className="text-ink">Allow</strong>.
        </p>
        <p>
          Sanketra needs the mic for the obvious reason — that&rsquo;s how dictation works. The
          reason line in the dialog comes from Sanketra&rsquo;s own bundle: it needs your microphone
          to dictate speech into text, and the audio is processed locally on your Mac.
        </p>
      </StepBlock>

      <StepBlock
        index={8}
        total={TOTAL}
        title="Sanketra asks for Accessibility and Input Monitoring access"
        visual={{
          kind: "mockup",
          node: (
            <WarningDialogMockup
              title="Sanketra needs Accessibility + Input Monitoring access."
              body="Seeing global key presses needs Input Monitoring; typing into other apps needs Accessibility. Without both, the hotkey silently does nothing."
              rejectLabel="Later"
              hintLabel="Open Accessibility"
            />
          )
        }}
        reassurance={
          <>
            Both permissions are needed, not one or the other. Input Monitoring lets Sanketra see
            your hotkey while you work in other apps; Accessibility lets it type the recognized
            text at your cursor. Missing either one means the hotkey silently does nothing. Both
            are one-time grants.
          </>
        }
      >
        <p>
          When Sanketra starts and either permission is missing, it asks macOS for both, so you
          may see a system prompt for each. It then shows its own window, titled{" "}
          <em className="serif-italic">&ldquo;Sanketra &middot; Permission needed&rdquo;</em>:{" "}
          <em className="serif-italic">&ldquo;Sanketra needs Accessibility + Input Monitoring
          access.&rdquo;</em>
        </p>
        <p>
          The window has three buttons: <strong className="text-ink">Open Accessibility</strong>,{" "}
          <strong className="text-ink">Open Input Monitoring</strong> and{" "}
          <strong className="text-ink">Later</strong>. The first two open the matching page of
          System Settings and leave this window open, so you can visit both. <strong
          className="text-ink">Later</strong> closes it; Sanketra asks again the next time it starts
          while either permission is still missing.
        </p>
      </StepBlock>

      <StepBlock
        index={9}
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
          Click <strong className="text-ink">Open Accessibility</strong>. System Settings opens at
          Privacy &amp; Security → Accessibility. Find{" "}
          <strong className="text-ink">Sanketra Desktop</strong> in the list and click the toggle
          to switch it ON. macOS asks for your account password (or Touch ID) to confirm.
        </p>
      </StepBlock>

      <StepBlock
        index={10}
        total={TOTAL}
        title="Toggle Sanketra Desktop ON in Input Monitoring too"
        visual={{
          kind: "mockup",
          node: <InputMonitoringMockup />
        }}
        reassurance={
          <>
            This is a separate pane from Accessibility. Granting Accessibility alone leaves the
            hotkey listener with no key events at all and no error message, so if the hotkey
            does nothing after Accessibility is granted, check this switch first.
          </>
        }
        branch={{
          title: "Sanketra Desktop is not in the Input Monitoring list yet",
          body: (
            <>
              Click the <strong className="text-ink">+</strong> button at the bottom of the
              list, choose Sanketra Desktop from Applications, click{" "}
              <strong className="text-ink">Open</strong>, then switch it on.
            </>
          )
        }}
      >
        <p>
          This step is required, not a fallback. Go back to Sanketra&rsquo;s window and click{" "}
          <strong className="text-ink">Open Input Monitoring</strong> (or open System Settings →
          Privacy &amp; Security → Input Monitoring yourself), find{" "}
          <strong className="text-ink">Sanketra Desktop</strong> and toggle it ON.
        </p>
      </StepBlock>

      <StepBlock
        index={11}
        total={TOTAL}
        title="Quit Sanketra and relaunch"
        visual={{
          kind: "mockup",
          node: <QuitRelaunchMockup />
        }}
        reassurance={
          <>
            Sanketra&rsquo;s own permission window ends with the same instruction: toggle both,
            then quit and relaunch Sanketra. Do not skip it.
          </>
        }
      >
        <p>
          Once both switches are on, press <kbd className="font-mono text-accent">⌘ Q</kbd> to quit
          Sanketra (or right-click its Dock icon → Quit). Then relaunch it from Applications —
          this time a normal double-click works, and the permission window does not come back.
        </p>
      </StepBlock>

      <StepBlock
        index={12}
        total={TOTAL}
        title="Hold ⌃ ⌥ (Ctrl + Option), say something, release"
        visual={{ kind: "image", src: "/screenshots/app/main-window.png", alt: "Sanketra Desktop's main window after setup: the Start dictation button, push-to-talk / click-toggle / always-on modes, the Ctrl + Alt hotkey and the microphone privacy switch" }}
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
