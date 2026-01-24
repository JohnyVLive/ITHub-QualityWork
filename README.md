# Корпоративный телефонный справочник

Web-приложение для ведения корпоративного телефонного справочника с возможностью отображения данных по компаниям и площадкам.


### Структура проекта

- `frontend/` - Vue.js 3 + Vite фронтенд (порт 5173)
- `backend/` - Node.js API для работы с данными справочника (порт 3000)
- `auth-service/` - Микросервис авторизации Node.js API (порт 3001)

### Требования к окружению

Необходимо, чтобы на компьютере были установлены

- Node.js >= 16.x
- npm >= 8.x


## Запуск проекта

### Автоматический запуск

**Linux/macOS:**
```bash
cd corporate-directory
./start.sh
```

**Windows:**
```cmd
cd corporate-directory
start-all.bat
```

### Ручной запуск

Откройте 3 терминала:

**Терминал 21 - Backend:**
```bash
cd corporate-directory/auth-service
npm install
npm run dev
```

**Терминал 2 - Backend:**
```bash
cd corporate-directory/backend
npm install
npm run dev
```

**Терминал 3 - Frontend:**
```bash
cd corporate-directory/frontend
npm install
npm run dev
```

## Первый запуск 

### 1. Запустите все сервисы (см. выше)

### 2. Создайте администратора

**Вручную из командной строки:**
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

### 3. Откройте приложение

- **Главная страница:** http://localhost:5173


## Использование

### После запуска для пользователей

1. Откройте http://localhost:5173 в браузере
2. Выберите режим отображения: "По компаниям" или "По площадкам"
3. Выберите компанию/площадку из выпадающего списка
4. Используйте поиск для фильтрации данных
5. Кликайте по заголовкам колонок для сортировки

### Для администраторов

