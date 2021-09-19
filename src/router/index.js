import { createRouter, createWebHashHistory } from 'vue-router';
import Index from '@/views/frontend/Index.vue';

const history = createWebHashHistory('/LinkInRedesign/');
const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    redirect: '/profile',
    children: [
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/frontend/Profile.vue'),
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