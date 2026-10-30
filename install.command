#!/usr/bin/env bash
# Sanketra — macOS double-click installer
# Finder opens Terminal and runs this script when double-clicked.
# Delivered inside a .zip to bypass Gatekeeper quarantine flag.

# -u/-o pipefail so an unset var or failed pipe surfaces; deliberately NOT -e —
# this wrapper must STAY ALIVE past an installer failure to print its own
# verdict and the trailing `read` (on the Finder double-click path, the final
# line here is the ONLY verdict the user reads, so it must tell the truth).
set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
rc=0

# If install.sh is bundled alongside, use it directly
if [[ -f "$SCRIPT_DIR/install.sh" ]]; then
    bash "$SCRIPT_DIR/install.sh"; rc=$?
else
    # Download and run install.sh from GitHub (public deploy repo). Check curl's
    # rc BEFORE running — otherwise a 404 leaves a missing/empty (or stale) file
    # that bash would run regardless.
    echo "Downloading Sanketra installer..."
    if curl -fsSL "https://raw.githubusercontent.com/Misc42/sanketra/master/install.sh" -o "/tmp/sanketra_install.sh"; then
        bash "/tmp/sanketra_install.sh"; rc=$?
    else
        echo "Download failed (could not fetch install.sh)." >&2
        rc=1
    fi
fi

echo ""
if [[ "$rc" -ne 0 ]]; then
    echo "INSTALL FAILED (exit $rc). The error is shown above — scroll up to read it."
    echo "Nothing was installed correctly. Fix the error above and run this again."
else
    echo "Install complete. You can close this window now."
fi
read -rp "Press Enter to exit..."
