<template>
  <div class="modal" @click.self="$emit('close')"> 
    <div class="modal-content">
      <h3>{{ site ? 'Редактировать площадку' : 'Добавить площадку' }}</h3>
      
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>Название площадки *</label>
          <input 
            type="text" 
            v-model="form.name" 
            required
          >
        </div>

        <div class="form-group">
          <label>Комментарий</label>
          <textarea 
            v-model="form.comment"
            rows="4"
            style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-family: inherit;"
          ></textarea>
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
  name: 'SiteModal',
  props: {
    site: Object
  },
  data() {
    return {
      form: {
        name: '',
        comment: ''
      }
    }
  },
  methods: {
    handleSubmit() {
      const data = { ...this.form }
      if (this.site) {
        data.id = this.site.id
      }
      this.$emit('save', data)
    }
  },
  mounted() {
    if (this.site) {
      this.form = {
        name: this.site.name || '',
        comment: this.site.comment || ''
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
.form-group select,
.form-group textarea {
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