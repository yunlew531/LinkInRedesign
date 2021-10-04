<script setup>
import { ref, inject, computed } from 'vue';
import { apiUploadPhoto, apiUploadBackgroundImg, apiUpdateDescription } from '@/api';
import store from '@/composition/store';
import getImageUrl from '@/mixins/getImageUrl.js';
import ProfileNav from '@/components/Index/Profile/ProfileNav.vue';
import MiniDashboard from '@/components/Index/MiniDashboard.vue';
import AsideCard from '@/components/Index/AsideCard.vue';
import Editor from '@/components/Editor.vue';

const { getProfile, updateUserProfile } = store;
const state = inject('state');

getProfile();
const user = computed(() => state.value.user);
const bgCover = computed(() =>
  `url(${user.value.background_cover || getImageUrl('Rectangle 3')})`);

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

const editorEl = ref(null);
const editorOptions = ref({
  placeholder: 'input description',
});

const isEditDescription = ref(false);
const editDescription = () => {
  editorEl.value.setText(user.value.description);
  isEditDescription.value = true;
};

const updateDescription = async () => {
  const description = editorEl.value.getText();
  try {
    const { data } = await apiUpdateDescription(description);
    const { description: resDescription } = data;
    updateUserProfile({ description: resDescription });
    isEditDescription.value = false;
  } catch (err) {
    alert(err.response.data.message);
  }
};

const cancelEditDescription = () => isEditDescription.value = false;

const uploadPhoto = async (e) => {
  const file = e.target.files[0];
  const formData = new FormData();
  formData.append('img-file', file);
  try {
    const { data } = await apiUploadPhoto(formData);
    const { url } = data;
    updateUserProfile({ photo: url });
  } catch (err) {
    alert(err.response.data.message);
  }
};

const uploadBackgroundImg = async (e) => {
  const file = e.target.files[0];
  const formData = new FormData();
  formData.append('img-file', file);
  try {
    const { data } = await apiUploadBackgroundImg(formData);
    const { url } = data;
    updateUserProfile({ background_cover: url });
  } catch (err) {
    alert(err.response.data.message);
  }
};
</script>

<template>
  <div class="profile-container">
    <main class="profile-main">
      <section class="profile-header">
        <div class="profile-cover">
          <div class="profile-edit-btns-group">
            <div class="upload-bg-cover">
              <button type="button">
                <img src="@/assets/images/upload.png" alt="upload">
              </button>
              <input type="file" @change="uploadBackgroundImg($event)">
            </div>
            <button type="button">edit profile</button>
            <button type="button">
              <img src="@/assets/images/more-horizontal.png" alt="more infomation">
            </button>
          </div>
        </div>
        <div class="profile-header-content">
          <div class="user-photo">
            <input type="file" class="upload-photo-input" @change="uploadPhoto($event)">
            <div class="user-photo-hover">
              <img src="@/assets/images/camera.png" alt="camera">
            </div>
            <img :src="user.photo || getImageUrl('user')" alt="user photo">
            <button v-if="!user.photo" type="button" class="upload-photo-btn">
              <img src="@/assets/images/upload.png" alt="upload">
            </button>
          </div>
          <div class="user-content-container">
            <p class="user-content">
              <span class="user-name-group">
                <span class="user-name">{{ user.name }}</span>
                <img class="user-name-logo" src="@/assets/images/in-logo.png" alt="LinkIned logo">
              </span>
              <router-link :to="`/${user.city}`"
                class="user-position-group">
                <img src="@/assets/images/Vector.png" alt="position mark">
                <span>{{ user.city }}</span>
              </router-link>
            </p>
            <Editor v-show="isEditDescription" ref="editorEl" :options="editorOptions" marginY="20px"
              @update="updateDescription" @cancel="cancelEditDescription" />
            <p v-show="!isEditDescription" @dblclick="editDescription" class="user-description">
              {{ user.description || 'empty. double click to add description' }}</p>
            <div v-show="!isEditDescription" class="btns-group">
              <button class="contact-btn" type="button">Contact info</button>
              <button class="connections-btn" type="button">
                {{ user.connections_qty || 0 }} connections</button>
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
          <MiniDashboard :profileViews="user.profile_views" />
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
@import '@/assets/styleSheets/mixins';

.profile-container {
  display: flex;
  position: relative;
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
  background: v-bind(bgCover) no-repeat center;
  background-size: cover;
  padding: 20px 30px;
}
.profile-edit-btns-group {
  display: flex;
  button {
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
    &:last-child {
      margin-right: 0;
    }
  }
}
.upload-bg-cover {
  position: relative;
  margin-right: auto;
  transition: transform 0.2s;
  cursor: pointer;
  > button {
    height: 100%;
    margin-right: 0;
  }
  > input {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer; 
    border: dashed 1px red;
    opacity: 0;
  }
  > input[type=file]::-webkit-file-upload-button {
    cursor: pointer; 
  }
  &:hover {
    transform: translateY(-2px);
  }
}
.upload-photo-btn {
  background: $blue-100;
  padding: 10px;
  border: none;
  box-shadow: 0px 10px 30px rgba(113, 123, 133, 0.05);
  border-radius: 4px;
  cursor: pointer;
  animation: heart 2s infinite;
  position: absolute;
  right: 10px;
  bottom: 0;
}
@keyframes heart {
  0%   {
    transform: translateY(0px);
  }
  50%  {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}
.user-photo {
  flex-shrink: 0;
  width: 200px;
  height: 200px;
  transform: translateY(-50px);
  margin: 0 30px -50px 0;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  > img {
    height: 100%;
    border: 10px solid $white;
    background: $white;
    border-radius: 100%;
    transition: border-radius 0.2s, border-width 0.2s;
  }
  &:hover {
    > .user-photo-hover {
      opacity: 0.5;
      border-radius: 5px;
    }
    > img {
      border-radius: 5px;
      border: 0px solid $white;
    }
  }
}
.upload-photo-input {
  cursor: pointer;
  position: absolute;
  width: 100%;
  height: 100%;
  border: 1px dashed blue;
  z-index: 1;
  opacity: 0;
}
.user-photo-hover {
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 100%;
  top: 0;
  left: 0;
  background: $dark-100;
  transition: opacity 0.2s, border-radius 0.2s;
  > img {
    height: 50px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
}
.user-content-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
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
  flex-grow: 1;
  margin-top: 10px;
  line-height: 1.5;
  white-space: pre-wrap;
  &:hover {
    backdrop-filter: brightness(0.95);
  }
}
.btns-group {
  display: flex;
}
.contact-btn, .connections-btn {
  @include button;
  &:active {
    filter: brightness(0.95);
  }
}
.contact-btn {
  color: $white;
  background: $blue-200;
  margin-right: 15px;
  &:hover {
    color: $blue-200;
    background: $white;
  }
}
.connections-btn {
  color: $blue-200;
  background: $white;
  &:hover {
    color: $white;
    background: $blue-200;
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