@echo off
echo Запуск сервисов...
echo.

REM Запуск Backend
echo [1/2] Запуск Backend...
start "Backend API" cmd /k "cd backend && npm install && npm run dev"
timeout /t 3 /nobreak > nul

REM Запуск Frontend
echo [2/2] Запуск Frontend...
start "Frontend" cmd /k "cd frontend && npm install && npm run dev"

echo.
echo Все сервисы запущены!
echo.
echo Backend API:  http://localhost:3000
echo Frontend:     http://localhost:5173
echo.
echo Откройте http://localhost:5173 в браузере
pause
