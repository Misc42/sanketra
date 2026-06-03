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
        case "$PKG" in
            apt)    sudo apt-get update -qq && sudo apt-get install -y -qq "${want[@]}" ;;
            dnf)    sudo dnf install -y -q "${want[@]}" ;;
            pacman) sudo pacman -Sy --noconfirm --needed "${want[@]}" ;;
        esac
        info "Installed: ${want[*]}"
    fi

    # Wayland: ydotool needs its daemon running for uinput access.
    if [[ "$display" == "wayland" ]] && command -v ydotoold >/dev/null 2>&1; then
        if ! pgrep -x ydotoold >/dev/null 2>&1; then
            sudo systemctl enable --now ydotoold 2>/dev/null || true
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

    cat > "$unit_path" <<EOF
[Unit]
Description=Sanketra Server
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
WorkingDirectory=$INSTALL_DIR
ExecStart=$BINARY_PATH --service
Restart=on-failure
RestartSec=5
TimeoutStopSec=10
KillSignal=SIGTERM
Environment=DISPLAY=:0
Environment=DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/%U/bus

[Install]
WantedBy=default.target
EOF

    info "Unit written: $unit_path"
    systemctl --user daemon-reload 2>/dev/null || true
    systemctl --user enable sanketra 2>/dev/null || true
    systemctl --user restart sanketra 2>/dev/null || true
    info "Service enabled + started (systemd user)"
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
    info "Service loaded (launchd)"
}

# ─── macOS: port 5000 AirPlay conflict notice ─────────────────────────
check_macos_port() {
    [[ "$OS" == "macos" ]] || return 0
    if lsof -iTCP:5000 -sTCP:LISTEN >/dev/null 2>&1; then
        warn "Port 5000 in use (probably AirPlay Receiver)"
        echo "    Server will auto-fallback to port 5001"
        echo "    Or: System Settings -> General -> AirDrop & Handoff -> AirPlay Receiver -> OFF"
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
    [[ -z "$pid" ]] && return 0

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
        echo "    Sanketra will auto-fallback to port 5001"
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
