<script setup>
import { ref } from 'vue';
import getImageUrl from '@/mixins/getImageUrl.js';

const recentNotices = ref([
  {
    title: 'You appeared in 9 searches this week',
    time: '3 hours',
    imgs: ['Rectangle 2.2-1', 'Rectangle 2.2', 'Group'],
    id: 'aryhgrsthjrtd',
  },
  {
    title: 'new notice',
    time: '10 hours',
    imgs: ['Rectangle 2.2-1', 'Rectangle 2.2', 'Group'],
    id: 'egf3rhg654r5t',
  },
]);

const earlierNotices = ref([
  {
    title: 'You appeared in 9 searches this week',
    time: '3 hours',
    imgs: ['Rectangle 2.2-1', 'Rectangle 2.2', 'Group'],
    id: 'g8e41gh3e5rhb',
  },
  {
    title: 'new notice',
    time: '10 hours',
    imgs: ['Rectangle 2.2-1', 'Rectangle 2.2', 'Group'],
    id: 'qwfrg5t1hn1bt',
  },
]);

const openSearchHistory = () => {
  console.log('open history');
};

const activeBtnsList = ref([]);
const showBtnsList = (noticeId, event) => {
  if(event.type === 'mouseenter') 
    activeBtnsList.value.push(noticeId);
  else if(event.type === 'mouseleave') {
    const idx = activeBtnsList.value.indexOf(noticeId);
    if(idx === -1) return;
    activeBtnsList.value.splice(idx, 1)
  }
};
</script>

<template>
  <div class="divide">
    <h3>recent</h3>
  </div>
  <ul>
    <li v-for="notice in recentNotices" :key="notice.id" class="notice">
      <ul class="notice-imgs">
        <li v-for="(img, idx) in notice.imgs" :key="img + idx">
          <img :src="getImageUrl(img)" :alt="img" class="notice-img">
        </li>
      </ul>
      <div class="notice-content">
        <h2 class="notice-title">
          <button type="button" @click="openSearchHistory">
            {{ notice.title }}</button>
        </h2>
        <span class="notice-time">{{ notice.time }}</span>
      </div>
      <div class="more-btns-group" :class="{ show: activeBtnsList.includes(notice.id) }"
        @mouseenter="showBtnsList(notice.id, $event)" @mouseleave="showBtnsList(notice.id, $event)">
        <button type="button" class="notice-more-btn">
          <img v-show="!activeBtnsList.includes(notice.id)"
            :src="getImageUrl('Other')" alt="more options in the notice">
          <img v-show="activeBtnsList.includes(notice.id)"
            :src="getImageUrl('chevron-down')" alt="more options in the notice">
        </button>
        <ul class="more-btns-list">
          <li class="more-btn-item">
            <button type="button" class="notice-delete-btn">Delete</button>
          </li>
        </ul>
      </div>
    </li>
  </ul>
  <div class="divide">
    <h3>Earlier</h3>
  </div>
  <ul class="earlier-notices-list">
    <li v-for="notice in earlierNotices" :key="notice.id" class="notice">
      <ul class="notice-imgs">
        <li v-for="(img, idx) in notice.imgs" :key="img + idx">
          <img :src="getImageUrl(img)" :alt="img" class="notice-img">
        </li>
      </ul>
      <div class="notice-content">
        <h2 class="notice-title">
          <button type="button" @click="openSearchHistory">
            {{ notice.title }}</button>
        </h2>
        <span class="notice-time">{{ notice.time }}</span>
      </div>
      <div class="more-btns-group" :class="{ show: activeBtnsList.includes(notice.id) }"
        @mouseenter="showBtnsList(notice.id, $event)" @mouseleave="showBtnsList(notice.id, $event)">
        <button type="button" class="notice-more-btn">
          <img v-show="!activeBtnsList.includes(notice.id)"
            :src="getImageUrl('Other')" alt="more options in the notice">
          <img v-show="activeBtnsList.includes(notice.id)"
            :src="getImageUrl('chevron-down')" alt="more options in the notice">
        </button>
        <ul class="more-btns-list">
          <li class="more-btn-item">
            <button type="button" class="notice-delete-btn">Delete</button>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>


<style lang="scss" scoped>
@import '@/assets/styleSheets/variables';

.divide {
  border-bottom: 1px solid $gray-300;
  position: relative;
  margin: 45px 0;
  > h3 {
    font-size: $fs-6;
    font-weight: bold;
    text-transform: uppercase;
    position: absolute;
    left: 50%;
    top: 50%;
    padding: 0 40px;
    background: $white-200;
    transform: translateX(-50%) translateY(-50%);
  }
  &:first-of-type {
    margin-top: 0;
  }
}
.notice {
  display: flex;
  align-items: center;
  padding: 20px 30px;
  background: $white;
  border-radius: 4px;
  box-shadow: 0px 20px 60px $gray-200;
  margin-bottom: 10px;
}
.notice-imgs {
  display: flex;
  > li {
    transition: transform 0.2s;
  }
  &:hover {
    @for $i from 1 through 3 {
      li:nth-child(#{$i}) {
        transform: translateX($i * 5px - 5px);
      }
    }
  }
}
.notice-img {
  width: 32px;
  height: 32px;
  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    filter: brightness(0.9);
  }
}
@for $i from 1 through 3 { 
  .notice-imgs li:nth-child(#{$i}) {
    transform: translateX(-16px * $i + 16px);
    z-index: calc(1 * $i);
  }
}
.notice-content {
  flex-grow: 1;
}
.notice-title {
  > button {
    font-weight: bold;
    font-size: $fs-5;
    cursor: pointer;
    border: none;
    background: transparent;
    padding: 0;
    transition: color 0.2s;
    &:hover {
      color: $blue-200;
    }
  }
  margin-bottom: 5px;
}
.notice-time {
  font-weight: lighter;
  color: rgba($dark-100, 0.8);
  font-size: $fs-6;
}
.notice-more-btn, .notice-delete-btn {
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 10px;
  > img {
    width: 24px;
    height: 24px;
  }
}
.more-btns-group {
  position: relative;
  .more-btns-list {
    position: absolute;
    bottom: -80%;
    right: 0;
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.2s, visibility 0.2s;
  }
  &.show {
    .more-btns-list {
      visibility: visible;
      opacity: 1;
    }
  }
}
.more-btn-item {
  background: $blue-200;
  transition: filter 0.2s;
  > button {
    font-weight: bold;
    color: $white;
    text-transform: uppercase;
  }
  &:first-child {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  &:last-child {
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  &:hover {
    filter: brightness(0.9);
  }
  &:active {
    filter: brightness(0.8);
  }
}
.notice-delete-btn {
  background: transparent;
  border: none;
}
.earlier-notices-list {
  margin-bottom: -10px;
}
</style>