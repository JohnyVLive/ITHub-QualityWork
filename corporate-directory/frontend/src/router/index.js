import { createRouter, createWebHistory } from 'vue-router'
import DirectoryView from '../components/DirectoryView.vue'

const routes = [
    {
        path: '/',
        name: 'Directory',
        component: DirectoryView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router