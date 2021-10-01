<script setup>
import { inject, computed } from 'vue';
import { useRouter } from 'vue-router';
import store from '@/composition/store.js';
import { apiLogout } from '@/api';

const router = useRouter();
const { setLogin, setOffcanvasDisplay } = store;

const state = inject('state');

const isOffcanvasShow = computed(() => {
  const { isOffcanvasShow } = state.value;
  const { body } = document;

  if(isOffcanvasShow) body.style.overflow = 'hidden';
  else body.style.overflow = 'auto';

  return isOffcanvasShow;
});
const closeOffcanvas = () => setOffcanvasDisplay(false);

const logout = async () => {
  try {
    await apiLogout();
    setLogin(false);
    closeOffcanvas();
    document.cookie = `LinkInRe=;expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    router.push('/login');
  } catch (err) {
    console.dir(err.response.data.message);
  }
};
</script>

<template>
  <div class="offcanvas-panel" :class="{ show: isOffcanvasShow }">
    <div class="blur-filter" @click="closeOffcanvas"></div>
    <div class="offcanvas-main">
      <button type="button" class="close-offcanvas-btn" @click="closeOffcanvas">
        <img src="@/assets/images/close.png" alt="close offcanvas">
      </button>
      <div class="offcanvas-header">
        <h3>More from LinkedIn</h3>
        <button class="logout-btn" @click="logout">logout</button>
      </div>
      <div class="offcanvas-links">
        <router-link to="/" class="offcanvas-link">
          <img src="@/assets/images/Groups-offcanvas.png" alt="groups">
          <span>groups</span>
        </router-link>
        <router-link to="/" class="offcanvas-link">
          <img src="@/assets/images/Groups-offcanvas.png" alt="groups">
          <span>groups</span>
        </router-link>
      </div>
      <div class="business-services">
        <h3 class="business-services-title">Business Services</h3>
        <router-link to="/" class="business-service-link">
          <h2>Post a job</h2>
          <h4>Get your job in front of quality candidates</h4>
        </router-link>
      </div>
      <div class="offcanvas-footer">
        <router-link to="/" class="join-premium-btn">
          <h2>LinkedIn Premium</h2>
          <h4>Special features only for premium users</h4>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styleSheets/variables';

.offcanvas-panel {
  &.show {
    .offcanvas-main {
      transform: translateX(0);
    }
    .blur-filter {
      display: block;
      backdrop-filter: blur(1px) brightness(0.9);
    }
  }
}
.blur-filter {
  position: fixed;
  display: none;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  z-index: 999;
  transition: backdrop-filter 0.5s;
  backdrop-filter: blur(0) brightness(1);
}
.offcanvas-main {
  display: flex;
  flex-direction: column;
  width: 370px;
  background: $white;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  transform: translateX(100% + 64);
  box-shadow: 0px 10px 40px rgba(89, 120, 151, 0.06);
  z-index: 1000;
  transition: transform 0.2s;
}
.close-offcanvas-btn {
  position: absolute;
  top: 0;
  left: 0;
  background: $white;
  border: none;
  cursor: pointer;
  padding: 20px;
  transform: translateX(-100%);
  transition: background-color 0.2s;
  border-bottom-left-radius: 4px;
  > img {
    width: 24px;
    height: 24px;
  }
  &:hover {
    background: rgba($blue-400, 0.8);
  }
  &:active {
    background: $blue-400;
  }
}
.offcanvas-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid $white-100;
  padding: 30px 20px;
}
.logout-btn {
  font-size: $fs-5;
  text-transform: uppercase;
  color: $white;
  border: none;
  cursor: pointer;
  border-radius: 6px;
  background: $blue-200;
  padding: 8px 16px;
  transition: filter 0.2s;
  &:hover {
    filter: brightness(1.2);
  }
  &:active {
    filter: brightness(0.9);
  }
}
.offcanvas-links {
  display: flex;
  padding: 20px 30px 10px;
  margin-right: -10px;
  border-bottom: 1px solid $white-100;
}
.offcanvas-link {
  width: 50%;
  text-transform: uppercase;
  font-weight: bold;
  display: flex;
  align-items: center;
  padding: 12px 15px;
  border-radius: 6px;
  border: 1px solid $white-100;
  margin: 0 10px 10px 0;
  transition: filter 0.2s;
  > img {
    margin-right: 10px;
  }
  &:hover {
    filter: brightness(0.9);
  }
}
.business-services {
  flex-grow: 1;
  border-bottom: 1px solid $white-100;
  padding: 20px 32px 10px;
}
.business-services-title {
  margin-bottom: 15px;
}
.business-service-link {
  display: block;
  border: 1px solid $white-100;
  border-radius: 6px;
  box-shadow: 5px 5px 30px rgba($dark-100, 0.05);
  padding: 15px 20px;
  margin: 10px 0;
  transition: transform 0.2s, filter 0.2s;
  &:hover {
    transform: rotate3d(1, 1, 1, 2deg);
    filter: brightness(0.95);
  }
  > h2 {
    margin-bottom: 5px;
  }
  > h4 {
    font-size: $fs-6;
    color: rgba($dark-100, 0.7);
    font-weight: lighter;
  }
}
.offcanvas-footer {
  padding: 20px 30px;
}
.join-premium-btn {
  display: block;
  width: 100%;
  color: $white;
  background: linear-gradient(180deg, #D8C281 0%, #AC9B69 100%);
  border-radius: 4px;
  padding: 15px 20px;
  transition: filter 0.2s;
  > h2 {
    font-size: $fs-4;
    margin-bottom: 5px;
  }
  > h4 {
    font-size: $fs-6;
    font-weight: lighter;
  }
  &:hover {
    filter: brightness(1.1);
  }
  &:active {
    filter: brightness(0.9);
  }
}
</style>