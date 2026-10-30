# Sanketra - Windows one-liner wrapper
# Usage: irm https://raw.githubusercontent.com/Misc42/sanketra/master/install.ps1 | iex
#
# Pulls install.bat and runs it. install.bat is the canonical Windows installer
# (downloads the prebuilt server binary from Releases + registers a logon task);
# this wrapper is just the network-fetch + launch glue for a clean copy-paste UX.

$ErrorActionPreference = 'Stop'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$RawBase = 'https://raw.githubusercontent.com/Misc42/sanketra/master'
$BatUrl  = "$RawBase/install.bat"
$BatPath = Join-Path $env:TEMP 'sanketra-install.bat'

Write-Host ''
Write-Host 'Sanketra Installer (Windows)' -ForegroundColor Green
Write-Host '----------------------------'
Write-Host '[*] Downloading installer...'
Invoke-WebRequest -UseBasicParsing -Uri $BatUrl -OutFile $BatPath

# Normalize line endings to CRLF before handing the .bat to cmd.exe.
# raw.githubusercontent.com serves the stored git BLOB verbatim -- no checkout
# filter runs -- and `.gitattributes *.bat text eol=crlf` forces the blob to LF
# (eol=crlf only converts on checkout, never the blob). cmd.exe mis-parses an
# LF-only .bat: it cannot reliably find the boundaries of multi-line
# parenthesized if()/else()/for blocks, so the installer fails on a clean box.
# A `git clone` on Windows would apply the CRLF filter and mask this; the
# irm|iex one-liner (the advertised install path) does NOT. Idempotent: a CRLF
# file is left unchanged ((?<!\r)\n only matches a bare LF).
(Get-Content -Raw $BatPath) -replace "(?<!`r)`n", "`r`n" | Set-Content -NoNewline $BatPath

Write-Host '[*] Launching installer (a new window will open)...'
# -PassThru + -Wait so we can read the child's exit code; without -PassThru the
# cmdlet returns $null and the bat's exit /b N is lost, so the wrapper would
# print green success even when install.bat failed (download/extract/move/
# firewall all exit non-zero).
$p = Start-Process -FilePath 'cmd.exe' -ArgumentList '/c', $BatPath -Wait -PassThru

Remove-Item -Force $BatPath -ErrorAction SilentlyContinue
Write-Host ''
if ($p.ExitCode -ne 0) {
    Write-Host "[x] Installer failed (exit $($p.ExitCode)). See the installer window above for the error." -ForegroundColor Red
    exit $p.ExitCode
}
Write-Host '[done] Installer finished.' -ForegroundColor Green
