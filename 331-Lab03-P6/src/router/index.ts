import { createRouter, createWebHistory} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import PassengerDetailView from '../views/PassengerDetailView.vue';
import AirlineDetailView from '../views/AirlineDetailView.vue';
import EditView from '../views/EditView.vue'; // 6.1 引入 EditView
import NotFoundView from '../views/NotFoundView.vue';
import NProgress from 'nprogress'; // 6.3 引入 nprogress
import 'nprogress/nprogress.css'; // 6.3 引入 nprogress 样式
import { getPassengerById, getAirlineById } from '@/services/apiService';
import { usePassengerStore } from '@/stores/passenger'; //6.4

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
    props: true,
    beforeEnter: async (to, from, next) => {
      const id = to.params.id as string;
      const passengerStore = usePassengerStore();
      try {
        const passengerResponse = await getPassengerById(id);
        passengerStore.setPassenger(passengerResponse.data);

        if (passengerResponse.data.airline.length > 0) {
          const airlineId = passengerResponse.data.airline[0]._id;
          const airlineResponse = await getAirlineById(airlineId);
          passengerStore.setAirline(airlineResponse.data);
        }

        next();
      } catch (error) {
        console.error("Error fetching passenger data:", error);
        next({ name: 'NotFound' });
      }
    },
    children: [
      {
        path: 'airline/:airlineId',
        name: 'AirlineDetail',
        component: AirlineDetailView,
        props: true
      }
    ]
  },
  {
    path: '/edit',
    name: 'EditView',
    component: EditView // 6.1 添加 EditView 路由
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundView
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {   //6.5 ScorllBehavior
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
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
