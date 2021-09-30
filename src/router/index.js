import { createRouter, createWebHashHistory } from 'vue-router';
import userReq from '@/api/userReq';
import { apiCheckLogin } from '@/api';
import store from '@/composition/store';
import Index from '@/views/Index.vue';

const { state, setLogin, setUid } = store;

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
        meta: { requiresAuth: true },
        children: [
          {
            path: '',
            name: 'ProfileIndex',
            component: () => import('@/views/Index/Profile/Index.vue'),
            meta: { requiresAuth: true },
          },
          {
            path: 'interests',
            name: 'ProfileInterests',
            component:  () => import('@/views/Index/Profile/ProfileInterests.vue'),
            meta: { requiresAuth: true },
          },
          {
            path: 'articles',
            name: 'ProfileArticles',
            component:  () => import('@/views/Index/Profile/ProfileArticles.vue'),
            meta: { requiresAuth: true },
          }
        ],
      },
      {
        path: '@:uid',
        name: 'User',
        redirect: (to) => `/@${to.params.uid}/profile`,
        component: () => import('@/views/Index/User.vue'),
        children: [
          {
            path: 'profile',
            name: 'UserProfileIndex',
            component: () => import('@/views/Index/User/Index.vue'),
          },
          {
            path: 'profile/interests',
            name: 'UserProfileInterests',
            component:  () => import('@/views/Index/User/ProfileInterests.vue'),
          },
          {
            path: 'profile/articles',
            name: 'UserProfileArticles',
            component:  () => import('@/views/Index/User/ProfileArticles.vue'),
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
      {
        path: 'notices',
        name: 'Notices',
        component: () => import('@/views/Index/Notices.vue'),
        children: [
          {
            path: '',
            name: 'NoticeIndex',
            component: () => import('@/views/Index/Notices/Index.vue'),
          }
        ],
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
  { 
    path: '/notFound',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
  },
];

const router = createRouter({ history, routes });

const checkLogin = () => new Promise(async (resolve, reject) => {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)LinkInRe\s*=\s*([^;]*).*$)|^.*$/, '$1');
  userReq.defaults.headers.common.Authorization = `${token}`;
  try {
    const { data } = await apiCheckLogin();
    const { uid, success } = data;
    if (success) {
      setUid(uid);
      setLogin();
      resolve();
    } else {
      setLogin(false);
      reject();
    }
  } catch (err) {
    setLogin(false);
    reject();
  }
});

router.beforeEach(async (to, from, next) => {
  if (state.value.isLogin) {
    next();
  } else if (to.meta.requiresAuth) {
    try {
      await checkLogin();
      next();
    } catch (err) {
      next({
        path: '/login',
      });
    }
  } else {
    window.scrollTo(0, 0);
    next();
  }
});

export default router;