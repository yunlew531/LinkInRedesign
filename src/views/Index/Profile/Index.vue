<script setup>
import { ref, inject, computed } from 'vue';
import { apiUpdateAbout } from '@/api';
import dayjs from '@/mixins/dayjs';
import store from '@/composition/store';
import getImageUrl from '@/mixins/getImageUrl.js';
import Editor from '@/components/Editor.vue';
import ProjectModal from '@/components/Index/ProjectModal.vue';

const { updateUserProfile } = store;

const state = inject('state');
const user = computed(() => state.value.user);

// const projects = ref([
//   {
//     title: 'Zara redesign concept',
//     subtitle: 'UX/UI design, 15.07.2019',
//     fileName: 'Projects-1',
//     content: 'lorem lorem lorem',
//   },
//   {
//     title: 'SCTHON event brand identity',
//     subtitle: 'Graphic design, 03.31.2019',
//     fileName: 'Projects-2',
//     update_time: 1632871052060,
//     create_time: 1632611847362,
//   },
//   {
//     title: 'Drozd. Brand identity. 2016',
//     subtitle: 'Graphic design, 03.04.2016',
//     fileName: 'Projects-3',
//   },
// ]);

const skillsList = ref([
  {
    title: 'User experience (UX)',
    users: [
      { fileName: 'user-experience-1' },
      { fileName: 'user-experience-2' },
      { fileName: 'user-experience-3' },
      { fileName: 'user-experience-4' },
      { fileName: 'user-experience-5' },
      { fileName: 'user-experience-6' },
    ],
  },
  {
    title: 'User interface (UI)',
    users: [
      { fileName: 'user-interface-1' },
      { fileName: 'user-interface-2' },
      { fileName: 'user-interface-3' },
      { fileName: 'user-interface-4' },
      { fileName: 'user-interface-5' },
      { fileName: 'user-interface-6' },
      { fileName: 'user-interface-7' },
    ],
  },
  {
    title: 'Brand identity',
    users: [
      { fileName: 'user-identity-1' },
      { fileName: 'user-identity-2' },
      { fileName: 'user-identity-3' },
      { fileName: 'user-identity-4' },
      { fileName: 'user-identity-5' },
    ],
  },
]);

const experienceList = ref([
  {
    title: 'Freelance UX/UI designer',
    mode: 'Self Employed',
    place: 'Around the world',
    time: 'Jun 2016 — Present',
    experienceTime: '3 yrs 3 mos',
    content: 'Work with clients and web studios as freelancer. Work in next areas: eCommerce web projects; creative landing pages; iOs and Android apps; corporate web sites and corporate identity sometimes.',
    fileName: 'Group',
  },
   {
    title: 'UX/UI designer',
    mode: 'Upwork',
    place: 'International',
    time: 'Jun 2019 — Present',
    experienceTime: '3 mos',
    content: 'New experience with Upwork system. Work in next areas: UX/UI design, graphic design, interaction design, UX research.',
    fileName: 'Rectangle 2.2-1',
  },
])

const editorOptions = ref({ placeholder: 'input about' });

const filterFivePerson = (users) => users.filter((user, key) => key < 5);

const editorEl = ref(null);
const isEditAbout = ref(false);
const editAbout = () => {
  const about = user.value.about;
  editorEl.value.setText(about);
  isEditAbout.value = true;
};

const updateAbout = async () => {
  const about = editorEl.value.getText();
  try {
    const { data } = await apiUpdateAbout(about);
    const { about: newAbout } = data;
    updateUserProfile({ about: newAbout });
  } catch (error) {
    alert(error.response.data.message);
  }
  isEditAbout.value = false;
};

const cancelEdit = () => isEditAbout.value = false;

const currentProject = ref({});
const currentProjectIdx = ref(0);
const projectModalEl = ref(null);
const showProjectModal = (project, key) => {
  currentProject.value = project;
  currentProjectIdx.value = key;
  projectModalEl.value.setModalStatus('update');
  projectModalEl.value.showModal();
};
const setCurrentProject = (project) => currentProject.value = project;
const setCurrentIdx = (idx) => {
  currentProjectIdx.value = idx;
  currentProject.value = user.value.projects[idx];
};
const createProject = () => projectModalEl.value.createProject();

