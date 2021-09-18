import { createRouter, createWebHistory } from 'vue-router';
import Index from '@/views/frontend/Index.vue';
import Profile from '@/views/frontend/Profile.vue';

const history = createWebHistory();
const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    redirect: '/profile',
    children: [
      {
        path: '/profile',
        name: 'Profile',
        component: Profile,
      },
    ],
  },
];

export default createRouter({ history, routes });