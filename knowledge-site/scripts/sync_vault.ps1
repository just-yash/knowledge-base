$ErrorActionPreference = "Stop"

param(
  [string]$Source = "C:\Users\YASH\quartz\content"
)

$Root = Split-Path -Parent $PSScriptRoot
$Target = Join-Path $Root "content"

if (-not (Test-Path -LiteralPath $Source)) {
  throw "Source vault not found: $Source"
}

if (Test-Path -LiteralPath $Target) {
  Remove-Item -LiteralPath $Target -Recurse -Force
}

New-Item -ItemType Directory -Force -Path $Target | Out-Null

Get-ChildItem -LiteralPath $Source -Force |
  Where-Object { $_.Name -ne ".obsidian" } |
  ForEach-Object {
    Copy-Item -LiteralPath $_.FullName -Destination $Target -Recurse -Force
  }

Write-Host "Synced vault into $Target"
