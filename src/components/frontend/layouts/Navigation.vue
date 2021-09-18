<script setup>
import { ref } from 'vue';

const navList = ref([
  {
    title: 'FEED',
    url: 'src/assets/images/feed.png',
    path: '/feed',
  },
  {
    title: 'NETWORK',
    url: 'src/assets/images/network.png',
    path: '/network',
  },
  {
    title: 'JOBS',
    url: 'src/assets/images/jobs.png',
    path: '/jobs',
  },
  {
    title: 'CHAT',
    url: 'src/assets/images/chat.png',
    path: '/chat',
  },
  {
    title: 'NOTICES',
    url: 'src/assets/images/notices.png',
    path: '/notices',
  },
]);
</script>

<template>
  <header class="nav">
    <div class="nav-container">
      <h1 class="logo-title">
        <router-link to="/">
          <img class="logo-img" src="src/assets/images/Logo.png" alt="LinkIn">
        </router-link>
      </h1>
      <ul class="nav-list">
        <li v-for="link in navList" :key="link.title">
          <router-link :to="link.path">
            <img class="nav-link-img" :src="link.url" :alt="link.title">
          </router-link>
        </li>
      </ul>
      <div class="search-panel">
        <img class="search-img" src="src/assets/images/search.png" alt="search">
        <input class="search-input" type="text" placeholder="Search">
      </div>
      <div class="user-panel">
        <img class="user-panel-photo" src="src/assets/images/user-1.png" alt="D. Kargave">
        <div class="user-panel-content">
          <p>
            <span class="user-panel-name">D. Kargave</span><span class="user-panel-who">YOU</span>
          </p>
          <p>
            <span class="user-panel-view-num">367 views today</span>
            <span class="user-panel-increase-num">+32</span>
            <img class="arrow-up-right" src="src/assets/images/arrow-up-right.png" alt="arrow-up-right">
          </p>
        </div>
      </div>
      <div class="more-info">
        <img class="more-info-img" src="src/assets/images/Other.png" alt="other">
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import 'src/assets/styleSheets/variables';

.nav {
  height: 80px;
  background: $white;
}
.nav-container {
  max-width: 1440px;
  margin: auto;
  display: flex;
  align-items: center;
}
.logo-title {
  padding: 0 40px;
}
.logo-img {
  width: 46px;
  height: 46px;
}
.nav-list {
  display: flex;
  border-right: 1px solid $white-100;
  border-left: 1px solid $white-100;
  padding: 0 10px;
  > a {
    display: block;
  }
}
.nav-link-img, .more-info-img {
  transition: 0.3s transform;
  &:hover {
    transform: translateY(-3px);
  }
}
.search-panel {
  flex-grow: 1;
  display: flex;
  padding: 0 30px;
  align-items: center;
  border-right: 1px solid $white-100;
}
.search-img {
  width: 24px;
  height: 24px;
  margin-right: 20px;
}
.search-input {
  flex-grow: 1;
  height: 80px;
  border: none;
}
.user-panel {
  width: 330px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  font-size: $fs-6;
}
.user-panel-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > p {
    &:first-of-type {
      margin-bottom: 10px;
    }
  }
}
.user-panel-photo {
  width: 42px;
  height: 42px;
  margin-right: 15px;
}
.user-panel-name {
  font-weight: bold;
  margin-right: 10px;
  text-transform: uppercase
}
.user-panel-who {
  color: rgba($dark-100, 0.2)
}
.user-panel-increase-num {
  color: #02B033;
}
.user-panel-view-num {
  color: $gray-100;
  margin-right: 5px;
}
.more-info {
  width: 90px;
  border-left: 1px solid $white-100;
  border-right: 1px solid $white-100;
  cursor: pointer;
}
.arrow-up-right {
  margin-left: 2px;
  display: inline-block;
}
</style>