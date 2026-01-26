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

// API общего доступа (Запросы для получения данных)
// Запрос для получения всех сотрудников
export const getEmployees = () => 
  api.get('/employees')

// Запрос для получения сотрудника по ID
export const getEmployeeById = (id) => 
  api.get(`/employees/${id}`)

// Запросы для получения сотрудников по ID компании
export const getEmployeesByCompany = (companyId) => 
  api.get(`/employees/by-company/${companyId}`)

// Запрос для получения сотрудников по ID площадки
export const getEmployeesBySite = (siteId) => 
  api.get(`/employees/by-site/${siteId}`)

// Запрос для получения всех компаний
export const getCompanies = () => 
  api.get('/companies')

// Запрос для получения компании по ID
export const getCompanyById = (id) => 
  api.get(`/companies/${id}`)

// Запрос для получения всех площадок
export const getSites = () => 
  api.get('/sites')

// Запрос для получения площадки по ID
export const getSiteById = (id) => 
  api.get(`/sites/${id}`)

// API администрирования (Запросы для получения, создания, обновления и удаления данных)
// Запрос для получения всех сотрудников
export const getAllEmployees = () => 
  api.get('/admin/employees')

// Запрос для получения всех компаний
export const createEmployee = (employee) => 
  api.post('/admin/employees', employee)

// Запрос для получения сотрудника по ID
export const updateEmployee = (id, employee) => 
  api.put(`/admin/employees/${id}`, employee)

// Запрос для удаления сотрудника по ID
export const deleteEmployee = (id) => 
  api.delete(`/admin/employees/${id}`)

// Запросы для компаний и площадок
export const createCompany = (company) => 
  api.post('/admin/companies', company)

// Запрос для обновления информации о компании
export const updateCompany = (id, company) => 
  api.put(`/admin/companies/${id}`, company)

// Запрос для удаления компании по ID
export const deleteCompany = (id) => 
  api.delete(`/admin/companies/${id}`)

// Запрос для создания новой площадки
export const createSite = (site) => 
  api.post('/admin/sites', site)

// Запрос для обновления информации о площадке
export const updateSite = (id, site) => 
  api.put(`/admin/sites/${id}`, site)

// Запрос для удаления площадки по ID
export const deleteSite = (id) => 
  api.delete(`/admin/sites/${id}`)

// API аутентификации
// Запрос для регистрации и входа в систему
export const login = (credentials) => 
  authApi.post('/login', credentials)

// Запрос для регистрации пользователя
export const register = (credentials) => 
  authApi.post('/register', credentials)

// Запрос для проверки токена
export const verifyToken = (token) => 
  authApi.post('/verify', { token })