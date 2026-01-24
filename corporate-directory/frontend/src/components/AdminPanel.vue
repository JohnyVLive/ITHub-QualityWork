<template>
  <div class="admin-container">
    <div class="admin-header">
      <h1>Панель администратора</h1>
      <div>
        <span style="margin-right: 15px;">Привет, {{ username }}!</span>
        <button class="btn btn-secondary" @click="logout">Выйти</button>
        <button class="btn btn-primary" @click="goToDirectory" style="margin-left: 10px;">
          К справочнику
        </button>
      </div>
    </div>

    <!-- Раздел сотрудников -->
    <div class="admin-section">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
        <h2>Сотрудники</h2>
        <button class="btn btn-success" @click="openEmployeeModal()">
          + Добавить сотрудника
        </button>
      </div>

      <div class="table-container">
        <table v-if="employees.length > 0">
          <thead>
            <tr>
              <th>ФИО</th>
              <th>Внутренний</th>
              <th>Городской</th>
              <th>Мобильный</th>
              <th>Email</th>
              <th>Должность</th>
              <th>Отдел</th>
              <th>Компания</th>
              <th>Площадка</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="employee in employees" :key="employee.id">
              <td>{{ employee.full_name }}</td>
              <td>{{ employee.internal_number }}</td>
              <td>{{ employee.city_number }}</td>
              <td>{{ employee.mobile_number }}</td>
              <td>{{ employee.email }}</td>
              <td>{{ employee.position }}</td>
              <td>{{ employee.department }}</td>
              <td>{{ employee.company_name }}</td>
              <td>{{ employee.site_name }}</td>
              <td>
                <div class="action-buttons">
                  <button class="btn btn-primary" @click="openEmployeeModal(employee)">
                    Изменить
                  </button>
                  <button class="btn btn-danger" @click="handleDeleteEmployee(employee.id)">
                    Удалить
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="empty-state" v-else>
          <p>Нет сотрудников</p>
        </div>
      </div>
    </div>

    <!-- Раздел компаний -->
    <div class="admin-section">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
        <h2>Компании</h2>
        <button class="btn btn-success" @click="openCompanyModal()">
          + Добавить компанию
        </button>
      </div>

      <div class="item-list">
        <div class="item-card" v-for="company in companies" :key="company.id">
          <div>
            <h4>{{ company.name }}</h4>
            <p>{{ company.comment || 'Нет комментария' }}</p>
          </div>
          <div class="action-buttons">
            <button class="btn btn-primary" @click="openCompanyModal(company)">
              Изменить
            </button>
            <button class="btn btn-danger" @click="handleDeleteCompany(company.id)">
              Удалить
            </button>
          </div>
        </div>
        <div class="empty-state" v-if="companies.length === 0">
          <p>Нет компаний</p>
        </div>
      </div>
    </div>

    <!-- Раздел площадок -->
    <div class="admin-section">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
        <h2>Площадки</h2>
        <button class="btn btn-success" @click="openSiteModal()">
          + Добавить площадку
        </button>
      </div>

      <div class="item-list">
        <div class="item-card" v-for="site in sites" :key="site.id">
          <div>
            <h4>{{ site.name }}</h4>
            <p>{{ site.comment || 'Нет комментария' }}</p>
          </div>
          <div class="action-buttons">
            <button class="btn btn-primary" @click="openSiteModal(site)">
              Изменить
            </button>
            <button class="btn btn-danger" @click="handleDeleteSite(site.id)">
              Удалить
            </button>
          </div>
        </div>
        <div class="empty-state" v-if="sites.length === 0">
          <p>Нет площадок</p>
        </div>
      </div>
    </div>

    <!-- Окно редактирования сотрудника -->
    <EmployeeModal
      v-if="showEmployeeModal"
      :employee="selectedEmployee"
      :companies="companies"
      :sites="sites"
      @close="closeEmployeeModal"
      @save="handleSaveEmployee"
    />

    <!-- Окно редактирования компании -->
    <CompanyModal
      v-if="showCompanyModal"
      :company="selectedCompany"
      @close="closeCompanyModal"
      @save="handleSaveCompany"
    />

    <!-- Окно редактирования площадки -->
    <SiteModal
      v-if="showSiteModal"
      :site="selectedSite"
      @close="closeSiteModal"
      @save="handleSaveSite"
    />
  </div>
</template>

<script>
import {
  getAllEmployees,
  getCompanies,
  getSites,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  createCompany,
  updateCompany,
  deleteCompany,
  createSite,
  updateSite,
  deleteSite
} from '../api/api'
import EmployeeModal from './EmployeeModal.vue'
import CompanyModal from './CompanyModal.vue'
import SiteModal from './SiteModal.vue'

