// Brand-controlled UI mockups for the /desktop install guide.
//
// Why inline SVG instead of screenshots: these depict Sanketra's OWN UI —
// the main window, our permission prompt, the tray menu. We control the
// design, so a vector mockup stays pixel-clean at every zoom level and
// never drifts out of sync with our brand palette. OS-chrome surfaces
// (Gatekeeper dialog, SmartScreen warning, Finder, Files) belong to
// Apple/Microsoft/GNOME — those will be captured screenshots, not
// invented SVGs (would mislead users about what they actually see).
//
// Palette comes from CSS vars in globals.css so dark-mode tweaks ripple
// here automatically: --paper, --ink, --ink-muted, --ink-faint, --rule,
// --accent (green), --accent-warm (accent).

import type { CSSProperties } from "react";

const PAPER: CSSProperties = { fill: "var(--paper)" };
const SURFACE: CSSProperties = { fill: "var(--surface)" };
const SURFACE_2: CSSProperties = { fill: "var(--surface-2)" };
const RULE: CSSProperties = { stroke: "var(--rule)", fill: "none" };
const INK: CSSProperties = { fill: "var(--ink)" };
const MUTED: CSSProperties = { fill: "var(--ink-muted)" };
const FAINT: CSSProperties = { fill: "var(--ink-faint)" };
const SAFFRON: CSSProperties = { fill: "var(--accent-warm)" };
const GREEN: CSSProperties = { fill: "var(--accent)" };

/* -------------------------------------------------------------------------- */
/* MOCKUP 1 — Sanketra Desktop main window                                   */
/* -------------------------------------------------------------------------- */
//
// Shows what the user sees after launching successfully: eyebrow tag,
// big headline with hold-key copy, mode strip, mic card.
// 720x560 viewBox renders crisp at any container width.

export function MainWindowMockup({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 720 560"
      className={className}
      role="img"
      aria-label="Sanketra Desktop main window after first launch"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Sanketra Desktop — main window after first launch</title>

      {/* outer frame — neutral, no OS chrome */}
      <rect x="0" y="0" width="720" height="560" rx="14" style={PAPER} />
      <rect x="0.5" y="0.5" width="719" height="559" rx="13.5" style={{ ...RULE, strokeWidth: 1 }} />

      {/* top bar with traffic-dot triplet (neutral grey, not OS specific) */}
      <g transform="translate(20 18)">
        <circle cx="6" cy="6" r="5" style={FAINT} />
        <circle cx="22" cy="6" r="5" style={FAINT} />
        <circle cx="38" cy="6" r="5" style={FAINT} />
      </g>

      {/* nav icon strip top-right */}
      <g transform="translate(580 14)" style={{ ...FAINT }}>
        {[0, 32, 64, 96].map((x) => (
          <rect key={x} x={x} y={0} width={24} height={24} rx={4} style={SURFACE} />
        ))}
        {/* settings cog */}
        <circle cx="12" cy="12" r="5" style={{ stroke: "var(--ink-muted)", strokeWidth: 1.2, fill: "none" }} />
        <circle cx="12" cy="12" r="1.6" style={MUTED} />
        {/* download arrow */}
        <path d="M 44 8 v 8 m -4 -4 l 4 4 l 4 -4 M 38 18 h 12" style={{ stroke: "var(--ink-muted)", strokeWidth: 1.2, fill: "none", strokeLinecap: "round" }} />
        {/* history clock */}
        <circle cx="76" cy="12" r="6" style={{ stroke: "var(--ink-muted)", strokeWidth: 1.2, fill: "none" }} />
        <path d="M 76 8 v 4 l 3 2" style={{ stroke: "var(--ink-muted)", strokeWidth: 1.2, fill: "none", strokeLinecap: "round" }} />
        {/* info i */}
        <circle cx="108" cy="12" r="6" style={{ stroke: "var(--ink-muted)", strokeWidth: 1.2, fill: "none" }} />
        <circle cx="108" cy="9.4" r="0.9" style={MUTED} />
        <path d="M 108 11.8 v 4.5" style={{ stroke: "var(--ink-muted)", strokeWidth: 1.2, strokeLinecap: "round" }} />
      </g>

      {/* eyebrow */}
      <text x="44" y="92" fontFamily="var(--font-mono), monospace" fontSize="11" letterSpacing="2.2" style={SAFFRON}>
        DICTATION READY
      </text>

      {/* big headline — sans + serif italic */}
      <text x="44" y="148" fontFamily="var(--font-sans), sans-serif" fontSize="46" fontWeight="600" style={INK}>
        Hold
      </text>
      <text x="138" y="148" fontFamily="var(--font-serif), serif" fontSize="46" fontStyle="italic" style={SAFFRON}>
        Ctrl+Alt
      </text>
      <text x="44" y="200" fontFamily="var(--font-sans), sans-serif" fontSize="46" fontWeight="600" style={INK}>
        to start talking.
      </text>

      {/* sub copy */}
      <text x="44" y="240" fontFamily="var(--font-sans), sans-serif" fontSize="14" style={MUTED}>
        Release the keys to transcribe. Text types at your cursor.
      </text>

      {/* MODE strip — three tabs */}
      <text x="44" y="296" fontFamily="var(--font-mono), monospace" fontSize="10" letterSpacing="2" style={FAINT}>
        MODE
      </text>
      <g transform="translate(44 308)">
        {/* hold (active) */}
        <rect x="0" y="0" width="120" height="40" rx="6" style={SURFACE_2} />
        <rect x="0.5" y="0.5" width="119" height="39" rx="5.5" style={{ stroke: "var(--accent-warm)", fill: "none" }} />
        <text x="16" y="25" fontFamily="var(--font-sans), sans-serif" fontSize="13" fontWeight="500" style={SAFFRON}>
          Hold
        </text>
        <text x="58" y="25" fontFamily="var(--font-mono), monospace" fontSize="10" style={FAINT}>
          PTT
        </text>
        {/* always-on */}
        <rect x="132" y="0" width="120" height="40" rx="6" style={SURFACE} />
        <text x="148" y="25" fontFamily="var(--font-sans), sans-serif" fontSize="13" style={MUTED}>
          Always-on
        </text>
        {/* toggle */}
        <rect x="264" y="0" width="120" height="40" rx="6" style={SURFACE} />
        <text x="280" y="25" fontFamily="var(--font-sans), sans-serif" fontSize="13" style={MUTED}>
          Toggle
        </text>
      </g>

      {/* MIC card */}
      <text x="44" y="396" fontFamily="var(--font-mono), monospace" fontSize="10" letterSpacing="2" style={FAINT}>
        MIC
      </text>
      <g transform="translate(44 408)">
        <rect x="0" y="0" width="632" height="92" rx="8" style={SURFACE} />
        <rect x="0.5" y="0.5" width="631" height="91" rx="7.5" style={{ stroke: "var(--rule)", fill: "none" }} />
        {/* mic glyph circle */}
        <circle cx="40" cy="46" r="20" style={SURFACE_2} />
        <rect x="34" y="32" width="12" height="20" rx="6" style={GREEN} />
        <path d="M 28 44 v 4 a 12 12 0 0 0 24 0 v -4 M 40 60 v 6" style={{ stroke: "var(--accent)", strokeWidth: 1.4, fill: "none", strokeLinecap: "round" }} />
        {/* device name */}
        <text x="80" y="42" fontFamily="var(--font-sans), sans-serif" fontSize="14" fontWeight="500" style={INK}>
          MacBook Pro Microphone
        </text>
        <text x="80" y="62" fontFamily="var(--font-mono), monospace" fontSize="11" style={MUTED}>
          48 kHz · 1 ch · ready
        </text>
        {/* meter bars */}
        <g transform="translate(440 28)">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
            <rect
              key={i}
              x={i * 14}
              y={28 - i * 1.4}
              width={8}
              height={i * 1.4 + 8}
              rx={1.5}
              style={i < 5 ? GREEN : i < 9 ? SAFFRON : { fill: "var(--ink-faint)" }}
            />
          ))}
        </g>
      </g>

      {/* footer hint */}
      <text x="44" y="528" fontFamily="var(--font-deva), serif" fontSize="13" style={MUTED}>
        बोल — टाइप हो जाए
      </text>
      <text x="676" y="528" textAnchor="end" fontFamily="var(--font-mono), monospace" fontSize="10" letterSpacing="1.8" style={FAINT}>
        v0.4.2
      </text>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* MOCKUP 2 — Sanketra's own permission prompt                                */
/* -------------------------------------------------------------------------- */
//
// Shown after macOS issues the system mic prompt. Uses the EXACT copy from
// Info.plist NSMicrophoneUsageDescription so the user recognizes it at the
// real moment. OS-neutral chrome — rounded rectangle, no traffic lights or
// Win frame, because both Mac and Win render this same dialog.

