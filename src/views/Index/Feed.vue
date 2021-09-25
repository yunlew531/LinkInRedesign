<script setup>
import { ref, onMounted } from 'vue';
import getImageUrl from '@/mixins/getImageUrl.js';
import handleTextLength from '@/mixins/handleTextLength.js';

const feeds = ref(
  [
    {
      id: 'b61owa2CGXa70CPs',
      uid: 'QbW2SLcSr90oL9ly05U0',
      name: 'Theresa Steward',
      user_photo: 'feed-user-1',
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
      uid: 'abB3kTo3WDS319sOC5td',
      name: 'Kyle Fisher',
      user_photo: 'feed-user-2',
      profession: 'Product designer at Commandor Corp.',
      content: 'How’s your day going, guys?',
      likes: [ { name: 'Jack', uid: '3G1Lhjnj46MlmEY5JUg4' } ],
      comments: [],
      imgs: [],
    },
  ],
);

const editorEl = ref(null);
let quill = null;
onMounted(() => {
  quill = new Quill(editorEl.value, {
     modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          ['image', 'code-block']
        ]
      },
      placeholder: '請輸入貼文內容',
      theme: 'snow',
  });
});

const handleBtnsShow = (e) => {
  const btnsListEl = e.target.closest('.card-btns-group').querySelector('ul');
  if(e.type === 'mouseenter') btnsListEl.classList.add('show');
  else if (e.type === 'mouseleave') btnsListEl.classList.remove('show');
};
</script>

