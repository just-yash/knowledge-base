@echo off
title Vault Deploy
cd /d "%~dp0"

echo.
echo  [1/2] Building vault-data.js...
node build-vault.js
if errorlevel 1 (
  echo  ERROR: build failed. Check the output above.
  pause
  exit /b 1
)
echo  Done.

echo.
echo  [2/2] Pushing to GitHub...
git add vault-data.js
git diff --cached --quiet
if errorlevel 1 (
  git commit -m "chore: rebuild vault (%DATE% %TIME%)"
  git push origin obsidian
  echo  Deployed successfully!
) else (
  echo  No changes to deploy (vault-data.js is up to date).
)

echo.
pause
