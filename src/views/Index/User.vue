<script setup>
import { ref, computed } from 'vue';
import { apiGetUser } from '@/api';
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router';
import getImageUrl from '@/mixins/getImageUrl.js';
import ProfileNav from '@/components/Index/Profile/ProfileNav.vue';
import MiniDashboard from '@/components/Index/MiniDashboard.vue';
import AsideCard from '@/components/Index/AsideCard.vue';

const route = useRoute();
const router = useRouter();

onBeforeRouteUpdate((to, from) => {
  if (to.name === from.name) router.go();
});

const visitors = ref([
  {
    name: 'Darlene Black',
    fileName: 'visitor-1',
    description: 'HR-manager, 10 000 connec...',
  },
  {
    name: 'Theresa Steward',
    fileName: 'visitor-2',
    description: 'iOS developer',
  },
  {
    name: 'Brandon Wilson',
    fileName: 'visitor-3',
    description: 'Senior UX designer',
  },
  {
    name: 'Kyle Fisher',
    fileName: 'visitor-4',
    description: 'Product designer at Com...',
  },
  {
    name: 'Audrey Alexander',
    fileName: 'visitor-5',
    description: 'Team lead at Google',
  },
]);

const courses = ref([
  {
    title: 'UX Foundations: Prototyping',
    fileName: 'courses-may-like-1',
    viewers: '27959',
  },
  {
    title: 'Designing with Adobe XD and pro',
    fileName: 'courses-may-like-2',
    viewers: '9122',
  },
  {
    title: 'UX Foundations: Styles and GUIs',
    fileName: 'courses-may-like-3',
    viewers: '13858',
  },
]);

const uid = computed(() => route.params.uid);
const user = ref({});
const getUser = async () => {
  try {
    const { data } = await apiGetUser(uid.value);
    user.value = data.user;
  } catch(err) {
    router.push('/notFound');
  }
}
getUser();
</script>

<template>
  <div class="profile-container">
    <main class="profile-main">
      <section class="profile-header">
        <div class="profile-cover">
          <div class="profile-edit-btns-group">
            <button type="button">
              <img src="@/assets/images/upload.png" alt="upload">
            </button>
            <button type="button">edit profile</button>
            <button type="button">
              <img src="@/assets/images/more-horizontal.png" alt="more infomation">
            </button>
          </div>
        </div>
        <div class="profile-header-content">
          <div class="user-photo">
            <div class="user-photo-hover">
              <img src="@/assets/images/camera.png" alt="camera">
            </div>
            <img src="@/assets/images/user-1-big.png" alt="Dmitry Kargaev">
          </div>
          <div>
            <p class="user-content">
              <span class="user-name-group">
                <span class="user-name">{{ user.name }}</span>
                <img class="user-name-logo" src="@/assets/images/in-logo.png" alt="LinkIned logo">
              </span>
              <router-link to="/" class="user-position-group">
                <img src="@/assets/images/Vector.png" alt="position mark">
                <span>Saint Petersburg, Russian Federation</span>
              </router-link>
            </p>
            <p class="user-description">Freelance UX/UI designer, 80+ projects in web design, mobile apps
                (iOS & android) and creative projects. Open to offers.</p>
            <div class="btns-group">
              <button class="contact-btn" type="button">Contact info</button>
              <button class="connections-btn" type="button">1,043 connections</button>
            </div>
          </div>
        </div>
      </section>
      <ProfileNav />
      <router-view />
    </main>
    <aside class="aside">
      <ul>
        <li class="aside-card">
          <MiniDashboard />
        </li>
        <li class="aside-card">
          <AsideCard title="visitors" :headLink="{ title: 'view all', path: '/' }">
            <template v-slot:card-body>
              <ul class="visitor-cards-list">
                <li v-for="visitor in visitors" :key="visitor.fileName" class="visitor-card">
                  <router-link to="/">
                    <img :src="getImageUrl(visitor.fileName)" :alt="visitor.name" class="visitor-img">
                    <p>{{ visitor.description }}</p>
                  </router-link>
                </li>
              </ul>
            </template>
          </AsideCard>
        </li>
        <li class="aside-card">
          <AsideCard title="You may like these courses">
            <template v-slot:card-body>
              <ul class="course-cards-list">
                <li v-for="course in courses" :key="courses.fileName" class="course-card">
                  <router-link to="/" class="course-link">
                    <div class="course-img-group">
                      <img src="@/assets/images/play.png" alt="play video" class="play-video-btn">
                      <img :src="getImageUrl(course.fileName)" :alt="course.title" class="course-img">
                    </div>
                    <div>
                      <h2 class="course-title">{{ course.title }}</h2>
                      <span class="course-viewers">{{ course.viewers }} viewers</span>
                    </div>
                  </router-link>
                </li>
              </ul>
            </template>
          </AsideCard>
        </li>
      </ul>
    </aside>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styleSheets/variables';

