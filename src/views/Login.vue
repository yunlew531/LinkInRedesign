<script setup>
import { ref } from 'vue';
import { apiRegister, apiSignIn } from '@/api';
import userReq from '@/api/userReq';
import Footer from '@/components/Index/Footer.vue';
import store from '@/composition/store';
import { useRouter } from 'vue-router';

const router = useRouter();
const { setLogin, setUid } = store;

const currentPanel = ref('login');
let nextPanel = '';
const handleStatus = ($event, newPanel) => {
  if ($event instanceof Element) 
    currentPanel.value = nextPanel;
  else {
    currentPanel.value = '';
    nextPanel = newPanel;
  }
};

const registerForm = ref({
  name: '',
  phone: '',
  email: '',
  password: '',
  address: '',
});
const register = async () => {
  try {
    const { data } = await apiRegister(registerForm.value);
    const { uid, token, expired } = data;
    
    document.cookie = `LinkInRe=${token};expires=${new Date(expired)};`;
    setUid(uid);
    setLogin();
    router.push('/');
  } catch (err) {
    const message = err.response?.data.message || '無法註冊';
    alert(message);
  }
};

const signinForm = ref({
  email: '',
  password: '',
});
const signIn = async () => {
  try {
    const { data } = await apiSignIn(signinForm.value);
    const { token, expired, uid } = data;

    document.cookie = `LinkInRe=${token};expires=${new Date(expired)};`;
    userReq.defaults.headers.common.Authorization = `${token}`;
    setUid(uid);
    setLogin();
    router.push('/');
  } catch (err) {
    alert(err.response.data.message);
  }
};
</script>

<template>
  <div class="login-container">
    <div class="login-content">
      <main class="login-main">
        <p class="login-paragraph">Find Dream Jobs,<br> All In LinkIn</p>
        <transition-group name="card" @after-leave="handleStatus($event)">
          <section v-if="currentPanel === 'login'" class="login-card" key="login">
            <div class="login-card-header">
              <img src="@/assets/images/Logo.png" alt="LinkIn logo" class="logo-img">
              <h1>Link<span>In</span></h1>
            </div>
            <div class="login-card-body">
              <label class="input-group">
                <span>Email</span>
                <input type="email" v-model="signinForm.email">
              </label>
              <label class="input-group">
                <span>Password</span>
                <input type="password" v-model="signinForm.password" @keyup.enter="signIn">
              </label>
            </div>
            <button type="button" class="login-btn" @click="signIn">Login</button>
            <button type="button" class="go-register-btn"
              @click="handleStatus($event, 'register')">No account? register one</button>
          </section>
          <section v-if="currentPanel === 'register'" class="login-card" key="register">
            <div class="login-card-header">
              <img src="@/assets/images/Logo.png" alt="LinkIn logo" class="logo-img">
              <h1>Link<span>In</span></h1>
            </div>
            <div class="login-card-body login-card-body-register">
              <label class="input-group">
                <span>Name</span>
                <input type="text" v-model="registerForm.name">
              </label>
              <label class="input-group">
                <span>Phone</span>
                <input type="text" v-model="registerForm.phone">
              </label>
              <label class="input-group">
                <span>Email</span>
                <input type="email" v-model="registerForm.email">
              </label>
              <label class="input-group">
                <span>Password</span>
                <input type="password" v-model="registerForm.password">
              </label>
              <label class="input-group">
                <span>Address</span>
                <input type="password" v-model="registerForm.address">
              </label>
            </div>
            <button type="button" class="login-btn" @click="register">Register</button>
            <button type="button" class="go-login-btn"
              @click="handleStatus($event, 'login')">I have account</button>
          </section>
        </transition-group>
      </main>
      <Footer />
    </div>
  </div>
</template>


<style lang="scss" scoped>
@import '@/assets/styleSheets/variables';

.login-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.login-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background: url(@/assets/images/login-bg.jpg) center no-repeat;
  background-size: cover;
  padding-top: 20px;
}
.login-main {
  flex-grow: 1;
  display: flex;
  align-items: center;
}
.login-paragraph{
  font-size: $fs-1;
  color: $blue-200;
  line-height: 1.2;
  margin-right: 150px;
}
.login-card {
  min-width: 350px;
  background: $white;
  border-radius: 6px;
  box-shadow: 5px 5px 30px $blue-100;
  position: relative;
  transition: transform 0.5s, opacity 0.5s;
}
.login-card-header {
  font-size: $fs-3;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
  padding: 45px 30px 0 30px;
  > h1 > span {
    color: $blue-200;
  }
}
.logo-img {
  width: 50px;
  height: 50px;
  margin-right: 20px;
}
.login-card-body {
  padding: 0 30px;
}
.login-card-body-register {
  display: flex;
  flex-wrap: wrap;
  margin-right: -2%;
  > .input-group {
    width: 48%;
    margin-right: 2%;
  }
}
.input-group {
  display: block;
  margin-bottom: 30px;
  span {
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
  }
  input {
    width: 100%;
    height: 28px;
    font-size: $fs-5;
    border: none;
    border-bottom: 1px solid rgba($dark-100, 0.5);
    padding-bottom: 5px;
    transition: border-bottom 0.5s;
    &:focus-visible {
      border-bottom: 2px solid rgba($blue-200, 0.5);
    }
  }
}
.login-btn {
  width: 100%;
  font-size: $fs-4;
  letter-spacing: 0.05rem;
  border: none;
  background: $blue-400;
  color: $white;
  margin-top: 30px;
  padding: 15px;
  border-radius: 0 0 6px 6px;
  cursor: pointer;
  transition: filter 0.2s;
  &:hover {
    filter: brightness(1.1);
  }
  &:active {
    filter: brightness(0.9);
  }
}
.go-login-btn, .go-register-btn {
  font-size: $fs-5;
  font-weight: bold;
  position: absolute;
  bottom: -35px;
  left: 0;
  background: transparent;
  border: none;
  color: $blue-200;
  cursor: pointer;
  padding: 0 10px;
  transition: filter 0.2s;
  &:hover {
    filter: brightness(1.2);
  }
  &:active {
    filter: brightness(0.8);
  }
}
.card-enter-from {
  transform: translateX(-100px);
  opacity: 0;
}
.card-enter-to, .card-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.card-leave-to {
  transform: translateX(100px);
  opacity: 0;
}
</style>