import { ref, readonly } from 'vue';

const state = ref({
  isOffcanvasShow: false,
});

const setOffcanvasShow = (boolean = true) => state.value.isOffcanvasShow = boolean;

export default {
  state: readonly(state),
  setOffcanvasShow,
};