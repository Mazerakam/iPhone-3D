@echo off
title Serveur Web Local
color 0A

echo ================================
echo    SERVEUR WEB LOCAL
echo ================================
echo.

REM Obtenir l'adresse IP locale
for /f "tokens=2 delims=:" %%i in ('ipconfig ^| findstr /i "IPv4"') do (
    for /f "tokens=1" %%j in ("%%i") do set LOCAL_IP=%%j
)

REM Nettoyer l'IP (supprimer les espaces)
set LOCAL_IP=%LOCAL_IP: =%

REM Définir le port (vous pouvez le changer)
set PORT=8000

echo Demarrage du serveur web...
echo.
echo Votre site sera accessible sur :
echo - PC Local    : http://localhost:%PORT%
echo - PC Local    : http://127.0.0.1:%PORT%
echo - Reseau/Mobile : http://%LOCAL_IP%:%PORT%
echo.
echo IMPORTANT pour mobile :
echo 1. Connectez votre mobile au meme WiFi
echo 2. Utilisez l'adresse : http://%LOCAL_IP%:%PORT%
echo.
echo Appuyez sur Ctrl+C pour arreter le serveur
echo ================================
echo.

REM Vérifier si Python est installé
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERREUR: Python n'est pas installe ou pas dans le PATH
    echo Veuillez installer Python depuis https://python.org
    pause
    exit /b 1
)

REM Créer le serveur Python personnalisé
echo import http.server > temp_server.py
echo import socketserver >> temp_server.py
echo import os >> temp_server.py
echo import urllib.parse >> temp_server.py
echo. >> temp_server.py
echo class CustomHandler(http.server.SimpleHTTPRequestHandler): >> temp_server.py
echo     def do_GET(self): >> temp_server.py
echo         # Decode URL >> temp_server.py
echo         path = urllib.parse.unquote(self.path) >> temp_server.py
echo         # Remove leading slash >> temp_server.py
echo         if path.startswith('/'): >> temp_server.py
echo             path = path[1:] >> temp_server.py
echo         # Handle root >> temp_server.py
echo         if path == '' or path == '/': >> temp_server.py
echo             path = 'index.html' >> temp_server.py
echo         # Add .html extension if no extension and file exists >> temp_server.py
echo         elif '.' not in os.path.basename(path): >> temp_server.py
echo             html_path = path + '.html' >> temp_server.py
echo             if os.path.exists(html_path): >> temp_server.py
echo                 path = html_path >> temp_server.py
echo         # Update the path >> temp_server.py
echo         self.path = '/' + path >> temp_server.py
echo         # Call parent method >> temp_server.py
echo         return super().do_GET() >> temp_server.py
echo. >> temp_server.py
echo PORT = %PORT% >> temp_server.py
echo Handler = CustomHandler >> temp_server.py
echo. >> temp_server.py
echo with socketserver.TCPServer(("0.0.0.0", PORT), Handler) as httpd: >> temp_server.py
echo     print(f"Serveur demarre sur le port {PORT}") >> temp_server.py
echo     httpd.serve_forever() >> temp_server.py

REM Démarrer le serveur HTTP Python personnalisé
python temp_server.py

REM Nettoyer le fichier temporaire
del temp_server.py 2>nul

pause