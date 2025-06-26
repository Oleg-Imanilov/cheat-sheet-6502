@echo off
echo 6502/65C02 Cheat Sheet Generator
echo ================================
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    echo.
)

echo Generating cheat sheets (HTML, PDF and PNG)...
npm run generate-all

echo.
echo Done! Check the 'output' folder for your files:
echo.
pause
