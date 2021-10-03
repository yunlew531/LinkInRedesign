// normal
import { register, signIn, logout, checkLogin } from './Index/login';
import { getUser } from './Index/user_profile';

// auth
import { getProfile, uploadPhoto, uploadBackgroundImg, updateDescription, updateAbout
} from './Index/profile';

// normal
export const apiGetUser = getUser;
export const apiRegister = register;

// auth
export const apiSignIn = signIn;
export const apiLogout = logout;
export const apiCheckLogin = checkLogin;
export const apiGetProfile = getProfile;
export const apiUploadPhoto = uploadPhoto;
export const apiUploadBackgroundImg = uploadBackgroundImg;
export const apiUpdateDescription = updateDescription;
export const apiUpdateAbout = updateAbout;
