<script setup>
import { ref } from 'vue';

const navLinks = ref([
  {
    title: 'About',
  },
  {
    title: 'Talent Solutions',
  },
  {
    title: 'Community Guidelines',
  },
  {
    title: 'Careers',
  },
  {
    title: 'Marketing Solutions',
  },
  {
    title: 'Privacy & Terms',
  },
  {
    title: 'Advertising',
  },
  {
    title: 'Sales Solutions',
  },
  {
    title: 'Mobile App',
  },
  {
    title: 'Small Business',
  },
  {
    title: 'Safery Center',
  },
]);
</script>

<template>
  <footer class="footer">
    <ul class="container">
      <li class="logo">
        <router-link to="/">
          <img class="logo-img" src="@/assets/images/Logo.png" alt="LinkedIn">
        </router-link>
        <h4>Linked<span>In</span></h4>
      </li>
      <li class="footer-nav">
        <h3>Navigation</h3>
        <ul class="footer-nav-list">
          <li v-for="link in navLinks" :key="link.title" class="nav-link">
            <router-link to="/">{{ link.title }}</router-link>
          </li>
        </ul>
      </li>
      <li class="fast-access">
        <h3>Fast access</h3>
        <button class="questions-btn" type="button">Questions?</button>
        <button class="settings-btn" type="button">Settings</button>
      </li>
      <li class="language">
        <h3>Language</h3>
        <div class="select-panel">
          <select class="language-select" name="" id="">
            <option value="english" selected>english</option>
            <option value="chinese">chinese</option>
          </select>
          <img class="chevron-down" src="@/assets/images/chevron-down.png" alt="chevron-down">
        </div>
      </li>
    </ul>
  </footer>
</template>

<style lang="scss" scoped>
@import '@/assets/styleSheets/variables';

.container {
  width: 1180px;
  margin: auto;
  display: flex;
  padding: 30px 0 50px;
}
.logo {
  margin-right: 80px;
  > h4 {
    font-size: bold;
    margin-top: 12px;
    > span {
      color: $blue-400;
    }
  }
  > a {
    display: inline-block;
  }
}
.logo-img {
  width: 46px;
  height: 46px;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.05);
  }
}
.footer-nav {
  width: 485px;
  margin-right: 80px;
  > h3 {
    margin-bottom: 30px;
  }
}
.footer-nav-list {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -2% -15px 0;
}
.nav-link {
  width: 31.333333%;
  margin: 0 2% 15px 0;
  font-size: $fs-6;
  > a {
    display: inline-block;
    text-decoration: none;
    color: inherit;
    transition: color 0.2s, transform 0.2s;
    &:hover {
      color: $blue-200;
      transform: translateX(10px) skewX(-10deg);
    }
  }
}
.fast-access {
  width: 170px;
  margin-right: 80px;
  > h3 {
    margin-bottom: 25px;
  }
}
.questions-btn, .settings-btn {
  width: 100%;
  border: 1px solid #0275B1;
  border-radius: 4px;
  padding: 10px 15px;
  text-transform: uppercase;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
}
.questions-btn {
  background: $blue-400;
  margin-bottom: 10px;
  color: $white;
  transition: background-color 0.2s, color 0.2s;
  &:hover {
    background: $white;
    color: $blue-400;
  }
}
.settings-btn {
  background: $white;
  color: $blue-400;
  transition: background-color 0.2s, color 0.2s;
  &:hover {
    background: $blue-400;
    color: $white;
  }
}
.language {
  width: 270px;
  > h3 {
    margin-bottom: 25px;
  }
}
.select-panel {
position: relative;
  .chevron-down {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
  }
}
.language-select {
  width: 100%;
  border-radius: 4px;
  border: 1px solid #F0F0F0;
  text-transform: uppercase;
  padding: 10px 20px;
  font-weight: bold;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
}
</style>