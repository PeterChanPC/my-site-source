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
  setTimeout(() => {
    if (path && routes.find(route => route.path === path)) {
      sessionStorage.removeItem('redirect');
      next(path);
    } else {
      next();
    };
  }, loadingStore.interval); // loading screen delay
});

export default router;
