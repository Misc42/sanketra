@echo off
setlocal enabledelayedexpansion
title Sanketra Installer
color 0A

echo.
echo  ========================================
echo   Sanketra Installer for Windows
echo  ========================================
echo.

:: ── Config ───────────────────────────────────────────────────────────
:: Binary install: download the prebuilt server (PyInstaller onedir zip) from
:: GitHub Releases, extract, and register a logon task at the binary. No git,
:: no Python, no venv, no pip — the binary is self-contained.
set "INSTALL_DIR=%USERPROFILE%\sanketra-server"
set "ASSET=Sanketra-Server-x64.zip"
if not defined RELEASE_BASE set "RELEASE_BASE=https://github.com/Misc42/sanketra/releases/latest/download"
set "ASSET_URL=%RELEASE_BASE%/%ASSET%"
:: PyInstaller names the bundle dir + exe after the spec name.
set "BUNDLE_DIRNAME=sanketra-server"
set "BINARY_NAME=sanketra-server.exe"
set "TMP_ZIP=%TEMP%\sanketra-server.zip"
set "STAGING=%TEMP%\sanketra-extract"

:: ── Check for admin (not required, but warn) ────────────────────────
net session >nul 2>&1
if %errorlevel% equ 0 (
    echo  [i] Running as Administrator
) else (
    echo  [i] Running as normal user
    echo      ^(Note: firewall rules for LAN phone access need admin - if the
    echo       phone can't reach this PC, re-run this installer as Administrator.^)
)
echo.

:: ── Stop any running service before we overwrite files ───────────────
echo  -- Stopping any running Sanketra service...
schtasks /end /tn "sanketra" >nul 2>&1
taskkill /im "%BINARY_NAME%" /f >nul 2>&1
:: taskkill returns before the kernel unmaps the killed exe image; give the
:: file lock a moment to release so the reinstall swap below isn't racing a
:: delete-pending handle (killed exe / Defender / indexer).
timeout /t 2 /nobreak >nul 2>&1

:: ── Download the server binary ───────────────────────────────────────
echo.
echo  -- Downloading Sanketra server...
echo     %ASSET_URL%
if exist "%TMP_ZIP%" del /q "%TMP_ZIP%" >nul 2>&1
:: PowerShell is present on every supported Windows; use it for HTTPS + unzip.
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
    "$ErrorActionPreference='Stop'; [Net.ServicePointManager]::SecurityProtocol=[Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -UseBasicParsing -Uri '%ASSET_URL%' -OutFile '%TMP_ZIP%'"
if %errorlevel% neq 0 (
    echo  [X] Download failed.
    echo      Check your internet connection, then retry.
    echo      URL: %ASSET_URL%
    pause
    exit /b 1
)
echo  [OK] Downloaded

:: ── Verify the published .sha256 sidecar ─────────────────────────────
:: install.sh has done this since it was written; this installer did not, so
:: Windows was the one platform that extracted and ran an unverified binary.
:: Same contract as the shell sibling: an integrity check, not an anti-MITM
:: control (the sidecar travels the same HTTPS channel), a MISSING sidecar is a
:: warning so pre-sidecar releases still install, and a MISMATCH is fatal.
:: (Audit 2026-08-11.)
set "TMP_SHA=%TMP_ZIP%.sha256"
if exist "%TMP_SHA%" del /q "%TMP_SHA%" >nul 2>&1
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
    "$ErrorActionPreference='Stop'; [Net.ServicePointManager]::SecurityProtocol=[Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -UseBasicParsing -Uri '%ASSET_URL%.sha256' -OutFile '%TMP_SHA%'" >nul 2>&1
if %errorlevel% neq 0 (
    echo  [!] No checksum sidecar published for this release - skipping verification.
) else (
    powershell -NoProfile -ExecutionPolicy Bypass -Command ^
        "$ErrorActionPreference='Stop'; $want=((Get-Content -Raw '%TMP_SHA%').Trim() -split '\s+')[0].ToLower(); $got=(Get-FileHash -Algorithm SHA256 '%TMP_ZIP%').Hash.ToLower(); if ($want -ne $got) { Write-Host ('      expected ' + $want); Write-Host ('      actual   ' + $got); exit 1 }"
    rem !errorlevel!, not %errorlevel%: inside a parenthesised block the percent
    rem form is substituted when the block is PARSED, before powershell has run,
    rem so the mismatch branch would never fire. setlocal enabledelayedexpansion
    rem is already on at the top of this file.
    if !errorlevel! neq 0 (
        echo  [X] Checksum mismatch - the download is corrupt.
        echo      Re-run this installer. If it keeps failing, report the URL:
        echo      %ASSET_URL%
        del /q "%TMP_ZIP%" >nul 2>&1
        pause
        exit /b 1
    )
    echo  [OK] Checksum verified
)

:: ── Extract to a staging dir, then swap into place ───────────────────
echo.
echo  -- Installing to %INSTALL_DIR% ...
if exist "%STAGING%" rmdir /s /q "%STAGING%" >nul 2>&1
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
    "$ErrorActionPreference='Stop'; Expand-Archive -Path '%TMP_ZIP%' -DestinationPath '%STAGING%' -Force"
if %errorlevel% neq 0 (
    echo  [X] Extraction failed ^(corrupt download?^).
    pause
    exit /b 1
)

:: Resolve the bundle dir inside the zip (prefer the known name, else the only
:: top-level folder) and verify the binary is present.
set "BUNDLE_SRC="
if exist "%STAGING%\%BUNDLE_DIRNAME%\%BINARY_NAME%" (
    set "BUNDLE_SRC=%STAGING%\%BUNDLE_DIRNAME%"
) else (
    for /d %%D in ("%STAGING%\*") do (
        if exist "%%D\%BINARY_NAME%" set "BUNDLE_SRC=%%D"
    )
)
if not defined BUNDLE_SRC (
    echo  [X] Could not find %BINARY_NAME% inside the downloaded archive.
    pause
    exit /b 1
)

:: Swap into place. On reinstall, `move` won't overwrite an existing dir target
:: and `rmdir` can leave it delete-pending if a handle is still held, so the
:: move fails and the old install is gone = NO install. robocopy /MIR mirrors
:: the bundle onto INSTALL_DIR (tolerates a pre-existing target) with built-in
:: retry (/R:5 /W:1) - exit code < 8 is success, >= 8 is failure.
robocopy "%BUNDLE_SRC%" "%INSTALL_DIR%" /MIR /R:5 /W:1 /NFL /NDL /NJH /NJS /NP >nul 2>&1
if %errorlevel% geq 8 (
    echo  [X] Could not install the server into %INSTALL_DIR% ^(file lock or permissions^).
    echo      Close any running Sanketra, then run this installer again.
    pause
    exit /b 1
)
rmdir /s /q "%BUNDLE_SRC%" >nul 2>&1
rmdir /s /q "%STAGING%" >nul 2>&1
del /q "%TMP_ZIP%" >nul 2>&1

set "SERVER_EXE=%INSTALL_DIR%\%BINARY_NAME%"
if not exist "%SERVER_EXE%" (
    echo  [X] Server binary missing after install: %SERVER_EXE%
    pause
    exit /b 1
)
echo  [OK] Server installed at %SERVER_EXE%

:: ── Add Firewall Rules ───────────────────────────────────────────────
echo.
echo  -- Adding firewall rules...
set "FW_OK=1"
netsh advfirewall firewall delete rule name="sanketra" >nul 2>&1
netsh advfirewall firewall delete rule name="sanketra-udp" >nul 2>&1
netsh advfirewall firewall add rule name="sanketra" dir=in action=allow protocol=tcp localport=5000 >nul 2>&1
if %errorlevel% neq 0 set "FW_OK=0"
netsh advfirewall firewall add rule name="sanketra-udp" dir=in action=allow protocol=udp localport=5001 >nul 2>&1
if %errorlevel% neq 0 set "FW_OK=0"
if "%FW_OK%"=="1" (
    echo  [OK] Firewall rules added
) else (
    echo  [!] Firewall rules need admin. Right-click installer and Run as admin.
)

:: ── Register logon task at the binary ────────────────────────────────
echo.
echo  -- Installing service ^(auto-start on login^)...
schtasks /delete /tn "sanketra" /f >nul 2>&1
:: NO /rl HIGHEST - a standard (non-admin) user cannot create a HIGHEST task
:: (ERROR: Access is denied), and the recommended install path IS non-admin.
:: The server needs no elevation: it binds 5000/TCP + 5001/UDP (both >1024,
:: unprivileged on Windows), installs under %USERPROFILE%, and writes no
:: HKLM/Program Files/firewall itself. Default run level (LIMITED) is what a
:: standard user can create. Log the output so a real failure is visible.
schtasks /create /tn "sanketra" /sc ONLOGON /tr "\"%SERVER_EXE%\" --service" /f >"%TEMP%\sanketra-task.log" 2>&1
if %errorlevel% neq 0 (
    echo  [!] Service registration FAILED - auto-start on login will not work:
    type "%TEMP%\sanketra-task.log"
    echo      You can still start the server manually: "%SERVER_EXE%" --service
) else (
    echo  [OK] Logon task registered
)
del /q "%TEMP%\sanketra-task.log" >nul 2>&1

:: ── Start Service ────────────────────────────────────────────────────
echo.
echo  -- Starting server...
schtasks /run /tn "sanketra" >nul 2>&1
if %errorlevel% equ 0 (
    echo  [OK] Server started
) else (
    echo  [!] Could not auto-start. Server will start on next login.
)

:: ── Done ─────────────────────────────────────────────────────────────
:: If the firewall rules could not be added (non-admin token), the phone
:: cannot reach this PC over the LAN - the installer's primary documented use
:: case. Do NOT print "ready" in that case; fail loud so the user re-runs
:: elevated rather than chasing a silent connection-refused on the phone.
if "%FW_OK%"=="0" (
    echo.
    echo  ========================================
    echo   [X] INCOMPLETE: firewall rules were not added.
    echo.
    echo   The server is installed, but WITHOUT the firewall rules your phone
    echo   cannot reach this PC over the LAN. Re-run this installer as
    echo   Administrator ^(right-click -^> Run as administrator^) to finish.
    echo  ========================================
    echo.
    pause
    exit /b 1
)

echo.
echo  ========================================
echo   Sanketra is ready!
echo.
echo   Open the Sanketra app on your phone.
echo   Make sure your phone is on the same WiFi.
echo   The app will find this computer automatically,
echo   or scan the pairing QR shown by the server.
echo  ========================================
echo.
pause
exit /b 0