const handleProjectImg = (project) => {
  const hasImage = project.content.ops.filter((op) => op.insert.image)[0];
  return hasImage ? hasImage.insert.image : getImageUrl('image');
};
</script>

<template>
  <section class="profile-card">
    <ProjectModal ref="projectModalEl" :projects="user.projects"
      :currentProject="currentProject" :currentProjectIdx="currentProjectIdx"
      @setCurrentProject="setCurrentProject" @setCurrentIdx="setCurrentIdx" />
    <h2 class="card-title">About</h2>
    <Editor v-show="isEditAbout" ref="editorEl" :options="editorOptions"
      @update="updateAbout" @cancel="cancelEdit" />
    <p v-show="!isEditAbout" class="card-paragraph" @dblclick="editAbout">
      {{ user.about || 'empty about. double click to add about.' }}</p>
    <button type="button" class="more-btn">see more</button>
  </section>
  <section class="profile-card">
    <div class="projects-header">
      <h2 class="projects-title card-title">Projects</h2>
      <span class="projects-subtitle">3 of 12</span>
      <button type="button" class="projects-create-btn" @click="createProject">Create</button>
    </div>
    <ul class="project-list">
      <li v-for="(project, key) in user.projects" :key="project.id" class="project-card"
        @click="showProjectModal(project, key)">
        <router-link to="/">
          <img :src="handleProjectImg(project)" :alt="project.title" class="project-img">
          <h3 class="project-card-title">{{ project.title }}</h3>
          <span class="project-card-subtitle">
            {{ dayjs(project.create_time * 1000).format('YYYY/MM/DD') }}
          </span>
        </router-link>
      </li>
    </ul>
    <button type="button" class="more-btn">show all (12)</button>
  </section>
  <section class="profile-card">
    <h2 class="card-title">Skills & Endoresments</h2>
    <ul class="skills-list">
      <li v-for="skill in skillsList" :key="skill.title" class="skill-card">
        <span class="skill-user-num">{{ skill.users.length }}</span>
        <h3 class="skill-card-title">User experience (UX)</h3>
        <ul class="users-photo-list">
          <li v-for="user in filterFivePerson(skill.users)" :key="user.fileName">
            <router-link to="/">
              <img class="skill-user-img" :src="getImageUrl(user.fileName)" alt="user">
            </router-link>
          </li>
          <li v-if="skill.users.length - 5 > 0" class="user-num-btn">
            <button type="button">+{{ skill.users.length - 5 }}</button>
          </li>
        </ul>
      </li>
    </ul>
  </section>
  <section class="profile-card">
    <h2 class="card-title">Experience</h2>
    <ul>
      <li v-for="experience in experienceList" :key="experience.title" class="experience-card">
        <img class="experience-card-img" :src="getImageUrl(experience.fileName)" alt="experience.title">
        <div class="experience-card-body">
          <h3 class="experience-card-title">{{ experience.title }}</h3>
          <h4>{{ experience.mode }}</h4><span>{{ experience.place }}</span>
          <p>
            <span>{{ experience.time }}</span>
            <span  class="experience-card-experience-time">{{ experience.experienceTime }}</span>
          </p>
          <p class="experience-card-paragraph">{{ experience.content }}</p>
        </div>
      </li>
    </ul>
  </section>
  <section class="profile-card">
    <h2 class="card-title">Education</h2>
    <div class="education-container">
      <img class="education-img" src="@/assets/images/education.png" alt="Moscow State Linguistic University">
      <div>
        <h3 class="education-title">Moscow State Linguistic University</h3>
        <p class="education-paragraph">Bachelor's degree Field Of StudyComputer and Information Systems Security/Information Assurance</p>
        <p class="education-time">2013 — 2017</p>
        <p>Additional English classes and UX profile courses​.</p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/styleSheets/variables';
@import '@/assets/styleSheets/mixins';

