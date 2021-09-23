<template>
  <div class="index-container">
    <Navigation />
    <div class="page-container">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Navigation from '@/components/Index/Navigation.vue';
import Footer from '@/components/Index/Footer.vue';
</script>

<style lang="scss" scoped>
.index-container{
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.page-container {
  flex-grow: 1;
  width: 1180px;
  margin: auto;
  padding: 120px 0 40px;
}
</style>