<script setup>
import { ref } from 'vue';
import getImageUrl from '@/mixins/getImageUrl.js';

const receivedUsers = ref([
  {
    name: 'Brandon Wilson',
    uid: 'regrg',
    content: 'Hey, I saw your works. I like it! Can we do something together? Or maybe you have project for UX at the moment?',
    profession: 'Senior UX designer',
    connections_qty: 30,
    img: 'feed-user-3',
  },
  {
    name: 'Theresa Steward',
    uid: 'ergergr',
    content: '',
    profession: 'Senior UX designer',
    connections_qty: 5,
    img: 'feed-user-1',
  },
]);
</script>

<template>
  <div data-name="sent-connections">
    <div style="height: 1px; margin-bottom: -1px;"></div>
    <div class="divide">
      <span class="divide-text">
        you have <span class="emphasize">{{ receivedUsers.length }} request wait for reply</span>
      </span>
    </div>
    <ul>
      <li v-for="user in receivedUsers" :key="user.uid" class="sent-card">
        <router-link :to="`/@${user.uid}`" class="sent-card-img-link">
          <img :src="getImageUrl(user.img)" :alt="user.name" class="sent-card-img">
        </router-link>
        <div class="sent-card-contents">
          <h3 class="sent-card-name">
            <router-link :to="`/@${user.uid}`">{{ user.name }}</router-link></h3>
          <h4 class="sent-card-profession">{{ user.profession }}</h4>
          <button type="button" class="sent-card-connections-qty">{{ user.connections_qty }} connections</button>
        </div>
        <div class="sent-card-content">
          <h3>YOUR MESSAGE</h3>
          <p>{{ user.content || 'empty' }}</p>
        </div>
        <button type="button" class="sent-card-cancel-btn">cancel</button>
      </li>
    </ul>
  </div>
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
.sent-card {
  @include card;
  &:last-child {
    margin-bottom: 0;
  }
}
.sent-card-contents {
  flex-shrink: 0;
  width: 135px;
}
.sent-card-img-link {
  flex-shrink: 0;
  display: block;
  margin-right: 15px;
  transition: filter 0.2s;
  &:hover {
    filter: brightness(0.8);
  }
}
.sent-card-img {
  width: 52px;
  height: 52px;
  border-radius: 50%;
}
.sent-card-name, .sent-card-profession {
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
.sent-card-profession, .sent-card-connections-qty {
  font-weight: lighter;
  font-size: $fs-6;
}
.sent-card-connections-qty {
  color: $blue-400;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  &:hover {
    filter: brightness(1.3);
  }
  &:active {
    filter: brightness(0.9);
  }
}
.sent-card-content {
  flex-grow: 1;
  border-left: 2px solid $blue-400;
  line-height: 1.5;
  font-size: $fs-6;
  font-weight: lighter;
  padding-left: 15px;
  margin: 0 50px;
  > p {
    color: rgba($dark-100, 0.6);
  }
}
.sent-card-cancel-btn {
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;
  border-radius: 4px;
  padding: 10px 20px;
  transition: filter 0.2s;
  color: $white;
  background: $blue-400;
  border: none;
  &:hover {
    filter: brightness(1.1);
  }
  &:active {
    filter: brightness(0.9);
  }
}
</style>