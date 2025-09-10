import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/homepage/homepage.vue';
import ProjectView from '@/views/projects/projects.vue';
import TodoView from '@/views/projects/todo-list/todos.vue';
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
    path: '/works',
    name: 'works',
    component: ProjectView,
  },
  {
    path: '/blogs',
    name: 'blogs',
    component: BlogView,
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
    meta: { requireGuest: true },
  },
  {
    path: '/auth-content',
    name: 'auth-content',
    component: AuthContentView,
    meta: { requireAuth: true },
  },
  {
    path: '/test',
    name: 'test',
    component: TestView,
    mata: { requireGuest: true },
  },
];

const router = createRouter({
  history: createWebHistory('/my-site/'),

  // always return to the top of the page
  scrollBehavior() {
    return { top: 0 };
  },
  routes
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  const path = sessionStorage.redirect;

  if (path) { // handle github pages 404 redirect
    routes.forEach((route) => {
      if (path === route.path) { // go to path if path exists
        sessionStorage.removeItem('redirect'); // remove path due to infinite routing
        next(path);
      };
    });
    next(); // redirect to homepage if path doesnt exist
  } else if (to.meta.requireAuth) { // handle path require authentication
    const isAuth = await userStore.handleAuth();
    if (isAuth) {
      next(); // if auth, go to path
    } else { // if not auth, go to login
      next({
        name: 'login',
        query: { redirect: to.fullPath }
      });
    };
  } else if (to.meta.requireGuest) { // handle login page
    const isAuth = await userStore.handleAuth();
    if (isAuth) { // if login, go to auth
      next({ name: 'authentication' });
    } else { // if not login, go to path
      next();
    }
  } else { // handle normal routing
    next();
  };
});

export default router;
