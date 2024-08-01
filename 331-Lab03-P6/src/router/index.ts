import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import PassengerDetailView from '../views/PassengerDetailView.vue';
import AirlineDetailView from '../views/AirlineDetailView.vue';
import NotFoundView from '../views/NotFoundView.vue';
import ResourceNotFoundView from '../views/ResourceNotFoundView.vue';

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
  },
  {
    path: '/resource-not-found',
    name: 'ResourceNotFound',
    component: ResourceNotFoundView
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
