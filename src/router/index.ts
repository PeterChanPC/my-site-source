import { createRouter, createWebHistory, RouteLocationNormalizedGeneric } from 'vue-router';
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

let des: RouteLocationNormalizedGeneric | undefined;
let count: number = 0;
router.beforeEach((to, from, next) => {
  count++;
  if (count < 1) des = to;
  const loadingStore = useLoadingStore();
  loadingStore.load();

  const path = sessionStorage.redirect;
  setTimeout(() => {
    if (path && routes.find(route => route.path === path)) { // handle github pages 404 redirect
      sessionStorage.removeItem('redirect');
      return next(path);
    } else if (count > 1 && des) {
      return next(des);
    } else {
      return next();
    };
  }, loadingStore.duration); // delay call next()
});

router.afterEach((to, from, failure) => {
  const loadingStore = useLoadingStore();
  if (failure) return;
  loadingStore.done();
});

export default router;
