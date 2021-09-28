<script setup>
import { provide } from 'vue';
import store from '@/composition/store';
import userReq from '@/api/userReq';
import { apiCheckLogin } from '@/api';

const { state, setLogin, setUid } = store;

provide('state', state);

const checkLogin = async () => {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)LinkInRe\s*=\s*([^;]*).*$)|^.*$/, '$1');
  userReq.defaults.headers.common.Authorization = `${token}`;
  try{
    const { data } = await apiCheckLogin();
    const { uid, success } = data;
    if (success) {
      setUid(uid);
      setLogin();
    } else {
      setLogin(false);
    }
  } catch (err) {}
};
checkLogin();

</script>

<template>
  <router-view />
</template>