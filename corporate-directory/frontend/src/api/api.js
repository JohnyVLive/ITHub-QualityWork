import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000/api'
const AUTH_API_URL = 'http://localhost:3001/api/auth'

// Создание экземпляра axios с базовым URL
export const api = axios.create({
  baseURL: API_BASE_URL
})

export const authApi = axios.create({
  baseURL: AUTH_API_URL
})

// Middleware для добавления токена в заголовки запроса
api.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
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

// Auth API
export const login = (credentials) => 
  authApi.post('/login', credentials)

export const register = (credentials) => 
  authApi.post('/register', credentials)

export const verifyToken = (token) => 
  authApi.post('/verify', { token })