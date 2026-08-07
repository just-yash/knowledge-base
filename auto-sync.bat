@echo off
title Knowledge Base Auto Sync and Push
setlocal enabledelayedexpansion

:: 1. Automatically navigate to workspace root directory
cd /d "%~dp0"

echo.
echo ========================================================
echo   Obsidian Knowledge Base - Auto Sync and Push
echo ========================================================
echo Folder: %CD%
echo.

:: 2. Rebuild vault data file
echo [1/4] Rebuilding vault-data.js...
node build-vault.js
if %errorlevel% neq 0 (
    echo.
    echo ERROR: node build-vault.js failed! Check output above.
    echo.
    pause
    exit /b 1
)
echo Vault data successfully built.
echo.

:: 3. Prompt for commit message
set "user_msg="
set /p "user_msg=Enter commit message (Press Enter for default): "

if "!user_msg!"=="" (
    set "commit_msg=update notes and vault (%DATE% %TIME%)"
) else (
    set "commit_msg=!user_msg!"
)

:: 4. Stage and commit local note/code changes
echo.
echo [2/4] Staging files...
git add .

git diff --cached --quiet
if %errorlevel% neq 0 (
    echo [3/4] Committing: "!commit_msg!"
    git commit -m "!commit_msg!"
    echo Local changes committed cleanly.
) else (
    echo [3/4] No new local changes to commit.
)

:: 5. Pull rebase & push to GitHub
echo.
echo [4/4] Syncing and pushing to GitHub (branch: obsidian)...
git pull origin obsidian --rebase
if %errorlevel% neq 0 (
    echo.
    echo WARNING: git pull --rebase encountered conflicts.
    echo Please resolve any conflicts or check your network.
    echo.
    pause
    exit /b 1
)

git push origin obsidian
if %errorlevel% neq 0 (
    echo.
    echo ERROR: git push failed. Check network or permissions.
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================================
echo   SUCCESS! All changes synced and pushed to GitHub.
echo   GitHub Pages site will update automatically in ~1 min.
echo ========================================================
echo.
pause
