import { createRouter, createWebHistory } from 'vue-router'
import DirectoryView from '../components/DirectoryView.vue'
import AdminPanel from '../components/AdminPanel.vue'
import Login from '../components/Login.vue'

const routes = [
    {
        path: '/',
        name: 'Directory',
        component: DirectoryView
    },
    {
        path: '/admin',
        name: 'AdminPanel',
        component: AdminPanel,
        meta: { requiresAuth: true }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    }
]

// Создание и экспорт роутера
const router = createRouter({
    history: createWebHistory(),
    routes
})

// Проверка авторизации перед переходом на страницу админки
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('authToken')
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router