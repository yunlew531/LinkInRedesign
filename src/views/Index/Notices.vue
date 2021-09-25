<script setup>
import MiniDashboard from '@/components/Index/MiniDashboard.vue';

</script>

<template>
  <div class="notice-container">
    <aside class="aside">
      <router-link to="/notices" active-class="active" class="aside-card-link">
        Notifications</router-link>
      <router-link to="/notices/setting" active-class="active" class="aside-card-link">
        Notification settings</router-link>
      <MiniDashboard></MiniDashboard>
    </aside>
    <main class="notice-main">
      <router-view />
    </main>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styleSheets/variables';

.notice-container {
  display: flex;
}
.notice-main {
  flex-grow: 1;
  margin-left: 40px;
}
.aside {
  flex-shrink: 0;
  width: 290px;
}
.aside-card-link {
  font-weight: bold;
  text-transform: uppercase;
  font-size: $fs-6;
  display: block;
  background: $white;
  border-bottom: 1px solid $gray-300;
  transition: border-left 0.2s;
  padding: 20px 30px;
  &:first-of-type {
    border-radius: 4px 4px 0 0;
  }
  &:last-of-type {
    border-bottom: none;
    border-radius: 0 0 4px 4px;
    margin-bottom: 20px;
  }
  &.active {
    border-left: 10px solid $blue-400;
    color: rgba($dark-100, 0.6);
  }
}
</style>