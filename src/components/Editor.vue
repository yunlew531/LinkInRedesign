<script setup>
import { ref, onMounted, computed } from 'vue';

const props = defineProps({
  options: {
    type: Object,
    default: () => ({}),
  },
  theme: {
    type: String,
    default: 'snow',
  },
  height: {
    type: String,
    default: '100px',
  },
  toolbar: {
    type: Boolean,
    default: false,
  },
  marginY: {
    type: String,
    default: '0px',
  }
});
const { options, theme, height, toolbar, marginY } = props;

const editorEl = ref(null);
let quill = null;
onMounted(() => {
  quill = new Quill(editorEl.value, {
    theme,
    ...options,
  });
});

const emits = defineEmits(['cancel', 'update']);

const cancelEditAbout = () => emits('cancel');
const updateAbout = () => emits('update');

const getText = () => quill.getText().trim();
const setText = (text = '') => quill.setText(text);

defineExpose({
  getText,
  setText,
});
</script>

<template>
  <div class="editor-container">
    <div class="editor" :class="{ 'toolbar-show' : toolbar }">
      <div ref="editorEl"></div>
    </div>
    <slot name="buttons">
      <div class="buttons">
        <button type="button" class="cancel-edit-btn"
          @click="cancelEditAbout">cancel</button>
        <button type="button" class="save-btn"
          @click="updateAbout">save</button>
      </div>
    </slot>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styleSheets/variables';

.editor {
  white-space: pre-wrap;
  margin: v-bind(marginY) 0;
  &.toolbar-show {
    ::v-deep(.ql-toolbar.ql-snow) {
      display: block;
    }
    ::v-deep(.ql-toolbar.ql-snow + .ql-container.ql-snow) {
      border-radius: 0 0 5px 5px;
      border-top: none;
    }
    ::v-deep(.ql-toolbar.ql-snow) {
      border-radius: 5px 5px 0 0;
    }
  }
}
::v-deep(.ql-toolbar.ql-snow + .ql-container.ql-snow) {
  border-radius: 5px;
  font-size: $fs-5;
  border-top: 1px solid #ccc;
}
::v-deep(.ql-toolbar.ql-snow) {
  display: none;
}
::v-deep(.ql-editor) {
  min-height: v-bind(height);
  flex-grow: 1;
}
.buttons {
  text-align: end;
  margin-top: 20px;
}
.save-btn, .cancel-edit-btn {
  width: 170px;
  text-transform: uppercase;
  padding: 10px 0;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}
.save-btn {
  background: $blue-200;
  color: $white;
  border: none;
  margin: 0 0 0 15px;
  &:hover {
    background: $white;
    color: $blue-200;
    border: 1px solid $blue-200;
  }
}
.cancel-edit-btn {
  background: $white;
  border: 1px solid $blue-200;
  color: $blue-200;
   &:hover {
    background: $blue-200;
    color: $white;
  }
}
</style>