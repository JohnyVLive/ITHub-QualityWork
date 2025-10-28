import express from 'express';
import db from './database.js';


const app = express();
const PORT = 3000;
app.use(express.json());


// ==================== Публичные точки ====================

// Вывести сотрудников по компании
app.get('/api/employees/by-company/:companyId', (req, res) => {
  const { companyId } = req.params;
  
  db.all(
    `SELECT e.*, c.name as company_name 
     FROM employees e 
     LEFT JOIN companies c ON e.company_id = c.id 
     WHERE e.company_id = ?
     ORDER BY e.full_name`,
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
    `SELECT e.*, s.name as site_name 
     FROM employees e 
     LEFT JOIN sites s ON e.site_id = s.id 
     WHERE e.site_id = ?
     ORDER BY e.full_name`,
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
  db.all('SELECT * FROM companies ORDER BY name', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows);
  });
});

// Вывести компанию по id
app.get('/api/companies/:id', (req, res) => {
  db.get('SELECT * FROM companies WHERE id = ?', [req.params.id], (err, row) => {
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
  db.all('SELECT * FROM sites ORDER BY name', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows);
  });
});

// Вывести площадку по id
app.get('/api/sites/:id', (req, res) => {
  db.get('SELECT * FROM sites WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Site not found' });
    }
    res.json(row);
  });
});

app.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`);
});
