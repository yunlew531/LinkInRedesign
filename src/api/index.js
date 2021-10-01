//normal
import { register, signIn, logout, checkLogin } from './Index/login';
import { getUser } from './Index/user_profile';
// auth
import { getProfile } from './Index/profile';

// normal
export const apiGetUser = getUser;
export const apiRegister = register;
export const apiSignIn = signIn;
export const apiCheckLogin = checkLogin;
export const apiLogout = logout;

// auth
export const apiGetProfile = getProfile;