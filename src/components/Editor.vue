<script setup>
import { ref, onMounted, defineExpose } from 'vue';

const props = defineProps({
  options: {
    type: Object,
    default: () => ({}),
  },
  theme: {
    type: String,
    default: 'snow',
  }
});
const { options, theme } = props;

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
  <div>
    <div class="editor">
      <div ref="editorEl"></div>
    </div>
    <div class="buttons">
      <button type="button" class="cancel-edit-btn"
        @click="cancelEditAbout">cancel</button>
      <button type="button" class="save-btn"
        @click="updateAbout">save</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styleSheets/variables';

.editor {
  white-space: pre-wrap;
  margin: 20px 0;
}
::v-deep .ql-toolbar.ql-snow + .ql-container.ql-snow {
  border-radius: 5px;
  font-size: $fs-5;
  border-top: 1px solid #ccc;
}
::v-deep .ql-toolbar.ql-snow {
  display: none;
}
::v-deep .ql-editor {
  min-height: 100px;
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
  transition: background-color 0.2s,  color 0.2s;
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