.profile-card {
  padding: 30px;
  background: #FFFFFF;
  box-shadow: 0px 20px 60px #f1f4f880;
  border-radius: 4px;
  margin-bottom: 20px;
}
.projects-header {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
}
.card-title {
  text-transform: uppercase;
  font-size: $fs-4;
  font-weight: bold;
  margin: 0 10px 25px 0;
}
.projects-title {
  display: inline-block;
  margin: 0;
}
.projects-subtitle {
  color: $gray-100;
  margin-left: 10px;
}
.projects-create-btn {
  @include button;
  background: $blue-200;
  color: $white;
  margin-left: auto;
  &:hover {
    color: $blue-200;
    background: $white;
  }
}
.card-paragraph {
  white-space: pre-wrap;
  line-height: 1.5;
  margin-bottom: 20px;
  &:hover {
    backdrop-filter: brightness(0.95);
  }
}
.more-btn {
  display: block;
  text-transform: uppercase;
  background: transparent;
  border: none;
  color: $blue-200;
  cursor: pointer;
  font-weight: bold;
  padding: 0;
  filter: brightness(1);
  transform: translateX(0);
  transition: filter 0.2s, transform 0.2s;
  &:hover{
    filter: brightness(1.3);
    transform: translateX(10px);
  }
}
.project-card-title {
  margin-bottom: 5px;
}
.project-card-subtitle {
  font-size: $fs-7;
  color: $gray-100;
}
.project-list {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -2% 25px 0;
}
.project-card {
  width: 31.333333%;
  margin-right: 2%;
  transition: transform 0.2s, color 0.2s;
  > a {
    display: block;
    color: inherit;
    text-decoration: none;
  }
  &:hover {
    transform: translateY(-5px);
    color: $blue-400;
  }
}
.project-img {
  width: 100%;
  height: 200px;
  border-radius: 10px;
  margin-bottom: 15px;
}
.skills-list {
  display: flex;
  flex-wrap: wrap;
  margin-right: -2%;
}
.skill-card {
  width: 31.333333%;
  margin-right: 2%;
  border: 1px solid $white-100;
  border-radius: 6px;
  padding: 15px 20px;
  position: relative;
  transition: color 0.2s, box-shadow 0.2s;
  &:hover {
    color: $blue-300;
    box-shadow: 1px 1px 30px rgba($blue-300, 0.1);
  }
}
.skill-card-title {
  margin-bottom: 10px;
}
.skill-user-img {
  width: 24px;
  height: 24px;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-3px);
  }
}
.skill-user-num {
  display: block;
  position: absolute;
  top: 15px;
  right: 20px;
  font-weight: bold;
  color: $blue-200;
}
.users-photo-list {
  display: flex;
}
@for $i from 1 through 36 { 
  .users-photo-list li:nth-of-type(#{$i}) {
    transform: translateX(-8px * $i + 8px);
    z-index: calc(1 * $i);
  }
}
.users-photo-list .user-num-btn {
  width: 24px;
  height: 24px;
  border-radius: 100%;
  background: $blue-200;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: $fs-6;
  transition: filter 0.2s;
  &:hover {
    filter: brightness(1.2);
  }
  > button {
    border: none;
    background: transparent;
    color: $white;
    cursor: pointer;
  }
}
.experience-card {
  display: flex;
  border-bottom: 1px solid $white-100;
  padding: 25px 0;
  &:first-child {
    padding-top: 0;
  }
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
}
.experience-card-img {
  width: 54px;
  height: 54px;
  margin-right: 15px;
}
.experience-card-body {
  > h4, span {
    font-size: $fs-6;
    color: rgba($dark-100, 0.7)
  }
  > h4 {
    display: inline-block;
    margin-right: 10px;
  }
  > p {
    margin-top: 10px;
  }
  .experience-card-experience-time {
    margin-left: 10px;
    color: $blue-200;
    font-weight: bold;
  }
}
.experience-card-title {
  margin-bottom: 15px;
}
.experience-card-paragraph {
  line-height: 1.5;
}
.education-img {
  width: 54px;
  height: 54px;
  margin-right: 15px;
}
.education-container {
  display: flex;
}
.education-title, .education-time, .education-paragraph {
  margin-bottom: 15px;
}
.education-paragraph {
  line-height: 1.5;
}
.education-time {
  font-size: $fs-6;
  color: rgba($dark-100, 0.7)
}
</style>