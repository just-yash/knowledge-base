@echo off
title Knowledge Base Auto Sync & Push
setlocal enabledelayedexpansion

:: Navigate to vault workspace directory
cd /d "%~dp0"

echo ========================================================
echo   Obsidian Knowledge Base - Auto Sync & Push
echo ========================================================
echo Directory: %CD%
echo.

:: 1. Build vault-data.js
echo [1/4] Rebuilding vault-data.js...
node build-vault.js
if %errorlevel% neq 0 (
    echo.
    echo ERROR: node build-vault.js failed! Check output above.
    echo.
    pause
    exit /b 1
)
echo Done.
echo.

:: 2. Prompt for Commit Message
set "user_msg="
set /p "user_msg=Enter commit message (Press Enter for default): "

if "!user_msg!"=="" (
    set "commit_msg=update notes and vault (%DATE% %TIME%)"
) else (
    set "commit_msg=!user_msg!"
)

:: 3. Stage & Commit
echo.
echo [2/4] Staging changes...
git add .

git status --porcelain > temp_git_status.txt
set "has_changes="
for /f "usebackq tokens=*" %%A in ("temp_git_status.txt") do set "has_changes=1"
del temp_git_status.txt

if defined has_changes (
    echo.
    echo [3/4] Committing: "!commit_msg!"
    git commit -m "!commit_msg!"
) else (
    echo.
    echo No new changes detected to commit.
)

:: 4. Pull Rebase & Push to GitHub
echo.
echo [4/4] Syncing with GitHub (branch: obsidian)...
git pull origin obsidian --rebase
if %errorlevel% neq 0 (
    echo.
    echo WARNING: git pull --rebase encountered conflicts or failed.
    echo Please resolve any conflicts or check your network connection.
    echo.
    pause
    exit /b 1
)

git push origin obsidian
if %errorlevel% neq 0 (
    echo.
    echo ERROR: git push failed. Check your connection or repository permissions.
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================================
echo   SUCCESS! All changes pushed to GitHub.
echo   Site will update automatically on GitHub Pages.
echo ========================================================
echo.
pause
