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
    echo  [i] Running as normal user ^(recommended^)
)
echo.

:: ── Stop any running service before we overwrite files ───────────────
echo  -- Stopping any running Sanketra service...
schtasks /end /tn "sanketra" >nul 2>&1
taskkill /im "%BINARY_NAME%" /f >nul 2>&1

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

:: Swap into place
if exist "%INSTALL_DIR%" rmdir /s /q "%INSTALL_DIR%" >nul 2>&1
move "%BUNDLE_SRC%" "%INSTALL_DIR%" >nul
if %errorlevel% neq 0 (
    echo  [X] Could not move the server into %INSTALL_DIR%.
    pause
    exit /b 1
)
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
schtasks /create /tn "sanketra" /sc ONLOGON /rl HIGHEST /tr "\"%SERVER_EXE%\" --service" /f >nul 2>&1
if %errorlevel% neq 0 (
    echo  [!] Service registration had issues. Server may need manual start.
) else (
    echo  [OK] Logon task registered
)

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