export function PermissionPromptMockup({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 360"
      className={className}
      role="img"
      aria-label="Sanketra's microphone permission prompt"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Sanketra microphone permission prompt — first launch</title>

      {/* dialog drop shadow */}
      <rect x="40" y="40" width="480" height="280" rx="14" fill="#000" opacity="0.45" />
      {/* dialog body */}
      <rect x="32" y="32" width="480" height="280" rx="12" style={SURFACE} />
      <rect x="32.5" y="32.5" width="479" height="279" rx="11.5" style={{ stroke: "var(--rule)", fill: "none" }} />

      {/* app icon — स glyph in rounded square */}
      <g transform="translate(60 64)">
        <rect x="0" y="0" width="56" height="56" rx="12" style={{ fill: "var(--accent-warm)" }} />
        <text
          x="28"
          y="40"
          textAnchor="middle"
          fontFamily="var(--font-deva), serif"
          fontSize="32"
          style={{ fill: "var(--paper)" }}
        >
          स
        </text>
      </g>

      {/* title */}
      <text x="140" y="86" fontFamily="var(--font-sans), sans-serif" fontSize="17" fontWeight="600" style={INK}>
        Sanketra would like to access the microphone.
      </text>

      {/* body — exact NSMicrophoneUsageDescription from Info.plist */}
      <foreignObject x="60" y="148" width="424" height="100">
        <div
          style={{
            font: "13px/1.55 var(--font-sans), sans-serif",
            color: "var(--ink-muted)"
          }}
        >
          Sanketra needs your microphone to dictate speech into text. Audio is processed
          locally on your Mac and never leaves your device.
        </div>
      </foreignObject>

      {/* button row — accent primary, ghost secondary */}
      <g transform="translate(60 256)">
        <rect x="218" y="0" width="100" height="36" rx="6" style={SURFACE_2} />
        <rect x="218.5" y="0.5" width="99" height="35" rx="5.5" style={{ stroke: "var(--rule)", fill: "none" }} />
        <text x="268" y="23" textAnchor="middle" fontFamily="var(--font-sans), sans-serif" fontSize="13" style={MUTED}>
          Don&apos;t Allow
        </text>
        <rect x="328" y="0" width="96" height="36" rx="6" style={{ fill: "var(--accent-warm)" }} />
        <text x="376" y="23" textAnchor="middle" fontFamily="var(--font-sans), sans-serif" fontSize="13" fontWeight="600" style={{ fill: "var(--paper)" }}>
          Allow
        </text>
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* MOCKUP 3 — Tray icon + dropdown menu                                       */
/* -------------------------------------------------------------------------- */
//
// Shows the स system-tray glyph + the dropdown menu that opens when the user
// clicks it. Menu items mirror desktop/sanketra_desktop.py::_build_tray_menu
// 1:1 (Open / Idle / Hotkey / Start dictation / Always-on / Mic enabled /
// History / Settings / Check for updates / About / Quit).

export function TrayMenuMockup({ className }: { className?: string }) {
  const menu = [
    { kind: "primary", label: "Open Sanketra…", shortcut: "↵" },
    { kind: "sep" as const },
    { kind: "status", label: "Idle" },
    { kind: "status", label: "Hotkey: Ctrl + Alt  (PTT)" },
    { kind: "sep" as const },
    { kind: "item", label: "Start dictation" },
    { kind: "check", label: "Always-on dictation", checked: false },
    { kind: "check", label: "Mic enabled", checked: true },
    { kind: "sep" as const },
    { kind: "item", label: "History…" },
    { kind: "item", label: "Settings…" },
    { kind: "item", label: "Check for updates" },
    { kind: "sep" as const },
    { kind: "item", label: "About Sanketra Desktop" },
    { kind: "item", label: "Report a problem…" },
    { kind: "sep" as const },
    { kind: "danger", label: "Quit Sanketra" }
  ];

  // Compute menu height. Separators = 9px, rows = 26px.
  const rowH = 26;
  const sepH = 9;
  const yPositions: number[] = [];
  let cursor = 8;
  menu.forEach((m) => {
    yPositions.push(cursor);
    cursor += m.kind === "sep" ? sepH : rowH;
  });
  cursor += 8;

  return (
    <svg
      viewBox={`0 0 380 ${cursor + 60}`}
      className={className}
      role="img"
      aria-label="Sanketra system tray icon and menu"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Sanketra tray menu — what each item does</title>

      {/* system tray strip */}
      <rect x="0" y="0" width="380" height="36" rx="0" style={PAPER} />
      <line x1="0" y1="35.5" x2="380" y2="35.5" style={RULE} />

      {/* other tray icons (greyed) */}
      <g style={FAINT}>
        <circle cx="40" cy="18" r="6" />
        <rect x="68" y="12" width="12" height="12" rx="2" />
        <path d="M 104 22 L 110 12 L 116 22 Z" />
      </g>

      {/* Sanketra tray icon with halo to show it's clicked */}
      <g transform="translate(132 4)">
        <rect x="0" y="0" width="28" height="28" rx="6" style={{ fill: "var(--accent-warm)", opacity: 0.16 }} />
        <text x="14" y="22" textAnchor="middle" fontFamily="var(--font-deva), serif" fontSize="17" style={SAFFRON}>
          स
        </text>
      </g>

      {/* connector arrow from icon to menu */}
      <path d="M 146 36 L 146 48" style={{ stroke: "var(--accent-warm)", strokeWidth: 1.5, fill: "none" }} />

      {/* menu container */}
      <rect x="20" y="48" width="340" height={cursor + 4} rx="8" style={SURFACE} />
      <rect x="20.5" y="48.5" width="339" height={cursor + 3} rx="7.5" style={{ stroke: "var(--rule)", fill: "none" }} />

      {/* menu items */}
      {menu.map((item, idx) => {
        const y = 48 + yPositions[idx];
        if (item.kind === "sep") {
          return <line key={idx} x1="32" y1={y + 4} x2="348" y2={y + 4} style={RULE} />;
        }
        return (
          <g key={idx} transform={`translate(0 ${y})`}>
            {item.kind === "check" && (
              <g transform="translate(36 7)">
                <rect x="0" y="0" width="12" height="12" rx="2" style={item.checked ? { fill: "var(--accent-warm)" } : SURFACE_2} />
                {item.checked && (
                  <path d="M 3 6 l 3 3 l 5 -6" style={{ stroke: "var(--paper)", strokeWidth: 1.6, fill: "none" }} />
                )}
              </g>
            )}
            <text
              x={item.kind === "check" ? 58 : 36}
              y="17"
              fontFamily="var(--font-sans), sans-serif"
              fontSize="12.5"
              fontWeight={item.kind === "primary" ? 600 : 400}
              style={
                item.kind === "status"
                  ? FAINT
                  : item.kind === "danger"
                  ? { fill: "var(--accent)" }
                  : item.kind === "primary"
                  ? SAFFRON
                  : INK
              }
            >
              {item.label}
            </text>
            {item.kind === "primary" && (
              <text x="344" y="17" textAnchor="end" fontFamily="var(--font-mono), monospace" fontSize="11" style={FAINT}>
                {(item as { shortcut?: string }).shortcut}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* MOCKUP 4 — Generic OS warning placeholder                                  */
/* -------------------------------------------------------------------------- */
//
// Editorial illustration only — schematic of a Gatekeeper/SmartScreen dialog.
// Used as a placeholder where a real screenshot will eventually slot in.
// Annotated arrow points to the "escape hatch" button the user should click.

export function WarningDialogMockup({
  className,
  title,
  body,
  rejectLabel,
  hintLabel
}: {
  className?: string;
  title: string;
  body: string;
  rejectLabel: string;
  hintLabel: string;
}) {
  return (
    <svg
      viewBox="0 0 560 320"
      className={className}
      role="img"
      aria-label={`OS warning dialog — ${title}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>

      {/* warning icon (triangle with !) */}
      <g transform="translate(60 70)">
        <path d="M 28 0 L 56 48 L 0 48 Z" style={{ fill: "var(--accent-warm)" }} />
        <rect x="26" y="14" width="4" height="20" rx="1" style={{ fill: "var(--paper)" }} />
        <circle cx="28" cy="40" r="2.2" style={{ fill: "var(--paper)" }} />
      </g>

      {/* dialog shadow + body */}
      <rect x="142" y="46" width="372" height="232" rx="12" fill="#000" opacity="0.4" />
      <rect x="138" y="40" width="372" height="232" rx="10" style={SURFACE} />
      <rect x="138.5" y="40.5" width="371" height="231" rx="9.5" style={{ stroke: "var(--rule)", fill: "none" }} />

      <text x="158" y="78" fontFamily="var(--font-sans), sans-serif" fontSize="15" fontWeight="600" style={INK}>
        {title}
      </text>

      <foreignObject x="158" y="98" width="332" height="100">
        <div style={{ font: "12.5px/1.6 var(--font-sans), sans-serif", color: "var(--ink-muted)" }}>
          {body}
        </div>
      </foreignObject>

      {/* dimmed reject button */}
      <g transform="translate(158 216)">
        <rect x="0" y="0" width="92" height="34" rx="5" style={SURFACE_2} />
        <text x="46" y="22" textAnchor="middle" fontFamily="var(--font-sans), sans-serif" fontSize="12" style={MUTED}>
          {rejectLabel}
        </text>
      </g>

      {/* highlighted escape button */}
      <g transform="translate(370 216)">
        <rect x="-4" y="-4" width="120" height="42" rx="8" style={{ fill: "var(--accent-warm)", opacity: 0.18 }} />
        <rect x="0" y="0" width="112" height="34" rx="6" style={{ fill: "var(--accent-warm)" }} />
        <text x="56" y="22" textAnchor="middle" fontFamily="var(--font-sans), sans-serif" fontSize="12" fontWeight="600" style={{ fill: "var(--paper)" }}>
          {hintLabel}
        </text>
      </g>

      {/* annotation arrow */}
      <g style={{ stroke: "var(--accent-warm)", strokeWidth: 1.5, fill: "none" }}>
        <path d="M 510 180 q 30 -10 -10 30" />
        <path d="M 504 208 l 6 6 l 6 -6" />
      </g>
      <text x="500" y="172" textAnchor="end" fontFamily="var(--font-mono), monospace" fontSize="9.5" letterSpacing="1.4" style={SAFFRON}>
        CLICK THIS
      </text>
    </svg>
  );
}

/* ========================================================================== */
/* OS-CHROME MOCKUPS — brand-controlled illustrations of OS-native surfaces.  */
/*                                                                            */
/* These are SCHEMATIC representations of OS dialogs (Finder, Explorer, Files */
/* manager, Gatekeeper, SmartScreen, etc). They render the SHAPE and the     */
/* COPY users will see, not pixel-identical replicas of Apple/Microsoft/GNOME */
/* chrome — that would be lying about what they'll see and would drift the   */
/* moment those OSes ship a redesign. The dark editorial palette signals     */
/* "this is a Sanketra illustration of the OS dialog" rather than pretending */
/* to be the real thing. Labels (window titles, button names, paths) are     */
/* sourced verbatim from the install flow.                                   */
/* ========================================================================== */

/* -------------------------------------------------------------------------- */
/* MAC 1 — Finder Downloads folder showing the .dmg                          */
/* -------------------------------------------------------------------------- */

export function FinderDownloadsMockup({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 360"
      className={className}
      role="img"
      aria-label="Finder window showing Sanketra-Desktop-universal.dmg in the Downloads folder"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Finder · Downloads · Sanketra-Desktop-universal.dmg</title>

      {/* window frame */}
      <rect x="0" y="0" width="560" height="360" rx="12" style={SURFACE} />
      <rect x="0.5" y="0.5" width="559" height="359" rx="11.5" style={{ ...RULE, strokeWidth: 1 }} />

      {/* title bar with traffic lights */}
      <rect x="0" y="0" width="560" height="44" rx="12" style={SURFACE_2} />
      <rect x="0" y="32" width="560" height="12" style={SURFACE_2} />
      <circle cx="20" cy="22" r="5" style={FAINT} />
      <circle cx="36" cy="22" r="5" style={FAINT} />
      <circle cx="52" cy="22" r="5" style={FAINT} />
      <text x="280" y="27" textAnchor="middle" fontFamily="var(--font-sans), sans-serif" fontSize="12" fontWeight="500" style={MUTED}>
        Downloads
      </text>

      {/* sidebar */}
      <rect x="0" y="44" width="148" height="316" style={PAPER} />
      <line x1="148" y1="44" x2="148" y2="360" style={RULE} />
      {["Favorites", "Recents", "Applications", "Desktop", "Documents", "Downloads"].map((label, i) => {
        const isActive = label === "Downloads";
        return (
          <g key={label}>
            {isActive && <rect x="8" y={60 + i * 28} width="132" height="22" rx="4" style={{ fill: "var(--accent-warm)", opacity: 0.16 }} />}
            <text x="22" y={75 + i * 28} fontFamily="var(--font-sans), sans-serif" fontSize="11.5" style={isActive ? SAFFRON : MUTED}>
              {label}
            </text>
          </g>
        );
      })}

      {/* file list header */}
      <text x="170" y="68" fontFamily="var(--font-mono), monospace" fontSize="10" letterSpacing="1.6" style={FAINT}>
        NAME
      </text>
      <text x="440" y="68" fontFamily="var(--font-mono), monospace" fontSize="10" letterSpacing="1.6" style={FAINT}>
        SIZE
      </text>
      <line x1="160" y1="78" x2="540" y2="78" style={RULE} />

      {/* file row — highlighted */}
      <rect x="160" y="86" width="380" height="34" rx="4" style={{ fill: "var(--accent-warm)", opacity: 0.10 }} />
      {/* dmg icon */}
      <g transform="translate(174 92)">
        <rect x="0" y="0" width="22" height="22" rx="3" style={{ fill: "var(--accent-warm)", opacity: 0.5 }} />
        <text x="11" y="16" textAnchor="middle" fontFamily="var(--font-mono), monospace" fontSize="8" fontWeight="700" style={{ fill: "var(--paper)" }}>
          DMG
        </text>
      </g>
      <text x="208" y="108" fontFamily="var(--font-sans), sans-serif" fontSize="12.5" fontWeight="500" style={INK}>
        Sanketra-Desktop-universal.dmg
      </text>
      <text x="440" y="108" fontFamily="var(--font-mono), monospace" fontSize="11" style={MUTED}>
        112 MB
      </text>

      {/* annotation arrow */}
      <g style={{ stroke: "var(--accent-warm)", strokeWidth: 1.4, fill: "none" }}>
        <path d="M 540 220 q -30 -40 -60 -100" />
        <path d="M 480 124 l -3 -7 l 7 1" />
      </g>
      <text x="544" y="232" fontFamily="var(--font-mono), monospace" fontSize="9.5" letterSpacing="1.4" style={SAFFRON}>
        DOUBLE-CLICK
      </text>
      <text x="544" y="248" fontFamily="var(--font-mono), monospace" fontSize="9.5" letterSpacing="1.4" style={SAFFRON}>
        TO MOUNT
      </text>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* MAC 2 — Mounted DMG window with app + Applications shortcut               */
/* -------------------------------------------------------------------------- */

export function DmgMountedMockup({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 360"
      className={className}
      role="img"
      aria-label="Mounted DMG window with Sanketra Desktop on the left, Applications shortcut on the right, arrow between them"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>DMG mounted · drag Sanketra Desktop to Applications</title>

      <rect x="0" y="0" width="560" height="360" rx="12" style={SURFACE} />
      <rect x="0.5" y="0.5" width="559" height="359" rx="11.5" style={{ ...RULE, strokeWidth: 1 }} />

      {/* title bar */}
      <rect x="0" y="0" width="560" height="44" rx="12" style={SURFACE_2} />
      <rect x="0" y="32" width="560" height="12" style={SURFACE_2} />
      <circle cx="20" cy="22" r="5" style={FAINT} />
      <circle cx="36" cy="22" r="5" style={FAINT} />
      <circle cx="52" cy="22" r="5" style={FAINT} />
      <text x="280" y="27" textAnchor="middle" fontFamily="var(--font-sans), sans-serif" fontSize="12" fontWeight="500" style={MUTED}>
        Sanketra Desktop
      </text>

      {/* app icon (left) */}
      <g transform="translate(120 110)">
        <rect x="0" y="0" width="88" height="88" rx="18" style={{ fill: "var(--accent-warm)" }} />
        <text x="44" y="60" textAnchor="middle" fontFamily="var(--font-deva), serif" fontSize="46" style={{ fill: "var(--paper)" }}>
          स
        </text>
      </g>
      <text x="164" y="226" textAnchor="middle" fontFamily="var(--font-sans), sans-serif" fontSize="12" fontWeight="500" style={INK}>
        Sanketra Desktop
      </text>
      <text x="164" y="244" textAnchor="middle" fontFamily="var(--font-mono), monospace" fontSize="10" style={FAINT}>
        Application
      </text>

      {/* drag arrow */}
      <g style={{ stroke: "var(--accent-warm)", strokeWidth: 2, fill: "none" }}>
        <path d="M 230 154 L 330 154" />
        <path d="M 322 148 L 332 154 L 322 160" />
      </g>
      <text x="280" y="138" textAnchor="middle" fontFamily="var(--font-mono), monospace" fontSize="10" letterSpacing="1.6" style={SAFFRON}>
        DRAG
      </text>

      {/* Applications icon (right) */}
      <g transform="translate(352 110)" style={{ opacity: 0.85 }}>
        <rect x="0" y="0" width="88" height="88" rx="18" style={SURFACE_2} />
        <g transform="translate(20 22)">
          <rect x="0" y="0" width="14" height="14" rx="2" style={MUTED} />
          <rect x="18" y="0" width="14" height="14" rx="2" style={MUTED} />
          <rect x="36" y="0" width="14" height="14" rx="2" style={MUTED} />
          <rect x="0" y="18" width="14" height="14" rx="2" style={MUTED} />
          <rect x="18" y="18" width="14" height="14" rx="2" style={SAFFRON} />
          <rect x="36" y="18" width="14" height="14" rx="2" style={MUTED} />
          <rect x="0" y="36" width="14" height="14" rx="2" style={MUTED} />
          <rect x="18" y="36" width="14" height="14" rx="2" style={MUTED} />
          <rect x="36" y="36" width="14" height="14" rx="2" style={MUTED} />
        </g>
      </g>
      <text x="396" y="226" textAnchor="middle" fontFamily="var(--font-sans), sans-serif" fontSize="12" fontWeight="500" style={INK}>
        Applications
      </text>
      <text x="396" y="244" textAnchor="middle" fontFamily="var(--font-mono), monospace" fontSize="10" style={FAINT}>
        Shortcut
      </text>

      {/* footer hint */}
      <text x="280" y="320" textAnchor="middle" fontFamily="var(--font-deva), serif" fontSize="13" style={MUTED}>
        खींचो — drag into Applications
      </text>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* MAC 3 — Drag gesture (alternate view for step 3)                          */
/* -------------------------------------------------------------------------- */

export function DragToAppsMockup({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 320"
      className={className}
      role="img"
      aria-label="Drag gesture moving Sanketra Desktop into the Applications shortcut"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Drag · cursor mid-motion between Sanketra and Applications</title>

      <rect x="0" y="0" width="560" height="320" rx="12" style={SURFACE} />
      <rect x="0.5" y="0.5" width="559" height="319" rx="11.5" style={{ ...RULE, strokeWidth: 1 }} />

      {/* faint app icon at start position */}
      <g transform="translate(60 100)" style={{ opacity: 0.35 }}>
        <rect x="0" y="0" width="68" height="68" rx="14" style={{ fill: "var(--accent-warm)" }} />
        <text x="34" y="48" textAnchor="middle" fontFamily="var(--font-deva), serif" fontSize="36" style={{ fill: "var(--paper)" }}>
          स
        </text>
      </g>

      {/* cursor + dragged icon mid-flight */}
      <g transform="translate(250 130)">
        <rect x="0" y="0" width="68" height="68" rx="14" style={{ fill: "var(--accent-warm)" }} />
        <text x="34" y="48" textAnchor="middle" fontFamily="var(--font-deva), serif" fontSize="36" style={{ fill: "var(--paper)" }}>
          स
        </text>
        {/* mac cursor */}
        <g transform="translate(56 56)">
          <path d="M 0 0 L 0 18 L 5 14 L 9 22 L 12 20 L 8 12 L 14 12 Z" style={INK} />
          <path d="M 0 0 L 0 18 L 5 14 L 9 22 L 12 20 L 8 12 L 14 12 Z" style={{ stroke: "var(--paper)", strokeWidth: 0.6, fill: "none" }} />
        </g>
      </g>

      {/* motion lines */}
      <g style={{ stroke: "var(--accent-warm)", strokeWidth: 1.2, fill: "none", opacity: 0.6 }}>
        <path d="M 134 134 q 50 -10 116 0" strokeDasharray="3 3" />
        <path d="M 130 152 q 60 0 122 4" strokeDasharray="3 3" />
        <path d="M 134 170 q 50 12 116 4" strokeDasharray="3 3" />
      </g>

      {/* Applications target with drop highlight */}
      <g transform="translate(420 100)">
        <rect x="-4" y="-4" width="76" height="76" rx="16" style={{ fill: "var(--accent-warm)", opacity: 0.18 }} />
        <rect x="0" y="0" width="68" height="68" rx="14" style={SURFACE_2} />
        <g transform="translate(16 18)">
          {[0, 18, 36].map((x) =>
            [0, 14, 28].map((y) => (
              <rect key={`${x}-${y}`} x={x} y={y} width="10" height="10" rx="1.6" style={x === 18 && y === 14 ? SAFFRON : MUTED} />
            ))
          )}
        </g>
      </g>

      <text x="454" y="200" textAnchor="middle" fontFamily="var(--font-sans), sans-serif" fontSize="12" fontWeight="500" style={INK}>
        Applications
      </text>

      <text x="280" y="278" textAnchor="middle" fontFamily="var(--font-mono), monospace" fontSize="10.5" letterSpacing="2" style={SAFFRON}>
        DRAG · DON&apos;T DOUBLE-CLICK IN THE DMG
      </text>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* MAC 4 — Right-click context menu                                          */
/* -------------------------------------------------------------------------- */

export function RightClickMenuMockup({ className }: { className?: string }) {
  const items = ["Open", "Move to Trash", "Get Info", "Rename", "Compress", "Duplicate", "Make Alias", "Quick Look"];
  return (
    <svg
      viewBox="0 0 460 360"
      className={className}
      role="img"
      aria-label="Right-click context menu on Sanketra Desktop with Open highlighted"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Right-click · context menu · choose Open</title>

      <rect x="0" y="0" width="460" height="360" rx="12" style={PAPER} />

      {/* faint app icon */}
      <g transform="translate(60 60)">
        <rect x="0" y="0" width="58" height="58" rx="12" style={{ fill: "var(--accent-warm)" }} />
        <text x="29" y="42" textAnchor="middle" fontFamily="var(--font-deva), serif" fontSize="30" style={{ fill: "var(--paper)" }}>
          स
        </text>
      </g>
      <text x="89" y="138" textAnchor="middle" fontFamily="var(--font-sans), sans-serif" fontSize="11.5" fontWeight="500" style={INK}>
        Sanketra Desktop
      </text>

      {/* mac cursor */}
      <g transform="translate(118 92)">
        <path d="M 0 0 L 0 18 L 5 14 L 9 22 L 12 20 L 8 12 L 14 12 Z" style={INK} />
        <path d="M 0 0 L 0 18 L 5 14 L 9 22 L 12 20 L 8 12 L 14 12 Z" style={{ stroke: "var(--paper)", strokeWidth: 0.6, fill: "none" }} />
      </g>

      {/* context menu */}
      <g transform="translate(130 110)">
        <rect x="0" y="0" width="220" height={items.length * 24 + 16} rx="8" style={SURFACE} />
        <rect x="0.5" y="0.5" width="219" height={items.length * 24 + 15} rx="7.5" style={{ stroke: "var(--rule)", fill: "none" }} />
        {items.map((label, i) => {
          const isOpen = label === "Open";
          return (
            <g key={label}>
              {isOpen && (
                <rect x="4" y={6 + i * 24} width="212" height="22" rx="4" style={{ fill: "var(--accent-warm)" }} />
              )}
              <text
                x="16"
                y={22 + i * 24}
                fontFamily="var(--font-sans), sans-serif"
                fontSize="12.5"
                fontWeight={isOpen ? 600 : 400}
                style={isOpen ? { fill: "var(--paper)" } : INK}
              >
                {label}
              </text>
            </g>
          );
        })}
      </g>

      {/* annotation arrow pointing to Open */}
      <g style={{ stroke: "var(--accent-warm)", strokeWidth: 1.4, fill: "none" }}>
        <path d="M 410 130 q -40 -4 -52 0" />
        <path d="M 364 124 l -8 5 l 6 6" />
      </g>
      <text x="450" y="122" textAnchor="end" fontFamily="var(--font-mono), monospace" fontSize="9.5" letterSpacing="1.4" style={SAFFRON}>
        CLICK OPEN
      </text>
      <text x="450" y="138" textAnchor="end" fontFamily="var(--font-mono), monospace" fontSize="9.5" letterSpacing="1.4" style={SAFFRON}>
        FIRST TIME ONLY
      </text>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* MAC 5 — Accessibility list with Sanketra row toggled ON                   */
/* -------------------------------------------------------------------------- */

export function AccessibilityListMockup({ className }: { className?: string }) {
  const apps = [
    { name: "Karabiner-Elements", on: true },
    { name: "Sanketra Desktop", on: true },
    { name: "Raycast", on: true },
    { name: "Shottr", on: false }
  ];
  return (
    <svg
      viewBox="0 0 560 400"
      className={className}
      role="img"
      aria-label="System Settings — Privacy and Security — Accessibility — Sanketra Desktop toggled on"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Accessibility list · Sanketra Desktop ON</title>

      <rect x="0" y="0" width="560" height="400" rx="12" style={SURFACE} />
      <rect x="0.5" y="0.5" width="559" height="399" rx="11.5" style={{ ...RULE, strokeWidth: 1 }} />

      {/* title bar */}
      <rect x="0" y="0" width="560" height="40" rx="12" style={SURFACE_2} />
      <rect x="0" y="28" width="560" height="12" style={SURFACE_2} />
      <text x="280" y="25" textAnchor="middle" fontFamily="var(--font-sans), sans-serif" fontSize="12" fontWeight="500" style={MUTED}>
        Privacy &amp; Security — Accessibility
      </text>

      {/* description */}
      <foreignObject x="32" y="60" width="496" height="48">
        <div style={{ font: "12.5px/1.5 var(--font-sans), sans-serif", color: "var(--ink-muted)" }}>
          Allow the apps below to control your computer.
        </div>
      </foreignObject>

      {/* list */}
      <rect x="32" y="120" width="496" height={apps.length * 56 + 12} rx="8" style={PAPER} />
      <rect x="32.5" y="120.5" width="495" height={apps.length * 56 + 11} rx="7.5" style={{ stroke: "var(--rule)", fill: "none" }} />

      {apps.map((app, i) => {
        const y = 132 + i * 56;
        const isSanketra = app.name === "Sanketra Desktop";
        return (
          <g key={app.name}>
            {i > 0 && <line x1="56" y1={y - 6} x2="504" y2={y - 6} style={RULE} />}
            {/* app icon */}
            <g transform={`translate(52 ${y + 4})`}>
              <rect x="0" y="0" width="32" height="32" rx="6" style={isSanketra ? { fill: "var(--accent-warm)" } : SURFACE_2} />
              {isSanketra ? (
                <text x="16" y="24" textAnchor="middle" fontFamily="var(--font-deva), serif" fontSize="18" style={{ fill: "var(--paper)" }}>
                  स
                </text>
              ) : (
                <text x="16" y="22" textAnchor="middle" fontFamily="var(--font-sans), sans-serif" fontSize="10" fontWeight="700" style={MUTED}>
                  {app.name[0]}
                </text>
              )}
            </g>
            <text x="96" y={y + 26} fontFamily="var(--font-sans), sans-serif" fontSize="13" fontWeight={isSanketra ? 600 : 400} style={isSanketra ? INK : MUTED}>
              {app.name}
            </text>
            {/* toggle */}
            <g transform={`translate(456 ${y + 10})`}>
              <rect x="0" y="0" width="44" height="22" rx="11" style={app.on ? { fill: "var(--accent)" } : SURFACE_2} />
              <circle cx={app.on ? 33 : 11} cy="11" r="9" style={INK} />
            </g>
          </g>
        );
      })}

      {/* annotation */}
      <g style={{ stroke: "var(--accent-warm)", strokeWidth: 1.4, fill: "none" }}>
        <path d="M 528 196 q 18 -6 -22 -8" />
        <path d="M 484 188 l -3 6 l 7 1" />
      </g>
      <text x="552" y="206" textAnchor="end" fontFamily="var(--font-mono), monospace" fontSize="9.5" letterSpacing="1.4" style={SAFFRON}>
        TOGGLE ON
      </text>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* MAC 6 — Input Monitoring list (same shape as Accessibility, slot 10)      */
/* -------------------------------------------------------------------------- */

export function InputMonitoringMockup({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 320"
      className={className}
      role="img"
      aria-label="System Settings — Privacy and Security — Input Monitoring — Sanketra Desktop on"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Input Monitoring · Sanketra Desktop ON</title>

      <rect x="0" y="0" width="560" height="320" rx="12" style={SURFACE} />
      <rect x="0.5" y="0.5" width="559" height="319" rx="11.5" style={{ ...RULE, strokeWidth: 1 }} />

      <rect x="0" y="0" width="560" height="40" rx="12" style={SURFACE_2} />
      <rect x="0" y="28" width="560" height="12" style={SURFACE_2} />
      <text x="280" y="25" textAnchor="middle" fontFamily="var(--font-sans), sans-serif" fontSize="12" fontWeight="500" style={MUTED}>
        Privacy &amp; Security — Input Monitoring
      </text>

      <foreignObject x="32" y="60" width="496" height="48">
        <div style={{ font: "12.5px/1.5 var(--font-sans), sans-serif", color: "var(--ink-muted)" }}>
          Allow the apps below to monitor input from your keyboard, even while using other apps.
        </div>
      </foreignObject>

      {/* single highlighted row */}
      <rect x="32" y="138" width="496" height="68" rx="8" style={PAPER} />
      <rect x="32.5" y="138.5" width="495" height="67" rx="7.5" style={{ stroke: "var(--accent-warm)", fill: "none" }} />

      <g transform="translate(52 154)">
        <rect x="0" y="0" width="36" height="36" rx="7" style={{ fill: "var(--accent-warm)" }} />
        <text x="18" y="27" textAnchor="middle" fontFamily="var(--font-deva), serif" fontSize="20" style={{ fill: "var(--paper)" }}>
          स
        </text>
      </g>
      <text x="100" y="174" fontFamily="var(--font-sans), sans-serif" fontSize="13.5" fontWeight="600" style={INK}>
        Sanketra Desktop
      </text>
      <text x="100" y="192" fontFamily="var(--font-mono), monospace" fontSize="11" style={MUTED}>
        Listening for Ctrl + Option
      </text>
      <g transform="translate(456 160)">
        <rect x="0" y="0" width="44" height="22" rx="11" style={{ fill: "var(--accent)" }} />
        <circle cx="33" cy="11" r="9" style={INK} />
      </g>

      <text x="280" y="262" textAnchor="middle" fontFamily="var(--font-mono), monospace" fontSize="10" letterSpacing="1.8" style={FAINT}>
        QUIT + RELAUNCH AFTER TOGGLING ON
      </text>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* MAC 7 — Quit and relaunch hint (cmd-Q)                                     */
/* -------------------------------------------------------------------------- */

export function QuitRelaunchMockup({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 460 280"
      className={className}
      role="img"
      aria-label="Pressing Cmd-Q to quit Sanketra and double-clicking from Applications to relaunch"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Quit · Cmd-Q · then relaunch from Applications</title>

      <rect x="0" y="0" width="460" height="280" rx="12" style={PAPER} />

      {/* keyboard glyph */}
      <g transform="translate(64 80)">
        <rect x="0" y="0" width="80" height="80" rx="14" style={SURFACE_2} />
        <rect x="0.5" y="0.5" width="79" height="79" rx="13.5" style={{ stroke: "var(--rule)", fill: "none" }} />
        <text x="26" y="36" fontFamily="var(--font-sans), sans-serif" fontSize="22" fontWeight="600" style={SAFFRON}>
          ⌘
        </text>
        <text x="52" y="60" fontFamily="var(--font-sans), sans-serif" fontSize="22" fontWeight="600" style={SAFFRON}>
          Q
        </text>
      </g>
      <text x="104" y="186" textAnchor="middle" fontFamily="var(--font-mono), monospace" fontSize="10" letterSpacing="1.6" style={MUTED}>
        QUIT SANKETRA
      </text>

      {/* arrow */}
      <g style={{ stroke: "var(--accent-warm)", strokeWidth: 1.6, fill: "none" }}>
        <path d="M 168 120 L 264 120" />
        <path d="M 256 114 L 266 120 L 256 126" />
      </g>

      {/* applications launchpad icon */}
      <g transform="translate(296 80)">
        <rect x="0" y="0" width="80" height="80" rx="18" style={{ fill: "var(--accent-warm)" }} />
        <text x="40" y="56" textAnchor="middle" fontFamily="var(--font-deva), serif" fontSize="42" style={{ fill: "var(--paper)" }}>
          स
        </text>
      </g>
      <text x="336" y="186" textAnchor="middle" fontFamily="var(--font-mono), monospace" fontSize="10" letterSpacing="1.6" style={MUTED}>
        RELAUNCH
      </text>

      <text x="230" y="232" textAnchor="middle" fontFamily="var(--font-deva), serif" fontSize="13" style={FAINT}>
        फिर से शुरू — accessibility permission registers on next launch
      </text>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* WIN 1 — Edge / Chrome download bar with .exe                              */
/* -------------------------------------------------------------------------- */

export function EdgeDownloadBarMockup({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 300"
      className={className}
      role="img"
      aria-label="Browser download bar showing Sanketra-Desktop-Setup-x64.exe completing"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Browser download · Sanketra-Desktop-Setup-x64.exe · 98 MB</title>

      <rect x="0" y="0" width="560" height="300" rx="12" style={SURFACE} />
      <rect x="0.5" y="0.5" width="559" height="299" rx="11.5" style={{ ...RULE, strokeWidth: 1 }} />

      {/* fake browser top bar */}
      <rect x="0" y="0" width="560" height="50" rx="12" style={SURFACE_2} />
      <rect x="0" y="38" width="560" height="12" style={SURFACE_2} />
      <circle cx="22" cy="25" r="5" style={FAINT} />
      <circle cx="40" cy="25" r="5" style={FAINT} />
      <circle cx="58" cy="25" r="5" style={FAINT} />
      <rect x="92" y="14" width="380" height="22" rx="11" style={PAPER} />
      <text x="106" y="29" fontFamily="var(--font-mono), monospace" fontSize="10" style={MUTED}>
        sanketra.app/download
      </text>

      {/* page placeholder */}
      <rect x="40" y="76" width="480" height="120" rx="6" style={SURFACE_2} />
      <text x="60" y="108" fontFamily="var(--font-sans), sans-serif" fontSize="14" fontWeight="600" style={MUTED}>
        Sanketra Desktop — download
      </text>
      <rect x="60" y="124" width="280" height="8" rx="2" style={{ fill: "var(--rule)" }} />
      <rect x="60" y="142" width="220" height="8" rx="2" style={{ fill: "var(--rule)" }} />
      <rect x="60" y="160" width="320" height="8" rx="2" style={{ fill: "var(--rule)" }} />

      {/* download bar */}
      <rect x="40" y="216" width="480" height="56" rx="8" style={PAPER} />
      <rect x="40.5" y="216.5" width="479" height="55" rx="7.5" style={{ stroke: "var(--accent-warm)", fill: "none" }} />

      {/* file icon */}
      <g transform="translate(60 230)">
        <rect x="0" y="0" width="28" height="28" rx="4" style={SAFFRON} />
        <text x="14" y="20" textAnchor="middle" fontFamily="var(--font-mono), monospace" fontSize="9" fontWeight="700" style={{ fill: "var(--paper)" }}>
          EXE
        </text>
      </g>

      <text x="100" y="240" fontFamily="var(--font-sans), sans-serif" fontSize="12.5" fontWeight="500" style={INK}>
        Sanketra-Desktop-Setup-x64.exe
      </text>
      <text x="100" y="258" fontFamily="var(--font-mono), monospace" fontSize="10" style={MUTED}>
        98 MB · downloaded just now
      </text>

      {/* open / show actions */}
      <g transform="translate(380 224)">
        <rect x="0" y="0" width="64" height="20" rx="4" style={SURFACE_2} />
        <text x="32" y="14" textAnchor="middle" fontFamily="var(--font-sans), sans-serif" fontSize="10" style={MUTED}>
          Show in folder
        </text>
        <rect x="0" y="26" width="64" height="20" rx="4" style={{ fill: "var(--accent-warm)" }} />
        <text x="32" y="40" textAnchor="middle" fontFamily="var(--font-sans), sans-serif" fontSize="10" fontWeight="600" style={{ fill: "var(--paper)" }}>
          Open
        </text>
      </g>

      <g style={{ stroke: "var(--accent-warm)", strokeWidth: 1.4, fill: "none" }}>
        <path d="M 530 256 q -20 4 -50 -10" />
        <path d="M 482 244 l -4 6 l 7 0" />
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* WIN 2 — SmartScreen dialog expanded (with Run anyway)                     */
/* -------------------------------------------------------------------------- */

export function SmartScreenExpandedMockup({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 380"
      className={className}
      role="img"
      aria-label="SmartScreen expanded with publisher Unknown publisher and Run anyway button visible"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>SmartScreen · More info → Run anyway</title>

      <rect x="0" y="0" width="560" height="380" rx="12" fill="#000" opacity="0" />
      {/* dialog with blue brand bar */}
      <rect x="40" y="20" width="480" height="320" rx="10" style={SURFACE} />
      <rect x="40.5" y="20.5" width="479" height="319" rx="9.5" style={{ stroke: "var(--rule)", fill: "none" }} />
      <rect x="40" y="20" width="480" height="48" rx="10" style={{ fill: "#1F3A8A" }} />
      <rect x="40" y="56" width="480" height="12" style={{ fill: "#1F3A8A" }} />
      <text x="64" y="50" fontFamily="var(--font-sans), sans-serif" fontSize="13" fontWeight="500" style={INK}>
        Microsoft Defender SmartScreen
      </text>

      <text x="64" y="106" fontFamily="var(--font-sans), sans-serif" fontSize="18" fontWeight="600" style={INK}>
        Windows protected your PC
      </text>

      <foreignObject x="64" y="124" width="432" height="56">
        <div style={{ font: "12.5px/1.55 var(--font-sans), sans-serif", color: "var(--ink-muted)" }}>
          Microsoft Defender SmartScreen prevented an unrecognized app from starting.
          Running this app might put your PC at risk.
        </div>
      </foreignObject>

      {/* publisher block (expanded info) */}
      <rect x="64" y="196" width="432" height="56" rx="6" style={PAPER} />
      <text x="80" y="216" fontFamily="var(--font-mono), monospace" fontSize="10" letterSpacing="1.4" style={FAINT}>
        APP
      </text>
      <text x="120" y="216" fontFamily="var(--font-sans), sans-serif" fontSize="12" style={INK}>
        Sanketra-Desktop-Setup-x64.exe
      </text>
      <text x="80" y="240" fontFamily="var(--font-mono), monospace" fontSize="10" letterSpacing="1.4" style={FAINT}>
        PUBLISHER
      </text>
      <text x="120" y="240" fontFamily="var(--font-sans), sans-serif" fontSize="12" fontStyle="italic" style={MUTED}>
        Unknown publisher
      </text>

      {/* buttons — Run anyway highlighted */}
      <g transform="translate(64 280)">
        <rect x="-4" y="-4" width="120" height="42" rx="8" style={{ fill: "var(--accent-warm)", opacity: 0.18 }} />
        <rect x="0" y="0" width="112" height="34" rx="4" style={{ fill: "var(--accent-warm)" }} />
        <text x="56" y="22" textAnchor="middle" fontFamily="var(--font-sans), sans-serif" fontSize="12" fontWeight="600" style={{ fill: "var(--paper)" }}>
          Run anyway
        </text>

        <rect x="128" y="0" width="112" height="34" rx="4" style={SURFACE_2} />
        <text x="184" y="22" textAnchor="middle" fontFamily="var(--font-sans), sans-serif" fontSize="12" style={MUTED}>
          Don&apos;t run
        </text>
      </g>

      {/* arrow */}
      <g style={{ stroke: "var(--accent-warm)", strokeWidth: 1.4, fill: "none" }}>
        <path d="M 40 298 q -22 12 -8 32" />
        <path d="M 28 326 l 6 4 l 0 -7" />
      </g>
      <text x="36" y="354" fontFamily="var(--font-mono), monospace" fontSize="9.5" letterSpacing="1.4" style={SAFFRON}>
        CLICK THIS
      </text>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* WIN 3 — Inno Setup wizard pages (stacked thumbnail strip)                 */
/* -------------------------------------------------------------------------- */

export function InnoSetupWizardMockup({ className }: { className?: string }) {
  const pages = [
    { num: "01", label: "Welcome" },
    { num: "02", label: "License" },
    { num: "03", label: "Destination" },
    { num: "04", label: "Tasks" }
  ];
  return (
    <svg
      viewBox="0 0 560 340"
      className={className}
      role="img"
      aria-label="Inno Setup wizard pages — welcome, license, destination, tasks"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Inno Setup · four-page click-through wizard</title>

      <rect x="0" y="0" width="560" height="340" rx="12" style={PAPER} />

      <text x="40" y="40" fontFamily="var(--font-mono), monospace" fontSize="11" letterSpacing="2" style={SAFFRON}>
        SANKETRA DESKTOP — SETUP
      </text>
      <text x="40" y="60" fontFamily="var(--font-mono), monospace" fontSize="9.5" style={FAINT}>
        Inno Setup wizard · 4 pages · ~30 seconds
      </text>

      {pages.map((page, i) => (
        <g key={page.num} transform={`translate(${40 + i * 128} 90)`}>
          <rect x="0" y="0" width="112" height="160" rx="8" style={SURFACE} />
          <rect x="0.5" y="0.5" width="111" height="159" rx="7.5" style={{ stroke: "var(--rule)", fill: "none" }} />
          {/* top stripe */}
          <rect x="0" y="0" width="112" height="32" rx="8" style={SURFACE_2} />
          <rect x="0" y="22" width="112" height="10" style={SURFACE_2} />
          <text x="56" y="20" textAnchor="middle" fontFamily="var(--font-mono), monospace" fontSize="9" letterSpacing="1.4" style={FAINT}>
            STEP {page.num}
          </text>
          {/* fake content */}
          <rect x="12" y="46" width="88" height="6" rx="1.6" style={{ fill: "var(--rule)" }} />
          <rect x="12" y="58" width="60" height="6" rx="1.6" style={{ fill: "var(--rule)" }} />
          <rect x="12" y="70" width="80" height="6" rx="1.6" style={{ fill: "var(--rule)" }} />
          <rect x="12" y="82" width="44" height="6" rx="1.6" style={{ fill: "var(--rule)" }} />
          {/* CTA at bottom */}
          <rect x="56" y="122" width="44" height="22" rx="4" style={{ fill: "var(--accent-warm)" }} />
          <text x="78" y="138" textAnchor="middle" fontFamily="var(--font-sans), sans-serif" fontSize="10" fontWeight="600" style={{ fill: "var(--paper)" }}>
            Next
          </text>
          {/* label below */}
          <text x="56" y="178" textAnchor="middle" fontFamily="var(--font-sans), sans-serif" fontSize="11" fontWeight="500" style={INK}>
            {page.label}
          </text>
        </g>
      ))}

      <text x="280" y="294" textAnchor="middle" fontFamily="var(--font-sans), sans-serif" fontSize="12" style={MUTED}>
        Default install path:{" "}
        <tspan fontFamily="var(--font-mono), monospace" fontSize="11" style={SAFFRON}>
          %LOCALAPPDATA%\SanketraDesktop\
        </tspan>
      </text>
      <text x="280" y="314" textAnchor="middle" fontFamily="var(--font-mono), monospace" fontSize="9.5" letterSpacing="1.4" style={FAINT}>
        NO ADMIN · NO UAC PROMPT
      </text>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* WIN 4 — Install progress bar                                              */
/* -------------------------------------------------------------------------- */

export function InstallProgressMockup({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 280"
      className={className}
      role="img"
      aria-label="Inno Setup installing — progress bar at 60 percent"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Installing Sanketra Desktop · ~30 seconds</title>

      <rect x="0" y="0" width="560" height="280" rx="12" style={SURFACE} />
      <rect x="0.5" y="0.5" width="559" height="279" rx="11.5" style={{ ...RULE, strokeWidth: 1 }} />

      <rect x="0" y="0" width="560" height="44" rx="12" style={SURFACE_2} />
      <rect x="0" y="32" width="560" height="12" style={SURFACE_2} />
      <text x="280" y="28" textAnchor="middle" fontFamily="var(--font-sans), sans-serif" fontSize="12.5" fontWeight="500" style={MUTED}>
        Setup — Sanketra Desktop
      </text>

      <text x="40" y="92" fontFamily="var(--font-sans), sans-serif" fontSize="17" fontWeight="600" style={INK}>
        Installing
      </text>
      <text x="40" y="118" fontFamily="var(--font-sans), sans-serif" fontSize="13" style={MUTED}>
        Please wait while Setup installs Sanketra Desktop on your computer.
      </text>

      {/* current file */}
      <text x="40" y="158" fontFamily="var(--font-mono), monospace" fontSize="11" style={FAINT}>
        Extracting:{" "}
        <tspan style={MUTED}>%LOCALAPPDATA%\SanketraDesktop\sanketra-desktop.exe</tspan>
      </text>

      {/* progress bar */}
      <rect x="40" y="180" width="480" height="14" rx="2" style={PAPER} />
      <rect x="40" y="180" width="288" height="14" rx="2" style={{ fill: "var(--accent)" }} />

      <text x="40" y="216" fontFamily="var(--font-mono), monospace" fontSize="10.5" letterSpacing="1.4" style={SAFFRON}>
        60% · ABOUT 12 SECONDS REMAINING
      </text>

      {/* cancel button */}
      <rect x="436" y="232" width="84" height="32" rx="4" style={SURFACE_2} />
      <text x="478" y="252" textAnchor="middle" fontFamily="var(--font-sans), sans-serif" fontSize="12" style={MUTED}>
        Cancel
      </text>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* WIN 5 — Finish page with Launch Sanketra checkbox                         */
/* -------------------------------------------------------------------------- */

export function InnoFinishMockup({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 300"
      className={className}
      role="img"
      aria-label="Inno Setup finish page with Launch Sanketra Desktop checkbox ticked"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Setup complete · Finish · Launch Sanketra Desktop ticked</title>

      <rect x="0" y="0" width="560" height="300" rx="12" style={SURFACE} />
      <rect x="0.5" y="0.5" width="559" height="299" rx="11.5" style={{ ...RULE, strokeWidth: 1 }} />

      <rect x="0" y="0" width="560" height="44" rx="12" style={SURFACE_2} />
      <rect x="0" y="32" width="560" height="12" style={SURFACE_2} />
      <text x="280" y="28" textAnchor="middle" fontFamily="var(--font-sans), sans-serif" fontSize="12.5" fontWeight="500" style={MUTED}>
        Setup — Sanketra Desktop
      </text>

      {/* checkmark icon */}
      <g transform="translate(40 72)">
        <circle cx="20" cy="20" r="20" style={{ fill: "var(--accent)" }} />
        <path d="M 11 20 L 18 27 L 30 14" style={{ stroke: "var(--paper)", strokeWidth: 2.6, fill: "none", strokeLinecap: "round", strokeLinejoin: "round" }} />
      </g>

      <text x="92" y="86" fontFamily="var(--font-sans), sans-serif" fontSize="17" fontWeight="600" style={INK}>
        Completing the Sanketra Desktop Setup Wizard
      </text>
      <text x="92" y="108" fontFamily="var(--font-sans), sans-serif" fontSize="13" style={MUTED}>
        Setup has finished installing Sanketra Desktop on your computer.
      </text>

      {/* checkbox row */}
      <g transform="translate(40 160)">
        <rect x="0" y="0" width="16" height="16" rx="2" style={{ fill: "var(--accent-warm)" }} />
        <path d="M 4 8 L 7 11 L 12 5" style={{ stroke: "var(--paper)", strokeWidth: 2, fill: "none", strokeLinecap: "round", strokeLinejoin: "round" }} />
        <text x="28" y="13" fontFamily="var(--font-sans), sans-serif" fontSize="12.5" style={INK}>
          Launch Sanketra Desktop
        </text>
      </g>
      <g transform="translate(40 188)">
        <rect x="0" y="0" width="16" height="16" rx="2" style={SURFACE_2} />
        <text x="28" y="13" fontFamily="var(--font-sans), sans-serif" fontSize="12.5" style={MUTED}>
          Create desktop icon
        </text>
      </g>

      {/* Finish CTA */}
      <g transform="translate(420 244)">
        <rect x="0" y="0" width="100" height="34" rx="4" style={{ fill: "var(--accent-warm)" }} />
        <text x="50" y="22" textAnchor="middle" fontFamily="var(--font-sans), sans-serif" fontSize="12" fontWeight="600" style={{ fill: "var(--paper)" }}>
          Finish
        </text>
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* WIN 6 — Windows 11 mic permission toast                                   */
/* -------------------------------------------------------------------------- */

export function WinMicToastMockup({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 460 280"
      className={className}
      role="img"
      aria-label="Windows 11 toast asking to allow Sanketra Desktop to access the microphone"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Windows 11 · mic permission toast · Yes</title>

      <rect x="0" y="0" width="460" height="280" rx="12" style={PAPER} />

      {/* fake taskbar with tray */}
      <rect x="0" y="240" width="460" height="40" style={SURFACE} />
      <line x1="0" y1="240" x2="460" y2="240" style={RULE} />
      <g transform="translate(380 252)">
        <rect x="0" y="0" width="14" height="14" rx="2" style={MUTED} />
        <rect x="20" y="0" width="14" height="14" rx="2" style={MUTED} />
        <rect x="40" y="0" width="14" height="14" rx="2" style={{ fill: "var(--accent-warm)" }} />
        <text x="47" y="11" textAnchor="middle" fontFamily="var(--font-deva), serif" fontSize="9" style={{ fill: "var(--paper)" }}>
          स
        </text>
      </g>
      <text x="440" y="262" textAnchor="end" fontFamily="var(--font-mono), monospace" fontSize="10" style={FAINT}>
        14:32
      </text>

      {/* toast */}
      <rect x="240" y="92" width="208" height="124" rx="8" style={SURFACE} />
      <rect x="240.5" y="92.5" width="207" height="123" rx="7.5" style={{ stroke: "var(--rule)", fill: "none" }} />

      <g transform="translate(252 104)">
        <rect x="0" y="0" width="22" height="22" rx="4" style={{ fill: "var(--accent-warm)" }} />
        <text x="11" y="16" textAnchor="middle" fontFamily="var(--font-deva), serif" fontSize="13" style={{ fill: "var(--paper)" }}>
          स
        </text>
      </g>
      <text x="280" y="118" fontFamily="var(--font-sans), sans-serif" fontSize="11" fontWeight="600" style={INK}>
        Sanketra Desktop
      </text>

      <foreignObject x="252" y="134" width="184" height="44">
        <div style={{ font: "11px/1.45 var(--font-sans), sans-serif", color: "var(--ink-muted)" }}>
          Allow Sanketra Desktop to access your microphone?
        </div>
      </foreignObject>

      <g transform="translate(252 184)">
        <rect x="0" y="0" width="60" height="22" rx="3" style={{ fill: "var(--accent-warm)" }} />
        <text x="30" y="15" textAnchor="middle" fontFamily="var(--font-sans), sans-serif" fontSize="10.5" fontWeight="600" style={{ fill: "var(--paper)" }}>
          Yes
        </text>
        <rect x="68" y="0" width="60" height="22" rx="3" style={SURFACE_2} />
        <text x="98" y="15" textAnchor="middle" fontFamily="var(--font-sans), sans-serif" fontSize="10.5" style={MUTED}>
          No
        </text>
      </g>

      {/* arrow */}
      <g style={{ stroke: "var(--accent-warm)", strokeWidth: 1.4, fill: "none" }}>
        <path d="M 226 200 L 252 192" />
        <path d="M 248 186 L 254 192 L 248 198" />
      </g>
      <text x="20" y="200" fontFamily="var(--font-mono), monospace" fontSize="9.5" letterSpacing="1.4" style={SAFFRON}>
        CLICK YES — ONLY TIME
      </text>
      <text x="20" y="216" fontFamily="var(--font-mono), monospace" fontSize="9.5" letterSpacing="1.4" style={SAFFRON}>
        WINDOWS ASKS YOU
      </text>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* LINUX 1 — Browser saved .AppImage in Downloads                            */
/* -------------------------------------------------------------------------- */

export function LinuxDownloadMockup({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 280"
      className={className}
      role="img"
      aria-label="Firefox or Chromium download bar showing Sanketra-Desktop-x86_64.AppImage completed"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Browser · Sanketra-Desktop-x86_64.AppImage saved · 104 MB</title>

      <rect x="0" y="0" width="560" height="280" rx="12" style={SURFACE} />
      <rect x="0.5" y="0.5" width="559" height="279" rx="11.5" style={{ ...RULE, strokeWidth: 1 }} />

      <rect x="0" y="0" width="560" height="44" rx="12" style={SURFACE_2} />
      <rect x="0" y="32" width="560" height="12" style={SURFACE_2} />
      <text x="280" y="28" textAnchor="middle" fontFamily="var(--font-sans), sans-serif" fontSize="12.5" fontWeight="500" style={MUTED}>
        sanketra.app / download
      </text>

      {/* page area */}
      <rect x="40" y="68" width="480" height="100" rx="6" style={SURFACE_2} />
      <text x="60" y="98" fontFamily="var(--font-sans), sans-serif" fontSize="14" fontWeight="600" style={MUTED}>
        Sanketra Desktop · Linux
      </text>
      <rect x="60" y="114" width="280" height="6" rx="1.6" style={{ fill: "var(--rule)" }} />
      <rect x="60" y="128" width="220" height="6" rx="1.6" style={{ fill: "var(--rule)" }} />
      <rect x="60" y="142" width="160" height="6" rx="1.6" style={{ fill: "var(--rule)" }} />

      {/* download bar */}
      <rect x="40" y="188" width="480" height="56" rx="8" style={PAPER} />
      <rect x="40.5" y="188.5" width="479" height="55" rx="7.5" style={{ stroke: "var(--accent-warm)", fill: "none" }} />

      <g transform="translate(60 202)">
        <rect x="0" y="0" width="28" height="28" rx="4" style={SAFFRON} />
        <text x="14" y="20" textAnchor="middle" fontFamily="var(--font-mono), monospace" fontSize="8" fontWeight="700" style={{ fill: "var(--paper)" }}>
          APP
        </text>
      </g>

      <text x="100" y="212" fontFamily="var(--font-sans), sans-serif" fontSize="12.5" fontWeight="500" style={INK}>
        Sanketra-Desktop-x86_64.AppImage
      </text>
      <text x="100" y="230" fontFamily="var(--font-mono), monospace" fontSize="10" style={MUTED}>
        104 MB · saved to ~/Downloads/
      </text>

      <g transform="translate(420 198)">
        <rect x="0" y="0" width="80" height="36" rx="4" style={{ fill: "var(--accent-warm)" }} />
        <text x="40" y="22" textAnchor="middle" fontFamily="var(--font-sans), sans-serif" fontSize="12" fontWeight="600" style={{ fill: "var(--paper)" }}>
          Show file
        </text>
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* LINUX 2 — GNOME Files Properties → Permissions dialog                     */
/* -------------------------------------------------------------------------- */

export function FilesPermissionsMockup({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 460 380"
      className={className}
      role="img"
      aria-label="GNOME Files Properties Permissions tab with Allow executing file as program checked"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Properties · Permissions · Allow executing file as program</title>

      <rect x="0" y="0" width="460" height="380" rx="12" style={SURFACE} />
      <rect x="0.5" y="0.5" width="459" height="379" rx="11.5" style={{ ...RULE, strokeWidth: 1 }} />

      <rect x="0" y="0" width="460" height="44" rx="12" style={SURFACE_2} />
      <rect x="0" y="32" width="460" height="12" style={SURFACE_2} />
      <circle cx="20" cy="22" r="5" style={FAINT} />
      <text x="230" y="28" textAnchor="middle" fontFamily="var(--font-sans), sans-serif" fontSize="12" fontWeight="500" style={MUTED}>
        Sanketra-Desktop-x86_64.AppImage Properties
      </text>

      {/* tab strip */}
      <g transform="translate(32 64)">
        <text x="0" y="14" fontFamily="var(--font-sans), sans-serif" fontSize="12" style={MUTED}>
          Basic
        </text>
        <text x="56" y="14" fontFamily="var(--font-sans), sans-serif" fontSize="12" fontWeight="600" style={SAFFRON}>
          Permissions
        </text>
        <text x="148" y="14" fontFamily="var(--font-sans), sans-serif" fontSize="12" style={MUTED}>
          Open With
        </text>
        <line x1="56" y1="22" x2="124" y2="22" style={{ stroke: "var(--accent-warm)", strokeWidth: 2 }} />
      </g>

      <line x1="32" y1="96" x2="428" y2="96" style={RULE} />

      {/* permission rows */}
      <g transform="translate(48 116)">
        <text x="0" y="14" fontFamily="var(--font-mono), monospace" fontSize="10" letterSpacing="1.4" style={FAINT}>
          OWNER
        </text>
        <text x="160" y="14" fontFamily="var(--font-sans), sans-serif" fontSize="12" style={INK}>
          Read and write
        </text>

        <text x="0" y="44" fontFamily="var(--font-mono), monospace" fontSize="10" letterSpacing="1.4" style={FAINT}>
          GROUP
        </text>
        <text x="160" y="44" fontFamily="var(--font-sans), sans-serif" fontSize="12" style={INK}>
          Read-only
        </text>

        <text x="0" y="74" fontFamily="var(--font-mono), monospace" fontSize="10" letterSpacing="1.4" style={FAINT}>
          OTHERS
        </text>
        <text x="160" y="74" fontFamily="var(--font-sans), sans-serif" fontSize="12" style={INK}>
          Read-only
        </text>
      </g>

      {/* the critical checkbox */}
      <rect x="32" y="220" width="396" height="64" rx="8" style={PAPER} />
      <rect x="32.5" y="220.5" width="395" height="63" rx="7.5" style={{ stroke: "var(--accent-warm)", fill: "none" }} />

      <g transform="translate(52 238)">
        <rect x="0" y="0" width="18" height="18" rx="3" style={{ fill: "var(--accent-warm)" }} />
        <path d="M 4 9 L 8 13 L 14 5" style={{ stroke: "var(--paper)", strokeWidth: 2.2, fill: "none", strokeLinecap: "round", strokeLinejoin: "round" }} />
      </g>
      <text x="84" y="252" fontFamily="var(--font-sans), sans-serif" fontSize="13" fontWeight="500" style={INK}>
        Allow executing file as program
      </text>
      <text x="84" y="270" fontFamily="var(--font-mono), monospace" fontSize="10" style={MUTED}>
        equivalent: chmod +x ~/Downloads/Sanketra-Desktop-*.AppImage
      </text>

      {/* arrow */}
      <g style={{ stroke: "var(--accent-warm)", strokeWidth: 1.4, fill: "none" }}>
        <path d="M 16 252 q 14 8 30 0" />
        <path d="M 42 254 l 5 -4 l -1 7" />
      </g>
      <text x="10" y="304" fontFamily="var(--font-mono), monospace" fontSize="9.5" letterSpacing="1.4" style={SAFFRON}>
        TICK THIS — ONE-TIME
      </text>

      {/* close button */}
      <g transform="translate(348 332)">
        <rect x="0" y="0" width="80" height="30" rx="4" style={SURFACE_2} />
        <text x="40" y="20" textAnchor="middle" fontFamily="var(--font-sans), sans-serif" fontSize="12" style={INK}>
          Close
        </text>
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* LINUX 3 — Hotkey demo in text editor (transcript appearing)               */
/* -------------------------------------------------------------------------- */

export function HotkeyDemoMockup({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 320"
      className={className}
      role="img"
      aria-label="Hotkey pressed in a text editor — transcript types into the field"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Ctrl + Alt · transcript types at cursor</title>

      <rect x="0" y="0" width="560" height="320" rx="12" style={SURFACE} />
      <rect x="0.5" y="0.5" width="559" height="319" rx="11.5" style={{ ...RULE, strokeWidth: 1 }} />

      <rect x="0" y="0" width="560" height="36" rx="12" style={SURFACE_2} />
      <rect x="0" y="24" width="560" height="12" style={SURFACE_2} />
      <circle cx="20" cy="18" r="5" style={FAINT} />
      <circle cx="36" cy="18" r="5" style={FAINT} />
      <circle cx="52" cy="18" r="5" style={FAINT} />
      <text x="280" y="23" textAnchor="middle" fontFamily="var(--font-mono), monospace" fontSize="11" style={MUTED}>
        Untitled — Text Editor
      </text>

      {/* editor area */}
      <rect x="20" y="56" width="520" height="180" rx="6" style={PAPER} />

      <text x="40" y="92" fontFamily="var(--font-mono), monospace" fontSize="13" style={MUTED}>
        Aaj ka standup note —
      </text>
      <text x="40" y="116" fontFamily="var(--font-mono), monospace" fontSize="13" style={INK}>
        Backend deploy ho gaya, frontend abhi
      </text>
      <text x="40" y="140" fontFamily="var(--font-mono), monospace" fontSize="13" style={INK}>
        review mein hai. Kal merge hoga.
      </text>
      <g>
        <text x="40" y="164" fontFamily="var(--font-mono), monospace" fontSize="13" style={SAFFRON}>
          Sanketra ka demo kal dikhana hai
        </text>
        {/* blinking cursor */}
        <rect x="290" y="152" width="2" height="16" style={SAFFRON}>
          <animate attributeName="opacity" values="1;0;1" dur="1.1s" repeatCount="indefinite" />
        </rect>
      </g>

      {/* hotkey display */}
      <g transform="translate(40 260)">
        <rect x="0" y="0" width="80" height="34" rx="6" style={SURFACE_2} />
        <text x="40" y="22" textAnchor="middle" fontFamily="var(--font-mono), monospace" fontSize="12" fontWeight="600" style={SAFFRON}>
          Ctrl
        </text>
        <text x="88" y="22" fontFamily="var(--font-sans), sans-serif" fontSize="14" style={MUTED}>
          +
        </text>
        <rect x="100" y="0" width="80" height="34" rx="6" style={SURFACE_2} />
        <text x="140" y="22" textAnchor="middle" fontFamily="var(--font-mono), monospace" fontSize="12" fontWeight="600" style={SAFFRON}>
          Alt
        </text>

        {/* mint dot for recording state */}
        <circle cx="212" cy="17" r="6" style={{ fill: "var(--accent)" }}>
          <animate attributeName="opacity" values="1;0.3;1" dur="0.8s" repeatCount="indefinite" />
        </circle>
        <text x="226" y="22" fontFamily="var(--font-mono), monospace" fontSize="11" style={{ fill: "var(--accent)" }}>
          LISTENING
        </text>
      </g>
    </svg>
  );
}
