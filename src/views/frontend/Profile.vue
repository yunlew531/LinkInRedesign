
<script setup>
import { ref } from 'vue';
import ProfileContent from '@/components/frontend/Profile/ProfileContent.vue';

const asideItems = ref([
    {
      title: 'your dashboard',
    },
    {
      title: 'visitors',
    },
    {
      title: 'You may like these courses',
    },
  ]);
</script>

<template>
  <div class="profile-panel">
    <div class="profile-main">
      <section class="profile-header">
        <div class="profile-cover">

        </div>
        <div class="profile-header-content">
          <img class="user-photo" src="@/assets/images/user-1-big.png" alt="user">
          <div>
            <p class="user-content">
              <span class="user-name-group">
                <span class="user-name">Dmitry Kargaev</span>
                <img class="user-name-logo" src="@/assets/images/in-logo.png" alt="LinkIned logo">
              </span>
              <span class="user-position-group">
                <img src="@/assets/images/Vector.png" alt="position mark">
                <span>Saint Petersburg, Russian Federation</span>
              </span>
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
      <ProfileContent />
      <router-view />
    </div>
    <aside class="aside">
      <ul>
        <li v-for="item in asideItems" :key="item.title" class="aside-item">
          <h3 class="aside-item-title">{{ item.title }}</h3>
        </li>
      </ul>
    </aside>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styleSheets/variables';

.profile-panel {
  display: flex;
}
.profile-main {
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
.aside {
  width: 360px;
}
.aside-item {
  background: $white;
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 25px 30px;
}
.aside-item-title {
  text-transform: uppercase;
  font-size: $fs-6;
}
.profile-cover {
  height: 180px;
  background: url('@/assets/images/Rectangle 3.png') no-repeat center;
  background-size: cover;
}
.user-photo {
  width: 200px;
  height: 200px;
  transform: translateY(-50px);
  margin: 0 30px -50px 0;
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
  > img {
    width: 15px;
    height: 15px;
    margin-right: 5px;
  }
  > span {
    font-size: $fs-6;
  }
}
.user-description {
  margin-top: 10px;
  line-height: 150%;
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
</style>