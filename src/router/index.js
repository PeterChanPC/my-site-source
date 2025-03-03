import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TodoView from '../views/TodoView.vue'
import SettingView from '../views/SettingView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/todos',
    name: 'todos',
    component: TodoView
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingView
  }
]

const router = createRouter({
  history: createWebHistory('/My-Practice/'),
  routes
})

export default router
