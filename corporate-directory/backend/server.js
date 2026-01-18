import express from 'express'; // Импортируем Express.js
import db from './database.js'; // Импортируем модуль базы данных
import dbAPIRequests from './dbAPIRequests.js'; // Импортируем SQL-запросы
import cors from 'cors'; // Импортируем cors для разрешения кросс-доменных запросов


const app = express();
const PORT = 3000;
app.use(express.json()); 
app.use(cors()); // Разрешаем кросс-доменные запросы


// ==================== Публичные точки ====================

// Вывести сотрудников по компании
app.get('/api/employees/by-company/:companyId', (req, res) => {
  const { companyId } = req.params;
  
  db.all(
    dbAPIRequests.employeesByCompanyId,
    [companyId],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(rows);
    }
  );
});

// Вывести сотрудников по площадке
app.get('/api/employees/by-site/:siteId', (req, res) => {
  const { siteId } = req.params;
  
  db.all(
    dbAPIRequests.employeesBySiteId,
    [siteId],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(rows);
    }
  );
});

// Вывести все компании
app.get('/api/companies', (req, res) => {
  db.all(dbAPIRequests.allCompanies, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows);
  });
});

// Вывести компанию по id
app.get('/api/companies/:id', (req, res) => {
  db.get(dbAPIRequests.companyById, [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Company not found' });
    }
    res.json(row);
  });
});

// Вывести все площадки
app.get('/api/sites', (req, res) => {
  db.all(dbAPIRequests.allSites, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows);
  });
});

// Вывести площадку по id
app.get('/api/sites/:id', (req, res) => {
  db.get(dbAPIRequests.siteById, [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Site not found' });
    }
    res.json(row);
  });
});

// ==================== Админские точки ====================

app.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`);
});
