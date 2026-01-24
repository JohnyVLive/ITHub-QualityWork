@echo off
echo Запуск сервисов...
echo.

REM Запуск Auth Service
echo [1/3] Запуск Auth Service...
start "Auth Service" cmd /k "cd auth-service && npm install && npm run dev"
timeout /t 3 /nobreak > nul

REM Запуск Backend
echo [2/3] Запуск Backend...
start "Backend API" cmd /k "cd backend && npm install && npm run dev"
timeout /t 3 /nobreak > nul

REM Запуск Frontend
echo [3/3] Запуск Frontend...
start "Frontend" cmd /k "cd frontend && npm install && npm run dev"

echo.
echo Все сервисы запущены!
echo.
echo Auth Service: http://localhost:3001
echo Backend API:  http://localhost:3000
echo Frontend:     http://localhost:5173
echo.
echo Откройте http://localhost:5173 в браузере
pause
