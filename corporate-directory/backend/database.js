import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new sqlite3.Database(join(__dirname, '/db/directory.db'));

// Инициализация базы данных и создание таблиц при первом запуске
db.serialize(() => {
  // Табилца Employees
  db.run(`
    CREATE TABLE IF NOT EXISTS employees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      internal_number TEXT,
      city_number TEXT,
      mobile_number TEXT,
      email TEXT,
      position TEXT,
      department TEXT,
      company_id INTEGER,
      site_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (company_id) REFERENCES companies(id),
      FOREIGN KEY (site_id) REFERENCES sites(id)
    )
  `);

  // Таблица Companies
  db.run(`
    CREATE TABLE IF NOT EXISTS companies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      comment TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Таблица Sites
  db.run(`
    CREATE TABLE IF NOT EXISTS sites (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      comment TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Вставка тестовых данных, если таблицы пусты
  db.get('SELECT COUNT(*) as count FROM companies', (err, row) => {
    if (row.count === 0) {
      db.run('INSERT INTO companies (name, comment) VALUES (?, ?)', 
        ['ООО "Рога и Копыта"', 'Головная компания']);
      db.run('INSERT INTO companies (name, comment) VALUES (?, ?)', 
        ['ООО "Техносервис"', 'Сервисная компания']);
    }
  });

  db.get('SELECT COUNT(*) as count FROM sites', (err, row) => {
    if (row.count === 0) {
      db.run('INSERT INTO sites (name, comment) VALUES (?, ?)', 
        ['Москва, Центральный офис', 'Главный офис в Москве']);
      db.run('INSERT INTO sites (name, comment) VALUES (?, ?)', 
        ['Санкт-Петербург', 'Филиал в СПб']);
    }
  });

  db.get('SELECT COUNT(*) as count FROM employees', (err, row) => {
    if (row.count === 0) {
      db.run(`INSERT INTO employees (full_name, internal_number, city_number, mobile_number, email, position, department, company_id, site_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
        ['Иванов Иван Иванович', '101', '+7(495)123-45-67', '+7(916)111-22-33', 'ivanov@company.ru', 'Директор', 'Руководство', 1, 1]);
      db.run(`INSERT INTO employees (full_name, internal_number, city_number, mobile_number, email, position, department, company_id, site_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
        ['Петров Петр Петрович', '102', '+7(495)123-45-68', '+7(916)222-33-44', 'petrov@company.ru', 'IT-специалист', 'IT-отдел', 1, 1]);
      db.run(`INSERT INTO employees (full_name, internal_number, city_number, mobile_number, email, position, department, company_id, site_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
        ['Сидорова Анна Сергеевна', '201', '+7(812)765-43-21', '+7(921)333-44-55', 'sidorova@company.ru', 'Бухгалтер', 'Бухгалтерия', 1, 2]);
    }
  });
});

export default db;