import { ref, readonly } from 'vue';

const state = ref({
  isLogin: false,
  isOffcanvasShow: false,
});

const setOffcanvasDisplay = (boolean = true) => state.value.isOffcanvasShow = boolean;
const setLogin = (boolean = true) => state.value.isLogin = boolean;

export default {
  state: readonly(state),
  setOffcanvasDisplay,
  setLogin,
};