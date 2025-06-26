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

echo Generating cheat sheets (PDF and PNG)...
node scripts/generate-direct.js

echo.
echo Done! Check the 'output' folder for your files:
echo - cheat-sheet-6502.pdf
echo - cheat-sheet-6502.png  
echo - cheat-sheet-65C02.pdf
echo - cheat-sheet-65C02.png
echo.
pause
