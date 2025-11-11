
const dbAPIRequests = {
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
};

export default dbAPIRequests;
