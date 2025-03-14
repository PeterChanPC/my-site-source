import { createRouter, createWebHistory } from 'vue-router'
import useAuth from '@/composables/useAuth.composable'
import HomeView from '@/views/HomeView.vue'
import ProjectView from '@/views/ProjectView.vue'
import TodoView from '@/views/Todos/TodoView.vue'
import CalendarView from '@/views/Calendar/CalendarView.vue'
import AuthDocsView from '@/views/AuthDocs/AuthDocsView.vue'
import LoginView from '@/views/AuthDocs/LoginView.vue'
import AuthView from '@/views/AuthDocs/AuthView.vue'
import SettingView from '@/views/SettingView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/projects',
    name: 'projects',
    component: ProjectView
  },
  {
    path: '/todos',
    name: 'todos',
    component: TodoView,
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: CalendarView,
  },
  {
    path: '/authdocs',
    name: 'authdocs',
    component: AuthDocsView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { requiresGuest: true }
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthView,
    meta: { requiresAuth: true }
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingView,
  },
]

const router = createRouter({
  history: createWebHistory('/My-Practice/'),
  routes
})

const { error, handleAuth } = useAuth()

router.beforeEach(async (to, from, next) => {
  // authentication await is put in if statements
  // for faster load time for no require auth routes
  if (sessionStorage.redirect) {
    // handle github pages 404 redirect
    const path = sessionStorage.redirect
    sessionStorage.removeItem('redirect')
    next(path)
  } else if (to.meta.requiresAuth) {
    // direct to login page if user is not authenticated
    next(await handleAuth() || {
      name: 'login',
      query: { redirect: to.fullPath }
    })
  } else if (to.meta.requiresGuest && await handleAuth()) {
    // direct login user back to Auth Docs View
    // becuz users can only access login view from there
    next({ name: 'authdocs' })
  } else {
    next()
  }
})

export default router
