import { createRouter, createWebHistory } from 'vue-router';
import { useLoadingStore } from '@/stores/loading.store';
import HomeView from '@/views/homepage.vue';
import ProjectView from '@/views/projects.vue';
import BlogView from '@/views/blog.vue';
import TestView from '@/views/test.vue';

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
    path: '/test',
    name: 'test',
    component: TestView,
  },
];

const router = createRouter({
  history: createWebHistory('/my-site/'),
  scrollBehavior() {
    return { top: 0 };  // always return to the top of the page
  },
  routes,
});

router.beforeEach((to, from, next) => {
  const loadingStore = useLoadingStore()
  loadingStore.load();
  const path = sessionStorage.redirect;

  // handle github pages 404 redirect
  if (path) {
    routes.forEach((route) => {
      if (path === route.path) { // go to path if path exists
        sessionStorage.removeItem('redirect'); // remove path due to infinite routing
        next(path);
      };
    });
    next(); // redirect to homepage if path doesnt exist

    // handle path require authentication
    // } 
    // else if (to.meta.requireAuth) {
    //   const isAuth = await userStore.handleAuth();
    //   if (isAuth) {
    //     next(); // if auth, go to path
    //   } else { // if not auth, go to login
    //     next({
    //       name: 'login',
    //       query: { redirect: to.fullPath }
    //     });
    //   };

    //   // handle login page
    // } else if (to.meta.requireGuest) {
    //   const isAuth = await userStore.handleAuth();
    //   if (isAuth) { // if login, go to auth
    //     next({ name: 'authentication' });
    //   } else { // if not login, go to path
    //     next();
    //   }

    //   // handle normal routing
  } else {
    next();
  };
});

export default router;
