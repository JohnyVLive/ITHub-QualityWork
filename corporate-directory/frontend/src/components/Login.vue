<template>
  <div class="login-container">
    <div class="login-card">
      <h2>Вход в панель администратора</h2>
      
      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Логин</label>
          <input 
            type="text" 
            id="username" 
            v-model="credentials.username"
            required
          >
        </div>

        <div class="form-group">
          <label for="password">Пароль</label>
          <input 
            type="password" 
            id="password" 
            v-model="credentials.password"
            required
          >
        </div>

        <button type="submit" class="btn btn-primary" style="width: 100%">
          Войти
        </button>
      </form>

      <div style="text-align: center; margin-top: 20px;">
        <a href="/" style="color: #3498db; text-decoration: none;">
          ← Вернуться к справочнику
        </a>
      </div>
    </div>
  </div>  
</template>

<script>
import { login } from '../api/api'

export default {
  name: 'Login',
  data() {
    return {
      credentials: {
        username: '',
        password: ''
      },
      error: ''
    }
  },
  methods: {
    async handleLogin() {
      this.error = ''
      
      try {
        const response = await login(this.credentials)
        localStorage.setItem('authToken', response.data.token)
        localStorage.setItem('username', response.data.username)
        this.$router.push('/admin')
      } catch (error) {
        if (error.response?.data?.error === "Invalid credentials"){
          this.error = "Неверный логин или пароль"
          return
        } else this.error = error.response?.data?.error || "Ошибка при попытке входа"
      }
    }
  }
}
</script>

<style scoped>  
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-card {
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
  width: 100%;
  max-width: 400px;
}

.login-card h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #2c3e50;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #555;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-group input:focus {
  outline: none;
  border-color: #3498db;
}

.error-message {
  background-color: #fee;
  color: #c33;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
  font-size: 14px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}
</style>