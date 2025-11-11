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