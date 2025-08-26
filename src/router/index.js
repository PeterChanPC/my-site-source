import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/homepage/homepage.vue';
import ProjectView from '@/views/projects/ProjectView.vue';
import TodoView from '@/views/projects/todo-list/TodoView.vue';
import AuthView from '@/views/projects/auth/AuthView.vue';
import LoginView from '@/views/projects/auth/LoginView.vue';
import AuthContentView from '@/views/projects/auth/AuthContentView.vue';
import BlogView from '@/views/blogs/blog.vue';
import TestView from '@/views/test.vue';
import { useUserStore } from '@/stores/user.store';


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
    component: AuthView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { requiresGuest: true },
  },
  {
    path: '/auth-content',
    name: 'auth-content',
    component: AuthContentView,
    meta: { requiresAuth: true },
  },
  {
    path: '/blogs',
    name: 'blogs',
    component: BlogView,
  },
  {
    path: '/test',
    name: 'test',
    component: TestView,
  },
];

const router = createRouter({
  history: createWebHistory('/my-site/'),
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
  routes
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  const path = sessionStorage.redirect;

  if (path) {
    // handle github pages 404 redirect
    routes.forEach((route) => {
      if (path === route.path) {
        // loop through all existing paths
        sessionStorage.removeItem('redirect');
        next(path);
      };
    });
    // redirect to homepage if path doesnt exist
    next();
  } else if (to.meta.requiresAuth) {
    // direct to login page if user is not authenticated
    next(await userStore.handleAuth() || {
      name: 'login',
      query: { redirect: to.fullPath }
    });
  } else if (to.meta.requiresGuest && await userStore.handleAuth()) {
    // direct login user back to Auth View
    // because users can only access Login View from there
    next({ name: 'authentication' });
  } else {
    next();
  };
});

export default router;
