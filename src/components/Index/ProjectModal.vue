<script setup>
import { ref, watch, computed } from 'vue';
import Editor from '@/components/Editor.vue'
import dayjs from '@/mixins/dayjs';
import 'simplebar-vue/dist/simplebar.min.css';
import 'simplebar-vue/dist/simplebar-vue.js';

const props = defineProps({
  projects: {
    type: Object,
    default: () => ({}),
    required: true,
  },
});

const isModalShow = ref(false);

watch(isModalShow, (value) => {
  const { body } = document;

  if(value) body.style.overflow = 'hidden';
  else body.style.overflow = 'auto';
});

const showModal = () => isModalShow.value = true;
const hideModal = () => {
  isProjectEdit.value = false;
  isModalShow.value = false;
};

const projects = computed(() => props.projects);
const currentProjectIdx = ref(0);
const currentProject = computed(() =>
  isModalShow.value ? projects.value[currentProjectIdx.value] : {});

const handleCurrentProject = (num) => {
  if (isProjectEdit.value) return alert('edit now');
  let idx = currentProjectIdx.value + num;
  if (idx < 0) idx = 0;
  else if (idx >= projects.value.length) idx = projects.value.length - 1;
  currentProjectIdx.value = idx;
};

const titleEditorEl = ref(null);
const contentEditorEl = ref(null);
const isProjectEdit = ref(false);
const editProject = () => {
  const { title, content } = currentProject.value;
  titleEditorEl.value.setText(title);
  contentEditorEl.value.setText(content);
  isProjectEdit.value = true;
};

const cancelEditProject = () => isProjectEdit.value = false;

const createTime = computed(() => {
  const { create_time } = currentProject.value;
  return create_time ? dayjs(create_time).format('YYYY/MM/DD') : '';
});
const updateTime = computed(() => {
  const { update_time } = currentProject.value;
  return update_time ? dayjs(update_time).format('YYYY/MM/DD') : '';
});


defineExpose({
  currentProjectIdx,
  showModal,
  hideModal,
});
</script>

<template>
  <div class="project-modal-container" :class="{ show: isModalShow }"
    @click.self="hideModal">
    <button type="button" class="left-arrow" :disabled="currentProjectIdx === 0"
      @click="handleCurrentProject(-1)">
      <span class="material-icons">arrow_back_ios</span>
    </button>
    <div data-simplebar class="project-modal">
      <div class="project-header">
        <Editor v-show="isProjectEdit" ref="titleEditorEl" height="40px"
          :options="{ placeholder: 'input title' }">
          <template v-slot:buttons><div></div></template>
        </Editor>
        <div v-show="!isProjectEdit">
          <h3 class="title">{{ currentProject.title }}</h3>
          <h4 class="subtitle">{{ currentProject.subtitle }}</h4>
        </div>
        <div class="time-groups">
          <span class="create-time">
            <span>Created time</span>
            <span>{{ createTime }}</span>
          </span>
          <span v-if="currentProject.update_time" class="update-time">
            <span>Last edited time</span>
            <span>{{ updateTime }}</span>
          </span>
        </div>
      </div>
      <div class="project-body">
        <button v-show="!isProjectEdit" type="button" class="edit-project-btn"
          @click="editProject">edit</button>
        <Editor v-show="isProjectEdit" ref="contentEditorEl" :toolbar="true" height="100%"
          @cancel="cancelEditProject" />
        <div v-show="!isProjectEdit">{{ currentProject.content }}</div>
      </div>
    </div>
    <button type="button" class="right-arrow" :disabled="currentProjectIdx === projects.length - 1"
      @click="handleCurrentProject(1)">
      <span class="material-icons">arrow_forward_ios</span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styleSheets/variables';

::v-deep(.simplebar-content) {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
::v-deep(.editor-container), ::v-deep(.editor.toolbar-show),
::v-deep(.ql-container.ql-snow) {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
::v-deep(.ql-editor.ql-blank) {
  flex-grow: 1;
}
.project-modal-container {
  opacity: 0;
  visibility: hidden;
  width: 100%;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 999;
  background: rgba($dark-100, 0.5);
  display: flex;
  justify-content: center;
  align-items: stretch;
  transition: opacity 0.2s;
  &.show {
    opacity: 1;
    visibility: visible;
  }
}
.project-modal {
  width: 800px;
  background: $white-100;
  z-index: 999;
}
.project-header {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  border-bottom: 1px solid rgba($gray-100, 0.3);
  padding: 20px 50px;
}
.title {
  font-size: $fs-4;
  margin-bottom: 5px;
}
.subtitle {
  font-size: $fs-6;
  color: $gray-100;
  font-weight: normal;
}
.time-groups{
  margin-left: 30px;
  width: 190px;
}
.create-time, .update-time {
  display: flex;
  color: $gray-100;
  font-size: $fs-6;
  margin-top: 5px;
  :first-child {
    margin-right: auto;
  }
}
.edit-project-btn {
  width: 170px;
  align-self: end;
  color: $white;
  text-transform: uppercase;
  display: block;
  cursor: pointer;
  border: 1px solid $blue-200;
  background: $blue-200;
  border-radius: 5px;
  letter-spacing: 0.03rem;
  margin-bottom: 20px;
  padding: 10px;
  transition: background-color 0.2s, color 0.2s;
  &:hover {
    background: $white;
    color: $blue-200;
    border: 1px solid $blue-200;
  }
}
.left-arrow, .right-arrow {
  align-self: center;
  color: $white-100;
  cursor: pointer;
  padding: 20px;
  transition: filter 0.2s;
  background: transparent;
  border: none;
  > span {
    font-size: $fs-2;
    font-weight: bold;
  }
  &:hover {
    filter: brightness(0.8);
  }
  &:disabled {
    filter: brightness(0.3);
  }
}
.project-body {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 20px 50px;
}
</style>