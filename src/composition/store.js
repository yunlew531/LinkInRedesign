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
const setUserPhoto = (url) => state.value.user.photo = url;
const setUserBackgroundImg = (url) => state.value.user.background_cover = url;
const setUser = (payload) => state.value.user = payload;
const setDescription = (description) => state.value.user.description = description;
const setUserAbout = (about) => state.value.user.about = about;

export default {
  state: readonly(state),
  getProfile,
  setOffcanvasDisplay,
  setLogin,
  setUserPhoto,
  setUserBackgroundImg,
  setUser,
  setDescription,
  setUserAbout,
};