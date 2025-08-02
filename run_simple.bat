@echo off
echo ========================================
echo PhotoShare Social Media App - Simple Run
echo ========================================
echo.

echo Checking if Python is available...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Python is not installed or not in PATH.
    echo.
    echo Please install Python from: https://www.python.org/downloads/
    echo Make sure to check "Add Python to PATH" during installation.
    echo.
    pause
    exit /b 1
) else (
    echo Python is available.
    python --version
)

echo.
echo Starting simple HTTP server...
echo The application will be available at: http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo.

python -m http.server 8000

pause 