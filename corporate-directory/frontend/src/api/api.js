import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000/api'

export const api = axios.create({
  baseURL: API_BASE_URL
})

// Публичный API
export const getEmployeesByCompany = (companyId) => 
  api.get(`/employees/by-company/${companyId}`)

export const getEmployeesBySite = (siteId) => 
  api.get(`/employees/by-site/${siteId}`)

export const getCompanies = () => 
  api.get('/companies')

export const getCompanyById = (id) => 
  api.get(`/companies/${id}`)

export const getSites = () => 
  api.get('/sites')

export const getSiteById = (id) => 
  api.get(`/sites/${id}`)

// Админский API
export const getAllEmployees = () => 
  api.get('/admin/employees')

export const createEmployee = (employee) => 
  api.post('/admin/employees', employee)

export const updateEmployee = (id, employee) => 
  api.put(`/admin/employees/${id}`, employee)

export const deleteEmployee = (id) => 
  api.delete(`/admin/employees/${id}`)

export const createCompany = (company) => 
  api.post('/admin/companies', company)

export const updateCompany = (id, company) => 
  api.put(`/admin/companies/${id}`, company)

export const deleteCompany = (id) => 
  api.delete(`/admin/companies/${id}`)

export const createSite = (site) => 
  api.post('/admin/sites', site)

export const updateSite = (id, site) => 
  api.put(`/admin/sites/${id}`, site)

export const deleteSite = (id) => 
  api.delete(`/admin/sites/${id}`)