.profile-container {
  display: flex;
}
.profile-main {
  flex-grow: 1;
  margin-right: 40px;
}
.profile-header {
  flex-grow: 1;
  border-radius: 4px;
  overflow: hidden;
}
.profile-header-content {
  display: flex;
  background: $white;
  padding: 25px 45px 35px;
}
.profile-cover {
  height: 180px;
  background: url('@/assets/images/Rectangle 3.png') no-repeat center;
  background-size: cover;
  padding: 20px 30px;
}
.profile-edit-btns-group {
  display: flex;
  > button {
    background: $white;
    padding: 8px 12px;
    border: none;
    box-shadow: 0px 10px 30px rgba(113, 123, 133, 0.05);
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    text-transform: uppercase;
    transition: color 0.2s, transform 0.2s;
    margin-right: 10px;
    &:hover {
      transform: translateY(-2px);
      color: $blue-200;
    }
    &:first-child {
      margin-right: auto;
    }
    &:last-child {
      margin-right: 0;
    }
  }
}
.user-photo {
  flex-shrink: 0;
  width: 200px;
  height: 200px;
  border: 10px solid $white;
  border-radius: 100%;
  transform: translateY(-50px);
  margin: 0 30px -50px 0;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  > img {
    height: 100%;
  }
  &:hover {
    > .user-photo-hover {
      opacity: 0.5;
    }
  }
}
.user-photo-hover {
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: $dark-100;
  border-radius: 100%;
  transition: opacity 0.2s;
  > img {
    height: 50px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
}
.user-content {
  display: flex;
  align-items: center;
}
.user-name-group {
  display: flex;
  align-items: center;
  margin: 0 auto 0 0;
  font-size: $fs-4;
  font-weight: bold;
}
.user-name {
  margin-right: 6px;
}
.user-name-logo {
  width: 16px;
  height: 16px; 
}
.user-position-group {
  display: flex;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  color: $blue-300;
  filter: brightness(1);
  transition: filter 0.2s;
  > img {
    width: 15px;
    height: 15px;
    margin-right: 5px;
  }
  > span {
    font-size: $fs-6;
  }
  &:hover {
    filter: brightness(1.3);
  }
}
.user-description {
  margin-top: 10px;
  line-height: 1.5;
}
.btns-group {
  margin-top: 15px;
}
.contact-btn, .connections-btn {
  width: 170px;
  text-transform: uppercase;
  padding: 10px 0;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s,  color 0.2s;
}
.contact-btn {
  background: $blue-200;
  color: $white;
  border: none;
  margin-right: 15px;
  &:hover {
    background: $white;
    color: $blue-200;
    border: 1px solid $blue-200;
  }
}
.connections-btn {
  background: $white;
  border: 1px solid $blue-200;
  color: $blue-200;
   &:hover {
    background: $blue-200;
    color: $white;
  }
}
.aside {
  flex-shrink: 0;
  width: 290px;
}
.dashboard-num {
  display: block;
  font-size: $fs-1;
  color: $blue-400;
  margin-top: 20px;
}
.dashboard-title {
  font-weight: normal;
  margin-top: 10px;
}
.visitor-cards-list {
  margin-bottom: -15px;
}
.visitor-card {
  > a {
    display: flex;
    align-items: center;
    margin: 15px 0;
    text-decoration: none;
    color: inherit;
    transition: color 0.2s, transform 0.2s;
    &:hover {
      color: $blue-400;
      transform: translateX(3px);
    }
  }
}
.visitor-img {
  margin-right: 15px;
}
.course-cards-list {
  margin-bottom: -15px;
}
.course-card {
  margin: 15px 0;
}
.course-link {
  display: flex;
  align-items: center;
  color: inherit;
  text-decoration: none;
  transition: color 0.2s, transform 0.2s;
  &:hover {
    color: $blue-200;
    transform: translateX(3px);
    .play-video-btn {
      transform: rotate3d(0, 1, 0, 180deg) translateX(50%) translateY(-50%);
    }
  }
}
.course-title {
  margin-bottom: 5px;
}
.course-img {
  height: 100%;
  border-radius: 5px;
}
.course-viewers {
  font-size: $fs-6;
  color: rgba($dark-100, 0.5);
  font-weight: bold;
}
.course-img-group {
  min-width: 80px;
  height: 52px;
  border-radius: 5px;
  margin-right: 15px;
  position: relative;
}
.play-video-btn {
  width: 18px;
  height: 18px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 1;
  transition: transform 1s;
}
.aside-card {
  margin-bottom: 20px;
}
</style>