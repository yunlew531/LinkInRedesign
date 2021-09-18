<template>
  <Navigation />
  <main class="container">
    <router-view />
  </main>
  <Footer />
</template>

<script setup>
import Navigation from '@/components/frontend/layouts/Navigation.vue';
import Footer from '@/components/frontend/layouts/Footer.vue';
</script>

<style lang="scss" scoped>
.container {
  width: 1180px;
  margin: auto;
  padding: 120px 0 40px;
}
</style>