import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/homepage/homepage.vue'
import ProjectView from '@/views/projects/ProjectView.vue'
import TodoView from '@/views/projects/todo-list/TodoView.vue'
import AuthView from '@/views/projects/auth/AuthView.vue'
import LoginView from '@/views/projects/auth/LoginView.vue'
import AuthContentView from '@/views/projects/auth/AuthContentView.vue'
import { useUserStore } from '@/stores/user.store'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/my-practice',
    name: 'my practices',
    component: ProjectView,
  },
  {
    path: '/todos',
    name: 'todos',
    component: TodoView,
  },
  {
    path: '/authentication',
    name: 'authentication',
    component: AuthView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { requiresGuest: true }
  },
  {
    path: '/auth-content',
    name: 'auth-content',
    component: AuthContentView,
    meta: { requiresAuth: true }
  },
]

const router = createRouter({
  history: createWebHistory('/my-site/'),
  scrollBehavior(to, from, savedPosition) {
    return {top: 0};
  },
  routes
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  
  // authentication await is put in if statements
  // for faster load time for no require auth routes
  if (sessionStorage.redirect) {
    // handle github pages 404 redirect
    const path = sessionStorage.redirect
    sessionStorage.removeItem('redirect')
    next(path)
  } else if (to.meta.requiresAuth) {
    // direct to login page if user is not authenticated
    next(await userStore.handleAuth() || {
      name: 'login',
      query: { redirect: to.fullPath }
    })
  } else if (to.meta.requiresGuest && await userStore.handleAuth()) {
    // direct login user back to Auth View
    // becuz users can only access Login View from there
    next({ name: 'authentication' })
  } else {
    next()
  }
})

export default router
