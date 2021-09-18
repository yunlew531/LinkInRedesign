<script setup>
import { ref } from 'vue';

const profileLinks = ref([
  {
    title: 'Profile',
    path: '/profile',
  },
  {
    title: 'Activity & interests',
    path: '/profile/interests',
  },
  {
    title: 'Articles (3)',
    path: '/profile/articles',
  },
]);
</script>

<template>
  <section class="profile-body">
    <div class="profile-nav">
      <router-link :to="link.path" exact-active-class="active"
        v-for="link in profileLinks" :key="link.title" class="item-link">
        {{ link.title }}
      </router-link>
    </div>
    <!-- <ul class="profile-nav">
      <li v-for="link in profileLinks" :key="link.title" class="item-link">
        <router-link :to="link.path" exact-active-class="active">{{ link.title }}</router-link>
      </li>
    </ul> -->
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/styleSheets/variables';

.profile-body {
  margin-top: 35px;
}
.profile-nav {
  display: flex;
  border-bottom: 1px solid #E7E7E7;
}
.item-link {
  text-align: center;
  background: $white;
  display: block;
  width: 240px;
  color: inherit;
  text-decoration: none;
  text-transform: uppercase;
  padding: 12px 0;
  font-weight: bold;
  font-size: $fs-6;
  transition: background-color 0.2s;
  border: 1px solid #E7E7E7;
  border-bottom: none;
  margin-right: -1px;
  &:last-of-type {
    border-radius: 0 4px 0 0;
  }
  &:first-of-type {
    border-radius: 4px 0 0 0;
  }
  &.active {
    background: $blue-200;
    height: 50px;
    line-height: 24px;
    transform: translateY(-10px);
    margin-bottom: -10px;
    color: $white;
    border-radius: 4px 4px 0 0;
  }
}
</style>