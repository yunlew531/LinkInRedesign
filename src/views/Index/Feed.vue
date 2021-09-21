<script setup>
import { ref } from 'vue';

const feeds = ref(
  [
    {
      id: 'b61owa2CGXa70CPs',
      name: 'Theresa Steward',
      profession: 'iOS developer',
      content: 'What did the Dursleys care if Harry lost his place on the House Quidditch team because he hadn’t practiced all summer? What was it to the Dursleys if Harry went back to school without any of his homework done? The Dursleys were what wizards called Muggles (not a drop of magical blood in their veins).',
      likes: [
        { name: 'Alina', uid: '5hiP6EBTn5m7bI7Qc68t' },
        { name: 'Mike', uid: '8TmjUC59g7fn6NUJ3p5x' },
        { name: 'Jason', uid: 'wEUnj3c3FJ6kEC5W6z82' },
        { name: 'Tom', uid: 'W0dX676k7n6SDsr1QYma' },
      ],
      comments: [],
      imgs: [],
    },
    {
      id: 'UO1w88P1nG2dS2pu',
      name: 'Kyle Fisher',
      profession: 'Product designer at Commandor Corp.',
      content: 'How’s your day going, guys?',
      likes: [ { name: 'Jack', uid: '3G1Lhjnj46MlmEY5JUg4' } ],
      comments: [],
      imgs: [],
    },
  ],
);
</script>

<template>
  <div class="feed-container">
    <div class="feed-main">
      <section class="new-post">
        d
      </section>
      <div class="divide">
        <span class="divide-text">
          Sort by: <span class="emphasize">trending</span>
        </span>
      </div>
      <ul class="feeds-list">
        <li v-for="feed in feeds" class="feed-card">
          <ul class="feed-card-header">
            <li v-for="(user, userKey) in feed.likes" :key="user.uid">
              {{ userKey === feed.likes.length - 1 ?  '&nbsp and ' : ''  }}
              <router-link :to="`@${user.uid}`">{{ user.name }}</router-link>
              {{ userKey < feed.likes.length - 2 ?  ',&nbsp' : '' }}
            </li>
          </ul>
          <div class="feed-card-body"></div>
          <div class="feed-card-footer"></div>
        </li>
      </ul>
    </div>
    <aside class="aside">
      <ul>
        <li class="aside-card"></li>
      </ul>
    </aside>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styleSheets/variables';

@mixin card {
  background: $white;
  box-shadow: 0px 20px 60px $gray-200;
  border-radius: 4px;
  padding: 25px 30px;
}

.feed-container {
  display: flex;
}
.feed-main {
  flex-grow: 1;
  margin-right: 40px;
}
.new-post {
  @include card;
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
.feed-card {
  @include card;
  padding: 0;
}
.feed-card-header {
  display: flex;
  border-bottom: 1px solid $white-100;
  padding: 15px;
  > li > a {
    text-decoration: none;
    color: $blue-200;
  }
}
.feed-card-body {
  border-bottom: 1px solid $white-100;
  padding: 15px 30px 20px;
}
.feed-card-footer {
  padding: 0 30px;
}
.aside {
  width: 290px;
  height: 500px;
}
.aside-card {
  @include card;
}
</style>