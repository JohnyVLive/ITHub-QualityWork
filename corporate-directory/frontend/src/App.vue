<template>
  <div class="app">
    <header class="header">
      <h1>Корпоративный телефонный справочник</h1>
      <router-link
        v-if="!isAdminRoute"
        to="/admin"
        class="admin-link"
      >
        Админка
      </router-link>
    </header>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    isAdminRoute() {
      return this.$route.path === '/admin'
    }
  }
}
</script>

<style scoped>
.app {
  min-height: 100vh;
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h1 {
  font-size: 2rem;
  text-align: center;
  font-weight: 600;
  margin: 0;
}

.admin-link {
  color: white;
  text-decoration: none;
  padding: 8px 16px;
  border: 2px solid white;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s;
}

.admin-link:hover {
  background-color: white;
  color: #764ba2;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    gap: 10px;
  }
  
  .header h1 {
    font-size: 1.5rem;
  }
}
</style>