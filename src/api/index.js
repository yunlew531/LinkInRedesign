import { getUser } from './Index/Profile';
import { register, signIn, checkLogin } from './Index/Login';

export const apiGetUser = getUser;
export const apiRegister = register;
export const apiSignIn = signIn;
export const apiCheckLogin = checkLogin;