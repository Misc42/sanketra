#!/usr/bin/env bash
# Sanketra — One-click installer for Linux and macOS (binary install)
# Usage: bash install.sh   OR   double-click install.command (macOS)
#
# Downloads the prebuilt Sanketra server binary (PyInstaller onedir) for this
# OS from GitHub Releases, extracts it to a stable install dir, and registers
# the OS service (systemd user unit on Linux, launchd LaunchAgent on macOS)
# with ExecStart pointing at the extracted binary. No git clone, no Python,
# no venv, no pip — the binary is self-contained.
set -euo pipefail

# ─── Config ───────────────────────────────────────────────────────────
# Versionless "latest" download base. Override RELEASE_BASE to install from a
# local file:// URL (used by the dry-run harness) or a pinned release tag.
RELEASE_BASE="${RELEASE_BASE:-https://github.com/Misc42/sanketra/releases/latest/download}"
LINUX_ASSET="${LINUX_ASSET:-Sanketra-Server-x86_64.tar.gz}"
MACOS_ASSET="${MACOS_ASSET:-Sanketra-Server-universal.tar.gz}"
INSTALL_DIR="${INSTALL_DIR:-$HOME/sanketra-server}"
# Top-level dir name inside the artifact (PyInstaller onedir) + binary name.
BUNDLE_DIRNAME="sanketra-server"
BINARY_NAME="sanketra-server"

# ─── Colors ───────────────────────────────────────────────────────────
# $'...' so the escape byte is real — printf %s emits it verbatim (no format-
# string interpretation needed, which keeps shellcheck SC2059 happy too).
RED=$'\033[0;31m'
GREEN=$'\033[0;32m'
YELLOW=$'\033[1;33m'
BOLD=$'\033[1m'
NC=$'\033[0m'

info()  { printf "${GREEN}[OK]${NC} %s\n" "$*"; }
warn()  { printf "${YELLOW}[!]${NC} %s\n" "$*"; }
fail()  { printf "${RED}[X]${NC} %s\n" "$*"; exit 1; }
step()  { printf "\n${BOLD}-- %s${NC}\n" "$*"; }

OS=""
PKG=""
BINARY_PATH=""

# ─── OS Detection ─────────────────────────────────────────────────────
detect_os() {
    case "$(uname -s)" in
        Linux*)  OS="linux";;
        Darwin*) OS="macos";;
        *)       fail "Unsupported OS: $(uname -s). Use install.bat for Windows.";;
    esac
}

# ─── Package Manager Detection (Linux) ────────────────────────────────
detect_pkg_manager() {
    if command -v apt-get >/dev/null 2>&1; then
        PKG="apt"
    elif command -v dnf >/dev/null 2>&1; then
        PKG="dnf"
    elif command -v pacman >/dev/null 2>&1; then
        PKG="pacman"
    else
        PKG=""
    fi
}

# ─── Linux display-server detection ───────────────────────────────────
detect_display_server() {
    local session=""
    session="$(printf '%s' "${XDG_SESSION_TYPE:-}" | tr '[:upper:]' '[:lower:]')"
    if [[ "$session" == "x11" || "$session" == "wayland" ]]; then
        printf '%s' "$session"; return 0
    fi
    if [[ -n "${WAYLAND_DISPLAY:-}" ]]; then printf 'wayland'; return 0; fi
    if [[ -n "${DISPLAY:-}" ]]; then printf 'x11'; return 0; fi
    printf 'unknown'
}

