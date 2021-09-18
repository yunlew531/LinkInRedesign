import { createRouter, createWebHistory } from 'vue-router';
import Index from '@/views/frontend/Index.vue';
import Profile from '@/views/frontend/Profile.vue';

const history = createWebHistory();
const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    redirect: 'profile',
    children: [
      {
        path: 'profile',
        name: 'Profile',
        component: Profile,
        children: [
          {
            path: '',
            name: 'ProfileMain',
            component: () => import('@/views/frontend/Profile/ProfileMain.vue'),
          },
          {
            path: 'interests',
            name: 'ProfileInterests',
            component:  () => import('@/views/frontend/Profile/ProfileInterests.vue'),
          },
          {
            path: 'articles',
            name: 'ProfileArticles',
            component:  () => import('@/views/frontend/Profile/ProfileArticles.vue'),
          }
        ],
      },
    ],
  },
];

export default createRouter({ history, routes });