<script setup>
import { ref, computed, defineAsyncComponent } from 'vue';
import getImageUrl from '@/mixins/getImageUrl.js';
import dayjs from '@/mixins/dayjs.js';

const ReceivedConnections = defineAsyncComponent(() =>
  import('@/components/Index/Network/Invitations/ReceivedConnections.vue'));
const SentConnections = defineAsyncComponent(() =>
  import('@/components/Index/Network/Invitations/SentConnections.vue'));

const recentUsers = ref([
  {
    name: 'Audrey Alexander',
    uid: 'argaerg',
    profession: 'Team lead at Google',
    img: 'feed-user-4',
    connect_time: 1632428039,
  },
  {
    name: 'Kyle Fisher',
    uid: 'ergerg',
    profession: 'Product designer at Commandor Corp',
    img: 'feed-user-2',
    connect_time: 1632426180,
  },
]);

const nextDisplay = ref('');
const currentDisplay = ref('ReceivedConnections');
const currentComponent =  computed(() => {
  let component = null;
  switch(currentDisplay.value) {
    case 'ReceivedConnections':
      component = ReceivedConnections;
      break;
    case 'SentConnections':
      component = SentConnections;
      break;
  }
  return component;
})

const handleComponent = (component) => {
  currentDisplay.value = '';
  nextDisplay.value = component;
};

let height = 0;
const fillHeightEl = ref(null);
const fillHeight = (el) => {
  if (el) {
    height = el.clientHeight || height;
  } else height = 0;

  if(!el.clientHeight || !el) fillHeightEl.value.style.height = `${height}px`
};
</script>

<template>
  <div class="btns-container">
    <button type="button" class="page-btn"
      :class="{ active: currentDisplay === 'ReceivedConnections' }"
      @click="handleComponent('ReceivedConnections')">Received
    </button>
    <button type="button" class="page-btn"
      :class="{ active: currentDisplay === 'SentConnections' }"
      @click="handleComponent('SentConnections')">Sent
    </button>
  </div>
  <div ref="fillHeightEl"></div>
  <transition name="fade" mode="out-in" 
    @before-enter="fillHeight(0)"
    @before-leave="fillHeight($event)"
    @after-leave="fillHeight($event), currentDisplay = nextDisplay">
    <component :is="currentComponent" />
  </transition>
  <div class="divide">
    <span class="divide-text">recent connections</span>
  </div>
  <ul class="recent-connections-list">
    <li v-for="user in recentUsers" :key="user.uid" class="recent-connections-card">
      <router-link :to="`/@${user.uid}`" class="recent-card-img-link">
        <img :src="getImageUrl(user.img)" :alt="user.name" class="recent-connections-img">
      </router-link>
      <div class="recent-connections-contents">
        <h3 class="recent-connections-name">
          <router-link :to="`/@${user.uid}`">{{ user.name }}</router-link>
        </h3>
        <h4 class="recent-connections-profession">{{ user.profession }}</h4>
      </div>
      <span v-if="dayjs(user.connect_time * 1000).isToday()" class="connections-time">
        {{ dayjs(user.connect_time * 1000).fromNow() }}
      </span>
      <span v-else class="connections-time">
        {{ dayjs(user.connect_time * 1000).format('YYYY/MM/DD') }}
      </span>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
@import '@/assets/styleSheets/variables';

@mixin card {
  display: flex;
  align-items: center;
  background: $white;
  border-radius: 4px;
  padding: 20px 30px;
  margin-bottom: 10px;
}

.btns-container {
  display: flex;
  align-items: stretch;
  height: 50px;
  border-bottom: 1px solid $gray-300;
}
.page-btn {
  width: 240px;
  text-transform: uppercase ;
  font-weight: bold;
  background: $white;
  border: 1px solid $gray-300;
  border-bottom: none;
  cursor: pointer;
  margin: 10px 0 0 -1px;
  transition: margin-top 0.3s ease-in, color 0.2s 0.5s, background-color 0.2s 0.5s, border-radius 0.5s;
  &:first-of-type {
    margin-left: 0;
    border-radius: 8px 0 0 0;
  }
  &:last-of-type {
    border-radius: 0 8px 0 0;
  }
  &.active {
    margin-top: 0;
    color: $white;
    background: $blue-400;
    border-radius: 8px 8px 0 0;
  }
}
  .divide {
  width: 100%;
  height: 1px;
  border-bottom: 1px solid #E7E7E7;
  text-transform: uppercase;
  font-size: $fs-6;
  font-weight: bold;
  position: relative;
  margin: 30px 0;
  .emphasize {
    color: $blue-200
  }
}
.divide-text {
  display: block;
  background: $white-200;
  padding: 0 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.recent-connections-list {
  display: flex;
  margin-right: -2%
}
.recent-connections-card {
  @include card;
  width: 48%;
  margin-right: 2%;
}
.recent-card-img-link {
  flex-shrink: 0;
  display: block;
  margin-right: 15px;
  transition: filter 0.2s;
  &:hover {
    filter: brightness(0.8);
  }
}
.recent-connections-img {
  width: 52px;
  height: 52px;
  border-radius: 50%;
}
.recent-connections-contents {
  flex-grow: 1;
}
.recent-connections-name {
  margin-bottom: 5px;
  > a {
    transition: color 0.2s;
    &:hover {
      color: rgba($blue-200, 1.3);
    }
    &:active {
      color: rgba($blue-200, 0.9);
    }
  }
}
.recent-connections-profession {
  font-weight: lighter;
  font-size: $fs-6;
}
.connections-time {
  flex-shrink: 0;
  align-self: end;
  font-size: $fs-6;
  color: rgba($dark-100, 0.3);
}
.fade-enter-active,  .fade-leave-active{
  transition: opacity 0.5s ease-in, transform 0.5s;
}
.fade-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.fade-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.fade-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>