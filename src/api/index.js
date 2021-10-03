// normal
import { getUser } from './Index/user_profile';

// auth
import { register, signIn, logout, checkLogin } from './Index/login';
import { getProfile, uploadPhoto, uploadBackgroundImg, updateDescription, updateAbout,
  getPhoto } from './Index/profile';

// normal
export const apiGetUser = getUser;

// auth
export const apiRegister = register;
export const apiSignIn = signIn;
export const apiLogout = logout;
export const apiCheckLogin = checkLogin;
export const apiGetProfile = getProfile;
export const apiUploadPhoto = uploadPhoto;
export const apiUploadBackgroundImg = uploadBackgroundImg;
export const apiUpdateDescription = updateDescription;
export const apiUpdateAbout = updateAbout;
export const apiGetPhoto = getPhoto;
