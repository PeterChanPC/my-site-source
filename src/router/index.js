import { createRouter, createWebHistory } from 'vue-router'
import auth from '@/stores/auth.store'
import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'
import TodoView from '@/views/Todos/TodoView.vue'
import CalendarView from '@/views/CalendarView.vue'
import SettingView from '@/views/SettingView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {requiresAuth: true}
  },
  {
    path: '/todos',
    name: 'todos',
    component: TodoView,
    meta: {requiresAuth: true}
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: CalendarView,
    meta: {requiresAuth: true}
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingView,
    meta: {requiresAuth: false}
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  }
]

const router = createRouter({
  history: createWebHistory('/My-Practice/'),
  routes
})

router.beforeEach(async (to, from, next) => {
  if (sessionStorage.redirect) {
    const path = sessionStorage.redirect
    sessionStorage.removeItem('redirect')
    next(path)
  }
  else if (to.meta.requiresAuth) {
    next(await auth.isAuthenticated() || {
      // direct to login page if user is not authenticated
      name: 'login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
})

export default router
