<template>
  <div class="modal" @click.self="$emit('close')">
    <div class="modal-content">
      <h3>{{ employee ? 'Редактировать сотрудника' : 'Добавить сотрудника' }}</h3>
      
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>ФИО сотрудника *</label>
          <input 
            type="text" 
            v-model="form.full_name" 
            required
          >
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Внутренний номер</label>
            <input 
              type="text" 
              v-model="form.internal_number"
            >
          </div>

          <div class="form-group">
            <label>Городской номер</label>
            <input 
              type="text" 
              v-model="form.city_number"
            >
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Мобильный номер</label>
            <input 
              type="text" 
              v-model="form.mobile_number"
            >
          </div>

          <div class="form-group">
            <label>Email</label>
            <input 
              type="email" 
              v-model="form.email"
            >
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Должность</label>
            <input 
              type="text" 
              v-model="form.position"
            >
          </div>

          <div class="form-group">
            <label>Отдел</label>
            <input 
              type="text" 
              v-model="form.department"
            >
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Компания</label>
            <select v-model="form.company_id">
              <option :value="null">Не выбрано</option>
              <option v-for="company in companies" :key="company.id" :value="company.id">
                {{ company.name }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label>Площадка</label>
            <select v-model="form.site_id">
              <option :value="null">Не выбрано</option>
              <option v-for="site in sites" :key="site.id" :value="site.id">
                {{ site.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" class="btn btn-secondary" @click="$emit('close')">
            Отмена
          </button>
          <button type="submit" class="btn btn-success">
            Сохранить
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmployeeModal',
  props: {
    employee: Object,
    companies: Array,
    sites: Array
  },
  data() {
    return {
      form: {
        full_name: '',
        internal_number: '',
        city_number: '',
        mobile_number: '',
        email: '',
        position: '',
        department: '',
        company_id: null,
        site_id: null
      }
    }
  },
  methods: {
    handleSubmit() {
      const data = { ...this.form }
      if (this.employee) {
        data.id = this.employee.id
      }
      this.$emit('save', data)
    }
  },
  mounted() {
    if (this.employee) {
      this.form = {
        full_name: this.employee.full_name || '',
        internal_number: this.employee.internal_number || '',
        city_number: this.employee.city_number || '',
        mobile_number: this.employee.mobile_number || '',
        email: this.employee.email || '',
        position: this.employee.position || '',
        department: this.employee.department || '',
        company_id: this.employee.company_id,
        site_id: this.employee.site_id
      }
    }
  }
}
</script>

<style scoped>
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

.modal-content {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-content h3 {
  margin-bottom: 20px;
  color: #2c3e50;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}
.form-group label {
  margin-bottom: 5px;
  font-weight: bold;
}
.form-group input,
.form-group select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}  

.form-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
}

/* Стиль кнопок */
.btn {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
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

</style>