<template>
  <Navigation />
  <main class="container">
    <router-view />
  </main>
</template>

<script setup>
import Navigation from '@/components/frontend/layouts/Navigation.vue';
import { useRouter } from "vue-router";

const router = useRouter();
router.push('/profile')
</script>

<style lang="scss" scoped>
.container {
  width: 1180px;
  margin: auto;
}
</style>