# ─── Runtime system tools (NOT the server itself) ─────────────────────
# The server binary bundles its own Python libs (portaudio, scipy, ctranslate2,
# av*, …). What it CANNOT bundle are the external system tools it spawns:
#   - X11:     xdotool   (typing + pointer)
#   - Wayland: ydotool + ydotoold daemon
#   - both:    ffmpeg    (optional — screen mirror; server degrades without it)
install_runtime_tools_linux() {
    step "Installing runtime input/screen tools"
    detect_pkg_manager
    local display=""
    display="$(detect_display_server)"
    info "Display server: $display"

    local want=()
    if [[ "$display" == "wayland" ]]; then
        command -v ydotool  >/dev/null 2>&1 || want+=("ydotool")
    else
        command -v xdotool  >/dev/null 2>&1 || want+=("xdotool")
    fi
    command -v ffmpeg >/dev/null 2>&1 || want+=("ffmpeg")

    if [[ ${#want[@]} -eq 0 ]]; then
        info "All runtime tools already present (no sudo needed)"
    elif [[ -z "$PKG" ]]; then
        warn "No supported package manager (apt/dnf/pacman) — install manually: ${want[*]}"
    else
        # Probe for USABLE sudo before invoking it. On a clean minimal box (user
        # not in sudoers, sudo absent) a bare `sudo apt-get` would (a) HANG on a
        # tty password prompt under `curl|bash` (the `||` is never reached) and
        # (b) abort main() under `set -e` before the server binary is even
        # downloaded — yet the input/screen tools are OPTIONAL (server degrades
        # without them). So use `sudo -n` (non-interactive) and warn-skip if it
        # isn't available, matching the no-pkg-manager branch above.
        local SUDO=""
        if [[ $EUID -eq 0 ]]; then
            SUDO=""
        elif command -v sudo >/dev/null 2>&1 && sudo -n true >/dev/null 2>&1; then
            SUDO="sudo -n"
        else
            warn "No usable sudo (absent or password-locked) — input/screen tools NOT installed: ${want[*]}"
            warn "  Install them manually then re-run, or ignore (typing/screen-mirror degrade gracefully)."
            return 0
        fi
        case "$PKG" in
            apt)    $SUDO apt-get update -qq && $SUDO apt-get install -y -qq "${want[@]}" || warn "Runtime input/screen tools not installed — typing/screen-mirror disabled" ;;
            dnf)    $SUDO dnf install -y -q "${want[@]}" || warn "Runtime input/screen tools not installed — typing/screen-mirror disabled" ;;
            pacman) $SUDO pacman -Sy --noconfirm --needed "${want[@]}" || warn "Runtime input/screen tools not installed — typing/screen-mirror disabled" ;;
        esac
        info "Runtime tool install attempted: ${want[*]}"
    fi

    # Wayland: ydotool needs its daemon running for uinput access.
    if [[ "$display" == "wayland" ]] && command -v ydotoold >/dev/null 2>&1; then
        if ! pgrep -x ydotoold >/dev/null 2>&1; then
            # `sudo -n` so a curl|bash run can't hang on a password prompt.
            sudo -n systemctl enable --now ydotoold 2>/dev/null || true
        fi
    fi
}

install_runtime_tools_macos() {
    step "Checking macOS runtime tools"
    # The macOS binary uses Quartz/pynput (bundled) for input — no system tool
    # needed there. ffmpeg is only for the optional screen-mirror feature.
    if command -v ffmpeg >/dev/null 2>&1; then
        info "ffmpeg present (screen mirror enabled)"
    elif command -v brew >/dev/null 2>&1; then
        brew install ffmpeg 2>/dev/null || warn "ffmpeg install failed — screen mirror disabled"
    else
        warn "ffmpeg not found and Homebrew absent — screen mirror disabled."
        warn "  Optional: install from https://brew.sh then: brew install ffmpeg"
    fi
}

