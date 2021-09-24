<script setup>
import { defineProps } from 'vue';

defineProps({
  title: {
    type: String,
    default: 'title',
    required: true,
  },
  headLink: {
    type: Object,
    validator: (prop) => {
      const isTitleValid = typeof prop.title === 'string';
      const isPathValid = prop.path && prop.path[0] === '/';
      return isTitleValid && isPathValid;
    },
  },
});
</script>

<template>
  <div class="aside-card">
    <div class="aside-card-header">
      <h3 class="aside-card-title">{{ title }}</h3>
      <router-link v-if="headLink && headLink.path" :to="headLink.path">
        {{ headLink.title }}
      </router-link>
    </div>
    <slot name="card-body"></slot>
  </div>    
</template>

<style lang="scss" scoped>
@import '@/assets/styleSheets/variables';

.aside-card {
  background: $white;
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 25px 30px;
}
.aside-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid $white-100;
  padding-bottom: 20px;
  > a {
    text-decoration: none;
    text-transform: uppercase;
    color: $blue-400;
    font-size: $fs-7;
    font-weight: bold;
    transition: transform 0.2s, filter 0.2s;
    &:hover {
      filter: brightness(1.3);
      transform: translateX(10px) skewX(-10deg);
    }
  }
}
.aside-card-title {
  text-transform: uppercase;
  font-size: $fs-6;
  font-weight: bold;
}
</style>