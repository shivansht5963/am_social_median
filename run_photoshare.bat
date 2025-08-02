@echo off
echo ========================================
echo PhotoShare Social Media App Manager
echo ========================================
echo.

:menu
echo Choose an option:
echo 1. Start Tomcat and PhotoShare
echo 2. Stop Tomcat
echo 3. Check if Tomcat is running
echo 4. Open PhotoShare in browser
echo 5. Exit
echo.
set /p choice="Enter your choice (1-5): "

if "%choice%"=="1" goto start
if "%choice%"=="2" goto stop
if "%choice%"=="3" goto check
if "%choice%"=="4" goto open
if "%choice%"=="5" goto exit
goto menu

:start
echo.
echo Starting Tomcat...
cd /d "C:\tomcat\apache-tomcat-9.0.85\bin"
startup.bat
echo.
echo Tomcat is starting up...
echo Please wait a few seconds and then choose option 4 to open the application.
echo.
pause
goto menu

:stop
echo.
echo Stopping Tomcat...
cd /d "C:\tomcat\apache-tomcat-9.0.85\bin"
shutdown.bat
echo.
echo Tomcat is shutting down...
pause
goto menu

:check
echo.
echo Checking if Tomcat is running...
netstat -an | findstr :8080
if %errorlevel% equ 0 (
    echo.
    echo Tomcat is running on port 8080
    echo PhotoShare is available at: http://localhost:8080/photoshare/
) else (
    echo.
    echo Tomcat is not running
)
echo.
pause
goto menu

:open
echo.
echo Opening PhotoShare in your default browser...
start http://localhost:8080/photoshare/
echo.
echo If the page doesn't load, make sure Tomcat is running (option 3)
echo.
pause
goto menu

:exit
echo.
echo Goodbye!
exit /b 0 