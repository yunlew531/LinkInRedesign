<script setup>
import { provide } from 'vue';
import store from '@/composition/store.js';

const { state } = store;

provide('state', state);
</script>

<template>
  <router-view />
</template>