<script setup>
import { ref } from 'vue';
import store from '@/composition/store.js';
import getImageUrl from '@/mixins/getImageUrl.js';

const { setOffcanvasShow } = store;

const navList = ref([
  {
    title: 'FEED',
    fileName: 'feed',
    path: '/feed',
  },
  {
    title: 'NETWORK',
    fileName: 'network',
    path: '/network',
  },
  {
    title: 'JOBS',
    fileName: 'jobs',
    path: '/jobs',
  },
  {
    title: 'CHAT',
    fileName: 'chat',
    path: '/chat',
  },
  {
    title: 'NOTICES',
    fileName: 'notices',
    path: '/notices',
  },
]);

const showOffcanvas = () => setOffcanvasShow(true);
</script>

<template>
  <header class="nav">
    <div class="nav-container">
      <h1 class="logo-title">
        <router-link to="/">
          <img class="logo-img" src="@/assets/images/Logo.png" alt="LinkIn">
        </router-link>
      </h1>
      <ul class="nav-list">
        <li v-for="link in navList" :key="link.title" class="nav-link">
          <router-link :to="link.path" active-class="active" v-slot="{ isActive }">
            <img :src="getImageUrl(`${link.fileName}${isActive ? '-active' : ''}`)"
              :alt="link.title">
            <span>{{ link.title }}</span>
          </router-link>
        </li>
      </ul>
      <div class="search-panel">
        <img class="search-img" src="@/assets/images/search.png" alt="search">
        <input class="search-input" type="text" placeholder="Search">
      </div>
      <router-link to="/" class="user-panel">
        <img class="user-panel-photo" src="@/assets/images/user-1.png" alt="D. Kargave">
        <div class="user-panel-content">
          <p>
            <span class="user-panel-name">D. Kargave</span><span class="user-panel-who">YOU</span>
          </p>
          <p>
            <span class="user-panel-view-num">367 views today</span>
            <span class="user-panel-increase-num">+32</span>
            <img class="arrow-up-right" src="@/assets/images/arrow-up-right.png"
              alt="arrow-up-right">
          </p>
        </div>
      </router-link>
      <button type="button" class="other-btn" @click="showOffcanvas">
        <img src="@/assets/images/Other.png" alt="other">
        <span>OTHER</span>
      </button>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import 'src/assets/styleSheets/variables';

.nav {
  height: 80px;
  background: $white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  border-bottom: 1px solid $white-400;
}
.nav-container {
  max-width: 1440px;
  margin: auto;
  display: flex;
  align-items: stretch;
}
.logo-title {
  display: flex;
  align-items: center;
  padding: 0 40px;
}
.logo-img {
  width: 46px;
  height: 46px;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.03);
  }
}
.nav-list {
  align-self: stretch;
  display: flex;
  border-right: 1px solid $white-100;
  border-left: 1px solid $white-100;
  padding: 0 10px;
}
.nav-link {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 90px;
  > a {
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    font-size: $fs-6;
    font-weight: bold;
    text-decoration: none;
    color: inherit;
    > img {
      margin-bottom: 10px;
    }
    transition: 0.2s transform, color 0.2s;
    &:hover {
      transform: translateY(-3px);
      color: $blue-300;
    }
    &.active {
      transform: translateY(0);
      color: $blue-300;
    }
  }
}
.search-panel {
  flex-grow: 1;
  display: flex;
  align-items: center;
  border-right: 1px solid $white-100;
  position: relative;
}
.search-img {
  width: 24px;
  height: 24px;
  position: absolute;
  left: 30px;
}
.search-input {
  flex-grow: 1;
  height: 76px;
  font-size: $fs-4;
  border: none;
  outline: 2px solid rgba($blue-300, 0);
  background: transparent;
  padding: 0 30px 0 70px;
  transition: outline 0.2s;
  transform: translateY(2px);
  caret-color: $blue-300;
  &:focus-visible {
    outline: 2px solid rgba($blue-300, 0.5);
    box-shadow: 1px 1px 5px rgba($blue-300, 0.2);
  }
}
.user-panel {
  width: 330px;
  display: flex;
  align-items: center;
  font-size: $fs-6;
  cursor: pointer;
  padding: 0 30px;
  transition: color 0.2s;
  &:hover {
    color: $blue-200;
    > .user-panel-photo {
      filter: brightness(0.8);
    }
  }
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
  border-radius: 100%;
  transition: filter 0.2s;
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
.other-btn {
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90px;
  border: none;
  border-left: 1px solid $white-100;
  border-right: 1px solid $white-100;
  background: transparent;
  cursor: pointer;
  font-size: $fs-6;
  font-weight: bold;
  transition: transform 0.2s, color 0.2s;
  > img {
    margin-bottom: 5px;
  }
  &:hover {
    transform: translateY(-3px);
    color: $blue-300;
  }
  }
.arrow-up-right {
  margin-left: 2px;
  display: inline-block;
}
</style>