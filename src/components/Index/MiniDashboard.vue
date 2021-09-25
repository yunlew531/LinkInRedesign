<script setup>

</script>

<template>
  <div class="aside-card">
    <div class="aside-card-header">
      <h3 class="aside-card-title">your dashboard</h3>
      <router-link to="/stats" class="head-link">go to stats</router-link>
    </div>
    <span class="dashboard-num">367</span>
    <h4 class="dashboard-title">views today</h4>
    <span class="dashboard-num">15</span>
    <h4 class="dashboard-title">posts views</h4>
    <span class="dashboard-num">9</span>
    <h4 class="dashboard-title">search appereances</h4>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styleSheets/variables';

.aside-card {
  background: $white;
  border-radius: 4px;
  padding: 25px 30px;
  box-shadow: 0px 20px 60px $gray-200;
}
.aside-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid $white-100;
  padding-bottom: 20px;
  > .head-link {
    text-decoration: none;
    text-transform: uppercase;
    color: $blue-400;
    font-size: $fs-7;
    font-weight: bold;
    transition: transform 0.2s, filter 0.2s;
    &:hover {
      filter: brightness(1.3);
      transform: translateX(5px) skewX(-10deg);
    }
  }
}
.aside-card-title {
  text-transform: uppercase;
  font-size: $fs-6;
  font-weight: bold;
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
</style>