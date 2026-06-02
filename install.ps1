# Sanketra — Windows one-liner wrapper
# Usage: irm https://raw.githubusercontent.com/Misc42/sanketra/master/install.ps1 | iex
#
# Pulls install.bat and runs it. Keeps install.bat as the canonical
# Windows installer (winget + git + venv + service); this wrapper is just
# the network-fetch + launch glue so users get a clean copy-paste UX.

$ErrorActionPreference = 'Stop'

$RawBase = 'https://raw.githubusercontent.com/Misc42/sanketra/master'
$BatUrl  = "$RawBase/install.bat"
$BatPath = Join-Path $env:TEMP 'sanketra-install.bat'

Write-Host ''
Write-Host 'Sanketra Installer (Windows)' -ForegroundColor Green
Write-Host '----------------------------'
Write-Host '[*] Downloading installer...'
Invoke-WebRequest -UseBasicParsing -Uri $BatUrl -OutFile $BatPath

Write-Host '[*] Launching installer (a new window will open)...'
Start-Process -FilePath 'cmd.exe' -ArgumentList '/c', $BatPath -Wait

Remove-Item -Force $BatPath -ErrorAction SilentlyContinue
Write-Host ''
Write-Host '[done] Installer finished.' -ForegroundColor Green
