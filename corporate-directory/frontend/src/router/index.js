import { createRouter, createWebHistory } from 'vue-router'
import DirectoryView from '../components/DirectoryView.vue'
import AdminPanel from '../components/AdminPanel.vue'

const routes = [
    {
        path: '/',
        name: 'Directory',
        component: DirectoryView
    },
    {
        path: '/admin',
        name: 'AdminPanel',
        component: AdminPanel
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router