import authReq from '../auth_req';

export const getProfile = () => authReq.get('/self/profile');
export const uploadPhoto = (formData) => authReq.post('/self/photo', formData);
export const uploadBackgroundImg = (formData) => authReq.post('/self/background', formData);