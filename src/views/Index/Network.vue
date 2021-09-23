<script setup>
import { ref } from 'vue';
import getImageUrl from '@/mixins/getImageUrl';

const navLinks = ref([
  {
    title: 'Connections',
    path: '/network/connections',
    imgName: 'link',
  },
  {
    title: 'Invitations',
    path: '/network/invitations',
    imgName: 'invitations',
  },
  {
    title: 'Groups',
    path: '/network/groups',
    imgName: 'users',
  },
  {
    title: 'Articles',
    path: '/network/articles',
    imgName: 'articles',
  },
  {
    title: 'Hashtags',
    path: '/network/hashtags',
    imgName: 'hash',
  },
]);

</script>

<template>
  <div class="network-container">
    <aside class="aside">
      <router-link :to="link.path" v-for="link in navLinks" :key="link.title" class="nav-link"
        active-class="active">
        <img :src="getImageUrl(link.imgName)" :alt="link.title" class="nav-link-icon">
        <span>{{ link.title }}</span>
      </router-link>
    </aside>
    <div class="main-container">
      <router-view />
    </div>
  </div>    
</template>

<style lang="scss" scoped>
@import '@/assets/styleSheets/variables';

.network-container {
  display: flex;
}
.main-container {
  flex-grow: 1;
}
.aside {
  flex-shrink: 0;
  width: 290px;
  margin-right: 40px;
}
.nav-link {
  display: flex;
  align-items: center;
  color: inherit;
  text-decoration: none;
  font-weight: bold;
  border-bottom: 1px solid $white-100;
  background: $white;
  padding: 20px 30px;
  transition: border-left 0.2s, color 0.2s;
  &:first-child {
    border-radius: 4px 4px 0 0;
  }
  &:last-child {
    border-radius: 0 0 4px 4px;
  }
  &.active {
    border-left: 10px $blue-400 solid;
    color: $gray-100;
  }
}
.nav-link-icon {
  margin-right: 10px;
}
</style>