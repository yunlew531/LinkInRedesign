<script setup>
import { ref } from 'vue';
import getImageUrl from '@/mixins/getImageUrl';
import dayjs from '@/mixins/dayjs';
import AsideCard from '@/components/Index/AsideCard.vue';

const jobs = ref([
  {
    title: 'UX/UI designer',
    content: 'On Upwork you\'ll find a range of top freelancers and agencies, from developers and development agencies to designers and creative agencies, copywriters,',
    company: 'Upwork',
    note: 'Remote only',
    img: 'Rectangle 2.2-1',
  },
  {
    title: 'Product designer',
    content: 'Founded in 2004, Facebook\'s mission is to give people the power to build community and bring the world closer together. People use our products to stay..',
    company: 'Facebook',
    note: 'CA, USA',
    img: 'Rectangle 2.2',
  },
]);

const searches = ref([
  {
    title: 'UX/UI designer',
    time: 1632519574,
    id: 'f3Mt7DVcY69Ko2i1t0xG',
  },
  {
    title: 'Web designer',
    time: 1632319574,
    id: 'e3QmXrAN0hV0N1k281pH',
  },
  {
    title: 'Graphic designer',
    time: 1631510574,
    id: 'LjudMU1C7i9z4h0n6VS8',
  },
]);

const deleteSearchHistory = (id) => {
  console.log('delete:',id);
}

const editSearchHistory = ref(false);
const editSearches = () => editSearchHistory.value = !editSearchHistory.value;

const searchTheHistory = (id) => {
  console.log('search:', id);
};
</script>

<template>
  <div class="job-container">
    <main class="jobs-main">
      <section class="search-panel">
        <div class="search-panel-header">
          <h4>Your dream job is here</h4>
        </div>
        <div class="search-panel-body">
          <input type="text" placeholder="Search Jobs" class="search-input">
          <button type="button" class="search-btn">
            <img src="@/assets/images/search-white.png" alt="search" class="search-btn-img">
          </button>
        </div>
      </section>
      <div class="divide">
        <h4>jobs for you</h4>
      </div>
      <ul class="job-cards-list">
        <li v-for="job in jobs" :key="job.id" class="job-card">
          <img :src="getImageUrl(job.img)" alt="Rectangle" class="job-card-img">
          <div class="job-card-content">
            <h2>{{ job.title }}</h2>
            <div class="job-card-content-container">
              <h3>{{ job.company }}</h3>
              <span>{{ job.note }}</span>
            </div>
            <p>
              {{ job.content }}
            </p>
          </div>
          <button type="button" class="job-card-more-btn">more</button>
        </li>
      </ul>
      <div class="divide">
        <h4>New jobs</h4>
      </div>
      <ul>
        <li v-for="job in jobs" :key="job.id" class="job-card">
          <img :src="getImageUrl(job.img)" alt="Rectangle" class="job-card-img">
          <div class="job-card-content">
            <h2>{{ job.title }}</h2>
            <div class="job-card-content-container">
              <h3>{{ job.company }}</h3>
              <span>{{ job.note }}</span>
            </div>
            <p>
              {{ job.content }}
            </p>
          </div>
          <button type="button" class="job-card-more-btn">more</button>
        </li>
      </ul>
    </main>
    <aside class="aside">
      <ul>
        <li class="aside-card post-job-card">
          <button type="button" class="post-job-btn">Post a job</button>
        </li>
        <li>
          <AsideCard title="my searches">
            <template v-slot:head-link>
              <button v-show="!editSearchHistory" type="button" class="edit-search-btn"
                @click="editSearches">edit search</button>
              <button v-show="editSearchHistory" type="button" class="edit-search-btn"
                @click="editSearches">cancel</button>
            </template>
            <template v-slot:card-body>
              <ul class="search-card-list">
                <li v-for="search in searches" :key="search.time" class="search-card"
                  :class="{ active: editSearchHistory }" @click="searchTheHistory(search.id)">
                  <button class="remove-history-btn" @click.stop="deleteSearchHistory(search.id)">
                    delete</button>
                  <h3>{{ search.title }}</h3>
                  <span v-if="dayjs(search.time * 1000).isToday()">
                    {{ dayjs(search.time * 1000).fromNow() }}
                  </span>
                  <span v-else>{{ dayjs(search.time * 1000).format('YYYY/MM/DD') }}</span>
                </li>
              </ul>
            </template>
          </AsideCard>
          <AsideCard title="Tracked jobs">
            <template v-slot:card-body>
              <ul class="tracked-jobs-list">
                <li class="tracked-job">
                  <router-link to="/" class="tracked-job-link">
                    <img :src="getImageUrl('Rectangle 2.2-1')" alt="UX/UI Designer"
                      class="tracked-job-img">
                    <div class="tracked-job-content">
                      <h3>UX/UI Designer</h3>
                      <span>Upwork</span>
                    </div>
                    </router-link>
                </li>
              </ul>
            </template>
          </AsideCard>
          <AsideCard title="Articles for you">
            <template v-slot:card-body>
              <ul class="articles-list">
                <li class="article">
                  <router-link to="/" class="article-link">
                    <img src="@/assets/images/Photo-1.png" alt="The guide. Apply for a job"
                      class="article-img">
                    <div class="article-content">
                      <h3>The guide. Apply for a job</h3>
                      <span>12,932 viewers</span>
                    </div>
                  </router-link>
                </li>
              </ul>
            </template>
          </AsideCard>
        </li>
      </ul>
    </aside>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styleSheets/variables';