# ─── Download + extract the server binary ─────────────────────────────
download_and_extract() {
    step "Downloading Sanketra server"

    local asset="" url="" tmp=""
    if [[ "$OS" == "linux" ]]; then
        asset="$LINUX_ASSET"
    else
        asset="$MACOS_ASSET"
    fi
    url="$RELEASE_BASE/$asset"

    command -v tar >/dev/null 2>&1 || fail "tar not found (required to extract the server)"

    tmp="$(mktemp -d "${TMPDIR:-/tmp}/sanketra-dl.XXXXXX")"
    # shellcheck disable=SC2064  # expand tmp now: it must survive into the trap
    trap "rm -rf '$tmp'" RETURN
    local archive="$tmp/$asset"

    info "Source: $url"
    if [[ "$url" == file://* ]]; then
        # Local file install (dry-run / offline). cp avoids a curl dependency.
        local src="${url#file://}"
        [[ -f "$src" ]] || fail "Local artifact not found: $src"
        cp "$src" "$archive"
    elif command -v curl >/dev/null 2>&1; then
        curl -fL --retry 3 --proto '=https' -o "$archive" "$url" \
            || fail "Download failed: $url"
    elif command -v wget >/dev/null 2>&1; then
        wget -q -O "$archive" "$url" || fail "Download failed: $url"
    else
        fail "Neither curl nor wget found — cannot download the server."
    fi
    info "Downloaded $(du -h "$archive" | cut -f1)"

    # Verify the published .sha256 sidecar to catch a truncated / CDN-corrupt /
    # bit-rotted download before extracting. NOTE: this is an integrity check,
    # not an anti-MITM control — the sidecar travels the same HTTPS channel as
    # the archive. Skipped for file:// (the dry-run harness ships no sidecar),
    # and a MISSING sidecar (older release / 404) is a warning, not a failure,
    # so pre-sidecar releases still install. The sidecar body records the BARE
    # basename ("<sha>  <asset>"), so `-c` must run with $tmp as CWD.
    if [[ "$url" != file://* ]]; then
        local sha_url="$url.sha256"
        local sha_file="$archive.sha256"
        local got_sidecar=0
        if command -v curl >/dev/null 2>&1; then
            curl -fsSL --retry 3 --proto '=https' -o "$sha_file" "$sha_url" && got_sidecar=1
        elif command -v wget >/dev/null 2>&1; then
            wget -q -O "$sha_file" "$sha_url" && got_sidecar=1
        fi
        if [[ "$got_sidecar" -eq 1 ]]; then
            local sha_tool=""
            if command -v sha256sum >/dev/null 2>&1; then
                sha_tool="sha256sum"
            elif command -v shasum >/dev/null 2>&1; then
                sha_tool="shasum -a 256"
            fi
            if [[ -n "$sha_tool" ]]; then
                if ( cd "$tmp" && $sha_tool -c "$asset.sha256" >/dev/null 2>&1 ); then
                    info "Checksum verified"
                else
                    fail "Checksum mismatch — download is corrupt. Re-run the installer."
                fi
            else
                warn "No sha256sum/shasum available — skipping checksum verification"
            fi
        else
            warn "No .sha256 sidecar published for this release — skipping checksum verification"
        fi
    fi

    # Extract into a fresh dir, then atomically swap so a failed extract never
    # leaves a half-written install behind.
    step "Installing to $INSTALL_DIR"
    local staging="$tmp/extract"
    mkdir -p "$staging"
    tar xzf "$archive" -C "$staging" || fail "Extraction failed (corrupt download?)"

    # The artifact is a PyInstaller onedir whose single top-level entry is the
    # bundle dir. Resolve it rather than assuming the name.
    local bundle=""
    if [[ -d "$staging/$BUNDLE_DIRNAME" ]]; then
        bundle="$staging/$BUNDLE_DIRNAME"
    else
        bundle="$(find "$staging" -mindepth 1 -maxdepth 1 -type d -print -quit)"
    fi
    [[ -n "$bundle" && -d "$bundle" ]] || fail "Could not locate the server bundle inside the archive"
    [[ -x "$bundle/$BINARY_NAME" ]] || fail "Server binary missing or not executable: $bundle/$BINARY_NAME"

    # Stop any running service before swapping files (avoids 'text file busy').
    stop_service

    rm -rf "$INSTALL_DIR"
    mkdir -p "$(dirname "$INSTALL_DIR")"
    mv "$bundle" "$INSTALL_DIR"
    chmod +x "$INSTALL_DIR/$BINARY_NAME"

    BINARY_PATH="$INSTALL_DIR/$BINARY_NAME"
    info "Server installed at $BINARY_PATH"
}

# ─── Service management ───────────────────────────────────────────────
stop_service() {
    if [[ "$OS" == "linux" ]]; then
        systemctl --user stop sanketra 2>/dev/null || true
    elif [[ "$OS" == "macos" ]]; then
        launchctl unload "$HOME/Library/LaunchAgents/com.miconterm.server.plist" 2>/dev/null || true
    fi
}

install_service_linux() {
    step "Installing systemd user service"
    local unit_dir="$HOME/.config/systemd/user"
    mkdir -p "$unit_dir"
    local unit_path="$unit_dir/sanketra.service"

    # Login-scoped, NOT lingered — mirrors the canonical deploy/systemd/
    # sanketra.service. The server captures the mic via PipeWire/PulseAudio,
    # whose socket lives in the user's GRAPHICAL session ($XDG_RUNTIME_DIR).
    # Binding to graphical-session.target starts it on login and stops it on
    # logout, with the session audio env present. `loginctl enable-linger`
    # would bring the user manager up at BOOT with no graphical session — no
    # audio socket, no DISPLAY — so mic init would fail ("cannot open shared
    # connection to PulseAudio"). Do NOT add linger here.
    cat > "$unit_path" <<EOF
[Unit]
Description=Sanketra Server
# Start only once the graphical session (and its audio socket) is up.
After=graphical-session.target
PartOf=graphical-session.target
# Crash-loop guard: at most 5 restarts in 60s, then stop. [Unit] directives —
# systemd silently ignores StartLimit* if placed under [Service].
StartLimitIntervalSec=60
StartLimitBurst=5

[Service]
Type=simple
WorkingDirectory=$INSTALL_DIR
ExecStart=$BINARY_PATH --service
Restart=on-failure
RestartSec=5
TimeoutStopSec=10
KillSignal=SIGTERM

[Install]
# Login-scoped: pulled in when the graphical session starts, torn down on
# logout. NOT default.target (that would survive logout without audio env).
WantedBy=graphical-session.target
EOF

    info "Unit written: $unit_path"
    # daemon-reload doubles as the cheapest user-bus probe: on a no-bus box
    # (SSH-only headless first install, `sudo -i`/`su -` into the install user,
    # container) every `systemctl --user` call exits 1 with "Failed to connect
    # to bus". The old `2>/dev/null || true` swallowed that and printed success
    # anyway — a flat lie, with the service never started and zero diagnostic.
    if systemctl --user daemon-reload 2>/dev/null; then
        # enable (no --now): the unit is WantedBy=graphical-session.target on
        # purpose (needs the session's PipeWire/PulseAudio socket), so it must be
        # pulled in by the target, not force-started here. The separate restart
        # does the start; is-active then reports from ACTUAL state, not assertion.
        systemctl --user enable sanketra 2>/dev/null || true
        systemctl --user restart sanketra 2>/dev/null || true
        if systemctl --user is-active --quiet sanketra; then
            info "Service running (systemd user)"
        else
            warn "Service not active. Check:"
            warn "  systemctl --user status sanketra"
            warn "  journalctl --user -u sanketra -n 50"
        fi
    else
        warn "No user D-Bus session bus reachable — unit written but NOT enabled/started."
        warn "  After a graphical login, run: systemctl --user enable --now sanketra"
    fi
}

install_service_macos() {
    step "Installing launchd LaunchAgent"
    local agent_dir="$HOME/Library/LaunchAgents"
    mkdir -p "$agent_dir"
    local plist_path="$agent_dir/com.miconterm.server.plist"
    local log_dir="$INSTALL_DIR/logs"
    mkdir -p "$log_dir"

    cat > "$plist_path" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.miconterm.server</string>
    <key>ProgramArguments</key>
    <array>
        <string>$BINARY_PATH</string>
        <string>--service</string>
    </array>
    <key>WorkingDirectory</key>
    <string>$INSTALL_DIR</string>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <dict>
        <key>SuccessfulExit</key>
        <false/>
    </dict>
    <key>StandardOutPath</key>
    <string>$log_dir/server.log</string>
    <key>StandardErrorPath</key>
    <string>$log_dir/server_err.log</string>
</dict>
</plist>
EOF

    info "Agent written: $plist_path"
    launchctl unload "$plist_path" 2>/dev/null || true
    launchctl load "$plist_path" 2>/dev/null || true
    # Verify REGISTRATION instead of asserting it. `load`'s exit + stderr were
    # being swallowed, so a genuinely-failed load (bad $BINARY_PATH, malformed
    # plist) still printed green. NOTE: this confirms the agent is registered,
    # not that it stays running — with KeepAlive{SuccessfulExit=false}+RunAtLoad
    # a binary that boot-crashes on bind can still list with a nonzero exit.
    if launchctl list 2>/dev/null | grep -q com.miconterm.server; then
        info "Service loaded (launchd)"
    else
        warn "launchctl load failed — the LaunchAgent is not registered."
        warn "  Try: launchctl bootstrap gui/$(id -u) \"$plist_path\""
    fi
}

# ─── macOS: port 5000 AirPlay conflict notice ─────────────────────────
check_macos_port() {
    [[ "$OS" == "macos" ]] || return 0
    if lsof -iTCP:5000 -sTCP:LISTEN >/dev/null 2>&1; then
        warn "Port 5000 in use (probably AirPlay Receiver)"
        echo "    Server will try to fall back to port 5001."
        echo "    If the server still fails to bind, free port 5000:"
        echo "    System Settings -> General -> AirDrop & Handoff -> AirPlay Receiver -> OFF"
    fi
}

# ─── Linux: detect & reap stale sanketra on port 5000 ─────────────────
check_linux_port() {
    [[ "$OS" == "linux" ]] || return 0
    command -v ss >/dev/null 2>&1 || return 0

    # `|| true`: under `set -euo pipefail` a no-match grep here (the common
    # clean-machine case: nothing on :5000) would abort the whole installer.
    local pid=""
    pid=$(ss -ltnHp 2>/dev/null | grep ':5000 ' | grep -oE 'pid=[0-9]+' | head -1 | cut -d= -f2 || true)
    if [[ -z "$pid" ]]; then
        # Empty pid does NOT mean the port is free: ss/lsof hide the owner PID
        # for sockets we don't own (cross-user / system service) without root.
        # Split "port occupied" from "PID identified" — warn if occupied so the
        # user isn't told it's free when the server will boot-crash on bind.
        if ss -ltnH 2>/dev/null | grep -q ':5000 '; then
            warn "Port 5000 is in use but I couldn't identify the owner (may need sudo/lsof)."
            echo "    The Linux server binds 5000 directly and does NOT auto-fallback —"
            echo "    free it, or run the server with --port <free-port>."
        fi
        return 0
    fi

    local cmdline=""
    [[ -r "/proc/$pid/cmdline" ]] && cmdline=$(tr '\0' ' ' < "/proc/$pid/cmdline")

    if printf '%s' "$cmdline" | grep -qE "sanketra"; then
        warn "Port 5000 occupied by a previous Sanketra server (PID $pid) — replacing"
        kill "$pid" 2>/dev/null || true
        local _i=0
        while [[ $_i -lt 5 ]]; do
            kill -0 "$pid" 2>/dev/null || break
            sleep 1
            _i=$((_i + 1))
        done
        if kill -0 "$pid" 2>/dev/null; then
            kill -9 "$pid" 2>/dev/null || true
            sleep 1
        fi
        info "Old server stopped"
    else
        warn "Port 5000 in use by an unrelated process (PID $pid):"
        echo "    $cmdline"
        echo "    Free port 5000 (stop that process) before starting Sanketra,"
        echo "    or run the server with --port <free-port>. The Linux server"
        echo "    binds 5000 directly and does NOT auto-fallback."
    fi
}

# ─── Final message ────────────────────────────────────────────────────
show_done() {
    echo ""
    echo "==============================================="
    printf "  %sSanketra is ready!%s\n" "${GREEN}${BOLD}" "${NC}"
    echo ""
    echo "  Open the Sanketra app on your phone."
    echo "  Make sure your phone is on the same WiFi."
    echo "  The app will find this computer automatically,"
    echo "  or scan the pairing QR shown by the server."
    echo "==============================================="
    echo ""
}

# ─── Main ─────────────────────────────────────────────────────────────
main() {
    echo ""
    printf "%sSanketra Installer%s\n" "${BOLD}" "${NC}"
    echo "======================"

    detect_os
    info "Detected OS: $OS"

    if [[ "$OS" == "linux" ]]; then
        install_runtime_tools_linux
        check_linux_port
    else
        install_runtime_tools_macos
    fi

    download_and_extract

    if [[ "$OS" == "linux" ]]; then
        install_service_linux
    else
        install_service_macos
        check_macos_port
    fi

    show_done
}

main "$@"
