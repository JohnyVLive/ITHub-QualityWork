<template>
  <div class="phonebook">
    <!-- Переключатель режимов просмотра -->
    <div class="view-switcher">
      <button 
        :class="['view-btn', { active: viewMode === 'company' }]"
        @click="switchToCompanyView()"
      >
        По компаниям
      </button>
      <button 
        :class="['view-btn', { active: viewMode === 'site' }]"
        @click="switchToSiteView()"
      >
        По площадкам
      </button>
    </div>

    <!-- Заголовок с выбором компании/площадки -->
    <div class="title-section">
      <h2 class="main-title">
        {{ currentTitle }}
      </h2>
      
      <!-- Комментарий -->
      <div class="comment-section" v-if="currentComment">
        <div class="comment-box">
          <p class="comment-text">Описание: {{ currentComment }}</p>
        </div>
      </div>
      
      <div class="selector">
        <label>
          {{ viewMode === 'company' ? 'Выберите компанию:' : 'Выберите площадку:' }}
        </label>
        <select 
          v-if="viewMode === 'company'" 
          v-model="selectedCompanyId" 
          @change="loadEmployees"
          class="select-field"
        >
          <option 
            v-for="company in companies" 
            :key="company.id" 
            :value="company.id"
          >
            {{ company.name }}
          </option>
        </select>
        <select 
          v-else 
          v-model="selectedSiteId" 
          @change="loadEmployees"
          class="select-field"
        >
          <option 
            v-for="site in sites" 
            :key="site.id" 
            :value="site.id"
          >
            {{ site.name }}
          </option>
        </select>
      </div>
    </div>

    <!-- Поиск -->
    <div class="search-section">
      <input 
        v-model="searchQuery"
        type="text"
        placeholder="Поиск по любому полю..."
        class="search-input"
      />
      <button 
        @click="clearSearch" 
        class="clear-btn" 
        v-if="searchQuery">
        Очистить
      </button>
    </div>

    <!-- Загрузка -->
    <div v-if="loading" class="loading">
      Загрузка данных...
    </div>

    <!-- Таблица сотрудников -->
    <div v-else class="table-wrapper">
      <table class="employees-table" >
        <thead>
          <tr>
            <th
                v-for="column in tableColumns"
                :key="column.key"
                class="sortable"
                :class="getSortClass(column.key)"
                @click="sortBy(column.key)"
              >
                {{ column.label }}

            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredEmployees.length === 0">
            <td colspan="8" class="no-data">
              {{ searchQuery ? 'Ничего не найдено' : 'Нет данных' }}
            </td>
          </tr>
          <tr v-for="employee in filteredEmployees" :key="employee.id">
              <td>{{ employee.full_name }}</td>
              <td>{{ employee.internal_number }}</td>
              <td>{{ employee.city_number }}</td>
              <td>{{ employee.mobile_number }}</td>
              <td><a v-bind:href="`mailto:${employee.email}`">{{ employee.email}} </a></td>
              <td>{{ employee.position }}</td>
              <td>{{ employee.department }}</td>
              <td v-if="viewMode === 'site'">{{ employee.company_name }}</td>
              <td v-if="viewMode === 'company'">{{ employee.site_name }}</td>
          </tr>
        </tbody>
      </table>
    </div>


    <!-- Информация о количестве записей -->
    <div class="footer-info" v-if="!loading">
      Найдено записей: {{ employees.length }}
    </div>
  </div>
</template>

<script>
import { getCompanies, getSites, getEmployeesByCompany, getEmployeesBySite, getCompanyById, getSiteById } from '../api/api'

