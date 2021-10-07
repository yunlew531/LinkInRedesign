<script setup>
import { ref, watch, computed, defineAsyncComponent } from 'vue';
import { apiCreateProject, apiUpdateProject, apiDeleteProject } from '@/api';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'; 
import store from '@/composition/store';
import dayjs from '@/mixins/dayjs';
import 'simplebar-vue/dist/simplebar-vue.js';
import 'simplebar-vue/dist/simplebar.min.css';

const { updateUserProfile } = store;

const Editor = defineAsyncComponent(() => import('@/components/Editor.vue'));

const props = defineProps({
  projects: {
    type: Array,
    default: () => ([]),
    required: true,
  },
  currentProject: {
    type: Object,
    default: () => ({}),
    required: true,
  },
  currentProjectIdx: {
    type: Number,
    default: 0,
    required: true,
  }
});

const emits = defineEmits(['setCurrentProject', 'setCurrentIdx']);

const isModalShow = ref(false);
const showModal = () => isModalShow.value = true;
const hideModal = () => isModalShow.value = false;

watch(isModalShow, (value) => {
  const { body } = document;
  if (value) {
    body.style.overflow = 'hidden';
  } else {
    body.style.overflow = 'auto';
    isProjectEdit.value = false;
    emits('setCurrentProject', {});
    titleEditorEl.value.setText('');
    contentEditorEl.value.setContents({});
  }
});

const projects = computed(() => props.projects);
const currentProject = computed(() => props.currentProject);
const currentProjectIdx = computed(() => props.currentProjectIdx);
const currentContent = computed(() => {
  const isCurrentProjectExist = Object.keys(currentProject.value).length;
  if (isCurrentProjectExist) {
    const { content } = currentProject.value;
    const converter = new QuillDeltaToHtmlConverter(content.ops);
    return converter.convert();
  } else return '';
});

const handleCurrentProject = (num) => {
  if (isProjectEdit.value) return alert('edit now');
  let idx = currentProjectIdx.value + num;
  if (idx < 0) idx = 0;
  else if (idx >= projects.value.length) idx = projects.value.length - 1;
  emits('setCurrentIdx', idx);
};

const titleEditorEl = ref(null);
const contentEditorEl = ref(null);
const isProjectEdit = ref(false);
// status: update | create
const modalStatus = ref('update');
const isShowDeleteBtn = computed(() => modalStatus.value === 'update' ? true : false);
const editProject = () => {
  modalStatus.value = 'update';
  const { title, content } = currentProject.value;
  titleEditorEl.value.setText(title);
  contentEditorEl.value.setContents(content);
  isProjectEdit.value = true;
};
const createProject = () => {
  isProjectEdit.value = true;
  modalStatus.value = 'create';
  showModal();
};

const setModalStatus = (status) => modalStatus.value = status;

const method = computed(() => modalStatus.value === 'update' ? apiUpdateProject : apiCreateProject);
const postProject = async () => {
  const project = {
    title: titleEditorEl.value.getText(),
    content: contentEditorEl.value.getContents(),
  };
  const { id } = currentProject.value;

  try {
    const { data } = await method.value(project, id);
    const { projects, project_id } = data;
    updateUserProfile({ projects });
    const filterProject = projects.filter((project) => project.id === project_id)[0];
    emits('setCurrentProject', filterProject);
    isProjectEdit.value = false;
  } catch (err) {
    alert(err.response.data.message);
  }
};

const deleteProject = async () => {
  const { id } = currentProject.value;

  try{
    const { data } = await apiDeleteProject(id);
    const { projects: resProjects } = data;
    updateUserProfile({ projects: resProjects });
    hideModal();
  } catch (err) {
    alert(err.response.data.message);
  }
};

const cancelEditProject = () => {
  if (modalStatus.value === 'update') isProjectEdit.value = false;
  else if (modalStatus.value === 'create') hideModal();
};

const createTime = computed(() => {
  const { create_time } = currentProject.value;
  return create_time ? dayjs(create_time * 1000).format('YYYY/MM/DD') : '';
});
const updateTime = computed(() => {
  const { update_time } = currentProject.value;
  return update_time ? dayjs(update_time * 1000).format('YYYY/MM/DD') : '';
});

const contentEditorOptions = ref({
  modules: {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['image', 'code-block'],
    ],
  },
});

// const contentEditorOptions = ref({
//   modules: {
//     toolbar: {
//       container: [['image']],
//       handlers: {
//         image: imageHandler
//       },
//     }
//   },
// });

defineExpose({
  currentProjectIdx,
  isProjectEdit,
  showModal,
  hideModal,
  createProject,
  setModalStatus,
});
</script>

<template>
  <div class="project-modal-container" :class="{ show: isModalShow }"
    @click.self="hideModal">
    <button class="close-modal-btn" @click="hideModal">
      <span class="material-icons close-modal-btn-icon">close</span>
    </button>
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
          <h4 class="subtitle">{{ currentProject.name }}</h4>
        </div>
        <div v-if="currentProject.create_time" class="time-groups">
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
          :options="contentEditorOptions" :deleteBtn="isShowDeleteBtn"
          @cancel="cancelEditProject" @update="postProject" @delete="deleteProject" />
        <div v-show="!isProjectEdit" class="project-content" v-html="currentContent"></div>
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
@import '@/assets/styleSheets/mixins';

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
  transition: opacity 0.2s, visibility 0.2s;
  &.show {
    opacity: 1;
    visibility: visible;
  }
}
.close-modal-btn {
  cursor: pointer;
  background: transparent;
  border: none;
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
  > .close-modal-btn-icon {
      color: $white;
      transition: color 0.2s, filter 0.2s;
    }
  &:hover {
    > .close-modal-btn-icon {
      color: $blue-200;
    }
  }
  &:active {
    > .close-modal-btn-icon {
      filter:  brightness(0.8);
    }
  }
}
.project-modal {
  width: 800px;
  background: $white-100;
  z-index: 999;
}
.project-header {
  height: 80px;
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
  @include button;
  align-self: end;
  color: $white;
  background: $blue-200;
  margin-bottom: 20px;
  &:hover {
    background: $white;
    color: $blue-200;
  }
}
.project-content {
  white-space: pre-wrap;
  line-height: 1.5;
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