@import '@/assets/styleSheets/mixins';

@mixin job-card {
  padding: 25px 30px;
  border-radius: 4px;
  box-shadow: 0px 20px 60px $gray-200;
  background: $white;
}

.jobs-main {
  flex-grow: 1;
  margin-right: 40px;
}
.job-container {
  display: flex;
}
.search-panel {
  @include job-card;
}
.search-panel-header {
  font-size: $fs-6;
  text-transform: uppercase;
  padding-bottom: 20px;
  border-bottom: 1px solid $white-100;
}
.search-panel-body {
  display: flex;
  align-items: center;
  margin-top: 30px;
}
.search-input {
  flex-grow: 1;
  font-size: $fs-4;
  margin-right: 100px;
  padding: 5px 10px;
  border: none;
  &::placeholder {
  color: $gray-100;
  opacity: 0.7;
  }
}
.search-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  background: $blue-400;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    filter: brightness(1.1);
  }
  &:active {
    filter: brightness(0.9);
  }
}
.search-btn-img {
  width: 16px;
  height: 16px;
}
.aside-card {
  background: $white;
  border-radius: 4px;
  margin-bottom: 20px;
}
.divide {
  border-bottom: 1px solid $gray-300;
  position: relative;
  margin: 45px 0;
  > h4 {
    text-transform: uppercase;
    background: $white-200;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    padding: 0 50px;
  }
}
.post-job-card {
  @include job-card;
}
.post-job-btn {
  @include button;
  width: 100%;
  color: $white;
  background: $blue-200;
  &:hover {
    color: $blue-200;
    background: $white;
  }
  &:active {
    filter: brightness(0.95);
  }
}
.job-card {
  @include job-card;
  display: flex;
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
}
.job-card-img {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  margin-right: 16px;
}
.job-card-content {
  flex-grow: 1;
  padding-right: 200px;
  > h2 {
    font-size: $fs-5;
    margin-bottom: 5px;
  }
  .job-card-content-container {
    display: flex;
    align-items: center;
    font-size: $fs-6;
    margin-bottom: 10px;
    > h3 {
      margin-right: 10px;
    }
  }
  > p {
    letter-spacing: 0.025rem;
    line-height: 1.5;
    font-size: $fs-6;
  }
}
.job-card-more-btn {
  align-self: center;
  @include button;
  width: inherit;
  color: $white;
  background: $blue-200;
  padding: 10px 25px;
  &:hover {
    background: $white;
    color: $blue-200;
  }
  &:active {
    filter: brightness(0.95);
  }
}
.aside {
  flex-shrink: 0;
  width: 290px;
}
.search-card-list {
  margin-top: 20px;
}
.search-card {
  background: $blue-100;
  border-radius: 4px;
  box-shadow: 5px 5px 30px rgba($dark-100, 0.05);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  padding: 10px 12px;
  margin-bottom: 10px;
  > h3 {
    margin-bottom: 5px;
  }
  > span {
    color: $gray-100;
    font-size: $fs-6;
    font-weight: lighter;
  }
  &:hover {
    box-shadow: 1px 1px 20px rgba($dark-100, 0.03);
    transform: rotate3d(1, 1, 1, 2deg);
  }
  &:active {
    box-shadow: 1px 1px 20px rgba($dark-100, 0.03);
    transform: rotate3d(1, 1, 1, 1deg);
  }
  > .remove-history-btn {
    background: rgb(255, 0, 64);
    text-transform: uppercase;
    font-weight: bold;
    border: none;
    color: $white;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    cursor: pointer;
    border-radius: 4px 0 0 4px;
    padding: 0 10px;
    transform: translateX(110%);
    transition: transform 0.3s;
  }
  &.active {
    .remove-history-btn {
      transform: translateX(0);
    }
  }
}
.edit-search-btn {
  text-transform: uppercase;
  background: transparent;
  color: $blue-200;
  border: none;
  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    transform: translateX(5px);
  }
  &:active {
    filter: brightness(0.5);
  }
}
.tracked-jobs-list {
  margin: 20px 0 -10px;
}
.tracked-job {
  margin-bottom: 10px;
}
.tracked-job-link {
  display: flex;
  border-radius: 6px;
  border: 1px solid $white-100;
  box-shadow: 3px 3px 30px rgba($dark-100, 0.05);
  padding: 15px;
  transition: color 0.2s, box-shadow 0.1s;
  &:hover {
    color: $blue-200;
    box-shadow: 3px 3px 30px rgba($dark-100, 0.02);
  }
}
.tracked-job-img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 10px;
}
.tracked-job-content {
  > h3 {
    font-weight: bold;
    font-size: $fs-6;
    margin-bottom: 5px;
  }
  > span {
    font-weight: lighter;
    font-size: $fs-7;
    color: rgba($dark-100, 0.8);
  }
}
.articles-list {
  margin: 20px 0 -20px;
}
.article {
  margin-bottom: 20px;
}
.article-link {
  display: flex;
  transition: color 0.2s, transform 0.2s;
  &:hover {
    color: $blue-200;
    transform: translateX(3px);
  }
}
.article-img {
  width: 80px;
  height: 52px;
  margin-right: 15px;
}
.article-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > h3 {
    font-weight: bold;
    font-size: $fs-6;
    margin-bottom: 5px;
  }
  > span {
    font-weight: lighter;
    font-size: $fs-7;
    color: rgba($dark-100, 0.8);
  }
}
</style>