export default {
  name: 'DirectoryView',
  data() {
    return {
      viewMode: 'company', // 'company' или 'site'
      companies: [],
      sites: [],
      selectedCompanyId: null,
      selectedSiteId: null,
      employees: [],
      searchQuery: '',
      loading: false,
      currentComment: '',
      sortKey: 'full_name',
      sortOrder: 'asc',
      searchTimeout: null
    }
  },
  computed: {
    currentTitle() {
      if (this.viewMode === 'company') {
        const company = this.companies.find(c => c.id === this.selectedCompanyId)
        return company ? `Компания - ${company.name}` : 'Отображение по компании'
      } else {
        const site = this.sites.find(s => s.id === this.selectedSiteId)
        return site ? `Площадка - ${site.name}` : 'Отображение по площадке'
      }
    },
    tableColumns() {
      const baseColumns = [
        { key: 'full_name', label: 'ФИО сотрудника' },
        { key: 'internal_number', label: 'Внутренний номер' },
        { key: 'city_number', label: 'Городской номер' },
        { key: 'mobile_number', label: 'Мобильный номер' },
        { key: 'email', label: 'Email' },
        { key: 'position', label: 'Должность' },
        { key: 'department', label: 'Отдел' }
      ]
      
      if (this.viewMode === 'company') {
        baseColumns.push({ key: 'company_name', label: 'Площадка' })
      } else {
        baseColumns.push({ key: 'site_name', label: 'Компания' })
      }
      
      return baseColumns
    },
    filteredEmployees() {
      let filtered = this.employees
      // Фильтрация по поисковому запросу
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(emp => {
          return Object.values(emp).some(value => {
            return value && value.toString().toLowerCase().includes(query)
          })
        })
      }

      // Сортировка
      if (this.sortKey) {
        filtered = filtered.sort((a, b) => {
          let aVal = a[this.sortKey] || ''
          let bVal = b[this.sortKey] || ''

          if (typeof aVal === 'string') {
            aVal = aVal.toLowerCase()
            bVal = bVal.toLowerCase()
          }

          return aVal < bVal ? (this.sortOrder === 'asc' ? -1 : 1) : (aVal > bVal ? (this.sortOrder === 'asc' ? 1 : -1) : 0)
        })
      }
      return filtered
    }
  },
  methods: {
    // Переключение режима просмотра
    switchToCompanyView() {
      this.viewMode = 'company'
      this.loadEmployees()
    },
    switchToSiteView() {
      this.viewMode = 'site'
      this.loadEmployees()
    },

    // Инициализация данных
    async loadData() {
      try {
        const [companiesRes, sitesRes] = await Promise.all([
          getCompanies(),
          getSites()
        ])
        
        this.companies = companiesRes.data
        this.sites = sitesRes.data
        
        if (this.companies.length > 0 && !this.selectedCompanyId) {
          this.selectedCompanyId = this.companies[0].id
        }
        
        if (this.sites.length > 0 && !this.selectedSiteId) {
          this.selectedSiteId = this.sites[0].id
        }
        
        await this.loadEmployees()
      } catch (error) {
        console.error('Error loading data:', error)
      }
    },

    async loadEmployees() {
      try {
        if (this.viewMode === 'company' && this.selectedCompanyId) {
          const [employeesRes, companyRes] = await Promise.all([
            getEmployeesByCompany(this.selectedCompanyId),
            getCompanyById(this.selectedCompanyId)
          ])
          this.employees = employeesRes.data
          this.currentComment = companyRes.data.comment || ''
        } else if (this.viewMode === 'site' && this.selectedSiteId) {
          const [employeesRes, siteRes] = await Promise.all([
            getEmployeesBySite(this.selectedSiteId),
            getSiteById(this.selectedSiteId)
          ])
          this.employees = employeesRes.data
          this.currentComment = siteRes.data.comment || ''
        }
      } catch (error) {
        console.error('Error loading employees:', error)
      }
    },

    // Сортировка
    sortBy(key) {
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'
      } else {
        this.sortKey = key
        this.sortOrder = 'asc'
      }
    },

    getSortClass(key) {
      if (this.sortKey === key) {
        return this.sortOrder === 'asc' ? 'sorted-asc' : 'sorted-desc'
      }
      return ''
    },

    // Очистка поиска
    clearSearch() {
      this.searchQuery = ''
      this.loadEmployees()
    }
  
  },
  mounted() {
    this.loadData()
  }

}
</script>

<style scoped>
.phonebook {
  background: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Переключатель режимов */
.view-switcher {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  justify-content: center;
}

.view-btn {
  padding: 12px 30px;
  font-size: 16px;
  font-weight: 500;
  border: 2px solid #667eea;
  background: white;
  color: #667eea;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.view-btn:hover {
  background: #f0f0f0;
}

.view-btn.active {
  background: #667eea;
  color: white;
}

/* Секция заголовка */
.title-section {
  margin-bottom: 30px;
}

.main-title {
  font-size: 1.8rem;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 600;
}

/* Комментарий */
.comment-section {
  margin-bottom: 20px;
}

.comment-box {
  background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%);
  border-left: 4px solid #667eea;
  padding: 15px 20px;
  border-radius: 8px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.comment-text {
  flex: 1;
  font-size: 15px;
  line-height: 1.6;
  color: #444;
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.selector {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

.selector label {
  font-size: 16px;
  font-weight: 500;
  color: #555;
}

.select-field {
  padding: 10px 20px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 8px;
  background: white;
  color: #333;
  cursor: pointer;
  transition: border-color 0.3s ease;
  min-width: 250px;
}

.select-field:hover {
  border-color: #667eea;
}

.select-field:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

/* Поиск */
.search-section {
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
  align-items: center;
}

.search-input {
  flex: 1;
  padding: 12px 20px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 8px;
  transition: border-color 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.clear-btn {
  padding: 12px 24px;
  font-size: 16px;
  background: #f44336;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
}

.clear-btn:hover {
  background: #d32f2f;
}

/* Загрузка */
.loading {
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #667eea;
}

/* Таблица */
.table-wrapper {
  overflow-x: auto;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.employees-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 1000px;
}

.employees-table thead {
  background: #667eea;
  color: white;
}

.employees-table th {
  padding: 15px 12px;
  text-align: left;
  font-weight: 600;
  font-size: 14px;
  white-space: nowrap;
  word-break: normal;
  /* width: 170px; */
}

.employees-table th.sortable {
  cursor: pointer;
  user-select: none;
}

.employees-table th.sortable:hover {
  background: rgba(255, 255, 255, 0.1);
}

.employees-table tbody tr {
  border-bottom: 1px solid #e0e0e0;
}

.employees-table tbody tr:hover {
  background: #f5f5f5;
}

.employees-table td {
  padding: 12px;
  font-size: 14px;
  color: #333;
}

.employees-table td.centered {
  text-align: center;
}

.no-data {
  text-align: center;
  padding: 40px !important;
  color: #999;
  font-style: italic;
}

/* Футер */
.footer-info {
  margin-top: 20px;
  text-align: center;
  color: #666;
  font-size: 14px;
  font-weight: 500;
}

/* Адаптивность */
@media (max-width: 768px) {
  .phonebook {
    padding: 20px;
  }

  .main-title {
    font-size: 1.4rem;
  }

  .view-btn {
    padding: 10px 20px;
    font-size: 14px;
  }

  .selector {
    flex-direction: column;
    align-items: stretch;
  }

  .select-field {
    min-width: 100%;
  }

  .search-section {
    flex-direction: column;
  }

  .clear-btn {
    width: 100%;
  }

  .employees-table {
    font-size: 12px;
  }

  .employees-table th,
  .employees-table td {
    padding: 8px;
  }
}
</style>