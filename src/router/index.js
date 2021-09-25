import { createRouter, createWebHashHistory } from 'vue-router';
import Index from '@/views/Index.vue';

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
        component: () => import('@/views/Index/Profile.vue'),
        children: [
          {
            path: '',
            name: 'ProfileMain',
            component: () => import('@/views/Index/Profile/ProfileMain.vue'),
          },
          {
            path: 'interests',
            name: 'ProfileInterests',
            component:  () => import('@/views/Index/Profile/ProfileInterests.vue'),
          },
          {
            path: 'articles',
            name: 'ProfileArticles',
            component:  () => import('@/views/Index/Profile/ProfileArticles.vue'),
          }
        ],
      },
      {
        path: '@:uid',
        name: 'User',
        redirect: (to) => `/@${to.params.uid}/profile`,
        component: () => import('@/views/Index/Profile.vue'),
        children: [
          {
            path: 'profile',
            name: 'UserProfileMain',
            component: () => import('@/views/Index/Profile/ProfileMain.vue'),
          },
          {
            path: 'profile/interests',
            name: 'UserProfileInterests',
            component:  () => import('@/views/Index/Profile/ProfileInterests.vue'),
          },
          {
            path: 'profile/articles',
            name: 'UserProfileArticles',
            component:  () => import('@/views/Index/Profile/ProfileArticles.vue'),
          }
        ],
      },
      {
        path: 'feed',
        name: 'Feed',
        component: () => import('@/views/Index/Feed.vue'),
      },
      {
        path: 'network',
        name: 'Network',
        component: () => import('@/views/Index/Network.vue'),
        redirect: '/network/invitations',
        children: [
          {
            path: 'invitations',
            name: 'Invitations',
            component:  () => import('@/views/Index/Network/Invitations.vue'),
          }
        ],
      },
      {
        path: 'jobs',
        name: 'Jobs',
        component: () => import('@/views/Index/Jobs.vue'),
      },
    ],
  },
  
  { path: "/*", redirect: "/"},
];

export default createRouter({ history, routes });