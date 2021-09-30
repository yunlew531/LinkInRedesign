import { getUser } from './Index/Profile';
import { register, signIn, logout, checkLogin } from './Index/Login';

export const apiGetUser = getUser;
export const apiRegister = register;
export const apiSignIn = signIn;
export const apiCheckLogin = checkLogin;
export const apiLogout = logout;