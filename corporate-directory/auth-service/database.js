import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Подключаем к базе данных SQLite
const db = new sqlite3.Database(join(__dirname, '/db/auth.db'));

// Инициализация базы данных и создание таблиц при первом запуске
db.serialize(() => {
  // Создание таблицы пользователей, если она не существует
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

export default db;