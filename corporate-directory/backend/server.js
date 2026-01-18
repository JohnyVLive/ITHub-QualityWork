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

// ==================== Админские точки для управления сотрудниками ====================

// Вывести всех сотрудников
app.get('/api/admin/employees', (req, res) => {
  db.all(dbAPIRequests.allEmployees, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows);
  });
});

// Создать сотрудника
app.post('/api/admin/employees', (req, res) => {
  const employee = req.body;
  const params = [
    employee.full_name,
    employee.internal_number,
    employee.city_number,
    employee.mobile_number,
    employee.email,
    employee.position,
    employee.department,
    employee.company_id,
    employee.site_id
  ];
  
  db.run(dbAPIRequests.createEmployee, params, function(err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ id: this.lastID, message: 'Employee created' });
  });
});
// Обновить сотрудника
app.put('/api/admin/employees/:id', (req, res) => {
  const employee = req.body;
  const params = [
    employee.full_name,
    employee.internal_number,
    employee.city_number,
    employee.mobile_number,
    employee.email,
    employee.position,
    employee.department,
    employee.company_id,
    employee.site_id,
    req.params.id
  ];
  
  db.run(dbAPIRequests.updateEmployee, params, function(err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ changes: this.changes, message: 'Employee updated' });
  });
});

// Удалить сотрудника
app.delete('/api/admin/employees/:id', (req, res) => {
  db.run(dbAPIRequests.deleteEmployee, [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ changes: this.changes, message: 'Employee deleted' });
  });
});

// ==================== Админские точки для компаний и площадок ====================
// Создать компанию
app.post('/api/admin/companies', (req, res) => {
  const company = req.body;
  const params = [company.name, company.comment];
  
  db.run(dbAPIRequests.createCompany, params, function(err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ id: this.lastID, message: 'Company created' });
  });
} );

// Обновить компанию
app.put('/api/admin/companies/:id', (req, res) => {
  const company = req.body;
  const params = [company.name, company.comment, req.params.id];
  
  db.run(dbAPIRequests.updateCompany, params, function(err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ changes: this.changes, message: 'Company updated' });
  });
});

// Удалить компанию
app.delete('/api/admin/companies/:id', (req, res) => {
  db.run(dbAPIRequests.deleteCompany, [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ changes: this.changes, message: 'Company deleted' });
  });
});

// Создать площадку
app.post('/api/admin/sites', (req, res) => {
  const site = req.body;
  const params = [site.name, site.comment];
  
  db.run(dbAPIRequests.createSite, params, function(err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ id: this.lastID, message: 'Site created' });
  });
} );

// Обновить площадку
app.put('/api/admin/sites/:id', (req, res) => {
  const site = req.body;
  const params = [site.name, site.comment, req.params.id];
  
  db.run(dbAPIRequests.updateSite, params, function(err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ changes: this.changes, message: 'Site updated' });
  });
});

// Удалить площадку
app.delete('/api/admin/sites/:id', (req, res) => {
  db.run(dbAPIRequests.deleteSite, [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ changes: this.changes, message: 'Site deleted' });
  });
});

// Запустить сервер

app.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`);
});
