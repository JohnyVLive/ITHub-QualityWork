<template>
  <div class="app">
    <header class="header">
      <h1>Корпоративный телефонный справочник</h1>
    </header>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
.app {
  min-height: 100vh;
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px 20px;
  border-radius: 10px;
  margin-bottom: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.header h1 {
  font-size: 2rem;
  text-align: center;
  font-weight: 600;
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 1.5rem;
  }
}
</style>