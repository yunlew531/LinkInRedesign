import { ref, readonly } from 'vue';

const state = ref({
  uid: '',
  isLogin: false,
  isOffcanvasShow: false,
});

const setOffcanvasDisplay = (boolean = true) => state.value.isOffcanvasShow = boolean;
const setLogin = (boolean = true) => state.value.isLogin = boolean;
const setUid = (uid) => state.value.uid = uid;

export default {
  state: readonly(state),
  setOffcanvasDisplay,
  setLogin,
  setUid,
};