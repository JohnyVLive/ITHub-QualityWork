#!/bin/bash

echo "Запуск сервисов..."
echo ""

GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}[1/2] Запуск Backend...${NC}"
cd backend
npm install > /dev/null 2>&1
node server.js &
BACKEND_PID=$!
cd ..

sleep 2

echo -e "${BLUE}[2/2] Запуск Frontend...${NC}"
cd frontend
npm install > /dev/null 2>&1
npm run dev &
FRONTEND_PID=$!
cd ..
sleep 2

echo ""
echo -e "${GREEN}Все сервисы запущены!${NC}"
echo ""
echo "Backend API:  http://localhost:3000 (PID: $BACKEND_PID)"
echo "Frontend App: http://localhost:5173 (PID: $FRONTEND_PID)"
echo ""
echo "Откройте http://localhost:5173 в браузере"
echo "Для остановки нажмите Ctrl+C"

wait