export default {
  name: 'AdminPanel',
  components: {
    EmployeeModal,
    CompanyModal,
    SiteModal
  },
  data() {
    return {
      username: '',
      employees: [],
      companies: [],
      sites: [],
      showEmployeeModal: false,
      showCompanyModal: false,
      showSiteModal: false,
      selectedEmployee: null,
      selectedCompany: null,
      selectedSite: null
    }
  },
  methods: {
    async loadData() { // Загрузка всех данных
      try {
        const [employeesRes, companiesRes, sitesRes] = await Promise.all([
          getAllEmployees(),
          getCompanies(),
          getSites()
        ])
        
        this.employees = employeesRes.data
        this.companies = companiesRes.data
        this.sites = sitesRes.data
      } catch (error) {
        console.error('Error loading data:', error)
        if (error.response?.status === 401) {
          this.logout()
        }
      }
    },
    openEmployeeModal(employee = null) { // Открытие модального окна сотрудника
      this.selectedEmployee = employee
      this.showEmployeeModal = true
    },
    closeEmployeeModal() { // Закрытие модального окна сотрудника
      this.showEmployeeModal = false
      this.selectedEmployee = null
    },
    async handleSaveEmployee(employee) { // Сохранение сотрудника
      try {
        if (employee.id) {
          await updateEmployee(employee.id, employee)
        } else {
          await createEmployee(employee)
        }
        await this.loadData()
        this.closeEmployeeModal()
      } catch (error) {
        console.error('Error saving employee:', error)
        alert('Ошибка при сохранении сотрудника')
      }
    },
    async handleDeleteEmployee(id) { // Удаление сотрудника
      if (confirm('Вы уверены, что хотите удалить этого сотрудника?')) {
        try {
          await deleteEmployee(id)
          await this.loadData()
        } catch (error) {
          console.error('Error deleting employee:', error)
          alert('Ошибка при удалении сотрудника')
        }
      }
    },
    openCompanyModal(company = null) { // Открытие модального окна компании
      this.selectedCompany = company
      this.showCompanyModal = true
    },
    closeCompanyModal() { // Закрытие модального окна компании
      this.showCompanyModal = false
      this.selectedCompany = null
    },
    async handleSaveCompany(company) { // Сохранение компании
      try {
        if (company.id) {
          await updateCompany(company.id, company)
        } else {
          await createCompany(company)
        }
        await this.loadData()
        this.closeCompanyModal()
      } catch (error) {
        console.error('Error saving company:', error)
        alert('Ошибка при сохранении компании')
      }
    },
    async handleDeleteCompany(id) { // Удаление компании
      if (confirm('Вы уверены, что хотите удалить эту компанию?')) {
        try {
          await deleteCompany(id)
          await this.loadData()
        } catch (error) {
          console.error('Error deleting company:', error)
          alert('Ошибка при удалении компании')
        }
      }
    },
    openSiteModal(site = null) { // Открытие модального окна площадки
      this.selectedSite = site
      this.showSiteModal = true
    },
    closeSiteModal() { // Закрытие модального окна площадки
      this.showSiteModal = false
      this.selectedSite = null
    },
    async handleSaveSite(site) { // Сохранение площадки
      try {
        if (site.id) {
          await updateSite(site.id, site)
        } else {
          await createSite(site) 
        }
        await this.loadData()
        this.closeSiteModal()
      } catch (error) {
        console.error('Error saving site:', error)
        alert('Ошибка при сохранении площадки')
      }
    },
    async handleDeleteSite(id) { // Удаление площадки
      if (confirm('Вы уверены, что хотите удалить эту площадку?')) {
        try {
          await deleteSite(id)
          await this.loadData()
        } catch (error) {
          console.error('Error deleting site:', error)
          alert('Ошибка при удалении площадки')
        }
      }
    },
    logout() {
      localStorage.removeItem('authToken') // Удаляем токен аутентификации из локального хранилища
      localStorage.removeItem('username') // Удаляем имя пользователя из локального хранилища
      this.$router.push('/login')
    },
    goToDirectory() {
      this.$router.push('/')
    }
  },
  mounted() {
    this.username = localStorage.getItem('username') || 'Администратор'
    this.loadData()
  }
}
</script>

<style scoped>
.admin-container {
  padding: 20px;
  max-width: 1600px;
  margin: 0 auto;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.admin-section {
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  margin-bottom: 20px;
}

.admin-section h2 {
  margin-bottom: 15px;
  color: #2c3e50;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.action-buttons {
  display: flex;
  gap: 5px;
}

.item-list {
  display: grid;
  gap: 10px;
}

.item-card {
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-card h4 {
  margin-bottom: 5px;
  color: #2c3e50;
}

.item-card p {
  color: #7f8c8d;
  font-size: 14px;
}


/* Стили таблиц */
.table-container {
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background-color: #34495e;
  color: white;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  font-size: 12px;
}

th {
  font-weight: 00;
  cursor: pointer;
  user-select: none;
}

th:hover {
  background-color: #2c3e50;
}

th.sortable::after {
  content: ' ⇅';
  opacity: 0.3;
}

th.sorted-asc::after {
  content: ' ↑';
  opacity: 1;
}

th.sorted-desc::after {
  content: ' ↓';
  opacity: 1;
}

tbody tr:hover {
  background-color: #f8f9fa;
}

tbody tr:last-child td {
  border-bottom: none;
}

/* Стиль кнопок */
.btn {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}

.btn-primary:hover {
  background-color: #2980b9;
}

.btn-primary.active {
  background-color: #2980b9;
  box-shadow: 0 0 0 2px #fff;
}

.btn-secondary {
  background-color: #95a5a6;
  color: white;
}

.btn-secondary:hover {
  background-color: #7f8c8d;
}

.btn-success {
  background-color: #27ae60;
  color: white;
}

.btn-success:hover {
  background-color: #229954;
}

.btn-danger {
  background-color: #e74c3c;
  color: white;
}

.btn-danger:hover {
  background-color: #c0392b;
}

</style>