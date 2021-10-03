import { ref, readonly } from 'vue';
import { apiGetProfile } from '@/api';

const state = ref({
  isLogin: false,
  user: {},
  isOffcanvasShow: false,
});

const getProfile = async () => {
  try {
    const { data } = await apiGetProfile();
    state.value.user = data.user;
  } catch(err) {}
};

const setOffcanvasDisplay = (boolean = true) => state.value.isOffcanvasShow = boolean;
const setLogin = (boolean = true) => state.value.isLogin = boolean;
const setUser = (payload) => state.value.user = payload;
const updateUserProfile = (options) => {
  const optionsKeys = Object.keys(options);
  const optionsValues = Object.values(options);
  optionsKeys.forEach((key, idx) => state.value.user[key] = optionsValues[idx]);
};

export default {
  state: readonly(state),
  getProfile,
  setOffcanvasDisplay,
  setLogin,
  setUser,
  updateUserProfile,
};