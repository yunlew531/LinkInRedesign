import authReq from '../auth_req';

export const register = (registerForm) => authReq.post('/register', registerForm);
export const signIn = (signInForm) => authReq.post('/signin', signInForm);
export const logout = () => authReq.post('/logout');
export const checkLogin = () => authReq.post('/user/check');