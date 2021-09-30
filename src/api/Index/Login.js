import userReq from '../userReq';

export const register = (registerForm) => userReq.post('/register', registerForm);
export const signIn = (signInForm) => userReq.post('/signin', signInForm);
export const logout = () => userReq.post('/logout');
export const checkLogin = () => userReq.post('/user/check');