@echo off
echo ========================================
echo PhotoShare Social Media App Setup
echo ========================================
echo.

echo Checking Java installation...
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo Java is not installed or not in PATH.
    echo.
    echo Please install Java JDK 8 or higher:
    echo 1. Download from: https://www.oracle.com/java/technologies/downloads/
    echo 2. Or use OpenJDK: https://adoptium.net/
    echo 3. Add Java to your PATH environment variable
    echo.
    pause
    exit /b 1
) else (
    echo Java is installed.
    java -version
)

echo.
echo Checking if Tomcat is installed...
if not exist "C:\tomcat" (
    echo Tomcat is not installed.
    echo.
    echo Please install Apache Tomcat:
    echo 1. Download from: https://tomcat.apache.org/download-90.cgi
    echo 2. Extract to C:\tomcat
    echo 3. Set CATALINA_HOME=C:\tomcat
    echo.
    pause
    exit /b 1
) else (
    echo Tomcat found at C:\tomcat
)

echo.
echo Setting up the application...
if not exist "C:\tomcat\webapps\photoshare" (
    mkdir "C:\tomcat\webapps\photoshare"
)

echo Copying files to Tomcat webapps directory...
copy "*.jsp" "C:\tomcat\webapps\photoshare\"
copy "*.css" "C:\tomcat\webapps\photoshare\"
copy "*.js" "C:\tomcat\webapps\photoshare\"

echo.
echo Starting Tomcat server...
cd /d C:\tomcat\bin
startup.bat

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo The application should now be running at:
echo http://localhost:8080/photoshare/
echo.
echo If you see any errors, check:
echo 1. Java is installed and in PATH
echo 2. Tomcat is properly installed at C:\tomcat
echo 3. Port 8080 is not already in use
echo.
echo To stop the server later, run:
echo C:\tomcat\bin\shutdown.bat
echo.
pause 