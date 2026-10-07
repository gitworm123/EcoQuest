@echo off
title EcoQuest – Gamified Environmental Education Platform
echo ==============================================================
echo  🌿 Starting EcoQuest Platform (CEP Project Demonstration)
echo ==============================================================
echo.

python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python was not found in PATH.
    echo Opening index.html directly in your default browser...
    start index.html
    pause
    exit /b
)

python server.py
pause
