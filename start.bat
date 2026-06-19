@echo off
chcp 65001 >nul
title JELLY BEAD — Dev Server
cd /d "%~dp0"

set "NODE=C:\Program Files\nodejs\node.exe"
set "NPM=C:\Program Files\nodejs\npm.cmd"

if not exist "%NODE%" (
    echo [ОШИБКА] Node.js не найден: %NODE%
    echo Установите Node.js с https://nodejs.org
    pause
    exit /b 1
)

if not exist "node_modules" (
    echo.
    echo === Установка зависимостей (первый запуск) ===
    echo.
    call "%NPM%" install
    if errorlevel 1 (
        echo.
        echo [ОШИБКА] npm install не удался. Освободите место на диске и попробуйте снова.
        pause
        exit /b 1
    )
)

echo.
echo === Запуск JELLY BEAD на http://localhost:3333 ===
echo.
start "" "http://localhost:3333"
call "%NPM%" run dev

pause
