import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import PassengerDetailView from '../views/PassengerDetailView.vue';
import AirlineDetailView from '../views/AirlineDetailView.vue';
import NotFoundView from '../views/NotFoundView.vue';
import NProgress from 'nprogress'; // 6.3 引入 nprogress
import 'nprogress/nprogress.css'; // 6.3 引入 nprogress 样式

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/passenger/:id',
    name: 'PassengerDetail',
    component: PassengerDetailView,
    children: [
      {
        path: 'airline/:airlineId',
        name: 'AirlineDetail',
        component: AirlineDetailView
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundView
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// 6.3 配置全局路由守卫
router.beforeEach((to, from, next) => {
  NProgress.start(); // 开始进度条
  next();
});

router.afterEach(() => {
  NProgress.done(); // 结束进度条
});

export default router;