<template>
  <div class="feed-container">
    <main class="feed-main">
      <section class="new-post">
        <div class="new-post-header">
          <h3>new post</h3>
          <button type="button" class="new-post-submit-btn">
            <img src="@/assets/images/Vector-white.png" alt="submit button">
          </button>
        </div>
        <div ref="editorEl" class="new-post-editor"></div>
      </section>
      <div class="divide">
        <span class="divide-text">
          Sort by: <span class="emphasize">trending</span>
        </span>
      </div>
      <ul class="feeds-list">
        <li v-for="feed in feeds" class="feed-card">
          <div class="feed-card-header">
            <ul class="liked-list">
              <li v-for="(user, userKey) in feed.likes" :key="user.uid">
                {{ (userKey === feed.likes.length - 1) && (userKey > 0) ?  '&nbsp and ' : '' }}
                <router-link :to="`@${user.uid}`">{{ user.name }}</router-link>
                {{ userKey < feed.likes.length - 2 ?  ',&nbsp' : '' }}
                {{ userKey === feed.likes.length - 1 ?  ' liked this' : '' }}
              </li>
            </ul>
            <div class="card-btns-group" @mouseleave="handleBtnsShow($event)">
              <button type="button" @mouseenter="handleBtnsShow($event)"
                class="feed-card-more-btn">
                <img src="@/assets/images/Other.png" alt="more button">
              </button>
              <ul>
                <li>
                  <button type="button">delete</button>
                </li>
                <li>
                  <button type="button">收藏</button>
                </li>
              </ul>
            </div>
          </div>
          <div class="feed-card-body">
            <div class="feed-card-user">
              <router-link :to="`/@${feed.uid}`" class="user-link">
                <img :src="getImageUrl(feed.user_photo)" :alt="feed.name">
              </router-link>
              <div>
                <router-link :to="`/@${feed.uid}`" class="user-link">{{ feed.name }}</router-link>
                <h4>{{ feed.profession }}</h4>
              </div>
            </div>
            <p>{{ feed.content }}</p>
          </div>
          <ul class="feed-card-footer">
            <li>
              <button type="button" class="feed-card-footer-btn">
                <img v-if="feed.likes.length"
                  src="@/assets/images/thumbs-up-active.png" alt="thumbs-up button">
                <img v-else src="@/assets/images/thumbs-up.png"
                  alt="thumbs-up button">
                <span>{{ feed.likes.length }}</span>
              </button>
            </li>
            <li>
              <button type="button" class="feed-card-footer-btn">
                <img src="@/assets/images/message-circle.png" alt="comments button">
                <span>{{ feed.comments.length }}</span>
              </button>
            </li>
            <li>
              <button type="button" class="feed-card-footer-btn">
                <img src="@/assets/images/share-2.png" alt="share button">
                <span>share</span>
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </main>
    <aside class="aside">
      <ul>
        <li class="aside-card">
          <img src="@/assets/images/Rectangle-aside.png" alt="Rectangle">
          <div class="aside-card-body">
            <img src="@/assets/images/user-1-big.png" alt="username" class="aside-card-user-photo">
            <h3>
              <span>Dmitry Kargaev</span>
              <img src="@/assets/images/in-logo.png" alt="member level">
            </h3>
            <h4>Freelance UX/UI designer, 80+ projects in web design, mobile apps (iOS & android) and creative projects. Open to offers.</h4>
          </div>
        </li>
        <li class="aside-card">
          <button type="button" class="write-article-btn">write new article</button>
        </li>
        <li class="aside-card">
          <div class="aside-card-header">
            <h3>my groups</h3>
            <button type="button" class="aside-edit-list-btn">edit list</button>
          </div>
          <ul class="groups-list">
            <li class="group-card">
              <router-link to="/feed">
                <img src="@/assets/images/Group-1.png" alt="Moscow State Linguistical University">
                <h3>Moscow State Linguistical University</h3>
              </router-link>
            </li>
             <li class="group-card">
              <router-link to="/feed">
                <img src="@/assets/images/Group-2.png" alt="Digital freelancers group">
                <h3>Digital freelancers group</h3>
              </router-link>
            </li>
             <li class="group-card">
              <router-link to="/feed">
                <img src="@/assets/images/Group-3.png" alt="Interaction design association">
                <h3>Interaction design association</h3>
              </router-link>
            </li>
          </ul>
          <button type="button" class="show-all-btn">Show all (8)</button>
        </li>
        <li class="aside-card">
          <div class="aside-card-header">
            <h3>Followed hashtags</h3>
          </div>
          <ul class="hashtags-list">
            <li class="hashtag-item">#work</li>
            <li class="hashtag-item">#workgrg</li>
            <li class="hashtag-item">#wr</li>
            <li class="hashtag-item">#work</li>
            <li class="hashtag-item">#woggrk</li>
            <li class="hashtag-item">#work r</li>
          </ul>
        </li>
        <li class="aside-card">
          <div class="aside-card-header">
            <h3>Trending articles</h3>
          </div>
          <ul class="trending-article-list">
            <li class="trending-article-card">
              <router-link to="/feed">
                <img src="@/assets/images/Photo.png" alt="How I make cool designs?"
                  class="trending-article-card-img">
                <div class="trending-article-content">
                  <h3>How I make cool designs?</h3>
                  <span class="trending-article-card-viewers">1,305 viewers</span>
                </div>
              </router-link>
            </li>
            <li class="trending-article-card">
              <router-link to="/feed">
                <img src="@/assets/images/Photo-1.png" alt="Advices for young HR-manage"
                  class="trending-article-card-img">
                <div class="trending-article-content">
                  <h3>{{ handleTextLength('Advices for young HR-manage') }}</h3>
                  <span class="trending-article-card-viewers">760 viewers</span>
                </div>
              </router-link>
            </li>
            <li class="trending-article-card">
              <router-link to="/feed">
                <img src="@/assets/images/Photo-2.png" alt="A little about usability testing"
                  class="trending-article-card-img">
                <div class="trending-article-content">
                  <h3>A little about usability testing</h3>
                  <span class="trending-article-card-viewers">610 viewers</span>
                </div>
              </router-link>
            </li>
          </ul>
        </li>
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
.new-post-header {
  display: flex;
  align-items: center;
  text-transform: uppercase;
  font-size: $fs-6;
  padding-bottom: 15px;
}
.new-post-editor {
  border-radius: 0 0 8px 8px;
}
.new-post-submit-btn {
  margin-left: auto;
  cursor: pointer;
  background: $blue-400;
  border-radius: 4px;
  border: 1px solid $blue-200;
  box-shadow: 5px 5px 30px rgba($blue-200, 0.15);
  padding: 10px;
  &:hover {
    filter: brightness(0.9);
  }
  &:active {
    filter: brightness(0.8);
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
.feed-card {
  @include card;
  padding: 0;
  margin-bottom: 20px;
}
.feed-card-header {
  display: flex;
  align-items: center;
  border-bottom: 1px solid $white-100;
  padding: 15px;
}
.liked-list {
  display: flex;
  margin-right: auto;
  > li > a {
    text-decoration: none;
    color: $blue-400;
    transition: filter 0.2s;
    &:hover {
      filter: brightness(1.3);
    }
  }
}
.card-btns-group {
  position: relative;
  text-align: center;
  > ul {
    background: transparent !important;
    visibility: hidden;
    opacity: 0;
    position: absolute;
    right: 0;
    bottom: 0;
    border-radius: 8px;
    box-shadow: 3px 3px 5px rgba($blue-200, 0.1);
    transition: visibility 0.2s, opacity 0.2s;
    transform: translateY(100%);
    > li {
      background: rgba($blue-200, 0.9);
      cursor: pointer;
      border-bottom: $white-400 1px solid;
      &:hover {
        background: rgba($blue-200, 0.8);
      }
      &:active {
        background: rgba($blue-200, 1);
      }
      &:first-child {
        margin-top: 0;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
      }
      &:last-child {
        border-bottom-right-radius: 5px;
        border-bottom-left-radius: 5px;
        border-bottom: none;
      }
      > button {
        font-weight: bold;
        text-transform: uppercase;
        color: $white;
        cursor: pointer;
        background: transparent;
        border: none;
        padding: 10px 20px;
      }
    }
    &.show {
      visibility: visible;
      opacity: 1;
    }
  }
}
.feed-card-more-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  transition: transform 0.2s;
  padding: 5px 10px;
}
.feed-card-body {
  letter-spacing: 0.025rem;
  line-height: 1.5;
  border-bottom: 1px solid $white-100;
  padding: 15px 30px 20px;
}
.feed-card-user {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  .user-link {
    font-size: $fs-5;
    font-weight: bold;
    text-decoration: none;
    color: inherit;
    margin: 0 15px 5px 0;
    transition: color  0.2s, filter 0.2s;
    &:hover {
      color: $blue-200;
      filter: brightness(0.8);
    }
  }
  h4 {
    font-size: $fs-6;
    font-weight: lighter;
  }
}
.feed-card-footer {
  display: flex;
  align-items: center;
  padding: 0 30px;
  li:last-child {
    margin-left: auto;
  }
  > li {
    margin-left: -1px;
    border-right: 1px solid $white-100;
    border-left: 1px solid $white-100;
  }
}
.feed-card-footer-btn {
  display: flex;
  align-items: center;
  border: none;
  background: $white;
  cursor: pointer;
  padding: 15px 30px;
  transition: background-color 0.2s;
  > img {
    width: 15px;
    margin-right: 5px;
  }
  &:hover {
    background: $white-100;
  }
  &:active {
    background: $white-400;
  }
}
.aside {
  flex-shrink: 0;
  width: 290px;
}
.aside-card {
  @include card;
  overflow: hidden;
  margin-bottom: 20px;
  &:first-of-type {
    padding: 0;
  }
}
.aside-card-header {
  font-size: $fs-6;
  display: flex;
  justify-content: space-between;
  text-transform: uppercase;
  padding-bottom: 20px;
  border-bottom: 1px solid $white-100;
}
.write-article-btn {
  width: 100%;
  color: $white;
  text-transform: uppercase;
  cursor: pointer;
  background: $blue-400;
  border-radius: 4px;
  border: 1px solid $blue-400;
  padding: 10px;
  &:hover {
    filter: brightness(0.9);
  }
  &:active {
    filter: brightness(0.8);
  }
}
.aside-edit-list-btn, .show-all-btn {
  color: $blue-200;
  text-transform: uppercase;
  cursor: pointer;
  border: none;
  font-weight: bold;
  background: transparent;
  &:hover {
    filter: brightness(1.3);
  }
  &:active {
    filter: brightness(0.8);
  }
}
.aside-card-body {
  text-align: center;
  padding: 0 30px 25px;
  > h3 {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    > img {
      margin-left: 5px;
    }
  }
  > h4 {
    font-size: $fs-6;
    font-weight: lighter;
    line-height: 1.3;
  }
}
.aside-card-user-photo {
  margin: auto;
  width: 100px;
  height: 100px;
  border: 5px solid $white;
  border-radius: 50%;
  transform: translateY(-50%);
  margin-bottom: -34px;
}
.groups-list {
  padding: 20px 0 25px;
  margin-bottom: -10px;
}
.group-card {
  margin-bottom: 10px;
  > a {
    display: flex;
    align-items: center;
    color: inherit;
    text-decoration: none;
    font-size: $fs-6;
    line-height: 1.2;
    background: $white;
    border: 1px solid $white-100;
    border-radius: 6px;
    box-shadow: 1px 1px 10px rgba($blue-400, 0.05);
    padding: 15px;
    transition: box-shadow 0.2s;
    > img {
      width: 52px;
      height: 52px;
      margin-right: 15px;
    }
    &:hover {
      box-shadow: 5px 5px 30px rgba($blue-400, 0.15);
    }
    &:active {
      box-shadow: 1px 1px 10px rgba($blue-400, 0.03);
    }
  }
}
.hashtags-list {
  display: flex;
  flex-wrap: wrap;
  margin: 20px -10px -10px 0;
}
.hashtag-item {
  background: $blue-100;
  border-radius: 4px;
  cursor: pointer;
  padding: 7px 12px;
  margin-right: 10px;
  margin-bottom: 10px;
  &:hover {
    filter: brightness(0.9);
  }
  &:active {
    filter: brightness(0.8);
  }
}
.trending-article-list {
  margin-bottom: -15px;
}
.trending-article-card {
  margin: 15px 0;
  > a {
    display: flex;
    cursor: pointer;
    text-decoration: none;
    color: inherit;
    transition: transform 0.2s;
    &:last-child {
      margin-bottom: 0;
    }
    &:hover {
      transform: translateX(3px);
    }
  }
}
.trending-article-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.trending-article-card-img {
  width: 80px;
  height: 52px;
  margin-right: 15px;
}
.trending-article-card-viewers {
  font-size: $fs-6;
  font-weight: lighter;
  margin-top: 5px;
}
</style>

<style lang="scss">
.ql-toolbar.ql-snow {
  border-radius: 8px 8px 0 0;
}
.ql-editor {
  min-height: 100px;
  p {
    font-size: 16px;
  }
}
</style>