
const dbAPIRequests = {
    // ==================== Публичные запросы API ====================


    'employeesByCompanyId': `SELECT e.*, c.name as company_name, s.name as site_name 
     FROM employees e 
     LEFT JOIN companies c ON e.company_id = c.id 
     LEFT JOIN sites s ON e.site_id = s.id
     WHERE e.company_id = ?
     ORDER BY e.full_name`,

    'employeesBySiteId': `SELECT e.*, s.name as site_name, c.name as company_name
     FROM employees e 
     LEFT JOIN sites s ON e.site_id = s.id
     LEFT JOIN companies c ON e.company_id = c.id
     WHERE e.site_id = ?
     ORDER BY e.full_name`,

    'allCompanies': `SELECT * FROM companies ORDER BY name`,

    'allSites': `SELECT * FROM sites ORDER BY name`,

    'companyById': `SELECT * FROM companies WHERE id = ?`,

    'siteById': `SELECT * FROM sites WHERE id = ?`,

    // ==================== Админские запросы API ====================
    'allEmployees': `SELECT e.*, c.name as company_name, s.name as site_name 
     FROM employees e 
     LEFT JOIN companies c ON e.company_id = c.id 
     LEFT JOIN sites s ON e.site_id = s.id
     ORDER BY e.full_name`,

    'createEmployee': `INSERT INTO employees (full_name, internal_number, city_number, mobile_number, email, position, department, company_id, site_id) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,

    'updateEmployee': `UPDATE employees 
     SET full_name = ?, internal_number = ?, city_number = ?, mobile_number = ?, email = ?, position = ?, department = ?, company_id = ?, site_id = ? 
     WHERE id = ?`,

    'deleteEmployee': `DELETE FROM employees WHERE id = ?`,

    'createCompany': `INSERT INTO companies (name, comment) VALUES (?, ?)`,
    
    'updateCompany': `UPDATE companies SET name = ?, comment = ? WHERE id = ?`,
    
    'deleteCompany': `DELETE FROM companies WHERE id = ?`,
    
    'createSite': `INSERT INTO sites (name, comment) VALUES (?, ?)`,
    
    'updateSite': `UPDATE sites SET name = ?, comment = ? WHERE id = ?`,
    
    'deleteSite': `DELETE FROM sites WHERE id = ?`
};

export default dbAPIRequests;
